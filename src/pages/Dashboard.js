import React, { useState, useEffect } from 'react';
import '../styles/dashboard.css';
import {
    FaUserGraduate, FaFire, FaCertificate, FaClock, FaAward,
    FaBookOpen, FaPlay, FaCheckCircle, FaDownload, FaShareAlt,
    FaCog, FaSave
} from 'react-icons/fa';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [savedMsg, setSavedMsg] = useState(false);

    // Initialize state directly from 'currentUser' in localStorage with fallbacks
    const [userProfile, setUserProfile] = useState(() => {
        const savedUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        return {
            name: savedUser.fullName || savedUser.name || "Alex Rivera",
            email: savedUser.email || "alex.rivera@example.com",
            role: savedUser.role || "AI Builder & ML Enthusiast",
            bio: savedUser.bio || "Passionate about building Generative AI applications, fine-tuning LLMs, and computer vision models.",
            github: savedUser.github || "https://github.com/alexrivera",
            linkedin: savedUser.linkedin || "https://linkedin.com/in/alexrivera"
        };
    });

    // Re-sync with localStorage whenever activeTab changes or component mounts
    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (savedUser && (savedUser.fullName || savedUser.name)) {
            setUserProfile((prevProfile) => ({
                ...prevProfile,
                name: savedUser.fullName || savedUser.name,
                email: savedUser.email || prevProfile.email
            }));
        }
    }, [activeTab]);

    const handleSaveProfile = (e) => {
        e.preventDefault();
        const existingUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        const updatedUser = {
            ...existingUser,
            ...userProfile,
            fullName: userProfile.name,
            email: userProfile.email
        };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        setSavedMsg(true);
        setTimeout(() => setSavedMsg(false), 3000);
    };


    // Enrolled Courses Data
    const enrolledCourses = [
        {
            id: 1,
            title: "Generative AI & LLM Architecture",
            instructor: "Dr. Aris Vance",
            progress: 75,
            completedLessons: 15,
            totalLessons: 20,
            nextLesson: "Lesson 16: Fine-tuning LLaMA 3 with LoRA",
            category: "Deep Learning"
        },
        {
            id: 2,
            title: "OpenCV & YOLOv8 Object Detection",
            instructor: "Elena Rostova",
            progress: 40,
            completedLessons: 6,
            totalLessons: 15,
            nextLesson: "Lesson 7: Real-time Multi-Object Tracking",
            category: "Computer Vision"
        },
        {
            id: 3,
            title: "Python for Artificial Intelligence & ML",
            instructor: "Sarah Jenkins",
            progress: 100,
            completedLessons: 12,
            totalLessons: 12,
            nextLesson: "Completed! 🎉",
            category: "Fundamentals"
        }
    ];

    // Certificates Data
    const certificates = [
        {
            id: "CERT-AI-8842",
            title: "Python for Artificial Intelligence & ML",
            issueDate: "Jan 28, 2026",
            skills: "NumPy, Pandas, Scikit-Learn",
            grade: "98% Score"
        },
        {
            id: "CERT-AI-9015",
            title: "Neural Network Fundamentals & PyTorch",
            issueDate: "Feb 05, 2026",
            skills: "PyTorch, Activation Functions, Tensors",
            grade: "95% Score"
        }
    ];

    // Recent Activity Feed
    const activities = [
        {
            icon: <FaCheckCircle style={{ color: '#10b981' }} />,
            title: "Completed Lesson 15",
            time: "2 hours ago",
            desc: "Prompt Engineering & RAG Pipeline Setup in Generative AI course."
        },
        {
            icon: <FaAward style={{ color: '#f59e0b' }} />,
            title: "Earned 7-Day Streak Badge 🔥",
            time: "Yesterday",
            desc: "Learned consistently for 7 days in a row!"
        },
        {
            icon: <FaBookOpen style={{ color: '#2563eb' }} />,
            title: "Enrolled in New Module",
            time: "3 days ago",
            desc: "OpenCV & YOLOv8 Object Detection."
        }
    ];

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                {/* Top Profile Summary Header */}
                <div className="profile-header-card">
                    <div className="header-glow-1"></div>
                    <div className="user-profile-summary">
                        <div className="profile-avatar-large">
                            {userProfile.name ? userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                        </div>
                        <div className="profile-details">
                            <h1>{userProfile.name}</h1>
                            <p>{userProfile.role}</p>
                            <div className="badge-row">
                                <span className="pro-badge">Pro AI Builder</span>
                                <span className="streak-badge"><FaFire /> 7 Day Streak</span>
                            </div>
                        </div>
                    </div>

                    <div className="header-actions-wrapper">
                        <div className="header-quick-stats">
                            <div className="quick-stat">
                                <h3>3</h3>
                                <p>Courses Enrolled</p>
                            </div>
                            <div className="quick-stat">
                                <h3>24h</h3>
                                <p>Study Hours</p>
                            </div>
                            <div className="quick-stat">
                                <h3>2</h3>
                                <p>Certificates</p>
                            </div>
                        </div>

                        {/*<button
    className="logout-btn"
    onClick={handleLogout}
    title="Sign Out"
>
    <FaSignOutAlt />
    <span>Logout</span>
</button>*/}
                    </div>
                </div>

                {/* Dashboard Tabs Bar */}
                <div className="dashboard-tabs">
                    <button 
                        className={`dash-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <FaUserGraduate /> Learning Overview
                    </button>
                    <button 
                        className={`dash-tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
                        onClick={() => setActiveTab('courses')}
                    >
                        <FaBookOpen /> My Enrolled Courses
                    </button>
                    <button 
                        className={`dash-tab-btn ${activeTab === 'certs' ? 'active' : ''}`}
                        onClick={() => setActiveTab('certs')}
                    >
                        <FaCertificate /> Earned Certificates
                    </button>
                    <button 
                        className={`dash-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <FaCog /> Profile Settings
                    </button>
                </div>

                {/* Tab 1: Learning Overview */}
                {activeTab === 'overview' && (
                    <div className="overview-grid">
                        <div className="main-overview-col">
                            <div className="section-box">
                                <div className="section-box-header">
                                    <h2><FaPlay style={{ color: '#2563eb', fontSize: '16px' }} /> Continue Learning</h2>
                                </div>
                                {enrolledCourses.filter(c => c.progress < 100).map(course => (
                                    <div key={course.id} className="course-progress-card">
                                        <div className="course-info-row">
                                            <h3>{course.title}</h3>
                                            <span>{course.category}</span>
                                        </div>

                                        <div className="progress-bar-bg">
                                            <div className="progress-bar-fill" style={{ width: `${course.progress}%` }}></div>
                                        </div>

                                        <div className="course-bottom-row">
                                            <p>Next: <strong>{course.nextLesson}</strong></p>
                                            <button className="resume-btn">
                                                Resume <FaPlay style={{ fontSize: '10px' }} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Activity Timeline */}
                        <div className="sidebar-overview-col">
                            <div className="section-box">
                                <div className="section-box-header">
                                    <h2><FaClock style={{ color: '#6366f1', fontSize: '16px' }} /> Recent Activity</h2>
                                </div>
                                <div className="activity-list">
                                    {activities.map((act, idx) => (
                                        <div key={idx} className="activity-item">
                                            <div className="activity-icon">{act.icon}</div>
                                            <div className="activity-text">
                                                <h4>{act.title}</h4>
                                                <p>{act.desc}</p>
                                                <span style={{ fontSize: '11px', color: '#94a3b8' }}>{act.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 2: My Enrolled Courses */}
                {activeTab === 'courses' && (
                    <div className="section-box">
                        <div className="section-box-header">
                            <h2>All Enrolled Masterclasses</h2>
                        </div>
                        {enrolledCourses.map(course => (
                            <div key={course.id} className="course-progress-card">
                                <div className="course-info-row">
                                    <div>
                                        <h3>{course.title}</h3>
                                        <p style={{ fontSize: '13px', color: '#64748b' }}>Instructor: {course.instructor}</p>
                                    </div>
                                    <span style={{ 
                                        background: course.progress === 100 ? '#dcfce7' : '#eff6ff',
                                        color: course.progress === 100 ? '#15803d' : '#2563eb'
                                    }}>
                                        {course.progress}% Completed
                                    </span>
                                </div>

                                <div className="progress-bar-bg">
                                    <div 
                                        className="progress-bar-fill" 
                                        style={{ 
                                            width: `${course.progress}%`,
                                            background: course.progress === 100 ? '#10b981' : 'linear-gradient(90deg, #6366f1, #2563eb)'
                                        }}
                                    ></div>
                                </div>

                                <div className="course-bottom-row">
                                    <p>Lessons: {course.completedLessons} / {course.totalLessons} Completed</p>
                                    <button className="resume-btn">
                                        {course.progress === 100 ? 'Review Course' : 'Continue Module'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Tab 3: Earned Certificates */}
                {activeTab === 'certs' && (
                    <div className="section-box">
                        <div className="section-box-header">
                            <h2>Blockchain Verified Certificates</h2>
                        </div>
                        <div className="certs-grid">
                            {certificates.map(cert => (
                                <div key={cert.id} className="cert-card">
                                    <FaAward className="cert-badge-icon" />
                                    <h3>{cert.title}</h3>
                                    <p>Skills Verified: {cert.skills}</p>
                                    <div className="cert-meta">
                                        <div>Issued: {cert.issueDate}</div>
                                        <div>Credential ID: <strong>{cert.id}</strong></div>
                                    </div>
                                    <div className="cert-actions">
                                        <button className="cert-btn download">
                                            <FaDownload /> Download PDF
                                        </button>
                                        <button className="cert-btn share">
                                            <FaShareAlt /> Share
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tab 4: Profile Settings */}
                {activeTab === 'profile' && (
                    <div className="section-box">
                        <div className="section-box-header">
                            <h2>Edit Account Profile & Details</h2>
                        </div>
                        <form onSubmit={handleSaveProfile} className="profile-form-grid">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input 
                                    type="text" 
                                    value={userProfile.name}
                                    onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input 
                                    type="email" 
                                    value={userProfile.email}
                                    onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Headline / Role</label>
                                <input 
                                    type="text" 
                                    value={userProfile.role}
                                    onChange={(e) => setUserProfile({ ...userProfile, role: e.target.value })}
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Bio & Interests</label>
                                <textarea 
                                    rows="4"
                                    value={userProfile.bio}
                                    onChange={(e) => setUserProfile({ ...userProfile, bio: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>GitHub URL</label>
                                <input 
                                    type="text" 
                                    value={userProfile.github}
                                    onChange={(e) => setUserProfile({ ...userProfile, github: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>LinkedIn URL</label>
                                <input 
                                    type="text" 
                                    value={userProfile.linkedin}
                                    onChange={(e) => setUserProfile({ ...userProfile, linkedin: e.target.value })}
                                />
                            </div>

                            <div className="form-actions full-width">
                                <button type="submit" className="save-btn">
                                    <FaSave /> Save Changes
                                </button>
                                {savedMsg && <span className="save-success-msg">Profile updated successfully!</span>}
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;