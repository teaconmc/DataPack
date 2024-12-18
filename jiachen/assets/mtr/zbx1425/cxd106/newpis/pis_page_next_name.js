function paintPisCommonElement(g, state, train) {
  g.setColor(new Color(36/255, 57/255, 94/255));
  g.fillRect(0, 80, 140, 20);
  g.setColor(Color.WHITE);
  g.setFont(sansFont.deriveFont(Font.BOLD, 14));
  g.drawString(java.time.LocalTime.now().toString().substring(0, 5), 10, 95);
  g.fillRect(60, 81, 2, 17);
  g.drawString(Math.round(train.speed() * 20 * 3600.0 / 1000).toString(), 70, 95);
  g.setFont(sansFont.deriveFont(Font.BOLD, 10));
  g.drawString("km/h", 95, 95);

  var lastImgX = Math.floor(Timing.elapsed() % 36 / 6);
  var imgX = Math.floor((Timing.elapsed() + 6) % 36 / 6);
  var divisorY = Math.min(Timing.elapsed() % 6, 0.5) * 2 * 100;
  if (divisorY > 0 && divisorY < 100) {
    g.drawImage(pisAtlas, 860, divisorY, 860 + 140, 100, lastImgX * 140, 412 + divisorY, lastImgX * 140 + 140, 512, null);
    g.drawImage(pisAtlas, 860, 0, 860 + 140, divisorY, imgX * 140, 412, imgX * 140 + 140, 412 + divisorY, null);
  } else {
    g.drawImage(pisAtlas, 860, 0, 860 + 140, 100, imgX * 140, 412, imgX * 140 + 140, 512, null);
  }
}

function paintDestinationText(g, stations, nextIndex, dark) {
  if (stations.size() < 2) return;
  
  var nextSta = stations.get(Math.min(nextIndex, stations.size() - 1));
  g.setColor(dark ? Color.WHITE : Color.decode("#2D7FDD"));
  g.fillRect(10, 8, 20, 20);

  g.fillRect(10, 47, 20, 2);
  // g.drawRect(10, 32, 19, 19);
  
  g.setColor(dark ? Color.WHITE : new Color(36/255, 57/255, 94/255));
  g.setFont(sansFont.deriveFont(Font.BOLD, 10));
  g.drawString("往", 10, 44);
  g.setFont(sansFont.deriveFont(Font.BOLD, 6));
  g.drawString("To", 22, 41);

  g.setFont(sansFont.deriveFont(Font.BOLD, 7));
  g.drawString(TextUtil.getNonCjkParts(nextSta.destinationName), 40, 44);
  g.setFont(sansFont.deriveFont(Font.BOLD, 9));
  g.drawString(TextUtil.getCjkParts(nextSta.route.name), 40, 17);
  g.setFont(sansFont.deriveFont(Font.BOLD, 6));
  g.drawString(TextUtil.getNonCjkParts(nextSta.route.name), 40, 27);

  g.setFont(sansFont.deriveFont(Font.BOLD, 19));
  var cjkWidth = g.getFontMetrics().stringWidth(TextUtil.getCjkParts(nextSta.destinationName));
  g.drawString(TextUtil.getCjkParts(nextSta.destinationName), 70 - cjkWidth / 2, 72);

  if (TextUtil.getNonCjkParts(nextSta.route.name).length() > 0) {
    g.setColor(dark ? Color.decode("#2D7FDD") : Color.WHITE);
    var idStr = TextUtil.getNonCjkParts(nextSta.route.name).substring(0, 1).toUpperCase();
    g.setFont(sansFont.deriveFont(Font.BOLD, 16));
    g.drawString(idStr, 20 - g.getFontMetrics().stringWidth(idStr) / 2, 24);
  }
}
