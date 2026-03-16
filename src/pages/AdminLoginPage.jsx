import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_BASE_URL + '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.admin));
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <style>{`
        .admin-login-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0A0A0A;
          color: white;
          font-family: 'Inter', sans-serif;
        }

        .login-card {
          background: rgba(15, 15, 15, 0.85);
          backdrop-filter: blur(40px);
          padding: 5rem;
          border-radius: 40px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          width: 100%;
          max-width: 520px;
          box-shadow: 0 50px 120px rgba(0,0,0,0.7);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .login-logo {
          height: 75px;
          margin-bottom: 2.5rem;
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .login-title {
          font-size: 3rem;
          font-weight: 950;
          margin-bottom: 0.5rem;
          letter-spacing: -2px;
        }

        .login-subtitle {
          opacity: 0.4;
          margin-bottom: 4rem;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          font-weight: 800;
        }

        .input-box {
          margin-bottom: 2.2rem;
          text-align: left;
        }

        .input-box label {
          display: block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 1rem;
          opacity: 0.4;
          font-weight: 800;
        }

        .input-box input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 1.4rem;
          border-radius: 20px;
          color: white;
          outline: none;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .input-box input:focus {
          border-color: var(--primary, #c6ff00);
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 0 20px rgba(198, 255, 0, 0.1);
        }

        .login-btn {
          width: 100%;
          background: linear-gradient(135deg, #c6ff00 0%, #a2d200 100%); 
          color: black;
          padding: 1.4rem;
          border-radius: 20px;
          font-weight: 950;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          border: none;
          cursor: pointer;
          margin-top: 2rem;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(198, 255, 0, 0.2);
        }

        .login-btn::after {
          content: '';
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: rotate(45deg);
          transition: 0.5s;
          left: -100%;
        }

        .login-btn:hover::after { left: 100%; }

        .login-btn:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 20px 60px rgba(198, 255, 0, 0.4);
        }

        .login-btn:active { transform: scale(0.96); }

        .login-btn:disabled {
          background: #333;
          color: #666;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .error-msg {
          color: #ff4b4b;
          background: rgba(255, 75, 75, 0.1);
          padding: 1rem;
          border-radius: 10px;
          margin-bottom: 2rem;
          font-size: 0.85rem;
        }
      `}</style>

      <div className="login-card animate-fade-in-up">
        <img src="/Dewlogo.jpg" alt="Dew Ceylon" className="login-logo" />
        <h1 className="login-title">Control Center</h1>
        <p className="login-subtitle">Dew Ceylon Tours - Administrative Access</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-box">
            <label>Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@dewceylon.com"
            />
          </div>
          <div className="input-box">
            <label>Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? 'Authenticating...' : 'Enter Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;


