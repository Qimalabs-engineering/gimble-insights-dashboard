export interface Organization {
  id: string;
  name: string;
  plan: "starter" | "professional" | "enterprise";
  memberCount: number;
  activeUsers: number;
  createdAt: string;
  status: "active" | "suspended" | "trial";
  contactEmail: string;
}

export interface JourneyTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  modules: number;
  estimatedDays: number;
  status: "published" | "draft" | "archived";
  usedByOrgs: number;
  createdAt: string;
}

export const organizations: Organization[] = [
  { id: "org1", name: "Acme Corp", plan: "enterprise", memberCount: 1024, activeUsers: 847, createdAt: "2024-01-15", status: "active", contactEmail: "hr@acmecorp.com" },
  { id: "org2", name: "TechFlow Inc", plan: "professional", memberCount: 340, activeUsers: 280, createdAt: "2024-03-20", status: "active", contactEmail: "people@techflow.io" },
  { id: "org3", name: "GreenLeaf Ltd", plan: "starter", memberCount: 85, activeUsers: 62, createdAt: "2024-06-10", status: "active", contactEmail: "admin@greenleaf.co" },
  { id: "org4", name: "Horizon Health", plan: "enterprise", memberCount: 2100, activeUsers: 1750, createdAt: "2023-11-05", status: "active", contactEmail: "wellness@horizonhealth.com" },
  { id: "org5", name: "Nova Education", plan: "professional", memberCount: 420, activeUsers: 310, createdAt: "2024-07-01", status: "trial", contactEmail: "admin@novaedu.org" },
  { id: "org6", name: "Stellar Finance", plan: "starter", memberCount: 55, activeUsers: 30, createdAt: "2024-09-15", status: "suspended", contactEmail: "ops@stellarfin.com" },
];

export const journeyTemplates: JourneyTemplate[] = [
  { id: "jt1", title: "Managing Stress", category: "Stress", description: "A comprehensive journey to understand and manage workplace stress through evidence-based techniques.", modules: 8, estimatedDays: 21, status: "published", usedByOrgs: 12, createdAt: "2024-01-10" },
  { id: "jt2", title: "Better Sleep Habits", category: "Sleep", description: "Improve sleep quality with structured routines, CBT-I techniques, and mindfulness practices.", modules: 6, estimatedDays: 14, status: "published", usedByOrgs: 9, createdAt: "2024-02-15" },
  { id: "jt3", title: "Understanding Anxiety", category: "Anxiety", description: "Learn to identify anxiety triggers and develop coping strategies using CBT frameworks.", modules: 10, estimatedDays: 28, status: "published", usedByOrgs: 15, createdAt: "2024-01-05" },
  { id: "jt4", title: "Building Resilience", category: "Resilience", description: "Strengthen emotional resilience through positive psychology and growth mindset exercises.", modules: 7, estimatedDays: 21, status: "draft", usedByOrgs: 0, createdAt: "2024-08-20" },
  { id: "jt5", title: "Mindful Leadership", category: "Leadership", description: "Develop mindful leadership practices for better team wellbeing and performance.", modules: 9, estimatedDays: 30, status: "published", usedByOrgs: 6, createdAt: "2024-04-12" },
  { id: "jt6", title: "Overcoming Depression", category: "Depression", description: "A guided journey through understanding and managing depressive episodes with professional support.", modules: 12, estimatedDays: 42, status: "published", usedByOrgs: 11, createdAt: "2024-03-01" },
  { id: "jt7", title: "Work-Life Balance", category: "Wellbeing", description: "Practical strategies for maintaining healthy boundaries between work and personal life.", modules: 5, estimatedDays: 14, status: "draft", usedByOrgs: 0, createdAt: "2024-09-10" },
];

export const adminStats = [
  { label: "Total Organizations", value: "6", change: "+2", trend: "up" as const },
  { label: "Total Users", value: "4,024", change: "+18%", trend: "up" as const },
  { label: "Journey Templates", value: "7", change: "+1", trend: "up" as const },
  { label: "Platform Uptime", value: "99.9%", change: "0%", trend: "up" as const },
];
