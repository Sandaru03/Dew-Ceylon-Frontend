import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Footer from '../components/Footer';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/activities/${id}`);
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
          background: url(${activity.image}) center/cover fixed;
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
          padding: 4rem 10%;
          width: 100%;
        }

        .activity-badge {
          display: inline-block;
          background: var(--primary, #c6ff00);
          color: black;
          padding: 0.5rem 1.5rem;
          border-radius: 30px;
          font-weight: 800;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1.5rem;
        }

        .activity-title {
          font-size: 4.5rem;
          font-weight: 950;
          margin-bottom: 1rem;
          line-height: 1.1;
          letter-spacing: -2px;
        }

        .activity-tagline {
          font-size: 1.5rem;
          opacity: 0.8;
          max-width: 800px;
          font-weight: 300;
        }

        .activity-main-content {
          padding: 5rem 10%;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 4rem;
        }

        .activity-description {
          font-size: 1.15rem;
          line-height: 1.8;
          opacity: 0.9;
          margin-bottom: 3rem;
          background: rgba(255,255,255,0.02);
          padding: 3rem;
          border-radius: 30px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .items-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .item-card {
           background: #1a1a1a;
           border-radius: 20px;
           overflow: hidden;
           border: 1px solid rgba(255, 255, 255, 0.05);
           display: flex;
           align-items: center;
           transition: transform 0.3s ease;
        }
        
        .item-card:hover {
           transform: translateY(-5px);
           border-color: rgba(198, 255, 0, 0.3);
        }

        .item-img {
          width: 200px;
          height: 100%;
          object-fit: cover;
        }

        .item-info {
           padding: 2rem;
        }

        .item-title {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: var(--primary, #c6ff00);
        }

        .item-desc {
          opacity: 0.7;
          line-height: 1.6;
        }

        .booking-sidebar {
          position: sticky;
          top: 100px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 30px;
          padding: 3rem;
          backdrop-filter: blur(20px);
          height: fit-content;
        }

        .booking-title {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
        }

        .book-btn {
          width: 100%;
          padding: 1.2rem;
          background: var(--primary, #c6ff00);
          color: black;
          border: none;
          border-radius: 15px;
          font-size: 1.1rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .book-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(198, 255, 0, 0.2);
        }

        @media (max-width: 1024px) {
          .activity-main-content {
            grid-template-columns: 1fr;
          }
          .activity-title { font-size: 3.5rem; }
          .item-card { flex-direction: column; }
          .item-img { width: 100%; height: 200px; }
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
              <h2 style={{fontSize: '2.5rem', marginBottom: '2rem'}}>What to Expect</h2>
              <div className="items-grid">
                {activity.items.map((item, index) => (
                  <div className="item-card animate-fade-in-up" key={index} style={{animationDelay: `${index * 0.1}s`}}>
                    <img src={item.image} alt={item.title} className="item-img" />
                    <div className="item-info">
                      <h4 className="item-title">{item.title}</h4>
                      <p className="item-desc">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="sidebar-col">
           <div className="booking-sidebar animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <h3 className="booking-title">Ready for an Adventure?</h3>
              <p style={{opacity: 0.7, marginBottom: '2rem'}}>Contact our team to include this activity in your curated journey.</p>
              <button 
                className="book-btn"
                onClick={() => navigate('/plan')}
              >
                Inquire Now
              </button>
              
              <div style={{marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem'}}>
                 <button 
                   onClick={() => navigate('/activities')}
                   style={{background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '1rem', width: '100%', borderRadius: '15px', cursor: 'pointer', fontWeight: 'bold'}}
                 >
                   Explore Other Activities
                 </button>
              </div>
           </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
};

export default ActivityDetail;
