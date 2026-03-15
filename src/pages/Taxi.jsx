import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import taxiHero from '../assets/taxi_hero_optimized.webp';
import carImg from '../assets/hero2.jpg'; // Placeholder for vehicle images
import suvImg from '../assets/hero3.jpg';
import vanImg from '../assets/hero4.jpg';

const CustomSelect = ({ label, name, value, options, onChange, placeholder, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-select-container" ref={dropdownRef}>
      <label className="custom-select-label">{label}</label>
      <div 
        className={`custom-select-header ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={!value ? 'placeholder' : ''}>
          {value || placeholder}
        </span>
        <svg className={`chevron ${isOpen ? 'rotate' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      
      {isOpen && (
        <div className="custom-select-dropdown animate-dropdown">
          {options.map((opt, i) => (
            <div 
              key={i} 
              className={`custom-select-option ${value === opt ? 'selected' : ''}`}
              onClick={() => {
                onChange({ target: { name, value: opt } });
                setIsOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Taxi = () => {
  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    date: '',
    time: '',
    pax: '',
    vehicleType: ''
  });

  // Safe helper to extract numbers and format as dollars, supporting ranges
  const formatToDollar = (priceStr) => {
    if (!priceStr) return "";
    
    // Support ranges by splitting on hyphens
    const parts = priceStr.toString().split('-');
    
    const formattedParts = parts.map(part => {
      const numStr = part.replace(/[^0-9.]/g, '');
      if (!numStr) return part.trim();
      return `$${Number(numStr).toLocaleString('en-US')}`;
    });
    
    return formattedParts.join(' - ');
  };

  const generateWhatsAppLink = (pkg = null) => {
    let msg = '';
    if (pkg) {
      msg += `Hello! I'm interested in booking the *${pkg.type === 'private' ? 'Private Transfer' : 'Shared Taxi'}* from *${pkg.pickup}* to *${pkg.dropoff}*.\n\n`;
    } else {
      msg += `Hello! I need a *custom taxi quote* from *${formData.pickup || '[Pickup]'}* to *${formData.dropoff || '[Dropoff]'}*.\n\n`;
    }
    
    msg += `*My Trip Details:*\n`;
    msg += `- Date: ${formData.date || 'TBD'}\n`;
    msg += `- Time: ${formData.time || 'TBD'}\n`;
    msg += `- Passengers: ${formData.pax || 'TBD'}\n`;
    if (formData.vehicleType) msg += `- Requested Vehicle: ${formData.vehicleType}\n`;
    
    if (pkg && pkg.price) {
      msg += `- Package Price: ${formatToDollar(pkg.price)}\n`;
      msg += `- Vehicle Type: ${pkg.vehicle_type}\n`;
    }

    return `https://wa.me/94742216579?text=${encodeURIComponent(msg)}`;
  };

  const generateEmailLink = (pkg = null) => {
    let subject = '';
    let body = '';
    
    if (pkg) {
      subject = `Taxi Booking: ${pkg.pickup} to ${pkg.dropoff}`;
      body += `Hello Dew Ceylon Tours,\n\nI'm interested in booking the ${pkg.type === 'private' ? 'Private Transfer' : 'Shared Taxi'} from ${pkg.pickup} to ${pkg.dropoff}.\n\n`;
    } else {
      subject = `Custom Taxi Quote Request`;
      body += `Hello Dew Ceylon Tours,\n\nI need a custom taxi quote from ${formData.pickup || '[Pickup]'} to ${formData.dropoff || '[Dropoff]'} .\n\n`;
    }
    
    body += `Trip Details:\n`;
    body += `- Date: ${formData.date || 'TBD'}\n`;
    body += `- Time: ${formData.time || 'TBD'}\n`;
    body += `- Passengers: ${formData.pax || 'TBD'}\n`;
    if (formData.vehicleType) body += `- Requested Vehicle: ${formData.vehicleType}\n`;
    
    if (pkg && pkg.price) {
      body += `- Package Price: ${formatToDollar(pkg.price)}\n`;
      body += `- Vehicle Type: ${pkg.vehicle_type}\n`;
    }
    
    body += `\nPlease let me know the availability and next steps.\n\nThank you!`;

    return `mailto:dewceylontours@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleEmailBooking = async (pkg = null) => {
    const subject = pkg ? `Taxi Booking: ${pkg.pickup} to ${pkg.dropoff}` : `Custom Taxi Quote Request`;
    let body = pkg ? `Hello Dew Ceylon Tours,\n\nI'm interested in booking the ${pkg.type === 'private' ? 'Private Transfer' : 'Shared Taxi'} from ${pkg.pickup} to ${pkg.dropoff}.\n\n` : `Hello Dew Ceylon Tours,\n\nI need a custom taxi quote from ${formData.pickup || '[Pickup]'} to ${formData.dropoff || '[Dropoff]'} .\n\n`;
    
    body += `Trip Details:\n`;
    body += `- Date: ${formData.date || 'TBD'}\n`;
    body += `- Time: ${formData.time || 'TBD'}\n`;
    body += `- Passengers: ${formData.pax || 'TBD'}\n`;
    if (formData.vehicleType) body += `- Requested Vehicle: ${formData.vehicleType}\n`;
    
    if (pkg && pkg.price) {
      body += `- Package Price: ${formatToDollar(pkg.price)}\n`;
      body += `- Vehicle Type: ${pkg.vehicle_type}\n`;
    }
    
    body += `\nPlease let me know the availability and next steps.\n\nThank you!`;

    try {
      const response = await fetch('http://localhost:5000/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, body })
      });

      if (response.ok) {
        alert("Booking request sent via Email successfully!");
      } else {
        alert("Failed to send email. Please try WhatsApp or try again later.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const [foundPackages, setFoundPackages] = useState([]);
  const [locations, setLocations] = useState([]);
  const [capacities, setCapacities] = useState([]);
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [fleet, setFleet] = useState([]);

  useEffect(() => {
    fetchLocations();
    fetchCapacities();
    fetchFleet();
  }, []);

  const fetchFleet = async () => {
    try {
      const resp = await fetch('http://localhost:5000/api/fleet');
      const data = await resp.json();
      setFleet(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (formData.pax) {
      fetchVehiclesForCapacity(formData.pax);
    } else {
      setAvailableVehicles([]);
    }
  }, [formData.pax]);

  const fetchLocations = async () => {
    try {
      const resp = await fetch('http://localhost:5000/api/taxi-packages/locations');
      const data = await resp.json();
      setLocations(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCapacities = async () => {
    try {
      const resp = await fetch('http://localhost:5000/api/taxi-packages/capacities');
      const data = await resp.json();
      setCapacities(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchVehiclesForCapacity = async (pax) => {
    try {
      const resp = await fetch(`http://localhost:5000/api/taxi-packages/vehicles-by-capacity?pax=${encodeURIComponent(pax)}`);
      const data = await resp.json();
      setAvailableVehicles(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearched(true);
    searchPackages();
  };

  const searchPackages = async () => {
    setSearching(true);
    try {
      const resp = await fetch(`http://localhost:5000/api/taxi-packages/search?pickup=${formData.pickup}&dropoff=${formData.dropoff}`);
      const data = await resp.json();
      setFoundPackages(data);
      if (data.length > 0) {
        setTimeout(() => {
          document.getElementById('found-packages-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="taxi-page">
      <style>{`
        .taxi-page {
          width: 100%;
          overflow-x: hidden;
          background-color: #F8F9FA;
        }

        /* Hero Section - Simple and Clean */
        .taxi-hero {
          position: relative;
          height: 70vh; /* Increased height */
          width: 100%;
          display: flex;
          align-items: flex-start; /* Move to top */
          justify-content: center;
          text-align: center;
          color: white;
          padding-top: 180px; /* Push down but keep higher than center */
        }

        .taxi-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${taxiHero});
          background-size: cover;
          background-position: center;
          z-index: 1;
        }

        .taxi-hero-content {
          position: relative;
          z-index: 2;
          max-width: 900px;
        }

        .taxi-hero h1 {
          font-size: 5rem;
          font-weight: 900;
          text-transform: uppercase;
          margin-bottom: 1rem;
          letter-spacing: -2px;
          color: #FFFFFF; /* Pure white */
          text-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }

        .taxi-hero p {
          font-size: 1.5rem;
          opacity: 1; /* Full opacity */
          font-weight: 600;
          color: #FFFFFF;
          text-shadow: 0 4px 15px rgba(0,0,0,0.5);
        }

        /* Booking Section - Overlapping the Hero */
        .booking-section {
          position: relative;
          z-index: 10;
          margin-top: -120px; /* Overlap effect */
          padding: 0 4rem;
          max-width: 1300px;
          margin-left: auto;
          margin-right: auto;
        }

        .booking-card {
          background: #FFFFFF;
          padding: 3rem;
          border-radius: 30px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.15);
          color: #121E2A;
          animation: fade-in-up 0.8s ease-out;
        }

        .booking-card h2 {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 2rem;
          text-transform: uppercase;
          text-align: center;
          color: #121E2A;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .form-group label {
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #121E2A;
          opacity: 0.6;
        }

        .form-group input, .form-group select {
          padding: 1.1rem;
          border-radius: 12px;
          border: 2px solid #EEE;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s;
          background: #FAFAFA;
        }

        .form-group input:focus {
          border-color: #b9ff00;
          background: white;
          box-shadow: 0 5px 15px rgba(185, 255, 0, 0.1);
        }

        /* Custom Select Styling */
        .custom-select-container {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .custom-select-label {
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #121E2A;
          opacity: 0.6;
        }

        .custom-select-header {
          padding: 1.1rem;
          border-radius: 12px;
          border: 2px solid #EEE;
          background: #FAFAFA;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          transition: all 0.3s;
          user-select: none;
        }

        .custom-select-header:hover {
          border-color: #DDD;
          background: #F5F5F5;
        }

        .custom-select-header.open {
          border-color: #b9ff00;
          background: white;
          box-shadow: 0 5px 15px rgba(185, 255, 0, 0.1);
        }

        .custom-select-header .placeholder {
          color: #999;
        }

        .chevron {
          transition: transform 0.3s;
          opacity: 0.4;
        }

        .chevron.rotate {
          transform: rotate(180deg);
        }

        .custom-select-dropdown {
          position: absolute;
          top: 110%;
          left: 0;
          right: 0;
          background: #FFFFFF;
          border-radius: 15px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
          border: 1px solid #EEE;
          z-index: 1000;
          max-height: 250px;
          overflow-y: auto;
          padding: 0.5rem;
        }

        .custom-select-option {
          padding: 1rem 1.2rem;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
          color: #444;
        }

        .custom-select-option:hover {
          background: #f8ffeb;
          color: #121E2A;
        }

        .custom-select-option.selected {
          background: #121E2A;
          color: #b9ff00;
        }

        .animate-dropdown {
          animation: slide-down 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .submit-btn {
          margin-top: 1rem;
          background: #121E2A;
          color: #b9ff00;
          padding: 1.2rem;
          border-radius: 15px;
          font-weight: 900;
          font-size: 1rem;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
        }

        .submit-btn:hover {
          background: #b9ff00;
          color: #121E2A;
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(185, 255, 0, 0.3);
        }

        /* Vehicle Showcase */
        .vehicle-showcase {
          padding: 8rem 4rem;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
        }

        .watermark-bg {
          position: absolute;
          top: 2rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 14vw;
          font-weight: 950;
          color: rgba(18, 30, 42, 0.03); /* Faint dark watermark */
          z-index: 0;
          line-height: 1;
          pointer-events: none;
          white-space: nowrap;
          user-select: none;
        }

        .section-header {
          text-align: center;
          margin-bottom: 5rem;
          position: relative;
          z-index: 1;
        }

        .section-header h2 {
          font-size: 3.5rem;
          font-weight: 900;
          color: #121E2A;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .section-header p {
          color: #666;
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .vehicle-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
          position: relative;
          z-index: 1;
        }

        .vehicle-card {
          background: white;
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          border: 1px solid #EEE;
          display: flex;
          flex-direction: column;
        }

        .vehicle-card:hover {
          transform: translateY(-15px);
          box-shadow: 0 30px 60px rgba(185, 255, 0, 0.15);
          border-color: #b9ff00;
        }

        .vehicle-img-wrapper {
          height: 250px;
          overflow: hidden;
          position: relative;
        }

        .vehicle-img-wrapper::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 40%;
          background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
          z-index: 1;
        }

        .vehicle-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .vehicle-card:hover .vehicle-img-wrapper img {
          transform: scale(1.1);
        }

        .vehicle-info {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .vehicle-info h3 {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
          color: #121E2A;
          letter-spacing: -1px;
        }

        .vehicle-specs {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          margin-top: auto;
          background: #FAFAFA;
          padding: 1.5rem;
          border-radius: 20px;
          border: 1px solid #EEE;
        }

        .spec {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.95rem;
          font-weight: 700;
          color: #666;
        }

        .spec-label {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .spec-value {
          color: #121E2A;
          font-weight: 900;
          font-size: 1.1rem;
        }
        
        .spec-price {
          color: #b9ff00;
          background: #121E2A;
          padding: 0.4rem 1rem;
          border-radius: 12px;
          font-size: 1.2rem;
        }

        .vehicle-info p {
          color: #888;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        /* Found Packages Styling */
        .found-packages-section {
          padding: 6rem 4rem;
          background: #FFFFFF;
          max-width: 1400px;
          margin: 0 auto;
        }

        .package-result-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 3rem;
          margin-top: 3rem;
        }

        .package-card-premium {
          background: #FAFAFA;
          border-radius: 40px;
          padding: 3.5rem;
          border: 1px solid #EEE;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .package-card-premium:hover {
          transform: translateY(-10px);
          box-shadow: 0 40px 80px rgba(0,0,0,0.08);
          border-color: #b9ff00;
        }

        .package-type-tag {
          position: absolute;
          top: 0;
          right: 0;
          padding: 1rem 2rem;
          background: #121E2A;
          color: #b9ff00;
          font-weight: 900;
          font-size: 0.7rem;
          text-transform: uppercase;
          border-bottom-left-radius: 25px;
          letter-spacing: 1px;
        }

        .package-card-premium.shared .package-type-tag {
          background: #b9ff00;
          color: #121E2A;
        }

        .package-title-row {
          margin-bottom: 2rem;
        }

        .package-title-row h3 {
          font-size: 2.2rem;
          font-weight: 900;
          color: #121E2A;
          letter-spacing: -1px;
          margin-bottom: 0.5rem;
        }

        .package-price-tag {
          font-size: 1.8rem;
          font-weight: 950;
          color: #121E2A;
          display: block;
          margin-bottom: 2rem;
        }

        .package-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
          margin-bottom: 3rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: #444;
        }

        .feature-item svg {
          color: #b9ff00;
          background: #121E2A;
          padding: 5px;
          border-radius: 8px;
          width: 24px;
          height: 24px;
        }

        .terms-box {
          background: rgba(0,0,0,0.03);
          border-radius: 20px;
          padding: 2rem;
          margin-top: auto;
        }

        .terms-box h4 {
          font-size: 0.8rem;
          font-weight: 900;
          text-transform: uppercase;
          margin-bottom: 1rem;
          color: #121E2A;
          opacity: 0.5;
        }

        .terms-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .terms-list li {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .terms-list li::before {
          content: '•';
          color: #b9ff00;
          font-weight: 900;
        }

        .no-results {
          text-align: center;
          padding: 4rem;
          background: rgba(0,0,0,0.02);
          border-radius: 30px;
          margin-top: 3rem;
        }

        .booking-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: auto;
        }

        @media (max-width: 768px) {
          .booking-actions {
            grid-template-columns: 1fr;
          }
        }

        .taxi-book-btn {
          width: 100%;
          padding: 1.2rem;
          border-radius: 20px;
          font-weight: 800;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .taxi-book-btn.whatsapp {
          background: #121E2A;
          color: #b9ff00;
        }

        .taxi-book-btn.email {
          background: #FAFAFA;
          color: #121E2A;
          border: 1px solid #EEE;
        }

        .taxi-book-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .taxi-book-btn.whatsapp:hover {
          background: #b9ff00;
          color: #121E2A;
        }

        .taxi-book-btn.email:hover {
          background: #FFFFFF;
          border-color: #b9ff00;
          color: #121E2A;
        }

        .no-results h3 { font-size: 1.8rem; font-weight: 900; margin-bottom: 1rem; }
        .no-results p { color: #666; }



        /* Animations */
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          .taxi-hero h1 { font-size: 3rem; }
          .vehicle-grid { grid-template-columns: 1fr; }
          .booking-section { padding: 0 2rem; margin-top: -80px; }
          .booking-card { padding: 2rem; }
        }

        @media (max-width: 768px) {
          .taxi-hero { height: 50vh; }
          .form-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero Section */}
      <section className="taxi-hero">
        <div className="taxi-hero-content animate-fade-in-up">
          <h1>Explore in Comfort</h1>
          <p>The Most Reliable Taxi & Transfer Service in Sri Lanka</p>
        </div>
      </section>

      {/* Overlapping Booking Section */}
      <section className="booking-section">
        <div className="booking-card">
          <h2>Quick Booking Request</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <CustomSelect 
                label="Pick-up Point" 
                name="pickup" 
                value={formData.pickup} 
                options={locations} 
                onChange={handleChange} 
                placeholder="Select Pickup Location" 
              />
              <CustomSelect 
                label="Drop-off Point" 
                name="dropoff" 
                value={formData.dropoff} 
                options={locations} 
                onChange={handleChange} 
                placeholder="Select Drop-off Location" 
              />
            </div>

            <div className="form-grid" style={{marginTop: '1.5rem'}}>
              <div className="form-group">
                <label>Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input type="time" name="time" value={formData.time} onChange={handleChange} required />
              </div>
              <CustomSelect 
                label="Capacity / Pax" 
                name="pax" 
                value={formData.pax} 
                options={capacities} 
                onChange={(e) => setFormData({ ...formData, pax: e.target.value, vehicleType: '' })} 
                placeholder="Select Capacity" 
              />
              <CustomSelect 
                label="Vehicle Type" 
                name="vehicleType" 
                value={formData.vehicleType} 
                options={availableVehicles} 
                onChange={handleChange} 
                placeholder={formData.pax ? "Select Vehicle" : "First select capacity"} 
              />
            </div>
            <button type="submit" className="submit-btn" disabled={searching}>
              {searching ? 'Finding Best Options...' : 'Check Availability'}
              {!searching && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Dynamic Results Section */}
      {searched && (
        <section id="found-packages-section" className="found-packages-section animate-fade-in-up">
          <div className="section-header">
            <h2>Available Transfers</h2>
            <p>From {formData.pickup} to {formData.dropoff}</p>
          </div>

          {foundPackages.length > 0 ? (
            <div className="package-result-grid">
              {foundPackages.map((pkg) => (
                <div key={pkg.id} className={`package-card-premium ${pkg.type}`}>
                  <div className="package-type-tag">{pkg.type === 'private' ? 'Private Transfer' : 'Shared Taxi'}</div>
                  
                  <div className="package-title-row">
                    <h3>{pkg.pickup} → {pkg.dropoff}</h3>
                    <span style={{color: '#121E2A', opacity: 0.5, fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem'}}>{pkg.vehicle_type}</span>
                  </div>

                  <span className="package-price-tag">{formatToDollar(pkg.price)} {pkg.type === 'shared' && <span style={{fontSize: '1rem', opacity: 0.6}}>per person</span>}</span>

                  <div className="package-features">
                    {(typeof pkg.inclusions === 'string' ? JSON.parse(pkg.inclusions || '[]') : pkg.inclusions).map((inc, i) => (
                      <div key={i} className="feature-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        {inc}
                      </div>
                    ))}
                  </div>

                  <div className="terms-box">
                    <h4>Important Terms</h4>
                    <ul className="terms-list">
                      {(typeof pkg.terms === 'string' ? JSON.parse(pkg.terms || '[]') : pkg.terms).map((term, i) => (
                        <li key={i}>{term}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="booking-actions">
                    <button className="taxi-book-btn whatsapp" onClick={() => window.open(generateWhatsAppLink(pkg), '_blank')}>
                      WhatsApp
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.6 8.38 8.38 0 0 1 3.8.9L22 2l-1.5 5.5Z"></path></svg>
                    </button>
                    <button className="taxi-book-btn email" onClick={() => handleEmailBooking(pkg)}>
                      Email
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No Fixed Packages Found</h3>
              <p>We don't have a fixed price package for this specific route right now, but we can still arrange it for you! Contact us for a custom quote.</p>
              <div className="booking-actions" style={{maxWidth: '500px', margin: '2rem auto 0'}}>
                <button className="taxi-book-btn whatsapp" onClick={() => window.open(generateWhatsAppLink(null), '_blank')}>
                  WhatsApp Quote
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.6 8.38 8.38 0 0 1 3.8.9L22 2l-1.5 5.5Z"></path></svg>
                </button>
                <button className="taxi-book-btn email" onClick={() => handleEmailBooking(null)}>
                  Email Quote
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Vehicle Showcase */}
      <section className="vehicle-showcase">
        <div className="watermark-bg">TAXI</div>
        <div className="section-header">
          <h2>Our Premium Fleet</h2>
          <p>Choose the perfect ride for your journey. All our vehicles are well-maintained, air-conditioned and driven by professionals.</p>
        </div>

        <div className="vehicle-grid">
          {fleet.map((v, i) => (
            <div key={v.id || i} className="vehicle-card animate-fade-in-up" style={{ animationDelay: `${i * 0.2}s` }}>
              <div className="vehicle-img-wrapper">
                <img src={v.image} alt={v.vehicle_type} />
              </div>
              <div className="vehicle-info">
                <h3>{v.vehicle_type}</h3>
                <div className="vehicle-specs">
                  <div className="spec">
                    <div className="spec-label">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b9ff00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                      Max Capacity
                    </div>
                    <div className="spec-value">{v.max_person}</div>
                  </div>
                  <div className="spec">
                    <div className="spec-label">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b9ff00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                       Rate per KM
                    </div>
                    <div className="spec-value spec-price">{formatToDollar(v.per_km)}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Taxi;
