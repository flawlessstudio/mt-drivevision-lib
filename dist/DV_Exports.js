/**
 * DV_Exports.js — puente entre menús/botones y el motor.
 * Mantén aquí funciones cortas que delegan en Engine.
 */

import { toast, openSheetById } from "./DV_Core";
import { run as runEngine } from "./DV_Engine";

// ⚙️ Config por defecto (ajústala si cambian rutas/IDs)
export const CONFIG = Object.freeze({
  ROOT_PATH: "MT_DOCS_2025/MT_INVENTARIO_MENAJE_2025",
  SHEET_ID: "1AGDLWJzeNFaTEO54H2mmLPMH0lNTaiIBbz7_HNzf29U"
});

/** Reconstrucción completa (índice + resúmenes + dashboard). */
export function runFull() {
  runEngine(CONFIG, "FULL");
  toast("✅ Reconstrucción completa terminada");
}

/** Reconstrucción parcial/rápida (puedes extender lógica delta). */
export function runDelta() {
  runEngine(CONFIG, "DELTA");
  toast("✅ Actualización rápida ejecutada");
}

/** Abre o enfoca el dashboard si existe. */
export function openSummary() {
  const ss = openSheetById(CONFIG.SHEET_ID);
  const sh = ss.getSheetByName("Dashboard de conteos") ||
             ss.getSheetByName("Resumen Automático");
  if (sh) {
    ss.setActiveSheet(sh);
    toast("📊 Dashboard listo");
  } else {
    toast("ℹ️ No existe hoja de Dashboard aún");
  }
}

/** Exportar a XLSX (workbook completo). */
export function exportXLSX() {
  const blob = SpreadsheetApp.openById(CONFIG.SHEET_ID).getBlob();
  const xlsx = Utilities.newBlob(blob.getBytes(), 
                                 MimeType.MICROSOFT_EXCEL, 
                                 "MT_Conteos.xlsx");
  const folder = DriveApp.getFolderById(SpreadsheetApp.getActive().getId() || CONFIG.SHEET_ID)
                .getParents().hasNext()
                ? DriveApp.getFolderById(CONFIG.SHEET_ID).getParents().next()
                : DriveApp.getRootFolder();
  folder.createFile(xlsx);
  toast("⬇️ Exportado XLSX en tu Drive");
}

/** Exportar el Dashboard a PDF (si existe). */
export function exportPDF() {
  const id = CONFIG.SHEET_ID;
  const ss = SpreadsheetApp.openById(id);
  const sh = ss.getSheetByName("Dashboard de conteos");
  if (!sh) { toast("⚠️ No hay 'Dashboard de conteos'"); return; }
  const gid = sh.getSheetId();
  const url = `https://docs.google.com/spreadsheets/d/${id}/export` +
    `?format=pdf&portrait=false&size=A4&fitw=true&gridlines=false&gid=${gid}`;
  const token = ScriptApp.getOAuthToken();
  const resp = UrlFetchApp.fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    muteHttpExceptions: true
  });
  const pdf = Utilities.newBlob(resp.getContent(), MimeType.PDF, "Dashboard.pdf");
  DriveApp.getRootFolder().createFile(pdf);
  toast("🧾 PDF exportado en tu Drive");
}
