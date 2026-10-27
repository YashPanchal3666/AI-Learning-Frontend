import React from "react";
import "../styles/services.css";
import { FaBrain, FaLaptopCode, FaCertificate, FaUserGraduate, FaComments, FaNetworkWired } from "react-icons/fa";

function Services() {
    const services = [
        {
            icon: <FaBrain />,
            title: "Adaptive AI Mentor",
            desc: "Get 24/7 personal AI guidance that adapts learning speed according to your progress and answers coding doubts instantly."
        },
        {
            icon: <FaLaptopCode />,
            title: "Hands-on Code Labs",
            desc: "Build real Python, PyTorch, and TensorFlow neural models directly inside browser-based interactive notebook environments."
        },
        {
            icon: <FaNetworkWired />,
            title: "3D Neural Visualizer",
            desc: "Understand complex activation functions, weights, and backpropagation with interactive 3D dynamic diagrams."
        },
        {
            icon: <FaCertificate />,
            title: "Verified AI Certificates",
            desc: "Earn shareable industry-recognized skill badges and certificates validated on blockchain technology."
        },
        {
            icon: <FaUserGraduate />,
            title: "Real-world Capstones",
            desc: "Work on authentic AI projects like LLM fine-tuning, object detection models, and autonomous AI agents."
        },
        {
            icon: <FaComments />,
            title: "Active Peer Network",
            desc: "Collaborate with 20,000+ AI enthusiasts, participate in hackathons, and exchange ideas in real-time."
        }
    ];

    return (
        <section className="services-section">
            <div className="section-header">
                <div className="section-badge">
                    <FaBrain /> Why Choose AILearn
                </div>
                <h2 className="section-title">Designed for Modern AI Creators</h2>
                <p className="section-desc">
                    We combine cutting-edge AI tools, practical project labs, and structured learning paths to accelerate your tech career.
                </p>
            </div>

            <div className="services-grid">
                {services.map((srv, index) => (
                    <div key={index} className="service-card">
                        <div className="service-icon-wrapper">
                            {srv.icon}
                        </div>
                        <h3>{srv.title}</h3>
                        <p>{srv.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Services;