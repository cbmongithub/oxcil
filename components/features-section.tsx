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

import { AnimatedBeam } from "@/components/effects/animated-beam";
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

export function FeaturesSection({ className }: FeaturesSectionProps) {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [topRowVisible, setTopRowVisible] = useState(false);
  const [bottomRowVisible, setBottomRowVisible] = useState(false);
  const [cardVisibility, setCardVisibility] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isMobile, setIsMobile] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          headerObserver.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const topRowObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTopRowVisible(true);
          topRowObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const bottomRowObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBottomRowVisible(true);
          bottomRowObserver.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (topRowRef.current) topRowObserver.observe(topRowRef.current);
    if (bottomRowRef.current) bottomRowObserver.observe(bottomRowRef.current);

    return () => {
      headerObserver.disconnect();
      topRowObserver.disconnect();
      bottomRowObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setCardVisibility((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
              observer.disconnect();
            }
          },
          { threshold: 0.2 }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [isMobile]);

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

  const getCardAnimation = (index: number, isTopRow: boolean) => {
    if (isMobile) {
      return cardVisibility[index]
        ? `animate-slide-in-right-mobile-${index + 1}`
        : "opacity-0";
    }
    // Desktop: use staggered animations within each row
    if (isTopRow) {
      const cardIndex = index + 1; // 1, 2, 3 for top row
      return topRowVisible ? `animate-slide-in-left-${cardIndex}` : "opacity-0";
    }
    const cardIndex = index - 2; // 1, 2, 3 for bottom row (indices 3, 4, 5)
    return bottomRowVisible ? `animate-slide-in-right-${cardIndex}` : "opacity-0";
  };

  return (
    <section id="platform" className={cn("py-20 md:py-32", className)}>
      <div className="flex w-full justify-center px-4 md:px-6">
        <div className="flex max-w-5xl flex-col items-center gap-5">
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
                headerVisible && "animate-slide-up-section-delayed"
              )}
            >
              Deploy any model with enterprise-grade infrastructure. From prototype to
              production, we handle the complexity so you can focus on building.
            </p>
          </div>

          <div ref={topRowRef} className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
            {/* 1st Card - Model Orchestration */}
            <Card
              ref={(el) => {
                cardRefs.current[0] = el;
              }}
              className={cn(
                "border-border bg-card relative h-96 w-full rounded-3xl border",
                getCardAnimation(0, true)
              )}
            >
              <CardHeader className="text-center">
                <h3 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
                  Model Orchestration
                </h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  Route requests to the optimal model based on latency, cost, and
                  capability. Seamlessly switch between providers without code changes.
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
                <AnimatedBeam
                  duration={3}
                  containerRef={containerRef1}
                  fromRef={div1Ref}
                  curvature={40}
                  toRef={div4Ref}
                  delay={0}
                />
                <AnimatedBeam
                  duration={3}
                  containerRef={containerRef1}
                  fromRef={div2Ref}
                  toRef={div4Ref}
                  delay={0.5}
                />
                <AnimatedBeam
                  duration={3}
                  containerRef={containerRef1}
                  fromRef={div3Ref}
                  curvature={-40}
                  toRef={div4Ref}
                  delay={1}
                />
                <AnimatedBeam
                  duration={3}
                  containerRef={containerRef1}
                  fromRef={div4Ref}
                  toRef={div5Ref}
                  delay={1.5}
                />
              </CardContent>
            </Card>

            {/* 2nd Card - Auto Scaling */}
            <Card
              ref={(el) => {
                cardRefs.current[1] = el;
              }}
              className={cn(
                "border-border bg-card h-96 w-full rounded-3xl border",
                getCardAnimation(1, true)
              )}
            >
              <CardHeader className="text-center">
                <h3 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
                  Auto Scaling
                </h3>
                <p className="text-muted-foreground text-sm">
                  Scale from zero to millions of requests automatically with intelligent
                  load balancing.
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
                <AnimatedBeam
                  duration={3}
                  containerRef={containerRef2}
                  fromRef={div6Ref}
                  direction="vertical"
                  curvature={40}
                  toRef={div7Ref}
                />
              </CardContent>
            </Card>

            {/* 3rd Card - Real-time Analytics */}
            <Card
              ref={(el) => {
                cardRefs.current[2] = el;
              }}
              className={cn(
                "border-border bg-card relative h-96 w-full overflow-hidden rounded-3xl border",
                getCardAnimation(2, true)
              )}
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
                        animationDelay: `${i * 100}ms`,
                        animation: "pulse 2s ease-in-out infinite",
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
          </div>

          <div
            ref={bottomRowRef}
            className="grid w-full grid-cols-1 gap-5 md:grid-cols-3"
          >
            {/* 4th Card - Lightning Fast */}
            <Card
              ref={(el) => {
                cardRefs.current[3] = el;
              }}
              className={cn(
                "border-border bg-card relative flex h-96 w-full flex-col rounded-3xl border",
                getCardAnimation(3, false)
              )}
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
                  Sub-100ms latency with edge deployments across 200+ global locations.
                </p>
              </CardHeader>
            </Card>

            {/* 5th Card - Global Infrastructure */}
            <Card
              ref={(el) => {
                cardRefs.current[4] = el;
              }}
              className={cn(
                "border-border bg-card h-96 w-full overflow-hidden rounded-3xl border",
                getCardAnimation(4, false)
              )}
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

            {/* 6th Card - Enterprise Security */}
            <Card
              ref={(el) => {
                cardRefs.current[5] = el;
              }}
              className={cn(
                "border-border bg-card relative h-96 w-full overflow-hidden rounded-3xl border",
                getCardAnimation(5, false)
              )}
            >
              <CardHeader className="text-center">
                <h3 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
                  Enterprise Security
                </h3>
                <p className="text-muted-foreground text-sm">
                  SOC 2 compliant with end-to-end encryption. Your data never leaves your
                  VPC.
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
                <AnimatedBeam
                  duration={3}
                  containerRef={containerRef3}
                  fromRef={div8Ref}
                  toRef={div9Ref}
                  curvature={-30}
                />
                <AnimatedBeam
                  duration={3}
                  containerRef={containerRef3}
                  fromRef={div8Ref}
                  toRef={div9Ref}
                  curvature={30}
                  reverse
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
