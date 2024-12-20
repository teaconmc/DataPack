include("pis_config_parser.js");
importPackage(java.awt);
importPackage(java.awt.geom);

pisAtlas = Resources.readBufferedImage(Resources.idRelative("../pis_placeholder.png"));
// comparisonImage = Resources.readBufferedImage(Resources.idRelative("../comparison.png"));
sansFont = Resources.getSystemFont("Noto Sans");

function setupPisTexture(state, pisTexture) {
  state.pageCycle = new CycleTracker(["cjk", 4, "eng", 4]);
  state.posPhase = new StateTracker();
}

function updatePisTexture(ctx, texture, state, train) {
  let g = texture.graphics;
  let transform = g.getTransform();

  // var stations = train.getDebugThisRoutePlatforms(10);
  let stations = train.getThisRoutePlatforms();
  // if (stations.size() <= 1) return;
  let nextIndex = train.getThisRoutePlatformsNextIndex();
  // var nextIndex = 0;

  let staCfg = getStationConfig(stations, nextIndex);
  let doorDirection;
  if (staCfg.door == "both") {
    doorDirection = 2;
  } else if (staCfg.door == "left") {
    doorDirection = train.isReversed() ? 1 : -1;
  } else if (staCfg.door == "right") {
    doorDirection = train.isReversed() ? -1 : 1;
  } else {
    doorDirection = 0;
  }
  let leftDoorOpen = doorDirection == 2 || doorDirection == -1;
  let rightDoorOpen = doorDirection == 2 || doorDirection == 1;
  state.staCfg = staCfg;
  state.doorOpen = [ leftDoorOpen, rightDoorOpen ];

  let isLoopLine = (stations.size() > 0) && stations.get(0).station.id == stations.get(stations.size() - 1).station.id;
  let term = nextIndex == stations.size() - 1 && !isLoopLine;
  let arriveDistance = term ? staCfg["arriveDistanceTerm"] : staCfg["arriveDistance"];

  let prevStaCfg = nextIndex > 0 ? getStationConfig(stations, nextIndex - 1) : {};
  let departDistance = !!prevStaCfg["specDep"] ? prevStaCfg["departDistanceSpecDep"] : prevStaCfg["departDistance"];

  if (nextIndex < stations.size()) {
    let nextStation = stations.get(nextIndex);
    if ((nextStation.distance - train.railProgress()) < arriveDistance) {
      if (state.doorFullyOpened && train.doorValue() < 1 && train.doorValue() > 0) {
        state.posPhase.setState("dc");
      } else if (train.doorValue() > 0) {
        state.posPhase.setState("do");
        if (train.doorValue() == 1) state.doorFullyOpened = true;
      } else {
        state.doorFullyOpened = false;
        if (state.posPhase.stateNow() == "rte" || state.posPhase.stateNow() == null) {
          state.posPhase.setState("appr");
        }
      }
    } else {
      if (nextIndex > 0 && (train.railProgress() - stations.get(nextIndex - 1).distance) < departDistance) {
        state.posPhase.setState("dpt");
      } else {
        state.posPhase.setState("rte");
      }
    }
  } else {
    state.posPhase.setState("over");
  }
  // ctx.setDebugInfo("posPhase", state.posPhase.stateNow());

  state.pageCycle.tick();

  paintPisSideScreen(g, state, train, -1);
  g.transform(AffineTransform.getTranslateInstance(256, 0));
  paintPisSideScreen(g, state, train, 1);

  g.setTransform(transform);
  texture.upload();
}

include("pis_common.js");
include("pis_page_company_logo.js");
include("pis_page_route.js");
include("pis_page_dest_info.js");

function paintPisSideScreen(g, state, train, side) {
  // state.pageCycle.tick();
  let transform = g.getTransform();
  g.setColor(new Color(240/255, 240/255, 240/255));
  g.fillRect(0, 0, 256, 192);

  paintPisTopInfo(g, state, train);
  g.transform(AffineTransform.getTranslateInstance(0, 64));
  g.setClip(0, 0, 256, 128);
  if (state.posPhase.stateNow() == "rte") {
    paintPisRoute(g, state, train, side);
  } else if (state.posPhase.stateNow() == "do") {
    let isImportantInfo = paintPisDestInfo(g, state, train);
    if (!isImportantInfo) {
      if (state.posPhase.stateNowDuration() < 6) {
        paintPisCompanyLogo(g, state, train);
      } else {
        paintPisDestInfo(g, state, train);
      }
    }
  } else if (state.posPhase.stateNow() == "dpt" || state.posPhase.stateNow() == "dc") {
    paintPisDestInfo(g, state, train);
  } else if (state.posPhase.stateNow() == "appr") {
    paintPisRoute(g, state, train, side);
  }

  g.setClip(null);
  g.setTransform(transform);
  return;
}
