import React, { useState } from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Roadmap from "../components/Roadmap";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import "../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import { FaGraduationCap, FaStar, FaChevronDown, FaQuestionCircle, FaArrowRight, FaBrain, FaRobot, FaLayerGroup } from "react-icons/fa";

function Home() {
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState(0);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const topCourses = [
        {
            id: "ai-2",
            tag: "Deep Learning",
            title: "Generative AI & LLM Architecture",
            desc: "Learn transformer models, fine-tuning LLaMA 3, LangChain framework, and building RAG pipelines.",
            rating: "4.9",
            students: "4.2k",
            icon: <FaBrain />,
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: "tech-2",
            tag: "Data Science",
            title: "Python for Data Science & Machine Learning",
            desc: "Master NumPy, Pandas, Scikit-Learn algorithms, TensorFlow, and real-world ML model deployment.",
            rating: "4.8",
            students: "7.5k",
            icon: <FaRobot />,
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: "ai-1",
            tag: "AI Tools",
            title: "ChatGPT & Prompt Engineering Mastery",
            desc: "Master prompt engineering with ChatGPT, GPT-4 Turbo, custom GPTs, and AI-powered business tools.",
            rating: "4.9",
            students: "45.2k",
            icon: <FaLayerGroup />,
            image: "https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=600&q=80"
        }
    ];

    const faqs = [
        {
            q: "Do I need prior coding experience to start learning on AILearn?",
            a: "No prior experience is required! Our roadmap starts from Python fundamentals and basic linear algebra before diving into deep learning frameworks."
        },
        {
            q: "How does the Adaptive AI Mentor work?",
            a: "Our AI Mentor is integrated into your code labs. It analyzes your syntax errors, explains concept bottlenecks in real-time, and recommends personalized exercises."
        },
        {
            q: "Are the certificates recognized by employers?",
            a: "Yes! Every certificate earned on AILearn comes with a unique cryptographic verification URL that can be embedded directly into LinkedIn profiles and resumes."
        },
        {
            q: "Can I try the platform before subscribing to a paid plan?",
            a: "Absolutely! The Free Explorer plan gives you access to beginner courses and notebook environments with no credit card required."
        }
    ];

    return (
        <main className="home-page">
            {/* Hero Banner */}
            <Hero />

            {/* Why Choose Us / Services */}
            <Services />

            {/* Featured Top Courses */}
            <section className="featured-courses-section">
                <div className="section-header">
                    <div className="section-badge">
                        <FaGraduationCap /> Trending Modules
                    </div>
                    <h2 className="section-title">Popular AI Masterclasses</h2>
                    <p className="section-desc">
                        Explore our highest-rated courses taught by industry researchers and senior Machine Learning engineers.
                    </p>
                </div>

                <div className="home-courses-grid">
                    {topCourses.map((c, i) => (
                        <div key={i} className="home-course-card" onClick={() => navigate(`/course/${c.id}`)} style={{ cursor: 'pointer' }}>
                            <div className="course-thumb">
                                <img 
                                    src={c.image} 
                                    alt={c.title} 
                                    className="course-thumb-img"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"; }}
                                />
                                <span className="course-tag-badge">{c.tag}</span>
                                <div className="course-thumb-icon">{c.icon}</div>
                            </div>
                            <div className="course-body">
                                <h3>{c.title}</h3>
                                <p>{c.desc}</p>
                                <div className="course-meta">
                                    <span className="course-rating"><FaStar /> {c.rating}</span>
                                    <span>{c.students} Learners</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="view-all-wrapper">
                    <Link to="/courses" className="btn btn-primary">
                        <span>Explore All 50+ Courses</span>
                        <FaArrowRight />
                    </Link>
                </div>
            </section>

            {/* Visual Step-by-step Roadmap */}
            <Roadmap />

            {/* Student Reviews & Testimonials */}
            <Testimonials />

            {/* Pricing Tiers */}
            <Pricing />

            {/* FAQ Section */}
            <section className="faq-section">
                <div className="section-header">
                    <div className="section-badge">
                        <FaQuestionCircle /> Got Questions?
                    </div>
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <p className="section-desc">
                        Everything you need to know about the platform, AI mentorship, and certificates.
                    </p>
                </div>

                <div className="faq-container">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className={`faq-item ${openFaq === idx ? 'active' : ''}`}>
                            <button className="faq-question" onClick={() => toggleFaq(idx)}>
                                <span>{faq.q}</span>
                                <FaChevronDown className="faq-icon" />
                            </button>
                            {openFaq === idx && (
                                <div className="faq-answer">
                                    <p>{faq.a}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Home;