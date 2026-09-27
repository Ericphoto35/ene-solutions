"use client";

import { requestOpenCookiePreferences } from "@/lib/consent";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-bright";

export function ManageCookiesButton() {
  return (
    <button
      type="button"
      onClick={requestOpenCookiePreferences}
      aria-haspopup="dialog"
      aria-controls="cookie-consent"
      className={`cursor-pointer bg-transparent p-0 text-sm text-mist-muted transition-colors hover:text-mist ${focusRing}`}
    >
      Gérer mes cookies
    </button>
  );
}
