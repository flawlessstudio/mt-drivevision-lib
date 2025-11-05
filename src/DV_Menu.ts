/**
 * DV_Menu.ts — menú de UI en Sheets.
 */
import { runFull, runDelta, openSummary, exportXLSX, exportPDF } from "./DV_Exports";

export function onOpen(): void {
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
