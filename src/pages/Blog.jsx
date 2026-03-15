import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Footer from '../components/Footer';

// Reusing same headers
import heroBg from '../assets/hero.jpg';

const Blog = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories?type=blog");
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
        const response = await fetch('http://localhost:5000/api/blogs');
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
          background: url(${heroBg}) center/cover fixed;
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

        .blog-filter-section {
          position: sticky;
          top: 80px;
          z-index: 100;
          padding: 2rem 5%;
          background: rgba(15, 15, 15, 0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .blog-cats {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          white-space: nowrap;
          padding-bottom: 0.5rem;
        }

        .blog-cats::-webkit-scrollbar {
          height: 4px;
        }
        
        .blog-cats::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
        }

        .cat-btn {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          font-size: 1.1rem;
          font-weight: 700;
          transition: all 0.3s ease;
          position: relative;
        }

        .cat-btn:hover {
          color: white;
        }

        .cat-btn.active {
          color: var(--primary, #c6ff00);
        }

        .cat-btn.active::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 50%;
          height: 2px;
          background: var(--primary, #c6ff00);
          border-radius: 2px;
        }

        .blog-search {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50px;
          padding: 0.8rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 350px;
          transition: all 0.3s ease;
        }

        .blog-search:focus-within {
          border-color: var(--primary, #c6ff00);
          background: rgba(255,255,255,0.05);
        }

        .blog-search input {
          background: transparent;
          border: none;
          color: white;
          width: 100%;
          outline: none;
          font-size: 1rem;
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
           .blog-filter-section {
             flex-direction: column;
             gap: 2rem;
             align-items: flex-start;
           }
           .blog-search {
             width: 100%;
           }
           .blog-hero-title {
             font-size: 3.5rem;
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

      <div className="blog-filter-section">
        <div className="blog-cats">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="blog-search">
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
                    <img src={blog.image} alt={blog.title} className="blog-card-img" />
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
