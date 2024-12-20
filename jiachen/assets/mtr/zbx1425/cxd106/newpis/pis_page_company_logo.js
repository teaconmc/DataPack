var imgLogo = Resources.readBufferedImage(Resources.idRelative("logo.png"));
var imgLogoHighlight = Resources.readBufferedImage(Resources.idRelative("logo_highlight.png"));

function paintPisCompanyLogo(g, state, train) {
  // let animBeginDuration = Timing.elapsed() % 5;
  let animBeginDuration = state.posPhase.stateNowDuration() - 2;

  let gradientRotateProgress = animSubProgress(0, 2.5, animBeginDuration);
  let gradientProgress, color1Begin, color1End, color2Begin, color2End;
  if (animBeginDuration < 0.5) {
    gradientProgress = easeOutCubic(animSubProgress(0, 0.5, animBeginDuration));
    color1Begin = [249 / 360, 0.6, 0]; color1End = [249 / 360, 0.6, 0.8];
    color2Begin = [32 / 360, 0.8, 0]; color2End = [32 / 360, 0.8, 0.8];
  } else if (animBeginDuration < 2) {
    gradientProgress = easeOutCubic(animSubProgress(0.5, 2, animBeginDuration));
    color1Begin = [249 / 360, 0.6, 0.8]; color1End = [197 / 360, 0.4, 0.9];
    color2Begin = [32 / 360, 0.8, 0.8]; color2End = [0, 0.4, 0.9];
  } else {
    gradientProgress = animSubProgress(2, 2.5, animBeginDuration);
    color1Begin = [197 / 360, 0.4, 0.9]; color1End = [197 / 360, 0.2, 0.95];
    color2Begin = [0, 0.4, 0.9]; color2End = [0, 0.1, 0.95];
  }

  let gradientAngle = lerp(Math.PI + Math.PI / 4, -Math.PI / 4, easeOutCubic(gradientRotateProgress));
  let gradientRadius = lerp(1, 80, easeOutCubic(gradientRotateProgress));
  let gradientCenter = [ 128, 64 ];
  let color1 = lerp3(color1Begin, color1End, gradientProgress);
  let color2 = lerp3(color2Begin, color2End, gradientProgress);
  let gradientPaint = new GradientPaint(
    gradientCenter[0] + gradientRadius * Math.cos(gradientAngle + Math.PI),
    gradientCenter[1] + gradientRadius * Math.sin(gradientAngle + Math.PI),
    new Color(Color.HSBtoRGB(color1[0], color1[1], color1[2])),
    gradientCenter[0] + gradientRadius * Math.cos(gradientAngle),
    gradientCenter[1] + gradientRadius * Math.sin(gradientAngle),
    new Color(Color.HSBtoRGB(color2[0], color2[1], color2[2]))
  );

  g.setPaint(gradientPaint);
  g.fillRect(0, 0, 256, 128);

  g.setColor(Color.WHITE);
  let logoScale = lerp(0, 1, easeOutCubic(animSubProgress(1.5, 2, animBeginDuration)));
  g.drawImage(imgLogo, 
    128 - imgLogo.getWidth() * logoScale / 2, 64 - (imgLogo.getHeight() + 8) * logoScale / 2, 
    imgLogo.getWidth() * logoScale, (imgLogo.getHeight() + 8) * logoScale, null);

  let hightlightProgress = animSubProgress(2, 2.8, animBeginDuration);
  let clip = g.getClip();
  g.setClip(256 * hightlightProgress, 0, 20, 128);
  g.drawImage(imgLogoHighlight, 128 - imgLogo.getWidth() / 2, 64 - (imgLogo.getHeight() + 8) / 2,
    imgLogo.getWidth(), (imgLogo.getHeight() + 8), null);
  g.setClip(clip);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function animSubProgress(a, b, t) {
  // 0 when t = a, 1 when t = b
  // 0 when t < a, 1 when t > b
  return Math.max(Math.min((t - a) / (b - a), 1), 0);
}

function lerp3(a, b, t) {
  return [
    lerp(a[0], b[0], t),
    lerp(a[1], b[1], t),
    lerp(a[2], b[2], t)
  ];
}

function easeOutCubic(x) {
  return Math.sin((x * Math.PI) / 2);
}
