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
        const resp = await fetch(API_BASE_URL + '/api/featured-activities');
        const data = await resp.json();
        setActivities(Array.isArray(data) ? data : []);
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
          height: 250px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .new-dest-card-inner {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .new-dest-card.active .new-dest-card-inner {
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
        
        .new-dest-card-inner:hover .new-dest-card-img, .new-dest-card:hover .new-dest-card-img {
          transform: scale(1.08);
        }
        
        .new-dest-card-inner::after {
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

        .discount-badge {
          position: absolute;
          top: -40px;
          right: -25px;
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: badge-spin 10s linear infinite;
          z-index: 10;
        }

        @-webkit-keyframes badge-spin {
          from { -webkit-transform: rotate(0deg); }
          to   { -webkit-transform: rotate(360deg); }
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
          -webkit-animation: badge-counter-spin 10s linear infinite;
          animation: badge-counter-spin 10s linear infinite;
        }
        
        @-webkit-keyframes badge-counter-spin {
          from { -webkit-transform: rotate(0deg);   }
          to   { -webkit-transform: rotate(-360deg); }
        }
        
        @keyframes badge-counter-spin {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(-360deg); }
        }
        
        .badge-small {
          font-size: 0.55rem;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: 0px;
        }
        
        .badge-large {
          font-size: 1.2rem;
          line-height: 1;
          margin: 0.1rem 0;
          letter-spacing: -0.5px;
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
            Handpicked experiences, trusted local guides, and real moments beyond the guidebooks.
            No rush, no stress, just pure island stories waiting for you. Book easy, travel right and
            impossible to forget. 
          </p>

          <p className="new-dest-desc">Passion Driven True Ceylon Experience</p>
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
              <div className="new-dest-card-inner">
                <img src={activity.image || undefined} alt={activity.title} className="new-dest-card-img" />
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
              {activity.discount && (
                <div className="discount-badge">
                  <svg viewBox="0 0 100 100" className="badge-bg">
                    <polygon fill="var(--primary)" points="50,4 57.8,10.8 67.6,7.5 72.2,16.7 82.5,17.5 83.3,27.8 92.5,32.4 89.2,42.2 96,50 89.2,57.8 92.5,67.6 83.3,72.2 82.5,82.5 72.2,83.3 67.6,92.5 57.8,89.2 50,96 42.2,89.2 32.4,92.5 27.8,83.3 17.5,82.5 16.7,72.2 7.5,67.6 10.8,57.8 4,50 10.8,42.2 7.5,32.4 16.7,27.8 17.5,17.5 27.8,16.7 32.4,7.5 42.2,10.8" />
                  </svg>
                  <div className="badge-text">
                    <span className="badge-small">Get Up to</span>
                    <span className="badge-large">{activity.discount}% Off</span>
                    <span className="badge-small">DISCOUNT</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;



