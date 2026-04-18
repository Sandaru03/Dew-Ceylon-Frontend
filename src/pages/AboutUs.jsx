import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import aboutHero from '../assets/hero2.jpg';

const AboutUs = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <style>{`
        .about-page {
          background: #05080a;
          color: white;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
        }

        .back-nav {
          position: fixed;
          top: 2rem;
          left: 2rem;
          z-index: 100;
          animation: fadeInDown 0.8s ease-out;
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 0.8rem 1.6rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .back-link:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: var(--primary, #c6ff00);
          color: var(--primary, #c6ff00);
          transform: translateX(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }

        .about-hero {
          height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .about-hero-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.5;
          filter: brightness(0.6) contrast(1.1);
        }

        .about-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 60%, #05080a 100%);
        }

        .about-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 1000px;
          padding: 0 2rem;
        }

        .about-hero-title {
          font-size: clamp(3.5rem, 10vw, 6.5rem);
          font-weight: 950;
          line-height: 0.9;
          margin-bottom: 2.5rem;
          letter-spacing: -3px;
          text-transform: uppercase;
          opacity: 0;
          animation: fadeInUp 1s ease-out forwards 0.3s;
        }

        .about-hero-title span {
          color: var(--primary, #c6ff00);
          display: block;
        }

        .hero-scroll-indicator {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: rgba(255,255,255,0.4);
          font-size: 0.8rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0) translateX(-50%);}
          40% {transform: translateY(-10px) translateX(-50%);}
          60% {transform: translateY(-5px) translateX(-50%);}
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .section-padding {
          padding: 10rem 4rem;
        }

        .story-section {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8rem;
          align-items: center;
        }

        .story-visual {
          position: relative;
          border-radius: 40px;
          overflow: hidden;
          aspect-ratio: 4/5;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }

        .story-visual img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .story-visual:hover img {
          transform: scale(1.05);
        }

        .accent-title {
          font-size: 0.85rem;
          color: var(--primary, #c6ff00);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 5px;
          margin-bottom: 1.5rem;
          display: block;
        }

        .main-heading {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.05;
          margin-bottom: 2.5rem;
          letter-spacing: -1px;
        }

        .para {
          font-size: 1.2rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 2rem;
        }

        .values-container {
          background: rgba(255,255,255,0.02);
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .value-card {
          padding: 4.5rem 3.5rem;
          background: rgba(255, 255, 255, 0.035);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 40px;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
          position: relative;
          overflow: hidden;
        }

        .value-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), transparent);
          pointer-events: none;
        }

        .value-card:hover {
          background: rgba(198, 255, 0, 0.04);
          border-color: rgba(198, 255, 0, 0.25);
          transform: translateY(-15px);
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
        }

        .value-icon-box {
          width: 70px;
          height: 70px;
          background: var(--primary, #c6ff00);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #080c10;
          margin-bottom: 2.5rem;
          box-shadow: 0 10px 20px rgba(198, 255, 0, 0.2);
        }

        .value-card h3 {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 1.2rem;
          color: #ffffff;
        }

        @media (max-width: 1024px) {
          .story-section { grid-template-columns: 1fr; gap: 4rem; text-align: center; }
          .story-visual { order: 2; height: 400px; }
          .values-grid { grid-template-columns: 1fr; gap: 2rem; }
          .section-padding { padding: 6rem 2rem; }
          .main-heading { font-size: 2.8rem; }
          .back-nav { top: 1.5rem; left: 1.5rem; }
        }
      `}</style>

      <nav className="back-nav">
        <button onClick={() => navigate('/')} className="back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Home
        </button>
      </nav>

      <div className="about-hero">
        <img src={aboutHero} alt="Ceylon Landscape" className="about-hero-img" />
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <span className="accent-title">Our Legacy</span>
          <h1 className="about-hero-title">
            Crafting Your Unforgettable <span>Ceylon Story</span>
          </h1>
        </div>
        <div className="hero-scroll-indicator">
          <span>Scroll</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </div>
      </div>

      <section className="section-padding">
        <div className="story-section">
          <div className="animate-fade-in-up">
            <span className="accent-title">The Vision</span>
            <h2 className="main-heading">More Than Just a Journey</h2>
            <p className="para">
              At Dew Ceylon, we believe that travel is not just about visiting new places; it's about connecting with the soul of a destination. Founded with a passion for the untamed beauty of Sri Lanka, we've dedicated ourselves to curating experiences that go beyond the ordinary.
            </p>
            <p className="para">
              Our team of local experts brings decades of experience and deep-rooted connections to offer you exclusive access to the hidden gems of our island paradise. From the misty mountains of Ella to the historic streets of Galle, we are your trusted companions in discovering the magic of Ceylon.
            </p>
          </div>
          <div className="story-visual animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <img src="https://res.cloudinary.com/dicvgtusz/image/upload/v1772084176/tharoushan-kandarajah-KtDXt7DyfVM-unsplash_yhkhrb.jpg" alt="Sri Lanka Heritage" />
          </div>
        </div>
      </section>

      <section className="section-padding values-container">
        <div style={{textAlign: 'center', marginBottom: '6rem'}}>
          <span className="accent-title">The Pillars</span>
          <h2 className="main-heading">Our Core Philosophy</h2>
        </div>
        
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon-box">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
            <h3>Pristine Safety</h3>
            <p className="para">Your peace of mind is our absolute priority, ensuring every journey is as secure as it is spectacular.</p>
          </div>

          <div className="value-card">
            <div className="value-icon-box">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4l0 0M12 16h.01"/>
              </svg>
            </div>
            <h3>Local Expertise</h3>
            <p className="para">Deep-rooted knowledge of Ceylon's heritage, culture, and hidden landscapes that others miss.</p>
          </div>

          <div className="value-card">
            <div className="value-icon-box">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.42 4.58a5 5 0 0 0-7.07 0l-.35.35-.35-.35a5 5 0 0 0-7.07 7.07l.35.35L12 19l6.02-6.02.35-.35a5 5 0 0 0 0-7.07z"/>
              </svg>
            </div>
            <h3>Heartfelt Care</h3>
            <p className="para">We treat every traveler as family, providing warm hospitality that truly defines the Sri Lankan spirit.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
