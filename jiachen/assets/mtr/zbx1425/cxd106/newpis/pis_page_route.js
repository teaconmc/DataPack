var imgCartoonTrain = Resources.readBufferedImage(Resources.idRelative("cartoon_train.png"));

function paintPisRoute(g, state, train, side) {
  let staCfg = state.staCfg;
  let isCjk = state.pageCycle.stateNow() == "cjk";


  let lineTopY = 80;
  let fontSize = 14;
  let sideMarginS = 20, sideMarginE = 30;
  let rtl = side == -1 ? !train.isReversed() : train.isReversed();
  let stations = train.getAllPlatforms();
  let nextIndex = train.getAllPlatformsNextIndex() - 1;
  if (nextIndex < 0) nextIndex = 0;
  let stationOnPage = 6;
  let spacingX = (256 - sideMarginS - sideMarginE - fontSize * stationOnPage) / (stationOnPage - 1) + fontSize;

  // Route Color Triangle
  g.setColor(new Color(0.7, 0.7, 0.7));
  g.fillRect(0, lineTopY, 256, 20);

  for (let i = 0; i < stationOnPage; i++) {
    if (nextIndex + i >= stations.size()) break;
    let station = stations.get(nextIndex + i);
    if (i > 1 && nextIndex + i - 1 > 0 && station.station.id == stations.get(nextIndex + i - 1).station.id) break;
    
    let stationName = "" + TextUtil.getCjkParts(station.station.name);
    if (stationName.length > 4) stationName = stationName.substring(0, 4);
    let x = (rtl ? (256 - sideMarginS - spacingX * i - fontSize) : (sideMarginS + spacingX * i)) + fontSize / 2;
    let spacingY = (lineTopY - 16 - fontSize * stationName.length) / (stationName.length - 1) + fontSize;

    g.setColor(i == 0 ? Color.GRAY : (i == 1 ? new Color(0xe2 / 255, 0x22 / 255, 0x22 / 255) : Color.BLACK));
    // Station name
    let y = lineTopY - 10;
    for (let j = 0; j < stationName.length; j++) {
      paintTextC(g, stationName.charAt(stationName.length - j - 1), x, y, fontSize);
      y -= spacingY;
    }

    // Route bar
    if (i > 0) {
      let routeColorPackedArgb = station.route.color;
      let routeColor = new Color(((routeColorPackedArgb >> 16) & 0xFF) / 0xFF, ((routeColorPackedArgb >> 8) & 0xFF) / 0xFF, (routeColorPackedArgb & 0xFF) / 0xFF);
      let routeColorHsv = Color.RGBtoHSB(routeColor.getRed(), routeColor.getGreen(), routeColor.getBlue(), null);
      let adjustedRouteColor = Color.getHSBColor(routeColorHsv[0], 0.64, 0.5);
      g.setColor(adjustedRouteColor);
      g.fillRect(rtl ? x : x - spacingX, lineTopY, spacingX + 1, 20);
    }
    // g.setColor(Color.getHSBColor(routeColorHsv[0], 0.4, 0.8));
    // g.fillRect(rtl ? x : x + spacingX, lineTopY, spacingX + 1, 5);

    if (i == stationOnPage - 1 && nextIndex + i + 1 < stations.size()) {
      let anotherNextStation = stations.get(nextIndex + i + 1);
      let routeColorPackedArgb = anotherNextStation.route.color;
      let routeColor = new Color(((routeColorPackedArgb >> 16) & 0xFF) / 0xFF, ((routeColorPackedArgb >> 8) & 0xFF) / 0xFF, (routeColorPackedArgb & 0xFF) / 0xFF);
      let routeColorHsv = Color.RGBtoHSB(routeColor.getRed(), routeColor.getGreen(), routeColor.getBlue(), null);
      let adjustedRouteColor = Color.getHSBColor(routeColorHsv[0], 0.64, 0.5);
      g.setColor(adjustedRouteColor);
      g.fillRect(rtl ? 0 : x, lineTopY, rtl ? x : 256 - x, 20);
    }
  }
  for (let i = 0; i < stationOnPage; i++) {
    if (nextIndex + i >= stations.size()) {
      if (i != stationOnPage - 1 && i != 2) {
        g.setColor(Color.WHITE);
        paintTextL(g, "(分)", x + 9, lineTopY + 18, 8);
      }
      break;
    }
    let station = stations.get(nextIndex + i);
    if (i > 1 && nextIndex + i - 1 > 0 && station.station.id == stations.get(nextIndex + i - 1).station.id) {
      if (i != stationOnPage - 1 && i != 2) {
        g.setColor(Color.WHITE);
        paintTextL(g, "(分)", x + 9, lineTopY + 18, 8);
      }
      break;
    }

    let x = (rtl ? (256 - sideMarginS - spacingX * i - fontSize) : (sideMarginS + spacingX * i)) + fontSize / 2;

    if (i == 0) {
      // Background Arrow
      let k = rtl ? -1 : 1;
      g.setColor(new Color(0.7, 0.7, 0.7));
      g.fillPolygon(
        [ x + k * -4, x + k * 4, x + k * 8, x + k * 4, x + k * -4 ],
        [ lineTopY, lineTopY, lineTopY + 10, lineTopY + 20, lineTopY + 20],
        5
      );
      g.setColor(Color.WHITE);
      g.fillPolygon(
        [ x + k * 8, x + k * 20, x + k * 24, x + k * 20, x + k * 8, x + k * 12 ],
        [ lineTopY - 4, lineTopY - 4, lineTopY + 10, lineTopY + 24, lineTopY + 24, lineTopY + 10],
        6
      );
      g.setColor((Timing.elapsed() % 1 < 0.5) ? new Color(0.8, 0, 0) : new Color(1.0, 0.4, 0));
      g.fillPolygon(
        [ x + k * 10, x + k * 18, x + k * 22, x + k * 18, x + k * 10, x + k * 14 ],
        [ lineTopY - 2, lineTopY - 2, lineTopY + 10, lineTopY + 22, lineTopY + 22, lineTopY + 10],
        6
      );

      // Station circle
      g.setColor(Color.GRAY);
      g.fillOval(x - 4, lineTopY + 6, 8, 8);
    } else {
      // Station circle
      g.setColor(Color.WHITE);
      g.fillOval(x - 8, lineTopY + 2, 16, 16);

      if (i == 1) {
        g.setColor(Color.ORANGE);
        g.fillOval(x - 7, lineTopY + 3, 14, 14);
      }

      g.setColor(Color.BLACK);
      paintTextC(g, Math.round((station.distance - train.railProgress()) / (30 / 3.6) / 60), x, lineTopY + 14, 10);
    }
    if (i == stationOnPage - 1) {
      g.setColor(Color.WHITE);
      paintTextL(g, "(分)", x + 9, lineTopY + 18, 8);
    }
  }

  if (state.posPhase.stateNow() == "appr") {
    let thisDoorOpen = state.doorOpen[side == 1 ? 0 : 1]; // Mmm inverted somewhere
    // Door direction
    g.setColor(thisDoorOpen ? new Color(0, 0x83 / 255, 0x4f / 255) : new Color(0x4f / 255, 0, 0));
    g.fillRect(0, 128 - 20, 256, 20);
    g.setColor(Color.WHITE);
    paintTextC(g, thisDoorOpen ? "本侧开门  Exit this side" : "对侧开门  Exit other side",
      256 / 2, 128 - 3, 14);
  } else {
    // Cartoon train animation
    let animProg = (Timing.elapsed() % 4) / 4;
    let animX = rtl ? (256 - animProg * (256 + 50)) : (animProg * (256 + 47));
    g.drawImage(imgCartoonTrain, animX, lineTopY + 20, rtl ? 47 : -47, 30, null);
  }
}
