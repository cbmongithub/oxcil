import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Ripple } from "./effects/ripple";
import { LogoMarquee } from "./logo-marquee";

export function HeroSection() {
  return (
    <section className="bg-background relative flex min-h-dvh flex-col overflow-hidden">
      {/* Background effect */}
      <Ripple />
      {/* Hero content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-24 pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-foreground animate-slide-in-right block">
              Infinitely scaleable
            </span>
            <span className="text-muted-foreground animate-slide-up-delayed block">
              inference.
            </span>
          </h1>

          <p className="text-muted-foreground animate-slide-up-delayed-2 mx-auto mt-6 max-w-xl text-base text-pretty sm:text-lg">
            Get the most reliable and affordable inference platform to power your growth.
          </p>

          <div className="animate-slide-up-delayed-3 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            >
              Request Demo
            </Button>
            <Link
              href="/models"
              className="border-border/50 text-foreground hover:bg-foreground/5 inline-flex h-10 items-center justify-center rounded-md border bg-transparent px-8 text-sm font-medium transition-all"
            >
              Explore Models
            </Link>
          </div>
        </div>
      </div>

      {/* Trusted by section */}
      <div className="animate-fade-in-delayed relative z-10 pb-12">
        <LogoMarquee />
      </div>
    </section>
  );
}
