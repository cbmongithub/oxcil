"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Calendar,
  ChevronDown,
  Database,
  GitBranch,
  LayoutDashboard,
  PlayCircle,
  Puzzle,
  Settings,
} from "lucide-react";

import { BRAND_MARK_PATHS, BRAND_MARK_VIEWBOX } from "@/lib/brand-mark";
import {
  chartData,
  dashboardStats,
  executionStatuses,
  topWorkflows,
} from "@/lib/mock-data";

const DESIGN_WIDTH = 900;
const DESIGN_HEIGHT = 560;

export function DashboardPreview() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / DESIGN_WIDTH);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    // Outer wrapper: measures available width and sets the proportional height
    <div
      ref={wrapRef}
      className="border-border bg-card ring-border dark:bg-card/90 relative w-full overflow-hidden rounded-xl border shadow-xl"
      style={{ height: DESIGN_HEIGHT * scale }}
    >
      {/* Inner shell: always DESIGN_WIDTH × DESIGN_HEIGHT, scaled to fit */}
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `scale(${scale})`,
        }}
      >
        {/* Window chrome */}
        <div className="border-border/70 bg-background/55 dark:bg-background/35 flex h-10 items-center gap-2 border-b px-4">
          <div className="flex gap-1.5">
            <div className="bg-destructive/80 h-3 w-3 rounded-full" />
            <div className="bg-oxcil-brand/50 h-3 w-3 rounded-full" />
            <div className="bg-success h-3 w-3 rounded-full" />
          </div>
        </div>

        <div className="flex" style={{ height: DESIGN_HEIGHT - 40 }}>
          {/* Sidebar */}
          <div className="border-border/70 bg-background/35 dark:bg-background/20 flex w-44 shrink-0 flex-col border-r p-3">
            <div className="mb-5 flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox={BRAND_MARK_VIEWBOX}
                xmlns="http://www.w3.org/2000/svg"
                className="text-foreground"
              >
                <path d={BRAND_MARK_PATHS.outer} fill="currentColor" />
                <path d={BRAND_MARK_PATHS.inner} fill="var(--card)" />
              </svg>
              <span className="text-foreground text-sm font-semibold tracking-tight">
                oxcil
              </span>
            </div>

            <nav className="flex flex-col gap-0.5">
              <SidebarItem icon={LayoutDashboard} label="Overview" active />
              <SidebarItem icon={GitBranch} label="Workflows" />
              <SidebarItem icon={PlayCircle} label="Executions" />
              <SidebarItem icon={Bot} label="Agents" />
              <SidebarItem icon={Puzzle} label="Integrations" />
              <SidebarItem icon={Database} label="Data Stores" />
              <SidebarItem icon={Settings} label="Settings" />
            </nav>

            <div className="border-border/70 mt-auto border-t pt-3">
              <div className="flex items-center gap-2">
                <div className="bg-oxcil-brand-soft text-oxcil-brand flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold">
                  AC
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-foreground truncate text-xs font-medium">
                    Alex Carter
                  </p>
                  <p className="text-muted-foreground truncate text-[10px]">
                    admin@oxcil.com
                  </p>
                </div>
                <ChevronDown className="text-muted-foreground h-3 w-3 shrink-0" />
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-1 flex-col p-4">
            {/* Top bar */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-foreground text-sm font-semibold">Overview</h2>
              <div className="border-border text-muted-foreground flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px]">
                <Calendar className="h-3 w-3" />
                May 12 – Jun 12, 2024
              </div>
            </div>

            {/* Stats row */}
            <div className="mb-4 grid grid-cols-4 gap-2">
              {dashboardStats.map((stat) => (
                <div
                  key={stat.id}
                  className="bg-background/65 border-border/50 dark:bg-background/35 rounded-lg border px-3 py-2"
                >
                  <p className="text-muted-foreground mb-1 text-[11px]">{stat.label}</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-foreground text-base font-semibold">
                      {stat.value}
                    </span>
                    <span
                      className={`text-[10px] font-medium ${
                        stat.trend === "up" ? "text-success" : "text-destructive"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-background/70 border-border/50 dark:bg-background/35 mb-4 rounded-lg border p-3">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-foreground text-xs font-medium">
                  Workflow Executions
                </h3>
                <span className="border-border text-muted-foreground rounded border px-2 py-0.5 text-[10px]">
                  Daily
                </span>
              </div>
              <MiniChart data={chartData} />
            </div>

            {/* Bottom row */}
            <div className="grid flex-1 grid-cols-2 gap-3">
              <div className="bg-background/70 border-border/50 dark:bg-background/35 rounded-lg border p-3">
                <h3 className="text-foreground mb-2.5 text-xs font-medium">
                  Top Workflows
                </h3>
                <div className="flex flex-col gap-2">
                  {topWorkflows.map((workflow) => (
                    <div key={workflow.id} className="flex items-center justify-between">
                      <div className="flex min-w-0 items-center gap-2">
                        <div className="bg-oxcil-brand h-1.5 w-1.5 shrink-0 rounded-full" />
                        <span className="text-foreground truncate text-[11px]">
                          {workflow.name}
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-2 pl-2">
                        <span className="text-muted-foreground text-[11px]">
                          {workflow.executions}
                        </span>
                        <span className="text-success text-[11px]">
                          {workflow.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-background/70 border-border/50 dark:bg-background/35 rounded-lg border p-3">
                <h3 className="text-foreground mb-2.5 text-xs font-medium">
                  Executions by Status
                </h3>
                <div className="flex items-center gap-4">
                  <DonutChart />
                  <div className="flex flex-col gap-1.5">
                    {executionStatuses.map((status) => (
                      <div key={status.label} className="flex items-center gap-2">
                        <div
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: status.color }}
                        />
                        <span className="text-muted-foreground text-[11px]">
                          {status.label}
                        </span>
                        <span className="text-foreground text-[11px] font-medium">
                          {status.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs ${
        active ? "bg-primary/15 text-primary" : "text-muted-foreground"
      }`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {label}
    </div>
  );
}

function MiniChart({ data }: { data: { date: string; value: number }[] }) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (d.value / maxValue) * 85;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="h-16 w-full">
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[25, 50, 75].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="currentColor"
            strokeWidth="0.3"
            className="text-border"
          />
        ))}
        <polygon points={`0,100 ${points} 100,100`} fill="url(#chartGrad)" />
        <polyline
          points={points}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function DonutChart() {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const successDash = circumference * 0.9996;

  return (
    <svg width="52" height="52" viewBox="0 0 52 52" className="shrink-0">
      <circle
        cx="26"
        cy="26"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        className="text-border"
      />
      <circle
        cx="26"
        cy="26"
        r={radius}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="5"
        strokeDasharray={`${successDash} ${circumference}`}
        strokeLinecap="round"
        transform="rotate(-90 26 26)"
      />
      <text
        x="26"
        y="30"
        textAnchor="middle"
        fontSize="7"
        fontWeight="600"
        fill="currentColor"
        className="text-foreground"
      >
        99.96%
      </text>
    </svg>
  );
}
