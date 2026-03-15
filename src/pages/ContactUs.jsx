import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Contact form submitted:', formData);
    alert('Thank you for contacting us! We will get back to you shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    navigate('/');
  };

  return (
    <div className="contact-page">
      <style>{`
        .contact-page {
          min-height: 100vh;
          background-color: var(--bg-dark, #0F0F0F);
          color: var(--text-white, #ffffff);
          padding: 8rem 2rem 4rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Abstract ambient background elements */
        .ambient-glow-1 {
          position: absolute;
          top: -10%;
          right: -5%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(185, 255, 0, 0.15) 0%, transparent 60%);
          filter: blur(60px);
          z-index: 0;
          border-radius: 50%;
        }

        .ambient-glow-2 {
          position: absolute;
          bottom: -10%;
          left: -5%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 60%);
          filter: blur(60px);
          z-index: 0;
          border-radius: 50%;
        }

        .contact-container {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 3rem;
          max-width: 1100px;
          width: 100%;
          z-index: 10;
        }

        .contact-info-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          animation: slideInLeft 0.6s ease-out forwards;
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .contact-info-section h1 {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          line-height: 1.1;
          letter-spacing: -2px;
        }

        .contact-info-section h1 span {
          color: var(--primary, #b9ff00);
        }

        .contact-info-section p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.1rem;
          margin-bottom: 3rem;
          line-height: 1.6;
          max-width: 400px;
        }

        .info-cards {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .info-card {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .info-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(185, 255, 0, 0.3);
          transform: translateY(-5px);
        }

        .icon-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(185, 255, 0, 0.1);
          color: var(--primary, #b9ff00);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
        }

        .info-content h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.3rem;
          color: white;
        }

        .info-content p {
          margin: 0;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .contact-form-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 3rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          animation: slideInRight 0.6s ease-out forwards;
        }

        .form-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .contact-page label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
        }

        .contact-page input, .contact-page textarea {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 1rem 1.2rem;
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
          width: 100%;
        }

        .contact-page input:focus, .contact-page textarea:focus {
          outline: none;
          border-color: var(--primary, #b9ff00);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 4px rgba(185, 255, 0, 0.1);
        }

        .contact-page input::placeholder, .contact-page textarea::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .contact-page textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          background: var(--primary, #b9ff00);
          color: var(--bg-dark, #0F0F0F);
          padding: 1rem 2.5rem;
          border-radius: 30px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          width: 100%;
          margin-top: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.8rem;
        }

        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(185, 255, 0, 0.3);
        }

        @media (max-width: 992px) {
          .contact-container {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          .contact-info-section {
            text-align: center;
            align-items: center;
          }
          .contact-info-section h1 {
            font-size: 3rem;
          }
          .info-card {
            text-align: left;
            width: 100%;
            max-width: 500px;
          }
        }

        @media (max-width: 576px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .contact-form-card {
            padding: 2rem 1.5rem;
          }
          .contact-info-section h1 {
            font-size: 2.5rem;
          }
        }
      `}</style>
      
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>

      <div className="contact-container">
        
        {/* Left Info Section */}
        <div className="contact-info-section">
          <h1>Get In <span>Touch</span></h1>
          <p>Ready to start your Sri Lankan adventure? We are here to help you plan the perfect journey.</p>
          
          <div className="info-cards">
            <div className="info-card">
              <div className="icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="info-content">
                <h3>Phone</h3>
                <p>+94 77 123 4567</p>
              </div>
            </div>

            <div className="info-card">
              <div className="icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="info-content">
                <h3>Email</h3>
                <p>hello@dewceylon.com</p>
              </div>
            </div>

            <div className="info-card">
              <div className="icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="info-content">
                <h3>Office</h3>
                <p>123 Palm Avenue, Colombo, Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="contact-form-card">
          <h2 className="form-title">Send a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder="Your Name" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  placeholder="Your email" 
                  required 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Subject</label>
              <input 
                type="text" 
                name="subject" 
                value={formData.subject} 
                onChange={handleInputChange} 
                placeholder="How can we help you?" 
                required 
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleInputChange} 
                placeholder="Write your message here..." 
                required 
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Message
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;
