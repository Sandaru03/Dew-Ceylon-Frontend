import React, { useState, useEffect, useRef } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const wrapperRef = useRef(null);
  const isInteractingRef = useRef(false);
  const timeoutIdRef = useRef(null);
  const scrollPosRef = useRef(0);
  
  // Mouse drag refs
  const isDownRef = useRef(false);
  const lastXRef = useRef(0);

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

  // Calculate dynamic repetitions to avoid iOS lag from too many DOM nodes
  const rawRevCount = reviews.length || 1;
  let repCount = Math.ceil(8 / rawRevCount);
  if (repCount % 2 !== 0) repCount += 1;
  if (repCount < 2) repCount = 2;
  const repeatedReviews = reviews.length > 0 ? Array(repCount).fill(reviews).flat() : [];

  // Smooth JS requestAnimationFrame loop for infinite auto-scrolling & wrap detection
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || repeatedReviews.length === 0) return;

    let animationFrameId;
    let lastTime = performance.now();

    const step = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      const halfWidth = wrapper.scrollWidth / 2;
      if (halfWidth > 0) {
        const scrollSpeed = halfWidth / (45 * 1000); // pixels per millisecond (45s full loop)
        
        const isPaused = isInteractingRef.current;
        if (!isPaused) {
          // Increment the precise fractional scroll position
          scrollPosRef.current += scrollSpeed * delta;
          if (scrollPosRef.current >= halfWidth) {
            scrollPosRef.current -= halfWidth;
          }
          wrapper.scrollLeft = scrollPosRef.current;
        } else {
          // If interacting, we still check and wrap to keep scroll infinite!
          if (wrapper.scrollLeft >= halfWidth) {
            wrapper.scrollLeft = 1;
            scrollPosRef.current = 1;
          } else if (wrapper.scrollLeft <= 0) {
            wrapper.scrollLeft = halfWidth - 1;
            scrollPosRef.current = halfWidth - 1;
          } else {
            // Keep the fractional position in sync with actual scroll position
            scrollPosRef.current = wrapper.scrollLeft;
          }
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [repeatedReviews.length]);

  if (!loading && reviews.length === 0) return null;

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: i < rating ? 1 : 0.3, marginRight: '2px' }}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    ));
  };

  // Interaction handlers to control auto-scrolling behavior
  const pauseAutoScroll = () => {
    isInteractingRef.current = true;
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
  };

  const resumeAutoScrollWithDelay = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 1500); // Resume auto scroll after 1.5 seconds of inactivity
  };

  const handleMouseDown = (e) => {
    isDownRef.current = true;
    lastXRef.current = e.pageX - wrapperRef.current.offsetLeft;
    pauseAutoScroll();
  };

  const handleMouseMove = (e) => {
    if (!isDownRef.current) return;
    e.preventDefault();
    const x = e.pageX - wrapperRef.current.offsetLeft;
    const dx = x - lastXRef.current;
    lastXRef.current = x;
    wrapperRef.current.scrollLeft -= dx * 1.5; // Drag sensitivity multiplier
    scrollPosRef.current = wrapperRef.current.scrollLeft;
    pauseAutoScroll();
  };

  const handleMouseUp = () => {
    if (isDownRef.current) {
      isDownRef.current = false;
      resumeAutoScrollWithDelay();
    }
  };

  const handleMouseLeave = () => {
    if (isDownRef.current) {
      isDownRef.current = false;
      resumeAutoScrollWithDelay();
    }
  };

  const handleTouchStart = () => {
    pauseAutoScroll();
  };

  const handleTouchEnd = () => {
    resumeAutoScrollWithDelay();
  };

  const handleTouchCancel = () => {
    resumeAutoScrollWithDelay();
  };

  const handleWheel = () => {
    pauseAutoScroll();
    resumeAutoScrollWithDelay();
  };

  return (
    <section className="rv-premium-bg">
      <style>{`
        .rv-premium-bg {
          padding: 5rem 2rem;
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
          margin-bottom: 2.5rem;
          max-width: 700px;
        }
        
        .rv-tag {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: var(--primary, #c6ff00);
          margin-bottom: 0.8rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .rv-title {
          font-size: 2.2rem;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.2;
          letter-spacing: -0.5px;
          margin-bottom: 1rem;
        }
        
        .rv-title span {
          color: var(--primary, #c6ff00);
        }
        
        .rv-desc {
          color: rgba(255,255,255,0.6);
          font-size: 0.88rem;
          line-height: 1.6;
        }

        .rv-slider-outer {
          width: 100%;
          position: relative;
        }
        
        .rv-slider-wrapper {
          width: 100%;
          overflow-x: auto;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ */
          padding: 1.5rem 0;
          position: relative;
          cursor: grab;
          user-select: none;
          -webkit-user-select: none;
        }

        .rv-slider-wrapper::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }

        .rv-slider-wrapper:active {
          cursor: grabbing;
        }

        /* Gradient mask for smooth slider edges (positioned on outer container so it stays fixed) */
        .rv-slider-outer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #050a0f 0%, transparent 5%, transparent 95%, #050a0f 100%);
          pointer-events: none;
          z-index: 5;
        }
        
        .rv-cards-track {
          display: flex;
          gap: 1.8rem;
          width: max-content;
        }
        
        .rv-card {
          flex: 0 0 380px;
          position: relative;
          border-radius: 24px;
          padding: 2rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01));
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          border-left: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.35);
          transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
          display: flex;
          flex-direction: column;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          -webkit-transform: translate3d(0, 0, 0);
          isolation: isolate;
        }
        
        .rv-card:hover {
          transform: translateY(-6px);
          border-color: rgba(198,255,0,0.35);
          box-shadow: 0 15px 40px rgba(198,255,0,0.12);
        }

        .rv-quote-icon {
          position: absolute;
          top: 1.5rem;
          right: 2rem;
          opacity: 0.08;
          color: white;
        }
        
        .rv-quote-icon svg {
          width: 40px;
          height: 40px;
        }
        
        .rv-card:hover .rv-quote-icon {
          color: var(--primary, #c6ff00);
          opacity: 0.15;
          transform: scale(1.05);
          transition: all 0.4s ease;
        }
        
        .rv-stars {
          color: var(--primary, #c6ff00);
          margin-bottom: 1rem;
          display: flex;
        }
        
        .rv-text {
          font-size: 0.92rem;
          line-height: 1.6;
          color: rgba(255,255,255,0.85);
          font-style: italic;
          margin-bottom: 2rem;
          flex-grow: 1;
        }
        
        .rv-author {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .rv-author-img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          object-fit: cover;
          background: rgba(255,255,255,0.1);
        }
        
        .rv-author-info h4 {
          margin: 0 0 0.2rem 0;
          font-size: 0.95rem;
          font-weight: 800;
          color: white;
        }
        
        .rv-author-info p {
          margin: 0;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 700;
        }

        .rv-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          color: rgba(255,255,255,0.3);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 800;
        }
        
        @media (max-width: 1024px) {
          .rv-title { font-size: 1.8rem; }
          .rv-card { flex: 0 0 320px; padding: 1.5rem; }
        }
        
        @media (max-width: 768px) {
          .rv-premium-bg { padding: 2.5rem 1rem; }
          .rv-header-center { margin-bottom: 1.5rem; }
          .rv-tag { margin-bottom: 0.4rem; }
          .rv-title { font-size: 1.6rem; margin-bottom: 0.4rem; }
          .rv-desc { font-size: 0.8rem; }
          .rv-slider-wrapper { padding: 0.5rem 0; }
          .rv-slider-outer::after { display: none; }
          .rv-card { 
            flex: 0 0 280px; 
            height: 300px; 
            padding: 1.2rem; 
            border-radius: 20px;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            background: rgba(26, 26, 26, 0.95);
          }
          .rv-quote-icon { top: 1rem; right: 1.2rem; }
          .rv-quote-icon svg { width: 30px; height: 30px; }
          .rv-stars { margin-bottom: 0.5rem; }
          .rv-text { 
            font-size: 0.85rem; 
            line-height: 1.4; 
            margin-bottom: 0.8rem;
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .rv-author { gap: 0.8rem; margin-top: auto; }
          .rv-author-img { width: 36px; height: 36px; }
          .rv-author-info h4 { font-size: 0.85rem; }
          .rv-author-info p { font-size: 0.65rem; }
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
          <div className="rv-slider-outer">
            <div 
              className="rv-slider-wrapper" 
              ref={wrapperRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchCancel}
              onWheel={handleWheel}
            >
              <div className="rv-cards-track">
                {repeatedReviews.map((review, index) => (
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
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
