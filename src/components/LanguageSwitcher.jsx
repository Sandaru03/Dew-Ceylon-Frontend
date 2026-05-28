import React, { useState, useEffect, useRef } from 'react';
import { Globe, Check, ChevronUp } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
];

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const clearGoogTransCookie = () => {
  const domain = window.location.hostname;
  const paths = ['/'];
  const domains = ['', domain, `.${domain}`];
  paths.forEach((path) => {
    domains.forEach((d) => {
      const domainPart = d ? `; domain=${d}` : '';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}${domainPart}`;
    });
  });
};

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const googtrans = getCookie('googtrans');
    if (googtrans) {
      const current = googtrans.split('/').pop();
      const match = languages.find((l) => l.code === current);
      if (match) {
        setCurrentLang(match.code);
      }
    } else {
      setCurrentLang('en');
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (langCode) => {
    const domain = window.location.hostname;

    // Always clear existing cookies first to prevent stale state
    clearGoogTransCookie();

    if (langCode !== 'en') {
      // Set new language cookie
      document.cookie = `googtrans=/en/${langCode}; path=/; max-age=2592000`;
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=${domain}; max-age=2592000`;
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${domain}; max-age=2592000`;
    }
    // For English, cookies are already cleared above

    // Try to use the Google Translate API directly if available (avoids double-reload)
    try {
      const selectEl = document.querySelector('.goog-te-combo');
      if (selectEl) {
        selectEl.value = langCode;
        selectEl.dispatchEvent(new Event('change', { bubbles: true }));
        setCurrentLang(langCode);
        setIsOpen(false);
        return;
      }
    } catch (_) {}

    // Fallback: reload the page
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const currentLangObj = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <div className="lang-switcher-widget notranslate" ref={dropdownRef} translate="no">
      <style>{`
        .lang-switcher-widget {
          position: fixed;
          bottom: 2rem;
          left: 2rem;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          font-family: 'Montserrat', sans-serif;
        }

        .lang-button {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.8rem 1.2rem;
          background: rgba(26, 26, 26, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          cursor: pointer;
          color: white;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .lang-button:hover {
          border-color: rgba(185, 255, 0, 0.5); /* var(--primary) equivalent */
          background: rgba(34, 34, 34, 0.95);
        }

        .lang-button-text {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .lang-dropdown {
          position: absolute;
          bottom: 100%;
          left: 0;
          margin-bottom: 0.8rem;
          background: rgba(26, 26, 26, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
          width: 180px;
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          opacity: 0;
          transform: translateY(10px) scale(0.95);
          pointer-events: none;
          transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-origin: bottom left;
        }

        .lang-dropdown.open {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .lang-dropdown-header {
          padding: 0.8rem 1rem 0.4rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .lang-options {
          padding: 0.4rem;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .lang-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0.6rem 0.8rem;
          background: transparent;
          border: none;
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .lang-option:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .lang-option.active {
          background: rgba(185, 255, 0, 0.1);
          color: #b9ff00;
        }

        .lang-option-content {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .lang-option-flag {
          font-size: 1.1rem;
        }

        .icon-spin:hover {
          animation: spin-slow 4s linear infinite;
        }

        @keyframes spin-slow {
          100% { transform: rotate(360deg); }
        }

        .chevron {
          transition: transform 0.3s ease;
        }

        .chevron.up {
          transform: rotate(180deg);
        }

        @media (max-width: 768px) {
          .lang-switcher-widget {
            bottom: 1.5rem;
            left: 1.5rem;
          }
          .lang-button-text {
            display: none;
          }
          .lang-button {
            padding: 0.8rem;
          }
        }
      `}</style>

      <div className={`lang-dropdown ${isOpen ? 'open' : ''}`}>
        <div className="lang-dropdown-header">Select Language</div>
        <div className="lang-options">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setCurrentLang(lang.code);
                setIsOpen(false);
                changeLanguage(lang.code);
              }}
              className={`lang-option ${currentLang === lang.code ? 'active' : ''}`}
            >
              <div className="lang-option-content">
                <span className="lang-option-flag">{lang.flag}</span>
                <span className="font-medium">{lang.label}</span>
              </div>
              {currentLang === lang.code && (
                <Check size={16} color="#b9ff00" />
              )}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lang-button group"
      >
        <Globe size={20} color="#b9ff00" className="icon-spin" />
        <span className="lang-button-text">
          {currentLangObj.label}
        </span>
        <ChevronUp 
          size={16} 
          color="rgba(255,255,255,0.5)"
          className={`chevron ${isOpen ? 'up' : ''}`} 
        />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
