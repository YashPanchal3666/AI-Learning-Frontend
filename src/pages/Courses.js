import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/courses.css";
import { 
    FaSearch, 
    FaStar, 
    FaClock, 
    FaUsers, 
    FaBookOpen, 
    FaLaptopCode, 
    FaRobot, 
    FaLanguage, 
    FaComments,
    FaArrowRight,
    FaFilter,
    FaCertificate,
    FaPlay
} from "react-icons/fa";

const categories = [
    { id: "ai-tools", name: "AI Tools", icon: <FaRobot /> },
    { id: "technology", name: "Technology", icon: <FaLaptopCode /> },
    { id: "languages", name: "Languages", icon: <FaLanguage /> },
    { id: "communication", name: "Communication Skills", icon: <FaComments /> }
];

export const getCategoryKey = (categoryName) => {
    if (!categoryName) return "ai-tools";
    const lower = categoryName.toLowerCase();
    if (lower.includes("ai") || lower.includes("gpt") || lower.includes("tool") || lower.includes("learning")) return "ai-tools";
    if (lower.includes("tech") || lower.includes("web") || lower.includes("data") || lower.includes("dev") || lower.includes("code") || lower.includes("cyber")) return "technology";
    if (lower.includes("lang") || lower.includes("english") || lower.includes("german") || lower.includes("french") || lower.includes("spanish") || lower.includes("japanese") || lower.includes("arabic")) return "languages";
    if (lower.includes("comm") || lower.includes("speak") || lower.includes("lead") || lower.includes("negotiat") || lower.includes("write")) return "communication";
    return "ai-tools";
};

