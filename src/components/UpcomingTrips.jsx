import React, { useState, useEffect } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const UpcomingTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const resToggle = await fetch(API_BASE_URL + '/api/upcoming-trips/toggle');
        const toggleData = await resToggle.json();
        setIsEnabled(toggleData.enabled);

        if (toggleData.enabled) {
          const res = await fetch(API_BASE_URL + '/api/upcoming-trips');
          const data = await res.json();
          setTrips(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Failed to fetch upcoming trips data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  if (!loading && (!isEnabled || trips.length === 0)) return null;

  // Keep an even number of repeated sets so first half and second half are identical for seamless marquee.
  const marqueeTrips = trips.length > 0
    ? [...trips, ...trips, ...trips, ...trips, ...trips, ...trips]
    : [];

  return (
    <section className="ut-premium-bg">
      <style>{`
        .ut-premium-bg {
          padding: 8rem 4rem;
          background: #0a1118;
          position: relative;
          z-index: 10;
          overflow: hidden;
        }

        /* â”€â”€ Advanced Background Effects â”€â”€ */
        .ut-premium-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          background-position: center center;
          opacity: 0.5;
          pointer-events: none;
        }

        .ut-premium-bg::after {
          content: '';
          position: absolute;
          top: -20%;
          left: -10%;
          width: 60%;
          height: 80%;
          background: radial-gradient(circle, rgba(198,255,0,0.08) 0%, transparent 60%);
          pointer-events: none;
          z-index: 1;
        }

        .ut-glow-orb {
          position: absolute;
          bottom: -20%;
          right: -10%;
          width: 50%;
          height: 60%;
          background: radial-gradient(circle, rgba(0, 153, 255, 0.05) 0%, transparent 60%);
          pointer-events: none;
          z-index: 1;
        }

        /* â”€â”€ Layout â”€â”€ */
        .ut-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 4rem;
          position: relative;
          z-index: 2;
        }
        
        .ut-info {
          flex: 0 0 380px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        
        .ut-tag {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--primary, #c6ff00);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .ut-tag::before {
          content: '';
          width: 30px;
          height: 2px;
          background: var(--primary, #c6ff00);
        }

        .ut-title {
          font-size: 3.5rem;
          font-weight: 950;
          color: #ffffff;
          line-height: 1.1;
          letter-spacing: -1px;
          margin-bottom: 1.5rem;
        }
        .ut-title span {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.2);
        }
        
        .ut-desc {
          color: rgba(255,255,255,0.6);
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 3rem;
        }
        
        .ut-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          background: var(--primary, #c6ff00);
          color: #0d1e2b;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          font-weight: 800;
          font-size: 0.95rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175,0.885,0.32,1.275);
          box-shadow: 0 10px 30px rgba(198,255,0,0.15);
        }
        
        .ut-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 40px rgba(198,255,0,0.3);
          background: #d4ff33;
        }

        .ut-btn svg {
          transition: transform 0.3s ease;
        }
        .ut-btn:hover svg {
          transform: translateX(4px);
        }
        
        .ut-slider-wrapper {
          flex: 1;
          overflow: hidden;
          padding: 2rem 0.5rem;
          margin: -2rem -0.5rem;
          position: relative;
        }

        /* Gradient mask for smooth slider edges */
        .ut-slider-wrapper::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 90%, #0a1118 100%);
          pointer-events: none;
          z-index: 5;
        }
        
        .ut-cards-track {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: marquee-scroll 30s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
        }

        @media (hover: hover) and (pointer: fine) {
          .ut-slider-wrapper:hover .ut-cards-track {
            animation-play-state: paused;
          }
        }

        @keyframes marquee-scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        
        .ut-card {
          flex: 0 0 350px;
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          height: 480px;
          cursor: pointer;
          transform: translateY(0);
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
          border: 1px solid rgba(255,255,255,0.05);
          background: #111;
          will-change: transform;
        }
        
        .ut-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.6);
          border-color: rgba(198,255,0,0.3);
        }
        
        .ut-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease, filter 0.8s ease;
          filter: brightness(0.85);
        }
        
        .ut-card:hover .ut-card-img {
          transform: scale(1.08);
          filter: brightness(1.1);
        }
        
        .ut-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,17,24,0.95) 0%, rgba(10,17,24,0.4) 40%, transparent 100%);
          z-index: 1;
          transition: background 0.4s ease;
        }
        .ut-card:hover::after {
          background: linear-gradient(to top, rgba(10,17,24,0.95) 0%, rgba(198,255,0,0.1) 60%, transparent 100%);
        }
        
        .ut-card-content {
          position: absolute;
          bottom: 25px;
          left: 25px;
          right: 25px;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        
        .ut-card-title {
          color: white;
          font-size: 1.3rem;
          font-weight: 900;
          text-transform: uppercase;
          margin: 0;
          white-space: pre-line;
          line-height: 1.2;
          text-shadow: 0 4px 12px rgba(0,0,0,0.8);
        }
        
        .ut-price-box {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          padding: 0.7rem 1rem;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.3s ease;
        }
        .ut-card:hover .ut-price-box {
          background: var(--primary, #c6ff00);
          border-color: var(--primary, #c6ff00);
        }
        
        .ut-price-label {
          color: rgba(255,255,255,0.6);
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 2px;
          transition: color 0.3s ease;
        }
        .ut-card:hover .ut-price-label { color: #000; opacity: 0.6; }
        
        .ut-price-val {
          font-size: 1.2rem;
          font-weight: 900;
          color: var(--primary, #c6ff00);
          transition: color 0.3s ease;
        }
        .ut-card:hover .ut-price-val { color: #000; }

        .ut-loading {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 480px;
          color: rgba(255,255,255,0.3);
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 800;
        }
        
        @media (max-width: 1024px) {
          .ut-container { flex-direction: column; text-align: center; gap: 3rem; }
          .ut-info { flex: none; align-items: center; max-width: 600px; }
          .ut-tag { justify-content: center; }
          .ut-tag::before { display: none; }
          .ut-slider-wrapper { width: 100%; padding: 1rem 0; margin: 0; }
          .ut-slider-wrapper::after { display: none; }
          .ut-card { flex: 0 0 300px; height: 400px; }
        }
        
        @media (max-width: 768px) {
          .ut-premium-bg { padding: 5rem 2rem; }
          .ut-title { font-size: 2.8rem; }
          .ut-card { flex: 0 0 280px; height: 380px; }
          .ut-cards-track { animation-duration: 24s; }
        }
      `}</style>
      
      <div className="ut-glow-orb" />

      <div className="ut-container">
        {/* Header */}
        <div className="ut-info animate-fade-in-up">
          <div className="ut-tag">Next Departures</div>
          <h2 className="ut-title">
            UPCOMING <span>TRIPS</span>
          </h2>
          <p className="ut-desc">
            Explore our specially curated upcoming departures. 
            Secure your spot now for these exclusive, limited-group adventures 
            across the most beautiful landscapes in Ceylon.
          </p>
        </div>

        {/* Carousel */}
        {loading ? (
          <div className="ut-loading">Loading Trips...</div>
        ) : (
          <div className="ut-slider-wrapper">
            <div className="ut-cards-track">
              {marqueeTrips.map((trip, index) => (
                <div 
                  className="ut-card" 
                  key={`ut-${trip.id}-${index}`} 
                >
                  <img src={trip.image || undefined} alt={trip.title} className="ut-card-img" />
                  <div className="ut-card-content">
                    <h3 className="ut-card-title">{trip.title}</h3>
                    {trip.price && (
                      <div className="ut-price-box">
                        <span className="ut-price-label">Starts at</span>
                        <span className="ut-price-val">{trip.price.startsWith('$') ? trip.price : `$${trip.price}`}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingTrips;


