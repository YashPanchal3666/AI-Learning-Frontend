// Centralized Learning Service for Real-Time LMS State
// Manages: User Enrollments, Lesson Progress, Certificates, Study Time & Activity Feed
import { getCourseDetail } from '../data/courseDetailData';

// Helper to get current user identifier
export const getCurrentUser = () => {
    try {
        const userStr = localStorage.getItem('currentUser');
        if (userStr) {
            return JSON.parse(userStr);
        }
    } catch (e) {
        console.error("Error reading currentUser:", e);
    }
    return null;
};

export const getCurrentUserEmail = () => {
    const user = getCurrentUser();
    return user ? (user.email || 'guest@ailearn.io').toLowerCase().trim() : 'guest@ailearn.io';
};

// =========================================================================
// 1. ENROLLED COURSES
// =========================================================================

export const getUserEnrolledCourses = (customEmail) => {
    const email = customEmail || getCurrentUserEmail();
    const storageKey = `ailearn_enrolled_${email}`;
    
    let courseIds = [];
    try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            courseIds = JSON.parse(saved);
        }
    } catch (e) {
        courseIds = [];
    }

    // Also check user-specific purchased_courses
    try {
        const purchaseKey = `purchased_courses_${email}`;
        const purchased = JSON.parse(localStorage.getItem(purchaseKey) || '[]');
        if (Array.isArray(purchased)) {
            purchased.forEach(id => {
                if (!courseIds.includes(id)) {
                    courseIds.push(id);
                }
            });
        }
    } catch (e) {}

    // Map course IDs to detailed course objects with progress
    return courseIds.map(id => {
        const detail = getCourseDetail(id);
        const progressInfo = getCourseProgress(id, email);
        return {
            id,
            title: detail.title,
            instructor: detail.instructor,
            category: detail.category,
            image: detail.image,
            duration: detail.duration,
            progress: progressInfo.percent,
            completedLessons: progressInfo.completedCount,
            totalLessons: progressInfo.totalLessons,
            nextLesson: progressInfo.nextLessonTitle,
            isCompleted: progressInfo.isCompleted
        };
    });
};

export const enrollInCourse = (courseId, customEmail) => {
    const email = customEmail || getCurrentUserEmail();
    const storageKey = `ailearn_enrolled_${email}`;

    try {
        let currentList = JSON.parse(localStorage.getItem(storageKey) || '[]');
        if (!currentList.includes(courseId)) {
            currentList.push(courseId);
            localStorage.setItem(storageKey, JSON.stringify(currentList));

            const detail = getCourseDetail(courseId);
            addActivity({
                title: `Enrolled in ${detail.title}`,
                desc: `Started learning ${detail.category} under ${detail.instructor}.`,
                type: 'enroll'
            }, email);
        }
    } catch (e) {
        console.error("Error enrolling in course:", e);
    }
};

export const isUserEnrolled = (courseId, customEmail) => {
    const email = customEmail || getCurrentUserEmail();
    const storageKey = `ailearn_enrolled_${email}`;
    try {
        const currentList = JSON.parse(localStorage.getItem(storageKey) || '[]');
        if (currentList.includes(courseId)) return true;

        const purchased = JSON.parse(localStorage.getItem(`purchased_courses_${email}`) || '[]');
        if (purchased.includes(courseId)) return true;
    } catch (e) {}
    return false;
};

// =========================================================================
// 2. COURSE PROGRESS & LESSONS
// =========================================================================

