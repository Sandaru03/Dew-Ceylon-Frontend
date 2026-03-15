import React, { useState } from 'react';

// Reusing hero assets for placeholder imagery
import destBg from '../assets/hero.jpg';
import img1 from '../assets/hero.jpg';
import img2 from '../assets/hero2.jpg';
import img3 from '../assets/hero4.jpg';

const destinationsData = [
  {
    title: "MASAI MARA NATIONAL RESERVE",
    location: "KENYA, EAST AFRICA",
    image: img1,
    showArrow: true
  },
  {
    title: "UBUD, BALI",
    location: "INDONESIA",
    image: img2,
    showArrow: false
  },
  {
    title: "QUEENSTOWN",
    location: "NEW ZEALAND (SOUTH ISLAND)",
    image: img3,
    showArrow: false
  },
  {
    title: "KOH LANTA",
    location: "THAILAND (KRABI PROVINCE)",
    image: img1,
    showArrow: false
  }
];

const Destinations = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="new-dest-section" style={{ backgroundImage: `url(${destinationsData[activeIndex].image})` }}>
      <style>{`
        .new-dest-section {
          position: relative;
          padding: 8rem 4rem;
          background-size: cover;
          background-position: center;
          color: var(--text-white);
          z-index: 10;
          overflow: hidden;
          transition: background-image 0.6s ease-in-out;
        }
        
        .new-dest-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          z-index: 1;
        }
        
        .new-dest-container {
          position: relative;
          z-index: 2;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 4rem;
        }
        
        .new-dest-content {
          flex: 1;
          border-right: 1px solid rgba(255, 255, 255, 0.2);
          padding-right: 2rem;
        }
        
        .new-dest-title {
          font-size: 4rem;
          font-weight: 900;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          line-height: 1;
        }
        
        .new-dest-desc {
          font-size: 1.1rem;
          color: #DDD;
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }
        
        .view-all-btn {
          background-color: var(--primary);
          color: var(--bg-dark);
          padding: 0.8rem 2.5rem;
          border-radius: 30px;
          font-weight: 800;
          font-size: 0.95rem;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .view-all-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(185, 255, 0, 0.3);
        }
        
        .new-dest-grid {
          flex: 1.5;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        
        .new-dest-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          height: 250px;
          cursor: pointer;
        }
        
        .new-dest-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
          will-change: transform;
        }
        
        .new-dest-card:hover .new-dest-card-img {
          transform: scale(1.08);
        }
        
        .new-dest-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 70%;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%);
          z-index: 1;
        }
        
        .new-dest-card-overlay {
          position: absolute;
          bottom: 15px;
          left: 15px;
          right: 15px;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }
        
        .new-dest-card-text {
          display: flex;
          flex-direction: column;
        }
        
        .new-dest-card-text h3 {
          font-size: 1.1rem;
          font-weight: 800;
          margin-bottom: 0.2rem;
          text-transform: uppercase;
          color: #FFF;
        }
        
        .new-dest-card-text span {
          font-size: 0.65rem;
          color: var(--primary);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        
        .new-dest-arrow {
          background-color: var(--primary);
          color: var(--bg-dark);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .new-dest-arrow svg {
          width: 16px;
          height: 16px;
        }
        
        @media (max-width: 1024px) {
          .new-dest-container { flex-direction: column; }
          .new-dest-content {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            padding-right: 0;
            padding-bottom: 2rem;
            text-align: center;
          }
          .new-dest-title { font-size: 3rem; }
        }
        
        @media (max-width: 768px) {
          .new-dest-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className="new-dest-overlay"></div>
      
      <div className="new-dest-container">
        {/* Left Content */}
        <div className="new-dest-content animate-fade-in-up">
          <h2 className="new-dest-title">DESTINATIONS</h2>
          <p className="new-dest-desc">
            Experience the Perfect Blend of Comfort<br/>
            and Nature, Crafted for Your Ultimate<br/>
            Escape.
          </p>
          <button className="view-all-btn">View All</button>
        </div>

        <div className="new-dest-grid animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          {destinationsData.map((dest, index) => (
            <div 
              className={`new-dest-card ${index === activeIndex ? 'active' : ''}`} 
              key={index}
              onClick={() => setActiveIndex(index)}
              style={{ cursor: 'pointer' }}
            >
              <img src={dest.image} alt={dest.title} className="new-dest-card-img" />
              <div className="new-dest-card-overlay">
                <div className="new-dest-card-text">
                  <h3>{dest.title}</h3>
                  <span>{dest.location}</span>
                </div>
                {index === activeIndex && (
                  <div className="new-dest-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
