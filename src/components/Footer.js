import React, { useState } from "react";
import "../styles/footer.css";
import { Link } from "react-router-dom";
import { FaRobot, FaGithub, FaTwitter, FaDiscord, FaLinkedin, FaPaperPlane, FaChevronRight } from "react-icons/fa";

function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail("");
            setTimeout(() => setSubscribed(false), 4000);
        }
    };

    return (
        <footer className="footer">
            <div className="footer-glow"></div>
            <div className="footer-container">
                {/* Brand Info */}
                <div className="footer-brand">
                    <Link to="/" className="logo">
                        <div className="logo-icon-wrapper">
                            <FaRobot className="robot-icon" />
                        </div>
                        <span className="logo-text">AI<span className="logo-highlight">Learn</span></span>
                    </Link>
                    <p className="footer-desc">
                        Empowering developers and tech enthusiasts to master Artificial Intelligence, Machine Learning, and Neural Networks through hands-on interactive paths.
                    </p>
                    <div className="footer-socials">
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub"><FaGithub /></a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Twitter"><FaTwitter /></a>
                        <a href="https://discord.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Discord"><FaDiscord /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn"><FaLinkedin /></a>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="footer-col">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/"><FaChevronRight className="link-arrow" /> Home</Link></li>
                        <li><Link to="/about"><FaChevronRight className="link-arrow" /> About Us</Link></li>
                        <li><Link to="/courses"><FaChevronRight className="link-arrow" /> All Courses</Link></li>
                        <li><Link to="/community"><FaChevronRight className="link-arrow" /> Community Hub</Link></li>
                        <li><Link to="/contact"><FaChevronRight className="link-arrow" /> Contact Support</Link></li>
                    </ul>
                </div>

                {/* Categories */}
                <div className="footer-col">
                    <h4>AI Domains</h4>
                    <ul className="footer-links">
                        <li><Link to="/courses"><FaChevronRight className="link-arrow" /> Machine Learning</Link></li>
                        <li><Link to="/courses"><FaChevronRight className="link-arrow" /> Deep Learning & LLMs</Link></li>
                        <li><Link to="/courses"><FaChevronRight className="link-arrow" /> Computer Vision</Link></li>
                        <li><Link to="/courses"><FaChevronRight className="link-arrow" /> Prompt Engineering</Link></li>
                        <li><Link to="/courses"><FaChevronRight className="link-arrow" /> AI Ethics & Safety</Link></li>
                    </ul>
                </div>

                {/* Newsletter Box */}
                <div className="footer-col">
                    <h4>Stay Updated</h4>
                    <div className="newsletter-box">
                        <p>Subscribe to get the latest AI course updates, tech news, and free resources.</p>
                        <form onSubmit={handleSubscribe} className="newsletter-form">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                            <button type="submit">
                                <FaPaperPlane />
                            </button>
                        </form>
                        {subscribed && (
                            <span style={{ color: '#10b981', fontSize: '13px', marginTop: '4px' }}>
                                ✨ Thank you for subscribing!
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} AILearn Platform. All rights reserved.</p>
                <div className="footer-bottom-links">
                    <Link to="#">Privacy Policy</Link>
                    <Link to="#">Terms of Service</Link>
                    <Link to="#">Cookie Settings</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
