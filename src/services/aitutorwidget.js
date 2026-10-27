import React, { useState, useRef, useEffect } from 'react';
import '../styles/aiTutorWidget.css';
import { askAiTutor } from '../services/aiTutorService';
import { FaRobot, FaTimes, FaPaperPlane, FaTrashAlt } from 'react-icons/fa';

const AiTutorWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: 'bot',
            text: "👋 Hi! I'm your **AILearn AI Tutor**. Ask me anything about AI, courses, certificates, or pricing!"
        }
    ]);
    const [inputMsg, setInputMsg] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom of chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, isTyping]);

    const handleSendMessage = async (textToSend) => {
        const msgText = textToSend || inputMsg;
        if (!msgText.trim()) return;

        // Add User Message
        const newMessages = [...messages, { sender: 'user', text: msgText }];
        setMessages(newMessages);
        if (!textToSend) setInputMsg('');
        setIsTyping(true);

        try {
            // Get AI Tutor response from Service
            const botReply = await askAiTutor(msgText);
            setIsTyping(false);
            setMessages([...newMessages, { sender: 'bot', text: botReply }]);
        } catch (err) {
            setIsTyping(false);
            setMessages([...newMessages, { 
                sender: 'bot', 
                text: "⚠️ Sorry, I had trouble answering that. Please try again!" 
            }]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const clearChat = () => {
        setMessages([
            {
                sender: 'bot',
                text: "👋 Chat cleared! How can I help you next?"
            }
        ]);
    };

    // Quick suggested questions
    const quickChips = [
        "📊 Today's New Registrations",
        "📚 Popular AI Courses",
        "💰 Pricing & Free Trial",
        "🎓 Certificate Verification",
        "📩 Contact Support"
    ];

    return (
        <>
            {/* Floating Trigger Button */}
            <button 
                className="ai-widget-trigger" 
                onClick={() => setIsOpen(!isOpen)}
                title="Ask AI Tutor"
            >
                {isOpen ? <FaTimes /> : <FaRobot />}
                <span className="ai-widget-badge">AI 24/7</span>
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="ai-chat-window">
                    {/* Header */}
                    <div className="ai-chat-header">
                        <div className="ai-chat-header-title">
                            <div className="ai-avatar-icon">
                                <FaRobot />
                            </div>
                            <div>
                                <h4>AILearn AI Tutor</h4>
                                <span className="ai-status-indicator">
                                    <span style={{ fontSize: '8px' }}>🟢</span> Online & Ready
                                </span>
                            </div>
                        </div>

                        <div className="ai-header-controls">
                            <button 
                                className="ai-icon-btn" 
                                title="Clear Chat" 
                                onClick={clearChat}
                            >
                                <FaTrashAlt />
                            </button>
                            <button 
                                className="ai-icon-btn" 
                                title="Close" 
                                onClick={() => setIsOpen(false)}
                            >
                                <FaTimes />
                            </button>
                        </div>
                    </div>

                    {/* Messages List */}
                    <div className="ai-messages-list">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`chat-bubble ${msg.sender}`}>
                                <div className="chat-bubble-content">
                                    {msg.text.split('\n').map((line, lIdx) => {
                                        if (!line.trim()) {
                                            return <div key={lIdx} style={{ height: '6px' }} />;
                                        }
                                        
                                        // Replace **text** with <strong>text</strong>
                                        const parts = line.split(/(\*\*.*?\*\*)/g);
                                        return (
                                            <p key={lIdx} className="chat-line">
                                                {parts.map((part, pIdx) => {
                                                    if (part.startsWith('**') && part.endsWith('**')) {
                                                        return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
                                                    }
                                                    return part;
                                                })}
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="chat-bubble bot">
                                <div className="typing-dots">
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Suggested Chips */}
                    <div className="suggested-chips-row">
                        {quickChips.map((chip, idx) => (
                            <button 
                                key={idx} 
                                className="chip-btn"
                                onClick={() => handleSendMessage(chip)}
                            >
                                {chip}
                            </button>
                        ))}
                    </div>

                    {/* Input Bar */}
                    <div className="ai-chat-input-row">
                        <input 
                            type="text" 
                            placeholder="Ask AI Tutor anything..." 
                            value={inputMsg}
                            onChange={(e) => setInputMsg(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button 
                            className="send-msg-btn"
                            onClick={() => handleSendMessage()}
                            disabled={!inputMsg.trim()}
                        >
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AiTutorWidget;