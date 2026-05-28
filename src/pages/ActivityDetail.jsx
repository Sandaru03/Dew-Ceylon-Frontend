import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


import Footer from '../components/Footer';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(API_BASE_URL + `/api/activities/${id}`);
        if(response.ok) {
            const data = await response.json();
            // Parse JSON if needed
            if (typeof data.items === 'string') {
              try {
                data.items = JSON.parse(data.items);
              } catch(e) {
                 data.items = [];
              }
            }
            setActivity(data);
        } else {
            console.error("Activity not found");
        }
      } catch (err) {
        console.error("Error fetching activity:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivity();
  }, [id]);

  if (loading) {
    return (
      <div style={{ background: '#0F0F0F', minHeight: '100vh', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2 className="animate-pulse">Loading your adventure...</h2>
      </div>
    );
  }

  if (!activity) {
    return (
      <div style={{ background: '#0F0F0F', minHeight: '100vh', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2>Activity not found</h2>
        <button onClick={() => navigate('/activities')} style={{marginTop: '1rem', padding: '1rem 2rem', background: '#c6ff00', color: 'black', border: 'none', borderRadius: '15px', cursor: 'pointer', fontWeight: 'bold'}}>Back to Activities</button>
      </div>
    );
  }

  return (
    <div className="activity-detail-page">
      
      <style>{`
        .activity-detail-page {
          background-color: #0F0F0F;
          min-height: 100vh;
          color: white;
          font-family: 'Inter', sans-serif;
        }

        .activity-hero {
          height: 70vh;
          width: 100%;
          position: relative;
          display: flex;
          align-items: flex-end;
          background: url(${activity.image}) center/cover;
          will-change: transform;
        }

        .activity-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15,15,15,1) 0%, rgba(15,15,15,0.7) 40%, rgba(0,0,0,0.3) 100%);
        }

        .activity-hero-content {
          position: relative;
          z-index: 2;
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .activity-badge {
          display: inline-block;
          background: var(--primary, #c6ff00);
          color: black;
          padding: 0.3rem 0.8rem;
          border-radius: 30px;
          font-weight: 800;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1rem;
        }

        .activity-title {
          font-size: 2rem;
          font-weight: 950;
          margin-bottom: 1rem;
          line-height: 1.2;
          letter-spacing: -0.5px;
        }

        .activity-tagline {
          font-size: 0.95rem;
          opacity: 0.8;
          max-width: 800px;
          font-weight: 300;
        }

        .activity-main-content {
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .activity-description {
          font-size: 0.92rem;
          line-height: 1.7;
          opacity: 0.9;
          margin-bottom: 3rem;
          background: rgba(255,255,255,0.02);
          padding: 2.2rem;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .activity-description h3 {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--primary, #c6ff00);
          letter-spacing: 0.5px;
          margin-bottom: 0.5rem;
        }

        .expect-title {
          font-size: 1.3rem;
          margin-bottom: 1.5rem;
          font-weight: 900;
          text-transform: uppercase;
        }

        .items-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .item-card {
           background: #1a1a1a;
           border-radius: 24px;
           overflow: hidden;
           border: 1px solid rgba(255, 255, 255, 0.05);
           display: flex;
           align-items: stretch;
           transition: transform 0.3s ease;
           min-height: 260px;
        }

        .item-card:nth-child(even) {
          flex-direction: row-reverse;
        }
        
        .item-card:hover {
           transform: translateY(-5px);
           border-color: rgba(198, 255, 0, 0.3);
        }

        .item-img {
          width: 320px;
          object-fit: cover;
          flex-shrink: 0;
          background: #252525;
        }

        .item-info {
           padding: 2.5rem;
           display: flex;
           flex-direction: column;
           justify-content: center;
        }

        .item-title {
          font-size: 1.05rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: var(--primary, #c6ff00);
        }

        .item-desc {
          opacity: 0.7;
          line-height: 1.6;
          font-size: 0.85rem;
        }

        .book-btn {
          width: 100%;
          padding: 0.8rem 1rem;
          background: var(--primary, #c6ff00);
          color: black;
          border: none;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .book-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(198, 255, 0, 0.2);
        }

        .activity-actions {
          margin-top: 3rem;
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .activity-main-content {
            padding: 3rem 1.5rem;
          }
          .activity-hero-content {
            padding: 3rem 1.5rem;
          }
          .activity-title { 
            font-size: 1.4rem; 
            letter-spacing: -0.5px;
          }
          .activity-tagline {
            font-size: 0.85rem;
          }
          .activity-description {
            padding: 1.5rem;
            font-size: 0.85rem;
            border-radius: 16px;
            margin-bottom: 2rem;
          }
          .activity-description h3 {
            font-size: 1.05rem;
          }
          .expect-title {
            font-size: 1.15rem;
            margin-bottom: 1rem;
          }
          .item-card { 
            flex-direction: column; 
            min-height: auto;
          }
          .item-card:nth-child(even) {
            flex-direction: column;
          }
          .item-img { 
            width: 100%; 
            height: 200px; 
            min-height: auto;
          }
          .item-info {
            padding: 1.5rem;
          }
          .book-btn {
            padding: 0.8rem;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 768px) {
          .activity-actions {
            flex-direction: column;
            gap: 1rem;
          }
          .activity-actions button {
            width: 100% !important;
            padding: 0.9rem !important;
          }
        }
      `}</style>

      <section className="activity-hero">
        <div className="activity-hero-content animate-fade-in-up">
          <span className="activity-badge">{activity.category}</span>
          <h1 className="activity-title">{activity.title}</h1>
          <p className="activity-tagline">{activity.tagline}</p>
        </div>
      </section>

      <main className="activity-main-content">
        <div className="main-col">
          <div className="activity-description animate-fade-in-up">
            <h3>Overview</h3>
            <p style={{marginTop: '1rem'}}>{activity.description}</p>
          </div>

          {activity.items && activity.items.length > 0 && (
            <div className="items-section">
              <h2 className="expect-title">What to Expect</h2>
              <div className="items-grid">
                {activity.items.map((item, index) => (
                  <div className="item-card animate-fade-in-up" key={index} style={{animationDelay: `${index * 0.1}s`}}>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="item-img" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1000";
                      }}
                    />
                    <div className="item-info">
                      <h4 className="item-title">{item.title}</h4>
                      <p className="item-desc">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="activity-actions animate-fade-in-up">
            <button 
              className="book-btn"
              onClick={() => navigate('/plan')}
              style={{ width: 'auto', padding: '1rem 2.5rem' }}
            >
              Inquire Now
            </button>
            <button 
              onClick={() => navigate('/activities')}
              style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.2)', color: 'white', padding: '1.05rem 2.5rem', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}
            >
              Explore Other Activities
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ActivityDetail;
