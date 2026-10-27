import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Intro.css';
import { 
    FaRobot, FaCertificate, FaLaptopCode, FaArrowRight, 
    FaSignInAlt, FaUsers, FaGraduationCap, FaBrain
} from 'react-icons/fa';

const phrases = [
    "Generative AI & LLMs",
    "Full-Stack Web Engineering",
    "Autonomous AI Agents",
    "Prompt Architecture",
    "Deep Learning & PyTorch"
];

const Intro = () => {
    const navigate = useNavigate();

    // Typewriter state
    const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fullPhrase = phrases[currentPhraseIdx];
        const typingSpeed = isDeleting ? 40 : 80;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                setDisplayedText(fullPhrase.substring(0, displayedText.length + 1));
                if (displayedText === fullPhrase) {
                    setTimeout(() => setIsDeleting(true), 1800);
                }
            } else {
                setDisplayedText(fullPhrase.substring(0, displayedText.length - 1));
                if (displayedText === '') {
                    setIsDeleting(false);
                    setCurrentPhraseIdx((prev) => (prev + 1) % phrases.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, currentPhraseIdx]);

    return (
        <div className="intro-light-wrapper">
            {/* Soft Ambient Light Glowing Orbs */}
            <div className="light-glow light-glow-1"></div>
            <div className="light-glow light-glow-2"></div>

            {/* Stable Premium Glass Card */}
            <div className="intro-light-card">
                {/* Floating Top Shimmer Badge */}
                <div className="light-badge">
                    <span className="light-badge-dot"></span>
                    <span>⚡ The Next-Gen AI Learning Ecosystem</span>
                </div>

                {/* Animated Heading with Dynamic Gradient Typewriter */}
                <h1 className="light-main-title">
                    Master The Future Of <br />
                    <span className="light-gradient-typewriter">
                        {displayedText}
                        <span className="light-typewriter-cursor">|</span>
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="light-subtitle">
                    Step into an intelligent learning environment with 24/7 AI Mentors, interactive cloud code labs, and globally verified skill certifications.
                </p>

                {/* Action Buttons Hub */}
                <div className="light-actions-hub">
                    <button className="light-btn-primary" onClick={() => navigate('/login')}>
                        <FaSignInAlt className="btn-icon" />
                        <span>Sign In</span>
                        <FaArrowRight className="btn-icon" />
                    </button>
                </div>

                {/* Live Stats Row */}
                <div className="light-stats-strip">
                    <div className="light-stat-item">
                        <FaUsers className="light-stat-icon" />
                        <div>
                            <strong>45,000+</strong>
                            <span>Active Learners</span>
                        </div>
                    </div>
                    <div className="light-stat-divider"></div>
                    <div className="light-stat-item">
                        <FaGraduationCap className="light-stat-icon" />
                        <div>
                            <strong>50+</strong>
                            <span>AI Modules</span>
                        </div>
                    </div>
                    <div className="light-stat-divider"></div>
                    <div className="light-stat-item">
                        <FaBrain className="light-stat-icon" />
                        <div>
                            <strong>98%</strong>
                            <span>Success Rate</span>
                        </div>
                    </div>
                </div>

                {/* Feature Pills */}
                <div className="light-feature-pills">
                    <div className="light-feature-pill">
                        <FaRobot className="pill-icon" />
                        <span>24/7 AI Tutor</span>
                    </div>
                    <div className="light-feature-pill">
                        <FaLaptopCode className="pill-icon" />
                        <span>Interactive Labs</span>
                    </div>
                    <div className="light-feature-pill">
                        <FaCertificate className="pill-icon" />
                        <span>Verified Certs</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Intro;