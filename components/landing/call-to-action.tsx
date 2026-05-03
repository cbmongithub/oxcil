import { ArrowRightIcon } from "lucide-react";
import type { CSSProperties, HTMLAttributes } from "react";

import { WhileInView } from "@/components/effects/while-in-view";
import { PageContainer } from "@/components/layout/page-container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { cn } from "@/lib/utils";

const MOTION_REVEAL_CLASS = "transition-all duration-700 ease-out";
const MOTION_REVEAL_FAST_CLASS = "transition-all duration-500";

function getStaggerDelay(index: number, stepMs: number, baseMs = 0) {
  return baseMs + index * stepMs;
}

function getTransitionDelayStyle(
  delayMs: number
): Pick<CSSProperties, "transitionDelay"> {
  return {
    transitionDelay: `${delayMs}ms`,
  };
}

function BrandDotGridOverlay({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-oxcil-brand-dot-grid absolute inset-0 opacity-20 mix-blend-screen",
        className
      )}
      {...props}
    />
  );
}

type PARTICLE = {
  left: number;
  top: number;
  size: "sm" | "md";
};

const PARTICLES: PARTICLE[] = [
  { left: 8, top: 16, size: "sm" },
  { left: 15, top: 30, size: "md" },
  { left: 22, top: 58, size: "sm" },
  { left: 31, top: 22, size: "md" },
  { left: 38, top: 48, size: "sm" },
  { left: 46, top: 18, size: "md" },
  { left: 54, top: 62, size: "sm" },
  { left: 61, top: 36, size: "md" },
  { left: 69, top: 20, size: "sm" },
  { left: 77, top: 50, size: "md" },
  { left: 85, top: 26, size: "sm" },
  { left: 92, top: 60, size: "md" },
];

const PARTICLE_SIZE_CLASS: Record<PARTICLE["size"], string> = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
};

const PARTICLE_REVEAL_STEP_MS = 40;
const PARTICLE_REVEAL_BASE_MS = 0;

function SquareParticleField({
  particles = PARTICLES,
  className,
  particleClassName,
}: {
  particles?: PARTICLE[];
  className?: string;
  particleClassName?: string;
}) {
  return (
    <div
      id="cta"
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {particles.map((particle, index) => (
        <span
          key={`${particle.left}-${particle.top}-${particle.size}`}
          className={cn(
            "animate-cta-float bg-oxcil-brand/55 absolute translate-y-0 rounded-[3px] opacity-100 shadow-[0_0_18px_color-mix(in_oklab,var(--oxcil-brand)_34%,transparent)] will-change-transform",
            PARTICLE_SIZE_CLASS[particle.size],
            particleClassName
          )}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${getStaggerDelay(
              index,
              PARTICLE_REVEAL_STEP_MS,
              PARTICLE_REVEAL_BASE_MS
            )}ms`,
            animationDuration: `${3 + index * 0.35}s`,
          }}
        />
      ))}
    </div>
  );
}

const CTA_FEATURES = [
  "Landing pages",
  "Lead intake",
  "Routing",
  "Manual monetization",
  "Future AI",
] as const;

export function CallToAction() {
  return (
    <Section divider clip spacing="section">
      <PageContainer>
        <WhileInView
          className="relative"
          hiddenClassName="scale-90 opacity-0"
          visibleClassName="scale-100 opacity-100"
          style={{ transitionProperty: "opacity, transform, box-shadow" }}
        >
          <Card className="border-border bg-card relative overflow-hidden rounded-xl border">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--oxcil-brand)_26%,transparent),transparent_34%),radial-gradient(circle_at_bottom_right,color-mix(in_oklab,var(--oxcil-brand)_18%,var(--background)),transparent_56%),linear-gradient(135deg,color-mix(in_oklab,var(--oxcil-brand)_34%,var(--background))_0%,color-mix(in_oklab,var(--oxcil-brand)_16%,var(--background))_46%,var(--background)_100%)]" />
            <CardHeader className="relative px-8 py-8 md:px-12 md:py-12">
              <BrandDotGridOverlay className="opacity-[0.08] mix-blend-soft-light" />
              <SquareParticleField
                particles={PARTICLES}
                particleClassName="bg-oxcil-brand/24"
              />

              <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                <div className="max-w-lg text-left">
                  <WhileInView
                    as="h2"
                    className="text-foreground mb-3 text-2xl font-bold tracking-tight text-balance md:text-3xl"
                    hiddenClassName={`${MOTION_REVEAL_CLASS} translate-y-8 opacity-0 blur-sm`}
                    visibleClassName={`${MOTION_REVEAL_CLASS} translate-y-0 opacity-100 blur-0`}
                    style={getTransitionDelayStyle(400)}
                  >
                    Start with one vertical and one clear workflow
                  </WhileInView>

                  <WhileInView
                    as="p"
                    className="text-muted-foreground text-pretty"
                    hiddenClassName={`${MOTION_REVEAL_CLASS} translate-y-8 opacity-0`}
                    visibleClassName={`${MOTION_REVEAL_CLASS} translate-y-0 opacity-100`}
                    style={getTransitionDelayStyle(500)}
                  >
                    Oxcil is being built by keeping the surface narrow, the routing
                    simple, and the workflows visible enough to run by hand before
                    automating them.
                  </WhileInView>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <WhileInView
                    hiddenClassName={`${MOTION_REVEAL_FAST_CLASS} -translate-x-8 opacity-0`}
                    visibleClassName={`${MOTION_REVEAL_FAST_CLASS} translate-x-0 opacity-100`}
                    style={getTransitionDelayStyle(700)}
                  >
                    <Button size="lg">
                      Follow the build
                      <ArrowRightIcon className="h-4 w-4" />
                    </Button>
                  </WhileInView>
                  <WhileInView
                    hiddenClassName={`${MOTION_REVEAL_FAST_CLASS} translate-x-8 opacity-0`}
                    visibleClassName={`${MOTION_REVEAL_FAST_CLASS} translate-x-0 opacity-100`}
                    style={getTransitionDelayStyle(700)}
                  >
                    <Button size="lg" variant="secondary">
                      See the roadmap
                    </Button>
                  </WhileInView>
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative px-8 pb-8 md:px-12 md:pb-12">
              <div className="relative z-10 flex flex-wrap gap-2">
                {CTA_FEATURES.map((feature, index) => (
                  <WhileInView
                    key={feature}
                    as="span"
                    className="border-oxcil-brand-border/25 bg-oxcil-brand-soft/20 text-foreground rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm"
                    hiddenClassName={`${MOTION_REVEAL_CLASS} translate-y-4 opacity-0`}
                    visibleClassName={`${MOTION_REVEAL_CLASS} translate-y-0 opacity-100`}
                    style={getTransitionDelayStyle(800 + index * 90)}
                  >
                    {feature}
                  </WhileInView>
                ))}
              </div>
            </CardContent>
          </Card>
        </WhileInView>
      </PageContainer>
    </Section>
  );
}