const coursesData = {
    "ai-tools": [
        {
            id: "ai-1",
            title: "ChatGPT & Prompt Engineering Mastery",
            instructor: "Dr. Andrew Ng",
            rating: 4.9,
            reviews: 12400,
            duration: "12 Hours",
            students: "45,200",
            level: "All Levels",
            price: "$49.99",
            image: "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=600&q=80",
            tag: "Bestseller"
        },
        {
            id: "ai-2",
            title: "Generative AI Application Development",
            instructor: "Sarah Jenkins",
            rating: 4.8,
            reviews: 8900,
            duration: "18 Hours",
            students: "32,100",
            level: "Intermediate",
            price: "$69.99",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80",
            tag: "Popular"
        },
        {
            id: "ai-3",
            title: "Midjourney & Stable Diffusion Art Design",
            instructor: "Alex Rivera",
            rating: 4.7,
            reviews: 6500,
            duration: "10 Hours",
            students: "24,800",
            level: "Beginner",
            price: "$39.99",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
            tag: "Creative"
        },
        {
            id: "ai-4",
            title: "Building LLMs with LangChain & LlamaIndex",
            instructor: "Michael Chang",
            rating: 4.9,
            reviews: 5400,
            duration: "22 Hours",
            students: "19,500",
            level: "Advanced",
            price: "$89.99",
            image: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?auto=format&fit=crop&w=600&q=80",
            tag: "Trending"
        },
        {
            id: "ai-5",
            title: "AI Business Automation with Zapier & Make",
            instructor: "Elena Rostova",
            rating: 4.6,
            reviews: 4200,
            duration: "14 Hours",
            students: "16,300",
            level: "Beginner",
            price: "$44.99",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
            tag: "Practical"
        },
        {
            id: "ai-6",
            title: "Copilot & AI Code Assistants for Developers",
            instructor: "David Miller",
            rating: 4.8,
            reviews: 7100,
            duration: "8 Hours",
            students: "28,400",
            level: "Intermediate",
            price: "$34.99",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
            tag: "Productivity"
        },
        {
            id: "ai-7",
            title: "AI Video & Audio Production Masterclass",
            instructor: "Jessica Taylor",
            rating: 4.7,
            reviews: 3800,
            duration: "16 Hours",
            students: "14,200",
            level: "All Levels",
            price: "$59.99",
            image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80",
            tag: "New"
        },
        {
            id: "ai-8",
            title: "Ethics, Safety, and Governance in AI",
            instructor: "Prof. Robert Vance",
            rating: 4.9,
            reviews: 2900,
            duration: "11 Hours",
            students: "11,800",
            level: "Intermediate",
            price: "$49.99",
            image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=600&q=80",
            tag: "Essential"
        }
    ],
    "technology": [
        {
            id: "tech-1",
            title: "Full-Stack Web Development Bootcamp",
            instructor: "Colt Steele",
            rating: 4.9,
            reviews: 28900,
            duration: "65 Hours",
            students: "112,000",
            level: "Beginner to Pro",
            price: "$94.99",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
            tag: "Bestseller"
        },
        {
            id: "tech-2",
            title: "Python for Data Science & Machine Learning",
            instructor: "Jose Portilla",
            rating: 4.8,
            reviews: 21500,
            duration: "42 Hours",
            students: "89,300",
            level: "Intermediate",
            price: "$84.99",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
            tag: "Top Rated"
        },
        {
            id: "tech-3",
            title: "Modern React Architecture & Next.js 14",
            instructor: "Maximilian Schwarzmüller",
            rating: 4.9,
            reviews: 18300,
            duration: "38 Hours",
            students: "67,500",
            level: "Advanced",
            price: "$79.99",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80",
            tag: "Hot"
        },
        {
            id: "tech-4",
            title: "AWS Certified Cloud Practitioner & Developer",
            instructor: "Stephane Maarek",
            rating: 4.9,
            reviews: 31000,
            duration: "28 Hours",
            students: "140,000",
            level: "All Levels",
            price: "$89.99",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
            tag: "Certification"
        },
        {
            id: "tech-5",
            title: "Cybersecurity Essentials & Ethical Hacking",
            instructor: "Nathan House",
            rating: 4.7,
            reviews: 14200,
            duration: "30 Hours",
            students: "52,100",
            level: "Beginner",
            price: "$69.99",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
            tag: "Security"
        },
        {
            id: "tech-6",
            title: "Android Native App Development with Kotlin",
            instructor: "Denis Panjuta",
            rating: 4.8,
            reviews: 9800,
            duration: "35 Hours",
            students: "38,900",
            level: "Intermediate",
            price: "$74.99",
            image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=600&q=80",
            tag: "Mobile"
        },
        {
            id: "tech-7",
            title: "Docker, Kubernetes & DevOps Infrastructure",
            instructor: "Mumshad Mannambeth",
            rating: 4.9,
            reviews: 16400,
            duration: "25 Hours",
            students: "59,000",
            level: "Advanced",
            price: "$84.99",
            image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=600&q=80",
            tag: "DevOps"
        },
        {
            id: "tech-8",
            title: "Data Structures & Algorithms in Java",
            instructor: "Tim Buchalka",
            rating: 4.8,
            reviews: 22100,
            duration: "48 Hours",
            students: "81,200",
            level: "Intermediate",
            price: "$69.99",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
            tag: "Fundamentals"
        }
    ],
    "languages": [
        {
            id: "lang-1",
            title: "Complete Business English Communication",
            instructor: "Emma Watson",
            rating: 4.9,
            reviews: 15200,
            duration: "20 Hours",
            students: "58,400",
            level: "Intermediate",
            price: "$49.99",
            image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
            tag: "Bestseller"
        },
        {
            id: "lang-2",
            title: "Spanish Immersion for Absolute Beginners",
            instructor: "Carlos Ramirez",
            rating: 4.8,
            reviews: 11400,
            duration: "32 Hours",
            students: "42,100",
            level: "Beginner",
            price: "$39.99",
            image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=600&q=80",
            tag: "Popular"
        },
        {
            id: "lang-3",
            title: "Conversational Mandarin Chinese Masterclass",
            instructor: "Mei Ling",
            rating: 4.7,
            reviews: 7800,
            duration: "28 Hours",
            students: "26,900",
            level: "Beginner",
            price: "$59.99",
            image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80",
            tag: "High Demand"
        },
        {
            id: "lang-4",
            title: "German Language Certificate A1 - B2",
            instructor: "Klaus Fischer",
            rating: 4.9,
            reviews: 9300,
            duration: "45 Hours",
            students: "34,500",
            level: "All Levels",
            price: "$69.99",
            image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=600&q=80",
            tag: "Certified"
        },
        {
            id: "lang-5",
            title: "French Fluency through Real Conversation",
            instructor: "Camille Dubois",
            rating: 4.8,
            reviews: 8100,
            duration: "24 Hours",
            students: "29,800",
            level: "Intermediate",
            price: "$44.99",
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
            tag: "Interactive"
        },
        {
            id: "lang-6",
            title: "Japanese N5 to N3 Exam Preparation",
            instructor: "Kenji Sato",
            rating: 4.9,
            reviews: 12100,
            duration: "50 Hours",
            students: "41,000",
            level: "Intermediate",
            price: "$79.99",
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
            tag: "JLPT Focus"
        },
        {
            id: "lang-7",
            title: "IELTS & TOEFL Speaking Band 8+ Masterclass",
            instructor: "David Wills",
            rating: 4.9,
            reviews: 18900,
            duration: "18 Hours",
            students: "72,300",
            level: "Advanced",
            price: "$54.99",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
            tag: "Exam Prep"
        },
        {
            id: "lang-8",
            title: "Arabic Language & Dialect Fundamentals",
            instructor: "Tariq Al-Mansoor",
            rating: 4.7,
            reviews: 4500,
            duration: "26 Hours",
            students: "15,200",
            level: "Beginner",
            price: "$49.99",
            image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80",
            tag: "Cultural"
        }
    ],
    "communication": [
        {
            id: "comm-1",
            title: "Public Speaking & Keynote Presentation Secrets",
            instructor: "Chris Anderson",
            rating: 4.9,
            reviews: 19400,
            duration: "15 Hours",
            students: "68,900",
            level: "All Levels",
            price: "$59.99",
            image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80",
            tag: "Top Rated"
        },
        {
            id: "comm-2",
            title: "Executive Leadership & Team Management",
            instructor: "Simon Sinek",
            rating: 4.9,
            reviews: 24100,
            duration: "18 Hours",
            students: "95,000",
            level: "Advanced",
            price: "$89.99",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
            tag: "Leadership"
        },
        {
            id: "comm-3",
            title: "Negotiation Skills & Conflict Resolution",
            instructor: "Chris Voss",
            rating: 4.9,
            reviews: 21000,
            duration: "14 Hours",
            students: "82,400",
            level: "Intermediate",
            price: "$74.99",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
            tag: "Bestseller"
        },
        {
            id: "comm-4",
            title: "Emotional Intelligence (EQ) in the Workplace",
            instructor: "Dr. Daniel Goleman",
            rating: 4.8,
            reviews: 13200,
            duration: "10 Hours",
            students: "48,100",
            level: "All Levels",
            price: "$44.99",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
            tag: "Essential"
        },
        {
            id: "comm-5",
            title: "Persuasive Business Writing & Email Etiquette",
            instructor: "Rachel Green",
            rating: 4.7,
            reviews: 8600,
            duration: "8 Hours",
            students: "31,200",
            level: "Beginner",
            price: "$34.99",
            image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80",
            tag: "Practical"
        },
        {
            id: "comm-6",
            title: "Mastering Cross-Cultural Team Collaboration",
            instructor: "Prof. Erin Meyer",
            rating: 4.8,
            reviews: 6400,
            duration: "12 Hours",
            students: "22,500",
            level: "Intermediate",
            price: "$49.99",
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
            tag: "Global"
        },
        {
            id: "comm-7",
            title: "Body Language & Non-Verbal Mastery",
            instructor: "Vanessa Van Edwards",
            rating: 4.8,
            reviews: 15300,
            duration: "11 Hours",
            students: "54,000",
            level: "All Levels",
            price: "$39.99",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
            tag: "Popular"
        },
        {
            id: "comm-8",
            title: "Storytelling for Tech Leaders & Product Managers",
            instructor: "Matthew Dicks",
            rating: 4.9,
            reviews: 9100,
            duration: "13 Hours",
            students: "36,800",
            level: "Intermediate",
            price: "$59.99",
            image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80",
            tag: "Career Boost"
        }
    ]
};

