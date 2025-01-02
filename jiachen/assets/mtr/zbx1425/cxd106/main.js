include("models.js");
include("particles.js");
include("newpis/pis.js");
// include("sound.js");

include("tcjc_pis_cfg.js");

function createTrain(ctx, state, train) {
  state.particleRateLimit = new RateLimit(0.1);
  state.pisRateLimit = new RateLimit(0.05);
  state.dh = dhBase.create();
  state.dhHeadDisp = dhHeadDispBase.create(state.dh.texture);
  state.dhSideDisp = dhSideDispBase.create(state.dh.texture);
  setupPisTexture(state, state.dh.texture);
  /* 
  state.pisTexture = createPisTexture(state);
  state.bodyModel = models["body"].copyForMaterialChanges();
  state.bodyModel.replaceTexture("pis_placeholder.png", state.pisTexture.identifier); */
  state.bodyModel = models["body"];
  // setupSounds(ctx, state);
  state.wheelAngle = 0;
}

function disposeTrain(ctx, state, train) {
  state.dh.close();
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

  if (monorailTypeLangen) {
    state.wheelAngle = (state.wheelAngle + (train.isReversed() ? -1 : 1) 
      * (train.speed() * 20.0 * Timing.delta()) / 1.09) % (Math.PI * 2);
  }
  trainInAir = false;
  /* state.wheelAngle = (state.wheelAngle + (train.isReversed() ? -1 : 1) 
    * (train.speed() * 20.0 * Timing.delta()) / 1.09) % (Math.PI * 2);

  if (state.particleRateLimit.shouldUpdate()) {
    renderTrainParticles(ctx, state, train, trainInAir);
    playAnn(ctx, state, train);
  }
  
  */
  if (state.pisRateLimit.shouldUpdate() || train.doorValue() > 0) {
    updatePisTexture(ctx, state.dh.texture, state, train);
  }

  for (i = 0; i < train.trainCars(); i++) {
    matrices.pushPose();
    if (i == 0 && train.trainCars() == 1) {
      matrices.rotateY(Math.PI);
      ctx.drawCarModel(models["head"], i, matrices);
      ctx.drawCarModel(state.dhHeadDisp.model, i, matrices);
      ctx.drawCarModel(train.isReversed() ? models["taillight"] : models["headlight"], i, matrices);
      matrices.popPushPose();
      ctx.drawCarModel(models["head"], i, matrices);
      ctx.drawCarModel(state.dhHeadDisp.model, i, matrices);
      ctx.drawCarModel(train.isReversed() ? models["headlight"] : models["taillight"], i, matrices);

      matrices.translate(0, 2.45, 0);
      renderBogie(ctx, state, matrices, i, trainInAir, true);
    } else if (i == 0) {
      matrices.rotateY(Math.PI);
      ctx.drawCarModel(models["head"], i, matrices);
      ctx.drawCarModel(state.dhHeadDisp.model, i, matrices);
      ctx.drawCarModel(train.isReversed() ? models["taillight"] : models["headlight"], i, matrices);
      ctx.drawCarModel(models["end"], i, matrices);
      matrices.popPushPose();

      matrices.translate(0, 2.45, 3);
      renderBogie(ctx, state, matrices, i, trainInAir, true);
    } else if (i == train.trainCars() - 1) {
      ctx.drawCarModel(models["head"], i, matrices);
      ctx.drawCarModel(state.dhHeadDisp.model, i, matrices);
      ctx.drawCarModel(train.isReversed() ? models["headlight"] : models["taillight"], i, matrices);
      ctx.drawCarModel(models["end"], i, matrices);

      matrices.translate(0, 2.45, -3);
      renderBogie(ctx, state, matrices, i, trainInAir, true);
    } else {
      matrices.rotateY(Math.PI);
      ctx.drawCarModel(models["end"], i, matrices);
      if (i < train.trainCars() / 2) ctx.drawCarModel(state.dhSideDisp.model, i, matrices);
      matrices.popPushPose();
      ctx.drawCarModel(models["end"], i, matrices);
      if (i >= train.trainCars() / 2) ctx.drawCarModel(state.dhSideDisp.model, i, matrices);
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

    ctx.drawCarModel(state.dh.model, i, null);
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
  if (isCar) {
    ctx.drawCarModel(modelBogie, i, matrices);
  } else {
    ctx.drawConnModel(modelBogie, i, matrices);
  }

  if (monorailTypeLangen) {
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
}

function smoothEnds(startValue, endValue, startTime, endTime, time) {
  if (time < startTime) return startValue;
  if (time > endTime) return endValue;
  var timeChange = endTime - startTime;
  var valueChange = endValue - startValue;
  return valueChange * (1 - Math.cos(Math.PI * (time - startTime) / timeChange)) / 2 + startValue;
}
