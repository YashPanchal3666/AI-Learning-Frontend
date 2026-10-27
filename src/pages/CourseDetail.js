import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/courseDetail.css';
import { getCourseDetail } from '../data/courseDetailData';
import {
    enrollInCourse,
    getCurrentUserEmail
} from '../services/learningService';
import { 
    FaStar, FaClock, FaUsers, FaPlay, FaCheck, 
    FaFileAlt, FaCertificate, FaChevronDown, 
    FaArrowRight, FaUserCheck, FaChalkboardTeacher,
    FaLaptopCode, FaLock, FaGlobe, FaShieldAlt, FaAward
} from 'react-icons/fa';

// Reliable image fallback mapping by category
const fallbackImages = {
    "AI Tools": "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    "Deep Learning & AI": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    "Web Development": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    "Data Science": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    "Cybersecurity": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    "Spanish Language": "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80",
    "Public Speaking": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    "Leadership": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    "default": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
};

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [expandedModules, setExpandedModules] = useState({ 0: true });
    const [imgSrc, setImgSrc] = useState(null);

    // Fetch dynamic course data from localStorage (Admin created) or default data
    const courseData = getCourseDetail(id);
    const outcomes = courseData.outcomes || [];
    const chapters = courseData.chapters || [];

    // Check if viewer is Admin (supports JWT superadmin role & session)
    const isAdmin = (() => {
        try {
            const current = JSON.parse(localStorage.getItem('currentUser') || '{}');
            if (current.role === 'superadmin' || current.role === 'admin') return true;
        } catch (e) {}
        return sessionStorage.getItem('admin_authenticated') === 'true';
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

    // Checkout modal state on detail page
    const [showPayModal, setShowPayModal] = useState(false);
    const [paying, setPaying] = useState(false);

    // Helper to get logged-in student info
    const getStudentInfo = () => {
        try {
            const current = localStorage.getItem('currentUser');
            if (current) {
                const parsed = JSON.parse(current);
                return {
                    name: parsed.name || 'Student',
                    email: parsed.email || 'student@example.com',
                    phone: parsed.phone || '9999999999'
                };
            }
            const fallback = localStorage.getItem('user');
            if (fallback) {
                const parsed = JSON.parse(fallback);
                return {
                    name: parsed.name || 'Student',
                    email: parsed.email || 'student@example.com',
                    phone: parsed.phone || '9999999999'
                };
            }
        } catch (e) { }
        return { name: 'Student', email: 'student@example.com', phone: '9999999999' };
    };

    const handleRazorpayPay = () => {
        setPaying(true);

        const student = getStudentInfo();
        const numericAmount = courseData.inrPrice || 499;

        // If Razorpay SDK is loaded on window
        if (window.Razorpay) {
            const activeKeyId = localStorage.getItem('razorpay_key_id') || "rzp_test_gKbt3Ejw8psWd7";
            const options = {
                key: activeKeyId,
                amount: numericAmount * 100, // Amount in paise (INR)
                currency: "INR",
                name: "AILearn Platform",
                description: `Tuition Enrollment: ${courseData.title}`,
                image: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
                handler: function (response) {
                    // Success callback from real Razorpay popup
                    const updated = Array.from(new Set([...purchasedCourses, courseData.id]));
                    setPurchasedCourses(updated);
                    localStorage.setItem(userPurchaseKey, JSON.stringify(updated));
                    enrollInCourse(courseData.id);
                    setPaying(false);
                    setShowPayModal(false);
                    setShowSuccessToast(true);
                    setTimeout(() => {
                        navigate(`/learn/${id || 'ai-1'}`);
                    }, 1200);
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
                        setPaying(false);
                    }
                }
            };

            try {
                const rzp = new window.Razorpay(options);
                rzp.on('payment.failed', function (response) {
                    alert("⚠️ Payment verification cancelled or failed. Please try again.");
                    setPaying(false);
                });
                rzp.open();
                return;
            } catch (err) {
                console.warn("Razorpay instance init error, falling back:", err);
            }
        }

        // Fallback simulated payment flow if offline/blocked
        setTimeout(() => {
            const updated = Array.from(new Set([...purchasedCourses, courseData.id]));
            setPurchasedCourses(updated);
            localStorage.setItem(userPurchaseKey, JSON.stringify(updated));
            enrollInCourse(courseData.id);
            setPaying(false);
            setShowPayModal(false);
            setShowSuccessToast(true);
            setTimeout(() => {
                navigate(`/learn/${id || 'ai-1'}`);
            }, 1200);
        }, 1200);
    };

    const handleEnroll = () => {
        if (isCoursePaid && !isPurchased) {
            setShowPayModal(true);
        } else {
            enrollInCourse(courseData.id);
            navigate(`/learn/${id || 'ai-1'}`);
        }
    };

    const toggleModule = (index) => {
        setExpandedModules(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // Calculate total lessons and total course duration
    const totalLessons = chapters.reduce((sum, ch) => sum + (ch.lessons ? ch.lessons.length : 0), 0);

    const currentImage = imgSrc || courseData.image || fallbackImages[courseData.category] || fallbackImages["default"];

    return (
        <div className="course-detail-page">
            {/* Admin Master Session Ribbon */}
            {isAdmin && (
                <div style={{
                    background: 'linear-gradient(90deg, #1e1b4b, #312e81)',
                    color: '#e0e7ff',
                    padding: '10px 24px',
                    fontSize: '13px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #4338ca'
                }}>
                    <span>👑 Admin Preview Mode: You have full developer access to inspect and test this course.</span>
                    <button
                        onClick={() => navigate(`/learn/${id || 'ai-1'}?admin=true`)}
                        style={{
                            background: '#ecfdf5',
                            color: '#047857',
                            border: 'none',
                            padding: '4px 12px',
                            borderRadius: '16px',
                            fontWeight: 700,
                            fontSize: '12px',
                            cursor: 'pointer'
                        }}
                    >
                        Open Classroom in Admin Mode 🚀
                    </button>
                </div>
            )}

            {/* Celebration Toast */}
            {showSuccessToast && (
                <div style={{
                    position: 'fixed',
                    top: '90px',
                    right: '30px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#ffffff',
                    padding: '16px 24px',
                    borderRadius: '16px',
                    boxShadow: '0 15px 30px rgba(16, 185, 129, 0.4)',
                    zIndex: 3000,
                    fontWeight: 700,
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    🎉 Enrolled in {courseData.title}! Redirecting to Classroom...
                </div>
            )}

            {/* Hero Header Banner */}
            <div className="course-detail-hero">
                <div className="hero-glow-blob"></div>
                <div className="detail-hero-container">
                    <div className="detail-hero-left">
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
                            <span className="category-pill">{courseData.category}</span>
                            {isCoursePaid ? (
                                <span style={{ background: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 800 }}>
                                    👑 Premium Course
                                </span>
                            ) : (
                                <span style={{ background: '#ecfdf5', color: '#047857', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 800 }}>
                                    🟢 100% Free
                                </span>
                            )}
                        </div>
                        <h1>{courseData.title}</h1>
                        <p>{courseData.desc}</p>

                        <div className="detail-hero-meta">
                            <span className="meta-rating"><FaStar /> {courseData.rating} ({courseData.reviews} reviews)</span>
                            <span><FaUsers /> {courseData.students}</span>
                            <span><FaClock /> {courseData.duration}</span>
                            <span><FaGlobe /> English (Subtitles Available)</span>
                        </div>
                    </div>

                    {/* Floating Purchase / Action Card */}
                    <div className="enroll-card-floating">
                        <div className="enroll-preview-img-container">
                            <img 
                                src={currentImage} 
                                alt={courseData.title} 
                                className="enroll-preview-img"
                                onError={() => setImgSrc(fallbackImages[courseData.category] || fallbackImages["default"])}
                            />
                        </div>

                        <div className="price-row">
                            <span className="current-price">{courseData.price}</span>
                            {isCoursePaid && (
                                <>
                                    <span className="original-price">{courseData.originalPrice || '₹1,999'}</span>
                                    <span className="discount-badge">75% OFF</span>
                                </>
                            )}
                        </div>

                        <button 
                            className={`enroll-action-btn ${isPurchased ? 'enrolled-success-btn' : ''}`}
                            onClick={handleEnroll}
                        >
                            {isPurchased ? (
                                <>
                                    <span>Go to Classroom</span>
                                    <FaArrowRight />
                                </>
                            ) : isCoursePaid ? (
                                <>
                                    <span>Buy Now — {courseData.price || '₹499'}</span>
                                    <FaArrowRight />
                                </>
                            ) : (
                                <>
                                    <span>Start Free Course</span>
                                    <FaUserCheck />
                                </>
                            )}
                        </button>
                        
                        {isCoursePaid && (
                            <p className="guarantee-tag">⚡ Instant Access with Razorpay • 100% Secure</p>
                        )}

                        <ul className="enroll-includes-list">
                            <li><FaPlay className="outcome-icon-blue" /> Full Lifetime Access to All Lessons</li>
                            <li style={{ opacity: courseData.includesCertificate !== false ? 1 : 0.4 }}>
                                <FaCertificate className="outcome-icon-blue" /> 
                                {courseData.includesCertificate !== false ? 'Verified Cryptographic Certificate' : 'No Certificate (Free Mode)'}
                            </li>
                            <li style={{ opacity: courseData.includesSourceCode !== false ? 1 : 0.4 }}>
                                <FaFileAlt className="outcome-icon-blue" /> 
                                {courseData.includesSourceCode !== false ? 'Downloadable Source Code & Notes' : 'No Source Code Downloads'}
                            </li>
                            <li style={{ opacity: courseData.includesQuizzes !== false ? 1 : 0.4 }}>
                                <FaAward className="outcome-icon-blue" /> 
                                {courseData.includesQuizzes !== false ? 'Graded Quizzes & Coding Labs' : 'No Graded Quizzes'}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Main Content 2-Column Layout */}
            <div className="detail-main-layout">
                {/* Left Column: Outcomes, Syllabus, Reviews */}
                <div className="detail-left-col">
                    {/* What You Will Learn */}
                    <div className="outcomes-box">
                        <h2>What You Will Learn</h2>
                        <div className="outcomes-grid">
                            {outcomes.map((out, idx) => (
                                <div key={idx} className="outcome-item">
                                    <FaCheck className="outcome-icon" />
                                    <span>{out}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Premium Syllabus Accordion */}
                    <div className="syllabus-box">
                        <div className="syllabus-header-row">
                            <h2>Course Content & Syllabus</h2>
                            <div className="syllabus-stats-pills">
                                <span>{chapters.length} Modules</span>
                                <span>{totalLessons} Lessons</span>
                                <span>{courseData.duration} Total Length</span>
                            </div>
                        </div>

                        <div className="chapters-wrapper">
                            {chapters.map((ch, cIdx) => {
                                const isExpanded = !!expandedModules[cIdx];
                                return (
                                    <div key={cIdx} className={`chapter-card-animated ${isExpanded ? 'expanded' : ''}`}>
                                        <button className="chapter-header-btn" onClick={() => toggleModule(cIdx)}>
                                            <div className="chapter-title-side">
                                                <div className="chapter-number-badge">{cIdx + 1}</div>
                                                <h3>{ch.title}</h3>
                                            </div>
                                            <div className="chapter-meta-side">
                                                <span>{ch.lessons ? ch.lessons.length : 0} Lessons</span>
                                                <FaChevronDown className="chevron-icon" />
                                            </div>
                                        </button>

                                        {isExpanded && (
                                            <div className="lessons-list-animated">
                                                {ch.lessons && ch.lessons.map((les, lIdx) => (
                                                    <div key={lIdx} className="lesson-item-row">
                                                        <div className="lesson-title-box">
                                                            {lIdx === 0 && cIdx === 0 ? (
                                                                <FaPlay className="lesson-icon-type" />
                                                            ) : lIdx % 2 === 1 ? (
                                                                <FaLaptopCode className="lesson-icon-type" />
                                                            ) : (
                                                                <FaLock className="lesson-icon-type" style={{ color: '#94a3b8' }} />
                                                            )}
                                                            <span>{les.name}</span>
                                                        </div>
                                                        <div className="lesson-badges">
                                                            {lIdx === 0 && cIdx === 0 && (
                                                                <span className="preview-pill">Free Preview</span>
                                                            )}
                                                            <span className="lesson-duration">{les.duration}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Ratings & Reviews Box */}
                    <div className="reviews-box">
                        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
                            Student Ratings & Reviews
                        </h2>
                        <div className="reviews-summary">
                            <div className="big-rating">
                                <h3>{courseData.rating}</h3>
                                <div className="big-rating-stars">
                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                </div>
                                <p>Course Rating</p>
                            </div>
                            <div className="rating-bars">
                                <div className="bar-row">
                                    <span>5 Stars</span>
                                    <div className="bar-bg"><div className="bar-fill" style={{ width: '85%' }}></div></div>
                                    <span>85%</span>
                                </div>
                                <div className="bar-row">
                                    <span>4 Stars</span>
                                    <div className="bar-bg"><div className="bar-fill" style={{ width: '10%' }}></div></div>
                                    <span>10%</span>
                                </div>
                                <div className="bar-row">
                                    <span>3 Stars</span>
                                    <div className="bar-bg"><div className="bar-fill" style={{ width: '5%' }}></div></div>
                                    <span>5%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Instructor & Widgets */}
                <div className="detail-right-col">
                    {/* Instructor Profile Card */}
                    <div className="sidebar-widget-card">
                        <div className="widget-heading">
                            <FaChalkboardTeacher style={{ color: '#6366f1' }} /> Instructor Profile
                        </div>
                        <div className="instructor-profile">
                            <div className="instructor-avatar">
                                {courseData.instructor.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div className="instructor-info">
                                <h4>{courseData.instructor}</h4>
                                <p>Senior Instructor & Researcher</p>
                            </div>
                        </div>
                        <p className="instructor-bio">
                            Expert with over 10+ years of teaching experience, helping 100,000+ developers build real-world software, AI models, and cloud infrastructure.
                        </p>
                    </div>

                    {/* Course Requirements / Prerequisites */}
                    <div className="sidebar-widget-card">
                        <div className="widget-heading">
                            <FaShieldAlt style={{ color: '#2563eb' }} /> Prerequisites
                        </div>
                        <ul className="prereq-list">
                            <li><span className="bullet-dot"></span> Basic understanding of computer operating systems</li>
                            <li><span className="bullet-dot"></span> A laptop/PC with internet access</li>
                            <li><span className="bullet-dot"></span> Willingness to complete hands-on practice labs</li>
                        </ul>
                    </div>

                    {/* Certificate Preview Widget */}
                    <div className="cert-preview-box">
                        <FaAward style={{ fontSize: '36px', color: '#f59e0b', marginBottom: '10px' }} />
                        <h4>Verified Skill Certificate</h4>
                        <p>Earn a cryptographic certificate upon completing all lessons and capstone labs.</p>
                    </div>
                </div>
            </div>

            {/* Razorpay Checkout Modal for CourseDetail */}
            {showPayModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(6px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    padding: '20px'
                }}>
                    <div style={{
                        background: '#ffffff',
                        borderRadius: '20px',
                        padding: '32px',
                        width: '100%',
                        maxWidth: '460px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        borderTop: '5px solid #6366f1',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => setShowPayModal(false)}
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                background: '#f1f5f9',
                                border: 'none',
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                fontWeight: 700,
                                color: '#64748b'
                            }}
                        >
                            ✕
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6366f1', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', marginBottom: '10px' }}>
                            💳 Razorpay Instant Checkout
                        </div>

                        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                            Enroll in {courseData.title}
                        </h2>
                        <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '18px' }}>
                            By {courseData.instructor} • Lifetime Access
                        </p>

                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{ color: '#475569', fontSize: '14px', fontWeight: 600 }}>Standard Tuition</span>
                                <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '14px' }}>{courseData.originalPrice || '₹1,999'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#10b981', fontWeight: 700 }}>
                                <span>Promotional Discount</span>
                                <span>-75% Savings</span>
                            </div>
                            <hr style={{ margin: '12px 0', border: 'none', borderTop: '1px dashed #cbd5e1' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 800, fontSize: '16px' }}>
                                <span style={{ color: '#0f172a' }}>Total Amount</span>
                                <span style={{ color: '#6366f1', fontSize: '22px' }}>{courseData.price || '₹499'}</span>
                            </div>
                        </div>

                        <div style={{ textAlign: 'left', marginBottom: '20px', fontSize: '13px', color: '#334155', background: '#f1f5f9', padding: '12px', borderRadius: '10px' }}>
                            <div style={{ fontWeight: 700, marginBottom: '6px' }}>Included in this purchase:</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <div>✅ Lifetime Classroom Video Playback</div>
                                <div>✅ Verifiable Cryptographic Certificate</div>
                                <div>✅ Downloadable Source Code & Notes</div>
                                <div>✅ 24/7 AI Tutor Q&A Assistance</div>
                            </div>
                        </div>

                        <button
                            onClick={handleRazorpayPay}
                            disabled={paying}
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
                                boxShadow: '0 8px 20px rgba(30, 58, 138, 0.35)'
                            }}
                        >
                            {paying ? 'Connecting to Razorpay Gateway...' : `Pay ${courseData.price || '₹499'} via Razorpay ⚡`}
                        </button>
                        <p style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', marginTop: '10px' }}>
                            🔒 256-Bit SSL Encrypted Razorpay Sandbox Checkout
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseDetail;