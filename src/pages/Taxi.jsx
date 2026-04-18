import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import taxiHero from '../assets/taxi_hero_optimized.webp';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const CustomSelect = ({ label, name, value, options, onChange, placeholder }) => {
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
    <div className="glass-select-container" ref={dropdownRef}>
      <label className="glass-select-label">{label}</label>
      <div
        className={`glass-select-header ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={!value ? 'placeholder' : 'selected-val'}>
          {value || placeholder}
        </span>
        <svg className={`chevron ${isOpen ? 'rotate' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {isOpen && (
        <div className="glass-select-dropdown animate-dropdown">
          {options.map((opt, i) => (
            <div
              key={i}
              className={`glass-select-option ${value === opt ? 'selected' : ''}`}
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
    vehicleType: '',
    mobile: ''
  });

  const formatToDollar = (priceStr) => {
    if (!priceStr) return "";
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
    if (formData.mobile) msg += `- Contact Mobile: ${formData.mobile}\n`;
    if (formData.vehicleType) msg += `- Requested Vehicle: ${formData.vehicleType}\n`;
    if (pkg && pkg.price) {
      msg += `- Package Price: ${formatToDollar(pkg.price)}\n`;
      msg += `- Vehicle Type: ${pkg.vehicle_type}\n`;
    }
    return `https://wa.me/94742216579?text=${encodeURIComponent(msg)}`;
  };

  const handleEmailBooking = async (pkg = null) => {
    const subject = pkg ? `Taxi Booking: ${pkg.pickup} to ${pkg.dropoff}` : `Custom Taxi Quote Request`;
    let body = pkg
      ? `Hello Dew Ceylon Tours,\n\nI'm interested in booking the ${pkg.type === 'private' ? 'Private Transfer' : 'Shared Taxi'} from ${pkg.pickup} to ${pkg.dropoff}.\n\n`
      : `Hello Dew Ceylon Tours,\n\nI need a custom taxi quote from ${formData.pickup || '[Pickup]'} to ${formData.dropoff || '[Dropoff]'}.\n\n`;

    body += `Trip Details:\n- Date: ${formData.date || 'TBD'}\n- Time: ${formData.time || 'TBD'}\n- Passengers: ${formData.pax || 'TBD'}\n`;
    if (formData.mobile) body += `- Contact Mobile: ${formData.mobile}\n`;
    if (formData.vehicleType) body += `- Requested Vehicle: ${formData.vehicleType}\n`;
    if (pkg && pkg.price) {
      body += `- Package Price: ${formatToDollar(pkg.price)}\n- Vehicle Type: ${pkg.vehicle_type}\n`;
    }
    body += `\nPlease let me know the availability and next steps.\n\nThank you!`;

    try {
      const response = await fetch(API_BASE_URL + '/api/email/send', {
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
      const resp = await fetch(API_BASE_URL + '/api/fleet');
      const data = await resp.json();
      setFleet(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    if (formData.pax) fetchVehiclesForCapacity(formData.pax);
    else setAvailableVehicles([]);
  }, [formData.pax]);

  const fetchLocations = async () => {
    try {
      const resp = await fetch(API_BASE_URL + '/api/taxi-packages/locations');
      setLocations(await resp.json());
    } catch (err) { console.error(err); }
  };

  const fetchCapacities = async () => {
    try {
      const resp = await fetch(API_BASE_URL + '/api/taxi-packages/capacities');
      setCapacities(await resp.json());
    } catch (err) { console.error(err); }
  };

  const fetchVehiclesForCapacity = async (pax) => {
    try {
      const resp = await fetch(API_BASE_URL + `/api/taxi-packages/vehicles-by-capacity?pax=${encodeURIComponent(pax)}`);
      setAvailableVehicles(await resp.json());
    } catch (err) { console.error(err); }
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
      const resp = await fetch(API_BASE_URL + `/api/taxi-packages/search?pickup=${formData.pickup}&dropoff=${formData.dropoff}`);
      const data = await resp.json();
      setFoundPackages(data);
      if (data.length > 0) {
        setTimeout(() => {
          document.getElementById('found-packages-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    } catch (err) { console.error(err); }
    finally { setSearching(false); }
  };

  return (
    <div className="taxi-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        :root {
          --accent: #c6ff00;
          --accent-dim: rgba(198, 255, 0, 0.15);
          --glass-bg: rgba(255, 255, 255, 0.04);
          --glass-border: rgba(255, 255, 255, 0.09);
          --dark: #080c10;
          --dark-2: #0d1318;
          --dark-3: #12181f;
          --text-muted: rgba(255,255,255,0.45);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .taxi-page {
          background: var(--dark);
          color: white;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* â”€â”€ HERO â”€â”€ */
        .taxi-hero {
          position: relative;
          height: 100vh;
          min-height: 700px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }

        .taxi-hero-bg {
          position: absolute;
          inset: 0;
          background: url(${taxiHero}) center/cover no-repeat;
          transform: scale(1.05);
          filter: brightness(0.35);
          animation: hero-zoom 20s ease-in-out infinite alternate;
        }

        @keyframes hero-zoom {
          from { transform: scale(1.0); }
          to   { transform: scale(1.08); }
        }

        .hero-noise-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            rgba(198,255,0,0.06) 0%,
            transparent 40%,
            rgba(0,0,0,0.5) 100%
          );
          z-index: 1;
        }

        .taxi-hero-content {
          position: relative;
          z-index: 2;
          max-width: 860px;
          padding: 0 2rem;
        }

        .taxi-hero h1 {
          font-size: clamp(3rem, 7vw, 6.5rem);
          font-weight: 950;
          letter-spacing: -3px;
          line-height: 1;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .taxi-hero h1 span {
          background: linear-gradient(135deg, var(--accent), #a2d200);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .taxi-hero-sub {
          font-size: 1.15rem;
          color: var(--text-muted);
          font-weight: 500;
          max-width: 500px;
          margin: 0 auto 3rem;
          line-height: 1.6;
        }

        .hero-stats {
          display: flex;
          gap: 3rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero-stat {
          text-align: center;
        }

        .hero-stat-num {
          font-size: 2rem;
          font-weight: 950;
          color: var(--accent);
          letter-spacing: -1px;
        }

        .hero-stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-top: 0.25rem;
        }

        .hero-scroll-hint {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-muted);
          font-size: 0.75rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          animation: float-hint 2s ease-in-out infinite;
        }

        @keyframes float-hint {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }

        /* â”€â”€ BOOKING SECTION â”€â”€ */
        .booking-outer {
          padding: 6rem 2rem;
          max-width: 1300px;
          margin: 0 auto;
        }

        .booking-section-label {
          text-align: center;
          margin-bottom: 3rem;
        }

        .booking-section-label h2 {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 900;
          letter-spacing: -2px;
          margin-bottom: 0.75rem;
        }

        .booking-section-label p {
          color: var(--text-muted);
          font-size: 1rem;
        }

        .booking-glass-card {
          background: var(--glass-bg);
          backdrop-filter: blur(40px);
          border: 1px solid var(--glass-border);
          border-radius: 32px;
          padding: 3rem;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.03),
            0 40px 80px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.06);
          position: relative;
          overflow: hidden;
        }

        .booking-glass-card::before {
          content: '';
          position: absolute;
          top: -40%;
          right: -10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(198,255,0,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .form-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        /* Glass Select */
        .glass-select-container {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .glass-select-label {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--text-muted);
        }

        .glass-select-header {
          padding: 1rem 1.2rem;
          border-radius: 14px;
          border: 1px solid var(--glass-border);
          background: rgba(255,255,255,0.03);
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.25s ease;
          user-select: none;
          color: white;
        }

        .glass-select-header .placeholder { color: rgba(255,255,255,0.3); }
        .glass-select-header .selected-val { color: white; }

        .glass-select-header:hover {
          border-color: rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.06);
        }

        .glass-select-header.open {
          border-color: rgba(198,255,0,0.5);
          background: rgba(198,255,0,0.05);
          box-shadow: 0 0 0 3px rgba(198,255,0,0.08);
        }

        .chevron {
          transition: transform 0.3s;
          opacity: 0.4;
          flex-shrink: 0;
        }

        .chevron.rotate { transform: rotate(180deg); opacity: 0.8; }

        .glass-select-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: #1a2130;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
          z-index: 1000;
          max-height: 240px;
          overflow-y: auto;
          padding: 0.5rem;
        }

        .glass-select-dropdown::-webkit-scrollbar { width: 4px; }
        .glass-select-dropdown::-webkit-scrollbar-track { background: transparent; }
        .glass-select-dropdown::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }

        .glass-select-option {
          padding: 0.9rem 1.2rem;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.2s;
          color: rgba(255,255,255,0.7);
        }

        .glass-select-option:hover {
          background: rgba(255,255,255,0.07);
          color: white;
        }

        .glass-select-option.selected {
          background: rgba(198,255,0,0.12);
          color: var(--accent);
        }

        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .animate-dropdown { animation: slide-down 0.2s ease; }

        /* Native Input Styles */
        .glass-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .glass-input-label {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--text-muted);
        }

        .glass-input {
          padding: 1rem 1.2rem;
          border-radius: 14px;
          border: 1px solid var(--glass-border);
          background: rgba(255,255,255,0.03);
          color: white;
          font-size: 0.95rem;
          font-weight: 600;
          outline: none;
          transition: all 0.25s;
          width: 100%;
          font-family: 'Inter', sans-serif;
        }

        .glass-input::-webkit-calendar-picker-indicator {
          filter: invert(1) opacity(0.4);
          cursor: pointer;
        }

        .glass-input:focus {
          border-color: rgba(198,255,0,0.5);
          background: rgba(198,255,0,0.04);
          box-shadow: 0 0 0 3px rgba(198,255,0,0.08);
        }

        /* Submit Button */
        .search-submit-btn {
          width: 100%;
          padding: 1.25rem;
          border-radius: 16px;
          background: var(--accent);
          color: #0a0e13;
          font-weight: 900;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .search-submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .search-submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(198,255,0,0.35);
        }

        .search-submit-btn:hover::after { opacity: 1; }

        .search-submit-btn:active { transform: translateY(0); }
        .search-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        /* Spinner */
        .spin {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(0,0,0,0.3);
          border-top-color: #0a0e13;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* â”€â”€ RESULTS SECTION â”€â”€ */
        .results-outer {
          padding: 4rem 2rem 6rem;
          max-width: 1300px;
          margin: 0 auto;
        }

        .results-header {
          margin-bottom: 3rem;
        }

        .results-header h2 {
          font-size: 2.5rem;
          font-weight: 900;
          letter-spacing: -2px;
          margin-bottom: 0.5rem;
        }

        .results-header p {
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .route-arrow { color: var(--accent); font-weight: 900; }

        .package-result-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
          gap: 2rem;
        }

        .pkg-glass-card {
          background: var(--glass-bg);
          backdrop-filter: blur(30px);
          border: 1px solid var(--glass-border);
          border-radius: 28px;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .pkg-glass-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 28px;
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%);
          pointer-events: none;
        }

        .pkg-glass-card:hover {
          border-color: rgba(198,255,0,0.3);
          transform: translateY(-8px);
          box-shadow: 0 30px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(198,255,0,0.1);
        }

        .pkg-glass-card.private { --card-accent: rgba(51,102,255,0.08); }
        .pkg-glass-card.shared  { --card-accent: rgba(198,255,0,0.05); }

        .pkg-type-badge {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          padding: 0.4rem 1rem;
          border-radius: 50px;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .pkg-type-badge.private {
          background: rgba(51,102,255,0.15);
          border: 1px solid rgba(51,102,255,0.3);
          color: #6699ff;
        }

        .pkg-type-badge.shared {
          background: rgba(198,255,0,0.15);
          border: 1px solid rgba(198,255,0,0.35);
          color: var(--accent);
        }

        .pkg-route {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.4rem;
          font-weight: 900;
          letter-spacing: -0.5px;
          padding-right: 6rem;
        }

        .pkg-route-arrow {
          width: 32px;
          height: 32px;
          background: rgba(198,255,0,0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pkg-vehicle-sub {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--text-muted);
          margin-top: 0.25rem;
        }

        .pkg-price-row {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }

        .pkg-price-big {
          font-size: 2.8rem;
          font-weight: 950;
          letter-spacing: -2px;
          background: linear-gradient(135deg, var(--accent), #a2d200);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .pkg-price-unit {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .pkg-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .pkg-feature-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.88rem;
          font-weight: 600;
          color: rgba(255,255,255,0.65);
        }

        .pkg-feature-icon {
          width: 22px;
          height: 22px;
          background: rgba(198,255,0,0.12);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--accent);
        }

        .pkg-terms {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 1.25rem 1.5rem;
        }

        .pkg-terms-title {
          font-size: 0.65rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
        }

        .pkg-terms-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .pkg-terms-list li {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.5);
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .pkg-terms-list li::before {
          content: '->';
          color: var(--accent);
          font-weight: 900;
          flex-shrink: 0;
          line-height: 1.4;
        }

        .pkg-action-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-top: auto;
        }

        .pkg-btn {
          padding: 1rem;
          border-radius: 14px;
          font-weight: 800;
          font-size: 0.88rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
        }

        .pkg-btn.whatsapp {
          background: var(--accent);
          color: #0a0e13;
        }

        .pkg-btn.whatsapp:hover {
          box-shadow: 0 8px 25px rgba(198,255,0,0.35);
          transform: translateY(-2px);
        }

        .pkg-btn.email {
          background: rgba(255,255,255,0.05);
          color: white;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .pkg-btn.email:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }

        /* â”€â”€ NO RESULTS â”€â”€ */
        .no-results-glass {
          text-align: center;
          padding: 5rem 2rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 28px;
          backdrop-filter: blur(30px);
        }

        .no-results-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
        }

        .no-results-glass h3 {
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: -1px;
          margin-bottom: 0.75rem;
        }

        .no-results-glass p {
          color: var(--text-muted);
          max-width: 500px;
          margin: 0 auto 2.5rem;
          line-height: 1.6;
        }

        .no-results-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* â”€â”€ FLEET SECTION â”€â”€ */
        .fleet-section {
          padding: 6rem 2rem;
          max-width: 1300px;
          margin: 0 auto;
        }

        .fleet-section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .fleet-section-header h2 {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 900;
          letter-spacing: -2px;
          margin-bottom: 0.75rem;
        }

        .fleet-section-header p {
          color: var(--text-muted);
          font-size: 1rem;
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .fleet-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 2rem;
        }

        .fleet-card {
          background: var(--glass-bg);
          backdrop-filter: blur(30px);
          border: 1px solid var(--glass-border);
          border-radius: 28px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .fleet-card:hover {
          border-color: rgba(198,255,0,0.25);
          transform: translateY(-10px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }

        .fleet-img-wrap {
          height: 240px;
          overflow: hidden;
          position: relative;
        }

        .fleet-img-wrap::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 60%;
          background: linear-gradient(to top, var(--dark-3) 0%, transparent 100%);
        }

        .fleet-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .fleet-card:hover .fleet-img-wrap img { transform: scale(1.08); }

        .fleet-info {
          padding: 2rem;
        }

        .fleet-info h3 {
          font-size: 1.6rem;
          font-weight: 900;
          letter-spacing: -1px;
          margin-bottom: 1.25rem;
        }

        .fleet-specs {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 1.25rem;
        }

        .fleet-spec-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .fleet-spec-label {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .fleet-spec-value {
          font-size: 1rem;
          font-weight: 900;
          color: white;
        }

        .fleet-spec-value.price {
          background: rgba(198,255,0,0.12);
          color: var(--accent);
          padding: 0.3rem 0.8rem;
          border-radius: 8px;
          font-size: 0.95rem;
        }

        /* â”€â”€ WHY US STRIP â”€â”€ */
        .why-us-strip {
          padding: 5rem 2rem;
          background: rgba(255,255,255,0.017);
          border-top: 1px solid var(--glass-border);
          border-bottom: 1px solid var(--glass-border);
        }

        .why-us-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2.5rem;
          text-align: center;
        }

        .why-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .why-icon-wrap {
          width: 60px;
          height: 60px;
          background: rgba(198,255,0,0.1);
          border: 1px solid rgba(198,255,0,0.2);
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          transition: all 0.3s;
        }

        .why-item:hover .why-icon-wrap {
          background: var(--accent);
          color: #0a0e13;
          transform: scale(1.1) rotate(-5deg);
        }

        .why-item h4 {
          font-size: 1rem;
          font-weight: 800;
          color: white;
        }

        .why-item p {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          max-width: 180px;
        }

        /* â”€â”€ ANIMATIONS â”€â”€ */
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in-up { animation: fade-in-up 0.7s ease forwards; }

        /* â”€â”€ RESPONSIVE â”€â”€ */
        @media (max-width: 1024px) {
          .form-grid-4 { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 768px) {
          .form-grid-2 { grid-template-columns: 1fr; }
          .form-grid-4 { grid-template-columns: 1fr; }
          .booking-glass-card { padding: 1.5rem; }
          .pkg-action-row { grid-template-columns: 1fr; }
          .pkg-features { grid-template-columns: 1fr; }
          .fleet-grid { grid-template-columns: 1fr; }
          .hero-stats { gap: 1.5rem; }
        }
      `}</style>

      {/* â”€â”€ HERO â”€â”€ */}
      <section className="taxi-hero">
        <div className="taxi-hero-bg" />
        <div className="hero-noise-overlay" />
        <div className="taxi-hero-content animate-fade-in-up">
          <h1>Beyond a Taxi <span>Into Sri Lanka</span></h1>
          <p className="taxi-hero-sub">
            Smooth, honest journeys designed around you, so you can relax, explore freely, and enjoy every moment without worry.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num">500+</div>
              <div className="hero-stat-label">Routes Covered</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">5K+</div>
              <div className="hero-stat-label">Happy Travelers</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">24/7</div>
              <div className="hero-stat-label">Availability</div>
            </div>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
      
        </div>
      </section>

      {/* â”€â”€ WHY US â”€â”€ */}
      <div className="why-us-strip">
        <div className="why-us-inner">
          {[
            { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>, title: 'Local Secrets', desc: 'Stop anytime, And discover places you didn’t plan.' },
            { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>, title: 'Easy Communication', desc: 'Friendly, English-speaking drivers, No language stress.' },
            { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, title: 'Fixed Prices', desc: 'No extra. No surprises.Simple, honest, and worry-free.' },
            { icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: 'Expert Drivers', desc: 'Well-rested, professional drivers focused on your comfort and safety.' },
          ].map((item, i) => (
            <div className="why-item" key={i}>
              <div className="why-icon-wrap">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* â”€â”€ BOOKING SECTION â”€â”€ */}
      <div className="booking-outer">
        <div className="booking-section-label">
          <h2>Find Your Transfer</h2>
          <p>Select your route to see available packages instantly</p>
        </div>
        <div className="booking-glass-card animate-fade-in-up">
          <form onSubmit={handleSubmit}>
            <div className="form-grid-2">
              <CustomSelect
                label="Pick-up Location"
                name="pickup"
                value={formData.pickup}
                options={locations}
                onChange={handleChange}
                placeholder="Where are you starting?"
              />
              <CustomSelect
                label="Drop-off Location"
                name="dropoff"
                value={formData.dropoff}
                options={locations}
                onChange={handleChange}
                placeholder="Where are you going?"
              />
            </div>

            <div className="form-grid-4">
              <div className="glass-input-group">
                <label className="glass-input-label">Travel Date</label>
                <input type="date" name="date" className="glass-input" value={formData.date} onChange={handleChange} required />
              </div>
              <div className="glass-input-group">
                <label className="glass-input-label">Pickup Time</label>
                <input type="time" name="time" className="glass-input" value={formData.time} onChange={handleChange} required />
              </div>
              <CustomSelect
                label="Capacity / Pax"
                name="pax"
                value={formData.pax}
                options={capacities}
                onChange={(e) => setFormData({ ...formData, pax: e.target.value, vehicleType: '' })}
                placeholder="Select capacity"
              />
              <CustomSelect
                label="Vehicle Type"
                name="vehicleType"
                value={formData.vehicleType}
                options={availableVehicles}
                onChange={handleChange}
                placeholder={formData.pax ? "Choose vehicle" : "Select pax first"}
              />
              <div className="glass-input-group">
                <label className="glass-input-label">Mobile Number</label>
                <input 
                  type="text" 
                  name="mobile" 
                  className="glass-input" 
                  placeholder="+94 77 123 4567" 
                  value={formData.mobile} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <button type="submit" className="search-submit-btn" disabled={searching}>
              {searching ? (
                <>
                  <div className="spin" />
                  Finding Best Options...
                </>
              ) : (
                <>
                  Check Availability
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* â”€â”€ RESULTS â”€â”€ */}
      {searched && (
        <div id="found-packages-section" className="results-outer animate-fade-in-up">
          <div className="results-header">
            <h2>Available Transfers</h2>
            <p>
              <span>{formData.pickup}</span>
              <span className="route-arrow"> â†’ </span>
              <span>{formData.dropoff}</span>
            </p>
          </div>

          {foundPackages.length > 0 ? (
            <div className="package-result-grid">
              {foundPackages.map((pkg) => (
                <div key={pkg.id} className={`pkg-glass-card ${pkg.type}`}>
                  <div className={`pkg-type-badge ${pkg.type}`}>
                    {pkg.type === 'private' ? 'Private Transfer' : 'Shared Taxi'}
                  </div>

                  <div>
                    <div className="pkg-route">
                      {pkg.pickup}
                      <div className="pkg-route-arrow">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                      {pkg.dropoff}
                    </div>
                    <div className="pkg-vehicle-sub">{pkg.vehicle_type}</div>
                  </div>

                  <div className="pkg-price-row">
                    <span className="pkg-price-big">{formatToDollar(pkg.price)}</span>
                    {pkg.type === 'shared' && <span className="pkg-price-unit">/ person</span>}
                  </div>

                  <div className="pkg-features">
                    {(typeof pkg.inclusions === 'string' ? JSON.parse(pkg.inclusions || '[]') : pkg.inclusions || []).map((inc, i) => (
                      <div key={i} className="pkg-feature-item">
                        <div className="pkg-feature-icon">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        {inc}
                      </div>
                    ))}
                  </div>

                  <div className="pkg-terms">
                    <div className="pkg-terms-title">Important Terms</div>
                    <ul className="pkg-terms-list">
                      {(typeof pkg.terms === 'string' ? JSON.parse(pkg.terms || '[]') : pkg.terms || []).map((term, i) => (
                        <li key={i}>{term}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pkg-action-row">
                    <button className="pkg-btn whatsapp" onClick={() => window.open(generateWhatsAppLink(pkg), '_blank')}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.6 8.38 8.38 0 0 1 3.8.9L22 2l-1.5 5.5Z" /></svg>
                      WhatsApp
                    </button>
                    <button className="pkg-btn email" onClick={() => handleEmailBooking(pkg)}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                      Email Us
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results-glass">
              <div className="no-results-icon">ðŸ—ºï¸</div>
              <h3>No Fixed Packages Found</h3>
              <p>We don't have a fixed price for this specific route, but we can still arrange it! Contact us directly for a custom quote tailored to your needs.</p>
              <div className="no-results-actions">
                <button className="pkg-btn whatsapp" onClick={() => window.open(generateWhatsAppLink(null), '_blank')} style={{padding: '1rem 2rem'}}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.6 8.38 8.38 0 0 1 3.8.9L22 2l-1.5 5.5Z"/></svg>
                  WhatsApp Quote
                </button>
                <button className="pkg-btn email" onClick={() => handleEmailBooking(null)} style={{padding: '1rem 2rem'}}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  Email Quote
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* â”€â”€ FLEET â”€â”€ */}
      <section className="fleet-section">
        <div className="fleet-section-header">
          <h2>Our Premium Fleet</h2>
          <p>Choose the perfect ride for your journey. All vehicles are air-conditioned and driven by professional chauffeurs.</p>
        </div>
        <div className="fleet-grid">
          {fleet.map((v, i) => (
            <div key={v.id || i} className="fleet-card animate-fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="fleet-img-wrap">
                <img src={v.image} alt={v.vehicle_type} />
              </div>
              <div className="fleet-info">
                <h3>{v.vehicle_type}</h3>
                <div className="fleet-specs">
                  <div className="fleet-spec-row">
                    <div className="fleet-spec-label">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      Max Capacity
                    </div>
                    <span className="fleet-spec-value">{v.max_person} Pax</span>
                  </div>
                  <div className="fleet-spec-row">
                    <div className="fleet-spec-label">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                      Rate per KM
                    </div>
                    <span className="fleet-spec-value price">{formatToDollar(v.per_km)}</span>
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


