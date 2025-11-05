// === DV_Exports.ts ===============================================
// Exporta el libro a XLSX y el Dashboard a PDF dentro de 01_WORK/Export
// Depende de funciones utilitarias en DV_Core y del servicio avanzado Drive (v2) habilitado.

import {
  openSheetById,
  findFolderByPath,
  nowISO,
  toast,
} from "./DV_Core";

// ----- Config & Consts -------------------------------------------
export interface Config {
  SHEET_ID: string;
  ROOT_PATH: string; // p.ej. "MT_DOCS_2025/MT_INVENTARIO_MENAJE_2025"
}

const EXPORT_SUBPATH = "01_WORK/Export";
const DASHBOARD_SHEET = "Dashboard de conteos";

// MIME strings (compatibles con TS)
const XLSX_MIME =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const PDF_MIME = "application/pdf";

// ----- Helpers ----------------------------------------------------
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

function sanitizedDate_(): string {
  // 2025-11-05_16-45-09
  return nowISO().replace(/:/g, "-").replace("T", "_");
}

// ----- XLSX (libro completo) -------------------------------------
export function exportWorkbookXLSX(cfg: Config): string {
  const folder = getExportFolder_(cfg);

  // Drive Advanced Service v2 (Services > Drive activado en tu proyecto Apps Script).
  // Exporta el spreadsheet entero a .xlsx
  // @ts-ignore  Drive v2 está disponible en Apps Script
  const blob: GoogleAppsScript.Base.Blob = Drive.Files.export(
    cfg.SHEET_ID,
    XLSX_MIME
  );

  const name = `MT_Conteos_${sanitizedDate_()}.xlsx`;
  const xlsxBlob = Utilities.newBlob(blob.getBytes(), XLSX_MIME, name);
  const file = folder.createFile(xlsxBlob);

  toast(`📤 Exportado XLSX: ${name}`);
  return file.getUrl();
}

// ----- PDF (solo hoja Dashboard) ---------------------------------
export function exportDashboardPDF(cfg: Config): string {
  const ss = openSheetById(cfg.SHEET_ID);
  const dash = ss.getSheetByName(DASHBOARD_SHEET);
  if (!dash) {
    throw new Error(
      `No se encontró la hoja "${DASHBOARD_SHEET}" en el spreadsheet.`
    );
  }

  const folder = getExportFolder_(cfg);
  const gid = dash.getSheetId();

  // Parámetros de exportación (ajústalos a tu gusto)
  const params = {
    format: "pdf",
    portrait: "true",
    size: "A4",
    fitw: "true",        // Ajustar al ancho
    top_margin: "0.50",
    bottom_margin: "0.50",
    left_margin: "0.50",
    right_margin: "0.50",
    sheetnames: "false",
    printtitle: "false",
    pagenumbers: "false",
    gridlines: "false",
    fzr: "false",
    gid: `${gid}`,
  };

  const qs = Object.keys(params)
    .map((k) => `${k}=${encodeURIComponent((params as any)[k])}`)
    .join("&");

  const url = `https://docs.google.com/spreadsheets/d/${cfg.SHEET_ID}/export?${qs}`;

  const token = ScriptApp.getOAuthToken();
  const resp = UrlFetchApp.fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    muteHttpExceptions: true,
  });

  const code = resp.getResponseCode();
  if (code !== 200) {
    throw new Error(
      `Fallo exportando PDF (HTTP ${code}): ${resp.getContentText().slice(0, 200)}`
    );
  }

  const name = `Dashboard_${sanitizedDate_()}.pdf`;
  const pdfBlob = Utilities.newBlob(resp.getContent(), PDF_MIME, name);
  const file = folder.createFile(pdfBlob);

  toast(`📤 Exportado PDF: ${name}`);
  return file.getUrl();
}

// ----- Orquestador de exportaciones -------------------------------
/**
 * Exporta XLSX del libro y PDF del Dashboard.
 * Devuelve un pequeño resumen con las URLs creadas.
 */
export function exportAll(cfg: Config): { xlsxUrl: string; pdfUrl: string } {
  const x = exportWorkbookXLSX(cfg);
  const p = exportDashboardPDF(cfg);
  toast("✅ Exportaciones completadas");
  return { xlsxUrl: x, pdfUrl: p };
}
