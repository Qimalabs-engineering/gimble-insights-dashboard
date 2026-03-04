// Mock data for Gimble Admin Dashboard

export const mockUser = {
  name: "Adaeze Okonkwo",
  email: "adaeze@gimble.io",
  role: "Facilitator",
  avatar: "AO",
};

export const overviewStats = [
  { label: "Total Members", value: "1,024", change: "+12%", trend: "up" as const },
  { label: "Active Users (7d)", value: "847", change: "+8%", trend: "up" as const },
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
  { department: "Engineering", wellbeing: 7.5, stress: 4.2, engagement: 82, burnout: 18, satisfaction: 7.8 },
  { department: "Marketing", wellbeing: 7.8, stress: 3.8, engagement: 88, burnout: 12, satisfaction: 8.1 },
  { department: "Sales", wellbeing: 6.9, stress: 5.1, engagement: 75, burnout: 25, satisfaction: 6.7 },
  { department: "HR", wellbeing: 8.1, stress: 3.2, engagement: 91, burnout: 9, satisfaction: 8.4 },
  { department: "Operations", wellbeing: 7.0, stress: 4.8, engagement: 78, burnout: 22, satisfaction: 7.1 },
  { department: "Finance", wellbeing: 7.3, stress: 4.5, engagement: 80, burnout: 20, satisfaction: 7.5 },
];

export const journeyTemplates = [
  { id: "j1", title: "Managing Stress", category: "Stress", status: "published", assignedCount: 342, completionRate: 68 },
  { id: "j2", title: "Better Sleep Habits", category: "Sleep", status: "published", assignedCount: 289, completionRate: 72 },
  { id: "j3", title: "Understanding Anxiety", category: "Anxiety", status: "published", assignedCount: 198, completionRate: 55 },
  { id: "j4", title: "Building Resilience", category: "Resilience", status: "draft", assignedCount: 0, completionRate: 0 },
  { id: "j5", title: "Mindful Leadership", category: "Leadership", status: "published", assignedCount: 156, completionRate: 61 },
  { id: "j6", title: "Overcoming Depression", category: "Depression", status: "published", assignedCount: 234, completionRate: 48 },
];

// Generate 1024 mock members
const firstNames = [
  "Kwame", "Amina", "Chidi", "Fatima", "Tendai", "Ngozi", "Oluwaseun", "Zainab",
  "Adaeze", "Emeka", "Halima", "Kofi", "Aisha", "Tunde", "Chiamaka", "Yusuf",
  "Nkechi", "Ibrahim", "Folake", "Abdullahi", "Chioma", "Musa", "Blessing", "Omar",
  "Nneka", "Sadiq", "Funmilayo", "Idris", "Ogechi", "Hassan", "Yemi", "Binta",
  "Obinna", "Mariam", "Adewale", "Hafsat", "Ikenna", "Khadija", "Chukwuemeka", "Safiya",
  "Nnamdi", "Rukayat", "Uzoma", "Jummai", "Ebuka", "Hauwa", "Chinonso", "Asma",
  "Ifeanyi", "Hadiza", "Tochi", "Bilkisu", "Kelechi", "Zara", "Jide", "Lubabatu",
  "Segun", "Nana", "Dapo", "Ama", "Femi", "Akua", "Bode", "Abena"
];
const lastNames = [
  "Mensah", "Diallo", "Okafor", "Hassan", "Moyo", "Eze", "Adeyemi", "Bello",
  "Okonkwo", "Adekunle", "Traore", "Nwachukwu", "Abdulrahman", "Achebe", "Kamara", "Ojo",
  "Osei", "Conteh", "Nwosu", "Mohammed", "Okoro", "Suleiman", "Abubakar", "Obi",
  "Sesay", "Olawale", "Jalloh", "Uzoma", "Bangura", "Bakare", "Koroma", "Ogundimu"
];
const departments = ["Engineering", "Marketing", "Sales", "HR", "Operations", "Finance", "Product", "Design", "Support", "Legal"];
const statuses = ["active", "active", "active", "active", "active", "active", "active", "inactive"] as const;

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const members = Array.from({ length: 1024 }, (_, i) => {
  const fn = firstNames[Math.floor(seededRandom(i + 1) * firstNames.length)];
  const ln = lastNames[Math.floor(seededRandom(i + 100) * lastNames.length)];
  const dept = departments[Math.floor(seededRandom(i + 200) * departments.length)];
  const status = statuses[Math.floor(seededRandom(i + 300) * statuses.length)];
  const month = String(Math.floor(seededRandom(i + 400) * 12) + 1).padStart(2, "0");
  const day = String(Math.floor(seededRandom(i + 500) * 28) + 1).padStart(2, "0");
  return {
    id: `m${i + 1}`,
    name: `${fn} ${ln}`,
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i > 0 ? i : ""}@company.com`,
    department: dept,
    joinedDate: `2024-${month}-${day}`,
    status: status as "active" | "inactive",
    journeysCompleted: Math.floor(seededRandom(i + 600) * 10),
  };
});

export const recentActivity = [
  { id: 1, action: "Journey completed", user: "Anonymous User", detail: "Managing Stress", time: "2 hours ago" },
  { id: 2, action: "Assessment taken", user: "Anonymous User", detail: "PHQ-9 Screener", time: "3 hours ago" },
  { id: 3, action: "New member joined", user: "Anonymous User", detail: "Engineering", time: "5 hours ago" },
  { id: 4, action: "Journey assigned", user: "Admin", detail: "Better Sleep Habits → Sales Team", time: "1 day ago" },
  { id: 5, action: "Homework submitted", user: "Anonymous User", detail: "Weekly Reflection", time: "1 day ago" },
];

export const weeklyActiveUsersData = [
  { day: "Mon", users: 620 },
  { day: "Tue", users: 710 },
  { day: "Wed", users: 780 },
  { day: "Thu", users: 690 },
  { day: "Fri", users: 640 },
  { day: "Sat", users: 320 },
  { day: "Sun", users: 280 },
];

export const assessmentResults = [
  { name: "PHQ-9 (Depression)", minimal: 45, mild: 30, moderate: 18, severe: 7 },
  { name: "GAD-7 (Anxiety)", minimal: 40, mild: 32, moderate: 20, severe: 8 },
];

export const emergencyContacts = [
  { id: "ec1", name: "Dr. Amara Obi", role: "Primary Counselor", phone: "+234 800 123 4567", email: "support@gimble.io" },
  { id: "ec2", name: "Crisis Helpline", role: "24/7 Support", phone: "+234 800 999 0000", email: "crisis@gimble.io" },
];
