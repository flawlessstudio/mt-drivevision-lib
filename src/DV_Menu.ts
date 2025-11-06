/**
 * =========================================================
 *  DV_Menu.ts — Control del menú principal
 * =========================================================
 */

import {
  runFull,
  runDelta,
  openSummary,
  exportXLSX,
  exportPDF,
} from "./DV_Exports";

export function renderMenu() {
  console.info("🧭 Renderizando menú MT_DriveVision...");
  console.table([
    { acción: "Ejecución completa", método: "runFull()" },
    { acción: "Ejecución incremental", método: "runDelta()" },
    { acción: "Abrir resumen", método: "openSummary()" },
    { acción: "Exportar XLSX", método: "exportXLSX()" },
    { acción: "Exportar PDF", método: "exportPDF()" },
  ]);
}

export function onUserSelect(action: string) {
  switch (action) {
    case "FULL":
      runFull();
      break;
    case "DELTA":
      runDelta();
      break;
    case "SUMMARY":
      openSummary();
      break;
    case "XLSX":
      exportXLSX();
      break;
    case "PDF":
      exportPDF();
      break;
    default:
      console.warn("⚠️ Acción desconocida:", action);
  }
}
