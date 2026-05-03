import type {
  ChartDataPoint,
  DashboardStat,
  ExecutionStatus,
  Feature,
  NavItem,
  TrustedCompany,
  WorkflowItem,
} from "@/types";

// ============================================
// Navigation Data
// ============================================

export const navItems: NavItem[] = [
  { label: "Product", href: "/product", hasDropdown: true },
  { label: "Solutions", href: "/solutions", hasDropdown: true },
  { label: "Resources", href: "/resources", hasDropdown: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
];

// ============================================
// Features Data
// ============================================

export const features: Feature[] = [
  {
    id: "visual-workflow",
    icon: "workflow",
    title: "Visual Workflow Builder",
    description: "Design complex workflows with an intuitive drag-and-drop builder.",
  },
  {
    id: "reliable-orchestration",
    icon: "orchestration",
    title: "Reliable Orchestration",
    description:
      "Built for scale with smart retries, error handling, and distributed execution.",
  },
  {
    id: "realtime-observability",
    icon: "observability",
    title: "Real-time Observability",
    description: "Monitor every step with logs, metrics, and traces in real-time.",
  },
  {
    id: "enterprise-ready",
    icon: "enterprise",
    title: "Enterprise Ready",
    description: "Secure, compliant, and built to integrate with your existing stack.",
  },
];

// ============================================
// Trusted Companies Data
// ============================================

export const trustedCompanies: TrustedCompany[] = [
  { id: "synthara", name: "Synthara" },
  { id: "nebula", name: "Nebula" },
  { id: "flowbase", name: "Flowbase" },
  { id: "chainly", name: "Chainly" },
  { id: "datavault", name: "Datavault" },
  { id: "novara", name: "Novara" },
];

// ============================================
// Dashboard Preview Data
// ============================================

export const dashboardStats: DashboardStat[] = [
  {
    id: "total-executions",
    label: "Total Executions",
    value: "128.4K",
    change: "+12.5%",
    trend: "up",
  },
  {
    id: "success-rate",
    label: "Success Rate",
    value: "99.96%",
    change: "+2.1%",
    trend: "up",
  },
  {
    id: "avg-latency",
    label: "Avg. Latency",
    value: "842ms",
    change: "-8.3%",
    trend: "down",
  },
  {
    id: "cost-this-month",
    label: "Cost This Month",
    value: "$4,732",
    change: "-11.4%",
    trend: "down",
  },
];

export const topWorkflows: WorkflowItem[] = [
  {
    id: "user-onboarding",
    name: "User Onboarding Flow",
    executions: "24.8K",
    change: "+14.2%",
  },
  {
    id: "document-processing",
    name: "Document Processing",
    executions: "18.3K",
    change: "+11.7%",
  },
  {
    id: "email-automation",
    name: "Email Automation",
    executions: "12.1K",
    change: "+9.3%",
  },
  { id: "data-enrichment", name: "Data Enrichment", executions: "9.7K", change: "+8.1%" },
];

export const executionStatuses: ExecutionStatus[] = [
  { label: "Success", value: 99.96, color: "var(--primary)" },
  { label: "Failed", value: 0.03, color: "var(--destructive)" },
  { label: "Cancelled", value: 0.01, color: "var(--muted-foreground)" },
];

export const chartData: ChartDataPoint[] = [
  { date: "May 12", value: 8000 },
  { date: "May 19", value: 12000 },
  { date: "May 26", value: 18000 },
  { date: "Jun 2", value: 28000 },
  { date: "Jun 9", value: 42000 },
];

// ============================================
// Dashboard Sidebar Navigation
// ============================================

export const sidebarNavItems = [
  { id: "overview", label: "Overview", icon: "layout-dashboard", active: true },
  { id: "workflows", label: "Workflows", icon: "git-branch" },
  { id: "executions", label: "Executions", icon: "play-circle" },
  { id: "agents", label: "Agents", icon: "bot" },
  { id: "integrations", label: "Integrations", icon: "puzzle" },
  { id: "data-stores", label: "Data Stores", icon: "database" },
  { id: "settings", label: "Settings", icon: "settings" },
];
