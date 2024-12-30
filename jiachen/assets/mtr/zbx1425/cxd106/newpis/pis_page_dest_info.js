
function paintPisDestInfo(g, state, train) {
  let isImportantInfo = false;
  let destInfoLines = [];
  if (!!state.staCfg.destInfo) {
    destInfoLines = state.staCfg.destInfo.split("\n");
  } else {
    destInfoLines = [
      "本列车开往  " + TextUtil.getCjkParts(state.staCfg.destName),
      "For " + TextUtil.getNonCjkParts(state.staCfg.destName)
    ];
  }
  let infoAreaHeight = 128 - 20;
  g.setColor(new Color(0, 0x22 / 255, 0x50 / 255));
  g.fillRect(0, 128 - 20, 256, 20);
  g.setColor(Color.WHITE);
  let stations = train.getAllPlatforms();
  let nextIndex = train.getAllPlatformsNextIndex();
  if (state.posPhase.stateNow() != "dpt") {
    if (nextIndex < stations.size()) {
      if (nextIndex < stations.size() - 1) {
        if (stations.get(nextIndex + 1).station.id == stations.get(nextIndex).station.id
          && !stations.get(nextIndex).reverseAtPlatform) {
          // Turn back
          destInfoLines = [ "请所有乘客下车", "All change please" ];
          isImportantInfo = true;
        } else {
          paintTextC(g, "下一站是  " + TextUtil.getCjkParts(stations.get(nextIndex + 1).station.name),
            256 / 2, 128 - 3, 14);
        }
      } else {
        destInfoLines = [ "请所有乘客下车", "All change please" ];
        isImportantInfo = true;
      }
    } else {
      destInfoLines = [ "请所有乘客下车", "All change please" ];
      isImportantInfo = true;
    }
    if (state.posPhase.stateNow() == "dc") {
      destInfoLines = [ "请不要靠近车门", "Doors closing" ];
      isImportantInfo = true;
    }
  } else {
    paintTextC(g, "下一站是  " + TextUtil.getCjkParts(stations.get(nextIndex).station.name),
            256 / 2, 128 - 3, 14);
  }
  // destInfoLines = [ "本列车运行红线内环", "终点是小镇西", "在小镇西站之后, 直通黄线", "继续开往北角码头" ];

  let fontSize = 20;
  let lineSpacing = 4;
  let totalHeight = destInfoLines.length * (fontSize + lineSpacing) - lineSpacing;
  let y = (infoAreaHeight - totalHeight) / 2 + fontSize;
  g.setColor(isImportantInfo ? Color.RED : Color.BLACK);
  for (let i = 0; i < destInfoLines.length; i++) {
    paintTextC(g, destInfoLines[i], 256 / 2, y, fontSize);
    y += fontSize + lineSpacing;
  }
  return isImportantInfo;
}
