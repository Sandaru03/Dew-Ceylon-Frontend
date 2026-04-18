import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExperienceSection = () => {
  const navigate = useNavigate();
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
          offset-path: path('M 60 20 C 60 180, 240 120, 240 220 C 240 320, 20 320, 20 220 C 20 120, 150 250, 280 330');
          offset-rotate: auto 45deg; 
          animation: plane-fly-exp 5s linear infinite;
          will-change: offset-distance;
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
          margin: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem 1.5rem;
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
          .exp-inner { grid-template-columns: 1fr; gap: 3.2rem; }
          .exp-collage {
            height: 540px;
            width: min(100%, 520px);
            margin: 0 auto;
          }
          .exp-main-img {
            left: 0;
            width: 78%;
            height: 88%;
            border-radius: 32px 32px 88px 32px;
          }
          .exp-sub-img {
            right: 0;
            bottom: 0;
            width: 52%;
            height: 34%;
            border-width: 6px;
          }
          .exp-plane-path {
            left: -90px;
            top: 10%;
            transform: scale(0.85);
            transform-origin: top left;
          }
          .exp-content { padding-right: 0; }
          .exp-bg-tower { display: none; }
        }

        @media (max-width: 768px) {
          .experience-section { padding: 4.8rem 1.25rem; }
          .exp-inner { gap: 2.2rem; }
          .exp-collage {
            width: min(100%, 360px);
            height: 430px;
          }
          .exp-main-img {
            width: 84%;
            height: 82%;
            border-radius: 24px 24px 64px 24px;
          }
          .exp-sub-img {
            width: 58%;
            height: 34%;
            border-width: 4px;
          }
          .exp-plane-path { display: none; }

          .exp-pill {
            font-size: 0.72rem;
            letter-spacing: 0.6px;
            margin-bottom: 1rem;
          }
          .exp-heading {
            font-size: 2.1rem;
            line-height: 1.2;
            margin-bottom: 1rem;
          }
          .exp-desc {
            margin-bottom: 1.7rem;
          }
          .exp-features-grid { grid-template-columns: 1fr; }
          .exp-feature { gap: 0.8rem; }
          .exp-feat-icon {
            width: 44px;
            height: 44px;
          }
          .exp-bottom-row { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
          .exp-award-box { width: 100%; flex-direction: row; gap: 1.5rem; padding: 1rem; text-align: left; }
          .exp-award-icon { margin-bottom: 0; }
          .exp-cta-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .experience-section {
            padding: 4.2rem 1rem;
          }
          .exp-collage {
            width: 100%;
            height: 380px;
          }
          .exp-main-img {
            width: 86%;
            height: 80%;
            border-radius: 20px 20px 52px 20px;
          }
          .exp-sub-img {
            width: 62%;
            height: 33%;
          }
          .exp-heading {
            font-size: 1.85rem;
          }
          .exp-bullet-list li {
            align-items: flex-start;
            line-height: 1.45;
          }
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
            <img src="https://res.cloudinary.com/dicvgtusz/image/upload/f_auto,q_auto,w_800/v1774240427/hero_1_hqhomo.jpg" alt="Water Fall Main" />
          </div>

          <div className="exp-sub-img">
            <img src="https://res.cloudinary.com/dicvgtusz/image/upload/f_auto,q_auto,w_500/v1774240526/demodara-nine-arch-bridge-ella-sri-lanka.jpg_1_xm706n.jpg" alt="Nine Arch Bridge" />
          </div>

        </div>

        {/* ── RIGHT: CONTENT ── */}
        <div className="exp-content">
          <div className="exp-pill">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            Why Book with us
          </div>

          <h2 className="exp-heading">
            Why Book With Dew Ceylon?
          </h2>

          <p className="exp-desc">
            Experience true Ceylon with our specially curated journeys, blending luxury, authenticity, and unparalleled comfort for a once-in-a-lifetime adventure.
          </p>

          <div className="exp-bottom-row">
            <div className="exp-bullets">
              <ul className="exp-bullet-list">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  No-Regrets Itineraries
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Stories You Can’t Google
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Zero Hidden Fees
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Travel Your Way, VIP Always
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  24/7 On-Ground Support
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Memories for Every Generation
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
