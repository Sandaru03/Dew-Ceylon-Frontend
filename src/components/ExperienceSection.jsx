import React from 'react';
import imgMain from '../assets/hero.jpg';
import imgSub from '../assets/hero4.jpg';

const ExperienceSection = () => {
  return (
    <section className="experience-section">
      <style>{`
        .experience-section {
          padding: 8rem 4rem;
          background: #ffffff;
          position: relative;
          z-index: 10;
          overflow: hidden;
        }

        .exp-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }

        /* ─── LEFT COLLAGE ─── */
        .exp-collage {
          position: relative;
          height: 600px;
        }

        .exp-plane-path {
          position: absolute;
          left: -120px; /* Shifted way more to the left so it's clearly visible */
          top: 15%;
          width: 300px;
          height: 350px;
          z-index: 1;
          pointer-events: none;
        }

        .exp-plane-icon {
          position: absolute;
          left: -20px;
          top: -20px;
          color: var(--primary, #c6ff00);
          /* airplane SVG natural orientation is 45deg top-right,
             offset-path assumes 0deg is Right. */
          /* Extended curve with a loop to go behind the image: */
          offset-path: path('M 60 20 C 60 180, 240 120, 240 220 C 240 320, 20 320, 20 220 C 20 120, 150 250, 280 330');
          offset-rotate: auto 45deg; 
          animation: plane-fly-exp 5s linear infinite;
          will-change: offset-distance, opacity;
        }

        @keyframes plane-fly-exp {
          0% {
            offset-distance: 0%;
            opacity: 1;
          }
          90% {
            opacity: 1; /* Stay visible until right behind the image */
          }
          100% {
            offset-distance: 100%;
            opacity: 0; /* Fade out as it goes deep behind the picture */
          }
        }

        .exp-main-img {
          position: absolute;
          top: 0;
          left: 40px;
          width: 380px;
          height: 520px;
          border-radius: 40px 40px 100px 40px;
          overflow: hidden;
          z-index: 2;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .exp-main-img img { width: 100%; height: 100%; object-fit: cover; }

        .exp-sub-img {
          position: absolute;
          bottom: 20px;
          right: 0;
          width: 260px;
          height: 180px;
          border-radius: 20px;
          overflow: hidden;
          z-index: 4;
          border: 8px solid #ffffff;
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        }
        .exp-sub-img img { width: 100%; height: 100%; object-fit: cover; }

        /* Scalloped badge copied from Explore */
        .exp-discount-badge {
          position: absolute;
          top: 280px;
          right: -10px;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
          animation: exp-badge-spin 12s linear infinite;
          will-change: transform;
        }
        @keyframes exp-badge-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .exp-badge-bg {
          position: absolute;
          inset: 0;
          z-index: -1;
        }
        .exp-badge-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #121E2A;
          text-align: center;
          animation: exp-badge-counter-spin 12s linear infinite;
        }
        @keyframes exp-badge-counter-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        .exp-badge-small { font-size: 0.8rem; font-weight: 700; line-height: 1.2; font-family: 'Caveat', cursive; }
        .exp-badge-large { font-size: 1.8rem; font-weight: 900; line-height: 1; letter-spacing: -1px; }

        /* ─── RIGHT CONTENT ─── */
        .exp-content { padding-right: 2rem; }

        /* Pill Tag */
        .exp-pill {
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

        .exp-heading {
          font-size: 3.2rem;
          font-weight: 900;
          color: #121E2A;
          line-height: 1.15;
          letter-spacing: -1px;
          margin-bottom: 1.5rem;
        }

        .exp-desc {
          color: #666;
          font-size: 0.95rem;
          line-height: 1.8;
          margin-bottom: 2.5rem;
        }

        /* 2 Column Features */
        .exp-features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2.5rem;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid #eee;
        }

        .exp-feature {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .exp-feat-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--primary, #c6ff00);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #121E2A;
          flex-shrink: 0;
        }

        .exp-feat-text h4 {
          font-size: 1.1rem;
          font-weight: 800;
          color: #121E2A;
          margin: 0 0 0.5rem 0;
        }

        .exp-feat-text p {
          font-size: 0.85rem;
          color: #888;
          line-height: 1.6;
          margin: 0;
        }

        /* Bottom Section: Box + Bullets */
        .exp-bottom-row {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }

        .exp-award-box {
          border: 1px solid #eee;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: 140px;
          background: #fff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
        }

        .exp-award-icon {
          color: var(--primary, #c6ff00);
          margin-bottom: 0.8rem;
        }
        
        .exp-award-box span {
          font-size: 0.8rem;
          font-weight: 800;
          color: #121E2A;
          line-height: 1.3;
        }

        .exp-bullets {
          flex: 1;
        }

        .exp-bullet-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .exp-bullet-list li {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.9rem;
          color: #444;
          font-weight: 500;
        }

        .exp-bullet-list li svg {
          color: #121E2A;
          background: var(--primary, #c6ff00);
          border-radius: 50%;
          padding: 3px;
          width: 20px;
          height: 20px;
        }

        .exp-cta-btn {
          display: inline-flex;
          align-items: center;
          background: var(--primary, #c6ff00);
          color: #121E2A;
          padding: 0.8rem 2.5rem;
          border-radius: 30px;
          font-weight: 800;
          font-size: 0.95rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .exp-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(198,255,0,0.3);
        }

        /* Faint Eiffel Tower BG */
        .exp-bg-tower {
          position: absolute;
          right: -5%;
          bottom: 0;
          height: 90%;
          opacity: 0.03;
          z-index: 0;
          pointer-events: none;
        }

        @media (max-width: 1024px) {
          .exp-inner { grid-template-columns: 1fr; gap: 4rem; }
          .exp-collage { height: 500px; max-width: 500px; margin: 0 auto; }
          .exp-content { padding-right: 0; }
          .exp-bg-tower { display: none; }
        }

        @media (max-width: 600px) {
          .experience-section { padding: 5rem 2rem; }
          .exp-collage { transform: scale(0.8); height: 420px; left: -20px; }
          .exp-features-grid { grid-template-columns: 1fr; }
          .exp-bottom-row { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
          .exp-award-box { width: 100%; flex-direction: row; gap: 1.5rem; padding: 1rem; text-align: left; }
          .exp-award-icon { margin-bottom: 0; }
        }
      `}</style>
      
      {/* Eiffel Tower faint SVG */}
      <svg className="exp-bg-tower" viewBox="0 0 100 300" preserveAspectRatio="xMidYMax meet">
        <path fill="currentColor" d="M40 300L45 150L48 50L50 10L52 50L55 150L60 300H40ZM35 300C35 280 65 280 65 300H35Z" />
      </svg>

      <div className="exp-inner">
        
        {/* ── LEFT: COLLAGE ── */}
        <div className="exp-collage">
          {/* Airplane Animated Path - Now a true SVG curve */}
          <div className="exp-plane-path">
            <svg width="300" height="350" viewBox="0 0 300 350" fill="none">
              <path 
                d="M 60 20 C 60 180, 240 120, 240 220 C 240 320, 20 320, 20 220 C 20 120, 150 250, 280 330" 
                stroke="var(--primary, #c6ff00)" 
                strokeWidth="3" 
                strokeDasharray="8 8" 
                strokeLinecap="round"
              />
            </svg>
            <svg className="exp-plane-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21.5 4c0 0-2-.5-3.5 1L14.5 8.5 6.3 6.7C5.8 6.6 5.3 6.8 5 7.1L4.2 7.9c-.2.2-.2.5 0 .7l7.4 3.7-3.6 3.6-3.8-.9c-.2-.1-.5 0-.7.2l-.7.7c-.2.2-.2.5 0 .7l4.3 1.8 1.8 4.3c.2.2.5.2.7 0l.7-.7c.2-.2.3-.5.2-.7l-.9-3.8 3.6-3.6 3.7 7.4c.2.2.5.2.7 0l.8-.8c.3-.3.5-.8.4-1.3z"/>
            </svg>
          </div>

          <div className="exp-main-img">
            <img src={imgMain} alt="Travel Couple" />
          </div>

          <div className="exp-sub-img">
            <img src={imgSub} alt="Beach Relax" />
          </div>

          <div className="exp-discount-badge">
            <svg viewBox="0 0 100 100" className="exp-badge-bg">
              <polygon
                fill="#ffffff"
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
            <div className="exp-badge-text">
              <span className="exp-badge-small">50%</span>
              <span className="exp-badge-small">Discount</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: CONTENT ── */}
        <div className="exp-content">
          <div className="exp-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
            </svg>
            GET TO KNOW US
          </div>

          <h2 className="exp-heading">
            Experience the World with Our Company
          </h2>

          <p className="exp-desc">
            There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form, by injected humour,
          </p>

          <div className="exp-features-grid">
            <div className="exp-feature">
              <div className="exp-feat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
              <div className="exp-feat-text">
                <h4>Friendly Guide</h4>
                <p>There are many variations of passages of lorem ipsum.</p>
              </div>
            </div>

            <div className="exp-feature">
              <div className="exp-feat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 7h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM9 4h6v3H9V4z"/>
                  <path d="M12 12v6"/>
                  <path d="M9 15h6"/>
                </svg>
              </div>
              <div className="exp-feat-text">
                <h4>Safety Travel</h4>
                <p>There are many variations of passages of lorem ipsum.</p>
              </div>
            </div>
          </div>

          <div className="exp-bottom-row">
            <div className="exp-award-box">
              <div className="exp-award-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 5h-2V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v2H5a2 2 0 0 0-2 2v1a5 5 0 0 0 4.09 4.9A5 5 0 0 0 11 12h2a5 5 0 0 0 3.91-1.1A5 5 0 0 0 21 8V7a2 2 0 0 0-2-2zM5 8V7h2v2a3 3 0 0 1-2-1zm14 0a3 3 0 0 1-2 1V7h2v1zM11 14h2a3 3 0 0 0 2-1v-1h-6v1a3 3 0 0 0 2 1z"/>
                  <path d="M14 15h-4v4h-2v2h8v-2h-2v-4z"/>
                </svg>
              </div>
              <span>Award Winning<br/>Agency</span>
            </div>

            <div className="exp-bullets">
              <ul className="exp-bullet-list">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Many variations of passages of lorem.
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Many variations of passages of lorem.
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Expert many variations teacher.
                </li>
              </ul>
              <button className="exp-cta-btn" onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore More
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
