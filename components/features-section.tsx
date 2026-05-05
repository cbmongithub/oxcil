"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Activity,
  BarChart3,
  Brain,
  Cloud,
  Cpu,
  Layers,
  Lock,
  Server,
  Shield,
  Zap,
} from "lucide-react";

import { Beam } from "@/components/effects/beam";
import { Globe } from "@/components/effects/globe";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { cn } from "@/lib/utils";

interface FeaturesSectionProps {
  className?: string;
}

const IconCard = React.forwardRef<
  HTMLDivElement,
  { icon: React.ReactNode; className?: string }
>(({ icon, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "border-border bg-card relative z-10 flex size-14 items-center justify-center rounded-xl border",
        className
      )}
    >
      {icon}
    </div>
  );
});
IconCard.displayName = "IconCard";

/**
 * Returns stable Tailwind class names + an inline style object for delay/duration.
 * No dynamic string interpolation — safe for Tailwind's static scanner.
 */
function getCardAnimation(
  visible: boolean,
  direction: "left" | "right",
  delayS: number,
  isMobile: boolean
): { className: string; style: React.CSSProperties } {
  if (!visible) {
    return { className: "opacity-0", style: {} };
  }

  const animClass =
    direction === "left" ? "animate-slide-in-left" : "animate-slide-in-right";

  return {
    className: animClass,
    style: {
      "--animate-delay": `${delayS}s`,
      "--animate-duration": isMobile ? "0.6s" : "0.8s",
    } as React.CSSProperties,
  };
}

