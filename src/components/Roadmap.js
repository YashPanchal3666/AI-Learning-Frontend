import React from "react";
import "../styles/roadmap.css";
import { FaRoute } from "react-icons/fa";

function Roadmap() {
    const steps = [
        {
            step: "Step 01",
            title: "Python & Mathematics",
            desc: "Master Python fundamentals, NumPy, Pandas, Linear Algebra, and Data Preprocessing essential for AI.",
            skills: ["Python 3", "NumPy", "Pandas", "Linear Algebra"]
        },
        {
            step: "Step 02",
            title: "Machine Learning Core",
            desc: "Understand supervised/unsupervised algorithms, Scikit-Learn, regression models, and classification metrics.",
            skills: ["Scikit-Learn", "Regression", "Random Forests", "Evaluation"]
        },
        {
            step: "Step 03",
            title: "Deep Learning & LLMs",
            desc: "Build neural networks with PyTorch, CNNs for vision, Transformers, and Fine-Tuning Large Language Models.",
            skills: ["PyTorch", "Transformers", "CNNs", "LLM Fine-Tuning"]
        },
        {
            step: "Step 04",
            title: "AI Agent Deployment",
            desc: "Deploy AI models via APIs, Dockerize pipelines, optimize latency, and monitor production AI models.",
            skills: ["FastAPI", "Docker", "LangChain", "Mangement"]
        }
    ];

    return (
        <section className="roadmap-section">
            <div className="section-header">
                <div className="section-badge">
                    <FaRoute /> Learning Path
                </div>
                <h2 className="section-title">Your Step-by-Step AI Journey</h2>
                <p className="section-desc">
                    Follow our industry-vetted roadmap from zero coding knowledge to building autonomous production AI systems.
                </p>
            </div>

            <div className="roadmap-timeline">
                {steps.map((st, idx) => (
                    <div key={idx} className="roadmap-card">
                        <span className="step-badge">{st.step}</span>
                        <h3>{st.title}</h3>
                        <p>{st.desc}</p>
                        <div className="roadmap-skills">
                            {st.skills.map((sk, i) => (
                                <span key={i} className="skill-tag">{sk}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Roadmap;