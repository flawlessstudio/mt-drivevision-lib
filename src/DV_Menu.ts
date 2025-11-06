/**
 * =========================================================
 *  DV_Menu.ts — Control del menú
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
  console.table([
    { Acción: "Ejecución completa", Método: "runFull()" },
    { Acción: "Ejecución incremental", Método: "runDelta()" },
    { Acción: "Abrir resumen", Método: "openSummary()" },
    { Acción: "Exportar XLSX", Método: "exportXLSX()" },
    { Acción: "Exportar PDF", Método: "exportPDF()" },
  ]);
}

export function onUserSelect(action: string) {
  switch (action) {
    case "FULL": runFull(); break;
    case "DELTA": runDelta(); break;
    case "SUMMARY": openSummary(); break;
    case "XLSX": exportXLSX(); break;
    case "PDF": exportPDF(); break;
    default:
      console.warn("⚠️ Acción desconocida:", action);
  }
}
