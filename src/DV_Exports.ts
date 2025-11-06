/**
 * =========================================================
 *  DV_Exports.ts — MT_DRIVE_VISION
 *  Corrige tipos y usa RunMode enum
 * =========================================================
 */

import { RunMode } from "./types";        // ✅ IMPORTA EL ENUM
import * as EngineModule from "./DV_Engine";  // asegúrate que existe y exporta run()
import { logger } from "./utils/logger";  // opcional si usas logger, si no, usa console

// =========================================================
// EXPORTADORES PRINCIPALES
// =========================================================

export function runFullExport() {
  try {
    console.info("🔄 Iniciando ejecución completa (FULL)...");
    EngineModule.run(RunMode.FULL);  // ✅ usa enum, NO string
    console.info("✅ Exportación completa finalizada.");
  } catch (error) {
    console.error("❌ Error en exportación FULL:", error);
  }
}

export function runDeltaExport() {
  try {
    console.info("⚙️ Iniciando ejecución incremental (DELTA)...");
    EngineModule.run(RunMode.DELTA);  // ✅ usa enum, NO string
    console.info("✅ Exportación incremental completada.");
  } catch (error) {
    console.error("❌ Error en exportación DELTA:", error);
  }
}

// =========================================================
// EXPORTACIÓN GLOBAL
// =========================================================

export const DV_Exports = {
  runFullExport,
  runDeltaExport,
};

export default DV_Exports;