function Courses() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("ai-tools");
    const [searchTerm, setSearchTerm] = useState("");
    const [pricingFilter, setPricingFilter] = useState("all"); // 'all' | 'free' | 'paid'

    const [allCoursesData, setAllCoursesData] = useState(() => {
        // Load default structure with admin overrides
        const buildCoursesWithAdminOverrides = () => {
            const result = {
                "ai-tools": [...coursesData["ai-tools"]],
                "technology": [...coursesData["technology"]],
                "languages": [...coursesData["languages"]],
                "communication": [...coursesData["communication"]]
            };

            try {
                const saved = localStorage.getItem('admin_courses');
                if (saved) {
                    const adminList = JSON.parse(saved);
                    
                    // 1. Update any existing courses that have been edited by Admin
                    Object.keys(result).forEach(cat => {
                        result[cat] = result[cat].map(orig => {
                            const adminCourse = adminList.find(c => c.id === orig.id);
                            if (adminCourse) {
                                return {
                                    ...orig,
                                    ...adminCourse,
                                    price: adminCourse.price || orig.price,
                                    isPaid: adminCourse.isPaid !== undefined ? adminCourse.isPaid : orig.isPaid,
                                    tag: adminCourse.tag || orig.tag
                                };
                            }
                            return orig;
                        });
                    });

                    // 2. Add brand-new courses created by Admin
                    const existingIds = new Set([
                        ...coursesData["ai-tools"].map(c => c.id),
                        ...coursesData["technology"].map(c => c.id),
                        ...coursesData["languages"].map(c => c.id),
                        ...coursesData["communication"].map(c => c.id)
                    ]);

                    const newAdminCourses = adminList.filter(c => !existingIds.has(c.id));
                    newAdminCourses.forEach(c => {
                        const catKey = getCategoryKey(c.category);
                        if (result[catKey]) {
                            result[catKey].unshift({
                                id: c.id,
                                title: c.title,
                                instructor: c.instructor,
                                rating: c.rating || 4.8,
                                reviews: c.reviews ? parseInt(String(c.reviews).replace(/,/g, '')) || 1200 : 1200,
                                duration: c.duration || "10 Hours",
                                students: c.students || "100",
                                level: c.level || "All Levels",
                                price: c.price || "₹499",
                                isPaid: c.isPaid !== undefined ? c.isPaid : true,
                                includesCertificate: c.includesCertificate !== undefined ? c.includesCertificate : true,
                                includesSourceCode: c.includesSourceCode !== undefined ? c.includesSourceCode : true,
                                image: c.image || "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=600&q=80",
                                tag: c.tag || (c.isPaid === false ? "Free" : "Premium")
                            });
                        }
                    });
                }
            } catch (e) {
                console.error("Error loading admin courses into Courses page:", e);
            }
            return result;
        };

        return buildCoursesWithAdminOverrides();
    });

    // Listen to changes in localStorage or tab focus
    useEffect(() => {
        const handleSync = () => {
            try {
                const saved = localStorage.getItem('admin_courses');
                if (saved) {
                    const adminList = JSON.parse(saved);
                    const result = {
                        "ai-tools": [...coursesData["ai-tools"]],
                        "technology": [...coursesData["technology"]],
                        "languages": [...coursesData["languages"]],
                        "communication": [...coursesData["communication"]]
                    };

                    // 1. Apply edits to existing courses
                    Object.keys(result).forEach(cat => {
                        result[cat] = result[cat].map(orig => {
                            const adminCourse = adminList.find(c => c.id === orig.id);
                            if (adminCourse) {
                                return {
                                    ...orig,
                                    ...adminCourse,
                                    price: adminCourse.price || orig.price,
                                    isPaid: adminCourse.isPaid !== undefined ? adminCourse.isPaid : orig.isPaid,
                                    tag: adminCourse.tag || orig.tag
                                };
                            }
                            return orig;
                        });
                    });

                    // 2. Add brand-new courses created by Admin
                    const existingIds = new Set([
                        ...coursesData["ai-tools"].map(c => c.id),
                        ...coursesData["technology"].map(c => c.id),
                        ...coursesData["languages"].map(c => c.id),
                        ...coursesData["communication"].map(c => c.id)
                    ]);

                    const newAdminCourses = adminList.filter(c => !existingIds.has(c.id));
                    newAdminCourses.forEach(c => {
                        const catKey = getCategoryKey(c.category);
                        if (result[catKey]) {
                            result[catKey].unshift({
                                id: c.id,
                                title: c.title,
                                instructor: c.instructor,
                                rating: c.rating || 4.8,
                                reviews: c.reviews ? parseInt(String(c.reviews).replace(/,/g, '')) || 1200 : 1200,
                                duration: c.duration || "10 Hours",
                                students: c.students || "100",
                                level: c.level || "All Levels",
                                price: c.price || "₹499",
                                isPaid: c.isPaid !== undefined ? c.isPaid : true,
                                includesCertificate: c.includesCertificate !== undefined ? c.includesCertificate : true,
                                includesSourceCode: c.includesSourceCode !== undefined ? c.includesSourceCode : true,
                                image: c.image || "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=600&q=80",
                                tag: c.tag || (c.isPaid === false ? "Free" : "Premium")
                            });
                        }
                    });
                    setAllCoursesData(result);
                }
            } catch (err) {}
        };

        window.addEventListener('storage', handleSync);
        window.addEventListener('focus', handleSync);
        return () => {
            window.removeEventListener('storage', handleSync);
            window.removeEventListener('focus', handleSync);
        };
    }, []);

    const currentCourses = (allCoursesData[activeTab] || []).filter((course) => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        
        const isPaid = course.isPaid !== undefined 
            ? course.isPaid 
            : (course.price && !String(course.price).toLowerCase().includes('free'));

        if (pricingFilter === 'free') return matchesSearch && !isPaid;
        if (pricingFilter === 'paid') return matchesSearch && isPaid;
        return matchesSearch;
    });

    const totalInCategory = (allCoursesData[activeTab] || []).length;

    return (
        <div className="courses-page">
            {/* Hero Header */}
            <section className="courses-header">
                <div className="courses-header-inner">
                    <div className="badge">
                        <FaBookOpen className="badge-icon" />
                        <span>Professional Learning Paths</span>
                    </div>
                    <h1>
                        Master Industry Skills with
                        <span className="gradient-text"> World-Class Courses</span>
                    </h1>
                    <p>
                        Curated programs with real-world projects, certified instructors, and lifetime access — built for career growth.
                    </p>

                    {/* Search + Filter Bar */}
                    <div className="search-filter-wrapper">
                        <div className="filter-dropdown-box">
                            <FaFilter className="filter-dropdown-icon" />
                            <select 
                                className="pricing-select-dropdown"
                                value={pricingFilter} 
                                onChange={(e) => setPricingFilter(e.target.value)}
                                aria-label="Filter courses by pricing model"
                            >
                                <option value="all">All Courses</option>
                                <option value="free">Free Courses</option>
                                <option value="paid">Paid &amp; Certified</option>
                            </select>
                        </div>

                        <div className="search-input-box">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search courses, instructors, topics..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Tabs */}
            <section className="tabs-container">
                <div className="tabs-wrapper">
                    {categories.map((tab) => (
                        <button
                            key={tab.id}
                            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setSearchTerm("");
                            }}
                        >
                            <span className="tab-icon">{tab.icon}</span>
                            <span className="tab-label">{tab.name}</span>
                            <span className="count-pill">{(allCoursesData[tab.id] || []).length}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* Results meta */}
            <div className="courses-results-meta">
                <span className="results-count">
                    Showing <strong>{currentCourses.length}</strong> of {totalInCategory} courses
                </span>
            </div>

            {/* Course Grid */}
            <section className="courses-grid-container">
                {currentCourses.length > 0 ? (
                    <div className="courses-grid">
                        {currentCourses.map((course) => {
                            const isPaidCourse = course.isPaid !== undefined 
                                ? course.isPaid 
                                : (course.price && !String(course.price).toLowerCase().includes('free'));

                            const displayPrice = (() => {
                                if (!isPaidCourse) return 'Free';
                                if (course.price && String(course.price).includes('$')) {
                                    const num = parseFloat(String(course.price).replace(/[^0-9.]/g, ''));
                                    return `₹${!isNaN(num) ? Math.round(num * 80) : 499}`;
                                }
                                return course.price || '₹499';
                            })();

                            return (
                                <article 
                                    className="course-card" 
                                    key={course.id} 
                                    onClick={() => navigate(`/course/${course.id}`)}
                                >
                                    <div className="card-image-wrapper">
                                        <img 
                                            src={course.image} 
                                            alt={course.title} 
                                            loading="lazy" 
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80";
                                            }}
                                        />
                                        <span className={`tag-badge ${isPaidCourse ? 'tag-premium' : 'tag-free'}`}>
                                            {isPaidCourse ? (course.tag || 'Premium') : 'Free'}
                                        </span>
                                        <div className="image-overlay">
                                            <button 
                                                className="preview-btn" 
                                                onClick={(e) => { e.stopPropagation(); navigate(`/course/${course.id}`); }}
                                            >
                                                <FaPlay className="preview-play" />
                                                <span>{isPaidCourse ? 'View Course' : 'Start Learning'}</span>
                                                <FaArrowRight />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="card-content">
                                        <div className="card-meta">
                                            <span className="level">{course.level}</span>
                                            <div className="rating">
                                                <FaStar className="star-icon" />
                                                <span className="rating-value">{course.rating}</span>
                                                <span className="reviews">({Number(course.reviews).toLocaleString()})</span>
                                            </div>
                                        </div>

                                        <h3 className="course-title">{course.title}</h3>
                                        <p className="instructor">By {course.instructor}</p>

                                        <div className="card-details">
                                            <span>
                                                <FaClock className="detail-icon" /> {course.duration}
                                            </span>
                                            <span>
                                                <FaUsers className="detail-icon" /> {course.students}
                                            </span>
                                        </div>

                                        <div className="card-perks">
                                            <span className="perk-item">
                                                {isPaidCourse ? <><FaCertificate /> Certificate</> : '🎖️ Badge'}
                                            </span>
                                            <span className="perk-sep">·</span>
                                            <span className="perk-item">
                                                {isPaidCourse ? '💻 Code & Notes' : '📺 Videos Only'}
                                            </span>
                                        </div>

                                        <div className="card-footer">
                                            <div className={`price ${isPaidCourse ? 'price-paid' : 'price-free'}`}>
                                                {displayPrice}
                                            </div>
                                            <button 
                                                className={`enroll-btn ${isPaidCourse ? 'enroll-paid' : 'enroll-free'}`}
                                                onClick={(e) => { e.stopPropagation(); navigate(`/course/${course.id}`); }}
                                            >
                                                {isPaidCourse ? 'Enroll Now' : 'Enroll Free'}
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="no-results">
                        <div className="no-results-icon">🔍</div>
                        <h3>No courses found</h3>
                        <p>
                            {searchTerm 
                                ? `Nothing matches "${searchTerm}". Try another keyword or filter.`
                                : 'Try a different category or pricing filter.'}
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}

export default Courses;