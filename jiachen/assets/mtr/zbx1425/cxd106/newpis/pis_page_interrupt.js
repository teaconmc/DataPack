
function paintPisInterrupt(g, state, train) {
  let intInfoLines = [];
  let infoAreaHeight = 128 - 20;
  g.setColor(new Color(0, 0x22 / 255, 0x50 / 255));
  g.fillRect(0, 128 - 20, 256, 20);
  g.setColor(Color.WHITE);
  let interrupt = state.interruptPhase.stateNow();
  if (interrupt == "hold") {
    intInfoLines = [ "临时停车", "Temporary Hold" ];
  } else if (interrupt == "dc") {
    intInfoLines = [ "请不要靠近车门", "Doors closing" ];
  }
  let fontSize = 20;
  let lineSpacing = 4;
  let totalHeight = intInfoLines.length * (fontSize + lineSpacing) - lineSpacing;
  let y = (infoAreaHeight - totalHeight) / 2 + fontSize;
  g.setColor(Color.RED);
  for (let i = 0; i < intInfoLines.length; i++) {
    paintTextC(g, intInfoLines[i], 256 / 2, y, fontSize);
    y += fontSize + lineSpacing;
  }
}