export type Cfg = {
  ROOT_PATH: string;
  SHEET_ID: string;
  MOVE_ENABLED: boolean;
  MOVE_MIN_CONF: number;
  MOVE_FROM_FOLDERS: string[];
  MOVE_DEST_BASE: string;
  FINAL_COUNT: number;
};
export const COLORS = {
  MT_RED: "#E74C3C",
  MT_INK: "#FFFFFF",
  MT_BG: "#F7F8FA",
  MT_LINE: "#DDE1E6"
};
export function sprop() { return PropertiesService.getScriptProperties(); }
export function uprop() { return PropertiesService.getUserProperties(); }
export function toast(msg: string, title = "DriveVision", secs = 6) {
  try { SpreadsheetApp.openById(getActiveSheetId()).toast(msg, title, secs); } catch (_) {}
}
export function getActiveSheetId() {
  const id = sprop().getProperty("ACTIVE_SHEET_ID");
  return id || "";
}
export function setActiveSheetId(id: string) {
  sprop().setProperty("ACTIVE_SHEET_ID", id);
}
export function openSheetById(id: string) { return SpreadsheetApp.openById(id); }
export function getOrCreateSheet(ss: GoogleAppsScript.Spreadsheet.Spreadsheet, name: string) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}
export function ensureFolderPath(path: string): GoogleAppsScript.Drive.Folder {
  const parts = (path || "").split("/").filter(Boolean);
  let cur = DriveApp.getRootFolder();
  let it = cur.getFoldersByName(parts[0]);
  if (!it.hasNext()) cur = DriveApp.createFolder(parts[0]); else cur = it.next();
  for (let i = 1; i < parts.length; i++) {
    it = cur.getFoldersByName(parts[i]);
    cur = it.hasNext() ? it.next() : cur.createFolder(parts[i]);
  }
  return cur;
}
export function findFolderByPath(path: string): GoogleAppsScript.Drive.Folder | null {
  const parts = (path || "").split("/").filter(Boolean);
  let cur = DriveApp.getRootFolder();
  let it = cur.getFoldersByName(parts[0]);
  if (!it.hasNext()) return null;
  cur = it.next();
  for (let i = 1; i < parts.length; i++) {
    it = cur.getFoldersByName(parts[i]);
    if (!it.hasNext()) return null;
    cur = it.next();
  }
  return cur;
}
export function formatHeader(sh: GoogleAppsScript.Spreadsheet.Sheet) {
  const lastCol = Math.max(1, sh.getLastColumn());
  sh.getRange(1, 1, 1, lastCol)
    .setFontWeight("bold")
    .setBackground(COLORS.MT_RED)
    .setFontColor(COLORS.MT_INK)
    .setHorizontalAlignment("center");
  sh.setFrozenRows(1);
}
export function numberFmt(range: GoogleAppsScript.Spreadsheet.Range, fmt = "0") {
  if (range.getNumRows() > 0 && range.getNumColumns() > 0) range.setNumberFormat(fmt);
}
export function nowISO() { return new Date().toISOString(); }

