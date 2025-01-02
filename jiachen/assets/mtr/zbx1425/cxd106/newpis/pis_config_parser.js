function getStationConfig(stations, nextIndex) {
  let result = Object.assign({}, pisConfig["default"]);
  if (stations.size() < 2) {
    // Fill in some dummy info for testing
    result["routeCode"] = "isl";
    result["staCode"] = "cab";
    result["routeStaCode"] = "isl_cab";
    result["staName"] = "銅鑼灣|Causeway Bay";
    result["routeName"] = "港島綫|Island Line";
    result["destName"] = "回   库|Not in Service";
    return result;
  }
  if (nextIndex >= stations.size() || nextIndex < 0) return result;
  
  result["raw"] = stations.get(nextIndex);
  let exitStr = "";
  for (let it = stations.get(nextIndex).station.exits.entrySet().iterator(); it.hasNext(); ) {
    let entry = it.next();
    if (entry.getKey() == "Z99") {
      for (let index in entry.getValue()) {
        result["code"] = entry.getValue().get(index);
        break;
        // let stationCfg = JSON.parse(entry.getValue().get(index));
        // Object.assign(result, stationCfg);
      }
    } else {
      for (let index in entry.getValue()) {
        exitStr += entry.getValue().get(index) + "\n";
      }
    }
  }
  result["exitStr"] = exitStr.trim();
  
  result["routeCode"] = ("" + TextUtil.getExtraParts(stations.get(nextIndex).route.name))
    .split("/")[0].toLowerCase();
  result["staCode"] = result["code"] === (void 0) ? "" : result["code"].toLowerCase();
  result["routeStaCode"] = result["routeCode"] + "_" + result["staCode"];

  result["staName"] = stations.get(nextIndex).station.name;
  result["routeName"] = stations.get(nextIndex).route.name;
  result["destName"] = stations.get(nextIndex).destinationName;

  if (!!result["tbNextTrip"]) {
    result["nextRoute"] = {}
    result["nextRoute"]["routeCode"] = ("" + result["tbNextTrip"])
      .split("/")[0].toLowerCase();
    Object.assign(result["nextRoute"], pisConfig["routes"][result["nextRoute"]["routeCode"]]);
  }

  if (pisConfig["routes"][result["routeCode"]] !== (void 0)) {
    Object.assign(result, pisConfig["routes"][result["routeCode"]]);
  }
  if (pisConfig["stations"][result["staCode"]] !== (void 0)) {
    Object.assign(result, pisConfig["stations"][result["staCode"]]);
  }
  if (pisConfig["routeStations"][result["routeStaCode"]] !== (void 0)) {
    Object.assign(result, pisConfig["routeStations"][result["routeStaCode"]]);
  }

  return result;  
}
