"use client";
import React, { useCallback, useRef, useState } from "react";
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
import { WhileInView } from "@/components/effects/while-in-view";
import { PageContainer } from "@/components/layout/page-container";
import { Section } from "@/components/layout/section";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { cn } from "@/lib/utils";

type FeaturesGridProps = {
  className?: string;
};

const IconCard = React.forwardRef<
  HTMLDivElement,
  { icon: React.ReactNode; className?: string }
>(function ({ icon, className }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "border-oxcil-brand-border/45 bg-oxcil-brand-soft/60 text-oxcil-brand relative z-10 flex size-14 items-center justify-center rounded-xl border shadow-[0_0_0_1px_color-mix(in_oklab,var(--oxcil-brand)_18%,transparent)_inset]",
        className
      )}
    >
      {icon}
    </div>
  );
});

IconCard.displayName = "IconCard";

const featureCardShell =
  "border-border/70 bg-card/85 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/75";

export function FeaturesGrid({ className }: FeaturesGridProps) {
  const [showGlobe, setShowGlobe] = useState(false);
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

  const handleGlobeVisible = useCallback(() => {
    setShowGlobe(true);
  }, []);

  return (
    <Section className={cn(className)} spacing="section" clip>
      <PageContainer className="flex flex-col gap-6">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
            Built for scale, optimized for speed
          </h2>
          <p className="text-muted-foreground mt-4 text-base text-balance md:text-lg">
            Deploy any model with enterprise-grade infrastructure. From prototype to
            production, we handle the complexity so you can focus on building.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 1st Card - Model Orchestration */}
          <Card className={cn(featureCardShell, "relative h-96 w-full rounded-xl")}>
            <CardHeader className="text-center">
              <h3 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
                Model Orchestration
              </h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Route requests to the optimal model based on latency, cost, and
                capability. Seamlessly switch between providers without code changes.
              </p>
            </CardHeader>
            <CardContent ref={containerRef1} className="relative px-6 pb-6">
              <IconCard
                ref={div1Ref}
                icon={<Brain className="size-5" />}
                className="rotate-[-4deg]"
              />
              <IconCard
                ref={div2Ref}
                icon={<Cpu className="size-5" />}
                className="border-chart-2/25 bg-chart-2/10 text-chart-2 translate-x-32 rotate-[8deg] shadow-[0_0_0_1px_color-mix(in_oklab,var(--chart-2)_18%,transparent)_inset]"
              />
              <IconCard
                ref={div3Ref}
                icon={<Layers className="size-5" />}
                className="border-chart-3/25 bg-chart-3/10 text-chart-3 mt-3 shadow-[0_0_0_1px_color-mix(in_oklab,var(--chart-3)_18%,transparent)_inset]"
              />
              <IconCard
                ref={div5Ref}
                icon={<Zap className="size-5" />}
                className="border-chart-4/25 bg-chart-4/10 text-chart-4 absolute top-1/2 right-12 -translate-y-1/2 -rotate-6 shadow-[0_0_0_1px_color-mix(in_oklab,var(--chart-4)_18%,transparent)_inset]"
              />
              <div
                ref={div4Ref}
                className="bg-success border-success/30 ring-background/80 dark:ring-background/35 absolute top-1/2 left-1/2 z-50 h-4 w-4 -translate-y-1/2 rounded-full border shadow-[0_0_0_6px_color-mix(in_oklab,var(--success)_14%,transparent)] ring-1 ring-inset"
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
          <Card className={cn(featureCardShell, "h-96 w-full rounded-xl")}>
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
              className="relative flex h-40 flex-col items-center justify-between px-6 pt-2 pb-6"
            >
              <IconCard
                ref={div6Ref}
                icon={<Server className="size-5" />}
                className="border-chart-1/25 bg-chart-1/10 text-chart-1 mb-3 shadow-[0_0_0_1px_color-mix(in_oklab,var(--chart-1)_18%,transparent)_inset]"
              />
              <IconCard
                ref={div7Ref}
                icon={<Cloud className="size-5" />}
                className="border-chart-2/25 bg-chart-2/10 text-chart-2 mt-3 shadow-[0_0_0_1px_color-mix(in_oklab,var(--chart-2)_18%,transparent)_inset]"
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
            className={cn(
              featureCardShell,
              "relative h-96 w-full overflow-hidden rounded-xl"
            )}
          >
            <CardHeader className="text-center">
              <h3 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
                Real-time Analytics
              </h3>
              <p className="text-muted-foreground text-sm">
                Monitor inference metrics, costs, and performance in real-time dashboards.
              </p>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-3 px-6 pt-2 pb-6">
              <div className="bg-background/60 border-oxcil-brand-border/20 flex w-full items-end justify-center gap-2 rounded-2xl border px-4 py-4">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75].map((height, i) => (
                  <div
                    key={i}
                    className="bg-oxcil-brand/80 w-4 rounded-t shadow-[0_0_12px_color-mix(in_oklab,var(--oxcil-brand)_22%,transparent)]"
                    style={{
                      height: `${height}px`,
                    }}
                  />
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Activity className="text-oxcil-brand size-5" />
                <span className="text-foreground text-2xl font-bold">99.9%</span>
                <span className="text-muted-foreground text-sm">uptime</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid w-full grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 4th Card - Lightning Fast */}
          <Card
            className={cn(
              featureCardShell,
              "relative flex h-96 w-full flex-col rounded-xl"
            )}
          >
            <CardHeader className="text-center">
              <h3 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
                Lightning Fast Inference
              </h3>
              <p className="text-muted-foreground text-sm">
                Sub-100ms latency with edge deployments across 200+ global locations.
              </p>
            </CardHeader>

            <CardContent className="flex items-center justify-center px-6 pt-4 pb-6">
              <div className="relative flex size-32 items-center justify-center">
                <div className="border-oxcil-brand-border/20 bg-oxcil-brand-soft/20 absolute inset-0 rounded-full border" />
                <div className="border-oxcil-brand-border/30 bg-oxcil-brand-soft/35 absolute inset-4 rounded-full border" />
                <Zap className="text-oxcil-brand size-12 drop-shadow-sm" />
              </div>
            </CardContent>
          </Card>

          {/* 5th Card - Global Infrastructure */}
          <Card
            className={cn(featureCardShell, "h-96 w-full overflow-hidden rounded-xl")}
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
            <CardContent className="relative h-48 px-6 pt-2 pb-6">
              <WhileInView
                as="div"
                className="relative h-full w-full"
                hiddenClassName="opacity-0"
                visibleClassName="opacity-100"
                threshold={0.2}
                onVisible={handleGlobeVisible}
              >
                {showGlobe ? <Globe className="top-0" /> : null}
              </WhileInView>
            </CardContent>
          </Card>

          {/* 6th Card - Enterprise Security */}
          <Card
            className={cn(
              featureCardShell,
              "relative h-96 w-full overflow-hidden rounded-xl"
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
                icon={<Lock className="size-5" />}
                className="border-chart-5/25 bg-chart-5/10 text-chart-5 absolute left-8 shadow-[0_0_0_1px_color-mix(in_oklab,var(--chart-5)_18%,transparent)_inset]"
              />
              <div className="relative flex size-20 items-center justify-center">
                <div className="border-oxcil-brand-border/40 bg-oxcil-brand-soft/10 absolute inset-0 rounded-full border" />
                <div className="border-oxcil-brand-border/70 absolute inset-2 rounded-full border border-dashed" />
                <Shield className="text-oxcil-brand size-8 drop-shadow-sm" />
              </div>
              <IconCard
                ref={div9Ref}
                icon={<BarChart3 className="size-5" />}
                className="border-success/25 bg-success/10 text-success absolute right-8 shadow-[0_0_0_1px_color-mix(in_oklab,var(--success)_18%,transparent)_inset]"
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
      </PageContainer>
    </Section>
  );
}
