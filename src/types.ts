// =========================================================
// types.ts — Tipos globales
// =========================================================

export enum RunMode {
  FULL = "FULL",
  DELTA = "DELTA",
}

export interface Config {
  ROOT_PATH: string;
  SHEET_ID: string;
}

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

export interface EngineOptions {
  verbose?: boolean;
  autoSave?: boolean;
  [key: string]: any;
}
