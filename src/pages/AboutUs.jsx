import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import aboutHero from '../assets/hero2.jpg';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <style>{`
        .about-page {
          background: #080c10;
          color: white;
          min-height: 100vh;
        }

        .about-hero {
          height: 70vh;
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
          opacity: 0.4;
        }

        .about-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 900px;
          padding: 0 2rem;
        }

        .about-hero-title {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 950;
          line-height: 1;
          margin-bottom: 2rem;
          letter-spacing: -2px;
          text-transform: uppercase;
        }

        .about-hero-title span {
          color: var(--primary, #c6ff00);
        }

        .section-padding {
          padding: 8rem 4rem;
        }

        .about-grid {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 6rem;
          align-items: center;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 40px;
          padding: 4rem;
          position: relative;
        }

        .glass-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 40px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(198, 255, 0, 0.2), transparent, rgba(255, 255, 255, 0.1));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .accent-title {
          font-size: 0.9rem;
          color: var(--primary, #c6ff00);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 4px;
          margin-bottom: 1rem;
          display: block;
        }

        .main-heading {
          font-size: 3rem;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 2rem;
        }

        .para {
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .value-item {
          padding: 3rem;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.4s ease;
        }

        .value-item:hover {
          background: rgba(198, 255, 0, 0.05);
          border-color: rgba(198, 255, 0, 0.2);
          transform: translateY(-10px);
        }

        .value-icon {
          width: 60px;
          height: 60px;
          background: var(--primary, #c6ff00);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #080c10;
          margin-bottom: 2rem;
        }

        .value-item h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        @media (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr; gap: 4rem; }
          .section-padding { padding: 5rem 2rem; }
          .glass-card { padding: 3rem 2rem; }
        }
      `}</style>

      <div className="about-hero">
        <img src={aboutHero} alt="Ceylon Landscape" className="about-hero-img" />
        <div className="about-hero-content">
          <span className="accent-title animate-fade-in-up">Our Story</span>
          <h1 className="about-hero-title animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Crafting Your Unforgettable <span>Ceylon Story</span>
          </h1>
        </div>
      </div>

      <section className="section-padding">
        <div className="about-grid">
          <div className="animate-fade-in-up">
            <span className="accent-title">Who We Are</span>
            <h2 className="main-heading">More Than Just A Travel Agency</h2>
            <p className="para">
              At Dew Ceylon, we believe that travel is not just about visiting new places; it's about connecting with the soul of a destination. Founded with a passion for the untamed beauty of Sri Lanka, we've dedicated ourselves to curating experiences that go beyond the ordinary.
            </p>
            <p className="para" style={{marginTop: '1.5rem'}}>
              Our team of local experts brings decades of experience and deep-rooted connections to offer you exclusive access to the hidden gems of our island paradise. From the misty mountains of Ella to the historic streets of Galle, we are your trusted companions in discovering the magic of Ceylon.
            </p>
          </div>
          <div className="glass-card animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <span className="accent-title">Our Mission</span>
            <h3 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem'}}>Authenticity & Excellence</h3>
            <p className="para">
              Our mission is simple: to provide hyper-personalized, sustainably-conscious travel experiences that leave a lasting positive impact on both our guests and the local communities we cherish.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{background: 'rgba(255,255,255,0.01)'}}>
        <div style={{textAlign: 'center', marginBottom: '5rem'}}>
          <span className="accent-title">Core Values</span>
          <h2 className="main-heading">The Pillars of Our Service</h2>
        </div>
        
        <div className="values-grid">
          <div className="value-item">
            <div className="value-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
            <h3>Pristine Safety</h3>
            <p className="para">Your peace of mind is our priority, ensuring every journey is as secure as it is spectacular.</p>
          </div>

          <div className="value-item">
            <div className="value-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
              </svg>
            </div>
            <h3>Local Expertise</h3>
            <p className="para">Deep-rooted knowledge of Ceylon's heritage, culture, and hidden landscapes.</p>
          </div>

          <div className="value-item">
            <div className="value-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.42 4.58a5 5 0 0 0-7.07 0l-.35.35-.35-.35a5 5 0 0 0-7.07 7.07l.35.35L12 19l6.02-6.02.35-.35a5 5 0 0 0 0-7.07z"/>
              </svg>
            </div>
            <h3>Hearth Felt Care</h3>
            <p className="para">We treat every traveler as family, providing warm hospitality that defines Sri Lanka.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
