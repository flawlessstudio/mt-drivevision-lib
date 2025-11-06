/**
 * =========================================================
 *  index.ts — Entry Point principal
 * =========================================================
 */

import * as Core from "./DV_Core";
import * as EngineModule from "./DV_Engine";
import * as Exports from "./DV_Exports";
import * as Gemini from "./DV_Gemini";
import * as Menu from "./DV_Menu";

// =========================================================
// ENSAMBLA LA API
// =========================================================
const Engine = {
  runFull:     EngineModule.run,
  runDelta:    EngineModule.run,
  openSummary: EngineModule.openSummary,
  exportXLSX:  EngineModule.exportXLSX,
  exportPDF:   EngineModule.exportPDF,
};

const version = "v1.5_NORTHSTAR";
function init() {
  console.info("🚀 MTDriveVisionGemini iniciado correctamente");
}

// =========================================================
// GLOBAL EXPORT
// =========================================================
(globalThis as any).MTDriveVisionGemini = {
  Core,
  Engine,
  Exports,
  Gemini,
  Menu,
  version,
  init,
};

// =========================================================
// EXPORTACIÓN MÓDULAR
// =========================================================
export { Core, Engine, Exports, Gemini, Menu, version, init };
export default (globalThis as any).MTDriveVisionGemini;
