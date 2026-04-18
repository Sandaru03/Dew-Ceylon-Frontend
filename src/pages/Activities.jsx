import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


import Footer from '../components/Footer';


const Activities = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(API_BASE_URL + "/api/categories?type=activity");
        const data = await response.json();
        setCategories(["All", ...data.map(cat => cat.name)]);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setCategories(["All"]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_BASE_URL + '/api/activities');
        let data = [];
        if(response.ok) {
           data = await response.json();
        }
        setActivities(data);
        setFilteredActivities(data);
      } catch (err) {
        console.error("Failed to fetch activities:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  useEffect(() => {
    let result = activities;
    if (activeCategory !== 'All') {
      result = result.filter(a => a.category === activeCategory);
    }
    if (searchTerm) {
      result = result.filter(a => 
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredActivities(result);
  }, [activeCategory, searchTerm, activities]);

  return (
    <div className="activities-page">
      
      <style>{`
        .packages-page {
          background-color: #0F0F0F;
          min-height: 100vh;
          color: white;
        }

        .pkg-hero {
          height: 60vh;
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background-image: url("https://res.cloudinary.com/dicvgtusz/image/upload/f_auto,q_30,w_1400/v1772526396/theres-no-taming-rapids-only-going-with-flow-shot-group-young-male-friends-white-water-rafting_rd0fxv.jpg");
          background-position: center;
          background-size: cover;
          will-change: transform;
        }

        .pkg-hero::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.6);
        }

        .pkg-hero-content {
          position: relative;
          z-index: 2;
          padding: 0 2rem;
        }

        .pkg-hero-title {
          font-size: 4rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1rem;
        }

        .pkg-hero-subtitle {
          font-size: 1.2rem;
          opacity: 0.8;
          max-width: 600px;
          margin: 0 auto;
        }

        .filter-section {
          position: sticky;
          top: 80px;
          z-index: 100;
          padding: 2rem 4rem;
          background: rgba(15, 15, 15, 0.95);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
        }

        .filter-mobile-head {
          display: none;
          width: 100%;
        }

        .filter-toggle-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: white;
          border-radius: 14px;
          padding: 0.9rem 1rem;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .filter-toggle-btn svg {
          transition: transform 0.25s ease;
        }

        .filter-toggle-btn.open svg {
          transform: rotate(180deg);
        }

        .filter-controls {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
        }

        .category-btns {
          display: flex;
          gap: 1rem;
        }

        .filter-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          padding: 0.8rem 1.5rem;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          font-size: 0.9rem;
        }

        .filter-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .filter-btn.active {
          background: var(--primary, #c6ff00);
          color: black;
          border-color: var(--primary, #c6ff00);
        }

        .search-bar-pkg {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          padding: 0.5rem 1.5rem;
          width: 300px;
        }

        .search-bar-pkg input {
          background: transparent;
          border: none;
          color: white;
          width: 100%;
          outline: none;
          padding: 0.5rem;
        }

        .pkg-grid-section {
          padding: 4rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .pkg-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 3rem;
        }

        .modern-pkg-card {
          position: relative;
          height: 500px;
          border-radius: 30px;
          overflow: hidden;
          background: #1a1a1a;
          transition: all 0.5s cubic-bezier(0.2, 1, 0.3, 1);
          border: 1px solid rgba(255, 255, 255, 0.05);
          will-change: transform;
        }

        .modern-pkg-card:hover {
          transform: translateY(-15px) scale(1.02);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }

        .pkg-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .modern-pkg-card:hover .pkg-card-img {
          transform: scale(1.1);
        }

        .pkg-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);
          z-index: 1;
        }

        .pkg-card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 2.5rem;
          z-index: 2;
        }

        .pkg-card-badge {
          display: inline-block;
          background: var(--primary, #c6ff00);
          color: black;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 800;
          margin-bottom: 1rem;
          text-transform: uppercase;
        }

        .pkg-card-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 0.8rem;
          line-height: 1.1;
        }

        .pkg-card-meta {
          display: flex;
          flex-direction: column;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          opacity: 0.7;
        }

        .pkg-card-footer {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .pkg-view-btn-custom {
          flex: 1;
          background: white;
          color: black;
          border: none;
          padding: 1rem;
          border-radius: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .pkg-view-btn-custom:hover {
          background: var(--primary, #c6ff00);
        }

        @media (max-width: 1024px) {
          .filter-section {
            padding: 1.5rem 2rem;
            top: 70px;
          }
          .filter-controls {
            flex-direction: column;
            align-items: stretch;
          }
          .pkg-hero-title { font-size: 3rem; }
          .pkg-grid-section { padding: 2rem; }
        }

        @media (max-width: 768px) {
          .filter-section {
            display: block;
            padding: 0.9rem 1rem;
            gap: 0.2rem;
          }
          .filter-mobile-head {
            display: block;
          }
          .filter-controls {
            display: none;
          }
          .filter-controls.open {
            display: block;
            padding-top: 0.9rem;
          }
          .category-btns {
            flex-wrap: wrap;
            justify-content: flex-start;
            max-height: none;
            overflow: visible;
            white-space: normal;
            margin-bottom: 0.9rem;
          }
          .search-bar-pkg { width: 100%; }
          .pkg-grid {
            grid-template-columns: 1fr;
            justify-items: center;
          }
          .modern-pkg-card {
            width: 100%;
            max-width: 420px;
          }
        }
      `}</style>

      <section className="pkg-hero">
        <div className="pkg-hero-content animate-fade-in-up">
          <h1 className="pkg-hero-title">Experience Sri Lanka</h1>
          <p className="pkg-hero-subtitle">
            Discover handpicked, scam free experiences worth every cent. Choose your pace with private or shared tours. Our trusted local guides share hidden gems, pure, unrushed passion, and authentic stories you can’t Google.
          </p>
        </div>
      </section>

      <div className="filter-section">
        <div className="filter-mobile-head">
          <button
            className={`filter-toggle-btn ${isMobileFilterOpen ? 'open' : ''}`}
            onClick={() => setIsMobileFilterOpen((prev) => !prev)}
            type="button"
          >
            Filter & Search
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        <div className={`filter-controls ${isMobileFilterOpen ? 'open' : ''}`}>
          <div className="category-btns">
            {categories.map(cat => (
              <button 
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="search-bar-pkg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{opacity: 0.5}}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search activities..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <section className="pkg-grid-section">
        {loading ? (
          <div style={{textAlign: 'center', padding: '10rem 0'}}>
            <h2 className="animate-pulse">Loading thrilling experiences...</h2>
          </div>
        ) : (
          <>
            <div className="pkg-grid">
              {filteredActivities.map(activity => (
                <div className="modern-pkg-card animate-fade-in-up" key={activity.id}>
                  <img src={activity.image || undefined} alt={activity.title} className="pkg-card-img" />
                  <div className="pkg-card-overlay"></div>
                  <div className="pkg-card-content">
                    <span className="pkg-card-badge">{activity.category}</span>
                    <h3 className="pkg-card-title">{activity.title}</h3>
                    <div className="pkg-card-meta">
                      <span>{activity.tagline}</span>
                    </div>
                    <div className="pkg-card-footer">
                      <button 
                        className="pkg-view-btn-custom"
                        onClick={() => navigate(`/activities/${activity.id}`)}
                      >Discover More</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredActivities.length === 0 && (
              <div style={{textAlign: 'center', padding: '5rem 0', opacity: 0.5}}>
                <h2>No activities found matching your search.</h2>
                <p>Try resetting the filters or searching for something else.</p>
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Activities;


