/**
 * =========================================================
 *  DV_Engine.ts — Núcleo de ejecución del sistema
 * =========================================================
 */

import { RunMode, Config } from "./types";

export function run(mode: RunMode, config: Config) {
  console.info(`▶️ Ejecutando modo: ${mode}`);
  console.info(`📂 Ruta: ${config.ROOT_PATH}`);
  console.info(`📄 Hoja: ${config.SHEET_ID}`);
  // TODO: Implementa la lógica real de sincronización aquí
}

export function openSummary() {
  console.info("📊 Abriendo resumen automático...");
}

export function exportXLSX() {
  console.info("📦 Exportando a XLSX...");
}

export function exportPDF() {
  console.info("🧾 Exportando a PDF...");
}

export const EngineModule = {
  run,
  openSummary,
  exportXLSX,
  exportPDF,
};

export default EngineModule;
