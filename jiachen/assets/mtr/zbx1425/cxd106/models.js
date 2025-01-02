include(Resources.id("mtrsteamloco:scripts/display_helper.js"));

function uploadPartedModels(rawModels) {
  var result = {};
  for (var it = rawModels.entrySet().iterator(); it.hasNext(); ) {
    entry = it.next();
    entry.getValue().applyUVMirror(false, true);
    result[entry.getKey()] = ModelManager.uploadVertArrays(entry.getValue());
  }
  return result;
}

rawModelGizmo = ModelManager.loadRawModel(Resources.manager(), Resources.idRelative("gizmo.obj"), null);
modelGizmo = ModelManager.uploadVertArrays(rawModelGizmo);

// S-Train Mini

rawModels = ModelManager.loadPartedRawModel(Resources.manager(), 
  Resources.idRelative("s_train_mini.obj"), null);
models = uploadPartedModels(rawModels);

idTexConnector = Resources.idRelative("s_train_connector.png");

// Bogie

if (typeof(monorailTypeLangen) === undefined) {
  var monorailTypeLangen = false;
}
if (monorailTypeLangen) {
  rawModelBogieBase = ModelManager.loadRawModel(Resources.manager(),
  Resources.idRelative("bogie_base.obj"), null);
  rawModelBogieBase.applyUVMirror(false, true);
  modelBogie = ModelManager.uploadVertArrays(rawModelBogieBase);
  
  rawModelBogieWheel = ModelManager.loadRawModel(Resources.manager(),
  Resources.idRelative("bogie_wheel.obj"), null);
  rawModelBogieWheel.applyUVMirror(false, true);
  rawModelBogieWheel.applyTranslation(0, -1.3723, 1);
  modelBogieWheel = ModelManager.uploadVertArrays(rawModelBogieWheel);
} else {
  rawModelBogieBase = ModelManager.loadRawModel(Resources.manager(),
  Resources.idRelative("bogie.obj"), null);
  rawModelBogieBase.applyUVMirror(false, true);
  rawModelBogieBase.applyTranslation(0, 0.4, 0);
  modelBogie = ModelManager.uploadVertArrays(rawModelBogieBase);
}

// PIS

let slotCfg = {
  "version": 1,
  "texSize": [512, 256],
  "slots": [
    {
      "name": "lcd_door_left",
      "texArea": [0, 0, 256, 192],
      "pos": [
        [[-0.702, 2.131, -2.813], [-0.803, 2.011, -2.813], [-0.803, 2.011, -3.025], [-0.702, 2.131, -3.025]]
      ],
      "offsets": [[0, 0, 5], [0, 0, 0]]
    },
    {
      "name": "lcd_door_right",
      "texArea": [256, 0, 256, 192],
      "pos": [
        [[0.702, 2.131, -3.025], [0.803, 2.011, -3.025], [0.803, 2.011, -2.813], [0.702, 2.131, -2.813]]
      ],
      "offsets": [[0, 0, 5 + 0.419 * 2], [0, 0, 0.419 * 2]]
    }
  ]
};
const dhBase = new DisplayHelper(slotCfg);

let slotCfgHeadDisp = {
  "version": 1,
  "texSize": [512, 256],
  "slots": [
    {
      "name": "head_dest",
      "texArea": [256, 192, 64, 28],
      "pos": [
        [[0.950, 2.097, -5.051], [0.950, 1.916, -5.100], [0.520, 1.916, -5.100], [0.520, 2.097, -5.051]]
      ],
      "offsets": [[0, 0, 0]]
    },
    {
      "name": "head_run",
      "texArea": [384, 192, 96, 58],
      "pos": [
        [[-0.563, 2.097, -5.051], [-0.563, 1.916, -5.100], [-0.875, 1.916, -5.100], [-0.875, 2.097, -5.051]]
      ],
      "offsets": [[0, 0, 0]]
    },
  ]
}
const dhHeadDispBase = new DisplayHelper(slotCfgHeadDisp);

let slotCfgSideDisp = {
  "version": 1,
  "texSize": [512, 256],
  "slots": [
    {
      "name": "ext_side_left",
      "texArea": [256, 196, 64, 20],
      "pos": [
        [[-1.18, 2.18, -0.3], [-1.19, 2.0, -0.3], [-1.19, 2.0, 0.3], [-1.18, 2.18, 0.3]]
      ],
      "offsets": [[0, 0, -0.8]]
    },
    {
      "name": "ext_side_right",
      "texArea": [256, 196, 64, 20],
      "pos": [
        [[1.18, 2.18, 0.3], [1.19, 2.0, 0.3], [1.19, 2.0, -0.3], [1.18, 2.18, -0.3]]
      ],
      "offsets": [[0, 0, -0.8]]
    }
  ]
}
const dhSideDispBase = new DisplayHelper(slotCfgSideDisp);
