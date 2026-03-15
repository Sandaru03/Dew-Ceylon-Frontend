import React, { useEffect, useRef } from 'react';
import img1 from '../assets/hero.jpg';
import img2 from '../assets/hero2.jpg';
import img3 from '../assets/hero4.jpg';
import blobBg from '../assets/hero3.jpg';

const ExploreSection = () => {
  const sectionRef = useRef(null);

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
          font-size: 5rem;
          line-height: 0.95;
          color: #121E2A;
          font-weight: 900;
          margin-bottom: 2rem;
          font-family: 'Montserrat', sans-serif;
        }
        
        .discount-badge {
          position: absolute;
          top: 10px;
          right: -30px;
          width: 220px;
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: badge-spin 10s linear infinite;
        }
        
        @keyframes badge-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        
        .badge-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        
        .badge-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #121E2A;
          font-weight: 900;
          text-align: center;
          /* counter-rotate so text stays readable while star spins */
          animation: badge-counter-spin 10s linear infinite;
        }
        
        @keyframes badge-counter-spin {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(-360deg); }
        }
        
        .badge-small {
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: 0.5px;
        }
        
        .badge-large {
          font-size: 2.2rem;
          line-height: 1;
          margin: 0.2rem 0;
          letter-spacing: -1px;
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
          align-items: center;
          gap: 0.8rem;
        }
        
        .packages-list li svg {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
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
          background-image: linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.1)), url(${blobBg});
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
          .explore-container { flex-direction: column; }
          .discount-badge {
            position: relative;
            margin-left: auto;
            top: 0;
            margin-top: -60px;
            margin-bottom: 20px;
          }
          .explore-title { font-size: 3.5rem; }
        }
        
        @media (max-width: 768px) {
          .packages-list { grid-template-columns: 1fr; }
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
            </svg>
            TIME TO TRAVEL
          </div>
          <h2 className="explore-title">EXPLORE<br/>WITH US</h2>
          
          <div className="discount-badge">
            {/* Scalloped / wavy star SVG — spins with the badge */}
            <svg viewBox="0 0 100 100" className="badge-bg">
              <polygon
                fill="var(--primary)"
                points="
                  50,4    57.8,10.8  67.6,7.5   72.2,16.7
                  82.5,17.5 83.3,27.8 92.5,32.4  89.2,42.2
                  96,50   89.2,57.8  92.5,67.6  83.3,72.2
                  82.5,82.5 72.2,83.3 67.6,92.5  57.8,89.2
                  50,96   42.2,89.2  32.4,92.5  27.8,83.3
                  17.5,82.5 16.7,72.2 7.5,67.6   10.8,57.8
                  4,50    10.8,42.2  7.5,32.4   16.7,27.8
                  17.5,17.5 27.8,16.7 32.4,7.5   42.2,10.8
                "
              />
            </svg>
            {/* Text counter-rotates to stay upright */}
            <div className="badge-text">
              <span className="badge-small">Get Up to</span>
              <span className="badge-large">50% Off</span>
              <span className="badge-small">DISCOUNT</span>
            </div>
          </div>

          <h4 className="packages-subtitle">ALL PACKAGES INCLUDE</h4>
          
          <ul className="packages-list">
            <li>
              <svg viewBox="0 0 24 24" fill="var(--primary)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              Travel Insurance
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="var(--primary)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              Hotel Booking
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="var(--primary)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              Return Flight
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="var(--primary)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              Air Tickets
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="var(--primary)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              Accommodation
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="var(--primary)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              Visa Services
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="var(--primary)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              Vehicle Rentals
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="var(--primary)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              Vehicle Rentals
            </li>
          </ul>

          <div className="explore-actions">
            <button className="book-now-solid">Book Now</button>
            <div className="explore-contact">
              <div className="phone-icon">
                <svg viewBox="0 0 24 24" fill="var(--primary)" width="24" height="24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <div className="phone-details">
                <span className="phone-number">410-123-4597</span>
                <span className="phone-label">CALL NOW</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Images Column */}
        <div className="explore-images">
          <div className="images-bg-blob"></div>
          <div className="polaroid polaroid-1">
            <img src={img3} alt="Mountain" />
          </div>
          <div className="polaroid polaroid-3">
            <img src={img1} alt="Jeep Safari" />
          </div>
          <div className="polaroid polaroid-2">
            <img src={img2} alt="Snow Leopard" />
          </div>
        </div>


      </div>
    </section>
  );
};

export default ExploreSection;
