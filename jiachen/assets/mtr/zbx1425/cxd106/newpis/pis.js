include("pis_config_parser.js");
importPackage(java.awt);
importPackage(java.awt.geom);

pisAtlas = Resources.readBufferedImage(Resources.idRelative("../pis_placeholder.png"));
comparisonImage = Resources.readBufferedImage(Resources.idRelative("../comparison.png"));
sansFont = Resources.getSystemFont("Noto Sans");

function setupPisTexture(state, pisTexture) {
  state.pageCycle = new CycleTracker(["cjk", 4, "eng", 4]);
}

function updatePisTexture(ctx, texture, state, train) {
  let g = texture.graphics;
  let transform = g.getTransform();

  // var stations = train.getDebugThisRoutePlatforms(10);
  let stations = train.getThisRoutePlatforms();
  if (stations.size() <= 1) return;
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
  state.staCfg = staCfg;

  let isLoopLine = stations.get(0).station.id == stations.get(stations.size() - 1).station.id;
  let term = nextIndex == stations.size() - 1 && !isLoopLine;
  let arriveDistance = term ? staCfg["arriveDistanceTerm"] : staCfg["arriveDistance"];

  let prevStaCfg = nextIndex > 0 ? getStationConfig(stations, nextIndex - 1) : {};
  let departDistance = !!prevStaCfg["specDep"] ? prevStaCfg["departDistanceSpecDep"] : prevStaCfg["departDistance"];

  let infoType = "enroute";
  if (nextIndex < stations.size()) {
    let nextStation = stations.get(nextIndex);
    if ((nextStation.distance - train.railProgress()) < arriveDistance) {
      infoType = "arrive";
    }
  }

  state.infoType = infoType;
  state.pageCycle.tick();

  paintPisSideScreen(g, state, train, -1);
  g.transform(AffineTransform.getTranslateInstance(256, 0));
  paintPisSideScreen(g, state, train, 1);

  g.setTransform(transform);
  texture.upload();
}

include("pis_common.js");

function paintPisSideScreen(g, state, train, side) {
  // state.pageCycle.tick();
  g.setColor(new Color(240/255, 240/255, 240/255));
  g.fillRect(0, 0, 256, 192);

  // paintPisCommonElement(g, state, train);
  // paintDestinationText(g, stations, nextIndex, true);
  paintPisTopInfo(g, state, train);
  return;
  // paintPisArrivePage(g, state, train);

  var stations = train.getThisRoutePlatforms();
  if (stations.size() <= 1) return;
  var nextIndex = train.getThisRoutePlatformsNextIndex();
  // var stations = train.getDebugPlatforms(10);
  // var nextIndex = 5;

  var stationConfig = getStationConfig(stations, nextIndex);
  var doorDirection;
  if (stationConfig.door == "both") {
    doorDirection = 2;
  } else if (stationConfig.door == "left") {
    doorDirection = train.isReversed() ? 1 : -1;
  } else if (stationConfig.door == "right") {
    doorDirection = train.isReversed() ? -1 : 1;
  } else {
    doorDirection = 0;
  }
  state.stationConfig = stationConfig;
  state.doorWillOpen = doorDirection == 2 || doorDirection == side;

  if (nextIndex < stations.size() && (stations.get(nextIndex).distance - train.railProgress()) < stationConfig.arriveDistance) {
    state.atPlatform |= train.doorValue() > 0;
    if (state.atPlatform) {
      paintPisNextStationPage(g, state, train, stations, nextIndex);
    } else {
      paintPisArrivePage(g, state, train, stations, nextIndex);
    }
  } else {
    state.atPlatform = false;
    if (state.pageCycle.stateNow() == "route") {
      paintPisRoutePage(g, state, train, stations, nextIndex);
    } else if (state.pageCycle.stateNow() == "nextStation") {
      paintPisNextStationPage(g, state, train, stations, nextIndex);
    }
  }

  /*
  g.setColor(Color.RED);
  g.setFont(sansFont.deriveFont(Font.BOLD, 10));
  g.drawString(JSON.stringify(stationConfig), 0, 10);
  */
}
