import React, { useState, useEffect } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(API_BASE_URL + '/api/reviews');
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (!loading && reviews.length === 0) return null;

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: i < rating ? 1 : 0.3, marginRight: '2px' }}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    ));
  };

  return (
    <section className="rv-premium-bg">
      <style>{`
        .rv-premium-bg {
          padding: 8rem 4rem;
          background: #050a0f;
          position: relative;
          z-index: 10;
          overflow: hidden;
        }

        /* ── Advanced Background Effects ── */
        .rv-premium-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.6;
          pointer-events: none;
        }

        .rv-glow-orb {
          position: absolute;
          top: -20%;
          left: -10%;
          width: 60%;
          height: 80%;
          background: radial-gradient(circle, rgba(198,255,0,0.05) 0%, transparent 60%);
          pointer-events: none;
          z-index: 1;
        }

        /* ── Layout ── */
        .rv-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        
        .rv-header-center {
          text-align: center;
          margin-bottom: 4rem;
          max-width: 700px;
        }
        
        .rv-tag {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--primary, #c6ff00);
          margin-bottom: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .rv-title {
          font-size: 3.5rem;
          font-weight: 950;
          color: #ffffff;
          line-height: 1.1;
          letter-spacing: -1px;
          margin-bottom: 1.5rem;
        }
        .rv-title span {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.2);
        }
        
        .rv-desc {
          color: rgba(255,255,255,0.6);
          font-size: 0.95rem;
          line-height: 1.7;
        }
        
        .rv-slider-wrapper {
          width: 100%;
          overflow: hidden;
          padding: 2rem 0;
          position: relative;
        }

        /* Gradient mask for smooth slider edges */
        .rv-slider-wrapper::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #050a0f 0%, transparent 5%, transparent 95%, #050a0f 100%);
          pointer-events: none;
          z-index: 5;
        }
        
        .rv-cards-track {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: marquee-scroll-rev 35s linear infinite;
          will-change: transform;
        }

        @media (hover: hover) and (pointer: fine) {
          .rv-slider-wrapper:hover .rv-cards-track {
            animation-play-state: paused;
          }
        }

        @keyframes marquee-scroll-rev {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        
        .rv-card {
          flex: 0 0 450px;
          position: relative;
          border-radius: 30px;
          padding: 3rem 2.5rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.01));
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          border-left: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
          transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
          display: flex;
          flex-direction: column;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        
        .rv-card:hover {
          transform: translateY(-8px);
          border-color: rgba(198,255,0,0.4);
          box-shadow: 0 20px 50px rgba(198,255,0,0.15);
        }

        .rv-quote-icon {
          position: absolute;
          top: 2rem;
          right: 2.5rem;
          opacity: 0.05;
          color: white;
        }
        .rv-card:hover .rv-quote-icon {
          color: var(--primary, #c6ff00);
          opacity: 0.15;
          transform: scale(1.1);
          transition: all 0.4s ease;
        }
        
        .rv-stars {
          color: var(--primary, #c6ff00);
          margin-bottom: 1.5rem;
          display: flex;
        }
        
        .rv-text {
          font-size: 1.1rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.85);
          font-style: italic;
          margin-bottom: 2.5rem;
          flex-grow: 1;
        }
        
        .rv-author {
          display: flex;
          align-items: center;
          gap: 1.2rem;
        }
        
        .rv-author-img {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          object-fit: cover;
          background: rgba(255,255,255,0.1);
        }
        
        .rv-author-info h4 {
          margin: 0 0 0.3rem 0;
          font-size: 1.1rem;
          font-weight: 800;
          color: white;
        }
        
        .rv-author-info p {
          margin: 0;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 700;
        }

        .rv-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          color: rgba(255,255,255,0.3);
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 800;
        }
        
        @media (max-width: 1024px) {
          .rv-title { font-size: 2.8rem; }
          .rv-card { flex: 0 0 350px; padding: 2rem; }
        }
        
        @media (max-width: 768px) {
          .rv-premium-bg { padding: 5rem 1.5rem; }
          .rv-title { font-size: 2.4rem; }
          .rv-card { flex: 0 0 300px; padding: 1.8rem; }
          .rv-slider-wrapper::after { display: none; }
        }
      `}</style>
      
      <div className="rv-glow-orb" />

      <div className="rv-container">
        <div className="rv-header-center animate-fade-in-up">
          <div className="rv-tag">Testimonials</div>
          <h2 className="rv-title">
            GUEST <span>EXPERIENCES</span>
          </h2>
          <p className="rv-desc">
            Discover what our travelers have to say about their unforgettable journeys with Dew Ceylon. Real stories from real explorers.
          </p>
        </div>

        {loading ? (
          <div className="rv-loading">Loading Reviews...</div>
        ) : (
          <div className="rv-slider-wrapper">
            <div className="rv-cards-track">
              {/* Duplicate array multiple times to ensure the continuous scroll never ends, even if there's only 1 review */}
              {[...reviews, ...reviews, ...reviews, ...reviews, ...reviews, ...reviews].map((review, index) => (
                <div className="rv-card" key={`rv-${review.id}-${index}`}>
                  <div className="rv-quote-icon">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <div className="rv-stars">
                    {renderStars(review.rating)}
                  </div>
                  <p className="rv-text">"{review.review_text}"</p>
                  <div className="rv-author">
                    {review.image ? (
                        <img src={review.image} alt={review.name} className="rv-author-img" />
                    ) : (
                        <div className="rv-author-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                            {review.name.charAt(0)}
                        </div>
                    )}
                    <div className="rv-author-info">
                      <h4>{review.name}</h4>
                      <p>{review.role}</p>
                    </div>
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

export default Reviews;
