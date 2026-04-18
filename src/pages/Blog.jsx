import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


import Footer from '../components/Footer';

// Optimized Cloudinary image url used directly below

const Blog = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(API_BASE_URL + "/api/categories?type=blog");
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
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_BASE_URL + '/api/blogs');
        let data = [];
        if(response.ok) {
           data = await response.json();
        }
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    let result = blogs;
    if (activeCategory !== 'All') {
      result = result.filter(b => b.category === activeCategory);
    }
    if (searchTerm) {
      result = result.filter(b => 
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredBlogs(result);
  }, [activeCategory, searchTerm, blogs]);

  return (
    <div className="blog-listing-page">
      
      <style>{`
        .blog-page {
          background-color: #0F0F0F;
          min-height: 100vh;
          color: white;
          font-family: 'Inter', sans-serif;
        }

        .blog-hero {
          height: 60vh;
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background-image: url("https://res.cloudinary.com/dicvgtusz/image/upload/f_auto,q_30,w_1400/v1772526598/mihintale-anuradhapura-sri-lanka-dusk_zz7rbm.jpg");
          background-position: center;
          background-size: cover;
          background-attachment: fixed;
        }

        .blog-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.7);
        }

        .blog-hero-content {
          position: relative;
          z-index: 2;
          padding: 0 2rem;
        }

        .blog-hero-title {
          font-size: 4.5rem;
          font-weight: 950;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1rem;
          background: linear-gradient(to right, white, #c6ff00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .blog-hero-subtitle {
          font-size: 1.25rem;
          opacity: 0.8;
          max-width: 600px;
          margin: 0 auto;
        }

        .filter-section {
          position: sticky;
          top: 80px;
          z-index: 100;
          padding: 2rem 4rem;
          background: rgba(15, 15, 15, 0.8);
          backdrop-filter: blur(20px);
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
          overflow-x: auto;
          white-space: nowrap;
        }

        .category-btns::-webkit-scrollbar {
          height: 4px;
        }
        
        .category-btns::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
        }

        .filter-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          padding: 0.8rem 1.5rem;
          border-radius: 30px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
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
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50px;
          padding: 0.5rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 300px;
          transition: all 0.3s ease;
        }

        .search-bar-pkg:focus-within {
          border-color: var(--primary, #c6ff00);
          background: rgba(255,255,255,0.05);
        }

        .search-bar-pkg input {
          background: transparent;
          border: none;
          color: white;
          width: 100%;
          outline: none;
          font-size: 1rem;
          padding: 0.5rem;
        }

        .blog-grid-container {
          padding: 5rem 5%;
          max-width: 1600px;
          margin: 0 auto;
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 3rem;
        }

        .blog-card {
           background: rgba(255,255,255,0.02);
           border-radius: 30px;
           overflow: hidden;
           border: 1px solid rgba(255,255,255,0.05);
           transition: all 0.4s ease;
           display: flex;
           flex-direction: column;
        }

        .blog-card:hover {
          transform: translateY(-10px);
          border-color: rgba(198, 255, 0, 0.3);
          box-shadow: 0 15px 40px rgba(0,0,0,0.5);
        }

        .blog-card-img-wrap {
          height: 280px;
          position: relative;
          overflow: hidden;
        }

        .blog-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .blog-card:hover .blog-card-img {
          transform: scale(1.05);
        }

        .blog-date {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(10px);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary, #c6ff00);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .blog-card-content {
          padding: 2.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .blog-cat-badge {
          color: var(--primary, #c6ff00);
          font-size: 0.85rem;
          font-weight: 800;
          text-transform: uppercase;
          margin-bottom: 1rem;
          letter-spacing: 1px;
        }

        .blog-card-title {
          font-size: 1.8rem;
          font-weight: 900;
          margin-bottom: 1rem;
          line-height: 1.25;
          letter-spacing: -0.5px;
        }

        .blog-card-excerpt {
          opacity: 0.6;
          line-height: 1.6;
          margin-bottom: 2rem;
          flex-grow: 1;
        }

        .blog-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 1.5rem;
          margin-top: auto;
        }

        .blog-author {
          font-weight: 600;
          opacity: 0.9;
        }

        .read-more-btn {
          background: transparent;
          border: none;
          color: white;
          font-weight: 800;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .read-more-btn svg {
          transition: transform 0.3s ease;
        }

        .read-more-btn:hover {
          color: var(--primary, #c6ff00);
        }

        .read-more-btn:hover svg {
          transform: translateX(5px);
        }

        @media (max-width: 1024px) {
           .filter-section {
             padding: 1.5rem 2rem;
             top: 70px;
           }
           .filter-controls {
             flex-direction: column;
             align-items: stretch;
             gap: 1.2rem;
           }
           .search-bar-pkg {
             width: 100%;
           }
           .blog-hero-title {
             font-size: 3.5rem;
           }
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
          .blog-grid {
            grid-template-columns: 1fr;
            justify-items: center;
          }
          .blog-card {
            width: 100%;
            max-width: 420px;
          }
        }
      `}</style>

      <section className="blog-hero">
        <div className="blog-hero-content animate-fade-in-up">
          <h1 className="blog-hero-title">Ceylon Stories</h1>
          <p className="blog-hero-subtitle">
            Travel guides, cultural insights, and untold tales from the paradise island.
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{opacity: 0.5}}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search stories..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <main className="blog-grid-container">
        {loading ? (
          <div style={{textAlign: 'center', padding: '10rem 0'}}>
            <h2 className="animate-pulse">Loading amazing stories...</h2>
          </div>
        ) : (
          <>
            <div className="blog-grid">
              {filteredBlogs.map((blog, index) => (
                <div className="blog-card animate-fade-in-up" key={blog.id} style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="blog-card-img-wrap">
                    <img src={blog.image || undefined} alt={blog.title} className="blog-card-img" />
                    <div className="blog-date">
                       {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <div className="blog-card-content">
                    <span className="blog-cat-badge">{blog.category}</span>
                    <h3 className="blog-card-title">{blog.title}</h3>
                    <p className="blog-card-excerpt">{blog.excerpt}</p>
                    <div className="blog-card-footer">
                      <span className="blog-author">{blog.author}</span>
                      <button 
                         className="read-more-btn"
                         onClick={() => navigate(`/blogs/${blog.id}`)}
                      >
                         Read Story
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <line x1="5" y1="12" x2="19" y2="12"></line>
                           <polyline points="12 5 19 12 12 19"></polyline>
                         </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredBlogs.length === 0 && (
              <div style={{textAlign: 'center', padding: '5rem 0', opacity: 0.5}}>
                <h2>No stories found matching your search.</h2>
                <p>Try resetting the filters or searching for different keywords.</p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Blog;


