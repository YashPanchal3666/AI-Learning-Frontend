import React from "react";
import "../styles/testimonials.css";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

function Testimonials() {
    const reviews = [
        {
            name: "Aarav Sharma",
            role: "AI Research Assistant",
            initials: "AS",
            stars: 5,
            quote: "The PyTorch & LLM fine-tuning hands-on labs helped me secure my first AI Engineer role. The 3D neural visualizations made abstract math concepts super clear!"
        },
        {
            name: "Priya Patel",
            role: "Full Stack Developer",
            initials: "PP",
            stars: 5,
            quote: "I transition from traditional web dev to AI development in just 3 months. The adaptive AI mentor answered all my doubts instant without waiting for forums."
        },
        {
            name: "Rohan Verma",
            role: "Data Analyst",
            initials: "RV",
            stars: 5,
            quote: "Exceptional curriculum! The community hackathons and real-world project portfolios gave me practical confidence that no textbook could ever provide."
        }
    ];

    return (
        <section className="testimonials-section">
            <div className="section-header">
                <div className="section-badge">
                    <FaQuoteLeft /> Student Stories
                </div>
                <h2 className="section-title">Trusted by 20,000+ Tech Enthusiasts</h2>
                <p className="section-desc">
                    Here is how AILearn transformed careers and helped developers build cutting-edge artificial intelligence projects.
                </p>
            </div>

            <div className="testimonials-grid">
                {reviews.map((rev, idx) => (
                    <div key={idx} className="testimonial-card">
                        <div className="stars">
                            {[...Array(rev.stars)].map((_, i) => (
                                <FaStar key={i} />
                            ))}
                        </div>
                        <p className="quote">"{rev.quote}"</p>
                        <div className="user-profile">
                            <div className="avatar">{rev.initials}</div>
                            <div className="user-info">
                                <h4>{rev.name}</h4>
                                <p>{rev.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Testimonials;