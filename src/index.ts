// src/index.ts
import * as Core from './DV_Core';
import * as EngineModule from './DV_Engine';
import * as Exports from './DV_Exports';
import * as Gemini from './DV_Gemini';
import * as Menu from './DV_Menu';

const Engine = {
  runFull:     EngineModule.runFull,
  runDelta:    EngineModule.runDelta,
  openSummary: EngineModule.openSummary,
  exportXLSX:  EngineModule.exportXLSX,
  exportPDF:   EngineModule.exportPDF,
};

(global as any).MTDriveVisionGemini = { Core, Engine, Exports, Gemini, Menu };
