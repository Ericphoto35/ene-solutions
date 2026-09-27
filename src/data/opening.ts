/** Grande ouverture — 15 septembre 2026, minuit (heure de Paris, CEST). */
export const OPENING_AT_MS = Date.parse("2026-09-15T00:00:00+02:00");

export const OPENING_LABEL = "15 septembre";

export function isSiteGated(now = Date.now()) {
  return now < OPENING_AT_MS;
}

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function countdownParts(now = Date.now()): CountdownParts | null {
  const diff = OPENING_AT_MS - now;
  if (diff <= 0) return null;

  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
