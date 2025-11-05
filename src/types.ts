export type Mode = "FULL" | "DELTA";

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
