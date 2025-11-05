/**
 * DV_Gemini.ts — capa de IA (placeholder estable, sin coste).
 */
export const G_VERSION = "0.3-safe";

export interface VisionResult {
  label: string;
  confidence: number;
}

export async function analyzeImageBase64(_b64: string): Promise<VisionResult> {
  return { label: "Objeto", confidence: 0.90 };
}

export function summarize(results: VisionResult[] = []): string {
  return results
    .map(r => `${r.label} (${Math.round((r.confidence || 0) * 100)}%)`)
    .join("\n");
}
