import { Cfg, openSheetById, getOrCreateSheet, formatHeader, numberFmt, findFolderByPath, nowISO, toast } from "./DV_Core";
const INDEX_SHEET = "MT_INDICE_INVENTARIO_MENAJE_2025";
const SUMMARY_SHEET = "Resumen Automático";
const DASHBOARD_SHEET = "Dashboard de conteos";
type DBRec = {
  id: string; name: string; url: string; thumb: string;
  parentId: string; folderName: string; size: number; created?: string; updated?: string; sig: string;
};
export function run(cfg: Cfg, mode: "FULL" | "DELTA" | "AUTO") {
  const ss = openSheetById(cfg.SHEET_ID);
  const root = findFolderByPath(cfg.ROOT_PATH);
  if (!root) throw new Error("Ruta no encontrada: " + cfg.ROOT_PATH);
  const files = root.getFiles();
  const rows: DBRec[] = [];
  while (files.hasNext()) {
    const f = files.next();
    if (!f.getMimeType().startsWith("image/")) continue;
    rows.push({
      id: f.getId(),
      name: f.getName(),
      url: "https://drive.google.com/uc?export=view&id=" + f.getId(),
      thumb: "https://drive.google.com/thumbnail?sz=w400&id=" + f.getId(),
      parentId: root.getId(),
      folderName: root.getName(),
      size: f.getSize() || 0,
      created: f.getDateCreated().toISOString(),
      updated: f.getLastUpdated().toISOString(),
      sig: (f.getLastUpdated().toISOString() || "") + "#" + (f.getSize() || 0)
    });
  }
  const index = getOrCreateSheet(ss, INDEX_SHEET);
  index.clear();
  const headers = ["Imagen (miniatura)","Nombre de archivo","Subcarpeta","URL imagen","Tamaño (KB)","Creación","Modificación"];
  index.getRange(1,1,1,headers.length).setValues([headers]);
  const out = rows.map(o=>[
    `=IMAGE("${o.thumb}")`, o.name, o.folderName, o.url, Math.round(o.size/1024), new Date(o.created||""), new Date(o.updated||"")
  ]);
  if (out.length) index.getRange(2,1,out.length,headers.length).setValues(out);
  formatHeader(index);
  if (out.length) {
    numberFmt(index.getRange(2,5,out.length,1),"0");
    numberFmt(index.getRange(2,6,out.length,2),"dd/mm/yyyy hh:mm");
  }
  index.autoResizeColumns(1, headers.length);
  index.setColumnWidth(1, 130);
  index.getRange(1,1,index.getLastRow(),headers.length).createFilter();
  const sum = getOrCreateSheet(ss, SUMMARY_SHEET);
  sum.clear();
  const m = new Map<string,number>();
  rows.forEach(r=>{
    const k = r.folderName;
    m.set(k, (m.get(k)||0)+1);
  });
  const srows = [["Subcarpeta","Cantidad"], ...Array.from(m.entries()).sort().map(([k,c])=>[k,c])];
  sum.getRange(1,1,srows.length,2).setValues(srows);
  formatHeader(sum);
  if (srows.length>1) numberFmt(sum.getRange(2,2,srows.length-1,1),"0");
  sum.autoResizeColumns(1,2);
  const dash = getOrCreateSheet(ss, DASHBOARD_SHEET);
  dash.clear();
  dash.getRange(1,1,1,2).setValues([["Métrica","Valor"]]);
  dash.getRange(2,1,3,2).setValues([
    ["Total imágenes", rows.length],
    ["Subcarpetas únicas", m.size],
    ["Fecha última actualización", nowISO()]
  ]);
  formatHeader(dash);
  dash.autoResizeColumns(1,2);
  toast(`OK ${mode} · archivos: ${rows.length} · ${nowISO()}`);
}
export function openSummary(cfg: Cfg) {
  const ss = openSheetById(cfg.SHEET_ID);
  const sh = getOrCreateSheet(ss, SUMMARY_SHEET);
  ss.setActiveSheet(sh);
}
export function selfCheck(cfg: Cfg) {
  const root = findFolderByPath(cfg.ROOT_PATH);
  const ok = !!root;
  return { ok, root: root ? root.getName() : null, when: nowISO() };
}
export function setMoveFlag(_cfg: Cfg, _flag: boolean){}

