import React, { useState } from 'react';
import axios from 'axios';
import '../styles/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ success: null, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !formData.name ||
    !formData.email ||
    !formData.subject ||
    !formData.message
  ) {
    setStatus({
      success: false,
      message: 'Please fill in all fields.'
    });
    return;
  }

  setLoading(true);
  setStatus({ success: null, message: '' });

  const newTicket = {
    id: 'TCK-' + Math.floor(100 + Math.random() * 900),
    student: formData.name,
    email: formData.email,
    subject: formData.subject,
    category: 'General Inquiry',
    priority: 'Medium',
    status: 'Open',
    message: formData.message,
    date: new Date().toISOString().split('T')[0]
  };

  // Try sending the ticket to the backend.
  try {
  const response = await axios.post(
    'https://ai-learning-backend-o3m1.onrender.com/api/contact',
    formData
  );

  if (response.data && response.data.success) {
    console.log('Contact ticket sent successfully.');
  }
} catch (error) {
  console.log(
    'Backend contact route not reachable, storing ticket locally:',
    error.message
  );
}

  // Save the ticket locally for the Admin Panel.
  try {
    const existingTickets = JSON.parse(
      localStorage.getItem('admin_tickets') || '[]'
    );

    existingTickets.unshift(newTicket);

    localStorage.setItem(
      'admin_tickets',
      JSON.stringify(existingTickets)
    );
  } catch (error) {
    console.error('Error saving ticket:', error);
  }

  setTimeout(() => {
    setLoading(false);

    setStatus({
      success: true,
      message:
        '🎉 Thank you! Your support ticket has been created. Ticket ID: ' +
        newTicket.id
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  }, 600);
};


  return (
    <div className="contact-page-wrapper">
      {/* Decorative Light Elements for Background Glass Effect */}
      <div className="glow-circle glow-1"></div>
      <div className="glow-circle glow-2"></div>

      <div className="contact-content-container">
        <div className="contact-header">
          <h2>Get in Touch with AILearn Support</h2>
          <p>Have a question or facing an issue? Send us a message and our team will get back to you promptly.</p>
        </div>

        <div className="glass-card-wrapper">
          {/* Left Panel: Info Card */}
          <div className="glass-info-card">
            <h3>Contact Details</h3>
            <p className="info-desc">Reach out directly or fill out the form to submit a support ticket.</p>

            <div className="info-list">
              <div className="info-item">
                <div className="icon-wrapper">📍</div>
                <div>
                  <strong>Location</strong>
                  <p>AILearn Tech Labs, Innovation Hub</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-wrapper">📞</div>
                <div>
                  <strong>Support Line</strong>
                  <p>+91 (800) 123-4567</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-wrapper">✉️</div>
                <div>
                  <strong>Official Email</strong>
                  <p>support@ailearn.io</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-wrapper">⏱️</div>
                <div>
                  <strong>Response Time</strong>
                  <p>Within 2 to 4 business hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Glass Form */}
          <div className="glass-form-card">
            {status.message && (
              <div className={`status-toast ${status.success ? 'success' : 'error'}`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="glass-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Rahul Sharma"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="rahul@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Issue with Video playback or Certificate"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Describe your issue or feedback in detail..."
                  rows="4"
                ></textarea>
              </div>

              <button type="submit" className="glass-submit-btn" disabled={loading}>
                {loading ? <span className="btn-spinner"></span> : 'Send Message 🚀'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;