import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ExploreSection = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target); // Optional: only animate once
        }
      });
    }, { threshold: 0.2 }); // Trigger when 20% visible

    const elements = sectionRef.current?.querySelectorAll('.polaroid');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="explore-section" ref={sectionRef}>
      <style>{`
        .explore-section {
          padding: 8rem 4rem;
          background-color: #FDFBF7;
          position: relative;
          z-index: 10;
          overflow: hidden;
        }
        
        .explore-container {
          display: flex;
          max-width: 1400px;
          margin: 0 auto;
          align-items: center;
          gap: 4rem;
        }
        
        .explore-content {
          flex: 1;
          position: relative;
          padding-right: 2rem;
        }
        
        .explore-subtitle {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(198, 255, 0, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          color: #121E2A;
          font-weight: 800;
          font-size: 0.8rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }
        
        .explore-title {
          font-size: 3.5rem;
          line-height: 1.1;
          color: #121E2A;
          font-weight: 900;
          margin-bottom: 2rem;
          font-family: 'Montserrat', sans-serif;
        }

        .explore-tagline {
          font-size: 1.2rem;
          color: var(--primary);
          font-weight: 800;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          letter-spacing: 1px;
        }

        .explore-desc-header {
          font-size: 1.4rem;
          font-weight: 800;
          color: #121E2A;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .explore-description {
          color: #666;
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 2.5rem;
        }

        
        .packages-subtitle {
          color: #AAAAAA;
          font-weight: 700;
          letter-spacing: 1px;
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .packages-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          row-gap: 1rem;
          column-gap: 2rem;
          list-style: none;
          margin-bottom: 3rem;
          color: #333;
          font-weight: 500;
          font-size: 1.05rem;
        }
        
        .packages-list li {
          display: flex;
          align-items: flex-start; /* Aligns icon with first line of text */
          gap: 0.8rem;
          line-height: 1.4;
        }
        
        .packages-list li svg {
          width: 22px;
          height: 22px;
          flex-shrink: 0;
          margin-top: 2px; /* Fine-tune icon vertical position */
        }
        
        .explore-actions {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }
        
        .book-now-solid {
          background-color: var(--primary);
          color: #121E2A;
          padding: 1rem 2.5rem;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: 800;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .book-now-solid:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(185, 255, 0, 0.3);
        }
        
        .explore-contact {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .phone-icon {
          background-color: rgba(185, 255, 0, 0.2);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .phone-details {
          display: flex;
          flex-direction: column;
        }
        
        .phone-number {
          color: #121E2A;
          font-size: 1.4rem;
          font-weight: 900;
        }
        
        .phone-label {
          color: #AAAAAA;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1px;
        }
        
        .explore-images {
          flex: 1;
          position: relative;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        

        
        .images-bg-blob {
          position: absolute;
          top: 50%;
          right: -5%;
          transform: translateY(-50%);
          width: 80%;
          height: 120%;
          background-image: linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.1)), url('https://res.cloudinary.com/dicvgtusz/image/upload/f_auto,q_auto,w_800/v1772084176/tharoushan-kandarajah-KtDXt7DyfVM-unsplash_yhkhrb.jpg');
          background-size: cover;
          background-position: center;
          border-radius: 40px;
          z-index: 0;
          opacity: 0.85;
        }
        
        .polaroid {
          position: absolute;
          background: white;
          padding: 10px;
          padding-bottom: 25px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
          /* Initial state for animation */
          opacity: 0;
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.8s ease;
          /* Force GPU acceleration to stop lag */
          will-change: transform, opacity;
          backface-visibility: hidden;
        }
        
        .polaroid img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        
        /* Hover effect overrides - applied AFTER intro animation finishes */
        .polaroid.animate-in:hover {
          transform: scale(1.05) translate3d(0,0,20px) !important;
          z-index: 10 !important;
          transition: transform 0.4s ease, z-index 0s;
        }
        
        /* Polaroid 1 - Top Left */
        .polaroid-1 {
          width: 380px;
          height: 250px;
          top: 5%;
          left: 0;
          z-index: 1;
          /* Hardware accelerated initial state */
          transform: translate3d(0, -80px, 0) rotateZ(0deg); 
          transition-delay: 0.1s;
        }
        .polaroid-1.animate-in {
          opacity: 1;
          transform: translate3d(0, 0, 0) rotateZ(-8deg); /* Final position */
        }
        
        /* Polaroid 2 - Bottom Left */
        .polaroid-2 {
          width: 320px;
          height: 220px;
          bottom: 0%;
          left: 5%;
          z-index: 2;
          transform: translate3d(0, -80px, 0) rotateZ(0deg);
          transition-delay: 0.3s; /* Staggered delay */
        }
        .polaroid-2.animate-in {
          opacity: 1;
          transform: translate3d(0, 0, 0) rotateZ(-12deg);
        }
        
        /* Polaroid 3 - Right */
        .polaroid-3 {
          width: 420px;
          height: 300px;
          top: 40%;
          right: 5%;
          z-index: 3;
          transform: translate3d(0, -80px, 0) rotateZ(0deg);
          transition-delay: 0.5s; /* Staggered delay */
        }
        .polaroid-3.animate-in {
          opacity: 1;
          transform: translate3d(0, 0, 0) rotateZ(4deg);
        }
        
        @media (max-width: 1024px) {
          .explore-section { padding: 4rem 2rem; }
          .explore-container { flex-direction: column; }
          .explore-title { 
            font-size: 2.5rem;
            line-height: 1.1;
            /* Removed max-width to prevent accidental word wrapping */
          }
          .packages-list { 
            grid-template-columns: 1fr !important; 
            gap: 1.2rem;
          }
          .packages-list li {
            font-size: 1.1rem;
          }
        }
        
        @media (max-width: 768px) {
          .explore-actions { flex-direction: column; align-items: flex-start; }
          .explore-images { min-height: 500px; width: 100%; }
          .polaroid-1 { width: 280px; height: 180px; }
          .polaroid-2 { width: 240px; height: 160px; left: 0; }
          .polaroid-3 { width: 300px; height: 210px; right: 0; top: 30%; }
        }
      `}</style>
      <div className="explore-container">
        
        {/* Left Content Column */}
        <div className="explore-content animate-fade-in-up">
          <div className="explore-subtitle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
            Unrushed passion, true Ceylon
          </div>
          <h3 className="explore-title">Don't Just Visit<br/> Sri Lanka.</h3>
          
          <p className="explore-tagline">Not Just a Tour… It’s Your Sri Lanka Story</p>


          <h4 className="explore-desc-header">Feel It</h4>
          
          <p className="explore-description">
            Skip the endless research, tourist traps, and travel anxiety. With Dew Ceylon Tours, you get 100% private journeys crafted by trusted local experts. We handle every single detail you simply show up and make the memories.
            <br/><br/>
            <strong>Your dream trip, zero stress</strong>
          </p>
          


          <div className="explore-actions" style={{ gap: '1rem', flexWrap: 'wrap' }}>
            <button className="book-now-solid" onClick={() => navigate('/packages')}>Popular Tours</button>
            <button 
              className="book-now-solid" 
              style={{ background: 'transparent', border: '2px solid #121E2A', color: '#121E2A' }}
              onMouseOver={(e) => { e.target.style.background = '#121E2A'; e.target.style.color = '#fff'; }}
              onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#121E2A'; }}
              onClick={() => navigate('/plan-my-trip')}
            >
              Plan My Trip
            </button>
            <div className="explore-contact">
              <div className="phone-icon">
                <svg viewBox="0 0 24 24" fill="var(--primary)" width="24" height="24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <div className="phone-details">
                <span className="phone-number">94 76 670 9935</span>
                <span className="phone-label">CALL NOW</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Images Column */}
        <div className="explore-images">
          <div className="images-bg-blob"></div>
          <div className="polaroid polaroid-1">
            <img src="https://res.cloudinary.com/dicvgtusz/image/upload/f_auto,q_auto,w_600/v1772526396/theres-no-taming-rapids-only-going-with-flow-shot-group-young-male-friends-white-water-rafting_rd0fxv.jpg" alt="Water Rafting" />
          </div>
          <div className="polaroid polaroid-3">
            <img src="https://res.cloudinary.com/dicvgtusz/image/upload/f_auto,q_auto,w_600/v1772524211/elephants-bathing-river-pinnawala-elephant-orphanage-sri-lanka_1_kd8kad.jpg" alt="Elephants Bathing" />
          </div>
          <div className="polaroid polaroid-2">
            <img src="https://res.cloudinary.com/dicvgtusz/image/upload/f_auto,q_auto,w_600/v1772526131/high-angle-view-woman-mountain-against-sky_xln5zm.jpg" alt="Woman Mountain" />
          </div>
        </div>


      </div>
    </section>
  );
};

export default ExploreSection;
