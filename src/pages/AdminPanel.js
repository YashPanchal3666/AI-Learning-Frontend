import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/adminPanel.css';
import {
    adminStats, adminUsersData, adminAnalyticsData, adminTicketsData
} from '../data/adminMockData';
import courseDetailData from '../data/courseDetailData';
import {
    FaUsers, FaBook, FaGraduationCap, FaDollarSign,
    FaChartBar, FaTicketAlt, FaShieldAlt,
    FaPlus, FaEdit, FaTrash, FaSearch, FaExternalLinkAlt,
    FaBell, FaUserCog, FaSync, FaSignOutAlt
} from 'react-icons/fa';

const API_BASE_URL = ' https://ai-learning-backend-o3m1.onrender.com/api';

const AdminPanel = () => {
    const navigate = useNavigate();

    // Verify Admin Authorization
    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            const currentUserStr = localStorage.getItem('currentUser');
            const sessionAdmin = sessionStorage.getItem('admin_authenticated');
            
            if (!token || !currentUserStr) {
                navigate('/login', { replace: true });
                return;
            }

            const currentUser = JSON.parse(currentUserStr);
            const role = (currentUser.role || '').toLowerCase();
            const isAdmin = role === 'superadmin' || role === 'admin' || sessionAdmin === 'true';

            if (!isAdmin) {
                navigate('/home', { replace: true });
            }
        } catch (e) {
            navigate('/home', { replace: true });
        }
    }, [navigate]);

    // Entry Animation State
    const [showSplash, setShowSplash] = useState(true);
    const [splashPhase, setSplashPhase] = useState('enter'); // 'enter' | 'phase2' | 'phase3' | 'exit'
    const [statusText, setStatusText] = useState('Initializing secure connection...');

    // Active Sidebar Tab State
    const [activeTab, setActiveTab] = useState('overview');

    // Data States
    const [users, setUsers] = useState(adminUsersData);
    const [tickets, setTickets] = useState(() => {
        const savedTickets = localStorage.getItem('admin_tickets');
        if (savedTickets) {
            try {
                const parsed = JSON.parse(savedTickets);
                return [...parsed, ...adminTicketsData];
            } catch (e) { }
        }
        return adminTicketsData;
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [readNotificationIds, setReadNotificationIds] = useState(() => {
        const saved = localStorage.getItem('admin_read_notifications');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { }
        }
        return [];
    });

    const markNotificationAsRead = (ticketId) => {
        setReadNotificationIds(prev => {
            if (!prev.includes(ticketId)) {
                const updated = [...prev, ticketId];
                localStorage.setItem('admin_read_notifications', JSON.stringify(updated));
                return updated;
            }
            return prev;
        });
    };

    const markAllNotificationsAsRead = () => {
        const allUnresolvedIds = tickets.filter(t => t.status !== 'Resolved').map(t => t.id);
        const updated = Array.from(new Set([...readNotificationIds, ...allUnresolvedIds]));
        setReadNotificationIds(updated);
        localStorage.setItem('admin_read_notifications', JSON.stringify(updated));
    };
    const [courses, setCourses] = useState(() => {
        const savedCourses = localStorage.getItem('admin_courses');
        if (savedCourses) {
            try { return JSON.parse(savedCourses); } catch (e) { }
        }
        return Object.keys(courseDetailData).map(key => ({
            id: key,
            ...courseDetailData[key]
        }));
    });

    // Save courses to localStorage whenever changed
    useEffect(() => {
        localStorage.setItem('admin_courses', JSON.stringify(courses));
    }, [courses]);

    // Backend Users State (Sync from MongoDB if backend running)
    const [backendConnected, setBackendConnected] = useState(false);
    const [loadingUsers, setLoadingUsers] = useState(false);

    // Fetch users from MongoDB Backend
    const fetchMongoUsers = async () => {
        setLoadingUsers(true);
        try {
            const res = await axios.get(`${API_BASE_URL}/getUser`);
            if (res.data && res.data.data) {
                const mongoList = res.data.data.map(u => ({
                    id: u._id || u.id,
                    name: u.name,
                    email: u.email,
                    phone: u.phone || 'N/A',
                    address: u.address || 'N/A',
                    joined: u.createdAt ? new Date(u.createdAt).toISOString().split('T')[0] : '2026-03-15',
                    coursesEnrolled: 1,
                    spent: '$49.99',
                    status: 'Active',
                    isMongo: true
                }));
                if (mongoList.length > 0) {
                    setUsers(mongoList);
                    setBackendConnected(true);
                }
            }
        } catch (err) {
            console.log('MongoDB backend not reachable, using local users storage:', err.message);
            setBackendConnected(false);
        } finally {
            setLoadingUsers(false);
        }
    };

    useEffect(() => {
        fetchMongoUsers();
    }, []);

    // Entry animation timer — 5 second cinematic experience
    useEffect(() => {
        const t1 = setTimeout(() => {
            setSplashPhase('phase2');
            setStatusText('Verifying admin privileges...');
        }, 1500);
        const t2 = setTimeout(() => {
            setSplashPhase('phase3');
            setStatusText('Loading dashboard modules...');
        }, 3000);
        const t3 = setTimeout(() => {
            setStatusText('Access granted ✓');
        }, 4000);
        const t4 = setTimeout(() => setSplashPhase('exit'), 4500);
        const t5 = setTimeout(() => setShowSplash(false), 5400);
        return () => { [t1, t2, t3, t4, t5].forEach(clearTimeout); };
    }, []);

    // ==================== USER MODAL STATE ====================
    const [userModalOpen, setUserModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null); // null = Add, obj = Edit
    const [userForm, setUserForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        status: 'Active'
    });

    const openAddUserModal = () => {
        setEditingUser(null);
        setUserForm({
            name: '',
            email: '',
            phone: '',
            address: '',
            password: 'password123',
            status: 'Active'
        });
        setUserModalOpen(true);
    };

    const openEditUserModal = (user) => {
        setEditingUser(user);
        setUserForm({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            address: user.address || '',
            password: '',
            status: user.status || 'Active'
        });
        setUserModalOpen(true);
    };

    const handleSaveUser = async (e) => {
        e.preventDefault();
        if (!userForm.name || !userForm.email) {
            alert('Name and Email are required!');
            return;
        }

        if (editingUser) {
            // EDIT / UPDATE USER
            if (editingUser.isMongo && backendConnected) {
                try {
                    await axios.put(`${API_BASE_URL}/updateUser/${editingUser.id}`, {
                        name: userForm.name,
                        email: userForm.email,
                        phone: userForm.phone,
                        address: userForm.address
                    });
                } catch (err) {
                    console.error('Mongo Update error:', err);
                }
            }
            setUsers(prev => prev.map(u =>
                u.id === editingUser.id ? {
                    ...u,
                    name: userForm.name,
                    email: userForm.email,
                    phone: userForm.phone,
                    address: userForm.address,
                    status: userForm.status
                } : u
            ));
        } else {
            // ADD NEW USER
            let newId = 'usr-' + Date.now();
            if (backendConnected) {
                try {
                    const res = await axios.post(`${API_BASE_URL}/addUser`, {
                        name: userForm.name,
                        email: userForm.email,
                        phone: userForm.phone || 'N/A',
                        address: userForm.address || 'N/A',
                        password: userForm.password || '123456'
                    });
                    if (res.data?.data?._id) {
                        newId = res.data.data._id;
                    }
                } catch (err) {
                    console.error('Mongo Add error:', err);
                }
            }

            const newUserObj = {
                id: newId,
                name: userForm.name,
                email: userForm.email,
                phone: userForm.phone,
                address: userForm.address,
                joined: new Date().toISOString().split('T')[0],
                coursesEnrolled: 0,
                spent: '$0.00',
                status: userForm.status,
                isMongo: backendConnected
            };
            setUsers(prev => [newUserObj, ...prev]);
        }
        setUserModalOpen(false);
    };

    const handleDeleteUser = async (userId, isMongo) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        if (isMongo && backendConnected) {
            try {
                await axios.delete(`${API_BASE_URL}/deleteUser/${userId}`);
            } catch (err) {
                console.error('Mongo Delete error:', err);
            }
        }
        setUsers(prev => prev.filter(u => u.id !== userId));
    };

    // Toggle Block User
    const toggleUserStatus = (userId) => {
        setUsers(users.map(u =>
            u.id === userId ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' } : u
        ));
    };

    // YouTube URL to Embed converter helper
    const formatYouTubeEmbed = (url) => {
        if (!url || typeof url !== 'string') return '';
        const trimmed = url.trim();
        if (trimmed.includes('/embed/')) return trimmed;

        // Pattern 1: youtu.be/VIDEO_ID
        const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
        if (shortMatch && shortMatch[1]) {
            return `https://www.youtube.com/embed/${shortMatch[1]}`;
        }

        // Pattern 2: youtube.com/watch?v=VIDEO_ID
        const longMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]+)/);
        if (longMatch && longMatch[1]) {
            return `https://www.youtube.com/embed/${longMatch[1]}`;
        }

        // Pattern 3: youtube.com/shorts/VIDEO_ID
        const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
        if (shortsMatch && shortsMatch[1]) {
            return `https://www.youtube.com/embed/${shortsMatch[1]}`;
        }

        return trimmed;
    };

    // ==================== COURSE MODAL STATE ====================
    const [courseModalOpen, setCourseModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null); // null = Add, obj = Edit
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [courseForm, setCourseForm] = useState({
        title: '',
        category: 'AI Tools',
        instructor: '',
        isPaid: true,
        price: '₹499',
        inrPrice: 499,
        originalPrice: '₹1,999',
        rating: 4.8,
        duration: '10 Hours',
        lessonsCount: '15 Lessons',
        level: 'All Levels',
        tag: 'Premium',
        image: '',
        desc: '',
        includesCertificate: true,
        includesSourceCode: true,
        includesQuizzes: true,
        includesDoubtSupport: true,
        chapters: [
            {
                title: 'Module 1: Introduction & Fundamentals',
                lessons: [
                    { name: '1. Welcome & Overview', duration: '10 min', videoUrl: '' },
                    { name: '2. Architecture & Setup', duration: '20 min', videoUrl: '' }
                ]
            }
        ]
    });

    // Cloudinary file upload handler
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setUploadingImage(true);
        setUploadSuccess(false);

        try {
            const res = await axios.post(`${API_BASE_URL}/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data && res.data.url) {
                setCourseForm(prev => ({
                    ...prev,
                    image: res.data.url
                }));
                setUploadSuccess(true);
            }
        } catch (err) {
            console.error('Cloudinary upload error:', err);
            alert('Cloudinary upload failed: ' + (err.response?.data?.message || err.message));
        } finally {
            setUploadingImage(false);
        }
    };

    const categoryDefaultImages = {
        'AI Tools': 'https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=800&q=80',
        'Technology': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
        'Languages': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
        'Communication': 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80'
    };

    const openAddCourseModal = () => {
        setEditingCourse(null);
        setCourseForm({
            title: '',
            category: 'AI Tools',
            instructor: 'Dr. Andrew Ng',
            isPaid: true,
            price: '₹499',
            inrPrice: 499,
            originalPrice: '₹1,999',
            rating: 4.8,
            duration: '10 Hours',
            lessonsCount: '15 Lessons',
            level: 'All Levels',
            tag: 'Premium',
            image: '',
            desc: 'Hands-on project based course with real-world applications and certificate.',
            includesCertificate: true,
            includesSourceCode: true,
            includesQuizzes: true,
            includesDoubtSupport: true,
            chapters: [
                {
                    title: 'Module 1: Getting Started',
                    lessons: [
                        { name: '1. Welcome & Course Overview', duration: '10 min', videoUrl: '' },
                        { name: '2. Setup and Environment', duration: '20 min', videoUrl: '' }
                    ]
                }
            ]
        });
        setCourseModalOpen(true);
    };

    const openEditCourseModal = (course) => {
        setEditingCourse(course);
        const isPaidVal = course.isPaid !== undefined ? course.isPaid : (course.price && !String(course.price).toLowerCase().includes('free'));
        
        const existingChapters = (course.chapters && course.chapters.length > 0)
            ? course.chapters
            : [
                {
                    title: 'Module 1: Getting Started',
                    lessons: [
                        { name: '1. Introduction', duration: '10 min', videoUrl: '' }
                    ]
                }
            ];

        setCourseForm({
            title: course.title || '',
            category: course.category || 'AI Tools',
            instructor: course.instructor || '',
            isPaid: isPaidVal,
            price: course.price || (isPaidVal ? '₹499' : 'Free'),
            inrPrice: course.inrPrice || 499,
            originalPrice: course.originalPrice || '₹1,999',
            rating: course.rating || 4.8,
            duration: course.duration || '10 Hours',
            lessonsCount: course.lessonsCount || '15 Lessons',
            level: course.level || 'All Levels',
            tag: course.tag || (isPaidVal ? 'Premium' : 'Free'),
            image: course.image || '',
            desc: course.desc || '',
            includesCertificate: course.includesCertificate !== undefined ? course.includesCertificate : isPaidVal,
            includesSourceCode: course.includesSourceCode !== undefined ? course.includesSourceCode : isPaidVal,
            includesQuizzes: course.includesQuizzes !== undefined ? course.includesQuizzes : isPaidVal,
            includesDoubtSupport: course.includesDoubtSupport !== undefined ? course.includesDoubtSupport : isPaidVal,
            chapters: existingChapters
        });
        setCourseModalOpen(true);
    };

    // Helper to add module
    const handleAddModule = () => {
        setCourseForm(prev => ({
            ...prev,
            chapters: [
                ...prev.chapters,
                {
                    title: `Module ${prev.chapters.length + 1}: New Module`,
                    lessons: [
                        { name: `Lesson 1`, duration: '15 min', videoUrl: '' }
                    ]
                }
            ]
        }));
    };

    // Helper to remove module
    const handleRemoveModule = (mIdx) => {
        setCourseForm(prev => ({
            ...prev,
            chapters: prev.chapters.filter((_, idx) => idx !== mIdx)
        }));
    };

    // Helper to add lesson to a module
    const handleAddLesson = (mIdx) => {
        setCourseForm(prev => {
            const updatedChapters = [...prev.chapters];
            const currentLessons = updatedChapters[mIdx].lessons || [];
            updatedChapters[mIdx] = {
                ...updatedChapters[mIdx],
                lessons: [
                    ...currentLessons,
                    { name: `Lesson ${currentLessons.length + 1}`, duration: '15 min', videoUrl: '' }
                ]
            };
            return { ...prev, chapters: updatedChapters };
        });
    };

    // Helper to remove lesson
    const handleRemoveLesson = (mIdx, lIdx) => {
        setCourseForm(prev => {
            const updatedChapters = [...prev.chapters];
            updatedChapters[mIdx] = {
                ...updatedChapters[mIdx],
                lessons: updatedChapters[mIdx].lessons.filter((_, idx) => idx !== lIdx)
            };
            return { ...prev, chapters: updatedChapters };
        });
    };

    // Helper to update lesson field
    const handleLessonChange = (mIdx, lIdx, field, val) => {
        setCourseForm(prev => {
            const updatedChapters = [...prev.chapters];
            const updatedLessons = [...updatedChapters[mIdx].lessons];
            updatedLessons[lIdx] = {
                ...updatedLessons[lIdx],
                [field]: val
            };
            updatedChapters[mIdx] = {
                ...updatedChapters[mIdx],
                lessons: updatedLessons
            };
            return { ...prev, chapters: updatedChapters };
        });
    };

    // Helper to update module title
    const handleModuleTitleChange = (mIdx, title) => {
        setCourseForm(prev => {
            const updatedChapters = [...prev.chapters];
            updatedChapters[mIdx] = { ...updatedChapters[mIdx], title };
            return { ...prev, chapters: updatedChapters };
        });
    };

    const handleSaveCourse = (e) => {
        e.preventDefault();
        if (!courseForm.title || !courseForm.instructor) {
            alert('Title and Instructor are required!');
            return;
        }

        const resolvedImage = courseForm.image && courseForm.image.trim() !== ''
            ? courseForm.image.trim()
            : (categoryDefaultImages[courseForm.category] || categoryDefaultImages['AI Tools']);

        const calculatedPrice = courseForm.isPaid
            ? (courseForm.price.startsWith('₹') ? courseForm.price : `₹${courseForm.inrPrice}`)
            : 'Free';

        // Auto-format all YouTube links to embed format
        const formattedChapters = (courseForm.chapters || []).map(ch => ({
            ...ch,
            lessons: (ch.lessons || []).map(l => ({
                ...l,
                videoUrl: formatYouTubeEmbed(l.videoUrl)
            }))
        }));

        const totalLessonsCount = formattedChapters.reduce((acc, ch) => acc + (ch.lessons?.length || 0), 0);

        const updatedCourseData = {
            ...courseForm,
            price: calculatedPrice,
            image: resolvedImage,
            tag: courseForm.tag || (courseForm.isPaid ? 'Premium' : 'Free'),
            chapters: formattedChapters,
            lessonsCount: `${totalLessonsCount} Lessons`
        };

        if (editingCourse) {
            // EDIT / UPDATE COURSE
            setCourses(prev => prev.map(c =>
                c.id === editingCourse.id ? {
                    ...c,
                    ...updatedCourseData
                } : c
            ));
        } else {
            // ADD NEW COURSE
            const newCourseId = 'course-' + Date.now();
            const newCourseObj = {
                id: newCourseId,
                ...updatedCourseData,
                reviews: '1,200',
                students: '100 Enrolled',
                outcomes: ['Practical Industry Skills', 'Hands-on Projects', courseForm.includesCertificate ? 'Verifiable Certificate' : 'Course Completion Badge']
            };
            setCourses(prev => [newCourseObj, ...prev]);
        }
        setCourseModalOpen(false);
    };

    const handleDeleteCourse = (courseId) => {
        if (!window.confirm('Are you sure you want to delete this course from the catalog?')) return;
        setCourses(prev => prev.filter(c => c.id !== courseId));
    };

    // (Auth will be handled by JWT in the future)

    // Resolve Ticket
    const resolveTicket = (ticketId) => {
        setTickets(prev => {
            const updated = prev.map(t =>
                t.id === ticketId ? { ...t, status: 'Resolved' } : t
            );
            // Save to localStorage so it stays resolved
            localStorage.setItem('admin_tickets', JSON.stringify(updated));
            return updated;
        });
        markNotificationAsRead(ticketId);
    };

    // Logout Handler
    const handleLogout = () => {
        if (window.confirm('Are you sure you want to end this admin session?')) {
            // Clear any admin-specific local data
            localStorage.removeItem('admin_read_notifications');
            // Redirect to home (or login page when JWT is ready)
            window.location.href = '/logout';
        }
    };

    // Filter Users
    const filteredUsers = users.filter(u =>
        (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (u.status && u.status.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Filter Courses
    const filteredCourses = courses.filter(c =>
        (c.title && c.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (c.category && c.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (c.instructor && c.instructor.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Filter Tickets
    const filteredTickets = tickets.filter(t =>
        t.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.priority.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ==================== ENTRY SPLASH ANIMATION ====================
    if (showSplash) {
        return (
            <div className={`admin-splash-screen ${splashPhase}`}>
                {/* Animated Background Elements */}
                <div className="splash-bg-grid" />
                <div className="splash-scan-line" />
                <div className="splash-radial-glow" />

                {/* Floating Hex Particles */}
                <div className="splash-hex-particles">
                    {[...Array(20)].map((_, i) => (
                        <span key={i} className="hex-float" style={{
                            '--x': `${Math.random() * 100}%`,
                            '--y': `${Math.random() * 100}%`,
                            '--size': `${4 + Math.random() * 8}px`,
                            '--duration': `${3 + Math.random() * 4}s`,
                            '--delay': `${Math.random() * 2}s`,
                            '--opacity': `${0.1 + Math.random() * 0.3}`
                        }} />
                    ))}
                </div>

                <div className="splash-content">
                    {/* Triple Ring Shield */}
                    <div className="splash-shield-container">
                        <div className="splash-ring splash-ring-outer" />
                        <div className="splash-ring splash-ring-middle" />
                        <div className="splash-ring splash-ring-inner" />
                        <div className="splash-shield-core">
                            <FaShieldAlt />
                        </div>
                        {/* Orbiting dots */}
                        {[...Array(8)].map((_, i) => (
                            <span key={i} className="splash-orbit-dot" style={{
                                '--orbit-angle': `${i * 45}deg`,
                                '--orbit-delay': `${i * 0.15}s`
                            }} />
                        ))}
                    </div>

                    {/* Title with letter reveal */}
                    <h1 className="splash-title">
                        {'AILEARN'.split('').map((char, i) => (
                            <span key={i} className="splash-letter" style={{ '--i': i }}>
                                {char === 'A' || char === 'I' ? (
                                    <span className="splash-letter-accent">{char}</span>
                                ) : char}
                            </span>
                        ))}
                    </h1>

                    <div className="splash-divider">
                        <span className="splash-divider-line" />
                        <span className="splash-divider-diamond">◆</span>
                        <span className="splash-divider-line" />
                    </div>

                    <p className="splash-subtitle">ADMIN COMMAND CENTER</p>

                    {/* Status Text */}
                    <div className="splash-status">
                        <span className="splash-status-dot" />
                        <span className="splash-status-text">{statusText}</span>
                    </div>

                    {/* Premium Loading Bar */}
                    <div className="splash-loading-track">
                        <div className="splash-loading-fill" />
                        <div className="splash-loading-glow" />
                    </div>

                    {/* Bottom Stats Counter */}
                    <div className="splash-stats-row">
                        <div className="splash-stat-item">
                            <span className="splash-stat-value">256-bit</span>
                            <span className="splash-stat-label">Encryption</span>
                        </div>
                        <div className="splash-stat-divider" />
                        <div className="splash-stat-item">
                            <span className="splash-stat-value">Admin</span>
                            <span className="splash-stat-label">Access Level</span>
                        </div>
                        <div className="splash-stat-divider" />
                        <div className="splash-stat-item">
                            <span className="splash-stat-value">Secure</span>
                            <span className="splash-stat-label">Connection</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page-container">
            <div className="admin-layout">
                {/* Left Sidebar */}
                <div className="admin-sidebar">
                    <div>
                        <div className="sidebar-brand">
                            <FaShieldAlt style={{ color: '#6366f1' }} />
                            <span>AILearn Admin</span>
                            <span className="sidebar-brand-badge">Dev</span>
                        </div>

                        <div className="sidebar-menu">
                            <button
                                className={`menu-item ${activeTab === 'overview' ? 'active' : ''}`}
                                onClick={() => setActiveTab('overview')}
                            >
                                <FaChartBar /> Dashboard Overview
                            </button>

                            <button
                                className={`menu-item ${activeTab === 'users' ? 'active' : ''}`}
                                onClick={() => setActiveTab('users')}
                            >
                                <FaUsers /> User Management ({users.length})
                            </button>

                            <button
                                className={`menu-item ${activeTab === 'courses' ? 'active' : ''}`}
                                onClick={() => setActiveTab('courses')}
                            >
                                <FaBook /> Course Catalog ({courses.length})
                            </button>

                            <button
                                className={`menu-item ${activeTab === 'analytics' ? 'active' : ''}`}
                                onClick={() => setActiveTab('analytics')}
                            >
                                <FaGraduationCap /> Enrollment Analytics
                            </button>

                            <button
                                className={`menu-item ${activeTab === 'tickets' ? 'active' : ''}`}
                                onClick={() => setActiveTab('tickets')}
                            >
                                <FaTicketAlt /> Support Tickets ({tickets.filter(t => t.status !== 'Resolved').length})
                            </button>
                        </div>
                    </div>

                    {/* Professional Logout Section */}
                    <div className="sidebar-bottom">
                        <button className="btn-sidebar-logout" onClick={handleLogout}>
                            <FaSignOutAlt />
                            <span>Logout Session</span>
                        </button>
                    </div>
                </div>

                {/* Main Content Workspace */}
                <div className="admin-main-content">
                    {/* Top Admin Header Bar */}
                    <div className="admin-topbar">
                        <div className="admin-topbar-left">
                            <div className="admin-search-box">
                                <FaSearch className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search users, courses, tickets..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="admin-topbar-right">
                            <Link to="/home" className="btn-live-site" target="_blank" title="View Live Student Portal">
                                <span>View Live Site</span>
                                <FaExternalLinkAlt />
                            </Link>

                            <div style={{ position: 'relative' }}>
                                {(() => {
                                    // 1. Only UNRESOLVED tickets appear in notifications (Resolved ones are excluded)
                                    const unresolvedTickets = tickets.filter(t => t.status !== 'Resolved');
                                    // 2. Unread count = Unresolved tickets that haven't been clicked/read yet
                                    const unreadCount = unresolvedTickets.filter(t => !readNotificationIds.includes(t.id)).length;

                                    return (
                                        <>
                                            <div
                                                className="topbar-icon-btn"
                                                title="View Notifications"
                                                onClick={() => setShowNotifications(!showNotifications)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <FaBell />
                                                {unreadCount > 0 && (
                                                    <span className="notification-badge">
                                                        {unreadCount}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Notification Dropdown Menu */}
                                            {showNotifications && (
                                                <div className="notification-dropdown">
                                                    <div className="notification-header">
                                                        <h4>
                                                            <FaBell style={{ color: '#6366f1' }} />
                                                            Notifications
                                                        </h4>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            {unreadCount > 0 && (
                                                                <span className="notification-count-pill">
                                                                    {unreadCount} New
                                                                </span>
                                                            )}
                                                            {unreadCount > 0 && (
                                                                <button
                                                                    onClick={markAllNotificationsAsRead}
                                                                    style={{
                                                                        background: 'none',
                                                                        border: 'none',
                                                                        color: '#6366f1',
                                                                        fontSize: '11px',
                                                                        fontWeight: 600,
                                                                        cursor: 'pointer',
                                                                        padding: '2px 4px'
                                                                    }}
                                                                    title="Mark all as read"
                                                                >
                                                                    Clear All
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="notification-list">
                                                        {unresolvedTickets.length === 0 ? (
                                                            <div style={{ padding: '24px 16px', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
                                                                🎉 All caught up! No unresolved tickets.
                                                            </div>
                                                        ) : (
                                                            unresolvedTickets.slice(0, 6).map((t, idx) => {
                                                                const isUnread = !readNotificationIds.includes(t.id);
                                                                return (
                                                                    <div
                                                                        key={idx}
                                                                        className={`notification-item ${isUnread ? 'unread' : ''}`}
                                                                        style={{
                                                                            background: isUnread ? '#eff6ff' : '#ffffff',
                                                                            borderLeft: isUnread ? '3px solid #2563eb' : '3px solid transparent'
                                                                        }}
                                                                        onClick={() => {
                                                                            markNotificationAsRead(t.id);
                                                                            setActiveTab('tickets');
                                                                            setShowNotifications(false);
                                                                        }}
                                                                        title="Click to view and mark as read"
                                                                    >
                                                                        <div className="notification-icon-wrap" style={{ background: isUnread ? '#dbeafe' : '#f1f5f9', color: isUnread ? '#1d4ed8' : '#64748b' }}>
                                                                            <FaTicketAlt />
                                                                        </div>
                                                                        <div className="notification-info">
                                                                            <div className="notification-title" style={{ fontWeight: isUnread ? 700 : 500 }}>
                                                                                {t.student} {isUnread && <span style={{ color: '#2563eb', fontSize: '10px' }}>●</span>}
                                                                            </div>
                                                                            <div className="notification-desc">{t.subject}</div>
                                                                            <div className="notification-time">
                                                                                {t.date || 'Today'} • <span style={{ color: '#dc2626', fontWeight: 600 }}>{t.status}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })
                                                        )}
                                                    </div>

                                                    <div className="notification-footer">
                                                        <button onClick={() => { setActiveTab('tickets'); setShowNotifications(false); }}>
                                                            View All Support Tickets →
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    );
                                })()}
                            </div>

                            <div className="admin-profile-pill">
                                <div className="admin-avatar">
                                    <FaUserCog />
                                </div>
                                <div className="admin-profile-info">
                                    <span className="admin-name">Developer Admin</span>
                                    <span className="admin-role">Superuser</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section Page Title Header */}
                    <div className="admin-content-header">
                        <div>
                            <h1>
                                {activeTab === 'overview' && '📊 Dashboard Overview'}
                                {activeTab === 'users' && '👥 Student & User Management'}
                                {activeTab === 'courses' && '📚 Course Catalog & Content'}
                                {activeTab === 'analytics' && '📈 Enrollment & Revenue Analytics'}
                                {activeTab === 'tickets' && '📩 Support Tickets & Enquiries'}
                            </h1>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {backendConnected && (
                                <span style={{ background: '#ecfdf5', color: '#059669', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', border: '1px solid #a7f3d0' }}>
                                    ⚡ MongoDB Atlas Live
                                </span>
                            )}
                            <span className="admin-dev-badge">🟢 Authorized Dev Session</span>
                        </div>
                    </div>

                    {/* OVERVIEW TAB */}
                    {activeTab === 'overview' && (
                        <div>
                            <div className="admin-stats-grid">
                                <div className="admin-stat-card">
                                    <div className="stat-icon-wrapper" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#6366f1' }}>
                                        <FaUsers />
                                    </div>
                                    <div className="stat-info">
                                        <span>Total Registered Users</span>
                                        <h3>{users.length}</h3>
                                        <span className="stat-change">{adminStats.monthlyGrowth} this month</span>
                                    </div>
                                </div>

                                <div className="admin-stat-card">
                                    <div className="stat-icon-wrapper" style={{ background: 'rgba(37, 99, 235, 0.15)', color: '#2563eb' }}>
                                        <FaBook />
                                    </div>
                                    <div className="stat-info">
                                        <span>Active Courses</span>
                                        <h3>{courses.length}</h3>
                                        <span className="stat-change">Across 4 Categories</span>
                                    </div>
                                </div>

                                <div className="admin-stat-card">
                                    <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                                        <FaGraduationCap />
                                    </div>
                                    <div className="stat-info">
                                        <span>Total Enrollments</span>
                                        <h3>{adminStats.totalEnrollments.toLocaleString()}</h3>
                                        <span className="stat-change">+2.4k this week</span>
                                    </div>
                                </div>

                                <div className="admin-stat-card">
                                    <div className="stat-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
                                        <FaDollarSign />
                                    </div>
                                    <div className="stat-info">
                                        <span>Gross Platform Revenue</span>
                                        <h3>{adminStats.totalRevenue}</h3>
                                        <span className="stat-change">Q1 2026</span>
                                    </div>
                                </div>
                            </div>

                            <div className="analytics-grid">
                                <div className="admin-section-card">
                                    <h2>Top Performing Courses</h2>
                                    <div className="admin-table-wrapper">
                                        <table className="admin-table">
                                            <thead>
                                                <tr>
                                                    <th>Course Title</th>
                                                    <th>Enrolled</th>
                                                    <th>Completion</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {adminAnalyticsData.topPerformingCourses.map((c, i) => (
                                                    <tr key={i}>
                                                        <td style={{ fontWeight: 600 }}>{c.title}</td>
                                                        <td>{c.enrolled}</td>
                                                        <td style={{ color: '#10b981', fontWeight: 700 }}>{c.completion}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="admin-section-card">
                                    <h2>Recent Open Support Tickets</h2>
                                    <div className="admin-table-wrapper">
                                        <table className="admin-table">
                                            <thead>
                                                <tr>
                                                    <th>Student</th>
                                                    <th>Subject</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tickets.slice(0, 4).map((t, i) => (
                                                    <tr key={i}>
                                                        <td style={{ fontWeight: 600 }}>{t.student}</td>
                                                        <td style={{ fontSize: '13px' }}>{t.subject}</td>
                                                        <td>
                                                            <span className={`badge-status status-${t.status.toLowerCase().replace(' ', '')}`}>
                                                                {t.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* USERS TAB - WITH FULL CRUD */}
                    {activeTab === 'users' && (
                        <div className="admin-section-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                                <div>
                                    <h2>Platform Users ({filteredUsers.length})</h2>
                                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '2px' }}>
                                        Add, view, edit details, or remove registered students.
                                    </p>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button
                                        className="btn-modal-cancel"
                                        onClick={fetchMongoUsers}
                                        title="Refresh users from MongoDB"
                                        style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                                    >
                                        <FaSync className={loadingUsers ? 'spin' : ''} /> Refresh
                                    </button>
                                    <button
                                        className="btn-modal-submit"
                                        onClick={openAddUserModal}
                                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                                    >
                                        <FaPlus /> Add New User
                                    </button>
                                </div>
                            </div>

                            <div className="admin-table-wrapper">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>User Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Joined Date</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.length === 0 ? (
                                            <tr>
                                                <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                                                    No users found matching "{searchTerm}"
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredUsers.map(user => (
                                                <tr key={user.id}>
                                                    <td style={{ color: '#6366f1', fontSize: '11px', fontFamily: 'monospace' }}>
                                                        {typeof user.id === 'string' && user.id.length > 12 ? `${user.id.substring(0, 10)}...` : user.id}
                                                    </td>
                                                    <td style={{ fontWeight: 700, color: '#0f172a' }}>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.phone || 'N/A'}</td>
                                                    <td>{user.joined}</td>
                                                    <td>
                                                        <span className={`badge-status ${user.status === 'Active' ? 'status-active' : 'status-blocked'}`}>
                                                            {user.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div style={{ display: 'flex', gap: '6px' }}>
                                                            <button
                                                                className="admin-btn-icon"
                                                                style={{ background: '#f1f5f9', color: '#2563eb' }}
                                                                onClick={() => openEditUserModal(user)}
                                                                title="Edit User"
                                                            >
                                                                <FaEdit />
                                                            </button>
                                                            <button
                                                                className="admin-btn-icon btn-delete"
                                                                onClick={() => handleDeleteUser(user.id, user.isMongo)}
                                                                title="Delete User"
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                            <button
                                                                className="admin-btn-sm"
                                                                style={{
                                                                    background: user.status === 'Active' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                                                    color: user.status === 'Active' ? '#dc2626' : '#059669',
                                                                    fontSize: '11px',
                                                                    padding: '4px 8px'
                                                                }}
                                                                onClick={() => toggleUserStatus(user.id)}
                                                            >
                                                                {user.status === 'Active' ? 'Block' : 'Unblock'}
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* COURSES TAB - WITH FULL CRUD */}
                    {activeTab === 'courses' && (
                        <div className="admin-section-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                                <div>
                                    <h2>Course Catalog Management ({filteredCourses.length})</h2>
                                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '2px' }}>
                                        Create new courses, edit pricing & curriculum, or delete offerings.
                                    </p>
                                </div>
                                <button
                                    className="btn-modal-submit"
                                    onClick={openAddCourseModal}
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                                >
                                    <FaPlus /> Add New Course
                                </button>
                            </div>

                            <div className="admin-table-wrapper">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Category</th>
                                            <th>Instructor</th>
                                            <th>Pricing Type</th>
                                            <th>Included Perks</th>
                                            <th>Rating</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredCourses.length === 0 ? (
                                            <tr>
                                                <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                                                    No courses found matching "{searchTerm}"
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredCourses.map(course => {
                                                const isPaidCourse = course.isPaid !== undefined
                                                    ? course.isPaid
                                                    : (course.price && !String(course.price).toLowerCase().includes('free'));

                                                return (
                                                    <tr key={course.id}>
                                                        <td style={{ color: '#6366f1', fontWeight: 700, fontSize: '12px' }}>{course.id}</td>
                                                        <td style={{ fontWeight: 700, color: '#0f172a' }}>{course.title}</td>
                                                        <td>
                                                            <span style={{ background: '#f1f5f9', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
                                                                {course.category}
                                                            </span>
                                                        </td>
                                                        <td>{course.instructor}</td>
                                                        <td>
                                                            {isPaidCourse ? (
                                                                <span style={{
                                                                    background: '#fef3c7',
                                                                    color: '#b45309',
                                                                    fontWeight: 700,
                                                                    fontSize: '12px',
                                                                    padding: '4px 8px',
                                                                    borderRadius: '6px',
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    gap: '4px'
                                                                }}>
                                                                    👑 Paid ({course.price || '₹499'})
                                                                </span>
                                                            ) : (
                                                                <span style={{
                                                                    background: '#ecfdf5',
                                                                    color: '#047857',
                                                                    fontWeight: 700,
                                                                    fontSize: '12px',
                                                                    padding: '4px 8px',
                                                                    borderRadius: '6px',
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    gap: '4px'
                                                                }}>
                                                                    🟢 Free
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td>
                                                            <div style={{ display: 'flex', gap: '6px', fontSize: '14px' }}>
                                                                <span title={course.includesCertificate !== false ? "Includes Certificate" : "No Certificate"} style={{ opacity: course.includesCertificate !== false ? 1 : 0.25 }}>📜</span>
                                                                <span title={course.includesSourceCode !== false ? "Includes Source Code & Notes" : "No Source Code"} style={{ opacity: course.includesSourceCode !== false ? 1 : 0.25 }}>💻</span>
                                                                <span title={course.includesQuizzes !== false ? "Includes Quizzes" : "No Quizzes"} style={{ opacity: course.includesQuizzes !== false ? 1 : 0.25 }}>📝</span>
                                                            </div>
                                                        </td>
                                                        <td style={{ color: '#f59e0b', fontWeight: 700 }}>⭐ {course.rating}</td>
                                                        <td>
                                                            <div style={{ display: 'flex', gap: '6px' }}>
                                                                <Link
                                                                    to={`/learn/${course.id}?admin=true`}
                                                                    target="_blank"
                                                                    className="admin-btn-icon"
                                                                    style={{ background: '#ecfdf5', color: '#047857' }}
                                                                    title="Open Full Course in Admin Mode (All Content Unlocked)"
                                                                >
                                                                    <FaGraduationCap />
                                                                </Link>
                                                                <Link
                                                                    to={`/course/${course.id}`}
                                                                    target="_blank"
                                                                    className="admin-btn-icon"
                                                                    style={{ background: '#f1f5f9', color: '#10b981' }}
                                                                    title="View Detail Page on Website"
                                                                >
                                                                    <FaExternalLinkAlt />
                                                                </Link>
                                                                <button
                                                                    className="admin-btn-icon"
                                                                    style={{ background: '#f1f5f9', color: '#2563eb' }}
                                                                    onClick={() => openEditCourseModal(course)}
                                                                    title="Edit Course"
                                                                >
                                                                    <FaEdit />
                                                                </button>
                                                                <button
                                                                    className="admin-btn-icon btn-delete"
                                                                    onClick={() => handleDeleteCourse(course.id)}
                                                                    title="Delete Course"
                                                                >
                                                                    <FaTrash />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ANALYTICS TAB */}
                    {activeTab === 'analytics' && (
                        <div className="analytics-grid">
                            <div className="admin-section-card">
                                <h2>Weekly Enrollment Trends</h2>
                                <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>Daily enrollment volume over the past 7 days</p>

                                {adminAnalyticsData.weeklyEnrollments.map((item, idx) => (
                                    <div key={idx} className="chart-bar-row">
                                        <span className="chart-bar-label">{item.day}</span>
                                        <div className="chart-bar-bg">
                                            <div className="chart-bar-fill" style={{ width: `${(item.count / 1200) * 100}%` }}></div>
                                        </div>
                                        <span style={{ fontSize: '13px', color: '#0f172a', fontWeight: 700, width: '45px' }}>{item.count}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="admin-section-card">
                                <h2>Category Wise Distribution</h2>
                                <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>Student enrollments grouped by category</p>

                                {adminAnalyticsData.categoryShare.map((cat, idx) => (
                                    <div key={idx} style={{ marginBottom: '20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px', fontWeight: 600 }}>
                                            <span>{cat.category}</span>
                                            <span style={{ color: cat.color }}>{cat.percent}%</span>
                                        </div>
                                        <div className="chart-bar-bg">
                                            <div style={{ height: '100%', width: `${cat.percent}%`, background: cat.color, borderRadius: '10px' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TICKETS TAB */}
                    {activeTab === 'tickets' && (
                        <div className="admin-section-card">
                            <h2>Student Support Tickets ({filteredTickets.length})</h2>
                            <div className="admin-table-wrapper">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Ticket ID</th>
                                            <th>Student Name</th>
                                            <th>Subject / Query</th>
                                            <th>Category</th>
                                            <th>Priority</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTickets.map(t => (
                                            <tr key={t.id}>
                                                <td style={{ color: '#6366f1', fontWeight: 700 }}>{t.id}</td>
                                                <td style={{ fontWeight: 700, color: '#0f172a' }}>{t.student}</td>
                                                <td style={{ fontSize: '13px' }}>{t.subject}</td>
                                                <td>{t.category}</td>
                                                <td>
                                                    <span style={{
                                                        color: t.priority === 'High' ? '#ef4444' : t.priority === 'Medium' ? '#f59e0b' : '#10b981',
                                                        fontWeight: 700,
                                                        fontSize: '12px'
                                                    }}>
                                                        {t.priority}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`badge-status status-${t.status.toLowerCase().replace(' ', '')}`}>
                                                        {t.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    {t.status !== 'Resolved' ? (
                                                        <button
                                                            className="admin-btn-sm"
                                                            style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#059669', fontWeight: 600 }}
                                                            onClick={() => resolveTicket(t.id)}
                                                        >
                                                            Mark Resolved
                                                        </button>
                                                    ) : (
                                                        <span style={{ color: '#64748b', fontSize: '12px' }}>Done</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ==================== USER MODAL (ADD / EDIT) ==================== */}
            {userModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal-card">
                        <div className="admin-modal-header">
                            <h3>
                                <FaUsers style={{ color: '#6366f1' }} />
                                {editingUser ? 'Edit User Details' : 'Add New Student / User'}
                            </h3>
                            <button className="admin-modal-close" onClick={() => setUserModalOpen(false)}>×</button>
                        </div>
                        <form onSubmit={handleSaveUser} className="admin-modal-form">
                            <div className="modal-form-group">
                                <label>Full Name *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Rahul Sharma"
                                    value={userForm.name}
                                    onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                                />
                            </div>

                            <div className="modal-form-group">
                                <label>Email Address *</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="e.g. rahul@example.com"
                                    value={userForm.email}
                                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                                />
                            </div>

                            <div className="modal-form-row">
                                <div className="modal-form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="+91 9876543210"
                                        value={userForm.phone}
                                        onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label>Account Status</label>
                                    <select
                                        value={userForm.status}
                                        onChange={(e) => setUserForm({ ...userForm, status: e.target.value })}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Blocked">Blocked</option>
                                    </select>
                                </div>
                            </div>

                            {!editingUser && (
                                <div className="modal-form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        placeholder="Set initial password"
                                        value={userForm.password}
                                        onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                                    />
                                </div>
                            )}

                            <div className="admin-modal-actions">
                                <button type="button" className="btn-modal-cancel" onClick={() => setUserModalOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-modal-submit">
                                    {editingUser ? 'Save Changes' : 'Create User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ==================== COURSE MODAL (ADD / EDIT) ==================== */}
            {courseModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal-card">
                        <div className="admin-modal-header">
                            <h3>
                                <FaBook style={{ color: '#2563eb' }} />
                                {editingCourse ? 'Edit Course Details' : 'Add New Course to Catalog'}
                            </h3>
                            <button className="admin-modal-close" onClick={() => setCourseModalOpen(false)}>×</button>
                        </div>
                        <form onSubmit={handleSaveCourse} className="admin-modal-form">
                            <div className="modal-form-group">
                                <label>Course Title *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Master Deep Learning with PyTorch"
                                    value={courseForm.title}
                                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                                />
                            </div>

                            <div className="modal-form-row">
                                <div className="modal-form-group">
                                    <label>Category</label>
                                    <select
                                        value={courseForm.category}
                                        onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                                    >
                                        <option value="AI Tools">AI Tools</option>
                                        <option value="Technology">Technology</option>
                                        <option value="Languages">Languages</option>
                                        <option value="Communication">Communication</option>
                                    </select>
                                </div>
                                <div className="modal-form-group">
                                    <label>Instructor Name *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Dr. Andrew Ng"
                                        value={courseForm.instructor}
                                        onChange={(e) => setCourseForm({ ...courseForm, instructor: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* COURSE ACCESS & PRICING MODEL TOGGLE */}
                            <div style={{
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                padding: '16px',
                                marginBottom: '16px'
                            }}>
                                <label style={{ display: 'block', fontWeight: 700, marginBottom: '10px', fontSize: '13px', color: '#1e293b' }}>
                                    Course Access & Pricing Model *
                                </label>
                                <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
                                    <button
                                        type="button"
                                        onClick={() => setCourseForm({ ...courseForm, isPaid: false, price: 'Free', inrPrice: 0, tag: 'Free', includesCertificate: false, includesSourceCode: false, includesQuizzes: false })}
                                        style={{
                                            flex: 1,
                                            padding: '10px 14px',
                                            borderRadius: '8px',
                                            border: !courseForm.isPaid ? '2px solid #10b981' : '1px solid #cbd5e1',
                                            background: !courseForm.isPaid ? '#ecfdf5' : '#ffffff',
                                            color: !courseForm.isPaid ? '#047857' : '#64748b',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            fontSize: '13px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        🟢 100% Free Course
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setCourseForm({ ...courseForm, isPaid: true, price: '₹499', inrPrice: 499, tag: 'Premium', includesCertificate: true, includesSourceCode: true, includesQuizzes: true, includesDoubtSupport: true })}
                                        style={{
                                            flex: 1,
                                            padding: '10px 14px',
                                            borderRadius: '8px',
                                            border: courseForm.isPaid ? '2px solid #6366f1' : '1px solid #cbd5e1',
                                            background: courseForm.isPaid ? '#eef2ff' : '#ffffff',
                                            color: courseForm.isPaid ? '#4338ca' : '#64748b',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            fontSize: '13px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        👑 Paid / Premium (Razorpay)
                                    </button>
                                </div>

                                {courseForm.isPaid ? (
                                    <div className="modal-form-row">
                                        <div className="modal-form-group">
                                            <label>Offer Price (INR ₹) *</label>
                                            <input
                                                type="number"
                                                required
                                                min="1"
                                                placeholder="e.g. 499"
                                                value={courseForm.inrPrice}
                                                onChange={(e) => {
                                                    const val = parseInt(e.target.value) || 0;
                                                    setCourseForm({ ...courseForm, inrPrice: val, price: `₹${val}` });
                                                }}
                                            />
                                        </div>
                                        <div className="modal-form-group">
                                            <label>Original / Strikethrough Price</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. ₹1,999"
                                                value={courseForm.originalPrice}
                                                onChange={(e) => setCourseForm({ ...courseForm, originalPrice: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ fontSize: '12px', color: '#64748b', padding: '6px 2px' }}>
                                        ℹ️ Free courses are accessible directly by all students without payment checkout.
                                    </div>
                                )}

                                {/* Premium Benefits Included */}
                                <div style={{ marginTop: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '10px' }}>
                                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '8px' }}>
                                        Included Course Perks & Features:
                                    </label>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#1e293b' }}>
                                            <input
                                                type="checkbox"
                                                checked={courseForm.includesCertificate}
                                                onChange={(e) => setCourseForm({ ...courseForm, includesCertificate: e.target.checked })}
                                            />
                                            📜 Verifiable Certificate
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#1e293b' }}>
                                            <input
                                                type="checkbox"
                                                checked={courseForm.includesSourceCode}
                                                onChange={(e) => setCourseForm({ ...courseForm, includesSourceCode: e.target.checked })}
                                            />
                                            💻 Source Code & Notes Download
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#1e293b' }}>
                                            <input
                                                type="checkbox"
                                                checked={courseForm.includesQuizzes}
                                                onChange={(e) => setCourseForm({ ...courseForm, includesQuizzes: e.target.checked })}
                                            />
                                            📝 Practice Quizzes & MCQs
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#1e293b' }}>
                                            <input
                                                type="checkbox"
                                                checked={courseForm.includesDoubtSupport}
                                                onChange={(e) => setCourseForm({ ...courseForm, includesDoubtSupport: e.target.checked })}
                                            />
                                            🤖 AI Tutor 24/7 Doubt Solving
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-form-row">
                                <div className="modal-form-group">
                                    <label>Rating</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="1"
                                        max="5"
                                        placeholder="4.8"
                                        value={courseForm.rating}
                                        onChange={(e) => setCourseForm({ ...courseForm, rating: parseFloat(e.target.value) || 4.8 })}
                                    />
                                </div>
                                <div className="modal-form-group">
                                    <label>Duration</label>
                                    <input
                                        type="text"
                                        placeholder="12 Hours"
                                        value={courseForm.duration}
                                        onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="modal-form-row">
                                <div className="modal-form-group">
                                    <label>Difficulty Level</label>
                                    <select
                                        value={courseForm.level}
                                        onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}
                                    >
                                        <option value="All Levels">All Levels</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                                <div className="modal-form-group">
                                    <label>Badge Tag</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Bestseller, Trending, Popular, New"
                                        value={courseForm.tag}
                                        onChange={(e) => setCourseForm({ ...courseForm, tag: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* CLOUDINARY IMAGE / THUMBNAIL UPLOAD */}
                            <div className="modal-form-group" style={{ background: '#f1f5f9', padding: '14px', borderRadius: '10px', border: '1px dashed #cbd5e1' }}>
                                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', fontWeight: 700, color: '#1e293b' }}>
                                    <span>☁️ Course Thumbnail (Cloudinary Upload)</span>
                                    {uploadingImage && <span style={{ color: '#6366f1', fontSize: '12px' }}>Uploading to Cloudinary... ⏳</span>}
                                    {uploadSuccess && <span style={{ color: '#16a34a', fontSize: '12px' }}>✓ Uploaded to Cloudinary!</span>}
                                </label>
                                
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    disabled={uploadingImage}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        background: '#ffffff',
                                        border: '1px solid #cbd5e1',
                                        borderRadius: '6px',
                                        cursor: 'pointer'
                                    }}
                                />

                                {courseForm.image && (
                                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <img
                                            src={courseForm.image}
                                            alt="Preview"
                                            style={{
                                                width: '90px',
                                                height: '56px',
                                                objectFit: 'cover',
                                                borderRadius: '6px',
                                                border: '2px solid #6366f1'
                                            }}
                                        />
                                        <div style={{ fontSize: '11px', color: '#64748b', wordBreak: 'break-all' }}>
                                            <strong style={{ color: '#0f172a' }}>Cloudinary CDN URL:</strong><br />
                                            {courseForm.image}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* ======================================================== */}
                            {/* MODULES & LESSONS VIDEO MANAGER (MULTI-VIDEO SYSTEM)     */}
                            {/* ======================================================== */}
                            <div style={{
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                padding: '16px',
                                marginBottom: '16px'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                                            📚 Course Curriculum & Video Lessons
                                        </h4>
                                        <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>
                                            Add multiple modules. For each lesson, paste YouTube URL (e.g. watch?v=... or youtu.be/...) — auto converted to embed!
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleAddModule}
                                        style={{
                                            background: '#e0e7ff',
                                            color: '#4338ca',
                                            border: 'none',
                                            padding: '6px 12px',
                                            borderRadius: '6px',
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        + Add Module
                                    </button>
                                </div>

                                {courseForm.chapters.map((ch, mIdx) => (
                                    <div key={mIdx} style={{
                                        background: '#ffffff',
                                        border: '1px solid #cbd5e1',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        marginBottom: '12px'
                                    }}>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
                                            <input
                                                type="text"
                                                value={ch.title}
                                                onChange={(e) => handleModuleTitleChange(mIdx, e.target.value)}
                                                placeholder={`Module ${mIdx + 1} Title`}
                                                style={{
                                                    flex: 1,
                                                    fontWeight: 700,
                                                    padding: '6px 10px',
                                                    fontSize: '13px',
                                                    border: '1px solid #cbd5e1',
                                                    borderRadius: '6px'
                                                }}
                                            />
                                            {courseForm.chapters.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveModule(mIdx)}
                                                    style={{
                                                        background: '#fee2e2',
                                                        color: '#dc2626',
                                                        border: 'none',
                                                        padding: '6px 10px',
                                                        borderRadius: '6px',
                                                        fontSize: '11px',
                                                        cursor: 'pointer',
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    Delete Module
                                                </button>
                                            )}
                                        </div>

                                        {/* LESSONS IN THIS MODULE */}
                                        <div style={{ paddingLeft: '8px', borderLeft: '2px solid #e0e7ff' }}>
                                            {ch.lessons.map((les, lIdx) => (
                                                <div key={lIdx} style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '6px',
                                                    background: '#f8fafc',
                                                    padding: '8px 10px',
                                                    borderRadius: '6px',
                                                    marginBottom: '8px',
                                                    border: '1px solid #f1f5f9'
                                                }}>
                                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                        <input
                                                            type="text"
                                                            placeholder="Lesson Title (e.g. 1. Introduction)"
                                                            value={les.name}
                                                            onChange={(e) => handleLessonChange(mIdx, lIdx, 'name', e.target.value)}
                                                            style={{
                                                                flex: 2,
                                                                padding: '6px 8px',
                                                                fontSize: '12px',
                                                                border: '1px solid #cbd5e1',
                                                                borderRadius: '4px'
                                                            }}
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Duration (e.g. 15 min)"
                                                            value={les.duration}
                                                            onChange={(e) => handleLessonChange(mIdx, lIdx, 'duration', e.target.value)}
                                                            style={{
                                                                flex: 1,
                                                                padding: '6px 8px',
                                                                fontSize: '12px',
                                                                border: '1px solid #cbd5e1',
                                                                borderRadius: '4px'
                                                            }}
                                                        />
                                                        {ch.lessons.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveLesson(mIdx, lIdx)}
                                                                style={{
                                                                    background: 'none',
                                                                    border: 'none',
                                                                    color: '#ef4444',
                                                                    cursor: 'pointer',
                                                                    fontSize: '14px',
                                                                    fontWeight: 700
                                                                }}
                                                                title="Remove Lesson"
                                                            >
                                                                ✕
                                                            </button>
                                                        )}
                                                    </div>

                                                    {/* YOUTUBE VIDEO LINK FOR THIS LESSON */}
                                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                        <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>🎬 Video URL:</span>
                                                        <input
                                                            type="text"
                                                            placeholder="Paste YouTube Link (watch?v=... or embed/...) or leave empty"
                                                            value={les.videoUrl || ''}
                                                            onChange={(e) => handleLessonChange(mIdx, lIdx, 'videoUrl', e.target.value)}
                                                            style={{
                                                                flex: 1,
                                                                padding: '5px 8px',
                                                                fontSize: '12px',
                                                                border: '1px solid #cbd5e1',
                                                                borderRadius: '4px',
                                                                background: '#ffffff'
                                                            }}
                                                        />
                                                        {les.videoUrl && (
                                                            <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>
                                                                ✓ Video Added
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}

                                            <button
                                                type="button"
                                                onClick={() => handleAddLesson(mIdx)}
                                                style={{
                                                    background: 'none',
                                                    border: '1px dashed #6366f1',
                                                    color: '#4f46e5',
                                                    padding: '5px 10px',
                                                    borderRadius: '6px',
                                                    fontSize: '11px',
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                    marginTop: '4px'
                                                }}
                                            >
                                                + Add Lesson to {ch.title.split(':')[0]}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="modal-form-group">
                                <label>Description</label>
                                <textarea
                                    rows="3"
                                    placeholder="Brief course overview and curriculum description..."
                                    value={courseForm.desc}
                                    onChange={(e) => setCourseForm({ ...courseForm, desc: e.target.value })}
                                />
                            </div>

                            <div className="admin-modal-actions">
                                <button type="button" className="btn-modal-cancel" onClick={() => setCourseModalOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-modal-submit">
                                    {editingCourse ? 'Save Changes' : 'Publish Course'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;