// =========================================================
// types.ts — Tipos globales de la librería
// =========================================================

// Sustituimos el antiguo type Mode por un enum más robusto
export enum RunMode {
  FULL = "FULL",
  DELTA = "DELTA",
}

// Configuración general del sistema
export interface Config {
  ROOT_PATH: string;
  SHEET_ID: string;
}

// Estructura de fila estándar
export interface Row {
  id: string;
  name: string;
  url: string;
  thumb: string;
  parentId: string;
  folderName: string;
  size: number;
  created: string;
  updated: string;
  sig: string;
}

// Opciones del motor
export interface EngineOptions {
  verbose?: boolean;
  autoSave?: boolean;
  [key: string]: any;
}
