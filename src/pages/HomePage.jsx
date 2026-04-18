import React, { useState, useEffect } from 'react';

import ExploreSection from '../components/ExploreSection';
import Destinations from '../components/Destinations';
import ExperienceSection from '../components/ExperienceSection';
import Reviews from '../components/Reviews';
import UpcomingTrips from '../components/UpcomingTrips';
import PopularPackages from '../components/PopularPackages';
import TaxiSection from '../components/TaxiSection';
import Footer from '../components/Footer';

const slides = [
  {
    image: 'https://res.cloudinary.com/dicvgtusz/image/upload/v1774245819/tommaso-delton-_sFOJHDmO6A-unsplash_bapicv.jpg',
    bgText: 'EXPLORER',
    titleMain: 'Safari Dreams',
    titleSub: 'Wild Realities',
    objectPosition: '35% center'
  },
  {
    image: 'https://res.cloudinary.com/dicvgtusz/image/upload/v1774243228/hero2_2_1_kq3qmc.jpg',
    bgText: 'ADVENTURE',
    titleMain: 'Discover The',
    titleSub: 'Untamed Beauty',
    objectPosition: 'center center'
  },
  {
    image: 'https://res.cloudinary.com/dicvgtusz/image/upload/v1774240526/demodara-nine-arch-bridge-ella-sri-lanka.jpg_1_xm706n.jpg',
    bgText: 'HERITAGE',
    titleMain: 'Iconic Views',
    titleSub: 'Nine Arch Bridge',
    objectPosition: 'center center'
  }
];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(slideInterval);
  }, []);
  return (
    <div className="home-page">
      <style>{`
        .home-page {
          width: 100%;
          overflow-x: hidden;
        }

        .home-page > section:not(.hero),
        .home-page > footer {
          content-visibility: auto;
          contain-intrinsic-size: 900px;
        }
        
        .hero {
          position: relative;
          min-height: 110vh;
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          padding: 0 4rem 8vh 4rem;
          overflow: hidden;
          z-index: 10;
        }
        
        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          overflow: hidden;
        }
        
        .hero-bg-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          transition: opacity 1s ease-in-out;
          will-change: opacity;
          transform: translateZ(0);
        }
        
        .hero-bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4));
          z-index: 2;
        }
        
        .hero-bg::after {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(45deg, #2c3e50, #000000);
          z-index: -2;
        }
        
        .overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30%;
          background: linear-gradient(transparent, var(--bg-dark));
          z-index: 3;
        }
        
        .hero-content {
          width: 100%;
          z-index: 3;
        }
        
        .background-text {
          position: absolute;
          top: 50%;
          left: 0%;
          width: 100%;
          text-align: center;
          transform: translateY(-50%);
          font-size: 13vw;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.1);
          line-height: 1;
          pointer-events: none;
          z-index: 1;
        }
        
        .main-info {
          position: relative;
          z-index: 4;
        }
        
        .hero-title {
          font-size: 6rem;
          line-height: 1.15;
          letter-spacing: -1px;
        }
        
        .hero-title span {
          -webkit-text-stroke: 1px white;
          color: transparent;
        }
        
        .scroll-indicator {
          position: absolute;
          right: 4rem;
          bottom: 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          z-index: 4;
        }
        
        .scroll-text {
          writing-mode: vertical-rl;
          font-size: 0.7rem;
          letter-spacing: 2px;
          font-weight: 600;
          opacity: 0.6;
        }
        
        .scroll-arrow {
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
          40% {transform: translateY(-10px);}
          60% {transform: translateY(-5px);}
        }
        
        @media (max-width: 1024px) {
          .hero { padding: 0 2rem; }
          .hero-title { font-size: 4rem; }
        }
        
        @media (max-width: 768px) {
          .hero {
            min-height: 100svh;
            padding: 0 1.2rem 7vh 1.2rem;
          }

          .hero-bg {
            background: #000;
          }

          .hero-bg-img {
            object-fit: cover;
          }

          .main-info {
            transform: translateY(-5vh);
          }

          .hero-title { font-size: 3rem; }
          .scroll-indicator { display: none; }
          .background-text { font-size: 13vw; }
        }
      `}</style>

      
      {/* Hero Section Integrated Directly */}
      <section className="hero">
        <div className="hero-bg transition-bg">
          {slides.map((slide, index) => (
            <img 
              key={index}
              src={slide.image} 
              alt={`Safari Background ${index + 1}`} 
              className="hero-bg-img" 
              style={{ 
                objectPosition: slide.objectPosition || 'center center',
                opacity: currentSlide === index ? 1 : 0
              }} 
            />
          ))}
          <div className="hero-bg-overlay"></div>
          <div className="overlay"></div>
        </div>

        <div className="hero-content" key={currentSlide}>
          <div className="background-text">
            <span>{slides[currentSlide].bgText}</span>
          </div>

          <div className="main-info animate-fade-in-up">


            <h1 className="hero-title">
              {slides[currentSlide].titleMain}<br />
              <span>{slides[currentSlide].titleSub}</span>
            </h1>
          </div>
        </div>

        <div 
          className="scroll-indicator"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          style={{ cursor: 'pointer' }}
        >
           <span className="scroll-text">SCROLL DOWN</span>
           <div className="scroll-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
              </svg>
           </div>
        </div>
      </section>

      <ExploreSection />
      <Destinations />
      <PopularPackages />
      <TaxiSection />
      <Reviews />
      <ExperienceSection />
      <UpcomingTrips />
      <Footer />
    </div>
  );
};

export default HomePage;

