import { ImageResponse } from "next/og";

import {
  BRAND_MARK_BACKGROUND_HEX,
  BRAND_MARK_FOREGROUND_HEX,
  BRAND_MARK_PATHS,
  BRAND_MARK_VIEWBOX,
} from "@/lib/brand-mark";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <svg
      width="32"
      height="32"
      viewBox={BRAND_MARK_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={BRAND_MARK_PATHS.outer} fill={BRAND_MARK_FOREGROUND_HEX} />
      <path d={BRAND_MARK_PATHS.inner} fill={BRAND_MARK_BACKGROUND_HEX} />
    </svg>,
    { ...size }
  );
}
