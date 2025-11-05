import { onOpenMenu, setupAll } from "./DV_Menu";
import { run, openSummary, selfCheck, setMoveFlag } from "./DV_Engine";
import { exportXLSX, exportPDF, exportDashboard } from "./DV_Exports";
import { analyzeGemini } from "./DV_Gemini";
declare const global: any;
global.onOpenMenu=onOpenMenu;
global.setupAll=setupAll;
global.run=run;
global.openSummary=openSummary;
global.selfCheck=selfCheck;
global.setMoveFlag=setMoveFlag;
global.exportXLSX=exportXLSX;
global.exportPDF=exportPDF;
global.exportDashboard=exportDashboard;
global.analyzeGemini=analyzeGemini;

