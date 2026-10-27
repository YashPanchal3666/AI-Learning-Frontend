import React from "react";
import "../styles/pricing.css";
import { FaCheck, FaTimes, FaTag } from "react-icons/fa";
import { Link } from "react-router-dom";

function Pricing() {
    const plans = [
        {
            name: "Free Explorer",
            price: "$0",
            period: "/forever",
            desc: "Ideal for beginners starting their AI journey.",
            featured: false,
            features: [
                { text: "Access to 5 Intro AI Courses", included: true },
                { text: "Basic Python Code Notebooks", included: true },
                { text: "Community Forum Access", included: true },
                { text: "24/7 AI Mentor Assistant", included: false },
                { text: "Blockchain Verified Certificates", included: false },
                { text: "1-on-1 Code Reviews", included: false }
            ],
            btnText: "Get Started Free",
            btnClass: "btn-outline",
            link: "/register"
        },
        {
            name: "Pro Learner",
            price: "$29",
            period: "/month",
            desc: "Best value for serious developers & creators.",
            featured: true,
            badge: "Most Popular",
            features: [
                { text: "Unlimited Access to 50+ AI Courses", included: true },
                { text: "Interactive GPU Notebooks & Labs", included: true },
                { text: "24/7 Personal AI Mentor Assistant", included: true },
                { text: "Verified Certificates & Badges", included: true },
                { text: "Exclusive Member Community", included: true },
                { text: "1-on-1 Mentorship Sessions", included: false }
            ],
            btnText: "Start 7-Day Free Trial",
            btnClass: "btn-primary",
            link: "/register"
        },
        {
            name: "Enterprise Team",
            price: "$99",
            period: "/month",
            desc: "For tech teams & companies scaling AI skills.",
            featured: false,
            features: [
                { text: "Everything in Pro Learner Plan", included: true },
                { text: "Custom Enterprise AI Pathways", included: true },
                { text: "Dedicated Success Manager", included: true },
                { text: "Team Skill Analytics Dashboard", included: true },
                { text: "Priority 1-on-1 Mentorship", included: true },
                { text: "Custom LMS API Integrations", included: true }
            ],
            btnText: "Contact Enterprise",
            btnClass: "btn-outline",
            link: "/contact"
        }
    ];

    return (
        <section className="pricing-section">
            <div className="section-header">
                <div className="section-badge">
                    <FaTag /> Flexible Pricing
                </div>
                <h2 className="section-title">Invest in Your AI Skills</h2>
                <p className="section-desc">
                    Choose a plan tailored to your learning goals. Upgrade, downgrade, or cancel anytime with zero friction.
                </p>
            </div>

            <div className="pricing-grid">
                {plans.map((pl, idx) => (
                    <div key={idx} className={`pricing-card ${pl.featured ? 'featured' : ''}`}>
                        {pl.badge && <span className="popular-badge">{pl.badge}</span>}
                        <div className="pricing-header">
                            <h3>{pl.name}</h3>
                            <p>{pl.desc}</p>
                        </div>

                        <div className="price">
                            {pl.price}<span>{pl.period}</span>
                        </div>

                        <ul className="pricing-features">
                            {pl.features.map((feat, fIdx) => (
                                <li key={fIdx} className={feat.included ? '' : 'disabled'}>
                                    {feat.included ? (
                                        <FaCheck className="check-icon" />
                                    ) : (
                                        <FaTimes className="cross-icon" />
                                    )}
                                    {feat.text}
                                </li>
                            ))}
                        </ul>

                        <Link to={pl.link} className={`pricing-btn ${pl.btnClass}`}>
                            {pl.btnText}
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Pricing;