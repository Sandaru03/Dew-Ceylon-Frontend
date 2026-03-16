import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const Destinations = () => {
  const [activities, setActivities] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const resp = await fetch(API_BASE_URL + '/api/activities');
        const data = await resp.json();
        // Get the latest 4 activities
        setActivities(data.slice(0, 4));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching activities:", err);
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  if (loading) return null;
  if (activities.length === 0) return null;

  return (
    <section 
      className="new-dest-section" 
      style={{ backgroundImage: `url(${activities[activeIndex]?.image})` }}
    >
      <style>{`
        .new-dest-section {
          position: relative;
          padding: 8rem 4rem;
          background-size: cover;
          background-position: center;
          color: white;
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
          font-weight: 950;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          line-height: 1;
          letter-spacing: -2px;
        }
        
        .new-dest-desc {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }
        
        .view-all-btn {
          background-color: var(--primary, #c6ff00);
          color: #080c10;
          padding: 0.9rem 2.5rem;
          border-radius: 30px;
          font-weight: 900;
          font-size: 0.95rem;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .view-all-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(198, 255, 0, 0.3);
          background: #d4ff33;
        }
        
        .new-dest-grid {
          flex: 1.5;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        
        .new-dest-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          height: 250px;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .new-dest-card.active {
          border-color: var(--primary, #c6ff00);
          box-shadow: 0 0 0 1px var(--primary, #c6ff00);
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
          bottom: 20px;
          left: 20px;
          right: 20px;
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
          font-size: 1.2rem;
          font-weight: 900;
          margin-bottom: 0.2rem;
          text-transform: uppercase;
          color: white;
          letter-spacing: -0.5px;
        }
        
        .new-dest-card-text span {
          font-size: 0.7rem;
          color: var(--primary, #c6ff00);
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 1px;
        }
        
        .new-dest-arrow {
          background-color: var(--primary, #c6ff00);
          color: #080c10;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
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
          .new-dest-section { padding: 5rem 2rem; }
        }
      `}</style>
      <div className="new-dest-overlay"></div>
      
      <div className="new-dest-container">
        {/* Left Content */}
        <div className="new-dest-content animate-fade-in-up">
          <h2 className="new-dest-title">ACTIVITIES</h2>
          <p className="new-dest-desc">
            Unleash Your Inner Adventurer with Our Specially Curated Activities. 
            From thrilling safaris to serene nature walks, discover the best of Ceylon.
          </p>
          <button className="view-all-btn" onClick={() => navigate('/activities')}>
            View All
          </button>
        </div>

        <div className="new-dest-grid animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          {activities.map((activity, index) => (
            <div 
              className={`new-dest-card ${index === activeIndex ? 'active' : ''}`} 
              key={activity.id || index}
              onClick={() => setActiveIndex(index)}
            >
              <img src={activity.image} alt={activity.title} className="new-dest-card-img" />
              <div className="new-dest-card-overlay">
                <div className="new-dest-card-text">
                  <h3>{activity.title}</h3>
                  <span>{activity.category}</span>
                </div>
                {index === activeIndex && (
                  <div className="new-dest-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="18" height="18">
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



