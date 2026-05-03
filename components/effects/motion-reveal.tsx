import type { CSSProperties, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type MotionRevealProps = HTMLAttributes<HTMLDivElement> & {
  isVisible: boolean;
  hiddenClassName?: string;
  visibleClassName?: string;
  delay?: number;
};

export function MotionReveal({
  isVisible,
  hiddenClassName = "translate-y-6 opacity-0",
  visibleClassName = "translate-y-0 opacity-100",
  delay,
  className,
  style,
  ...props
}: MotionRevealProps) {
  const mergedStyle: CSSProperties | undefined =
    delay === undefined
      ? style
      : {
          // Preserve the caller's inline styles while layering in the requested delay.
          transitionDelay: `${delay}ms`,
          ...style,
        };

  return (
    <div
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? visibleClassName : hiddenClassName,
        className
      )}
      style={mergedStyle}
      {...props}
    />
  );
}
