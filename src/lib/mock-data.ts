// Mock data for Gimble Admin Dashboard

export const mockUser = {
  name: "Adaeze Okonkwo",
  email: "adaeze@gimble.io",
  role: "Facilitator",
  avatar: "AO",
};

export const overviewStats = [
  { label: "Total Members", value: "2,847", change: "+12%", trend: "up" as const },
  { label: "Active Users (7d)", value: "1,923", change: "+8%", trend: "up" as const },
  { label: "Journeys Completed", value: "4,512", change: "+23%", trend: "up" as const },
  { label: "Avg. Wellbeing Score", value: "7.2/10", change: "+0.4", trend: "up" as const },
];

export const moodTrendData = [
  { month: "Aug", score: 6.2, stress: 5.8, sleep: 6.0 },
  { month: "Sep", score: 6.5, stress: 5.5, sleep: 6.3 },
  { month: "Oct", score: 6.8, stress: 5.2, sleep: 6.5 },
  { month: "Nov", score: 6.4, stress: 5.9, sleep: 6.1 },
  { month: "Dec", score: 7.0, stress: 4.8, sleep: 6.8 },
  { month: "Jan", score: 7.2, stress: 4.5, sleep: 7.0 },
  { month: "Feb", score: 7.4, stress: 4.3, sleep: 7.2 },
];

export const engagementData = [
  { name: "Journeys", value: 35 },
  { name: "Assessments", value: 25 },
  { name: "Activities", value: 22 },
  { name: "Library", value: 18 },
];

export const departmentWellbeing = [
  { department: "Engineering", wellbeing: 7.5, stress: 4.2, engagement: 82 },
  { department: "Marketing", wellbeing: 7.8, stress: 3.8, engagement: 88 },
  { department: "Sales", wellbeing: 6.9, stress: 5.1, engagement: 75 },
  { department: "HR", wellbeing: 8.1, stress: 3.2, engagement: 91 },
  { department: "Operations", wellbeing: 7.0, stress: 4.8, engagement: 78 },
  { department: "Finance", wellbeing: 7.3, stress: 4.5, engagement: 80 },
];

export const journeyTemplates = [
  { id: "j1", title: "Managing Stress", category: "Stress", status: "published", assignedCount: 342, completionRate: 68 },
  { id: "j2", title: "Better Sleep Habits", category: "Sleep", status: "published", assignedCount: 289, completionRate: 72 },
  { id: "j3", title: "Understanding Anxiety", category: "Anxiety", status: "published", assignedCount: 198, completionRate: 55 },
  { id: "j4", title: "Building Resilience", category: "Resilience", status: "draft", assignedCount: 0, completionRate: 0 },
  { id: "j5", title: "Mindful Leadership", category: "Leadership", status: "published", assignedCount: 156, completionRate: 61 },
  { id: "j6", title: "Overcoming Depression", category: "Depression", status: "published", assignedCount: 234, completionRate: 48 },
];

export const members = [
  { id: "m1", name: "Kwame Mensah", email: "kwame@company.com", department: "Engineering", joinedDate: "2024-06-15", status: "active", journeysCompleted: 3 },
  { id: "m2", name: "Amina Diallo", email: "amina@company.com", department: "Marketing", joinedDate: "2024-07-02", status: "active", journeysCompleted: 5 },
  { id: "m3", name: "Chidi Okafor", email: "chidi@company.com", department: "Sales", joinedDate: "2024-08-10", status: "active", journeysCompleted: 2 },
  { id: "m4", name: "Fatima Hassan", email: "fatima@company.com", department: "HR", joinedDate: "2024-05-20", status: "active", journeysCompleted: 7 },
  { id: "m5", name: "Tendai Moyo", email: "tendai@company.com", department: "Operations", joinedDate: "2024-09-01", status: "inactive", journeysCompleted: 1 },
  { id: "m6", name: "Ngozi Eze", email: "ngozi@company.com", department: "Finance", joinedDate: "2024-07-18", status: "active", journeysCompleted: 4 },
  { id: "m7", name: "Oluwaseun Adeyemi", email: "seun@company.com", department: "Engineering", joinedDate: "2024-10-05", status: "active", journeysCompleted: 2 },
  { id: "m8", name: "Zainab Bello", email: "zainab@company.com", department: "Marketing", joinedDate: "2024-11-12", status: "active", journeysCompleted: 1 },
];

export const recentActivity = [
  { id: 1, action: "Journey completed", user: "Amina Diallo", detail: "Managing Stress", time: "2 hours ago" },
  { id: 2, action: "Assessment taken", user: "Kwame Mensah", detail: "PHQ-9 Screener", time: "3 hours ago" },
  { id: 3, action: "New member joined", user: "Yemi Alade", detail: "Engineering", time: "5 hours ago" },
  { id: 4, action: "Journey assigned", user: "Admin", detail: "Better Sleep Habits → Sales Team", time: "1 day ago" },
  { id: 5, action: "Homework submitted", user: "Fatima Hassan", detail: "Weekly Reflection", time: "1 day ago" },
];

export const weeklyActiveUsersData = [
  { day: "Mon", users: 1420 },
  { day: "Tue", users: 1580 },
  { day: "Wed", users: 1690 },
  { day: "Thu", users: 1550 },
  { day: "Fri", users: 1380 },
  { day: "Sat", users: 820 },
  { day: "Sun", users: 690 },
];

export const assessmentResults = [
  { name: "PHQ-9 (Depression)", minimal: 45, mild: 30, moderate: 18, severe: 7 },
  { name: "GAD-7 (Anxiety)", minimal: 40, mild: 32, moderate: 20, severe: 8 },
];
