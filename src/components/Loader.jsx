import React, { useEffect, useState } from 'react';

const Loader = ({ onFinish }) => {
  const [isExiting, setIsExiting] = useState(false);
  const text = "DEW CEYLON";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onFinish, 1000); // Wait for exit animation to complete
    }, 3500); // Total show time

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`premium-loader ${isExiting ? 'exit' : ''}`}>
      <style>{`
        .premium-loader {
          position: fixed;
          inset: 0;
          background: #080c10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: hidden;
          transition: transform 1s cubic-bezier(0.85, 0, 0.15, 1);
        }

        .premium-loader.exit {
          transform: translateY(-100%);
        }

        .loader-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .logo-wrap {
          position: relative;
          width: 140px;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-bg-glow {
          position: absolute;
          inset: -20px;
          background: radial-gradient(circle, rgba(198, 255, 0, 0.15) 0%, transparent 70%);
          animation: pulse-glow 3s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
        }

        .loader-logo {
          width: 100px;
          height: 100px;
          object-fit: contain;
          border-radius: 50%;
          z-index: 2;
          animation: logo-entrance 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          box-shadow: 0 0 30px rgba(0,0,0,0.5);
        }

        @keyframes logo-entrance {
          from { transform: scale(0.5) translateY(20px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }

        .loader-text {
          display: flex;
          gap: 0.4rem;
        }

        .char {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.2rem;
          font-weight: 900;
          color: white;
          letter-spacing: 4px;
          opacity: 0;
          transform: translateY(10px);
          animation: char-reveal 0.5s ease forwards;
        }

        @keyframes char-reveal {
          to { opacity: 0.8; transform: translateY(0); }
        }

        .loader-text-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
        }

        .loader-subtext {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 3px;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(10px);
          animation: subtext-reveal 0.8s ease forwards 1.8s;
        }

        @keyframes subtext-reveal {
          to { opacity: 1; transform: translateY(0); }
        }

        .loader-progress-track {
          width: 200px;
          height: 2px;
          background: rgba(255, 255, 255, 0.05);
          position: relative;
          margin-top: 1rem;
          border-radius: 1px;
          overflow: hidden;
        }

        .loader-progress-bar {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          background: #c6ff00;
          transform: translateX(-100%);
          animation: progress-fill 3.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }

        @keyframes progress-fill {
          to { transform: translateX(0); }
        }

        /* Particles */
        .particle {
          position: absolute;
          background: #c6ff00;
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
        }

        ${[...Array(6)].map((_, i) => `
          .p-${i} {
            width: ${4 + i}px;
            height: ${4 + i}px;
            left: ${20 + i * 15}%;
            top: ${80 - i * 5}%;
            animation: particle-float ${4 + i}s infinite linear;
            animation-delay: ${i * 0.5}s;
          }
        `).join('')}

        @keyframes particle-float {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.3; }
          80% { opacity: 0.3; }
          100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }
      `}</style>

      <div className="loader-content">
        <div className="logo-wrap">
          <div className="logo-bg-glow" />
          <img src="/Dewlogo.jpg" alt="Logo" className="loader-logo" />
        </div>

        <div className="loader-text-wrap">
          <div className="loader-text">
            {text.split("").map((char, i) => (
              <span 
                key={i} 
                className="char" 
                style={{ animationDelay: `${0.8 + i * 0.1}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
          <div className="loader-subtext">
            Your Next Great Adventure
          </div>
        </div>

        <div className="loader-progress-track">
          <div className="loader-progress-bar" />
        </div>
      </div>

      {[...Array(6)].map((_, i) => (
        <div key={i} className={`particle p-${i}`} />
      ))}
    </div>
  );
};

export default Loader;
