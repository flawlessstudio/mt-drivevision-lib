/**
 * DV_Exports.ts — puente entre menú/botones y Engine.
 * Define exactamente: runFull, runDelta, openSummary, exportXLSX, exportPDF.
 */

import { openSheetById, findFolderByPath, nowISO, toast } from "./DV_Core";
import { run as runEngine } from "./DV_Engine";
import type { Config } from "./types";

// ⚙️ Config por defecto (ajusta SHEET_ID a tu doc real)
export const CONFIG: Readonly<Config> = Object.freeze({
  ROOT_PATH: "MT_DOCS_2025/MT_INVENTARIO_MENAJE_2025",
  SHEET_ID: "1AGDLWJzeNFaTEO54H2mmLPMH0LN1raIBbz7_HNzf29U"
});

const EXPORT_SUBPATH = "01_WORK/Export";
const DASHBOARD_SHEET = "Dashboard de conteos";

// MIME strings (compatibles con TS)
const XLSX_MIME = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const PDF_MIME  = "application/pdf";

/* -------------------- Helpers -------------------- */
function getExportFolder_(cfg: Config): GoogleAppsScript.Drive.Folder {
  const full = `${cfg.ROOT_PATH}/${EXPORT_SUBPATH}`;
  const f = findFolderByPath(full);
  if (!f) {
    throw new Error(
      `No existe la carpeta de exportación: ${full}.\n` +
      `Crea la estructura o corrige ROOT_PATH.`
    );
  }
  return f;
}
function tsSlug_(): string {
  return nowISO().replace(/:/g, "-").replace("T", "_");
}

/* -------------------- Engine actions -------------------- */
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
  const sh = ss.getSheetByName(DASHBOARD_SHEET) || ss.getSheetByName("Resumen Automático");
  if (sh) {
    ss.setActiveSheet(sh);
    toast("📊 Dashboard listo");
  } else {
    toast("ℹ️ No existe hoja de Dashboard aún");
  }
}

/* -------------------- Exports (XLSX/PDF) -------------------- */
export function exportXLSX(): string {
  const folder = getExportFolder_(CONFIG);

  // Advanced Drive API v2
  // @ts-ignore
  const blob: GoogleAppsScript.Base.Blob = Drive.Files.export(
    CONFIG.SHEET_ID,
    XLSX_MIME
  );

  const name = `MT_Conteos_${tsSlug_()}.xlsx`;
  const xlsxBlob = Utilities.newBlob(blob.getBytes(), XLSX_MIME, name);
  const file = folder.createFile(xlsxBlob);

  toast(`📤 Exportado XLSX: ${name}`);
  return file.getUrl();
}

export function exportPDF(): string {
  const ss = openSheetById(CONFIG.SHEET_ID);
  const dash = ss.getSheetByName(DASHBOARD_SHEET);
  if (!dash) throw new Error(`No se encontró la hoja "${DASHBOARD_SHEET}"`);

  const folder = getExportFolder_(CONFIG);
  const gid = dash.getSheetId();

  const params: Record<string, string> = {
    format: "pdf",
    portrait: "true",
    size: "A4",
    fitw: "true",
    top_margin: "0.5",
    bottom_margin: "0.5",
    left_margin: "0.5",
    right_margin: "0.5",
    sheetnames: "false",
    printtitle: "false",
    pagenumbers: "false",
    gridlines: "false",
    fzr: "false",
    gid: String(gid)
  };
  const qs = Object.entries(params).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("&");
  const url = `https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}/export?${qs}`;

  const token = ScriptApp.getOAuthToken();
  const resp = UrlFetchApp.fetch(url, { headers: { Authorization: `Bearer ${token}` }, muteHttpExceptions: true });
  if (resp.getResponseCode() !== 200) {
    throw new Error(`Fallo exportando PDF: HTTP ${resp.getResponseCode()} · ${resp.getContentText().slice(0, 200)}`);
  }

  const name = `Dashboard_${tsSlug_()}.pdf`;
  const pdfBlob = Utilities.newBlob(resp.getContent(), PDF_MIME, name);
  const file = folder.createFile(pdfBlob);

  toast(`📤 Exportado PDF: ${name}`);
  return file.getUrl();
}

/* -------------------- Batch convenience -------------------- */
export function exportAll(): { xlsxUrl: string; pdfUrl: string } {
  const xlsxUrl = exportXLSX();
  const pdfUrl  = exportPDF();
  toast("✅ Exportaciones completadas");
  return { xlsxUrl, pdfUrl };
}
