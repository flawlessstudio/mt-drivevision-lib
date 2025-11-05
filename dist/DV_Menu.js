import { openSheetById, getOrCreateSheet, formatHeader } from "./DV_Core";
export function onOpenMenu(_cfg) {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu("DriveVision")
        .addItem("🔧 Setup inicial", "setupAll")
        .addSeparator()
        .addItem("🧹 FULL", "runFull")
        .addItem("🔄 DELTA", "runDelta")
        .addSeparator()
        .addItem("📊 Resumen", "openSummary")
        .addItem("📈 Dashboard", "exportDashboard")
        .addSeparator()
        .addItem("⬇️ Export XLSX", "exportXLSX")
        .addItem("🖨️ Export PDF", "exportPDF")
        .addToUi();
}
export function setupAll(cfg) {
    const ss = openSheetById(cfg.SHEET_ID);
    const inv = getOrCreateSheet(ss, "MT_INDICE_INVENTARIO_MENAJE_2025");
    const sum = getOrCreateSheet(ss, "Resumen Automático");
    const dash = getOrCreateSheet(ss, "Dashboard de conteos");
    formatHeader(inv);
    formatHeader(sum);
    formatHeader(dash);
    ss.toast("Setup OK", "DriveVision", 5);
}
global.setupAll = (cfg) => setupAll(cfg);
