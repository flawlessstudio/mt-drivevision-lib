/**
 * =========================================================
 *  DV_Engine.ts — Núcleo de ejecución
 * =========================================================
 */

import { RunMode, Config } from "./types";

export function run(mode: RunMode, config: Config) {
  console.info(`▶️ Ejecutando modo: ${mode}`);
  console.info(`📂 Ruta: ${config.ROOT_PATH}`);
  console.info(`📄 Hoja: ${config.SHEET_ID}`);

  // ... tu lógica real aquí ...
}

export function openSummary() {
  console.info("📊 Abriendo resumen automático...");
}

export function exportXLSX() {
  console.info("📦 Exportando XLSX...");
}

export function exportPDF() {
  console.info("🧾 Exportando PDF...");
}

// =========================================================
// Export principal del módulo
// =========================================================
export const EngineModule = {
  run,
  openSummary,
  exportXLSX,
  exportPDF,
};

export default EngineModule;
