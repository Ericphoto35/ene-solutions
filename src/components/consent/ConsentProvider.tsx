"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { optionalTrackers } from "@/data/trackers";
import {
  OPEN_COOKIE_PREFERENCES_EVENT,
  allChoice,
  emptyChoice,
  getConsentSnapshot,
  getServerConsentSnapshot,
  readConsent,
  subscribeConsent,
  writeConsent,
  type ConsentChoice,
  type ConsentRecord,
} from "@/lib/consent";
import { ConsentScripts } from "./ConsentScripts";
import { CookieBanner } from "./CookieBanner";

type BannerView = "closed" | "notice" | "preferences";

type ConsentContextValue = {
  consent: ConsentRecord | null;
  banner: BannerView;
  openPreferences: () => void;
  closeBanner: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  saveChoice: (choice: ConsentChoice) => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error("useConsent doit être utilisé dans ConsentProvider");
  }
  return context;
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  const [banner, setBanner] = useState<BannerView>("closed");
  const [hasReadConsent, setHasReadConsent] = useState(false);

  if (snapshot.status === "ready" && !hasReadConsent) {
    setHasReadConsent(true);
    if (!snapshot.consent) {
      setBanner((current) => (current === "preferences" ? current : "notice"));
    }
  }

  const consent = snapshot.status === "ready" ? snapshot.consent : null;

  useEffect(() => {
    const openPreferences = () => setBanner("preferences");
    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
    return () =>
      window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
  }, []);

  const commit = useCallback((choice: ConsentChoice) => {
    const previous = readConsent();
    const next = writeConsent(choice);
    setBanner("closed");

    const revoked = optionalTrackers.some(
      (tracker) =>
        previous?.[tracker.category] === true && !next[tracker.category],
    );
    if (revoked) {
      window.location.reload();
    }
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      banner,
      openPreferences: () => setBanner("preferences"),
      closeBanner: () => setBanner(consent ? "closed" : "notice"),
      acceptAll: () => commit(allChoice),
      rejectAll: () => commit(emptyChoice),
      saveChoice: (choice) => commit(choice),
    }),
    [banner, commit, consent],
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {banner !== "closed" ? <CookieBanner /> : null}
      <ConsentScripts />
    </ConsentContext.Provider>
  );
}
