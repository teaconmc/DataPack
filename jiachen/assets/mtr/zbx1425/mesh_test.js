
function create(ctx, state, train) {
  state.dynamicModel = new DynamicModelHolder();
}

function render(ctx, state, train) {
  let uOff = Timing.elapsed() % 1;

  let buildingRawModel = new RawModel();
  let rawMeshBuilder = new RawMeshBuilder(4, "interior", Resources.id("mtr:textures/block/sign/rubbish.png"));
  rawMeshBuilder
    .vertex(-0.59, 2.125, -1.75).normal(0, 1, 0).uv(uOff, 0).endVertex()
    .vertex(-0.755, 2.03, -1.75).normal(0, 1, 0).uv(uOff, 1).endVertex()
    .vertex(-0.755, 2.03, -3.25).normal(0, 1, 0).uv(8 + uOff, 1).endVertex()
    .vertex(-0.59, 2.125, -3.25).normal(0, 1, 0).uv(8 + uOff, 0).endVertex();
  buildingRawModel.append(rawMeshBuilder.getMesh());
  state.dynamicModel.uploadLater(buildingRawModel);

  for (let i = 0; i < train.trainCars(); i++) {
    ctx.drawCarModel(state.dynamicModel, i, null);
  }
}

function dispose(ctx, state, train) {
  state.dynamicModel.close();
}
