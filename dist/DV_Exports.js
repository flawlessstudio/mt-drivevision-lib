import { openSheetById, findFolderByPath } from "./DV_Core";
function exportBlob(url, name) {
    const blob = UrlFetchApp.fetch(url, {
        headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() }
    }).getBlob().setName(name);
    return blob;
}
export function exportXLSX(cfg) {
    const url = `https://docs.google.com/spreadsheets/d/${cfg.SHEET_ID}/export?format=xlsx`;
    const blob = exportBlob(url, "indice.xlsx");
    const out = findFolderByPath(cfg.ROOT_PATH);
    if (!out)
        throw new Error("Ruta no encontrada para export.");
    const f = out.createFile(blob);
    return f.getUrl();
}
export function exportPDF(cfg) {
    const params = ["format=pdf", "size=A4", "portrait=false", "fitw=true", "sheetnames=true", "gridlines=false"].join("&");
    const url = `https://docs.google.com/spreadsheets/d/${cfg.SHEET_ID}/export?${params}`;
    const blob = exportBlob(url, "indice.pdf");
    const out = findFolderByPath(cfg.ROOT_PATH);
    if (!out)
        throw new Error("Ruta no encontrada para export.");
    const f = out.createFile(blob);
    return f.getUrl();
}
export function exportDashboard(cfg) {
    const ss = openSheetById(cfg.SHEET_ID);
    const dash = ss.getSheetByName("Dashboard de conteos");
    if (!dash)
        throw new Error("No existe Dashboard de conteos");
    const url = `https://docs.google.com/spreadsheets/d/${cfg.SHEET_ID}/export?format=pdf&gid=${dash.getSheetId()}`;
    const blob = exportBlob(url, "dashboard.pdf");
    const out = findFolderByPath(cfg.ROOT_PATH);
    if (!out)
        throw new Error("Ruta no encontrada para export.");
    const f = out.createFile(blob);
    return f.getUrl();
}
