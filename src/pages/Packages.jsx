import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";

// Use same assets
import heroBg from "../assets/hero.jpg";
import img1 from "../assets/hero2.jpg";
import img2 from "../assets/hero4.jpg";

const PackagesPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories?type=package");
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
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/packages");
        const data = await response.json();
        setPackages(data);
        setFilteredPackages(data);
      } catch (err) {
        console.error("Failed to fetch packages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    let result = packages;
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    setFilteredPackages(result);
  }, [activeCategory, searchTerm, packages]);

  return (
    <div className="packages-page">
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
          background: url(${heroBg}) center/cover fixed;
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
          background: rgba(15, 15, 15, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          opacity: 0.7;
        }

        .pkg-card-price {
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--primary, #c6ff00);
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
            flex-direction: column;
            top: 70px;
          }
          .pkg-hero-title { font-size: 3rem; }
          .pkg-grid-section { padding: 2rem; }
        }

        @media (max-width: 768px) {
          .category-btns { flex-wrap: wrap; justify-content: center; }
          .search-bar-pkg { width: 100%; }
        }
      `}</style>

      <section className="pkg-hero">
        <div className="pkg-hero-content animate-fade-in-up">
          <h1 className="pkg-hero-title">Curated Journeys</h1>
          <p className="pkg-hero-subtitle">
            Explore our collection of hand-picked experiences designed for the
            conscious traveler. From the wild savannahs to misty tea estates.
          </p>
        </div>
      </section>

      <div className="filter-section">
        <div className="category-btns">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="search-bar-pkg">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ opacity: 0.5 }}
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <section className="pkg-grid-section">
        {loading ? (
          <div style={{ textAlign: "center", padding: "10rem 0" }}>
            <h2 className="animate-pulse">Loading amazing journeys...</h2>
          </div>
        ) : (
          <>
            <div className="pkg-grid">
              {filteredPackages.map((pkg) => (
                <div
                  className="modern-pkg-card animate-fade-in-up"
                  key={pkg.id}
                >
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="pkg-card-img"
                  />
                  <div className="pkg-card-overlay"></div>
                  <div className="pkg-card-content">
                    <span className="pkg-card-badge">{pkg.category}</span>
                    <h3 className="pkg-card-title">{pkg.title}</h3>
                    <div className="pkg-card-meta">
                      <span>{pkg.duration}</span>
                      <span>{pkg.rating} ★</span>
                    </div>
                    <div className="pkg-card-price">
                      {pkg.price.toString().startsWith("$")
                        ? pkg.price
                        : `$${pkg.price}`}
                    </div>
                    <div className="pkg-card-footer">
                      <button
                        className="pkg-view-btn-custom"
                        onClick={() => navigate(`/package/${pkg.id}`)}
                      >
                        View Journey
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPackages.length === 0 && (
              <div
                style={{ textAlign: "center", padding: "5rem 0", opacity: 0.5 }}
              >
                <h2>No adventures found matching your search.</h2>
                <p>
                  Try resetting the filters or searching for something else.
                </p>
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default PackagesPage;
