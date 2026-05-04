"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

const logoCount = 8;

export function LogoMarquee() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine filter based on theme - invert for dark mode to make logos white
  const logoFilter =
    mounted && resolvedTheme === "dark"
      ? "grayscale(100%) brightness(0) invert(1)"
      : "grayscale(100%) brightness(0)";

  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-6 overflow-hidden px-4 md:gap-10 md:px-6">
      <p className="text-muted-foreground/60 text-center text-sm font-medium tracking-wide md:text-lg">
        Trusted by top innovative teams
      </p>

      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div className="animate-marquee flex gap-8 md:gap-20">
          {Array.from({ length: logoCount * 2 }).map((_, index) => (
            <div key={index} className="shrink-0">
              <Image
                src="/placeholder-logo.svg"
                alt="Company logo"
                width={120}
                height={40}
                priority
                className="h-8 w-auto opacity-70 md:h-10"
                style={{ filter: logoFilter }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
