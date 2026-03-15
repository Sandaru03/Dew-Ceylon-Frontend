import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Footer from '../components/Footer';

// Assets
import heroBg from '../assets/hero.jpg';
import img1 from '../assets/hero2.jpg';
import img2 from '../assets/hero4.jpg';

const MOCK_DATA = {
  "1": {
    id: 1,
    title: 'Safari Dreams',
    category: 'Safari',
    duration: '3 Days / 2 Nights',
    price: '$450',
    originalPrice: '$600',
    rating: 4.8,
    bookings: '150+',
    type: 'Luxury Wildlife',
    locations: ['Yala', 'Tissamaharama', 'Bundala'],
    image: heroBg,
    gallery: [heroBg, img1, img2],
    description: 'Experience the wild heart of Sri Lanka in a luxurious safari adventure through Yala National Park. This journey is designed for those who seek the thrill of the wild without compromising on comfort.',
    itinerary: [
      { day: 1, title: 'Arrival & Evening Safari', desc: 'Transfer to your luxury campsite. Enjoy an evening game drive in Yala Block 1.' },
      { day: 2, title: 'Deep Jungle Exploration', desc: 'Full-day safari experience searching for the elusive Sri Lankan Leopard.' },
      { day: 3, title: 'Morning Birding & Departure', desc: 'A calm morning bird watching session followed by brunch and departure.' }
    ],
    inclusions: ['Luxury Tent Stay', 'All Game Drives', 'Expert Naturalist Guide', 'All Meals & Drinks', 'Park Entrance Fees'],
    exclusions: ['International Flights', 'Travel Insurance', 'Personal Gratuities'],
    whyTravelersLoveThis: [
      'Verified luxury campsites ensuring unique experiences',
      'High leopard spotting success rates with expert guides',
      'Sustainable and ethical wildlife viewing practices'
    ]
  },
  "2": {
    id: 2,
    title: 'Misty Mountains',
    category: 'Hiking',
    duration: '4 Days / 3 Nights',
    price: '$580',
    originalPrice: '$750',
    rating: 4.9,
    bookings: '80+',
    type: 'Adventure',
    locations: ['Ella', 'Nuwara Eliya', 'Horton Plains'],
    image: img1,
    gallery: [img1, img2, heroBg],
    description: 'Trek through the clouds in the central highlands and discover hidden waterfalls and colonial era tea estates.',
    itinerary: [
      { day: 1, title: 'Ella Arrival', desc: 'Scenic train ride from Kandy to Ella. Check into your boutique mountain villa.' },
      { day: 2, title: 'Little Adams Peak & Nine Arches', desc: 'Hike to the summit for sunrise, followed by a visit to the iconic train bridge.' },
      { day: 3, title: 'Horton Plains & Worlds End', desc: 'Early morning trek to the most dramatic cliff drop in Sri Lanka.' },
      { day: 4, title: 'Waterfall Trail & Departure', desc: 'Visit Diyaluma Falls before heading back to Colombo.' }
    ],
    inclusions: ['Boutique Accommodation', 'Private Trekking Guide', 'Train Tickets', 'Daily Breakfast', 'All Transfers'],
    exclusions: ['Lunches & Dinners', 'Trekking Gear', 'Tips'],
    whyTravelersLoveThis: [
      'Breath-taking views from Sri Lanka\'s highest peaks',
      'Authentic local villa stays with home-cooked meals',
      'Iconic Nine Arches bridge sunset experience'
    ]
  }
};

const PackageOverviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPackage = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/packages/${id}`);
        const data = await response.json();
        
        // Ensure JSON fields are parsed correctly if they come back as strings
        const parsedPkg = {
          ...data,
          gallery: typeof data.gallery === 'string' ? JSON.parse(data.gallery) : data.gallery || [],
          locations: typeof data.locations === 'string' ? JSON.parse(data.locations) : data.locations || [],
          inclusions: typeof data.inclusions === 'string' ? JSON.parse(data.inclusions) : data.inclusions || [],
          exclusions: typeof data.exclusions === 'string' ? JSON.parse(data.exclusions) : data.exclusions || [],
          highlights: typeof data.highlights === 'string' ? JSON.parse(data.highlights) : data.highlights || [],
          itinerary: typeof data.itinerary === 'string' ? JSON.parse(data.itinerary) : data.itinerary || []
        };
        
        setPkg(parsedPkg);
      } catch (err) {
        console.error("Failed to fetch package:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
    setActiveImage(0);
  }, [id]);

  if (loading) return <div style={{background: '#0F0F0F', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><h2>Loading Journey...</h2></div>;
  if (!pkg) return <div style={{background: '#0F0F0F', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><h2>Journey not found</h2></div>;

  return (
    <div className="package-detail-page">
      
      <style>{`
        .package-detail-page {
          background-color: #0F0F0F;
          color: white;
          min-height: 100vh;
        }

        .header-spacer { height: 120px; }

        .top-hero-section {
          padding: 0 4rem;
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        /* Left Column: Image Gallery */
        .image-gallery-container {
          position: relative;
        }

        .main-image-wrapper {
          width: 100%;
          height: 500px;
          border-radius: 30px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .main-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .best-seller-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(255, 255, 255, 0.9);
          color: #0F0F0F;
          padding: 0.5rem 1rem;
          border-radius: 30px;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          z-index: 2;
        }

        .thumbnails-row {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .thumb-box {
          width: 100px;
          height: 70px;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          opacity: 0.5;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .thumb-box.active {
          opacity: 1;
          border-color: var(--primary, #c6ff00);
        }

        .thumb-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Right Column: Info & CTAs */
        .info-col {
          padding-top: 0;
        }

        .location-tags {
          display: flex;
          gap: 0.8rem;
          margin-bottom: 1.2rem;
          flex-wrap: wrap;
        }

        .loc-tag {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.4rem 0.8rem;
          background: rgba(198, 255, 0, 0.1);
          color: var(--primary, #c6ff00);
          border-radius: 10px;
          text-transform: uppercase;
        }

        .pkg-title-big {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 1rem;
        }

        .stats-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
          font-size: 0.9rem;
          opacity: 0.8;
        }

        .stat-rating { color: #FFC107; font-weight: 800; }

        .price-section-new {
          margin-bottom: 2rem;
        }

        .starting-text {
          font-size: 0.8rem;
          opacity: 0.5;
          margin-bottom: 0.3rem;
        }

        .price-row-flex {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .big-price {
          font-size: 3rem;
          font-weight: 900;
          color: var(--primary, #c6ff00);
        }

        .available-now {
          background: rgba(0, 255, 136, 0.1);
          color: #00FF88;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .spec-boxes {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        .spec-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 1.2rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .spec-label { font-size: 0.7rem; opacity: 0.5; text-transform: uppercase; margin-bottom: 0.2rem; }
        .spec-val { font-weight: 700; font-size: 0.9rem; }

        .cta-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .book-btn-link {
          background: #b9ff00;
          color: #0F0F0F;
          padding: 1.5rem;
          border-radius: 20px;
          font-weight: 800;
          text-align: center;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 1.1rem;
        }

        .book-btn-link:hover {
          background: #c6ff00;
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(185, 255, 0, 0.2);
        }

        .ask-btn-outline {
          background: white;
          color: black;
          padding: 1.2rem;
          border-radius: 15px;
          font-weight: 700;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ask-btn-outline:hover {
          background: rgba(255,255,255,0.9);
        }

        .cancellation-note {
          font-size: 0.8rem;
          text-align: center;
          margin-top: 1.5rem;
          opacity: 0.6;
        }

        /* Bottom Section: Tabs & Detailed Info */
        .bottom-details-section {
          padding: 4rem 4rem 8rem 4rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .detail-tabs {
          display: flex;
          gap: 4rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          margin-bottom: 4rem;
        }

        .tab-nav-item {
          padding-bottom: 1.5rem;
          font-weight: 800;
          text-transform: uppercase;
          font-size: 1rem;
          cursor: pointer;
          opacity: 0.3;
          position: relative;
        }

        .tab-nav-item.active {
          opacity: 1;
        }

        .tab-nav-item.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--primary, #c6ff00);
        }

        .about-section {
          max-width: 800px;
        }

        .section-title-sm {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
        }

        .desc-p-alt {
          font-size: 1.1rem;
          line-height: 1.8;
          opacity: 0.7;
          margin-bottom: 3rem;
        }

        .covered-cities-box {
          margin-bottom: 4rem;
        }

        .city-tag-alt {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 10px;
          margin-right: 1rem;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .love-box {
          background: rgba(198, 255, 0, 0.03);
          border: 1px solid rgba(198, 255, 0, 0.1);
          padding: 3rem;
          border-radius: 25px;
          position: relative;
        }

        .love-box-title {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: var(--primary, #c6ff00);
          font-weight: 800;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          font-size: 0.9rem;
        }

        .love-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .love-list li {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          font-size: 1.05rem;
          opacity: 0.8;
          line-height: 1.4;
        }

        .love-list li::before {
          content: '•';
          color: var(--primary, #c6ff00);
          font-weight: bold;
          font-size: 1.5rem;
          line-height: 1;
        }

        /* Mobile */
        @media (max-width: 1024px) {
          .top-hero-section { grid-template-columns: 1fr; padding: 0 2rem; }
          .bottom-details-section { padding: 4rem 2rem; }
          .main-image-wrapper { height: 400px; }
          .pkg-title-big { font-size: 2.5rem; }
          .detail-tabs { gap: 2rem; font-size: 0.8rem; overflow-x: auto; }
        }
      `}</style>

      <div className="header-spacer"></div>

      <section className="top-hero-section">
        <div className="image-gallery-col animate-fade-in-left">
          <div className="main-image-wrapper">
            <span className="best-seller-badge">Best Seller</span>
            <img src={pkg.gallery[activeImage]} alt={pkg.title} />
          </div>
          <div className="thumbnails-row">
            {pkg.gallery.map((img, idx) => (
              <div 
                key={idx} 
                className={`thumb-box ${activeImage === idx ? 'active' : ''}`}
                onClick={() => setActiveImage(idx)}
              >
                <img src={img} alt={`Thumb ${idx}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="info-col animate-fade-in-right">
          <div className="location-tags">
            {pkg.locations.map(loc => (
              <span className="loc-tag" key={loc}>{loc}</span>
            ))}
            <button style={{background:'none',border:'none',color:'white',marginLeft:'auto',cursor:'pointer'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            </button>
          </div>

          <h1 className="pkg-title-big">{pkg.title}</h1>
          
          <div className="stats-row">
            <span className="stat-rating">★ {pkg.rating}</span>
            <span>|</span>
            <span>{pkg.bookings} Bookings</span>
          </div>

          <div className="price-section-new">
            <p className="starting-text">Starting price per person</p>
            <div className="price-row-flex">
              <span className="big-price">${String(pkg.price).replace(/^\$/, '')}</span>
              <span className="available-now">Available Now</span>
            </div>
          </div>

          <div className="spec-boxes">
            <div className="spec-box">
              <span style={{fontSize:'1.5rem'}}>⏱</span>
              <div>
                <p className="spec-label">Duration</p>
                <p className="spec-val">{pkg.duration}</p>
              </div>
            </div>
            <div className="spec-box">
              <span style={{fontSize:'1.5rem'}}>✈️</span>
              <div>
                <p className="spec-label">Type</p>
                <p className="spec-val">{pkg.type}</p>
              </div>
            </div>
          </div>

          <div className="cta-group">
            <button className="book-btn-link">
              Book Now <span>→</span>
            </button>
            <button className="ask-btn-outline">Ask a Question</button>
          </div>

          <p className="cancellation-note">
            ✓ Free cancellation up to 48 hours before trip
          </p>
        </div>
      </section>

      <section className="bottom-details-section">
        <nav className="detail-tabs">
          {['overview', 'itinerary', 'inclusions', 'reviews'].map(tab => (
            <div 
              key={tab}
              className={`tab-nav-item ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >{tab}</div>
          ))}
        </nav>

        <div className="tab-content-area animate-fade-in">
          {activeTab === 'overview' && (
            <div className="about-section">
              <h2 className="section-title-sm">About this Package</h2>
              <p className="desc-p-alt">{pkg.description}</p>
              
              <div className="covered-cities-box">
                <p style={{fontWeight:'700', fontSize:'0.9rem', marginBottom:'1.2rem', opacity:0.8}}>Covered Cities</p>
                {pkg.locations.map(city => (
                  <span className="city-tag-alt" key={city}>{city}</span>
                ))}
              </div>

              <div className="love-box">
                <div className="love-box-title">
                  <span style={{fontSize:'1.2rem'}}>ℹ️</span> Why travelers love this
                </div>
                <ul className="love-list">
                  {pkg.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'itinerary' && (
            <div style={{maxWidth:'800px'}}>
              <h2 className="section-title-sm">Journey Roadmap</h2>
              {pkg.itinerary.map(day => (
                <div key={day.day} style={{display:'flex', gap:'2rem', marginBottom:'3rem', background:'rgba(255,255,255,0.02)', padding:'2rem', borderRadius:'20px'}}>
                  <div style={{minWidth:'60px', height:'60px', borderRadius:'15px', background:'var(--primary)', color:'black', display:'flex', alignItems:'center',justifyContent:'center', fontWeight:900}}>0{day.day}</div>
                  <div>
                    <h4 style={{fontSize:'1.2rem', marginBottom:'0.5rem'}}>{day.title}</h4>
                    <p style={{opacity:0.6, lineHeight:1.6}}>{day.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'inclusions' && (
            <div style={{maxWidth:'800px'}}>
              <h2 className="section-title-sm">What's Included</h2>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem'}}>
                <div>
                  <h4 style={{color:'var(--primary)', marginBottom:'1.5rem', textTransform:'uppercase', fontSize:'0.8rem', letterSpacing:'1px'}}>Inclusions</h4>
                  <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:'1rem', opacity:0.8}}>
                    {pkg.inclusions.map((item, i) => <li key={i}>✓ {item}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 style={{color:'#ff4b4b', marginBottom:'1.5rem', textTransform:'uppercase', fontSize:'0.8rem', letterSpacing:'1px'}}>Exclusions</h4>
                  <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:'1rem', opacity:0.6}}>
                    {pkg.exclusions.map((item, i) => <li key={i}>✕ {item}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div style={{textAlign:'center', padding:'4rem 0', opacity:0.5}}>
              <h3>No reviews yet for this journey.</h3>
              <p>Be the first to share your experience after your trip!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PackageOverviewPage;
