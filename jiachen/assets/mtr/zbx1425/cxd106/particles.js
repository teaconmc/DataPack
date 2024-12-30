
function renderTrainParticles(ctx, state, train, trainInAir) {
  if (!foundMadParticle) return;
  trainSpeed = train.isReversed() ? -train.speed() : train.speed();

  for (i = 0; i < train.trainCars(); i++) {
    zPos = 0;
    if (i == 0 && train.trainCars() == 1) {
      zPos = 0;
    } else if (i == 0) {
      zPos = 3;
    } else if (i == train.trainCars() - 1) {
      zPos = -3;
    } else {
      zPos = false;
    }

    if (zPos !== false && trainInAir) {
      addEngineParticles(train.lastWorldPose[i], new Vector3f(3.8, 3.5, zPos), trainSpeed);
      addEngineParticles(train.lastWorldPose[i], new Vector3f(-3.8, 3.5, zPos), trainSpeed);
    }
    if (i != train.trainCars() - 1 && train.trainCars() > 1 && trainInAir) {
      addEngineParticles(train.lastWorldPose[i], new Vector3f(3.8, 3.5, -5), trainSpeed);
      addEngineParticles(train.lastWorldPose[i], new Vector3f(-3.8, 3.5, -5), trainSpeed);
    }
  }
}

// int targetParticle, SpriteFrom spriteFrom, int lifeTime,
// InheritableBoolean alwaysRender, int amount,
// double px, double py, double pz, double xDiffuse, double yDiffuse, double zDiffuse,
// double vx, double vy, double vz, double vxDiffuse, double vyDiffuse, double vzDiffuse,
// float friction, float gravity, InheritableBoolean collision, int bounceTime,
// double horizontalRelativeCollisionDiffuse, double verticalRelativeCollisionBounce,
// float afterCollisionFriction, float afterCollisionGravity,
// InheritableBoolean interactWithEntity,
// double horizontalInteractFactor, double verticalInteractFactor,
// ParticleRenderTypes renderType, float r, float g, float b,
// float beginAlpha, float endAlpha, ChangeMode alphaMode,
// float beginScale, float endScale, ChangeMode scaleMode,
// boolean haveChild, MadParticleOption child,
// float rollSpeed,
// float xDeflection, float xDeflectionAfterCollision,
// float zDeflection, float zDeflectionAfterCollision,
// float bloomFactor,
// CompoundTag meta

function addEngineParticles(basePose, originOffset, trainSpeed) {
  particleOrigin = basePose.transform(originOffset);

  particleDirection = basePose.transform3(new Vector3f(0, -0.4, trainSpeed));
  particleOption2 = new MadParticleOption(
    Resources.getParticleTypeId(Resources.identifier("minecraft:campfire_cosy_smoke")), SpriteFrom.RANDOM, 60,
    InheritableBoolean.TRUE, 2,
    java.lang.Double.MAX_VALUE, java.lang.Double.MAX_VALUE, java.lang.Double.MAX_VALUE, 0.2, 0.2, 0.2,
    java.lang.Double.MAX_VALUE, java.lang.Double.MAX_VALUE, java.lang.Double.MAX_VALUE, 0.02, 0.04, 0.02,
    0.98, 0, InheritableBoolean.FALSE, 0,
    0.2, 0.2,
    0.98, 0,
    InheritableBoolean.FALSE,
    0, 0,
    ParticleRenderTypes.PARTICLE_SHEET_TRANSLUCENT, 1, 1.8, 2.5,
    1, 0.3, ChangeMode.LINEAR,
    2, 9, ChangeMode.LINEAR,
    false, null,
    0,
    0, 0,
    0, 0,
    0,
    Resources.parseNbtString('{"life":50}')
  );
  particleOption1 = new MadParticleOption(
    Resources.getParticleTypeId(Resources.identifier("minecraft:totem_of_undying")), SpriteFrom.RANDOM, 8,
    InheritableBoolean.TRUE, 4,
    particleOrigin.x(), particleOrigin.y(), particleOrigin.z(), 0.6, 0.4, 0.6,
    particleDirection.x(), particleDirection.y(), particleDirection.z(), 0.04, 0.04, 0.04,
    0.98, 0.01, InheritableBoolean.FALSE, 0,
    0.2, 0.2,
    0.6, 1.25,
    InheritableBoolean.FALSE,
    0, 0,
    ParticleRenderTypes.PARTICLE_SHEET_TRANSLUCENT, 1, 0.39, 0,
    1, 1, ChangeMode.LINEAR,
    1, 3, ChangeMode.LINEAR,
    true, particleOption2,
    0,
    0, 0,
    0, 0,
    1,
    Resources.parseNbtString('{"life":30,"light":"15"}')
  );
  AddParticleHelper.asyncAddParticle(particleOption1);

  particleDirection = basePose.transform3(new Vector3f(0, -0.3, trainSpeed));
  particleOption = new MadParticleOption(
    Resources.getParticleTypeId(Resources.identifier("minecraft:flame")),
    SpriteFrom.RANDOM, 8,
    InheritableBoolean.FALSE, 2,
    particleOrigin.x(), particleOrigin.y(), particleOrigin.z(), 0.5, 0.5, 0.5,
    particleDirection.x(), particleDirection.y(), particleDirection.z(), 0.1, 0.2, 0.1,
    0.98, 0, InheritableBoolean.FALSE, 0,
    0, 0,
    0.98, 0,
    InheritableBoolean.FALSE,
    0, 0,
    ParticleRenderTypes.PARTICLE_SHEET_TRANSLUCENT, 1, 1, 1,
    1, 1, ChangeMode.LINEAR,
    2, 0, ChangeMode.LINEAR,
    false, null,
    0,
    0, 0,
    0, 0,
    1,
    Resources.parseNbtString('{"light":"15"}')
  );
  AddParticleHelper.asyncAddParticle(particleOption);

  originOffset.add(0, 6, 0);
  particleOrigin = basePose.transform(originOffset);
  particleDirection = basePose.transform3(new Vector3f(0, -0.6, trainSpeed));
  particleOption = new MadParticleOption(
    Resources.getParticleTypeId(Resources.identifier("minecraft:smoke")),
    SpriteFrom.RANDOM, 5,
    InheritableBoolean.FALSE, 4,
    particleOrigin.x(), particleOrigin.y(), particleOrigin.z(), 0.5, 0.5, 0.5,
    particleDirection.x(), particleDirection.y(), particleDirection.z(), 0, 0.2, 0,
    0.98, 0, InheritableBoolean.FALSE, 0,
    0, 0,
    0.98, 0,
    InheritableBoolean.FALSE,
    0, 0,
    ParticleRenderTypes.PARTICLE_SHEET_TRANSLUCENT, 1, 1, 1,
    1, 1, ChangeMode.LINEAR,
    0.1, 2, ChangeMode.LINEAR,
    false, null,
    0,
    0, 0,
    0, 0,
    0,
    new CompoundTag()
  );
  AddParticleHelper.asyncAddParticle(particleOption);

}