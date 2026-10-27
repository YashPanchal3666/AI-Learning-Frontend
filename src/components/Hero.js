import React, { useState, useEffect } from "react";
import "../styles/hero.css";
import { FaRocket, FaBookOpen, FaBrain, FaShieldAlt, FaChartLine, FaRobot, FaMicrochip, FaDatabase, FaNetworkWired, FaCodeBranch } from "react-icons/fa";
import { Link } from "react-router-dom";

// Custom Typewriter Hook for looping text animation
function useTypewriter(phrases, typingSpeed = 90, deletingSpeed = 50, delayBetween = 1800) {
    const [text, setText] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentPhrase = phrases[phraseIndex];

        const timer = setTimeout(() => {
            if (!isDeleting) {
                // Typing
                setText(currentPhrase.substring(0, text.length + 1));
                if (text === currentPhrase) {
                    // Pause before deleting
                    setTimeout(() => setIsDeleting(true), delayBetween);
                }
            } else {
                // Deleting
                setText(currentPhrase.substring(0, text.length - 1));
                if (text === '') {
                    setIsDeleting(false);
                    setPhraseIndex((prev) => (prev + 1) % phrases.length);
                }
            }
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timer);
    }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, delayBetween]);

    return text;
}

// Custom Counter Hook for counting numbers up from 0 to target
function useCountUp(target, duration = 2000) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(target, 10);
        if (isNaN(end)) return;

        const totalSteps = 40;
        const stepTime = Math.abs(Math.floor(duration / totalSteps));

        const timer = setInterval(() => {
            start += Math.ceil(end / totalSteps);
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [target, duration]);

    return count;
}

function Hero() {
    const phrases = [
        "Build Your Future",
        "Master Deep Learning",
        "Fine-Tune LLaMA 3 & RAG",
        "Launch Your AI Career"
    ];

    const typedText = useTypewriter(phrases);

    // Animated counters
    const learnersCount = useCountUp(45000, 1800);
    const completionRate = useCountUp(98, 1500);
    const modulesCount = useCountUp(50, 1200);

    // Brand partners ticker items
    const brandPartners = [
        { icon: <FaBrain />, name: "OpenAI GPT-4" },
        { icon: <FaMicrochip />, name: "PyTorch 2.2" },
        { icon: <FaRobot />, name: "Hugging Face" },
        { icon: <FaDatabase />, name: "ChromaDB" },
        { icon: <FaNetworkWired />, name: "LangChain" },
        { icon: <FaCodeBranch />, name: "LlamaIndex" }
    ];

    return (
        <section className="hero">
            {/* Background Floating Orbs */}
            <div className="hero-orb orb-1"></div>
            <div className="hero-orb orb-2"></div>
            <div className="hero-orb orb-3"></div>

            <div className="hero-container">
                {/* Left Content Side */}
                <div className="left">
                    <div className="badge">
                        <FaBrain className="badge-icon" />
                        <span>AI-Powered Learning Platform</span>
                    </div>

                    <h1>
                        Learn AI <br />
                        <span className="gradient-text typewriter-heading">
                            {typedText}
                            <span className="typewriter-cursor">|</span>
                        </span>
                    </h1>

                    <p>
                        Master Artificial Intelligence, Machine Learning, and Neural Networks with interactive 3D paths and industry-aligned certifications.
                    </p>

                    <div className="buttons">
                        <Link to="/courses" className="btn btn-primary shimmer-glow-btn magnetic-btn">
                            <span>Start Learning</span>
                            <FaRocket />
                        </Link>
                        <Link to="/courses" className="btn btn-outline magnetic-btn">
                            <span>Explore Courses</span>
                            <FaBookOpen />
                        </Link>
                    </div>

                    {/* Animated Stats Counters */}
                    <div className="stats-strip">
                        <div className="stat-item">
                            <h4>{learnersCount.toLocaleString()}+</h4>
                            <p>Active Learners</p>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <h4>{completionRate}%</h4>
                            <p>Completion Rate</p>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <h4>{modulesCount}+</h4>
                            <p>AI Modules</p>
                        </div>
                    </div>
                </div>

                {/* Right Visual 3D Showcase with Animated Neural Mesh */}
                <div className="right">
                    <div className="visual-stage">
                        {/* Animated Glow Backgrounds */}
                        <div className="glow-sphere sphere-primary"></div>
                        <div className="glow-sphere sphere-secondary"></div>
                        
                        {/* Neural Mesh Overlay Nodes */}
                        <div className="neural-mesh-nodes">
                            <div className="mesh-node node-a"></div>
                            <div className="mesh-node node-b"></div>
                            <div className="mesh-node node-c"></div>
                            <div className="mesh-line line-ab"></div>
                            <div className="mesh-line line-bc"></div>
                        </div>

                        {/* Interactive Floating Glass Cards */}
                        <div className="glass-card main-node tilt-card">
                            <div className="node-icon">
                                <FaBrain />
                            </div>
                            <div className="node-info">
                                <h5>Neural Network Model</h5>
                                <p>Status: Training Active</p>
                            </div>
                            <div className="pulse-indicator"></div>
                        </div>

                        <div className="glass-card floating-card-1 tilt-card">
                            <FaShieldAlt className="card-icon" />
                            <div>
                                <h6>99.8% Accuracy</h6>
                                <span>Optimization engine</span>
                            </div>
                        </div>

                        <div className="glass-card floating-card-2 tilt-card">
                            <FaChartLine className="card-icon alt" />
                            <div>
                                <h6>+142% Skill Growth</h6>
                                <span>Real-time analytics</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Infinite Marquee Ticker Row */}
            <div className="marquee-wrapper">
                <div className="marquee-content">
                    {brandPartners.concat(brandPartners).concat(brandPartners).map((partner, idx) => (
                        <div key={idx} className="marquee-badge">
                            <span className="marquee-icon">{partner.icon}</span>
                            <span>{partner.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Hero;