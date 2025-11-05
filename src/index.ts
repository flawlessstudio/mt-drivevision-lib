/**
 * index.ts — namespace global + wrappers para Apps Script
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
  version: "DriveVision-Gemini 2.0 (TS)"
};

// Exponer a Apps Script (V8 soporta globalThis)
(globalThis as any).MTDriveVisionGemini = NS;

// Wrappers globales para menú/botones
(globalThis as any).onOpen      = () => NS.Menu.onOpen();
(globalThis as any).runFull     = () => NS.Exports.runFull();
(globalThis as any).runDelta    = () => NS.Exports.runDelta();
(globalThis as any).openSummary = () => NS.Exports.openSummary();
(globalThis as any).exportXLSX  = () => NS.Exports.exportXLSX();
(globalThis as any).exportPDF   = () => NS.Exports.exportPDF();

// Test util (opcional)
(globalThis as any).testLibraryConnection = () => {
  Logger.log("Library loaded: " + (typeof (globalThis as any).MTDriveVisionGemini !== "undefined"));
  Logger.log("Engine module exists: " + (typeof NS.Engine !== "undefined"));
  Logger.log("Engine.runFull exists: " + (typeof NS.Engine.runFull === "function"));
};
