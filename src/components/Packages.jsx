import React from 'react';

// Reusing existing images from public/assets folder as requested
import img1 from '../assets/hero.jpg';
import img2 from '../assets/hero4.jpg';
import img3 from '../assets/hero2.jpg';

const packageData = [
  {
    id: 1,
    duration: '3 Days / 2 Nights',
    title: 'Yala National Park',
    description: "Experience the thrill of leopard spotting in Sri Lanka's most famous wildlife sanctuary.",
    image: img1,
  },
  {
    id: 2,
    duration: '2 Days / 1 Night',
    title: 'Sinharaja Forest Reserve',
    description: "Trek through a UNESCO World Heritage site filled with endemic flora and fauna.",
    image: img2,
  },
  {
    id: 3,
    duration: '4 Days / 3 Nights',
    title: 'Ella & Surroundings',
    description: "Discover iconic railway bridges, breathtaking hikes, and endless tea estates.",
    image: img3,
  }
];

const Packages = () => {
  return (
    <section id="packages" style={{ padding: '5rem 2rem', backgroundColor: '#FAFAFA', display: 'flex', justifyContent: 'center' }}>
      <style>{`
        .pkg-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 1200px;
          width: 100%;
        }
        
        .pkg-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          height: 450px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
          cursor: pointer;
        }
        
        .pkg-card:hover {
          transform: translateY(-10px);
        }
        
        .pkg-image-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .pkg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        
        .pkg-card:hover .pkg-image {
          transform: scale(1.05);
        }
        
        .pkg-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 30%,
            rgba(0, 0, 0, 0.5) 100%
          );
          z-index: 1;
        }
        
        .pkg-content-glass {
          position: absolute;
          bottom: 0px;
          left: 0;
          width: 100%;
          padding: 2rem;
          z-index: 2;
          background: rgba(30, 30, 30, 0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          box-shadow: inset 0 2px 5px rgba(255, 255, 255, 0.1);
        }
        
        .pkg-duration span {
          display: inline-block;
          background-color: var(--primary, #c6ff00);
          color: #121E2A;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        
        #packages .pkg-title {
          color: #FFFFFF;
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          margin-top: 0;
          line-height: 1.2;
        }
        
        .pkg-description {
          color: rgba(255, 255, 255, 0.75);
          font-size: 0.85rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }
        
        .pkg-view-btn {
          background: transparent;
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.4);
          padding: 0.6rem 1.5rem;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .pkg-view-btn:hover {
          background: var(--primary, #c6ff00);
          color: #121E2A;
          border-color: var(--primary, #c6ff00);
        }
        
        @media (max-width: 1024px) {
          .pkg-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .pkg-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <div className="pkg-container">
        {packageData.map((pkg) => (
          <div className="pkg-card" key={pkg.id}>
            <div className="pkg-image-container">
              <img src={pkg.image || undefined} alt={pkg.title} className="pkg-image" />
            </div>
            
            <div className="pkg-content-glass">
              <div className="pkg-duration">
                <span>{pkg.duration}</span>
              </div>
              <h3 className="pkg-title">{pkg.title}</h3>
              <p className="pkg-description">{pkg.description}</p>
              <button className="pkg-view-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Packages;
