"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Cell = {
  row: number;
  col: number;
};

type BackgroundRippleProps = {
  rows?: number;
  cols?: number;
  intervalMs?: number;
};

export function BackgroundRipple({
  rows = 8,
  cols = 27,
  intervalMs = 1400,
}: BackgroundRippleProps) {
  const [activeCell, setActiveCell] = useState<Cell | null>(null);
  const [rippleId, setRippleId] = useState(0);

  useEffect(() => {
    // Pick a new origin cell on a fixed cadence so the background feels alive.
    const id = setInterval(() => {
      setActiveCell({
        row: Math.floor(Math.random() * rows),
        col: Math.floor(Math.random() * cols),
      });
      setRippleId((k) => k + 1);
    }, intervalMs);
    return () => clearInterval(id);
  }, [rows, cols, intervalMs]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full min-h-full w-full overflow-hidden"
      style={
        {
          "--cell-border":
            "color-mix(in oklab, var(--oxcil-brand-border) 72%, transparent)",
          "--cell-fill": "color-mix(in oklab, var(--background) 94%, var(--oxcil-brand))",
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background: [
            "radial-gradient(",
            "  120% 120% at 50% 12%,",
            "  var(--ripple-bg-start) 16%,",
            "  var(--ripple-bg-mid) 56%,",
            "  var(--ripple-bg-end) 100%",
            ")",
          ].join(""),
        }}
      />

      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 10%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 10%, transparent 100%)",
        }}
      >
        <DivGrid rows={rows} cols={cols} activeCell={activeCell} rippleId={rippleId} />
      </div>
    </div>
  );
}

type DivGridProps = {
  rows: number;
  cols: number;
  activeCell: Cell | null;
  rippleId: number;
};

function DivGrid({ rows, cols, activeCell, rippleId }: DivGridProps) {
  const total = rows * cols;
  const cells = useMemo(() => Array.from({ length: total }, (_, i) => i), [total]);
  const [cellSize, setCellSize] = useState(0);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function measure() {
      if (!shellRef.current) return;
      const { width, height } = shellRef.current.getBoundingClientRect();
      const size = Math.floor(Math.max(width / cols, height / rows));
      setCellSize(size > 0 ? size : 0);
    }

    measure();

    const observer = new ResizeObserver(measure);
    if (shellRef.current) observer.observe(shellRef.current);

    return () => observer.disconnect();
  }, [rows, cols]);

  return (
    <div
      ref={shellRef}
      className="absolute inset-0 flex h-full w-full items-start justify-center"
    >
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          width: cols * cellSize,
          height: rows * cellSize,
        }}
      >
        {cells.map((idx) => {
          const row = Math.floor(idx / cols);
          const col = idx % cols;

          // Cells farther from the origin start later and run longer to create a wave.
          const dist = activeCell
            ? Math.hypot(activeCell.row - row, activeCell.col - col)
            : 0;

          const delayMs = activeCell ? dist * 36 : 0;
          const durationMs = 420 + dist * 48;

          return (
            <RippleCell
              key={idx}
              delayMs={delayMs}
              durationMs={durationMs}
              rippleId={rippleId}
              isOrigin={!!activeCell && activeCell.row === row && activeCell.col === col}
            />
          );
        })}
      </div>
    </div>
  );
}

type RippleCellProps = {
  delayMs: number;
  durationMs: number;
  rippleId: number;
  isOrigin: boolean;
};

function RippleCell({ delayMs, durationMs, rippleId, isOrigin }: RippleCellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lastRippleId = useRef(-1);

  useEffect(() => {
    // Ignore the initial render and repeated ticks for the same ripple sequence.
    if (rippleId === 0 || rippleId === lastRippleId.current) return;
    lastRippleId.current = rippleId;

    const el = ref.current;
    if (!el) return;

    const timeout = setTimeout(() => {
      el.classList.remove("animate-background-ripple");
      void el.offsetWidth;
      el.classList.add("animate-background-ripple");
    }, delayMs);

    return () => clearTimeout(timeout);
  }, [rippleId, delayMs]);

  return (
    <div
      ref={ref}
      className={cn(
        "cell relative border-[0.5px] transition-[border-color,opacity] will-change-transform",
        "opacity-[0.62] hover:opacity-[0.95]",
        "hover:border-oxcil-brand-border",
        // The origin cell gets the strongest highlight; the rest are staggered in the timer effect.
        isOrigin && "animate-background-ripple opacity-100"
      )}
      style={{
        backgroundColor: "var(--cell-fill)",
        borderRadius: 0.5,
        borderColor: "var(--cell-border)",
        ["--ripple-duration" as string]: `${durationMs}ms`,
      }}
    />
  );
}
