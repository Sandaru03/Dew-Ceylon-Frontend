import React from 'react';

const servicesData = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Safe Tracking",
    description: "Your journey is monitored 24/7 to ensure utmost safety across all destinations."
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Time Scheduling",
    description: "Carefully curated itineraries designed to maximize your experience without the rush."
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    title: "Luxury Packages",
    description: "Experience Ceylon with premium accommodations and exclusive wildlife access."
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Expert Guides",
    description: "Traverse the wild with certified naturalists who know every secret of the jungle."
  }
];

const Services = () => {
  return (
    <section className="services-section" id="services">
      <style>{`
        .services-section {
          padding: 8rem 4rem;
          background-color: #FDFBF7;
          position: relative;
          z-index: 10;
          overflow: hidden;
        }
        
        .bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          opacity: 0.5;
          animation: floatBlobs 10s infinite alternate cubic-bezier(0.45, 0.05, 0.55, 0.95);
        }
        
        .bg-blob-1 {
          width: 400px;
          height: 400px;
          background: var(--primary);
          top: -50px;
          left: -100px;
        }
        
        .bg-blob-2 {
          width: 500px;
          height: 500px;
          background: #00d2ff;
          bottom: -100px;
          right: -100px;
          animation-delay: -5s;
        }
        
        @keyframes floatBlobs {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(60px, 40px) scale(1.1); }
        }
        
        .services-header {
          text-align: center;
          margin-bottom: 5rem;
          position: relative;
          z-index: 2;
        }
        
        .section-subtitle {
          color: var(--primary);
          font-weight: 700;
          letter-spacing: 2px;
          font-size: 0.9rem;
          display: block;
          margin-bottom: 1rem;
        }
        
        .section-title {
          font-size: 3rem;
          line-height: 1.2;
          color: var(--bg-dark);
        }
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        
        .service-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          border-radius: 30px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 100%);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.3);
          padding: 2.5rem;
          position: relative;
          z-index: 1;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-25deg);
          transition: left 0.5s ease;
          z-index: -1;
        }
        
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px 0 rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5);
          border-color: rgba(255, 255, 255, 1);
        }
        
        .service-card:hover::before {
          left: 200%;
        }
        
        .service-icon {
          color: var(--primary);
          margin-bottom: 2rem;
          background: white;
          padding: 1.2rem;
          border-radius: 50%;
          display: inline-flex;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
        
        .service-title {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          text-transform: none;
          color: var(--bg-dark);
        }
        
        .service-desc {
          color: #555;
          line-height: 1.6;
          font-size: 0.95rem;
        }
        
        @media (max-width: 768px) {
          .services-section { padding: 4rem 2rem; }
          .section-title { font-size: 2rem; }
        }
      `}</style>
      {/* Background blobs for floating glass effect */}
      <div className="bg-blob bg-blob-1"></div>
      <div className="bg-blob bg-blob-2"></div>
      <div className="services-header animate-fade-in-up">
        <span className="section-subtitle">WHY CHOOSE US</span>
        <h2 className="section-title">Elevating Your Journey<br />Beyond Expectations</h2>
      </div>
      
      <div className="services-grid">
        {servicesData.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
