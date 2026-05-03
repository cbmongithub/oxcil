import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const PAGE_CONTAINER_SIZES = {
  default: "max-w-7xl",
  medium: "max-w-5xl",
  narrow: "max-w-3xl",
} as const;

type PageContainerSize = keyof typeof PAGE_CONTAINER_SIZES;

type PageContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: PageContainerSize;
};

export function PageContainer({
  size = "default",
  className,
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-12",
        PAGE_CONTAINER_SIZES[size],
        className
      )}
      {...props}
    />
  );
}
