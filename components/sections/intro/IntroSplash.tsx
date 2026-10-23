"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Dictionary } from "@/dictionaries/get-dictionary";

interface IntroSplashProps {
  dict: Dictionary["intro"];
}

type Phase = "loading" | "leaving" | "done";

const MIN_VISIBLE_MS = 2600; // tiempo mínimo para que la foto se luzca
const MAX_WAIT_MS = 6000; // nunca bloquea la página más que esto
const BAR_FILL_MS = 400; // la barra llega al 100 % antes de salir
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
 * logo y una barra de carga. Sale sola cuando la página terminó de cargar
 * (mínimo 2,6 s, máximo 6 s).
 *
 * - El scroll se bloquea con CSS (globals.css, html:has(#intro-splash[data-state="open"]))
 *   desde el primer pintado y se libera en cuanto empieza la salida.
 * - La pantalla mide el ancho de la ventana (100vw), no el del contenido: cuando
 *   reaparece la barra de scroll, ni la pantalla ni el logo se mueven.
 * - El fundido arranca 150 ms después: la página de abajo se reacomoda a la
 *   barra de scroll mientras la pantalla todavía la tapa por completo.
 * - Todo se anima con opacidad y transform (la barra usa scaleX), sin filtros.
 */
export function IntroSplash({ dict }: IntroSplashProps) {
  const [phase, setPhase] = useState<Phase>(() => (dismissedThisLoad ? "done" : "loading"));
  const [progress, setProgress] = useState(0);

  // Carga: la barra avanza mientras carga la página; al terminar se completa y sale
  useEffect(() => {
    if (phase !== "loading") return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const start = performance.now();
    const frame = requestAnimationFrame(() => setProgress(0.85));
    const loaded = Promise.all([waitForWindowLoad(), document.fonts?.ready]);

    Promise.race([loaded, new Promise((r) => setTimeout(r, MAX_WAIT_MS))]).then(() => {
      if (cancelled) return;
      const remaining = Math.max(0, MIN_VISIBLE_MS - (performance.now() - start));
      timers.push(
        setTimeout(() => {
          setProgress(1);
          timers.push(
            setTimeout(() => {
              dismissedThisLoad = true;
              setPhase("leaving");
            }, BAR_FILL_MS),
          );
        }, remaining),
      );
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
    };
    // Solo al montar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Se desmonta al terminar el fundido de salida
  useEffect(() => {
    if (phase !== "leaving") return;
    const timer = setTimeout(() => setPhase("done"), EXIT_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === "done") return null;

  const leaving = phase === "leaving";

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
      {/* Foto a pantalla completa con acercamiento lento. Al salir, el desenfoque es un
          fundido hacia una copia ya desenfocada (96 px estirada) y una capa oscura: solo se
          anima la opacidad, que el navegador resuelve en la GPU sin recalcular filtros */}
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
        <Image
          src="/images/produsal-bienvenida-pilas-blur.webp"
          alt=""
          fill
          priority
          unoptimized
          className={`object-cover object-center scale-105 transition-opacity duration-500 ease-out ${leaving ? "opacity-100" : "opacity-0"}`}
        />
        <div className={`absolute inset-0 bg-[#0c2240] transition-opacity duration-500 ease-out ${leaving ? "opacity-50" : "opacity-0"}`} />
      </div>

      {/* Capas para legibilidad y color de marca */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c2240]/90 via-[#0c2240]/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,34,64,0.45)_0%,transparent_55%,rgba(12,34,64,0.5)_100%)]" />

      {/* Solo el logo */}
      <div
        className={`relative z-10 h-full flex items-center justify-center px-8 transition-[opacity,transform] duration-500 ease-out ${
          leaving ? "opacity-0 scale-95" : ""
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

      {/* Barra de carga */}
      <div className={`absolute inset-x-0 bottom-0 z-10 transition-opacity duration-300 ${leaving ? "opacity-0" : "opacity-100"}`}>
        {/* La animación de entrada va en un hijo: quitarla al salir haría parpadear la opacidad */}
        <div className="flex justify-center px-6 pb-12 sm:pb-16 animate-slide-up-delay-2">
          <div className="w-40 sm:w-56 h-0.5 rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#02aeaa] via-[#85b2cf] to-[#e5c798] transition-transform ease-out"
              style={{
                transform: `scaleX(${progress})`,
                transitionDuration: progress === 1 ? `${BAR_FILL_MS}ms` : `${MIN_VISIBLE_MS}ms`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
