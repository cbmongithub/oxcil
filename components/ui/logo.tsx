import { BRAND_MARK_PATHS, BRAND_MARK_VIEWBOX } from "@/lib/brand-mark";

type LogoVariant = "full" | "mark";
type LogoSize = "sm" | "md" | "lg";

type LogoProps = {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
};

// Full logo dimensions (maintains 312.5:100 aspect ratio from source)
const fullSizeMap: Record<LogoSize, { width: number; height: number }> = {
  sm: { width: 94, height: 30 },
  md: { width: 125, height: 40 },
  lg: { width: 156, height: 50 },
};

// Standalone mark dimensions (square)
const markSizeMap: Record<LogoSize, { width: number; height: number }> = {
  sm: { width: 24, height: 24 },
  md: { width: 32, height: 32 },
  lg: { width: 40, height: 40 },
};

/**
 * Full logo with brand mark + wordmark.
 * Exact paths and transforms from the source SVG.
 * Uses currentColor for theme adaptability (light/dark mode).
 * The inner squares use a contrasting fill (background color).
 */
function FullLogo({ size = "md", className }: { size?: LogoSize; className?: string }) {
  const { width, height } = fullSizeMap[size];
  return (
    <svg
      width={width}
      height={height}
      viewBox="93.75 200 312.5 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <g transform="translate(6.25 63.79)">
        {/* Brand Mark */}
        <g transform="translate(-74.967 -213.81)scale(1.25)">
          {/* Outer squares - main mark shape */}
          <path
            d="M129.974 320.016v-35.535c0-2.746 1.817-4.445 4.445-4.445 0 0 22.391-.02 35.555-.02v40h40c0 2.222-.02 35.555-.02 35.555 0 2.743-1.815 4.445-4.445 4.445h-35.535v-40Zm77.313-39.98c1.577 0 2.667 1.019 2.667 2.667 0 0 .02 24.868.02 27.313h-30v-30Zm-74.646 79.98c-1.577 0-2.667-1.019-2.667-2.667v-27.333h30v30Z"
            fill="currentColor"
          />
          {/* Inner squares - contrasting cutouts */}
          <path
            d="M159.974 290.016v20h-20v-18.222c0-1.099.727-1.778 1.778-1.778Zm20 60v-20h20v18.222c0 1.099-.727 1.778-1.778 1.778Z"
            className="fill-background"
          />
        </g>
        {/* Word Mark */}
        <g transform="matrix(1.58228 0 0 1.45866 -112.5 -168.203)">
          {/* o */}
          <path
            d="M206.772 248.484a8.46 8.46 0 0 1 3.03-3.162q1.938-1.187 4.486-1.186 2.544-.001 4.485 1.186a8.46 8.46 0 0 1 3.029 3.162q1.09 1.97 1.091 4.35 0 2.375-1.061 4.347a7.95 7.95 0 0 1-3.03 3.131q-1.97 1.159-4.514 1.159-2.547 0-4.515-1.159-1.972-1.159-3.032-3.131t-1.061-4.347q0-2.38 1.092-4.35m16.121 18.003c2.547-1.411 4.544-3.323 6.002-5.74q2.18-3.623 2.18-7.913 0-4.293-2.18-7.944c-1.458-2.435-3.455-4.36-6.002-5.769q-3.817-2.119-8.605-2.118-4.79 0-8.608 2.118-3.816 2.115-6 5.769-2.18 3.651-2.18 7.944 0 4.29 2.18 7.913 2.184 3.624 6 5.74 3.818 2.117 8.608 2.116 4.788.001 8.605-2.116"
            fill="currentColor"
          />
          {/* x */}
          <path
            d="m242.179 252.804-11.104-15.801h8.931l6.841 10.028 6.494-10.028h9.334l-11.101 15.921 11.101 15.679h-9.336l-6.434-10.089-6.663 10.089h-9.167z"
            fill="currentColor"
          />
          {/* c */}
          <path
            d="M280.034 268.603q-4.698.001-8.657-2.111-3.958-2.114-6.274-5.759-2.317-3.645-2.317-7.928 0-4.343 2.317-7.959 2.316-3.617 6.436-5.73 4.12-2.112 9.205-2.113 4.437 0 7.98 1.477 3.54 1.476 5.662 4.139l-6.694 4.92q-1.158-1.564-3.023-2.49-1.867-.928-4.056-.927-2.7 0-4.764 1.187-2.058 1.187-3.216 3.153-1.159 1.968-1.158 4.343 0 2.314 1.19 4.31 1.19 1.999 3.315 3.184 2.123 1.186 4.826 1.186 2.382 0 4.121-.926 1.737-.926 3.152-2.662l6.307 4.919q-5.021 5.787-14.352 5.787"
            fill="currentColor"
          />
          {/* i */}
          <path
            d="M300.2 237.003h7.9v31.6h-7.9Zm-.545-9.359q0-1.865 1.305-3.167 1.305-1.3 3.19-1.299 1.943 0 3.219 1.299 1.275 1.302 1.275 3.167 0 1.923-1.275 3.222-1.276 1.301-3.219 1.301-1.885-.002-3.19-1.328c-.87-.884-1.305-1.952-1.305-3.195"
            fill="currentColor"
          />
          {/* l */}
          <path d="M316 217.253h7.9v51.35H316z" fill="currentColor" />
        </g>
      </g>
    </svg>
  );
}

/**
 * Standalone brand mark (icon only).
 * Uses the same paths as in the full logo but with a square viewBox.
 */
function BrandMark({ size = "sm", className }: { size?: LogoSize; className?: string }) {
  const { width, height } = markSizeMap[size];
  return (
    <svg
      width={width}
      height={height}
      viewBox={BRAND_MARK_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Outer squares - main mark shape */}
      <path d={BRAND_MARK_PATHS.outer} fill="currentColor" />
      {/* Inner squares - contrasting cutouts */}
      <path d={BRAND_MARK_PATHS.inner} className="fill-background" />
    </svg>
  );
}

export function Logo({ variant = "full", size = "sm", className }: LogoProps) {
  if (variant === "mark") {
    return (
      <span className={className} aria-label="Oxcil">
        <BrandMark size={size} />
      </span>
    );
  }

  return (
    <span className={className} aria-label="Oxcil">
      <FullLogo size={size} />
    </span>
  );
}
