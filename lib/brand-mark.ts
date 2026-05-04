/**
 * Brand mark paths - shared across logo and icon components
 * Extracted from the source SVG to avoid duplication
 */

export const BRAND_MARK_PATHS = {
  // Main mark shape (outer squares and cross pattern)
  outer:
    "M129.974 320.016v-35.535c0-2.746 1.817-4.445 4.445-4.445 0 0 22.391-.02 35.555-.02v40h40c0 2.222-.02 35.555-.02 35.555 0 2.743-1.815 4.445-4.445 4.445h-35.535v-40Zm77.313-39.98c1.577 0 2.667 1.019 2.667 2.667 0 0 .02 24.868.02 27.313h-30v-30Zm-74.646 79.98c-1.577 0-2.667-1.019-2.667-2.667v-27.333h30v30Z",

  // Inner cutout squares (creates the distinctive notches)
  inner:
    "M159.974 290.016v20h-20v-18.222c0-1.099.727-1.778 1.778-1.778Zm20 60v-20h20v18.222c0 1.099-.727 1.778-1.778 1.778Z",
} as const;

export const BRAND_MARK_VIEWBOX = "129.974 280.016 80 80" as const;

export const BRAND_MARK_BACKGROUND_HEX = "#040405";

export const BRAND_MARK_FOREGROUND_HEX = "#f1f2f3";
