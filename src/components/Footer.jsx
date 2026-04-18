import React from 'react';
import footerBg from '../assets/safari_hero.jpg';

const Footer = () => {
  return (
    <footer className="new-footer-section">
      <style>{`
        .new-footer-section {
          background-image: linear-gradient(rgba(15, 15, 15, 0.82), rgba(15, 15, 15, 0.88)), url(${footerBg});
          background-size: cover;
          background-position: center;
          background-attachment: scroll;
          background-blend-mode: multiply;
          color: var(--text-white);
          padding: 6rem 4rem 2rem 4rem;
          position: relative;
          z-index: 10;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
        }
        
        
        .footer-main-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 4rem;
          margin-bottom: 5rem;
        }
        
        .footer-logo-text {
          font-size: 2.5rem;
          font-weight: 900;
          color: var(--text-white);
          margin-bottom: 1.5rem;
          letter-spacing: -1px;
        }
        
        .footer-brand-desc {
          color: #888;
          line-height: 1.8;
          font-size: 0.95rem;
          max-width: 350px;
        }
        
        .footer-links h3 {
          color: #FFF;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .footer-links ul {
          list-style: none;
          padding: 0;
        }
        
        .footer-links li {
          margin-bottom: 1rem;
        }
        
        .footer-links a {
          color: #888;
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.3s ease;
        }
        
        .footer-links a:hover {
          color: var(--primary);
        }
        
        .footer-bottom-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .copyright {
          color: #666;
          font-size: 0.9rem;
        }
        
        .social-icons {
          display: flex;
          gap: 1.5rem;
        }
        
        .social-icons a {
          color: #888;
          transition: color 0.3s ease, transform 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          text-decoration: none;
        }
        
        .social-icons svg {
          width: 18px;
          height: 18px;
        }
        
        .social-icons a:hover {
          color: var(--primary);
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 0.1);
        }
        
        @media (max-width: 1024px) {
          .footer-newsletter {
            flex-direction: column;
            text-align: center;
            gap: 2rem;
          }
          .newsletter-text { padding-right: 0; }
          .newsletter-form { width: 100%; flex-direction: column; }
          .footer-main-grid { grid-template-columns: 1fr 1fr; }
        }
        
        @media (max-width: 768px) {
          .new-footer-section { padding: 4rem 2rem 2rem 2rem; }
          .footer-newsletter { padding: 2rem; }
          .footer-main-grid { grid-template-columns: 1fr; gap: 3rem; }
          .footer-bottom-bar {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>
      <div className="footer-container">
        

        {/* Main Grid Section */}
        <div className="footer-main-grid">
          
          <div className="footer-brand animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <div className="footer-logo-container" style={{ marginBottom: '1.5rem', cursor: 'pointer' }} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <img src="/Dewlogo.jpg" alt="Dew Ceylon" style={{ height: '80px', width: 'auto', borderRadius: '10px' }} />
            </div>
            <p className="footer-brand-desc">
              Experience the True Heart of Sri Lanka with Dew Ceylon Tours. 
              We don’t just show you places—we immerse you in the soul of the island.
            </p>
          </div>

          <div className="footer-links animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h3>QUICK BROWSE</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">Our Story</a></li>
              <li><a href="/packages">Popular Packages</a></li>
              <li><a href="/activities">Top Activities</a></li>
              <li><a href="/taxi">Airport Taxi</a></li>
            </ul>
          </div>

          <div className="footer-links animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h3>EXPLORE MORE</h3>
            <ul>
              <li><a href="/blogs">Travel Blogs</a></li>
              <li><a href="/plan-my-trip">Plan My Trip</a></li>
            </ul>
          </div>

          <div className="footer-links animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h3>CONTACT</h3>
            <ul>
              <li><a href="/contact">Get In Touch</a></li>
            </ul>
            <div className="social-icons" style={{ marginTop: '1.5rem' }}>
              <a href="https://www.facebook.com/share/18E2z4VsXU/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg>
              </a>
              <a href="https://www.instagram.com/dewceylontours?igsh=bzNzdWNydXJ5bWV2&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@dewceylontours?_r=1&_t=ZS-95AqyYM9bm6" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47V18.77a6.738 6.738 0 0 1-5.07 6.47 6.733 6.733 0 0 1-7.16-2.91 6.746 6.746 0 0 1 1.05-9.34 6.75 6.75 0 0 1 4.22-1.39v4.02c-1.42-.14-2.82.55-3.52 1.82a2.712 2.712 0 0 0 1.28 3.56c1.1.53 2.5.3 3.32-.57.25-.26.42-.58.48-.92.07-1.12.05-2.24.06-3.37V.02z"/></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar Section */}
        <div className="footer-bottom-bar">
          <p className="copyright">&copy; {new Date().getFullYear()} Dew Ceylon. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
