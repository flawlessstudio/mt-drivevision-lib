/**
 * =========================================================
 *  index.ts — Entry Point de MT_DRIVE_VISION
 *  Versión: v1.4_BNS (Build Estable)
 * =========================================================
 */

import * as Core from "./DV_Core";
import * as EngineModule from "./DV_Engine";
import * as Exports from "./DV_Exports";
import * as Gemini from "./DV_Gemini";
import * as Menu from "./DV_Menu";

// =========================================================
// ENSAMBLA LOS MÓDULOS PRINCIPALES (API pública intacta)
// =========================================================
const Engine = {
  runFull:     EngineModule.run,
  runDelta:    EngineModule.run,
  openSummary: EngineModule.openSummary,
  exportXLSX:  EngineModule.exportXLSX,
  exportPDF:   EngineModule.exportPDF,
};

// =========================================================
// METADATOS Y FUNCIONES AUXILIARES
// =========================================================
const version = "v1.4_BNS";
function init() {
  console.info("🚀 MTDriveVisionGemini iniciado correctamente");
}

// =========================================================
// EXPOSICIÓN GLOBAL SEGURA (Browser / Node / GAS)
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
// EXPORTACIÓN MÓDULAR (ESM / CJS)
// =========================================================
export { Core, Engine, Exports, Gemini, Menu, version, init };
export default (globalThis as any).MTDriveVisionGemini;
