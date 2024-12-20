
function paintPisTopInfo(g, state, train) {
  g.setColor(new Color(25/255, 25/255, 25/255));
  g.fillRect(0, 0, 256, 62);
  g.setColor(new Color(120/255, 120/255, 120/255));
  g.fillRect(0, 62, 256, 2);
  let staCfg = state.staCfg;
  let isCjk = state.pageCycle.stateNow() == "cjk";

  // Route Color Triangle
  let routeColorPackedArgb = !!staCfg["raw"] ? staCfg["raw"].route.color : 0xFF1357BB;
  let routeColor = new Color(((routeColorPackedArgb >> 16) & 0xFF) / 0xFF, ((routeColorPackedArgb >> 8) & 0xFF) / 0xFF, (routeColorPackedArgb & 0xFF) / 0xFF);
  let routeColorHsv = Color.RGBtoHSB(routeColor.getRed(), routeColor.getGreen(), routeColor.getBlue(), null);
  routeColorHsv[1] = 0.64;
  routeColorHsv[2] = 0.5;
  let adjustedRouteColor = Color.getHSBColor(routeColorHsv[0], routeColorHsv[1], routeColorHsv[2]);
  g.setColor(adjustedRouteColor);
  g.fillPolygon([0, 60, 72, 60, 0], [0, 0, 31, 62, 62], 5);

  // Station Name
  g.setColor(Color.WHITE);
  let stationName = isCjk 
    ? spaceCjkChars(TextUtil.getCjkParts(staCfg.staName)) 
    : TextUtil.getNonCjkParts(staCfg.staName);
  paintTextWrapable(g, stationName, 166, 36, 174, 36, 18);

  // Next / Arriving
  if (state.posPhase.stateNow() == "rte" || state.posPhase.stateNow() == "dpt") {
    paintTextL(g, isCjk ? "下一站" : "Next Station", 74, 12, 10);
  } else {
    paintTextL(g, isCjk ? "列车到达" : "This is", 74, 12, 10);
  }

  // Clock
  g.fillRoundRect(236 - 16, 2, 33, 12, 4, 4);
  g.setColor(Color.BLACK);
  paintTextC(g, java.time.LocalTime.now().toString().substring(0, 5), 236, 12, 10);
  g.setColor(Color.WHITE);

  // Line Name
  let lineName = isCjk 
    ? spaceCjkChars(TextUtil.getCjkParts(staCfg.routeName)) 
    : TextUtil.getNonCjkParts(staCfg.routeName.replace("Line", "Ln"));
  g.setFont(sansFont.deriveFont(Font.BOLD, 10));
  let lineNameWidth = g.getFontMetrics().stringWidth(lineName);
  g.fillRoundRect(30 - lineNameWidth / 2 - 2, isCjk ? 3 : 46, lineNameWidth + 5, 12, 4, 4);
  g.setColor(adjustedRouteColor);
  g.drawString(lineName, 30 - lineNameWidth / 2, isCjk ? 13 : 56);
  g.setColor(Color.WHITE);

  if (isCjk) {
    paintTextR(g, "方向", 58, 56, 10);
  } else {
    paintTextL(g, "For", 4, 13, 10);
  }

  // Destination Name
  let destinationName = isCjk 
    ? spaceCjkChars(TextUtil.getCjkParts(staCfg.destName)) 
    : TextUtil.getNonCjkParts(staCfg.destName);
  paintTextWrapable(g, destinationName, 34, 30, 60, 16, 10);
  
  // if (Timing.elapsed() % 2 < 1) {
  //   g.drawImage(comparisonImage, 0, 0, 256, 192, null);
  // }
}

function paintTextWrapable(g, text, xC, yC, width, maxSize, minSize) {
  g.setFont(sansFont.deriveFont(Font.BOLD, maxSize));
  let stationName = text;
  let stationNameWidth = g.getFontMetrics().stringWidth(stationName);
  if (stationNameWidth > width) {
    let fontSize = maxSize;
    while (stationNameWidth > width && fontSize > minSize) {
      fontSize -= 1;
      g.setFont(sansFont.deriveFont(Font.BOLD, fontSize));
      stationNameWidth = g.getFontMetrics().stringWidth(stationName);
    }
    if (stationNameWidth <= width) {
      g.setFont(sansFont.deriveFont(Font.BOLD, fontSize));
      stationNameWidth = g.getFontMetrics().stringWidth(stationName);
      g.drawString(stationName, xC - stationNameWidth / 2, yC + fontSize / 2);
    } else {
      stationName = stationName.split(" ");
      let firstPart = "", secondPart = "";
      for (let i = 0; i < stationName.length; i++) {
        if (i < stationName.length / 2) {
          firstPart += stationName[i] + " ";
        } else {
          secondPart += stationName[i] + " ";
        }
      }
      g.setFont(sansFont.deriveFont(Font.BOLD, fontSize));
      stationNameWidth = g.getFontMetrics().stringWidth(secondPart);
      g.drawString(firstPart, xC - width / 2, yC - 1);
      g.drawString(secondPart, xC + width / 2 - stationNameWidth, yC + fontSize + 1);
    }
  } else {
    g.drawString(stationName, xC - stationNameWidth / 2, yC + maxSize / 2);
  }
}

function paintTextL(g, text, xL, yB, size) {
  g.setFont(sansFont.deriveFont(Font.BOLD, size));
  g.drawString(text, xL, yB);
}

function paintTextR(g, text, xR, yB, size) {
  g.setFont(sansFont.deriveFont(Font.BOLD, size));
  let textWidth = g.getFontMetrics().stringWidth(text);
  g.drawString(text, xR - textWidth, yB);
}

function paintTextC(g, text, xC, yB, size) {
  g.setFont(sansFont.deriveFont(Font.BOLD, size));
  let textWidth = g.getFontMetrics().stringWidth(text);
  g.drawString(text, xC - textWidth / 2, yB);
}

function spaceCjkChars(input) {
  input = "" + input;
  let spaceToAdd = input.length < 5 ? [0, 0, 2, 1, 0][input.length] : 0;
  if (spaceToAdd > 0) {
      return (' '.repeat(spaceToAdd + 2) + input.split('').join(' '.repeat(spaceToAdd))).trim();
  } else {
      return input;
  }
}
