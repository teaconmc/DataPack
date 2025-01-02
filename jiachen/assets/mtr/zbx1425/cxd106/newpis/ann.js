
function playAnn(ctx, state, train) {
  if (state.interruptPhase.stateNow() != "") {
    if (state.interruptPhase.stateNowFirst()) {
      let interrupt = state.interruptPhase.stateNow();
      let soundToPlay = "";
      if (interrupt == "hold") {
        soundToPlay = "train_hold";
      }
      if (soundToPlay != "") {
        ctx.playAnnSound(Resources.identifier("mtr:ann_" + soundToPlay), 1, 1);
      }
    }
  } else if (state.posPhase.stateNowFirst()) {
    let stations = train.getThisRoutePlatforms();
    if (stations.size() <= 1) return;
    let nextIndex = train.getThisRoutePlatformsNextIndex();
    if (nextIndex <= 0 || nextIndex >= stations.size()) return;

    let stationConfig = getStationConfig(stations, nextIndex);
    let prevStationConfig = nextIndex > 0 ? getStationConfig(stations, nextIndex - 1) : {};

    // let distLastStation = train.railProgress() - stations.get(nextIndex - 1).distance;
    // let distNextStation = stations.get(nextIndex).distance - train.railProgress();
    let isLoopLine = !!stationConfig["isLoopLine"];
    let soundToPlay = "";

    let isTerminating, isThroughRunning;
    if (nextIndex == stations.size() - 1 && !isLoopLine) {
      let allRouteStations = train.getAllPlatforms();
      let allRouteNextIndex = train.getAllPlatformsNextIndex();
      if (allRouteNextIndex < allRouteStations.size() - 1
        && allRouteStations.get(allRouteNextIndex + 1).route.color != allRouteStations.get(allRouteNextIndex).route.color) {
        isTerminating = false;
        isThroughRunning = true;
      } else {
        isTerminating = true;
        isThroughRunning = false;
      }
    } else {
      isTerminating = false;
      isThroughRunning = false;
    }

    let rteStaCode = stationConfig.routeStaCode;
    if (!!stationConfig.annRouteName) {
      rteStaCode = stationConfig.annRouteName + "_" + stationConfig.staCode;
    }

    if (state.posPhase.stateNow() == "rte") {
      if (isTerminating) {
        soundToPlay = rteStaCode + "_next_term";
      } else if (isThroughRunning) {
        soundToPlay = rteStaCode + "_next_thru";
      } else if (!!prevStationConfig["specDep"]) {
        soundToPlay = rteStaCode + "_next_specdep";
      } else {
        soundToPlay = rteStaCode + "_next";
      }
    } else if (state.posPhase.stateNow() == "appr") {
      if (isTerminating) {
        soundToPlay = rteStaCode + "_arr_term";
      } else {
        soundToPlay = rteStaCode + "_arr";
      }
    }

    if (soundToPlay != "") {
      ctx.playAnnSound(Resources.identifier("mtr:ann_" + soundToPlay), 1, 1);
    }
  }
}
