import React, { useState, useEffect } from 'react';

const WhatsAppButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const phoneNumber = "94742216579"; // Placeholder phone number
  const message = "Hello! I'm interested in booking a tour with Dew Ceylon.";

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="whatsapp-widget">
      <style>{`
        .whatsapp-widget {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1.2rem;
        }

        .whatsapp-popup {
          background: white;
          padding: 1.2rem 1.8rem;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          max-width: 280px;
          position: relative;
          opacity: 0;
          transform: scale(0.8) translateY(20px);
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          pointer-events: none;
          border: 1px solid rgba(0,0,0,0.05);
        }

        .whatsapp-popup.show {
          opacity: 1;
          transform: scale(1) translateY(0);
          pointer-events: auto;
        }

        .whatsapp-popup::after {
          content: '';
          position: absolute;
          bottom: -10px;
          right: 25px;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid white;
        }

        .popup-close {
          position: absolute;
          top: 8px;
          right: 12px;
          font-size: 1.2rem;
          cursor: pointer;
          color: #bbb;
          line-height: 1;
          transition: color 0.3s;
        }

        .popup-close:hover {
          color: #666;
        }

        .popup-text {
          color: #333;
          font-size: 0.95rem;
          margin: 0;
          line-height: 1.5;
          font-weight: 500;
        }

        .wa-button-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wa-button {
          width: 65px;
          height: 65px;
          background-color: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          text-decoration: none;
          animation: wa-bounce 3s infinite;
          z-index: 2;
        }

        .wa-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background: #25D366;
          opacity: 0.5;
          z-index: -1;
          animation: ripple 2s infinite;
        }

        .wa-button:hover {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 12px 30px rgba(37, 211, 102, 0.5);
        }

        .wa-button svg {
          width: 35px;
          height: 35px;
        }

        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }

        @keyframes wa-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @media (max-width: 768px) {
          .whatsapp-widget {
            bottom: 1.5rem;
            right: 1.5rem;
          }
          .wa-button {
            width: 55px;
            height: 55px;
          }
          .wa-button svg {
            width: 30px;
            height: 30px;
          }
        }
      `}</style>

      <div className={`whatsapp-popup ${showPopup ? 'show' : ''}`}>
        <span className="popup-close" onClick={() => setShowPopup(false)}>&times;</span>
        <p className="popup-text">Hi there! 👋<br/>Need help planning your perfect Sri Lankan adventure?</p>
      </div>

      <a 
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="wa-button"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppButton;
