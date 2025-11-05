/* global this */

/**
 * Public surface of the DriveVision library.
 * It adapts to the names you already use inside DV_* files,
 * so consumers can always call: MTDriveVisionGemini.Engine.runFull(), etc.
 */
var MTDriveVisionGemini = (function (g) {
  function notFound(path) {
    return function () {
      throw new Error("DriveVision library: missing function -> " + path);
    };
  }
  function pick() {
    for (var i = 0; i < arguments.length; i++) {
      var fn = g[arguments[i]];
      if (typeof fn === "function") return fn;
    }
    return notFound([].slice.call(arguments).join(" | "));
  }

  // Engine (indexing / exports / automation)
  var Engine = {
    runFull:      pick("DV_runFull", "runFull", "engine_runFull"),
    runDelta:     pick("DV_runDelta", "runDelta", "engine_runDelta"),
    runAuto:      pick("DV_runAuto", "runAuto", "engine_runAuto"),
    openSummary:  pick("DV_openSummary", "openSummary"),
    exportXLSX:   pick("DV_exportXLSX", "exportXLSX"),
    exportPDF:    pick("DV_exportPDF", "exportPDF"),
    setupTrigger: pick("DV_setupTrigger", "setupTrigger")
  };

  // Core (settings / flags / helpers)
  var Core = {
    getSettings:  pick("DV_getSettings", "getSettingsForSidebar", "getSettings"),
    setMoveFlag:  pick("DV_setMoveFlag", "setMoveFlag"),
    getRootPath:  pick("DV_getRootPath", "getRootPath")
  };

  // Menu & UI
  var Menu = {
    onOpen:      pick("DV_onOpen", "onOpen", "menu_onOpen"),
    showSidebar: pick("DV_showSidebar", "showSidebar")
  };

  // Optional: maintenance & QA (only if you expose them in DV files)
  var QA = {
    selfCheck: pick("DV_selfCheck", "selfCheck", "qa_selfCheck"),
    logsDump:  pick("DV_logsDump",  "logsDump")
  };

  return { Engine: Engine, Core: Core, Menu: Menu, QA: QA };
})(this);
