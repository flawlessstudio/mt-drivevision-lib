/**
 * =========================================================
 *  index.ts — Entry Point de MT_DRIVE_VISION
 *  Versión: v1.4_BNS (estable y compatible)
 * =========================================================
 */

import * as Core from "./DV_Core";
import * as EngineModule from "./DV_Engine";
import * as Exports from "./DV_Exports";
import * as Gemini from "./DV_Gemini";
import * as Menu from "./DV_Menu";

// =========================================================
// ENSAMBLA LOS MÓDULOS PRINCIPALES (misma API pública)
// =========================================================
const Engine = {
  runFull:     EngineModule.runFull,
  runDelta:    EngineModule.runDelta,
  openSummary: EngineModule.openSummary,
  exportXLSX:  EngineModule.exportXLSX,
  exportPDF:   EngineModule.exportPDF,
};

// =========================================================
const version = "v1.4_BNS";

function init() {
  try {
    console.info("🚀 MTDriveVisionGemini iniciado correctamente");
  } catch (error) {
    console.warn("⚠️ Advertencia al inicializar MTDriveVisionGemini:", error);
  }
}

// =========================================================
// EXPOSICIÓN GLOBAL SEGURA (Browser / Node / Apps Script)
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
// EXPORTACIÓN MODULAR (para imports ESM/CJS sin globals)
// =========================================================
export {
  Core,
  Engine,
  Exports,
  Gemini,
  Menu,
  version,
  init,
};

// Default export apunta al mismo objeto expuesto en global
export default (globalThis as any).MTDriveVisionGemini;
