var sevenSegAtlas = Resources.readBufferedImage(Resources.idRelative("seven_segment.png"));

function paintPisHeadSide(g, state, train) {
  let transform = g.getTransform();

  // Dest
  let headSideDest = !!state.staCfg["headSideDest"] ? state.staCfg["headSideDest"] : state.staCfg["destName"];
  g.transform(AffineTransform.getTranslateInstance(256, 192));
  g.setColor(new Color(0.1, 0.1, 0.1));
  g.fillRect(0, 0, 64, 28);
  g.setColor(new Color(1, 0.6, 0.5));
  paintTextCSerif(g, TextUtil.getCjkParts(headSideDest), 32, 15, 10);
  g.setColor(new Color(0.9, 0.7, 0.5));
  paintTextC(g, TextUtil.getNonCjkParts(headSideDest), 32, 23, 7);
  g.setTransform(transform);

  // Run
  g.transform(AffineTransform.getTranslateInstance(384, 192));
  g.setColor(new Color(0.1, 0.1, 0.1));
  g.fillRect(0, 0, 96, 58);
  g.transform(AffineTransform.getTranslateInstance(32 * 2, 8));

  let runNumber = java.math.BigInteger.valueOf(train.id()).abs().shiftRight(8).mod(30).intValue() + 1;
  for (let i = 0; i < 3; i++) {
    let digit = runNumber % 10;
    runNumber = Math.floor(runNumber / 10);
    
    let x = (digit % 4) * 32;
    let y = Math.floor(digit / 4) * 42;
    g.drawImage(sevenSegAtlas, 0, 0, 32, 42, x, y, x + 32, y + 42, null);

    g.transform(AffineTransform.getTranslateInstance(-32, 0));
  }

  g.setTransform(transform);
}

function paintTextCSerif(g, text, xC, yB, size) {
  g.setFont(serifFont.deriveFont(Font.BOLD, size));
  let textWidth = g.getFontMetrics().stringWidth(text);
  g.drawString(text, xC - textWidth / 2, yB);
}
