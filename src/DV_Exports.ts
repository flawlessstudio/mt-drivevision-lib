/**
 * =========================================================
 *  DV_Exports.ts — Controladores de exportación
 * =========================================================
 */

import { RunMode, Config } from "./types";
import * as EngineModule from "./DV_Engine";

const defaultConfig: Config = {
  ROOT_PATH: "MT_DOCS_2025/MT_INVENTARIO_MENAJE_2025",
  SHEET_ID: "10DvT6jtLCEUbq2Utrq0qBUY9fBVP36Hc93aBCqNlaVc",
};

// =========================================================
// MODO FULL / DELTA
// =========================================================
export function runFullExport() {
  console.info("🔄 Iniciando ejecución completa (FULL)...");
  EngineModule.run(RunMode.FULL, defaultConfig);
  console.info("✅ Exportación completa finalizada.");
}

export function runDeltaExport() {
  console.info("⚙️ Iniciando ejecución incremental (DELTA)...");
  EngineModule.run(RunMode.DELTA, defaultConfig);
  console.info("✅ Exportación incremental finalizada.");
}

// =========================================================
// RETROCOMPATIBILIDAD (para DV_Menu / Apps Script)
// =========================================================
export const runFull = runFullExport;
export const runDelta = runDeltaExport;
export const openSummary = EngineModule.openSummary;
export const exportXLSX = EngineModule.exportXLSX;
export const exportPDF = EngineModule.exportPDF;

// =========================================================
// EXPORT GLOBAL
// =========================================================
export const DV_Exports = {
  runFullExport,
  runDeltaExport,
  runFull,
  runDelta,
  openSummary,
  exportXLSX,
  exportPDF,
};

export default DV_Exports;
