function setupSounds(ctx, state) {
  state.playingAnn = new StateTracker();
  state.playingAnn.setState("");
}

function playAnn(ctx, state, train) {
  var stations = train.getThisRoutePlatforms();
  if (stations.size() <= 1) return;
  var nextIndex = train.getThisRoutePlatformsNextIndex();
  if (nextIndex <= 0 || nextIndex >= stations.size()) return;

  var stationConfig = getStationConfig(stations, nextIndex);
  var prevStationConfig = nextIndex > 0 ? getStationConfig(stations, nextIndex - 1) : {};

  if (stationConfig.code === undefined || stationConfig.code === "") {
    state.playingAnn.setState("");
  } else {
    var distLastStation = train.railProgress() - stations.get(nextIndex - 1).distance;
    var distNextStation = stations.get(nextIndex).distance - train.railProgress();
    var isLoopLine = stations.get(0).station.id == stations.get(stations.size() - 1).station.id;
    var soundToPlay;
    if (distNextStation < stationConfig.arriveDistance) {
      if (nextIndex == stations.size() - 1 && !isLoopLine) {
        soundToPlay = stationConfig.routeStationCode + "_arr_term";
      } else {
        soundToPlay = stationConfig.routeStationCode + "_arr";
      }
    } else if (distLastStation > 15) {
      if (nextIndex == stations.size() - 1 && !isLoopLine) {
        soundToPlay = stationConfig.routeStationCode + "_next_term";
      } else if (!!prevStationConfig["specDep"]) {
        soundToPlay = stationConfig.routeStationCode + "_next_specdep";
      } else {
        soundToPlay = stationConfig.routeStationCode + "_next";
      }
    } else {
      soundToPlay = "";
    }

    state.playingAnn.setState("mtr:ann_" + soundToPlay);
    if (state.playingAnn.stateNowFirst() && soundToPlay != "") {
      ctx.playAnnSound(Resources.identifier(state.playingAnn.stateNow()), 1, 1);
    }
  }
}
