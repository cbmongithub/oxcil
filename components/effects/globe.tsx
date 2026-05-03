"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import type { COBEOptions, Globe as COBEGlobe } from "cobe";

import { cn } from "@/lib/utils";

const GLOBE_BASE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.22,
  diffuse: 1.15,
  mapSamples: 16000,
  mapBrightness: 5.5,
  mapBaseBrightness: 0.35,
  markers: [
    { location: [14.5995, 120.9842], size: 0.03, id: "manila" },
    { location: [19.076, 72.8777], size: 0.1, id: "mumbai" },
    { location: [23.8103, 90.4125], size: 0.05, id: "dhaka" },
    { location: [30.0444, 31.2357], size: 0.07, id: "cairo" },
    { location: [39.9042, 116.4074], size: 0.08, id: "beijing" },
    { location: [-23.5505, -46.6333], size: 0.1, id: "sao-paulo" },
    { location: [19.4326, -99.1332], size: 0.1, id: "mexico-city" },
    { location: [40.7128, -74.006], size: 0.1, id: "new-york" },
    { location: [34.6937, 135.5022], size: 0.05, id: "osaka" },
    { location: [41.0082, 28.9784], size: 0.06, id: "istanbul" },
  ],
  baseColor: [1, 1, 1] as [number, number, number],
  markerColor: [0.18, 0.42, 0.95] as [number, number, number],
  glowColor: [0.82, 0.9, 1] as [number, number, number],
  dark: 0,
};

const DARK_THEME_CONFIG = {
  dark: 1,
  baseColor: [0.12, 0.16, 0.28] as [number, number, number],
  markerColor: [0.42, 0.61, 1] as [number, number, number],
  glowColor: [0.2, 0.32, 0.58] as [number, number, number],
};

const LIGHT_THEME_CONFIG = {
  dark: 0,
  baseColor: [1, 1, 1] as [number, number, number],
  markerColor: [0.18, 0.42, 0.95] as [number, number, number],
  glowColor: [0.9, 0.95, 1] as [number, number, number],
};

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const rotationOffset = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const globeRef = useRef<COBEGlobe | null>(null);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  function updatePointerInteraction(value: number | null) {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  }

  function updateMovement(clientX: number) {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      rotationOffset.current = delta / 200;
    }
  }

  function onResize() {
    if (canvasRef.current) {
      widthRef.current = canvasRef.current.offsetWidth;
    }
  }

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    async function initGlobe() {
      try {
        if (globeRef.current) {
          globeRef.current.destroy();
          globeRef.current = null;
        }

        const createGlobe = (await import("cobe")).default;

        if (cancelled || !canvasRef.current) return;

        window.addEventListener("resize", onResize);
        onResize();

        const themeConfig = isDark ? DARK_THEME_CONFIG : LIGHT_THEME_CONFIG;

        globeRef.current = createGlobe(canvasRef.current, {
          ...GLOBE_BASE_CONFIG,
          ...themeConfig,
          width: widthRef.current * 2,
          height: widthRef.current * 2,
        });

        function render() {
          if (!globeRef.current) return;

          if (!pointerInteracting.current) phiRef.current += 0.005;

          globeRef.current.update({
            phi: phiRef.current + rotationOffset.current,
            width: widthRef.current * 2,
            height: widthRef.current * 2,
          });

          frameRef.current = window.requestAnimationFrame(render);
        }

        frameRef.current = window.requestAnimationFrame(render);
        setIsLoaded(true);

        timeoutId = setTimeout(() => {
          if (canvasRef.current) {
            canvasRef.current.style.opacity = "1";
          }
        }, 100);
      } catch (error) {
        console.error("Failed to load globe:", error);
        setIsLoaded(true);
      }
    }

    initGlobe();

    return () => {
      cancelled = true;
      if (timeoutId !== null) clearTimeout(timeoutId);
      globeRef.current?.destroy();
      globeRef.current = null;
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      window.removeEventListener("resize", onResize);
    };
  }, [isDark]);

  return (
    <div
      className={cn("absolute inset-0 mx-auto aspect-square w-full max-w-150", className)}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="border-primary size-8 animate-spin rounded-full border border-t-transparent" />
        </div>
      )}
      <canvas
        className="size-full opacity-0 transition-opacity duration-500 contain-[layout_paint_size]"
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(e.clientX - pointerInteractionMovement.current)
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  );
}
