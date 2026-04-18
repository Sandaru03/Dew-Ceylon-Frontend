import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const PopularPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(API_BASE_URL + '/api/featured-packages');
        const data = await res.json();
        setPackages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch featured packages:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (!loading && packages.length === 0) return null;

  return (
    <section className="popular-section">
      <style>{`
        .popular-section {
          padding: 8rem 4rem;
          background-color: #f8f8f8;
          position: relative;
          z-index: 10;
        }
        
        .popular-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          position: relative;
          z-index: 2;
        }
        
        .popular-column { 
          display: flex; 
          flex-direction: column; 
          gap: 2.5rem; 
        }
        
        .popular-header { 
          margin-bottom: 1rem; 
          margin-top: 1rem; 
        }
        
        .popular-title {
          font-size: 3.5rem;
          font-weight: 900;
          color: #121E2A;
          text-transform: uppercase;
          line-height: 1;
        }
        
        .pkg-card {
          position: relative;
          aspect-ratio: 4 / 5;
          border-radius: 30px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          will-change: transform;
        }
        
        .pkg-card-inner {
          position: absolute;
          inset: 0;
          border-radius: 30px;
          overflow: hidden;
        }
        
        .pkg-card:hover {
          transform: translateY(-12px);
        }
        
        .pkg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
          will-change: transform;
        }

        .pkg-card:hover .pkg-img {
          transform: scale(1.1);
        }
        
        .pkg-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2.5rem 1.5rem 1.5rem;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
          color: white;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        
        .pkg-badge {
          align-self: flex-start;
          background-color: #ccff00;
          color: #000;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          letter-spacing: 0.5px;
          margin-bottom: 0.5rem;
        }
        
        .pkg-title {
          font-size: 1.8rem;
          font-weight: 900;
          text-transform: uppercase;
          line-height: 1.1;
          margin: 0;
          letter-spacing: -0.5px;
        }
        
        .pkg-desc {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.8);
          line-height: 1.4;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .pkg-view-btn {
          margin-top: 0.5rem;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
          padding: 0.8rem 1.5rem;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          align-self: flex-start;
        }

        .pkg-view-btn:hover {
          background: white;
          color: black;
          border-color: white;
        }

        .popular-loading {
          grid-column: 1 / -1;
          text-align: center;
          padding: 6rem;
          color: #aaa;
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
          .popular-container { grid-template-columns: 1fr; }
          .popular-section { padding: 6rem 2rem; }
        }
        
        @media (max-width: 650px) {
          .popular-title { font-size: 2.5rem; }
        }
      `}</style>
      <div className="popular-container">
        {loading ? (
          <div className="popular-loading">Loading packages...</div>
        ) : (
          <>
            {/* Left Column */}
            <div className="popular-column animate-fade-in-up">
              <div className="popular-header">
                <h2 className="popular-title">POPULAR<br />PACKAGES</h2>
              </div>
              {packages[0] && <PackageCard data={packages[0]} onView={() => navigate(`/package/${packages[0].id}`)} />}
              {packages[2] && <PackageCard data={packages[2]} onView={() => navigate(`/package/${packages[2].id}`)} />}
            </div>

            {/* Right Column */}
            <div className="popular-column animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {packages[1] && <PackageCard data={packages[1]} onView={() => navigate(`/package/${packages[1].id}`)} />}
              {packages[3] && <PackageCard data={packages[3]} onView={() => navigate(`/package/${packages[3].id}`)} />}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const PackageCard = ({ data, onView }) => {
  return (
    <div className="pkg-card" onClick={onView}>
      <div className="pkg-card-inner">
        <img src={data.image || undefined} alt={data.title} className="pkg-img" />
        <div className="pkg-overlay">
          <span className="pkg-badge">{data.duration || data.category}</span>
          <h3 className="pkg-title">{data.title}</h3>
          <p className="pkg-desc">{data.short_description || data.description}</p>
          <button className="pkg-view-btn" onClick={(e) => { e.stopPropagation(); onView(); }}>View Details</button>
        </div>
      </div>
      {data.discount && (
        <div className="discount-badge">
          <svg viewBox="0 0 100 100" className="badge-bg">
            <polygon fill="var(--primary)" points="50,4 57.8,10.8 67.6,7.5 72.2,16.7 82.5,17.5 83.3,27.8 92.5,32.4 89.2,42.2 96,50 89.2,57.8 92.5,67.6 83.3,72.2 82.5,82.5 72.2,83.3 67.6,92.5 57.8,89.2 50,96 42.2,89.2 32.4,92.5 27.8,83.3 17.5,82.5 16.7,72.2 7.5,67.6 10.8,57.8 4,50 10.8,42.2 7.5,32.4 16.7,27.8 17.5,17.5 27.8,16.7 32.4,7.5 42.2,10.8" />
          </svg>
          <div className="badge-text">
            <span className="badge-small">Get Up to</span>
            <span className="badge-large">{data.discount}% Off</span>
            <span className="badge-small">DISCOUNT</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularPackages;


