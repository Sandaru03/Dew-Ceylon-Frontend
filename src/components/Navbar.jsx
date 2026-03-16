import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = ['Home', 'Packages', 'Activity', 'Blog', 'Taxi', 'ContactUs'];

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pillStyle, setPillStyle] = useState({ opacity: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const listRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Sync active index with current path
    if (location.pathname === '/') {
      setActiveIndex(0);
    } else if (location.pathname.startsWith('/package')) {
      setActiveIndex(1);
    } else if (location.pathname.startsWith('/activit')) {
      setActiveIndex(2);
    } else if (location.pathname.startsWith('/blog')) {
      setActiveIndex(3);
    } else if (location.pathname.startsWith('/taxi')) {
      setActiveIndex(4);
    } else if (location.pathname.startsWith('/contact')) {
      setActiveIndex(5);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (listRef.current[activeIndex]) {
      const activeEl = listRef.current[activeIndex];
      setPillStyle({
        transform: `translateX(${activeEl.offsetLeft}px)`,
        width: activeEl.offsetWidth,
        opacity: 1
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const shouldBeScrolled = window.scrollY > 50;
        setScrolled((prev) => (prev === shouldBeScrolled ? prev : shouldBeScrolled));
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item, index) => {
    setActiveIndex(index);
    if (item === 'Home') {
      navigate('/');
      window.scrollTo(0, 0);
    } else if (item === 'Packages') {
      navigate('/packages');
      window.scrollTo(0, 0);
    } else if (item === 'Activity') {
      navigate('/activities');
      window.scrollTo(0, 0);
    } else if (item === 'Blog') {
      navigate('/blogs');
      window.scrollTo(0, 0);
    } else if (item === 'Taxi') {
      navigate('/taxi');
      window.scrollTo(0, 0);
    } else if (item === 'ContactUs') {
      navigate('/contact');
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <nav className={`navbar animate-fade-in-up ${scrolled ? 'scrolled' : ''}`}>
        <style>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 4rem;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.3s ease;
        }
        
        .navbar.scrolled {
          background: rgba(0, 0, 0, 0.95); /* Adjusted for removed backdrop-filter */
          padding: 0.8rem 4rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }
        
        .navbar.scrolled .logo-image {
          height: 60px;
          transition: height 0.3s ease;
        }
        
        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          cursor: pointer;
        }
        
        .logo-image {
          height: 80px;
          width: auto;
          object-fit: contain;
          transition: height 0.3s ease;
        }
        
        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -1px;
        }
        
        .nav-capsule {
          padding: 0.5rem 1.5rem;
        }
        
        .nav-links {
          display: flex;
          list-style: none;
          position: relative;
          gap: 2rem;
        }
        
        .nav-links li {
          font-size: 0.9rem;
          font-weight: 500;
          opacity: 0.8;
          cursor: pointer;
          padding: 0.4rem 1.2rem;
          transition: opacity 0.3s, color 0.3s;
          position: relative;
          z-index: 2;
          color: white;
        }
        
        .nav-links li:hover, .nav-links li.active {
          opacity: 1;
        }
        
        .nav-links li.active {
          color: var(--bg-dark);
        }
        
        .sliding-pill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: var(--text-white);
          border-radius: 20px;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), width 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease;
          z-index: 1;
          will-change: transform, width;
        }
        
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        
        .search-container {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          padding: 0.3rem;
          transition: all 0.3s ease;
        }
        
        .search-container.open {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.3rem 0.5rem 0.3rem 1.2rem;
        }
        
        .search-input {
          width: 0;
          opacity: 0;
          border: none;
          background: transparent;
          color: var(--text-white);
          font-size: 0.9rem;
          padding: 0;
          transition: width 0.4s ease, opacity 0.3s ease, padding 0.3s ease;
        }
        
        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
        
        .search-input:focus {
          outline: none;
        }
        
        .search-container.open .search-input {
          width: 150px;
          opacity: 1;
          padding-right: 0.5rem;
        }
        
        .search-btn {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        
        .search-container.open .search-btn {
          background: var(--primary);
        }
        
        .search-container.open .search-btn svg {
          stroke: var(--bg-dark);
        }
        
        .book-now-btn {
          background: var(--primary);
          color: var(--bg-dark);
          padding: 0.8rem 2rem;
          border-radius: 30px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .book-now-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(185, 255, 0, 0.3);
        }

        .mobile-menu-btn {
          display: none;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.08);
          color: white;
          align-items: center;
          justify-content: center;
        }

        .mobile-menu-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 998;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .mobile-menu-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-menu-panel {
          position: fixed;
          top: 84px;
          left: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 18px;
          padding: 1rem;
          z-index: 999;
          transform: translateY(-8px);
          opacity: 0;
          pointer-events: none;
          transition: all 0.25s ease;
        }

        .mobile-menu-panel.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-links {
          list-style: none;
          display: grid;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .mobile-links li {
          padding: 0.9rem 1rem;
          border-radius: 12px;
          border: 1px solid transparent;
          cursor: pointer;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.86);
          background: rgba(255, 255, 255, 0.03);
        }

        .mobile-links li.active {
          color: #000;
          background: var(--primary);
        }

        .mobile-plan-btn {
          width: 100%;
          background: var(--primary);
          color: var(--bg-dark);
          border-radius: 12px;
          padding: 0.9rem 1rem;
          font-weight: 800;
        }
        
        @media (max-width: 1024px) {
          .navbar { padding: 1.5rem 2rem; }
          .navbar.scrolled { padding: 1rem 2rem; }
          .nav-capsule { display: none; }
          .nav-actions { display: none; }
          .mobile-menu-btn { display: inline-flex; }
          .logo-image { height: 64px; }
          .navbar.scrolled .logo-image { height: 56px; }
        }

        @media (max-width: 640px) {
          .navbar { padding: 1rem 1rem; }
          .navbar.scrolled { padding: 0.8rem 1rem; }
          .logo-image { height: 52px; }
          .navbar.scrolled .logo-image { height: 48px; }
          .mobile-menu-panel { top: 72px; left: 0.8rem; right: 0.8rem; }
        }
        `}</style>
        <div className="logo-container" onClick={() => navigate('/')}>
          <div className="logo-icon">
               <img src="/Dewlogo.jpg" alt="Dew Ceylon" className="logo-image" />
          </div>
        </div>

        <div className="nav-capsule glass-capsule">
          <ul className="nav-links">
            <div className="sliding-pill" style={pillStyle}></div>
            {navItems.map((item, index) => (
              <li 
                key={index} 
                className={activeIndex === index ? 'active' : ''}
                onClick={() => handleNavClick(item, index)}
                ref={(el) => (listRef.current[index] = el)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-actions">
          <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search here..." 
              onClick={(e) => e.stopPropagation()}
            />
            <button className="search-btn" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          <button className="book-now-btn" onClick={() => navigate('/plan-my-trip')}>Plan my trip</button>
        </div>

        <button
          className="mobile-menu-btn"
          aria-label="Toggle mobile menu"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>

        <div
          className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        <div className={`mobile-menu-panel ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-links">
            {navItems.map((item, index) => (
              <li
                key={`mobile-${item}`}
                className={activeIndex === index ? 'active' : ''}
                onClick={() => handleNavClick(item, index)}
              >
                {item}
              </li>
            ))}
          </ul>
          <button className="mobile-plan-btn" onClick={() => navigate('/plan-my-trip')}>
            Plan my trip
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
