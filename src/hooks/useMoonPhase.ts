import { useMemo } from "react";

export type MoonPhase =
  | "Bulan Baru"
  | "Sabit Awal"
  | "Separuh Awal"
  | "Gibbous Awal"
  | "Purnama"
  | "Gibbous Akhir"
  | "Separuh Akhir"
  | "Sabut Akhir";

export interface MoonPhaseData {
  phase: MoonPhase;
  phaseValue: number; // 0-1, 0=new moon, 0.5=full moon
  illumination: number; // 0-100%
  age: number; // days since new moon
}

// Calculate moon phase using astronomical algorithm
// Based on known new moon: January 6, 2000
function calculateMoonPhase(date: Date = new Date()): MoonPhaseData {
  const knownNewMoon = new Date("2000-01-06T18:14:00Z").getTime();
  const now = date.getTime();
  const synodicMonth = 29.53058867; // days

  const diffDays = (now - knownNewMoon) / (1000 * 60 * 60 * 24);
  const age = diffDays % synodicMonth;
  const phaseValue = age / synodicMonth;

  // Illumination percentage
  const illumination = (1 - Math.cos(phaseValue * 2 * Math.PI)) / 2 * 100;

  let phase: MoonPhase;
  if (phaseValue < 0.03 || phaseValue > 0.97) phase = "Bulan Baru";
  else if (phaseValue < 0.22) phase = "Sabit Awal";
  else if (phaseValue < 0.28) phase = "Separuh Awal";
  else if (phaseValue < 0.47) phase = "Gibbous Awal";
  else if (phaseValue < 0.53) phase = "Purnama";
  else if (phaseValue < 0.72) phase = "Gibbous Akhir";
  else if (phaseValue < 0.78) phase = "Separuh Akhir";
  else phase = "Sabut Akhir";

  return { phase, phaseValue, illumination, age };
}

export function useMoonPhase() {
  return useMemo(() => calculateMoonPhase(), []);
}
