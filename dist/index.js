/**
 * index.js — pegamento del namespace global.
 * Expone MTDriveVisionGemini y funciones globales para el menú.
 */

import * as Core    from "./DV_Core";
import * as Engine  from "./DV_Engine";
import * as Exports from "./DV_Exports";
import * as Gemini  from "./DV_Gemini";
import * as Menu    from "./DV_Menu";

const NS = {
  Core,
  Engine,
  Exports,
  Gemini,
  Menu,
  version: "DriveVision-Gemini 2.0 (stable)"
};

// expone en entorno Apps Script
globalThis.MTDriveVisionGemini = NS;

// === Wrappers globales para que el menú y los botones funcionen ===
function onOpen()     { return NS.Menu.onOpen(); }
function runFull()    { return NS.Exports.runFull(); }
function runDelta()   { return NS.Exports.runDelta(); }
function openSummary(){ return NS.Exports.openSummary(); }
function exportXLSX() { return NS.Exports.exportXLSX(); }
function exportPDF()  { return NS.Exports.exportPDF(); }

// también útiles desde el editor para probar
function testLibraryConnection() {
  Logger.log("Library loaded: " + (typeof globalThis.MTDriveVisionGemini !== "undefined"));
  Logger.log("Engine module exists: " + (typeof NS.Engine !== "undefined"));
  Logger.log("Engine.run exists: " + (typeof NS.Engine.run === "function"));
  if (typeof NS.Engine.run === "function") {
    Logger.log("✅ Ready to execute Engine.run(cfg, mode)");
  } else {
    Logger.log("❌ Engine.run not accessible");
  }
}
