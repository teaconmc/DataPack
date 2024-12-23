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

rawModelBogieBase = ModelManager.loadRawModel(Resources.manager(),
  Resources.idRelative("bogie.obj"), null);
rawModelBogieBase.applyUVMirror(false, true);
rawModelBogieBase.applyTranslation(0, 0.4, 0);
modelBogie = ModelManager.uploadVertArrays(rawModelBogieBase);

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
    }/*,
    {
      "name": "ext_side_left",
      "texArea": [0, 32, 160, 16],
      "pos": [
        [[-1.18, 2.08, -0.4], [-1.19, 2.0, -0.4], [-1.19, 2.0, 0.4], [-1.18, 2.08, 0.4]]
      ],
      "offsets": [[0, 0, 0]]
    },
    {
      "name": "ext_side_right",
      "texArea": [0, 32, 160, 16],
      "pos": [
        [[1.18, 2.08, 0.4], [1.19, 2.0, 0.4], [1.19, 2.0, -0.4], [1.18, 2.08, -0.4]]
      ],
      "offsets": [[0, 0, 0]]
    }*/
  ]
};
const dhBase = new DisplayHelper(slotCfg);

