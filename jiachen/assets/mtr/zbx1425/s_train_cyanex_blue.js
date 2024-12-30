include(Resources.id("mtrsteamloco:scripts/display_helper.js"));
include("pis_cx_led/pis.js");

let slotCfg = {
  "version": 1,
  "texSize": [400, 64],
  "slots": [
    {
      "name": "lcd_door_left",
      "texArea": [0, 0, 360, 16],
      "pos": [
        [[-0.762, 2.06, -1.80], [-0.802, 2.012, -1.80], [-0.802, 2.012, -3.20], [-0.762, 2.06, -3.20]]
      ],
      "offsets": [[0, 0, -5], [0, 0, 0], [0, 0, 5], [0, 0, 10]]
    },
    {
      "name": "lcd_door_right",
      "texArea": [0, 16, 360, 16],
      "pos": [
        [[0.762, 2.06, -3.20], [0.802, 2.012, -3.20], [0.802, 2.012, -1.80], [0.762, 2.06, -1.80]]
      ],
      "offsets": [[0, 0, -5], [0, 0, 0], [0, 0, 5], [0, 0, 10]]
    },
    {
      "name": "ext_side_left",
      "texArea": [0, 32, 160, 16],
      "pos": [
        [[-1.18, 2.08, -0.4], [-1.19, 2.0, -0.4], [-1.19, 2.0, 0.4], [-1.18, 2.08, 0.4]]
      ],
      "offsets": [[0, 0, -5], [0, 0, 5]]
    },
    {
      "name": "ext_side_right",
      "texArea": [0, 32, 160, 16],
      "pos": [
        [[1.18, 2.08, 0.4], [1.19, 2.0, 0.4], [1.19, 2.0, -0.4], [1.18, 2.08, -0.4]]
      ],
      "offsets": [[0, 0, -5], [0, 0, 5]]
    }
  ]
};
const dhBase = new DisplayHelper(slotCfg);

var cabRawModel = ModelManager.loadRawModel(Resources.manager(), Resources.idr("s_train_cab.obj"), null);
cabRawModel.applyUVMirror(false, true);
var cabModel = ModelManager.uploadVertArrays(cabRawModel);
var cabDriverRawModel = ModelManager.loadRawModel(Resources.manager(), Resources.idr("s_train_cab_driver.obj"), null);
cabDriverRawModel.applyUVMirror(false, true);
var cabDriverModel = ModelManager.uploadVertArrays(cabDriverRawModel);

function create(ctx, state, train) {
  state.pisRateLimit = new RateLimit(0.02);
  state.dh = dhBase.create();
  setupPisTexture(state, state.dh.texture);
}

function dispose(ctx, state, train) {
  state.dh.close();
}

function render(ctx, state, train) {

  // ctx.setDebugInfo("SomeDebugInfoSetFromJS", state.dh.texture);

  if (state.pisRateLimit.shouldUpdate()) {
    // state.dh.graphics.setColor(Color.WHITE);
    // state.dh.graphics.fillRect(0, 0, 2048, 512);
    // state.dh.upload();
    updatePisTexture(ctx, state.dh.texture, state, train);
  }
  let matrices = new Matrices();
  for (let i = 0; i < train.trainCars(); i++) {
    ctx.drawCarModel(state.dh.model, i, null);

    if (i == 0) {
      matrices.pushPose();
      matrices.rotateY(Math.PI);
      matrices.translate(0, 0, -4.95);
      ctx.drawCarModel(cabModel, i, matrices);
      if (!train.isReversed()) {
        ctx.drawCarModel(cabDriverModel, i, matrices);
      }
      matrices.popPose();
    }
    if (i == train.trainCars() - 1) {
      matrices.pushPose();
      matrices.translate(0, 0, -4.95);
      ctx.drawCarModel(cabModel, i, matrices);
      if (train.isReversed()) {
        ctx.drawCarModel(cabDriverModel, i, matrices);
      }
      matrices.popPose();
    }
  }
}

include("cx_pis_cfg.js");
