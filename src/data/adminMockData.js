// Admin Mock Data for Users, Analytics, Tickets & Platform Overview

export const adminStats = {
    totalUsers: 14280,
    totalCourses: 32,
    totalEnrollments: 48920,
    totalRevenue: "$284,500",
    monthlyGrowth: "+18.4%",
    activeStudentsToday: 1840
};

export const adminUsersData = [
    { id: "usr-101", name: "Aarav Sharma", email: "aarav.s@gmail.com", joined: "2026-01-15", coursesEnrolled: 4, spent: "$249.96", status: "Active", role: "Student" },
    { id: "usr-102", name: "Priya Patel", email: "priya.p@tech.io", joined: "2026-01-18", coursesEnrolled: 2, spent: "$139.98", status: "Active", role: "Student" },
    { id: "usr-103", name: "Rohan Verma", email: "rohan.v@yahoo.com", joined: "2026-01-22", coursesEnrolled: 6, spent: "$419.94", status: "Active", role: "Student" },
    { id: "usr-104", name: "Ananya Iyer", email: "ananya.i@outlook.com", joined: "2026-02-01", coursesEnrolled: 1, spent: "$69.99", status: "Blocked", role: "Student" },
    { id: "usr-105", name: "Vikram Malhotra", email: "vikram.m@ai-corp.com", joined: "2026-02-03", coursesEnrolled: 5, spent: "$389.95", status: "Active", role: "Student" },
    { id: "usr-106", name: "Sneha Gupta", email: "sneha.g@design.co", joined: "2026-02-05", coursesEnrolled: 3, spent: "$179.97", status: "Active", role: "Student" },
    { id: "usr-107", name: "Kabir Mehta", email: "kabir.m@gmail.com", joined: "2026-02-08", coursesEnrolled: 0, spent: "$0.00", status: "Active", role: "Student" },
    { id: "usr-108", name: "Neha Deshmukh", email: "neha.d@coders.in", joined: "2026-02-10", coursesEnrolled: 8, spent: "$599.92", status: "Active", role: "Student" }
];

export const adminAnalyticsData = {
    weeklyEnrollments: [
        { day: "Mon", count: 420 },
        { day: "Tue", count: 580 },
        { day: "Wed", count: 710 },
        { day: "Thu", count: 640 },
        { day: "Fri", count: 890 },
        { day: "Sat", count: 1050 },
        { day: "Sun", count: 980 }
    ],
    categoryShare: [
        { category: "AI Tools", percent: 40, color: "#6366f1" },
        { category: "Technology", percent: 30, color: "#2563eb" },
        { category: "Languages", percent: 18, color: "#10b981" },
        { category: "Communication", percent: 12, color: "#f59e0b" }
    ],
    topPerformingCourses: [
        { title: "ChatGPT & Prompt Engineering Mastery", enrolled: "12,400", revenue: "$619,876", completion: "78%" },
        { title: "Generative AI & LLM Architecture", enrolled: "8,900", revenue: "$622,911", completion: "64%" },
        { title: "Full-Stack Web Development Bootcamp", enrolled: "28,900", revenue: "$2,745,211", completion: "82%" },
        { title: "Python for Data Science & ML", enrolled: "21,500", revenue: "$1,827,285", completion: "71%" }
    ]
};

export const adminTicketsData = [
    { id: "TCK-801", student: "Aarav Sharma", subject: "Video playback freezing on lesson 4", category: "Technical", priority: "High", status: "Open", date: "2026-02-11" },
    { id: "TCK-802", student: "Priya Patel", subject: "Certificate download link issue", category: "Certificate", priority: "Medium", status: "In Progress", date: "2026-02-10" },
    { id: "TCK-803", student: "Sneha Gupta", subject: "Requesting invoice for corporate tax", category: "Billing", priority: "Low", status: "Resolved", date: "2026-02-09" },
    { id: "TCK-804", student: "Neha Deshmukh", subject: "LangChain API key lab notebook error", category: "Course Doubt", priority: "High", status: "Open", date: "2026-02-11" },
    { id: "TCK-805", student: "Vikram Malhotra", subject: "Unable to join Discord community server", category: "Community", priority: "Low", status: "Resolved", date: "2026-02-08" }
];
