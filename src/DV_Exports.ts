/**
 * DV_Exports.ts — puente entre menú/botones y Engine.
 * Mantén aquí funciones cortas que delegan.
 */
import { toast, openSheetById } from "./DV_Core";
import { run as runEngine } from "./DV_Engine";
import type { Config } from "./types";

// ⚙️ Config por defecto (ajusta SHEET_ID a tu doc real)
export const CONFIG: Readonly<Config> = Object.freeze({
  ROOT_PATH: "MT_DOCS_2025/MT_INVENTARIO_MENAJE_2025",
  SHEET_ID: "1AGDLWJzeNFaTEO54H2mmLPMH0LN1raIBbz7_HNzf29U"
});

export function runFull(): void {
  runEngine(CONFIG, "FULL");
  toast("✅ Reconstrucción completa terminada");
}

export function runDelta(): void {
  runEngine(CONFIG, "DELTA");
  toast("✅ Actualización rápida ejecutada");
}

export function openSummary(): void {
  const ss = openSheetById(CONFIG.SHEET_ID);
  const sh = ss.getSheetByName("Dashboard de conteos") || ss.getSheetByName("Resumen Automático");
  if (sh) {
    ss.setActiveSheet(sh);
    toast("📊 Dashboard listo");
  } else {
    toast("ℹ️ No existe hoja de Dashboard aún");
  }
}

export function exportXLSX(): void {
  const blob = SpreadsheetApp.openById(CONFIG.SHEET_ID).getBlob();
  const xlsx = Utilities.newBlob(blob.getBytes(), MimeType.MICROSOFT_EXCEL, "MT_Conteos.xlsx");
  DriveApp.getRootFolder().createFile(xlsx);
  toast("⬇️ Exportado XLSX en tu Drive");
}

export function exportPDF(): void {
  const id = CONFIG.SHEET_ID;
  const ss = SpreadsheetApp.openById(id);
  const sh = ss.getSheetByName("Dashboard de conteos");
  if (!sh) { toast("⚠️ No hay 'Dashboard de conteos'"); return; }
  const gid = sh.getSheetId();
  const url = `https://docs.google.com/spreadsheets/d/${id}/export` +
    `?format=pdf&portrait=false&size=A4&fitw=true&gridlines=false&gid=${gid}`;
  const token = ScriptApp.getOAuthToken();
  const resp = UrlFetchApp.fetch(url, { headers: { Authorization: `Bearer ${token}` }, muteHttpExceptions: true });
  const pdf = Utilities.newBlob(resp.getContent(), MimeType.PDF, "Dashboard.pdf");
  DriveApp.getRootFolder().createFile(pdf);
  toast("🧾 PDF exportado en tu Drive");
}
