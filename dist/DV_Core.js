/**
 * DV_Core.js — utilidades puras (Drive/Sheets/UI)
 * No depende de otros módulos.
 */

export const CORE_VERSION = "1.3-BNS";

/** Abre un Spreadsheet por ID con validación. */
export function openSheetById(id) {
  if (!id || typeof id !== "string") {
    throw new Error("openSheetById: SHEET_ID inválido");
  }
  return SpreadsheetApp.openById(id);
}

/** Obtiene o crea hoja por nombre, devuelve Sheet. */
export function getOrCreateSheet(ss, name) {
  if (!ss) throw new Error("getOrCreateSheet: Spreadsheet nulo");
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  return sh;
}

/** Formato de encabezado (fila 1) con estilo limpio. */
export function formatHeader(sheet) {
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

/** Aplica formato numérico a un rango (seguro). */
export function numberFmt(range, pattern) {
  if (!range) return;
  try { range.setNumberFormat(pattern); } catch (_e) {}
}

/** Devuelve Date ISO (zona horaria del script). */
export function nowISO() {
  const tz = Session.getScriptTimeZone() || "Europe/Madrid";
  return Utilities.formatDate(new Date(), tz, "yyyy-MM-dd'T'HH:mm:ss");
}

/**
 * Busca una carpeta por ruta "root/sub1/sub2".
 * Devuelve DriveApp.Folder o null si no existe.
 */
export function findFolderByPath(path) {
  if (!path) return null;
  const parts = path.split("/").filter(Boolean);
  let cursor = DriveApp.getRootFolder();
  // si empieza por "My Drive" o "Mi unidad", saltarlo
  if (/^my drive|mi unidad$/i.test(parts[0])) parts.shift();
  for (const p of parts) {
    let found = null;
    const it = cursor.getFoldersByName(p);
    while (it.hasNext()) {
      found = it.next();
      break;
    }
    if (!found) return null;
    cursor = found;
  }
  return cursor;
}

/** Toast amable en la UI si hay hoja activa; si no, log. */
export function toast(msg) {
  try {
    const ui = SpreadsheetApp.getUi();
    (SpreadsheetApp.getActive() || SpreadsheetApp).toast(msg, "DriveVision", 5);
  } catch (_e) {
    Logger.log(msg);
  }
}

/** Limpia filtros/formatos de una hoja de forma segura. */
export function resetSheet(sheet) {
  if (!sheet) return;
  try { sheet.clear({ contentsOnly: true }); } catch (_e) {}
  try { sheet.getFilter()?.remove(); } catch (_e) {}
  try { sheet.setFrozenRows(0); } catch (_e) {}
}

/** Pequeño sleep cooperativo para grandes lotes. */
export function nap(ms) {
  if (!ms) return;
  Utilities.sleep(ms);
}
