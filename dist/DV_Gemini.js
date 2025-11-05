/**
 * DV_Gemini.js — capa de IA (placeholder estable, sin coste).
 * Deja los métodos listos para integrar Gemini cuando quieras.
 */

export const G_VERSION = "0.3-safe";

/**
 * Analiza (futuro) una imagen en base64 y devuelve etiqueta/confianza.
 * Hoy devuelve un resultado determinista para que no rompa flujos.
 */
export async function analyzeImageBase64(_b64) {
  return { label: "Objeto", confidence: 0.90 };
}

/** Resume una lista de resultados de visión. */
export function summarize(results = []) {
  if (!Array.isArray(results)) return "";
  return results
    .map(r => `${r.label} (${Math.round((r.confidence || 0) * 100)}%)`)
    .join("\n");
}
