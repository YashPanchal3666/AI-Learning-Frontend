import React, { useState } from 'react';
import '../styles/community.css';
import { 
    FaDiscord, FaPlus, FaThumbsUp, FaComment, FaShare, FaTrophy, 
    FaCalendarAlt, FaTimes 
} from 'react-icons/fa';

const Community = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [likedPosts, setLikedPosts] = useState({});

    // Initial Discussions Data
    const [discussions, setDiscussions] = useState([
        {
            id: 1,
            author: "Alex Rivera",
            avatar: "AR",
            time: "2 hours ago",
            category: "projects",
            tag: "AI Project",
            title: "Built an autonomous Code Reviewer bot using LLaMA 3 & LangChain!",
            desc: "Hey everyone! I just published my open-source project that connects fine-tuned LLaMA 3 with GitHub Webhooks to comment automated security & syntax reviews on PRs. Check out the demo repo!",
            likes: 42,
            comments: 18
        },
        {
            id: 2,
            author: "Sophia Chen",
            avatar: "SC",
            time: "5 hours ago",
            category: "help",
            tag: "PyTorch Help",
            title: "CUDA Out of Memory error during gradient accumulation step?",
            desc: "I am fine-tuning Mistral-7B on a single RTX 3090 using LoRA. Even with batch size 1, I run out of VRAM at step 120. Is gradient checkpointing the best fix?",
            likes: 19,
            comments: 12
        },
        {
            id: 3,
            author: "Devansh Mehta",
            avatar: "DM",
            time: "1 day ago",
            category: "showcase",
            tag: "Showcase",
            title: "3D Neural Activation Explorer - Interactive WebGL Demo",
            desc: "Wanted to share this Three.js + React visualizer I created for rendering multi-layer perceptron activations in real-time 3D space!",
            likes: 87,
            comments: 31
        }
    ]);

    // Modal Form State
    const [newPost, setNewPost] = useState({ title: '', tag: 'AI Project', category: 'projects', desc: '' });

    const toggleLike = (id) => {
        setLikedPosts(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
        setDiscussions(prev => prev.map(p => {
            if (p.id === id) {
                return {
                    ...p,
                    likes: likedPosts[id] ? p.likes - 1 : p.likes + 1
                };
            }
            return p;
        }));
    };

    const handleCreatePost = (e) => {
        e.preventDefault();
        if (!newPost.title || !newPost.desc) return;

        const postObj = {
            id: Date.now(),
            author: "You (Learner)",
            avatar: "YO",
            time: "Just now",
            category: newPost.category,
            tag: newPost.tag,
            title: newPost.title,
            desc: newPost.desc,
            likes: 1,
            comments: 0
        };

        setDiscussions([postObj, ...discussions]);
        setNewPost({ title: '', tag: 'AI Project', category: 'projects', desc: '' });
        setShowModal(false);
    };

    const filteredDiscussions = activeTab === 'all' 
        ? discussions 
        : discussions.filter(d => d.category === activeTab);

    const leaderboard = [
        { rank: 1, name: "Dr. Elena Rostova", pts: "4,850 pts", class: "rank-1" },
        { rank: 2, name: "Marcus Vance", pts: "3,920 pts", class: "rank-2" },
        { rank: 3, name: "Ananya Sharma", pts: "3,410 pts", class: "rank-3" }
    ];

    const upcomingEvents = [
        {
            date: "FEB 18, 2026",
            title: "Global Generative AI Hackathon",
            desc: "$10,000 Prize Pool. Build real-world LLM agents in 48 hours."
        },
        {
            date: "FEB 25, 2026",
            title: "Live Q&A: Fine-tuning Open Source Models",
            desc: "Interactive session with Senior AI Research Engineers."
        }
    ];

    return (
        <div className="community-page">
            {/* Hero Banner */}
            <div className="community-hero">
                <div className="community-glow-1"></div>
                <div className="community-glow-2"></div>

                <div className="community-hero-content">
                    <div className="hero-text-side">
                        <div className="hero-online-badge">
                            <span className="online-dot"></span>
                            1,240 AI Builders Online Now
                        </div>
                        <h1>Connect, Collaborate & Build the Future of AI</h1>
                        <p>
                            Join a global network of Machine Learning engineers, researchers, and creators. Share your projects, solve coding doubts, and participate in hackathons.
                        </p>
                        <div className="hero-buttons">
                            <a href="https://discord.com" target="_blank" rel="noreferrer" className="discord-btn">
                                <FaDiscord className="btn-icon" /> Join Official Discord
                            </a>
                            <button className="post-btn" onClick={() => setShowModal(true)}>
                                <FaPlus /> Start Discussion
                            </button>
                        </div>
                    </div>

                    <div className="community-stats-box">
                        <div className="c-stat-card">
                            <h3>25k+</h3>
                            <p>Active Members</p>
                        </div>
                        <div className="c-stat-card">
                            <h3>140+</h3>
                            <p>AI Hackathons</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Community Layout */}
            <div className="community-layout">
                {/* Left Feed */}
                <div className="community-feed">
                    <div className="feed-header">
                        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>Community Feed</h2>
                        <div className="feed-tabs">
                            <button 
                                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                                onClick={() => setActiveTab('all')}
                            >
                                All Threads
                            </button>
                            <button 
                                className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                                onClick={() => setActiveTab('projects')}
                            >
                                AI Projects
                            </button>
                            <button 
                                className={`tab-btn ${activeTab === 'help' ? 'active' : ''}`}
                                onClick={() => setActiveTab('help')}
                            >
                                Q&A / Help
                            </button>
                            <button 
                                className={`tab-btn ${activeTab === 'showcase' ? 'active' : ''}`}
                                onClick={() => setActiveTab('showcase')}
                            >
                                Showcases
                            </button>
                        </div>
                    </div>

                    <div className="discussions-list">
                        {filteredDiscussions.map((item) => (
                            <div key={item.id} className="discussion-card">
                                <div className="card-top">
                                    <div className="author-info">
                                        <div className="author-avatar">{item.avatar}</div>
                                        <div>
                                            <div className="author-name">{item.author}</div>
                                            <div className="post-time">{item.time}</div>
                                        </div>
                                    </div>
                                    <span className="tag-badge">{item.tag}</span>
                                </div>

                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>

                                <div className="card-bottom">
                                    <div 
                                        className={`action-item ${likedPosts[item.id] ? 'liked' : ''}`}
                                        onClick={() => toggleLike(item.id)}
                                    >
                                        <FaThumbsUp /> {item.likes} Likes
                                    </div>
                                    <div className="action-item">
                                        <FaComment /> {item.comments} Comments
                                    </div>
                                    <div className="action-item">
                                        <FaShare /> Share
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="community-sidebar">
                    {/* Leaderboard Widget */}
                    <div className="sidebar-widget">
                        <div className="widget-title">
                            <FaTrophy className="widget-title-icon" /> Top Contributors
                        </div>
                        <div className="leaderboard-list">
                            {leaderboard.map((lb, i) => (
                                <div key={i} className="leaderboard-item">
                                    <div className="user-rank">
                                        <span className={`rank-number ${lb.class}`}>#{lb.rank}</span>
                                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{lb.name}</span>
                                    </div>
                                    <span className="user-pts">{lb.pts}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hackathons Widget */}
                    <div className="sidebar-widget">
                        <div className="widget-title">
                            <FaCalendarAlt className="widget-title-icon" /> Upcoming Events
                        </div>
                        {upcomingEvents.map((ev, idx) => (
                            <div key={idx} className="event-card">
                                <div className="event-date">{ev.date}</div>
                                <h4>{ev.title}</h4>
                                <p>{ev.desc}</p>
                                <button className="event-btn">RSVP & Reserve Seat</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Post Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Start New Discussion</h3>
                            <button className="close-modal" onClick={() => setShowModal(false)}>
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleCreatePost} className="modal-form">
                            <input 
                                type="text" 
                                placeholder="Discussion Title (e.g. Fine-tuning LLaMA 3)"
                                value={newPost.title}
                                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                required
                            />

                            <select 
                                value={newPost.category}
                                onChange={(e) => setNewPost({ 
                                    ...newPost, 
                                    category: e.target.value,
                                    tag: e.target.value === 'projects' ? 'AI Project' : e.target.value === 'help' ? 'Q&A Help' : 'Showcase'
                                })}
                            >
                                <option value="projects">AI Project Showcase</option>
                                <option value="help">Code Q&A / Debugging</option>
                                <option value="showcase">Demo / Article</option>
                            </select>

                            <textarea 
                                placeholder="Describe your topic, question, or project details..."
                                value={newPost.desc}
                                onChange={(e) => setNewPost({ ...newPost, desc: e.target.value })}
                                required
                            />

                            <button type="submit">Publish Thread 🚀</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Community;