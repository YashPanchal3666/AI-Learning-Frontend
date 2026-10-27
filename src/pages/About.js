import React from "react";
import "../styles/about.css";
import { Link } from "react-router-dom";
import { 
    FaBrain, 
    FaRocket, 
    FaGraduationCap, 
    FaUsers, 
    FaAward, 
    FaCheckCircle, 
    FaLightbulb, 
    FaGlobe, 
    FaArrowRight 
} from "react-icons/fa";

function About() {
    return (
        <div className="about-page">
            {/* Header Section */}
            <section className="about-hero">
                <div className="about-badge">
                    <FaLightbulb className="badge-icon" />
                    <span>Democratizing AI Education</span>
                </div>
                <h1>
                    Empowering the Next Generation <br />
                    <span className="gradient-text">of AI Innovators</span>
                </h1>
                <p>
                    We build industry-aligned, interactive learning paths designed to bridge the gap between AI theory and real-world implementation.
                </p>
            </section>

            {/* Impact Metrics */}
            <section className="stats-container">
                <div className="stat-card">
                    <div className="stat-icon-wrapper">
                        <FaUsers />
                    </div>
                    <h2>50,000+</h2>
                    <p>Global Learners</p>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-wrapper alt">
                        <FaGraduationCap />
                    </div>
                    <h2>120+</h2>
                    <p>Expert Instructors</p>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-wrapper">
                        <FaGlobe />
                    </div>
                    <h2>85+</h2>
                    <p>Countries Reached</p>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-wrapper alt">
                        <FaAward />
                    </div>
                    <h2>98%</h2>
                    <p>Career Advancement</p>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="values-section">
                <div className="section-title">
                    <h2>Why Choose AI Learn?</h2>
                    <p>Engineered for high-impact learning and immediate practical application.</p>
                </div>

                <div className="values-grid">
                    <div className="value-card">
                        <div className="value-icon">
                            <FaBrain />
                        </div>
                        <h3>Adaptive AI Curriculum</h3>
                        <p>
                            Our courses automatically evolve based on industry shifts, keeping you ahead in Generative AI, Machine Learning, and Neural Networks.
                        </p>
                    </div>

                    <div className="value-card">
                        <div className="value-icon">
                            <FaRocket />
                        </div>
                        <h3>Hands-on Labs</h3>
                        <p>
                            Work with real GPUs and cloud infrastructure straight from your browser with built-in code sandboxes and automated grading.
                        </p>
                    </div>

                    <div className="value-card">
                        <div className="value-icon">
                            <FaCheckCircle />
                        </div>
                        <h3>Verified Certifications</h3>
                        <p>
                            Earn globally recognized credentials shareable directly to LinkedIn and trusted by top-tier tech recruiters worldwide.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call To Action Banner */}
            <section className="about-cta">
                <div className="cta-content">
                    <h2>Ready to start your AI journey?</h2>
                    <p>Join thousands of professionals mastering tomorrow's technologies today.</p>
                    <Link to="/courses" className="cta-btn">
                        <span>Explore All Courses</span>
                        <FaArrowRight />
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default About;