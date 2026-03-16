import React, { useState, useEffect } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const AdminAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'admin' });

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL + '/api/auth', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      const data = await response.json();
      setAdmins(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_BASE_URL + '/api/auth/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsFormOpen(false);
        setFormData({ name: '', email: '', password: '', role: 'admin' });
        fetchAdmins();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this administrator?')) return;
    try {
      const response = await fetch(API_BASE_URL + `/api/auth/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (response.ok) {
        fetchAdmins();
      } else {
        const error = await response.json();
        alert(error.message || "Failed to delete admin");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-manage-view animate-fade-in">
      <style>{`
        .admin-manage-view { width: 100%; }
        .view-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4rem; }
        .view-title { font-size: 2.8rem; font-weight: 900; letter-spacing: -2px; }
        
        .admin-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2.5rem; margin-top: 3rem; }
        .admin-card { 
          background: rgba(255, 255, 255, 0.03); 
          padding: 2.5rem; 
          border-radius: 30px; 
          border: 1px solid rgba(255, 255, 255, 0.05); 
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }
        .admin-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(198, 255, 0, 0.2);
        }
        
        .role-indicator { 
          font-size: 0.65rem; 
          background: var(--primary, #c6ff00); 
          color: black; 
          padding: 0.3rem 0.8rem; 
          border-radius: 20px; 
          font-weight: 800; 
          text-transform: uppercase;
          letter-spacing: 1px;
          display: inline-block;
          margin-bottom: 1.5rem;
        }
        
        .admin-name { font-size: 1.5rem; font-weight: 900; margin-bottom: 0.5rem; letter-spacing: -0.5px; }
        .admin-email { opacity: 0.4; font-size: 0.9rem; margin-bottom: 2rem; }
        
        .card-footer { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          padding-top: 1.5rem; 
          border-top: 1px solid rgba(255, 255, 255, 0.05); 
        }
        
        .join-date { font-size: 0.75rem; opacity: 0.3; font-weight: 500; }
        
        .delete-card-btn { 
          background: rgba(255, 75, 75, 0.08); 
          color: #FF4B4B; 
          border: 1px solid rgba(255, 75, 75, 0.15); 
          padding: 0.7rem 1.4rem; 
          border-radius: 14px; 
          font-weight: 800; 
          cursor: pointer; 
          font-size: 0.75rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .delete-card-btn:hover { 
          background: #FF4B4B; 
          color: white; 
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(255, 75, 75, 0.3);
        }
        .delete-card-btn:active { transform: scale(0.96); }
        
        .modal-overlay { 
          position: fixed; 
          top: 0; left: 0; 
          width: 100%; height: 100%; 
          background: rgba(0,0,0,0.85); 
          backdrop-filter: blur(10px);
          display: flex; 
          align-items: center; 
          justify-content: center; 
          z-index: 2000; 
        }
        .admin-modal { 
          background: rgba(15, 15, 15, 0.95); 
          backdrop-filter: blur(40px);
          padding: 4rem; 
          border-radius: 40px; 
          width: 500px; 
          border: 1px solid rgba(255, 255, 255, 0.1); 
          box-shadow: 0 50px 100px rgba(0,0,0,0.8);
          animation: modalAppear 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes modalAppear {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .form-group { margin-bottom: 2.2rem; }
        .form-group label { 
          display: block; 
          font-size: 0.75rem; 
          opacity: 0.4; 
          margin-bottom: 0.8rem; 
          text-transform: uppercase; 
          font-weight: 800;
          letter-spacing: 1.5px;
        }
        .form-group input {
          width: 100%; 
          background: rgba(255, 255, 255, 0.03); 
          border: 1px solid rgba(255, 255, 255, 0.1); 
          padding: 1.2rem; 
          border-radius: 18px; 
          color: white;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .form-group input:focus { 
          border-color: var(--primary, #c6ff00); 
          outline: none; 
          background: rgba(255, 255, 255, 0.07);
          box-shadow: 0 0 20px rgba(198, 255, 0, 0.1);
        }
        .form-group input::placeholder { color: rgba(255, 255, 255, 0.2); }

        .btn-primary-admin { 
          background: linear-gradient(135deg, #c6ff00 0%, #a2d200 100%); 
          color: black; 
          padding: 1.2rem 3rem; 
          border-radius: 20px; 
          font-weight: 950; 
          border: none; 
          cursor: pointer; 
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(198, 255, 0, 0.2);
        }
        .btn-primary-admin::after {
          content: '';
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: rotate(45deg);
          transition: 0.5s;
          left: -100%;
        }
        .btn-primary-admin:hover::after { left: 100%; }
        .btn-primary-admin:hover { 
          transform: translateY(-5px) scale(1.02); 
          box-shadow: 0 20px 50px rgba(198, 255, 0, 0.4); 
        }
        .btn-primary-admin:active { transform: scale(0.95); }

        .btn-secondary-admin { 
          background: rgba(255, 255, 255, 0.03); 
          color: white; 
          padding: 1.2rem 2.5rem; 
          border-radius: 20px; 
          font-weight: 800; 
          border: 1px solid rgba(255, 255, 255, 0.1); 
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          backdrop-filter: blur(10px);
        }
        .btn-secondary-admin:hover { 
          background: rgba(255, 255, 255, 0.08); 
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
        .btn-secondary-admin:active { transform: scale(0.98); }
      `}</style>

      <div className="view-header">
        <h1 className="view-title">Team Access</h1>
        <button className="btn-primary-admin" onClick={() => setIsFormOpen(true)}>+ New Administrator</button>
      </div>

      <div className="admin-grid">
        {admins.map(admin => (
          <div key={admin.id} className="admin-card">
            <span className="role-indicator" style={admin.role === 'superadmin' ? {background: '#3366ff', color: 'white'} : {}}>{admin.role}</span>
            <h3 className="admin-name">{admin.name}</h3>
            <p className="admin-email">{admin.email}</p>
            
            <div className="card-footer">
              <span className="join-date">Member since {new Date(admin.created_at).getFullYear()}</span>
              {admin.role !== 'superadmin' && (
                <button className="delete-card-btn" onClick={() => handleDelete(admin.id)}>Remove</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <div className="modal-overlay animate-fade-in">
          <div className="admin-modal">
            <h2 style={{fontSize: '2rem', fontWeight: 900, marginBottom: '2.5rem', letterSpacing: '-1px'}}>Register Admin</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group"><label>Full Name</label><input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required placeholder="John Doe" /></div>
              <div className="form-group"><label>Email Address</label><input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required placeholder="john@dewceylon.com" /></div>
              <div className="form-group"><label>Initial Password</label><input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required placeholder="********" /></div>
              <div style={{display:'flex', gap:'1.5rem', marginTop:'3rem'}}>
                <button type="submit" className="btn-primary-admin" style={{flex:1}}>Create Account</button>
                <button type="button" className="btn-secondary-admin" onClick={() => setIsFormOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAdmins;


