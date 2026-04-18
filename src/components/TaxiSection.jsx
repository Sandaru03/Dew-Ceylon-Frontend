import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import taxiHero from '../assets/taxi_hero_optimized.webp';

const TaxiSection = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.15 });

    const elements = sectionRef.current?.querySelectorAll('.taxi-animate');
    elements?.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="taxi-home-section" ref={sectionRef}>
      <style>{`
        .taxi-home-section {
          padding: 8rem 4rem;
          background-color: #f8f8f8;
          position: relative;
          z-index: 10;
          overflow: hidden;
        }

        .taxi-container {
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 6rem;
        }

        .taxi-content {
          flex: 1;
        }

        .t-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(198, 255, 0, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          color: #121E2A;
          font-weight: 800;
          font-size: 0.8rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          transform: translateY(30px);
          opacity: 0;
          transition: all 0.6s ease;
        }

        .t-title {
          font-size: clamp(3rem, 4vw, 4rem);
          line-height: 1.1;
          color: #121E2A;
          font-weight: 900;
          margin-bottom: 1.5rem;
          font-family: 'Montserrat', sans-serif;
          text-transform: uppercase;
          letter-spacing: -1px;
          transform: translateY(30px);
          opacity: 0;
          transition: all 0.6s ease 0.1s;
        }

        .t-desc {
          color: #555;
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 2.5rem;
          max-width: 550px;
          transform: translateY(30px);
          opacity: 0;
          transition: all 0.6s ease 0.2s;
        }

        .t-services {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 3.5rem;
          transform: translateY(30px);
          opacity: 0;
          transition: all 0.6s ease 0.3s;
        }

        .t-service-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #ffffff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          padding: 1.2rem;
          border-radius: 16px;
          font-weight: 700;
          color: #121E2A;
          transition: all 0.3s ease;
        }

        .t-service-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.06);
          border: 1px solid rgba(198, 255, 0, 0.4);
        }

        .t-service-icon {
          width: 40px;
          height: 40px;
          background: rgba(198, 255, 0, 0.2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #121E2A;
          flex-shrink: 0;
        }

        .t-btn-wrapper {
          transform: translateY(30px);
          opacity: 0;
          transition: all 0.6s ease 0.4s;
        }

        .t-btn {
          background-color: var(--primary, #c6ff00);
          color: #121E2A;
          padding: 1.2rem 3rem;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 800;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .t-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(185, 255, 0, 0.4);
        }

        .taxi-image-side {
          flex: 1;
          position: relative;
          transform: translateX(40px);
          opacity: 0;
          transition: all 0.8s ease 0.3s;
        }

        .taxi-image-wrapper {
          position: relative;
          border-radius: 40px;
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.15);
          aspect-ratio: 4/5;
          max-height: 700px;
          width: 100%;
        }

        .taxi-bg-blob {
          position: absolute;
          top: -20px;
          right: -20px;
          width: 100%;
          height: 100%;
          background: var(--primary, #c6ff00);
          border-radius: 40px;
          z-index: 0;
          opacity: 0.2;
          transform: rotate(3deg);
        }

        .taxi-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: relative;
          z-index: 1;
          transition: transform 0.8s ease;
        }

        .taxi-image-side:hover .taxi-image-wrapper img {
          transform: scale(1.05);
        }

        .t-floating-card {
          position: absolute;
          left: -40px;
          bottom: 40px;
          background: #ffffff;
          padding: 1.5rem 2rem;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          gap: 1.2rem;
          z-index: 2;
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .fc-icon {
          width: 50px;
          height: 50px;
          background: rgba(198, 255, 0, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #121E2A;
        }

        .fc-text h4 {
          margin: 0;
          font-weight: 900;
          color: #121E2A;
          font-size: 1.1rem;
        }

        .fc-text p {
          margin: 0;
          color: #666;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .taxi-animate.animate-in {
          opacity: 1;
          transform: translate(0, 0);
        }

        @media (max-width: 1024px) {
          .taxi-container {
            flex-direction: column;
            gap: 4rem;
          }
          .taxi-image-side {
            width: 100%;
            max-width: 600px;
          }
          .t-floating-card {
            left: 50%;
            transform: translateX(-50%);
            bottom: -30px;
            width: max-content;
          }
          @keyframes float {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(-10px); }
          }
        }
        
        @media (max-width: 768px) {
          .taxi-home-section { padding: 4rem 1.5rem; }
          .t-title { font-size: 2.5rem; }
          .t-services { grid-template-columns: 1fr; }
          .t-floating-card { display: none; }
        }
      `}</style>

      <div className="taxi-container">
        <div className="taxi-content">
          <div className="t-badge taxi-animate">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
            Island Wide Travel
          </div>
          
          <h2 className="t-title taxi-animate">
            Your Journey, <br/> Your Rules
          </h2>
          
          <p className="t-desc taxi-animate">
            Forget ordinary taxis. Travel safely with rested, English speaking locals who know every perfect photo stop. One upfront price, zero hidden fees, and pure island magic.
          </p>
          
          <div className="t-services taxi-animate">
            <div className="t-service-item">
              <div className="t-service-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              </div>
              Airport Transfers
            </div>
            <div className="t-service-item">
              <div className="t-service-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
              </div>
              Shared Taxi
            </div>
            <div className="t-service-item">
              <div className="t-service-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              </div>
              Private Car Driver
            </div>
            <div className="t-service-item">
              <div className="t-service-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
              </div>
              Long Distance
            </div>
          </div>
          
          <div className="t-btn-wrapper taxi-animate">
            <button className="t-btn" onClick={() => navigate('/taxi')}>
              Book Your Ride
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="taxi-image-side taxi-animate">
          <div className="taxi-bg-blob"></div>
          <div className="taxi-image-wrapper">
            <img src={taxiHero} alt="Premium Taxi Service" />
          </div>
          <div className="t-floating-card">
            <div className="fc-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div className="fc-text">
              <h4>100% Secure</h4>
              <p>Verified Local Drivers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaxiSection;
