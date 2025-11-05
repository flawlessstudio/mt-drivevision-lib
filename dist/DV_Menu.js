/**
 * DV_Menu.js — menú de UI en Sheets (ligero y declarativo).
 */

import { runFull, runDelta, openSummary, exportXLSX, exportPDF } from "./DV_Exports";

export function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("DriveVision")
    .addItem("🔄 Reconstrucción completa", "runFull")
    .addItem("⚡ Actualización rápida", "runDelta")
    .addSeparator()
    .addItem("📊 Abrir Dashboard", "openSummary")
    .addSeparator()
    .addItem("⬇️ Exportar a XLSX", "exportXLSX")
    .addItem("🧾 Exportar Dashboard a PDF", "exportPDF")
    .addToUi();
}