export function FeaturesSection({ className }: FeaturesSectionProps) {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [topRowVisible, setTopRowVisible] = useState(false);
  const [bottomRowVisible, setBottomRowVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  // Beam refs
  const containerRef1 = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);
  const containerRef3 = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  const div8Ref = useRef<HTMLDivElement>(null);
  const div9Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const makeObserver = (setter: (v: boolean) => void, threshold: number) =>
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setter(true);
          }
        },
        { threshold }
      );

    const headerObs = makeObserver(setHeaderVisible, 0.5);
    const topRowObs = makeObserver(setTopRowVisible, 0.2);
    const bottomRowObs = makeObserver(setBottomRowVisible, 0.3);

    if (headerRef.current) headerObs.observe(headerRef.current);
    if (topRowRef.current) topRowObs.observe(topRowRef.current);
    if (bottomRowRef.current) bottomRowObs.observe(bottomRowRef.current);

    return () => {
      headerObs.disconnect();
      topRowObs.disconnect();
      bottomRowObs.disconnect();
    };
  }, []);

  // Stagger config per card: [rowVisible, direction, desktopDelay, mobileDelay]
  // Mobile reuses right-direction slide with staggered delays.
  // Desktop top row slides left; bottom row slides right.
  const cardConfigs = [
    // Top row
    { rowVisible: topRowVisible, direction: "left" as const, delay: isMobile ? 0 : 0 },
    {
      rowVisible: topRowVisible,
      direction: "left" as const,
      delay: isMobile ? 0.15 : 0.2,
    },
    {
      rowVisible: topRowVisible,
      direction: "left" as const,
      delay: isMobile ? 0.3 : 0.4,
    },
    // Bottom row
    {
      rowVisible: bottomRowVisible,
      direction: "right" as const,
      delay: isMobile ? 0.45 : 0,
    },
    {
      rowVisible: bottomRowVisible,
      direction: "right" as const,
      delay: isMobile ? 0.6 : 0.2,
    },
    {
      rowVisible: bottomRowVisible,
      direction: "right" as const,
      delay: isMobile ? 0.75 : 0.4,
    },
  ] as const;

  return (
    <section id="platform" className={cn("py-20 md:py-32", className)}>
      <div className="flex w-full justify-center px-4 md:px-6">
        <div className="flex max-w-5xl flex-col items-center gap-5">
          {/* ── Section header ────────────────────────────────── */}
          <div ref={headerRef} className="mb-8 max-w-2xl text-center">
            <h2
              className={cn(
                "text-foreground text-3xl font-bold tracking-tight text-balance opacity-0 md:text-4xl lg:text-5xl",
                headerVisible && "animate-slide-up-section"
              )}
            >
              Built for scale, optimized for speed
            </h2>
            <p
              className={cn(
                "text-muted-foreground mt-4 text-base text-balance opacity-0 md:text-lg",
                headerVisible && "animate-slide-up-section"
              )}
              style={
                headerVisible
                  ? ({ "--animate-delay": "0.2s" } as React.CSSProperties)
                  : {}
              }
            >
              Deploy any model with enterprise-grade infrastructure. From prototype to
              production, we handle the complexity so you can focus on building.
            </p>
          </div>

          {/* ── Top row ───────────────────────────────────────── */}
          <div ref={topRowRef} className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
            {/* Card 0 — Model Orchestration */}
            {(() => {
              const { className: animClass, style } = getCardAnimation(
                cardConfigs[0].rowVisible,
                cardConfigs[0].direction,
                cardConfigs[0].delay,
                isMobile
              );
              return (
                <Card
                  className={cn(
                    "border-border bg-card relative h-96 w-full rounded-3xl border",
                    animClass
                  )}
                  style={style}
                >
                  <CardHeader className="text-center">
                    <h3 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
                      Model Orchestration
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm">
                      Route requests to the optimal model based on latency, cost, and
                      capability. Seamlessly switch between providers without code
                      changes.
                    </p>
                  </CardHeader>
                  <CardContent ref={containerRef1} className="relative ml-5">
                    <IconCard
                      ref={div1Ref}
                      icon={<Brain className="text-primary size-5" />}
                      className="mb-3"
                    />
                    <IconCard
                      ref={div2Ref}
                      icon={<Cpu className="text-primary size-5" />}
                      className="translate-x-32"
                    />
                    <IconCard
                      ref={div3Ref}
                      icon={<Layers className="text-primary size-5" />}
                      className="mt-3"
                    />
                    <IconCard
                      ref={div5Ref}
                      icon={<Zap className="text-primary size-5" />}
                      className="absolute top-1/2 right-12 -translate-y-1/2"
                    />
                    <div
                      ref={div4Ref}
                      className="border-primary bg-primary/20 absolute top-1/2 left-1/2 z-50 h-4 w-4 -translate-y-1/2 rounded-full border"
                    />
                    <Beam
                      duration={3}
                      containerRef={containerRef1}
                      fromRef={div1Ref}
                      curvature={40}
                      toRef={div4Ref}
                      delay={0}
                    />
                    <Beam
                      duration={3}
                      containerRef={containerRef1}
                      fromRef={div2Ref}
                      toRef={div4Ref}
                      delay={0.5}
                    />
                    <Beam
                      duration={3}
                      containerRef={containerRef1}
                      fromRef={div3Ref}
                      curvature={-40}
                      toRef={div4Ref}
                      delay={1}
                    />
                    <Beam
                      duration={3}
                      containerRef={containerRef1}
                      fromRef={div4Ref}
                      toRef={div5Ref}
                      delay={1.5}
                    />
                  </CardContent>
                </Card>
              );
            })()}

            {/* Card 1 — Auto Scaling */}
            {(() => {
              const { className: animClass, style } = getCardAnimation(
                cardConfigs[1].rowVisible,
                cardConfigs[1].direction,
                cardConfigs[1].delay,
                isMobile
              );
              return (
                <Card
                  className={cn(
                    "border-border bg-card h-96 w-full rounded-3xl border",
                    animClass
                  )}
                  style={style}
                >
                  <CardHeader className="text-center">
                    <h3 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
                      Auto Scaling
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Scale from zero to millions of requests automatically with
                      intelligent load balancing.
                    </p>
                  </CardHeader>
                  <CardContent
                    ref={containerRef2}
                    className="relative flex h-40 flex-col items-center justify-between py-4"
                  >
                    <IconCard
                      ref={div6Ref}
                      icon={<Server className="text-primary size-5" />}
                      className="mb-3"
                    />
                    <IconCard
                      ref={div7Ref}
                      icon={<Cloud className="text-primary size-5" />}
                      className="mt-3"
                    />
                    <Beam
                      duration={3}
                      containerRef={containerRef2}
                      fromRef={div6Ref}
                      direction="vertical"
                      curvature={40}
                      toRef={div7Ref}
                    />
                  </CardContent>
                </Card>
              );
            })()}

            {/* Card 2 — Real-time Analytics */}
            {(() => {
              const { className: animClass, style } = getCardAnimation(
                cardConfigs[2].rowVisible,
                cardConfigs[2].direction,
                cardConfigs[2].delay,
                isMobile
              );
              return (
                <Card
                  className={cn(
                    "border-border bg-card relative h-96 w-full overflow-hidden rounded-3xl border",
                    animClass
                  )}
                  style={style}
                >
                  <CardHeader className="text-center">
                    <h3 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
                      Real-time Analytics
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Monitor inference metrics, costs, and performance in real-time
                      dashboards.
                    </p>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center gap-3 pt-4">
                    <div className="flex w-full items-end justify-center gap-2 px-4">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75].map((height, i) => (
                        <div
                          key={i}
                          className="bg-primary/60 w-4 rounded-t transition-all duration-500"
                          style={{
                            height: `${height}px`,
                            animation: "pulse 2s ease-in-out infinite",
                            animationDelay: `${i * 100}ms`,
                          }}
                        />
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <Activity className="text-primary size-5" />
                      <span className="text-foreground text-2xl font-bold">99.9%</span>
                      <span className="text-muted-foreground text-sm">uptime</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })()}
          </div>

          {/* ── Bottom row ────────────────────────────────────── */}
          <div
            ref={bottomRowRef}
            className="grid w-full grid-cols-1 gap-5 md:grid-cols-3"
          >
            {/* Card 3 — Lightning Fast */}
            {(() => {
              const { className: animClass, style } = getCardAnimation(
                cardConfigs[3].rowVisible,
                cardConfigs[3].direction,
                cardConfigs[3].delay,
                isMobile
              );
              return (
                <Card
                  className={cn(
                    "border-border bg-card relative flex h-96 w-full flex-col rounded-3xl border",
                    animClass
                  )}
                  style={style}
                >
                  <CardContent className="flex items-center justify-center pt-8">
                    <div className="relative flex size-32 items-center justify-center">
                      <div className="bg-primary/10 absolute inset-0 animate-pulse rounded-full" />
                      <div className="bg-primary/20 absolute inset-4 rounded-full" />
                      <Zap className="text-primary size-12" />
                    </div>
                  </CardContent>
                  <CardHeader className="mt-auto text-center">
                    <h3 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
                      Lightning Fast Inference
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Sub-100ms latency with edge deployments across 200+ global
                      locations.
                    </p>
                  </CardHeader>
                </Card>
              );
            })()}

            {/* Card 4 — Global Infrastructure */}
            {(() => {
              const { className: animClass, style } = getCardAnimation(
                cardConfigs[4].rowVisible,
                cardConfigs[4].direction,
                cardConfigs[4].delay,
                isMobile
              );
              return (
                <Card
                  className={cn(
                    "border-border bg-card h-96 w-full overflow-hidden rounded-3xl border",
                    animClass
                  )}
                  style={style}
                >
                  <CardHeader className="text-center">
                    <h3 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
                      Global Infrastructure
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Deploy inference endpoints closest to your users. Automatic failover
                      ensures 99.99% uptime across all regions.
                    </p>
                  </CardHeader>
                  <CardContent className="relative h-48">
                    <Globe className="top-0" />
                  </CardContent>
                </Card>
              );
            })()}

            {/* Card 5 — Enterprise Security */}
            {(() => {
              const { className: animClass, style } = getCardAnimation(
                cardConfigs[5].rowVisible,
                cardConfigs[5].direction,
                cardConfigs[5].delay,
                isMobile
              );
              return (
                <Card
                  className={cn(
                    "border-border bg-card relative h-96 w-full overflow-hidden rounded-3xl border",
                    animClass
                  )}
                  style={style}
                >
                  <CardHeader className="text-center">
                    <h3 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
                      Enterprise Security
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      SOC 2 compliant with end-to-end encryption. Your data never leaves
                      your VPC.
                    </p>
                  </CardHeader>
                  <CardContent
                    ref={containerRef3}
                    className="relative flex h-40 items-center justify-center"
                  >
                    <IconCard
                      ref={div8Ref}
                      icon={<Lock className="text-primary size-5" />}
                      className="absolute left-8"
                    />
                    <div className="relative flex size-20 items-center justify-center">
                      <div className="border-primary/30 absolute inset-0 animate-[spin_8s_linear_infinite] rounded-full border-2" />
                      <div className="border-primary/50 absolute inset-2 animate-[spin_6s_linear_infinite_reverse] rounded-full border-2 border-dashed" />
                      <Shield className="text-primary size-8" />
                    </div>
                    <IconCard
                      ref={div9Ref}
                      icon={<BarChart3 className="text-primary size-5" />}
                      className="absolute right-8"
                    />
                    <Beam
                      duration={3}
                      containerRef={containerRef3}
                      fromRef={div8Ref}
                      toRef={div9Ref}
                      curvature={-30}
                    />
                    <Beam
                      duration={3}
                      containerRef={containerRef3}
                      fromRef={div8Ref}
                      toRef={div9Ref}
                      curvature={30}
                      reverse
                    />
                  </CardContent>
                </Card>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}