export const getCourseProgress = (courseId, customEmail) => {
    const email = customEmail || getCurrentUserEmail();
    const progressKey = `ailearn_progress_${email}_${courseId}`;
    const detail = getCourseDetail(courseId);
    
    // Extract all lesson names
    const allLessons = [];
    if (detail.chapters && Array.isArray(detail.chapters)) {
        detail.chapters.forEach(ch => {
            if (ch.lessons && Array.isArray(ch.lessons)) {
                ch.lessons.forEach(les => allLessons.push(les));
            }
        });
    }

    const totalLessons = allLessons.length > 0 ? allLessons.length : 12;

    let completedIndices = [];
    try {
        const saved = localStorage.getItem(progressKey);
        if (saved) {
            completedIndices = JSON.parse(saved);
        }
    } catch (e) {
        completedIndices = [];
    }

    const completedCount = completedIndices.length;
    const percent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

    // Determine next lesson title
    let nextLessonTitle = "Course Completed! 🎉";
    if (percent < 100) {
        for (let i = 0; i < allLessons.length; i++) {
            if (!completedIndices.includes(i)) {
                nextLessonTitle = allLessons[i].name || `Lesson ${i + 1}`;
                break;
            }
        }
    }

    return {
        completedIndices,
        completedCount,
        totalLessons,
        percent,
        nextLessonTitle,
        isCompleted: percent >= 100
    };
};

export const updateLessonProgress = (courseId, lessonIndex, isCompleted, lessonTitle, customEmail) => {
    const email = customEmail || getCurrentUserEmail();
    const progressKey = `ailearn_progress_${email}_${courseId}`;
    
    try {
        let indices = JSON.parse(localStorage.getItem(progressKey) || '[]');
        if (isCompleted && !indices.includes(lessonIndex)) {
            indices.push(lessonIndex);
        } else if (!isCompleted && indices.includes(lessonIndex)) {
            indices = indices.filter(i => i !== lessonIndex);
        }
        localStorage.setItem(progressKey, JSON.stringify(indices));

        // Auto-enroll if not enrolled yet
        enrollInCourse(courseId, email);

        if (isCompleted) {
            const detail = getCourseDetail(courseId);
            addActivity({
                title: `Completed ${lessonTitle || `Lesson ${lessonIndex + 1}`}`,
                desc: `Module verified in ${detail.title}.`,
                type: 'lesson'
            }, email);

            // Check if BOTH 100% lessons and Quiz are completed before auto-issuing certificate
            const progress = getCourseProgress(courseId, email);
            const quizStatus = getCourseQuizStatus(courseId, email);
            if (progress.isCompleted && quizStatus.passed) {
                issueCertificate({
                    courseId,
                    courseTitle: detail.title,
                    instructor: detail.instructor,
                    skills: detail.outcomes ? detail.outcomes.slice(0, 3).join(', ') : detail.category,
                    grade: '100% Mastery'
                }, email);
            }
        }
    } catch (e) {
        console.error("Error updating lesson progress:", e);
    }
};

// =========================================================================
// 2B. COURSE QUIZ STATUS (Required alongside lessons for Certificate)
// =========================================================================

export const getCourseQuizStatus = (courseId, customEmail) => {
    const email = customEmail || getCurrentUserEmail();
    const quizKey = `ailearn_quiz_${email}_${courseId}`;
    try {
        const saved = localStorage.getItem(quizKey);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error("Error reading quiz status:", e);
    }
    return {
        completed: false,
        passed: false,
        score: 0,
        totalQuestions: 0,
        completedAt: null
    };
};

export const setCourseQuizStatus = (courseId, quizResult, customEmail) => {
    const email = customEmail || getCurrentUserEmail();
    const quizKey = `ailearn_quiz_${email}_${courseId}`;
    try {
        const data = {
            completed: true,
            passed: quizResult.passed !== undefined ? quizResult.passed : true,
            score: quizResult.score || 0,
            totalQuestions: quizResult.totalQuestions || 0,
            completedAt: new Date().toISOString()
        };
        localStorage.setItem(quizKey, JSON.stringify(data));

        const detail = getCourseDetail(courseId);
        addActivity({
            title: `Completed Quiz: ${detail.title} 📝`,
            desc: `Score: ${data.score}/${data.totalQuestions} (${data.passed ? 'Passed ✅' : 'Attempted'})`,
            type: 'quiz'
        }, email);

        // Check if all lessons are also completed, then issue certificate!
        const progress = getCourseProgress(courseId, email);
        if (progress.isCompleted && data.passed) {
            issueCertificate({
                courseId,
                courseTitle: detail.title,
                instructor: detail.instructor,
                skills: detail.outcomes ? detail.outcomes.slice(0, 3).join(', ') : detail.category,
                grade: 'Verified Mastery'
            }, email);
        }

        return data;
    } catch (e) {
        console.error("Error saving quiz status:", e);
        return null;
    }
};

