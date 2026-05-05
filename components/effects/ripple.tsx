"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export const Ripple = ({
  rows = 8,
  cols = 27,
  cellSize = 56,
  autoRipple = true,
  autoRippleInterval = 2800, // ms between wave pulses
  autoRippleOrigin = "top-center", // where the auto wave starts from
}: {
  rows?: number;
  cols?: number;
  cellSize?: number;
  autoRipple?: boolean;
  autoRippleInterval?: number;
  autoRippleOrigin?: "top-center" | "top-left" | "top-right" | "center";
}) => {
  const [clickedCell, setClickedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);
  const [autoOrigin, setAutoOrigin] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [autoRippleKey, setAutoRippleKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getOriginCell = useCallback(() => {
    switch (autoRippleOrigin) {
      case "top-left":
        return { row: 0, col: 0 };
      case "top-right":
        return { row: 0, col: cols - 1 };
      case "center":
        return { row: Math.floor(rows / 2), col: Math.floor(cols / 2) };
      case "top-center":
      default:
        return { row: 0, col: Math.floor(cols / 2) };
    }
  }, [autoRippleOrigin, rows, cols]);

  const fireAutoRipple = useCallback(() => {
    setAutoOrigin(getOriginCell());
    setAutoRippleKey((k) => k + 1);
  }, [getOriginCell]);

  useEffect(() => {
    if (!autoRipple) return;

    // Fire immediately on mount
    fireAutoRipple();

    intervalRef.current = setInterval(fireAutoRipple, autoRippleInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoRipple, autoRippleInterval, fireAutoRipple]);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 h-full w-full",
        "[--cell-border-color:var(--oxcil-neutral-300)] [--cell-fill-color:var(--oxcil-neutral-100)] [--cell-shadow-color:var(--oxcil-neutral-500)]",
        "dark:[--cell-border-color:var(--oxcil-neutral-700)] dark:[--cell-fill-color:var(--oxcil-neutral-900)] dark:[--cell-shadow-color:var(--oxcil-neutral-800)]"
      )}
    >
      <div className="relative h-auto w-auto overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-2 h-full w-full overflow-hidden" />
        <DivGrid
          key={`base-${rippleKey}-${autoRippleKey}`}
          className="mask-radial-from-20% mask-radial-at-top opacity-600"
          rows={rows}
          cols={cols}
          cellSize={cellSize}
          borderColor="var(--cell-border-color)"
          fillColor="var(--cell-fill-color)"
          clickedCell={clickedCell}
          autoOrigin={autoOrigin}
          onCellClick={(row, col) => {
            // Click overrides auto — resets to clicked origin
            setClickedCell({ row, col });
            setAutoOrigin(null);
            setRippleKey((k) => k + 1);
          }}
          interactive
        />
      </div>
    </div>
  );
};

type DivGridProps = {
  className?: string;
  rows: number;
  cols: number;
  cellSize: number;
  borderColor: string;
  fillColor: string;
  clickedCell: { row: number; col: number } | null;
  autoOrigin: { row: number; col: number } | null;
  onCellClick?: (row: number, col: number) => void;
  interactive?: boolean;
};

type CellStyle = React.CSSProperties & {
  ["--delay"]?: string;
  ["--duration"]?: string;
};

const DivGrid = ({
  className,
  rows = 7,
  cols = 30,
  cellSize = 56,
  borderColor = "#3f3f46",
  fillColor = "rgba(14,165,233,0.3)",
  clickedCell = null,
  autoOrigin = null,
  onCellClick = () => {},
  interactive = true,
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols]
  );

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
    marginInline: "auto",
  };

  // Active origin: click takes priority over auto wave
  const origin = clickedCell ?? autoOrigin;

  return (
    <div className={cn("relative z-3", className)} style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;

        const distance = origin
          ? Math.hypot(origin.row - rowIdx, origin.col - colIdx)
          : 0;

        const delay = origin ? Math.max(0, distance * 55) : 0;
        const duration = 200 + distance * 80;

        const style: CellStyle = origin
          ? {
              "--delay": `${delay}ms`,
              "--duration": `${duration}ms`,
            }
          : {};

        return (
          <div
            key={idx}
            className={cn(
              "cell relative border-[0.5px] opacity-40 transition-opacity duration-150 will-change-transform hover:opacity-80 dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]",
              origin && "animate-cell-ripple fill-mode-[none]",
              !interactive && "pointer-events-none"
            )}
            style={{
              backgroundColor: fillColor,
              borderColor: borderColor,
              ...style,
            }}
            onClick={interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined}
          />
        );
      })}
    </div>
  );
};
