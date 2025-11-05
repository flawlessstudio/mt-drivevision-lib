/**
 * DV_Core.ts — utilidades puras (Drive/Sheets/UI)
 */

export const CORE_VERSION = "1.3-BNS";

export function openSheetById(id: string): GoogleAppsScript.Spreadsheet.Spreadsheet {
  if (!id || typeof id !== "string") throw new Error("openSheetById: SHEET_ID inválido");
  return SpreadsheetApp.openById(id);
}

export function getOrCreateSheet(
  ss: GoogleAppsScript.Spreadsheet.Spreadsheet,
  name: string
): GoogleAppsScript.Spreadsheet.Sheet {
  if (!ss) throw new Error("getOrCreateSheet: Spreadsheet nulo");
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  return sh;
}

export function formatHeader(sheet: GoogleAppsScript.Spreadsheet.Sheet): void {
  const lastCol = sheet.getLastColumn() || 1;
  const r = sheet.getRange(1, 1, 1, lastCol);
  r.setFontWeight("bold")
    .setBackground("#F7F8FA")
    .setFontFamily("Inter")
    .setHorizontalAlignment("left")
    .setVerticalAlignment("middle")
    .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
  sheet.setFrozenRows(1);
}

export function numberFmt(range: GoogleAppsScript.Spreadsheet.Range | null, pattern: string): void {
  if (!range) return;
  try { range.setNumberFormat(pattern); } catch { /* noop */ }
}

export function nowISO(): string {
  const tz = Session.getScriptTimeZone() || "Europe/Madrid";
  return Utilities.formatDate(new Date(), tz, "yyyy-MM-dd'T'HH:mm:ss");
}

/** Busca carpeta por ruta "MT_DOCS_2025/MT_INVENTARIO_MENAJE_2025" */
export function findFolderByPath(path: string): GoogleAppsScript.Drive.Folder | null {
  if (!path) return null;
  const parts = path.split("/").filter(Boolean);
  let cursor = DriveApp.getRootFolder();

  if (parts.length && /^(my drive|mi unidad)$/i.test(parts[0])) parts.shift();

  for (const p of parts) {
    let found: GoogleAppsScript.Drive.Folder | null = null;
    const it = cursor.getFoldersByName(p);
    while (it.hasNext()) { found = it.next(); break; }
    if (!found) return null;
    cursor = found;
  }
  return cursor;
}

export function toast(msg: string): void {
  try {
    (SpreadsheetApp.getActive() || SpreadsheetApp).toast(msg, "DriveVision", 5);
  } catch {
    Logger.log(msg);
  }
}

export function resetSheet(sheet: GoogleAppsScript.Spreadsheet.Sheet | null): void {
  if (!sheet) return;
  try { sheet.clear({ contentsOnly: true }); } catch {}
  try { sheet.getFilter()?.remove(); } catch {}
  try { sheet.setFrozenRows(0); } catch {}
}

export function nap(ms: number): void {
  if (ms > 0) Utilities.sleep(ms);
}
