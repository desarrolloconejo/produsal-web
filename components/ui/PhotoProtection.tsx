"use client";

import { useEffect } from "react";

function isPhoto(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLImageElement)) return false;

  // Next Image keeps the original asset path in the optimizer's url parameter.
  const source = new URL(target.currentSrc || target.src, window.location.href);
  const path = source.searchParams.get("url") || source.pathname;

  return /^\/images\/(?:produsal-|products\/|galeria\/)/.test(path);
}

export function PhotoProtection() {
  useEffect(() => {
    function preventPhotoAction(event: Event) {
      if (isPhoto(event.target)) event.preventDefault();
    }

    document.addEventListener("contextmenu", preventPhotoAction, true);
    document.addEventListener("dragstart", preventPhotoAction, true);

    return () => {
      document.removeEventListener("contextmenu", preventPhotoAction, true);
      document.removeEventListener("dragstart", preventPhotoAction, true);
    };
  }, []);

  return null;
}
