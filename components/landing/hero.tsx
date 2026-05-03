import { ArrowRight } from "lucide-react";

import { BackgroundRipple } from "@/components/effects/background-ripple";
import { DashboardPreview } from "@/components/landing/dashboard-preview";
import { PageContainer } from "@/components/layout/page-container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <Section
      className="relative flex min-h-svh items-center overflow-hidden"
      spacing="none"
      clip
    >
      <BackgroundRipple />
      <PageContainer className="relative z-10">
        <div className="grid items-center gap-12 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-16">
          {/* Left Column - Copy */}
          <div className="flex flex-col gap-5 lg:gap-6">
            {/* Headline */}
            <h1 className="text-foreground text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Local service leads,
              <br />
              routed with purpose.
            </h1>

            {/* Subheadline */}
            <p className="text-muted-foreground max-w-md text-lg leading-relaxed text-pretty">
              Oxcil is AI lead infrastructure for local service businesses.
              <br />
              We build focused landing pages, capture intent, qualify submissions, and
              route high-value leads into a workflow you can actually operate.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Button size="lg">
                Explore the concept
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="brand">
                See the workflow
              </Button>
            </div>

            {/* Trust Signal */}
            <Badge
              variant="outline"
              className="border-border bg-background w-fit gap-3 rounded-full px-3 py-2"
            >
              <span className="bg-oxcil-brand h-2 w-2 rounded-full" />
              <p className="text-foreground text-sm">
                Manual-first workflows, future-ready automation
              </p>
            </Badge>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="relative lg:pl-6">
            <DashboardPreview />
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}
