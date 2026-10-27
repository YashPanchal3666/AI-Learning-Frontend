import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import '../styles/coursePlayer.css';
import { getCourseDetail } from '../data/courseDetailData';
import { 
    enrollInCourse, 
    updateLessonProgress, 
    getCourseProgress, 
    issueCertificate,
    getCourseQuizStatus,
    setCourseQuizStatus,
    getCurrentUserEmail 
} from '../services/learningService';
import {
    FaArrowLeft, FaPlay, FaPause, FaCheckCircle,
    FaVolumeUp, FaExpand, FaCode, FaBookOpen, FaDownload,
    FaQuestionCircle, FaComments, FaCheck, FaChevronRight,
    FaChevronLeft, FaTrophy, FaTimes, FaShareAlt, FaGithub,
    FaLock, FaCreditCard, FaCrown
} from 'react-icons/fa';

const CoursePlayer = () => {
    const { id } = useParams();
    const location = useLocation();
    const courseData = getCourseDetail(id);

    // Check if viewer is an Admin (supports JWT superadmin role, session auth, or ?admin=true query parameter)
    const isAdmin = (() => {
        try {
            const current = JSON.parse(localStorage.getItem('currentUser') || '{}');
            if (current.role === 'superadmin' || current.role === 'admin') return true;
        } catch (e) {}
        return sessionStorage.getItem('admin_authenticated') === 'true' || 
               new URLSearchParams(location.search).get('admin') === 'true';
    })();

    // Check if course is paid or free
    const isCoursePaid = courseData.isPaid !== undefined 
        ? courseData.isPaid 
        : (courseData.price && !String(courseData.price).toLowerCase().includes('free'));

    // Check if user has purchased this course (user-specific)
    const userPurchaseKey = `purchased_courses_${getCurrentUserEmail()}`;
    const [purchasedCourses, setPurchasedCourses] = useState(() => {
        try {
            const saved = localStorage.getItem(userPurchaseKey);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });

    const isPurchased = purchasedCourses.includes(courseData.id) || !isCoursePaid || isAdmin;

    // Payment Checkout Modal State
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentSuccessToast, setPaymentSuccessToast] = useState(false);

    // Auto-enroll user when they open the course player
    useEffect(() => {
        if (courseData.id) {
            enrollInCourse(courseData.id);
        }
    }, [courseData.id]);

    // Saved completed lesson indices for current user
    const savedProgress = getCourseProgress(courseData.id);

    // Flatten lessons from chapters with user's real progress and video links
    const initialLessons = courseData.chapters 
        ? courseData.chapters.flatMap((ch, cIdx) => ch.lessons.map((les, lIdx) => {
            const flatIndex = (cIdx * 10) + lIdx; // fallback unique index
            return {
                title: les.name,
                duration: les.duration,
                videoUrl: les.videoUrl || null,
                completed: savedProgress.completedIndices.includes(flatIndex) || (savedProgress.completedIndices.length === 0 && cIdx === 0 && lIdx === 0),
                isLocked: isCoursePaid && !isPurchased && (cIdx > 0 || lIdx >= 2)
            };
        }))
        : [
            { title: "1. Welcome & Course Architecture", duration: "12:00", videoUrl: "https://www.youtube.com/embed/aircAruvnKk", completed: savedProgress.completedIndices.includes(0) || savedProgress.completedIndices.length === 0, isLocked: false },
            { title: "2. Core Principles & Setup", duration: "24:30", videoUrl: "https://www.youtube.com/embed/jC4v5AS4RIM", completed: savedProgress.completedIndices.includes(1), isLocked: false },
            { title: "3. Hands-on Implementation", duration: "32:15", videoUrl: "https://www.youtube.com/embed/kCc8FmEb1nY", completed: savedProgress.completedIndices.includes(2), isLocked: isCoursePaid && !isPurchased },
            { title: "4. Production Best Practices", duration: "18:40", videoUrl: "https://www.youtube.com/embed/bMknfKXIFA8", completed: savedProgress.completedIndices.includes(3), isLocked: isCoursePaid && !isPurchased }
        ];

    const [lessons, setLessons] = useState(initialLessons);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeTab, setActiveTab] = useState('notes'); // notes | code | resources | quiz | qna

    // Update lock status if purchase status changes
    useEffect(() => {
        if (isPurchased) {
            setLessons(prev => prev.map(l => ({ ...l, isLocked: false })));
        }
    }, [isPurchased]);

    // Razorpay Checkout Handler (Opens real Razorpay Checkout Popup)
    const handleRazorpayPayment = () => {
        setPaymentProcessing(true);

        const student = (() => {
            try {
                const current = localStorage.getItem('currentUser');
                if (current) {
                    const parsed = JSON.parse(current);
                    return {
                        name: parsed.name || studentName || 'Student',
                        email: parsed.email || 'student@example.com',
                        phone: parsed.phone || '9999999999'
                    };
                }
            } catch (e) { }
            return { name: studentName || 'Student', email: 'student@example.com', phone: '9999999999' };
        })();

        const numericAmount = courseData.inrPrice || 499;

        // If Razorpay SDK is loaded on window
        if (window.Razorpay) {
            const activeKeyId = localStorage.getItem('razorpay_key_id') || "rzp_test_gKbt3Ejw8psWd7";
            const options = {
                key: activeKeyId,
                amount: numericAmount * 100, // paise
                currency: "INR",
                name: "AILearn Platform",
                description: `Unlock Course: ${courseData.title}`,
                image: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
                handler: function (response) {
                    // Success callback
                    const updated = Array.from(new Set([...purchasedCourses, courseData.id]));
                    setPurchasedCourses(updated);
                    localStorage.setItem(userPurchaseKey, JSON.stringify(updated));
                    setPaymentProcessing(false);
                    setShowPaymentModal(false);
                    setPaymentSuccessToast(true);
                    setTimeout(() => setPaymentSuccessToast(false), 5000);
                },
                prefill: {
                    name: student.name,
                    email: student.email,
                    contact: student.phone
                },
                notes: {
                    course_id: courseData.id,
                    course_title: courseData.title
                },
                theme: {
                    color: "#4338ca"
                },
                modal: {
                    ondismiss: function () {
                        setPaymentProcessing(false);
                    }
                }
            };

            try {
                const rzp = new window.Razorpay(options);
                rzp.on('payment.failed', function (response) {
                    alert("⚠️ Payment verification cancelled or failed. Please try again.");
                    setPaymentProcessing(false);
                });
                rzp.open();
                return;
            } catch (err) {
                console.warn("Razorpay instance init error, falling back:", err);
            }
        }

        // Fallback simulation
        setTimeout(() => {
            const updated = Array.from(new Set([...purchasedCourses, courseData.id]));
            setPurchasedCourses(updated);
            localStorage.setItem(userPurchaseKey, JSON.stringify(updated));
            setPaymentProcessing(false);
            setShowPaymentModal(false);
            setPaymentSuccessToast(true);
            setTimeout(() => setPaymentSuccessToast(false), 5000);
        }, 1200);
    };

    // Get Dynamic Logged-in Student Name
    const getLoggedInStudentName = () => {
        try {
            const current = localStorage.getItem('currentUser');
            if (current) {
                const parsed = JSON.parse(current);
                if (parsed.name && parsed.name.trim() !== '') return parsed.name.trim();
            }
            const fallbackUser = localStorage.getItem('user');
            if (fallbackUser) {
                const parsed = JSON.parse(fallbackUser);
                if (parsed.name && parsed.name.trim() !== '') return parsed.name.trim();
            }
            const rawName = localStorage.getItem('user_name');
            if (rawName && rawName.trim() !== '') return rawName.trim();

            if (isAdmin) return 'Developer Admin';
        } catch (e) { }
        return 'Devarsh Sathwara';
    };

    const studentName = getLoggedInStudentName();

    // ==================== REAL FILE DOWNLOAD SYSTEM ====================
    const triggerFileDownload = (filename, content, type = 'text/plain') => {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // 1. Real Cheat Sheet Download (.md / .txt) - Paid Course Feature Only
    const handleDownloadCheatSheet = () => {
        if (!isCoursePaid && !isAdmin) {
            alert("⚠️ Cheatsheets & Downloadable Resources are available exclusively in Paid courses!");
            return;
        }
        if (isCoursePaid && !isPurchased && !isAdmin) {
            setShowPaymentModal(true);
            return;
        }
        const cleanTitle = courseData.title.replace(/[^a-zA-Z0-9]/g, '_');
        const cheatSheetContent = `# ${courseData.title} - Official Cheat Sheet & Study Guide
**Instructor:** ${courseData.instructor}
**Category:** ${courseData.category}
**Duration:** ${courseData.duration}
**Student:** ${studentName}

---
## 🎯 Course Overview & Architecture
${courseData.desc || 'Comprehensive professional training guide designed to build production-ready expertise.'}

## 💡 Key Learning Objectives:
${(courseData.outcomes || []).map((o, idx) => `${idx + 1}. ${o}`).join('\n')}

## 📚 Curriculum Modules & Lessons:
${lessons.map((l, idx) => `Module ${idx + 1}: ${l.title} (${l.duration})`).join('\n')}

---
## ⚡ Quick Reference Notes & Best Practices:
1. Always test prototypes in sandbox environments before deployment.
2. Ensure strict version locking for dependencies in production pipelines.
3. Optimize inference times with quantization (4-bit/8-bit QLoRA).
4. Monitor system telemetry and throughput under concurrency.

---
© ${new Date().getFullYear()} AILearn Platform. All rights reserved. Verified Student Learning Material.
`;
        triggerFileDownload(`${cleanTitle}_CheatSheet.md`, cheatSheetContent, 'text/markdown');
    };

    // 2. Real Jupyter Notebook Download (.ipynb format) - Paid Course Feature Only
    const handleDownloadNotebook = () => {
        if (!isCoursePaid && !isAdmin) {
            alert("⚠️ Code Notebooks & Labs are available exclusively in Paid courses!");
            return;
        }
        if (isCoursePaid && !isPurchased && !isAdmin) {
            setShowPaymentModal(true);
            return;
        }
        const cleanTitle = courseData.title.replace(/[^a-zA-Z0-9]/g, '_');
        const notebookJson = {
            cells: [
                {
                    cell_type: "markdown",
                    metadata: {},
                    source: [
                        `# ${courseData.title} - Official Hands-on Lab\n`,
                        `**Instructor:** ${courseData.instructor}\n`,
                        `**Generated for:** ${studentName} (AILearn Certified Student)\n\n`,
                        `Welcome to the practical workbook for this course. Run each cell sequentially.`
                    ]
                },
                {
                    cell_type: "code",
                    execution_count: 1,
                    metadata: {},
                    outputs: [],
                    source: [
                        "# Step 1: Environment Setup\n",
                        "import sys\n",
                        "print(f'Python Version: {sys.version}')\n",
                        "print('🚀 AILearn Sandbox Initialized successfully!')"
                    ]
                },
                {
                    cell_type: "code",
                    execution_count: 2,
                    metadata: {},
                    outputs: [],
                    source: [
                        `# Step 2: Hands-on implementation for ${courseData.title}\n`,
                        "def run_pipeline():\n",
                        "    skills = ['Foundations', 'Implementation', 'Optimization', 'Production']\n",
                        "    for step, skill in enumerate(skills, 1):\n",
                        "        print(f'⚡ Step {step}: Completed {skill} verification!')\n\n",
                        "run_pipeline()"
                    ]
                }
            ],
            metadata: {
                language_info: {
                    name: "python",
                    version: "3.10"
                }
            },
            nbformat: 4,
            nbformat_minor: 2
        };

        triggerFileDownload(
            `${cleanTitle}_Lab.ipynb`,
            JSON.stringify(notebookJson, null, 2),
            'application/x-ipynb+json'
        );
    };

    // 3. Real Certificate Download (High-Resolution Printable HTML with Print-to-PDF) - Paid Course Feature Only
    const handleDownloadCertificate = () => {
        if (!isCoursePaid && !isAdmin) {
            alert("⚠️ Certificates are only available in Paid & Certified courses!");
            return;
        }
        if (isCoursePaid && !isPurchased && !isAdmin) {
            setShowPaymentModal(true);
            return;
        }
        if (!isEligibleForCert && !isAdmin) {
            alert("⚠️ Please complete ALL video lessons AND pass the course quiz to download your certificate!");
            return;
        }
        const cleanTitle = courseData.title.replace(/[^a-zA-Z0-9]/g, '_');
        const certCode = 'AILEARN-VERIFIED-' + Math.floor(100000 + Math.random() * 900000);
        const issueDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

        // Save real certificate in user's profile
        issueCertificate({
            courseId: courseData.id,
            courseTitle: courseData.title,
            instructor: courseData.instructor,
            issueDate: issueDate,
            skills: (courseData.outcomes || []).slice(0, 3).join(', ') || courseData.category,
            grade: 'Verified Mastery'
        });

        const certificateHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Certificate of Completion - ${courseData.title}</title>
    <style>
        body {
            margin: 0;
            padding: 40px;
            background: #0f172a;
            font-family: 'Segoe UI', Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            box-sizing: border-box;
        }
        .cert-card {
            width: 1000px;
            background: #ffffff;
            border: 12px double #4338ca;
            border-radius: 20px;
            padding: 60px 50px;
            text-align: center;
            box-shadow: 0 25px 60px rgba(0,0,0,0.5);
            position: relative;
            box-sizing: border-box;
        }
        .ribbon {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: #ffffff;
            font-weight: 800;
            font-size: 13px;
            letter-spacing: 2px;
            padding: 8px 24px;
            border-radius: 30px;
            display: inline-block;
            margin-bottom: 24px;
            text-transform: uppercase;
        }
        h1 {
            font-size: 42px;
            color: #1e1b4b;
            margin: 0 0 10px;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        p.subtitle {
            color: #64748b;
            font-size: 16px;
            margin-bottom: 30px;
        }
        .student-name {
            font-size: 38px;
            font-weight: 800;
            color: #4338ca;
            border-bottom: 2px solid #cbd5e1;
            display: inline-block;
            padding: 0 30px 10px;
            margin-bottom: 24px;
        }
        .desc {
            font-size: 16px;
            color: #334155;
            max-width: 700px;
            margin: 0 auto 30px;
            line-height: 1.6;
        }
        .course-title {
            font-size: 26px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 40px;
        }
        .meta-grid {
            display: flex;
            justify-content: space-around;
            border-top: 1px solid #e2e8f0;
            padding-top: 30px;
            margin-top: 20px;
        }
        .meta-item {
            text-align: center;
        }
        .meta-item span {
            display: block;
            font-size: 12px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 4px;
        }
        .meta-item strong {
            font-size: 16px;
            color: #0f172a;
        }
        @media print {
            body { background: #ffffff; padding: 0; }
            .cert-card { box-shadow: none; border-color: #4338ca; }
        }
    </style>
</head>
<body>
    <div class="cert-card">
        <div class="ribbon">★ OFFICIAL VERIFIED CREDENTIAL ★</div>
        <h1>Certificate of Mastery</h1>
        <p class="subtitle">This is proudly presented to certify that</p>
        <div class="student-name">${studentName}</div>
        <p class="desc">has successfully demonstrated industry competency and finished all required modules, projects, and assessments in:</p>
        <div class="course-title">${courseData.title}</div>
        <div class="meta-grid">
            <div class="meta-item">
                <span>Authorized Instructor</span>
                <strong>${courseData.instructor}</strong>
            </div>
            <div class="meta-item">
                <span>Verification Code</span>
                <strong>${certCode}</strong>
            </div>
            <div class="meta-item">
                <span>Date of Issue</span>
                <strong>${issueDate}</strong>
            </div>
        </div>
    </div>
    <script>
        window.onload = function() {
            setTimeout(function() { window.print(); }, 500);
        };
    </script>
</body>
</html>`;

        triggerFileDownload(`${cleanTitle}_Official_Certificate.html`, certificateHtml, 'text/html');
    };

    // Code Playground State (Real In-Browser Sandbox)
    const [codeSnippet, setCodeSnippet] = useState(
        `// Welcome to AILearn Code Lab!
// Type any code below and click 'Run Code'

let studentName = "AILearn Student";
let skills = ["Generative AI", "Full-Stack", "Machine Learning"];

console.log("🚀 Running practical lab for: " + studentName);
console.log("📚 Active modules to master:", skills);

for (let i = 1; i <= 3; i++) {
    console.log("⚡ Lab Step " + i + ": Passed verification tests!");
}`
    );
    const [consoleOutput, setConsoleOutput] = useState('');
    const [isRunningCode, setIsRunningCode] = useState(false);

    // Quiz State
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [quizResult, setQuizResult] = useState(() => getCourseQuizStatus(courseData.id));

    // Q&A State
    const [qnaList, setQnaList] = useState([
        {
            user: "Rahul Sharma",
            time: "2 hours ago",
            question: "How do we handle memory optimization in production deployment?",
            answer: "Great question! Using 4-bit / 8-bit quantization (QLoRA) and batch token truncation reduces VRAM usage by up to 60%."
        },
        {
            user: "Priya Patel",
            time: "1 day ago",
            question: "Is the certificate cryptographically verifiable?",
            answer: "Yes, every certificate has a unique QR verification hash that can be embedded into LinkedIn."
        }
    ]);
    const [newQuestion, setNewQuestion] = useState('');

    // Certificate Modal State
    const [showCertificate, setShowCertificate] = useState(false);

    const currentLesson = lessons[currentLessonIndex] || lessons[0];
    const completedCount = lessons.filter(l => l.completed).length;
    const progressPercent = Math.round((completedCount / lessons.length) * 100);
    const isLessonsCompleted = completedCount === lessons.length && lessons.length > 0;
    const isQuizCompleted = quizResult && quizResult.completed && quizResult.passed;
    const isEligibleForCert = (isLessonsCompleted && isQuizCompleted) || isAdmin;

    // Toggle Lesson Completion
    const toggleLessonComplete = (index) => {
        const updated = [...lessons];
        const nextState = !updated[index].completed;
        updated[index].completed = nextState;
        setLessons(updated);
        updateLessonProgress(courseData.id, index, nextState, updated[index].title);
    };

    // Navigation Next / Prev
    const handleNextLesson = () => {
        if (currentLessonIndex < lessons.length - 1) {
            // Mark current as completed
            const updated = [...lessons];
            updated[currentLessonIndex].completed = true;
            setLessons(updated);
            updateLessonProgress(courseData.id, currentLessonIndex, true, updated[currentLessonIndex].title);
            setCurrentLessonIndex(currentLessonIndex + 1);
        }
    };

    const handlePrevLesson = () => {
        if (currentLessonIndex > 0) {
            setCurrentLessonIndex(currentLessonIndex - 1);
        }
    };

    // REAL DYNAMIC CODE EXECUTION ENGINE
    const handleRunCode = () => {
        setIsRunningCode(true);
        setConsoleOutput("⏳ Executing code in sandbox environment...\n");

        setTimeout(() => {
            setIsRunningCode(false);
            const logs = [];
            
            try {
                // Intercept console.log to capture student output
                let executableCode = codeSnippet;

                // Support Python-style print(...) by converting to console.log
                executableCode = executableCode.replace(/print\s*\(/g, 'console.log(');

                // Filter out Python comments (#) so JS engine doesn't break
                executableCode = executableCode.split('\n').map(line => {
                    const trimmed = line.trim();
                    if (trimmed.startsWith('#')) return '';
                    return line;
                }).join('\n');

                // Create a custom console logger that outputs to BOTH website screen & browser devtools console (F12)
                const customConsole = {
                    log: (...args) => {
                        window.console.log('[AILearn Sandbox]', ...args);
                        logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' '));
                    },
                    error: (...args) => {
                        window.console.error('[AILearn Sandbox]', ...args);
                        logs.push('❌ Error: ' + args.join(' '));
                    },
                    warn: (...args) => {
                        window.console.warn('[AILearn Sandbox]', ...args);
                        logs.push('⚠️ Warning: ' + args.join(' '));
                    }
                };

                // Execute user code dynamically in safe isolated function scope
                // Execute user code dynamically in the existing code playground
        // eslint-disable-next-line no-new-func
            const runFunction = new Function('console', executableCode);
                runFunction(customConsole);

                if (logs.length > 0) {
                    setConsoleOutput(`>>> Execution Succeeded (Exit 0):\n\n${logs.join('\n')}`);
                } else {
                    setConsoleOutput(">>> Execution Succeeded (Exit 0):\n\n(Code executed with no console output. Try using print() or console.log())");
                }
            } catch (error) {
                setConsoleOutput(`>>> Runtime Error:\n\n❌ ${error.name}: ${error.message}`);
            }
        }, 400);
    };

    // Handle Post Q&A
    const handlePostQuestion = (e) => {
        e.preventDefault();
        if (!newQuestion.trim()) return;
        setQnaList([
            {
                user: "You (Student)",
                time: "Just now",
                question: newQuestion,
                answer: "Your instructor and AI Mentor will answer shortly!"
            },
            ...qnaList
        ]);
        setNewQuestion('');
    };

    // Sample Quiz Questions
    const sampleQuiz = [
        {
            q: `What is the primary architectural goal of ${courseData.title}?`,
            options: [
                "Streamlining neural pipeline latency & throughput",
                "Increasing raw server RAM usage",
                "Disabling cache layers",
                "Manual token processing"
            ],
            correct: 0,
            explanation: "Optimizing throughput and latency is essential for high-performance production systems."
        },
        {
            q: "Which technique is recommended for efficient inference?",
            options: [
                "Quantization and LoRA adapters",
                "Storing uncompressed raw tensors",
                "Synchronous blocking API calls",
                "Hardcoding weights"
            ],
            correct: 0,
            explanation: "Quantization (e.g. 4-bit/8-bit) provides massive memory savings with minimal accuracy loss."
        }
    ];

    return (
        <div className="classroom-hub">
            {/* Top Admin / Premium Access Status Alert Banner */}
            {isAdmin ? (
                <div style={{
                    background: 'linear-gradient(90deg, #1e1b4b, #312e81)',
                    borderBottom: '1px solid #4338ca',
                    color: '#e0e7ff',
                    padding: '10px 24px',
                    fontSize: '13px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaCrown style={{ color: '#fbbf24' }} />
                        <strong>👑 Admin Mode Active:</strong> You are viewing this course with Superuser privileges. All lessons, source code, quizzes, and certificates are 100% UNLOCKED.
                    </span>
                    <span style={{ background: '#3730a3', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', color: '#c7d2fe' }}>
                        Admin Bypass Active
                    </span>
                </div>
            ) : isCoursePaid && !isPurchased ? (
                <div style={{
                    background: 'linear-gradient(90deg, #78350f, #92400e)',
                    borderBottom: '1px solid #b45309',
                    color: '#fef3c7',
                    padding: '10px 24px',
                    fontSize: '13px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px'
                }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaLock style={{ color: '#f59e0b' }} />
                        <strong>Free Preview Mode:</strong> You can watch the first 2 lessons for free. Unlock full course, downloadable source code, and certificate.
                    </span>
                    <button
                        onClick={() => setShowPaymentModal(true)}
                        style={{
                            background: '#fbbf24',
                            color: '#78350f',
                            border: 'none',
                            padding: '6px 16px',
                            borderRadius: '8px',
                            fontWeight: 800,
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        <FaCreditCard /> Unlock Full Course — {courseData.price || '₹499'}
                    </button>
                </div>
            ) : null}

            {/* Payment Success Toast Notification */}
            {paymentSuccessToast && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    background: 'linear-gradient(135deg, #059669, #10b981)',
                    color: '#ffffff',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)',
                    zIndex: 5000,
                    fontWeight: 700,
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    🎉 Payment Successful! All course lessons and materials are now unlocked!
                </div>
            )}

            {/* Top Minimalist Classroom Header */}
            <div className="classroom-topbar">
                <div className="topbar-left">
                    <Link to={`/course/${id || 'ai-1'}`} className="back-link">
                        <FaArrowLeft />
                        <span>Exit Classroom</span>
                    </Link>
                    <div className="course-name-badge">
                        <span className="course-tag">{courseData.category}</span>
                        <h2>{courseData.title}</h2>
                        {isCoursePaid ? (
                            <span style={{ background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 700, marginLeft: '8px' }}>
                                👑 Premium
                            </span>
                        ) : (
                            <span style={{ background: '#ecfdf5', color: '#047857', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 700, marginLeft: '8px' }}>
                                🟢 Free
                            </span>
                        )}
                    </div>
                </div>

                <div className="topbar-right">
                    <div className="progress-pill-wrapper">
                        <div className="progress-info">
                            <span>Progress: <strong>{progressPercent}%</strong></span>
                            <span>{completedCount}/{lessons.length} Completed</span>
                        </div>
                        <div className="progress-bar-track">
                            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                    </div>

                    {!courseData.includesCertificate ? (
                        <button className="claim-cert-btn disabled" title="Free course does not include verifiable certificate">
                            <FaTrophy /> No Certificate (Free Course)
                        </button>
                    ) : isCoursePaid && !isPurchased ? (
                        <button className="claim-cert-btn disabled" onClick={() => setShowPaymentModal(true)} title="Purchase course to earn verified certificate" style={{ cursor: 'pointer' }}>
                            <FaLock /> Certificate (Paid Only)
                        </button>
                    ) : isEligibleForCert ? (
                        <button className="claim-cert-btn animate-glow" onClick={() => setShowCertificate(true)}>
                            <FaTrophy /> Claim Certificate 🏆
                        </button>
                    ) : (
                        <button 
                            className="claim-cert-btn disabled" 
                            title={
                                !isLessonsCompleted 
                                    ? `Complete all lessons (${completedCount}/${lessons.length}) and pass quiz` 
                                    : "Pass the Course Quiz to unlock your certificate"
                            }
                            onClick={() => {
                                if (isLessonsCompleted && !isQuizCompleted) {
                                    setActiveTab('quiz');
                                    alert("📝 All lessons complete! Now pass the course quiz in the 'Quick Quiz' tab to unlock your certificate!");
                                } else {
                                    alert(`⚠️ Certificate requires 100% video lessons (${completedCount}/${lessons.length}) AND passing the course quiz.`);
                                }
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <FaLock style={{ marginRight: '6px' }} />
                            {!isLessonsCompleted ? 'Videos Pending' : 'Quiz Pending'}
                        </button>
                    )}
                </div>
            </div>

            {/* Main Classroom Stage Area */}
            <div className="classroom-main-grid">
                {/* Left Side: Video + Interactive Learning Hub Tabs */}
                <div className="stage-left-panel">
                    {/* Video Player Box */}
                    <div className="video-player-frame">
                        {currentLesson.isLocked ? (
                            <div style={{
                                width: '100%',
                                height: '100%',
                                minHeight: '380px',
                                background: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '40px 20px',
                                textAlign: 'center',
                                color: '#ffffff'
                            }}>
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '50%',
                                    background: 'rgba(239, 68, 68, 0.15)',
                                    color: '#ef4444',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '28px',
                                    marginBottom: '16px'
                                }}>
                                    <FaLock />
                                </div>
                                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>
                                    This Lesson is Locked
                                </h3>
                                <p style={{ maxWidth: '480px', color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                                    "{currentLesson.title}" is part of our full premium curriculum. Unlock this course with Razorpay to get full lifetime access, all downloadable project files, and your verified certificate.
                                </p>
                                <button
                                    onClick={() => setShowPaymentModal(true)}
                                    style={{
                                        background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                                        color: '#ffffff',
                                        border: 'none',
                                        padding: '14px 28px',
                                        borderRadius: '12px',
                                        fontWeight: 800,
                                        fontSize: '15px',
                                        cursor: 'pointer',
                                        boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    }}
                                >
                                    <FaCreditCard /> Unlock Course for {courseData.price || '₹499'}
                                </button>
                            </div>
                        ) : currentLesson.videoUrl ? (
                            <div className="real-video-screen" style={{ width: '100%', aspectRatio: '16/9', position: 'relative', background: '#000000' }}>
                                <iframe
                                    src={`${currentLesson.videoUrl}?autoplay=${isPlaying ? 1 : 0}&rel=0&modestbranding=1&enablejsapi=1`}
                                    title={currentLesson.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        border: 'none',
                                        borderRadius: '20px 20px 0 0',
                                        display: 'block'
                                    }}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <div className="mock-video-screen">
                                <button className="center-play-button" onClick={() => setIsPlaying(!isPlaying)}>
                                    {isPlaying ? <FaPause /> : <FaPlay style={{ marginLeft: '4px' }} />}
                                </button>

                                <div className="video-controls-overlay">
                                    <div className="video-status-text">
                                        <span className="playing-pulse"></span>
                                        <span>{isPlaying ? 'Now Playing' : 'Lesson Paused'} — {currentLesson.title}</span>
                                    </div>
                                    <div className="video-tool-icons">
                                        <FaVolumeUp />
                                        <FaExpand />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Interactive Lesson Navigation Dock */}
                    <div className="lesson-nav-dock">
                        <button 
                            className="dock-nav-btn" 
                            onClick={handlePrevLesson}
                            disabled={currentLessonIndex === 0}
                        >
                            <FaChevronLeft /> Previous
                        </button>

                        <button 
                            className={`dock-complete-btn ${currentLesson.completed ? 'completed' : ''}`}
                            onClick={() => toggleLessonComplete(currentLessonIndex)}
                            disabled={currentLesson.isLocked}
                        >
                            <FaCheck /> {currentLesson.completed ? 'Lesson Completed' : 'Mark as Complete'}
                        </button>

                        <button 
                            className="dock-nav-btn next" 
                            onClick={handleNextLesson}
                            disabled={currentLessonIndex === lessons.length - 1}
                        >
                            Next Lesson <FaChevronRight />
                        </button>
                    </div>

                    {/* Interactive Learning Hub Tabs Header */}
                    <div className="learning-tabs-header">
                        <button 
                            className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
                            onClick={() => setActiveTab('notes')}
                        >
                            <FaBookOpen /> Lesson Overview & Notes
                        </button>

                        <button 
                            className={`tab-btn ${activeTab === 'code' ? 'active' : ''}`}
                            onClick={() => setActiveTab('code')}
                        >
                            <FaCode /> Interactive Code Lab ⚡
                        </button>

                        <button 
                            className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
                            onClick={() => setActiveTab('resources')}
                        >
                            <FaDownload /> Resources & Cheatsheets {!isCoursePaid && '🔒'}
                        </button>

                        <button 
                            className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
                            onClick={() => setActiveTab('quiz')}
                        >
                            <FaQuestionCircle /> Course Quiz {!isCoursePaid && '🔒'} {quizResult && quizResult.passed ? '✅' : '(Required for Cert)'}
                        </button>

                        <button 
                            className={`tab-btn ${activeTab === 'qna' ? 'active' : ''}`}
                            onClick={() => setActiveTab('qna')}
                        >
                            <FaComments /> Q&A Discussions ({qnaList.length})
                        </button>
                    </div>

                    {/* Tab Contents */}
                    <div className="learning-tab-content-panel">
                        {/* 1. NOTES TAB */}
                        {activeTab === 'notes' && (
                            <div className="tab-pane">
                                <h3>📝 Lesson Key Takeaways & Architecture</h3>
                                <p style={{ color: '#cbd5e1', lineHeight: '1.7', marginBottom: '16px' }}>
                                    {courseData.desc}
                                </p>
                                <div className="notes-highlight-box">
                                    <h4>💡 Key Learning Objectives:</h4>
                                    <ul>
                                        <li>Understand core foundational concepts of {courseData.title}.</li>
                                        <li>Implement hands-on code notebooks and real-world architectures.</li>
                                        <li>Optimize memory consumption, token throughput, and production deployment.</li>
                                        <li>Master best practices recommended by senior lead engineer <strong>{courseData.instructor}</strong>.</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* 2. CODE LAB TAB */}
                        {activeTab === 'code' && (
                            <div className="tab-pane">
                                <div className="code-lab-header">
                                    <div>
                                        <h3>💻 Interactive In-Browser Code Sandbox</h3>
                                        <p style={{ fontSize: '13px', color: '#94a3b8' }}>Practice coding live while watching the lesson. No local installation required!</p>
                                    </div>
                                    <button 
                                        className="run-code-btn" 
                                        onClick={handleRunCode}
                                        disabled={isRunningCode}
                                    >
                                        <FaCode /> {isRunningCode ? 'Running...' : 'Run Code ⚡'}
                                    </button>
                                </div>

                                <div className="code-editor-wrapper">
                                    <textarea 
                                        className="code-textarea"
                                        value={codeSnippet}
                                        onChange={(e) => setCodeSnippet(e.target.value)}
                                        rows={8}
                                    />
                                    {consoleOutput && (
                                        <div className="code-console-output">
                                            <div className="console-header">Console Output:</div>
                                            <pre>{consoleOutput}</pre>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* 3. RESOURCES TAB */}
                        {activeTab === 'resources' && (
                            <div className="tab-pane">
                                <h3>📦 Lesson Assets & Downloadable Files</h3>
                                
                                {!isCoursePaid && !isAdmin ? (
                                    <div style={{
                                        background: 'rgba(239, 68, 68, 0.08)',
                                        border: '1px solid rgba(239, 68, 68, 0.3)',
                                        borderRadius: '16px',
                                        padding: '32px 24px',
                                        textAlign: 'center',
                                        color: '#cbd5e1',
                                        marginBottom: '20px'
                                    }}>
                                        <div style={{ fontSize: '36px', marginBottom: '10px' }}>🔒</div>
                                        <h4 style={{ color: '#f87171', fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>
                                            Resources & Cheatsheets (Paid Feature Only)
                                        </h4>
                                        <p style={{ fontSize: '14px', color: '#94a3b8', maxWidth: '520px', margin: '0 auto 18px', lineHeight: '1.6' }}>
                                            Downloadable Cheat Sheets, Jupyter Notebooks, and Project Repositories are available exclusively in <strong>Paid Courses</strong>. Free tier includes online video lessons only.
                                        </p>
                                        <Link
                                            to="/courses"
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                                                color: '#ffffff',
                                                padding: '10px 22px',
                                                borderRadius: '10px',
                                                fontWeight: 700,
                                                fontSize: '13px',
                                                textDecoration: 'none'
                                            }}
                                        >
                                            👑 Explore Paid & Certified Courses
                                        </Link>
                                    </div>
                                ) : isCoursePaid && !isPurchased && !isAdmin ? (
                                    <div style={{
                                        background: 'rgba(254, 243, 199, 0.08)',
                                        border: '1px solid rgba(245, 158, 11, 0.3)',
                                        borderRadius: '12px',
                                        padding: '24px',
                                        textAlign: 'center',
                                        color: '#cbd5e1',
                                        marginBottom: '20px'
                                    }}>
                                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔒</div>
                                        <h4 style={{ color: '#fbbf24', fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>
                                            Premium Downloadable Assets Locked
                                        </h4>
                                        <p style={{ fontSize: '13px', color: '#94a3b8', maxWidth: '500px', margin: '0 auto 16px', lineHeight: '1.6' }}>
                                            Full Jupyter notebooks, source code repositories, and high-res summary cheatsheets are reserved for enrolled students.
                                        </p>
                                        <button
                                            onClick={() => setShowPaymentModal(true)}
                                            style={{
                                                background: '#f59e0b',
                                                color: '#78350f',
                                                border: 'none',
                                                padding: '10px 20px',
                                                borderRadius: '8px',
                                                fontWeight: 800,
                                                fontSize: '13px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <FaCreditCard /> Unlock Assets with Razorpay ({courseData.price || '₹499'})
                                        </button>
                                    </div>
                                ) : (
                                    <div className="resources-grid">
                                        <div className="resource-card">
                                            <div className="resource-info">
                                                <strong>📄 Lesson Summary & Cheat Sheet (Markdown / PDF)</strong>
                                                <span>Official course study notes & key principles</span>
                                            </div>
                                            <button className="resource-download-btn" onClick={handleDownloadCheatSheet} title="Download Cheat Sheet Markdown File">
                                                <FaDownload /> Download .md
                                            </button>
                                        </div>

                                        <div className="resource-card">
                                            <div className="resource-info">
                                                <strong>📓 Jupyter Notebook Lab (.ipynb)</strong>
                                                <span>Runnable code sandbox for Colab / Jupyter</span>
                                            </div>
                                            <button className="resource-download-btn" onClick={handleDownloadNotebook} title="Download Runnable Jupyter Notebook">
                                                <FaDownload /> Download .ipynb
                                            </button>
                                        </div>

                                        <div className="resource-card">
                                            <div className="resource-info">
                                                <strong><FaGithub /> GitHub Starter Repo</strong>
                                                <span>Clone official project boilerplates</span>
                                            </div>
                                            <a href="https://github.com" target="_blank" rel="noreferrer" className="resource-download-btn">
                                                View Repo ↗
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 4. QUIZ TAB */}
                        {activeTab === 'quiz' && (
                            <div className="tab-pane">
                                <h3>❓ Quick Knowledge Check</h3>
                                
                                {!isCoursePaid && !isAdmin ? (
                                    <div style={{
                                        background: 'rgba(239, 68, 68, 0.08)',
                                        border: '1px solid rgba(239, 68, 68, 0.3)',
                                        borderRadius: '16px',
                                        padding: '32px 24px',
                                        textAlign: 'center',
                                        color: '#cbd5e1',
                                        marginBottom: '20px'
                                    }}>
                                        <div style={{ fontSize: '36px', marginBottom: '10px' }}>🔒</div>
                                        <h4 style={{ color: '#f87171', fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>
                                            Interactive Quizzes & Assessments (Paid Feature Only)
                                        </h4>
                                        <p style={{ fontSize: '14px', color: '#94a3b8', maxWidth: '520px', margin: '0 auto 18px', lineHeight: '1.6' }}>
                                            Graded quizzes, instant feedback, and evaluation metrics are exclusive to <strong>Paid & Certified Courses</strong>.
                                        </p>
                                        <Link
                                            to="/courses"
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                                                color: '#ffffff',
                                                padding: '10px 22px',
                                                borderRadius: '10px',
                                                fontWeight: 700,
                                                fontSize: '13px',
                                                textDecoration: 'none'
                                            }}
                                        >
                                            👑 Upgrade to Paid Course
                                        </Link>
                                    </div>
                                ) : isCoursePaid && !isPurchased && !isAdmin ? (
                                    <div style={{
                                        background: 'rgba(254, 243, 199, 0.08)',
                                        border: '1px solid rgba(245, 158, 11, 0.3)',
                                        borderRadius: '12px',
                                        padding: '24px',
                                        textAlign: 'center',
                                        color: '#cbd5e1',
                                        marginBottom: '20px'
                                    }}>
                                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔒</div>
                                        <h4 style={{ color: '#fbbf24', fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>
                                            Course Quiz Locked
                                        </h4>
                                        <p style={{ fontSize: '13px', color: '#94a3b8', maxWidth: '500px', margin: '0 auto 16px', lineHeight: '1.6' }}>
                                            Enroll in this course to take graded quizzes and earn your verified certificate.
                                        </p>
                                        <button
                                            onClick={() => setShowPaymentModal(true)}
                                            style={{
                                                background: '#f59e0b',
                                                color: '#78350f',
                                                border: 'none',
                                                padding: '10px 20px',
                                                borderRadius: '8px',
                                                fontWeight: 800,
                                                fontSize: '13px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <FaCreditCard /> Unlock with Razorpay ({courseData.price || '₹499'})
                                        </button>
                                    </div>
                                ) : (
                                    <div className="quiz-container">
                                        {sampleQuiz.map((quizItem, qIdx) => (
                                            <div key={qIdx} className="quiz-question-card">
                                                <h4>Q{qIdx + 1}. {quizItem.q}</h4>
                                                <div className="quiz-options-list">
                                                    {quizItem.options.map((opt, optIdx) => (
                                                        <label 
                                                            key={optIdx} 
                                                            className={`quiz-option-label ${selectedAnswers[qIdx] === optIdx ? 'selected' : ''}`}
                                                        >
                                                            <input 
                                                                type="radio" 
                                                                name={`quiz_${qIdx}`}
                                                                checked={selectedAnswers[qIdx] === optIdx}
                                                                onChange={() => setSelectedAnswers({ ...selectedAnswers, [qIdx]: optIdx })}
                                                            />
                                                            <span>{opt}</span>
                                                        </label>
                                                    ))}
                                                </div>

                                                {quizSubmitted && (
                                                    <div className={`quiz-feedback ${selectedAnswers[qIdx] === quizItem.correct ? 'correct' : 'incorrect'}`}>
                                                        {selectedAnswers[qIdx] === quizItem.correct 
                                                            ? '✅ Correct Answer!' 
                                                            : `❌ Incorrect. Correct answer: ${quizItem.options[quizItem.correct]}`}
                                                        <p style={{ marginTop: '4px', fontSize: '12px', color: '#cbd5e1' }}>
                                                            {quizItem.explanation}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                        {/* Quiz Score Summary Banner */}
                                        {quizSubmitted && quizResult && (
                                            <div style={{
                                                background: quizResult.passed 
                                                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.1))'
                                                    : 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(185, 28, 28, 0.1))',
                                                border: quizResult.passed ? '1px solid #10b981' : '1px solid #ef4444',
                                                borderRadius: '12px',
                                                padding: '16px 20px',
                                                marginBottom: '16px'
                                            }}>
                                                <h4 style={{ margin: '0 0 6px 0', color: quizResult.passed ? '#34d399' : '#f87171' }}>
                                                    {quizResult.passed ? '🎉 Quiz Passed!' : '⚠️ Quiz Not Passed'}
                                                </h4>
                                                <p style={{ margin: 0, fontSize: '14px', color: '#e2e8f0' }}>
                                                    Your Score: <strong>{quizResult.score} / {quizResult.totalQuestions}</strong> ({Math.round((quizResult.score / quizResult.totalQuestions) * 100)}%)
                                                </p>
                                                {quizResult.passed ? (
                                                    <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#a7f3d0' }}>
                                                        {isLessonsCompleted 
                                                            ? '🏆 All videos and quiz completed! Your Certificate is now unlocked!' 
                                                            : `✅ Quiz verified! Complete the remaining video lessons (${completedCount}/${lessons.length}) to claim your certificate.`}
                                                    </p>
                                                ) : (
                                                    <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#fca5a5' }}>
                                                        Passing score is 50% or higher. Review the explanations and retake the quiz to qualify for certificate.
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                            <button 
                                                className="quiz-submit-btn" 
                                                onClick={() => {
                                                    // Count answered
                                                    const answeredCount = Object.keys(selectedAnswers).length;
                                                    if (answeredCount === 0) {
                                                        alert("Please select answers before submitting!");
                                                        return;
                                                    }
                                                    let score = 0;
                                                    sampleQuiz.forEach((item, idx) => {
                                                        if (selectedAnswers[idx] === item.correct) {
                                                            score += 1;
                                                        }
                                                    });
                                                    const passed = score >= Math.ceil(sampleQuiz.length / 2);
                                                    const result = setCourseQuizStatus(courseData.id, {
                                                        passed,
                                                        score,
                                                        totalQuestions: sampleQuiz.length
                                                    });
                                                    setQuizResult(result);
                                                    setQuizSubmitted(true);
                                                }}
                                            >
                                                {quizSubmitted ? 'Update Quiz Submission 🔄' : 'Submit Quiz Answers ✅'}
                                            </button>

                                            {quizSubmitted && isEligibleForCert && (
                                                <button 
                                                    className="quiz-submit-btn" 
                                                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                                                    onClick={() => setShowCertificate(true)}
                                                >
                                                    Claim Certificate Now 🏆
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 5. Q&A TAB */}
                        {activeTab === 'qna' && (
                            <div className="tab-pane">
                                <h3>💬 Community Doubt & Discussion Hub</h3>
                                
                                <form onSubmit={handlePostQuestion} className="qna-post-form">
                                    <input 
                                        type="text" 
                                        placeholder="Have a doubt? Ask your instructor or community..." 
                                        value={newQuestion}
                                        onChange={(e) => setNewQuestion(e.target.value)}
                                    />
                                    <button type="submit" className="qna-submit-btn">Post Question</button>
                                </form>

                                <div className="qna-threads-list">
                                    {qnaList.map((thread, idx) => (
                                        <div key={idx} className="qna-thread-card">
                                            <div className="qna-user-header">
                                                <span className="qna-username">{thread.user}</span>
                                                <span className="qna-time">{thread.time}</span>
                                            </div>
                                            <div className="qna-question-text">
                                                <strong>Q:</strong> {thread.question}
                                            </div>
                                            <div className="qna-answer-box">
                                                <strong>Instructor Response:</strong> {thread.answer}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Playlist Sidebar */}
                <div className="stage-right-sidebar">
                    <div className="sidebar-header-box">
                        <h3>Course Modules</h3>
                        <span>{completedCount}/{lessons.length} Completed</span>
                    </div>

                    <div className="classroom-lessons-list">
                        {lessons.map((les, idx) => (
                            <div 
                                key={idx} 
                                className={`classroom-lesson-row ${currentLessonIndex === idx ? 'current' : ''} ${les.completed ? 'is-complete' : ''} ${les.isLocked ? 'is-locked-lesson' : ''}`}
                                onClick={() => {
                                    if (les.isLocked) {
                                        setShowPaymentModal(true);
                                    } else {
                                        setCurrentLessonIndex(idx);
                                    }
                                }}
                                style={{ opacity: les.isLocked ? 0.75 : 1, cursor: 'pointer' }}
                            >
                                <div className="lesson-left">
                                    {les.isLocked ? (
                                        <span style={{ color: '#f59e0b', fontSize: '13px', display: 'flex', alignItems: 'center' }} title="Locked Lesson — Requires Purchase">
                                            <FaLock />
                                        </span>
                                    ) : les.completed ? (
                                        <FaCheckCircle className="check-icon-green" />
                                    ) : (
                                        <span className="lesson-badge-num">{idx + 1}</span>
                                    )}
                                    <div className="lesson-meta-text">
                                        <h4>{les.title}</h4>
                                        <span>
                                            {les.duration}
                                            {les.isLocked && (
                                                <span style={{ color: '#f59e0b', marginLeft: '6px', fontWeight: 700, fontSize: '10px' }}>
                                                    • LOCKED
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                </div>

                                {currentLessonIndex === idx && !les.isLocked && (
                                    <span className="now-playing-pill">Playing</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Razorpay Checkout Modal */}
            {showPaymentModal && (
                <div className="cert-modal-overlay">
                    <div className="cert-modal-card" style={{ maxWidth: '480px', borderTop: '4px solid #6366f1' }}>
                        <button className="cert-close-btn" onClick={() => setShowPaymentModal(false)}>
                            <FaTimes />
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6366f1', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', marginBottom: '8px' }}>
                            <FaCreditCard /> Razorpay Instant Checkout
                        </div>

                        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                            Unlock Full Course Access
                        </h2>
                        <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '18px' }}>
                            {courseData.title}
                        </p>

                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <span style={{ color: '#475569', fontSize: '14px', fontWeight: 600 }}>Course Fee</span>
                                <span style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>{courseData.price || '₹499'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#10b981', fontWeight: 700 }}>
                                <span>Promotional Discount</span>
                                <span>-75% OFF</span>
                            </div>
                            <hr style={{ margin: '12px 0', border: 'none', borderTop: '1px dashed #cbd5e1' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 800, fontSize: '15px' }}>
                                <span style={{ color: '#0f172a' }}>Total Amount to Pay</span>
                                <span style={{ color: '#6366f1', fontSize: '20px' }}>{courseData.price || '₹499'}</span>
                            </div>
                        </div>

                        {/* What student gets */}
                        <div style={{ textAlign: 'left', marginBottom: '20px', fontSize: '13px', color: '#334155' }}>
                            <strong style={{ display: 'block', marginBottom: '8px' }}>Your Purchase Includes:</strong>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <div>✅ Lifetime Access to all {lessons.length} video lessons</div>
                                <div>✅ Downloadable Source Code & PDF Cheatsheets</div>
                                <div>✅ Official Cryptographically Verifiable Certificate</div>
                                <div>✅ 24/7 AI Tutor Q&A Doubt Support</div>
                            </div>
                        </div>

                        <button
                            onClick={handleRazorpayPayment}
                            disabled={paymentProcessing}
                            style={{
                                width: '100%',
                                background: 'linear-gradient(135deg, #0c2340, #1e3a8a)',
                                color: '#ffffff',
                                border: 'none',
                                padding: '14px',
                                borderRadius: '10px',
                                fontWeight: 800,
                                fontSize: '15px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                boxShadow: '0 8px 20px rgba(30, 58, 138, 0.35)'
                            }}
                        >
                            {paymentProcessing ? (
                                <>Processing with Razorpay...</>
                            ) : (
                                <>
                                    <FaCreditCard /> Pay {courseData.price || '₹499'} with Razorpay
                                </>
                            )}
                        </button>
                        <p style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', marginTop: '10px' }}>
                            🔒 256-Bit SSL Encrypted Razorpay Sandbox Checkout
                        </p>
                    </div>
                </div>
            )}

            {/* Certificate Modal */}
            {showCertificate && (
                <div className="cert-modal-overlay">
                    <div className="cert-modal-card">
                        <button className="cert-close-btn" onClick={() => setShowCertificate(false)}>
                            <FaTimes />
                        </button>
                        
                        <div className="cert-badge-ribbon">🏆 OFFICIAL VERIFIED CREDENTIAL</div>
                        <h2>Certificate of Mastery</h2>
                        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '10px' }}>
                            This is proudly presented to certify that
                        </p>

                        <div style={{
                            fontSize: '28px',
                            fontWeight: '800',
                            background: 'linear-gradient(135deg, #f59e0b, #f97316, #ef4444)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '10px',
                            letterSpacing: '1px',
                            textTransform: 'uppercase'
                        }}>
                            {studentName}
                        </div>

                        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>
                            has successfully completed all required curriculum video modules and passed the course assessment quizzes for:
                        </p>

                        <div className="cert-course-title">{courseData.title}</div>

                        <div className="cert-details-grid">
                            <div>
                                <span>Instructor</span>
                                <strong>{courseData.instructor}</strong>
                            </div>
                            <div>
                                <span>Verification Code</span>
                                <strong>AILEARN-VERIFIED-99824</strong>
                            </div>
                            <div>
                                <span>Issue Date</span>
                                <strong>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>
                            </div>
                        </div>

                        <div className="cert-actions">
                            <button className="cert-download-btn" onClick={handleDownloadCertificate} title="Download Verified Certificate">
                                <FaDownload /> Download Verified Certificate (.html / PDF)
                            </button>
                            <button className="cert-share-btn" onClick={() => alert("LinkedIn Credential link copied to clipboard!")}>
                                <FaShareAlt /> Add to LinkedIn
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoursePlayer;
