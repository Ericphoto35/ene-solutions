import { legal } from "@/data/legal";
import type { TrackerCategory } from "@/data/trackers";

export type ConsentChoice = Record<TrackerCategory, boolean>;

export type ConsentRecord = ConsentChoice & {
  necessary: true;
  version: string;
  updatedAt: string;
};

export const emptyChoice: ConsentChoice = {
  analytics: false,
  marketing: false,
  thirdParty: false,
};

export const allChoice: ConsentChoice = {
  analytics: true,
  marketing: true,
  thirdParty: true,
};

function isConsentRecord(value: unknown): value is ConsentRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    record.version === legal.policyVersion &&
    record.necessary === true &&
    typeof record.updatedAt === "string" &&
    typeof record.analytics === "boolean" &&
    typeof record.marketing === "boolean" &&
    typeof record.thirdParty === "boolean"
  );
}

function readRawConsentCookie(): string | null {
  if (typeof document === "undefined") return null;
  const row = document.cookie
    .split("; ")
    .find((part) => part.startsWith(`${legal.consentCookieName}=`));
  return row ? row.slice(legal.consentCookieName.length + 1) : null;
}

export function readConsent(): ConsentRecord | null {
  return parseConsent(readRawConsentCookie());
}

function parseConsent(raw: string | null): ConsentRecord | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(raw));
    return isConsentRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export type ConsentSnapshot =
  | { status: "pending" }
  | { status: "ready"; consent: ConsentRecord | null };

const serverSnapshot: ConsentSnapshot = { status: "pending" };
let cachedCookie: string | null | undefined;
let cachedSnapshot: ConsentSnapshot = { status: "ready", consent: null };
const listeners = new Set<() => void>();

export function subscribeConsent(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getConsentSnapshot(): ConsentSnapshot {
  const raw = readRawConsentCookie();
  if (raw === cachedCookie && cachedSnapshot.status === "ready") {
    return cachedSnapshot;
  }
  cachedCookie = raw;
  cachedSnapshot = { status: "ready", consent: parseConsent(raw) };
  return cachedSnapshot;
}

export function getServerConsentSnapshot(): ConsentSnapshot {
  return serverSnapshot;
}

function emitConsent() {
  for (const listener of listeners) listener();
}

export function writeConsent(choice: ConsentChoice): ConsentRecord {
  const record: ConsentRecord = {
    necessary: true,
    version: legal.policyVersion,
    updatedAt: new Date().toISOString(),
    analytics: choice.analytics,
    marketing: choice.marketing,
    thirdParty: choice.thirdParty,
  };

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${legal.consentCookieName}=${encodeURIComponent(JSON.stringify(record))}; Path=/; Max-Age=${legal.consentMaxAgeSeconds}; SameSite=Lax${secure}`;
  emitConsent();

  return record;
}
