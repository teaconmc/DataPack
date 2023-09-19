include("models.js");
include("particles.js");
include("pis/pis.js");
include("sound.js");

include("pis_config.js");

function createTrain(ctx, state, train) {
  state.particleRateLimit = new RateLimit(0.1);
  state.pisRateLimit = new RateLimit(0.05);
  state.pisTexture = createPisTexture(state);
  state.bodyModel = models["body"].copyForMaterialChanges();
  state.bodyModel.replaceTexture("pis_placeholder.png", state.pisTexture.identifier);
  setupSounds(ctx, state);
  state.wheelAngle = 0;
}

function disposeTrain(ctx, state, train) {
  // state.pisTexture.close();
}

function renderTrain(ctx, state, train) {
  matrices = new Matrices();

  /*
  matrices.pushPose();
  matrices.translate(1, 1, 1);
  for (i = 0; i < train.trainCars(); i++) {
    ctx.drawCarModel(modelGizmo, i, matrices);
  }
  matrices.popPose();
  */

  fwdRail = train.path().get(train.getRailIndex(train.getRailProgress(0), true)).rail;
  bwdRail = train.path().get(train.getRailIndex(train.getRailProgress(train.trainCars()), false)).rail;
  trainInAir = fwdRail.getModelKey() == "null" || bwdRail.getModelKey() == "null";
  state.wheelAngle = (state.wheelAngle + (train.isReversed() ? -1 : 1) 
    * (train.speed() * 20.0 * Timing.delta()) / 1.09) % (Math.PI * 2);

  if (state.particleRateLimit.shouldUpdate()) {
    renderTrainParticles(ctx, state, train, trainInAir);
    playAnn(ctx, state, train);
  }
  if (state.pisRateLimit.shouldUpdate()) {
    updatePisTexture(state.pisTexture, state, train);
  }

  for (i = 0; i < train.trainCars(); i++) {
    matrices.pushPose();
    if (i == 0 && train.trainCars() == 1) {
      matrices.rotateY(Math.PI);
      ctx.drawCarModel(models["head"], i, matrices);
      ctx.drawCarModel(train.isReversed() ? models["taillight"] : models["headlight"], i, matrices);
      matrices.popPushPose();
      ctx.drawCarModel(models["head"], i, matrices);
      ctx.drawCarModel(train.isReversed() ? models["headlight"] : models["taillight"], i, matrices);

      matrices.translate(0, 2.45, 0);
      renderBogie(ctx, state, matrices, i, trainInAir, true);
    } else if (i == 0) {
      matrices.rotateY(Math.PI);
      ctx.drawCarModel(models["head"], i, matrices);
      ctx.drawCarModel(train.isReversed() ? models["taillight"] : models["headlight"], i, matrices);
      ctx.drawCarModel(models["end"], i, matrices);
      matrices.popPushPose();

      matrices.translate(0, 2.45, 3);
      renderBogie(ctx, state, matrices, i, trainInAir, true);
    } else if (i == train.trainCars() - 1) {
      ctx.drawCarModel(models["head"], i, matrices);
      ctx.drawCarModel(train.isReversed() ? models["headlight"] : models["taillight"], i, matrices);
      ctx.drawCarModel(models["end"], i, matrices);

      matrices.translate(0, 2.45, -3);
      renderBogie(ctx, state, matrices, i, trainInAir, true);
    } else {
      matrices.rotateY(Math.PI);
      ctx.drawCarModel(models["end"], i, matrices);
      matrices.popPushPose();
      ctx.drawCarModel(models["end"], i, matrices);
    }
    matrices.popPose();
    ctx.drawCarModel(state.bodyModel, i, null);
    
    doorValueConv = smoothEnds(0, 1, 0, 0.8, train.doorValue());
    doorXP = train.doorLeftOpen[i] ? doorValueConv * 0.81 : 0;
    doorXN = train.doorRightOpen[i] ? doorValueConv * 0.81 : 0;
    matrices.pushPose();
    matrices.translate(0, 0, -doorXN);
    ctx.drawCarModel(models["doorXNZN"], i, matrices);
    matrices.translate(0, 0, 2 * doorXN);
    ctx.drawCarModel(models["doorXNZP"], i, matrices);
    matrices.popPose();
    matrices.pushPose();
    matrices.translate(0, 0, -doorXP);
    ctx.drawCarModel(models["doorXPZN"], i, matrices);
    matrices.translate(0, 0, 2 * doorXP);
    ctx.drawCarModel(models["doorXPZP"], i, matrices);
    matrices.popPose();
  }

  for (i = 0; i < train.trainCars() - 1; i++) {
    matrices.pushPose();
    matrices.translate(0, 2.45, 0);
    renderBogie(ctx, state, matrices, i, trainInAir, false);
    matrices.popPose();
    ctx.drawConnStretchTexture(idTexConnector, i);
  }
}

function renderBogie(ctx, state, matrices, i, trainInAir, isCar) {
  modelBogieToUse = trainInAir ? modelBogieAir : modelBogie;
  if (isCar) {
    ctx.drawCarModel(modelBogieToUse, i, matrices);
  } else {
    ctx.drawConnModel(modelBogieToUse, i, matrices);
  }

  matrices.pushPose();
  matrices.translate(0, 1.3723, 1);
  matrices.rotateX(state.wheelAngle);
  if (isCar) {
    ctx.drawCarModel(modelBogieWheel, i, matrices);
  } else {
    ctx.drawConnModel(modelBogieWheel, i, matrices);
  }
  matrices.popPose();

  matrices.pushPose();
  matrices.translate(0, 1.3723, -1);
  matrices.rotateX(state.wheelAngle);
  if (isCar) {
    ctx.drawCarModel(modelBogieWheel, i, matrices);
  } else {
    ctx.drawConnModel(modelBogieWheel, i, matrices);
  }
  matrices.popPose();
}

function smoothEnds(startValue, endValue, startTime, endTime, time) {
  if (time < startTime) return startValue;
  if (time > endTime) return endValue;
  var timeChange = endTime - startTime;
  var valueChange = endValue - startValue;
  return valueChange * (1 - Math.cos(Math.PI * (time - startTime) / timeChange)) / 2 + startValue;
}
