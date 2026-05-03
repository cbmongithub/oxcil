import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "@/lib/utils";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  as?: "section" | "footer";
  divider?: boolean;
  spacing?: "section" | "compact" | "none";
  clip?: boolean;
};

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  {
    as = "section",
    divider = false,
    spacing = "section",
    clip = false,
    className,
    ...props
  },
  ref
) {
  const Comp = as;

  return (
    <Comp
      ref={ref}
      className={cn(
        clip && "overflow-hidden",
        divider && "border-border border-t",
        spacing === "section" && "py-20",
        spacing === "compact" && "py-16",
        className
      )}
      {...props}
    />
  );
});
