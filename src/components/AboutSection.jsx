import React from 'react';
import img1 from '../assets/hero.jpg';
import img2 from '../assets/hero2.jpg';
import img3 from '../assets/hero4.jpg';

const AboutSection = () => {
  return (
    <section className="about-section">
      <style>{`
        .about-section {
          padding: 8rem 4rem;
          background: #ffffff;
          position: relative;
          z-index: 10;
          overflow: hidden;
        }

        .about-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }

        /* ─── LEFT COLLAGE ─── */
        .ab-collage {
          position: relative;
          height: 600px;
        }

        /* Airplane path deco */
        .ab-plane-path {
          position: absolute;
          left: -80px;
          top: 30%;
          width: 250px;
          height: 250px;
          border-left: 1px dashed rgba(0,0,0,0.12);
          border-bottom: 1px dashed rgba(0,0,0,0.12);
          border-bottom-left-radius: 120px;
          z-index: 1;
          pointer-events: none;
        }

        /* Center Arch */
        .ab-arch {
          position: absolute;
          right: 0;
          width: 280px;
          height: 480px;
          border-radius: 140px 140px 140px 140px;
          overflow: hidden;
          z-index: 2;
        }
        .ab-arch-border {
          position: absolute;
          right: -15px;
          top: 25px;
          width: 280px;
          height: 480px;
          border-radius: 140px;
          border: 1px solid var(--primary, #c6ff00);
          z-index: 1;
          opacity: 0.5;
          pointer-events: none;
        }
        .ab-arch img { width: 100%; height: 100%; object-fit: cover; }

        /* Top Left Circle */
        .ab-circle-top {
          position: absolute;
          left: 40px;
          top: 40px;
          width: 190px;
          height: 190px;
          border-radius: 50%;
          overflow: hidden;
          z-index: 3;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }
        .ab-circle-top img { width: 100%; height: 100%; object-fit: cover; }

        /* Bottom Left Circle */
        .ab-circle-bot {
          position: absolute;
          left: 60px;
          bottom: 20px;
          width: 190px;
          height: 190px;
          border-radius: 50%;
          overflow: hidden;
          z-index: 3;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }
        .ab-circle-bot-border {
          position: absolute;
          left: 45px;
          bottom: 5px;
          width: 190px;
          height: 190px;
          border-radius: 50%;
          border: 1px solid var(--primary, #c6ff00);
          z-index: 2;
          opacity: 0.8;
          border-bottom-color: transparent;
          border-left-color: transparent;
          transform: rotate(45deg);
          pointer-events: none;
        }
        .ab-circle-bot img { width: 100%; height: 100%; object-fit: cover; }

        /* ─── Discount Badge Group ─── */
        .ab-discount-group {
          position: absolute;
          bottom: 74px;
          left: 174px;
          width: 122px;
          height: 122px;
          z-index: 4;
          /* Continuous slow spin */
          animation: ab-badge-spin 12s linear infinite;
        }

        @keyframes ab-badge-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .ab-discount-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px dashed rgba(198,255,0,0.7);
        }

        .ab-discount-badge {
          position: absolute;
          top: 6px;
          left: 6px;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: var(--primary, #c6ff00);
          color: #0d1e2b;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'Caveat', 'Comic Sans MS', cursive;
          box-shadow: 0 10px 30px rgba(198,255,0,0.3);
        }

        .ab-discount-badge span:first-child {
          font-size: 1.5rem;
          font-weight: 900;
          line-height: 1;
          font-family: sans-serif;
        }
        .ab-discount-badge span:last-child {
          font-size: 1.4rem;
          line-height: 1;
          margin-top: -2px;
        }

        /* ─── RIGHT CONTENT ─── */
        .ab-content { padding-right: 2rem; }

        .ab-tag {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--primary, #99cc00);
          margin-bottom: 1rem;
          display: block;
        }

        .ab-heading {
          font-size: 2.8rem;
          font-weight: 900;
          color: #121E2A;
          line-height: 1.15;
          letter-spacing: -1px;
          margin-bottom: 1.5rem;
        }

        .ab-desc {
          color: #666;
          font-size: 0.95rem;
          line-height: 1.8;
          margin-bottom: 2.5rem;
        }

        .ab-features {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .ab-feature {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .ab-feat-icon-box {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background: #121E2A;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary, #c6ff00);
          flex-shrink: 0;
          transition: transform 0.3s ease, background 0.3s ease;
        }
        .ab-feature:hover .ab-feat-icon-box {
          background: var(--primary, #c6ff00);
          color: #121E2A;
          transform: translateY(-3px);
        }

        .ab-feat-text {
          flex: 0 0 160px;
          border-right: 1px solid #eee;
          padding-right: 1.5rem;
        }
        .ab-feat-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #121E2A;
          margin: 0;
          line-height: 1.3;
        }
        .ab-feat-desc {
          flex: 1;
          font-size: 0.85rem;
          color: #888;
          line-height: 1.6;
          margin: 0;
          padding-left: 0.5rem;
        }

        .ab-cta-btn {
          display: inline-flex;
          align-items: center;
          background: #1a1a1a;
          color: #fff;
          padding: 1rem 2.5rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.95rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .ab-cta-btn:hover {
          background: var(--primary, #c6ff00);
          color: #1a1a1a;
        }

        @media (max-width: 1024px) {
          .about-inner { grid-template-columns: 1fr; gap: 4rem; }
          .ab-collage { height: 500px; max-width: 500px; margin: 0 auto; }
          .ab-content { padding-right: 0; text-align: center; }
          .ab-feature { text-align: left; }
        }

        @media (max-width: 600px) {
          .about-section { padding: 5rem 2rem; }
          .ab-collage { transform: scale(0.85); height: 420px; }
          .ab-feature { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .ab-feat-text { border-right: none; border-bottom: 1px solid #eee; padding-right: 0; padding-bottom: 1rem; width: 100%; flex: auto; }
          .ab-feat-desc { padding-left: 0; }
        }
      `}</style>

      <div className="about-inner">

        {/* ── LEFT: COLLAGE ── */}
        <div className="ab-collage">
          <div className="ab-plane-path" />
          <div className="ab-arch-border" />
          <div className="ab-arch">
            <img src={img3} alt="Scenery" />
          </div>
          <div className="ab-circle-top">
            <img src={img1} alt="Travel" />
          </div>
          <div className="ab-circle-bot-border" />
          <div className="ab-circle-bot">
            <img src={img2} alt="Journey" />
          </div>

          {/* Spinning Group: ring + green badge + text */}
          <div className="ab-discount-group">
            <div className="ab-discount-ring" />
            <div className="ab-discount-badge">
              <span>30%</span>
              <span>Discount</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: CONTENT ── */}
        <div className="ab-content">
          <span className="ab-tag">Get To Know Us</span>

          <h2 className="ab-heading">
            Experience the World with Our Dew Ceylon
          </h2>

          <p className="ab-desc">
            There are many variations of passages of Lorem Ipsum available, but the
            majority have suffered alteration in some form, by injected humour, or
            randomised words which don't look even slightly believable.
          </p>

          <div className="ab-features">
            <div className="ab-feature">
              <div className="ab-feat-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
              <div className="ab-feat-text">
                <h4 className="ab-feat-title">Safety First<br/>Always</h4>
              </div>
              <p className="ab-feat-desc">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>

            <div className="ab-feature">
              <div className="ab-feat-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="ab-feat-text">
                <h4 className="ab-feat-title">Friendly<br/>Guide</h4>
              </div>
              <p className="ab-feat-desc">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>
          </div>

          <button className="ab-cta-btn" onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}>
            Discover More
          </button>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