// =========================================================================
// 3. CERTIFICATES
// =========================================================================

export const getUserCertificates = (customEmail) => {
    const email = customEmail || getCurrentUserEmail();
    const certKey = `ailearn_certificates_${email}`;
    try {
        const saved = localStorage.getItem(certKey);
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        return [];
    }
};

export const issueCertificate = (certData, customEmail) => {
    const email = customEmail || getCurrentUserEmail();
    const certKey = `ailearn_certificates_${email}`;
    
    try {
        let certs = JSON.parse(localStorage.getItem(certKey) || '[]');
        
        // Avoid duplicate cert for the same course
        const existingIdx = certs.findIndex(c => c.courseId === certData.courseId);
        
        const newCert = {
            id: certData.id || `CERT-AI-${Math.floor(1000 + Math.random() * 9000)}`,
            courseId: certData.courseId,
            title: certData.courseTitle,
            instructor: certData.instructor || 'AILearn Senior Faculty',
            issueDate: certData.issueDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            skills: certData.skills || 'Professional Competency',
            grade: certData.grade || 'Verified Mastery',
            verificationCode: `AILEARN-VERIFIED-${Math.floor(100000 + Math.random() * 900000)}`
        };

        if (existingIdx !== -1) {
            certs[existingIdx] = { ...certs[existingIdx], ...newCert };
        } else {
            certs.unshift(newCert);
            addActivity({
                title: `Earned Certificate: ${certData.courseTitle} 🎓`,
                desc: `Completed 100% of all curriculum lessons with verified cryptographic grade.`,
                type: 'certificate'
            }, email);
        }

        localStorage.setItem(certKey, JSON.stringify(certs));
        return newCert;
    } catch (e) {
        console.error("Error issuing certificate:", e);
        return null;
    }
};

// =========================================================================
// 4. ACTIVITIES FEED
// =========================================================================

export const getUserActivities = (customEmail) => {
    const email = customEmail || getCurrentUserEmail();
    const activityKey = `ailearn_activities_${email}`;
    try {
        const saved = localStorage.getItem(activityKey);
        if (saved) return JSON.parse(saved);
    } catch (e) {}

    return [];
};

export const addActivity = (activity, customEmail) => {
    const email = customEmail || getCurrentUserEmail();
    const activityKey = `ailearn_activities_${email}`;
    try {
        let acts = JSON.parse(localStorage.getItem(activityKey) || '[]');
        const newAct = {
            id: `act_${Date.now()}_${Math.random()}`,
            title: activity.title,
            desc: activity.desc,
            time: 'Just now',
            type: activity.type || 'info',
            timestamp: Date.now()
        };
        acts.unshift(newAct);
        // Keep max 20 activities
        if (acts.length > 20) acts = acts.slice(0, 20);
        localStorage.setItem(activityKey, JSON.stringify(acts));
    } catch (e) {
        console.error("Error adding activity:", e);
    }
};

// =========================================================================
// 5. QUICK STATS CALCULATION
// =========================================================================

export const getUserStats = (customEmail) => {
    const email = customEmail || getCurrentUserEmail();
    const enrolled = getUserEnrolledCourses(email);
    const certs = getUserCertificates(email);

    // Approximate study hours from completed lessons (avg 25 min per lesson)
    let totalCompletedLessons = 0;
    enrolled.forEach(c => {
        totalCompletedLessons += (c.completedLessons || 0);
    });

    const hours = Math.round((totalCompletedLessons * 25) / 60);

    return {
        enrolledCount: enrolled.length,
        studyHours: hours > 0 ? `${hours}h` : "0h",
        certificatesCount: certs.length,
        streakDays: totalCompletedLessons > 0 ? Math.min(30, Math.ceil(totalCompletedLessons / 2)) : 0
    };
};