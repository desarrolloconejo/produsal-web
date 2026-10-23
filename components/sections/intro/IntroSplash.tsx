"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Dictionary } from "@/dictionaries/get-dictionary";

interface IntroSplashProps {
  dict: Dictionary["intro"];
}

type Phase = "loading" | "ready" | "leaving" | "done";

const MAX_WAIT_MS = 6000; // si algo tarda demasiado, igual se marca el botón como listo
const EXIT_MS = 1150; // retraso + fundido de salida (delay-150 + duration-1000)

// Sale en cada carga completa de la página; si se navega dentro del sitio y se
// vuelve al inicio sin recargar, no se repite
let dismissedThisLoad = false;

const waitForWindowLoad = () =>
  new Promise<void>((resolve) => {
    if (document.readyState === "complete") return resolve();
    window.addEventListener("load", () => resolve(), { once: true });
  });

/**
 * Bienvenida del inicio: foto de las pilas de sal a pantalla completa con el
 * logo. El usuario decide cuándo entrar.
 *
 * - El scroll se bloquea con CSS (globals.css, html:has(#intro-splash[data-state="open"]))
 *   desde el primer pintado y se libera en cuanto empieza la salida.
 * - La pantalla mide el ancho de la ventana (100vw), no el del contenido: cuando
 *   reaparece la barra de scroll, ni la pantalla ni el logo se mueven.
 * - El fundido arranca 150 ms después: la página de abajo se reacomoda a la
 *   barra de scroll mientras la pantalla todavía la tapa por completo.
 */
export function IntroSplash({ dict }: IntroSplashProps) {
  const [phase, setPhase] = useState<Phase>(() => (dismissedThisLoad ? "done" : "loading"));
  const enterRef = useRef<HTMLButtonElement>(null);

  // Espera la carga de la página: al terminar, el botón para entrar se marca más
  useEffect(() => {
    if (phase !== "loading") return;
    let cancelled = false;
    const loaded = Promise.all([waitForWindowLoad(), document.fonts?.ready]);

    Promise.race([loaded, new Promise((r) => setTimeout(r, MAX_WAIT_MS))]).then(() => {
      if (!cancelled) setPhase((p) => (p === "loading" ? "ready" : p));
    });

    return () => {
      cancelled = true;
    };
    // Solo al montar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Con la página lista, el foco pasa al botón para poder entrar con Enter
  useEffect(() => {
    if (phase === "ready") enterRef.current?.focus({ preventScroll: true });
  }, [phase]);

  // Se desmonta al terminar el fundido de salida
  useEffect(() => {
    if (phase !== "leaving") return;
    const timer = setTimeout(() => setPhase("done"), EXIT_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === "done") return null;

  const leaving = phase === "leaving";
  const ready = phase === "ready";

  const enter = () => {
    dismissedThisLoad = true;
    setPhase("leaving");
  };

  return (
    <div
      id="intro-splash"
      data-state={leaving ? "leaving" : "open"}
      role="dialog"
      aria-modal="true"
      aria-label={dict.label}
      aria-busy={phase === "loading"}
      className={`fixed top-0 left-0 w-screen h-dvh z-[100] overflow-hidden bg-[#0c2240] text-white transition-opacity duration-1000 delay-150 ease-in-out ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Foto a pantalla completa: acercamiento lento; al salir se desenfoca y oscurece */}
      <div
        className={`absolute inset-0 will-change-[filter] transition-[filter] duration-700 ease-out ${
          leaving ? "blur-lg brightness-50" : "blur-[0px] brightness-100"
        }`}
      >
        <div className="absolute inset-0 will-change-transform animate-ken-burns">
          <Image
            src="/images/produsal-bienvenida-pilas.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={90}
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Capas para legibilidad y color de marca */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c2240]/90 via-[#0c2240]/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,34,64,0.45)_0%,transparent_55%,rgba(12,34,64,0.5)_100%)]" />

      {/* Solo el logo */}
      <div
        className={`relative z-10 h-full flex items-center justify-center px-8 transition-[opacity,filter] duration-500 ease-out ${
          leaving ? "opacity-0 blur-sm" : ""
        }`}
      >
        <Image
          src="/images/PRODUSAL-white.webp"
          alt="Produsal"
          width={6854}
          height={1244}
          priority
          sizes="(max-width: 640px) 80vw, 480px"
          className="w-[min(80vw,480px)] h-auto drop-shadow-[0_4px_24px_rgba(12,34,64,0.6)] animate-slide-up"
        />
      </div>

      {/* Botón para entrar: el usuario decide cuándo pasar a la página */}
      <div className={`absolute inset-x-0 bottom-0 z-10 transition-opacity duration-300 ${leaving ? "opacity-0" : "opacity-100"}`}>
        {/* La animación de entrada va en un hijo: quitarla al salir haría parpadear la opacidad */}
        <div className="flex justify-center px-6 pb-10 sm:pb-14 animate-slide-up-delay-2">
          <button
            ref={enterRef}
            type="button"
            onClick={enter}
            className={`type-caption tracking-[0.2em] px-6 py-2 rounded-full border transition-colors duration-500 cursor-pointer hover:bg-white/10 hover:text-white hover:border-white/60 focus:outline-hidden focus-visible:ring-1 focus-visible:ring-white/60 ${
              ready ? "border-white/35 text-white/85" : "border-white/15 text-white/50"
            }`}
          >
            {dict.skip}
          </button>
        </div>
      </div>
    </div>
  );
}
