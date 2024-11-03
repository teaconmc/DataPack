
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
rawModelBogieBase.applyScale(1, 1.2, 1);
rawModelBogieBase.applyTranslation(0, -0.2, 0);
modelBogie = ModelManager.uploadVertArrays(rawModelBogieBase);
