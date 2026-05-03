// ============================================
// Oxcil Type Definitions
// Using 'type' over 'interface' per project conventions
// These types align with future API contracts
// ============================================

// Navigation
export type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

// Features Section
export type Feature = {
  id: string;
  icon: "workflow" | "orchestration" | "observability" | "enterprise";
  title: string;
  description: string;
};

// Logo Cloud / Trusted By
export type TrustedCompany = {
  id: string;
  name: string;
  logo?: string;
};

// Dashboard Preview Stats
export type DashboardStat = {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
};

// Workflow Item (for dashboard preview)
export type WorkflowItem = {
  id: string;
  name: string;
  executions: string;
  change: string;
};

// Execution Status (for pie chart)
export type ExecutionStatus = {
  label: string;
  value: number;
  color: string;
};

// Chart Data Point
export type ChartDataPoint = {
  date: string;
  value: number;
};

// ============================================
// Lead Domain Types (for future API contracts)
// ============================================

export type LeadStatus =
  | "new"
  | "qualifying"
  | "qualified"
  | "routing"
  | "routed"
  | "accepted"
  | "rejected"
  | "expired";

export type LeadSource = "organic" | "paid" | "referral" | "partner" | "direct";

export type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: LeadSource;
  verticalId: string;
  locationId: string;
  createdAt: Date;
  updatedAt: Date;
  qualifiedAt?: Date;
  routedAt?: Date;
  metadata?: Record<string, unknown>;
};

// ============================================
// Business/Buyer Domain Types
// ============================================

export type BusinessStatus = "pending" | "active" | "paused" | "churned";

export type Business = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: BusinessStatus;
  verticalId: string;
  locationIds: string[];
  monthlyBudget: number;
  createdAt: Date;
  updatedAt: Date;
};

// ============================================
// Vertical Domain Types
// ============================================

export type Vertical = {
  id: string;
  slug: string;
  name: string;
  description: string;
  isActive: boolean;
  pricePerLead: number;
  createdAt: Date;
};

// ============================================
// Location Domain Types
// ============================================

export type Location = {
  id: string;
  name: string;
  state: string;
  zipCodes: string[];
  isActive: boolean;
};

// ============================================
// Routing Event Types
// ============================================

export type RoutingEventType =
  | "created"
  | "qualified"
  | "routed"
  | "accepted"
  | "rejected"
  | "expired";

export type RoutingEvent = {
  id: string;
  leadId: string;
  businessId?: string;
  eventType: RoutingEventType;
  timestamp: Date;
  metadata?: Record<string, unknown>;
};
