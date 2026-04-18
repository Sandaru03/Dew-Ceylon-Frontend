import React, { useState, useEffect } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const AdminUpcomingTrips = () => {
  const [trips, setTrips] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [isSectionEnabled, setIsSectionEnabled] = useState(true);

  const [formData, setFormData] = useState({ title: '', price: '', image: '' });

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE_URL + '/api/upcoming-trips');
      const data = await res.json();
      setTrips(data);
      
      const resToggle = await fetch(API_BASE_URL + '/api/upcoming-trips/toggle');
      const toggleData = await resToggle.json();
      setIsSectionEnabled(toggleData.enabled);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTrips(); }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadLoading(true);
    const uploadData = new FormData();
    uploadData.append('image', file);
    try {
      const res = await fetch(API_BASE_URL + '/api/upload', { method: 'POST', body: uploadData });
      const data = await res.json();
      if (data.imageUrl) setFormData(prev => ({ ...prev, image: data.imageUrl }));
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleEdit = (trip) => {
    setEditingTrip(trip);
    setFormData({ title: trip.title, price: trip.price || '', image: trip.image });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this trip?')) return;
    try {
      await fetch(API_BASE_URL + `/api/upcoming-trips/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      fetchTrips();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingTrip
      ? API_BASE_URL + `/api/upcoming-trips/${editingTrip.id}`
      : API_BASE_URL + '/api/upcoming-trips';
    const method = editingTrip ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsFormOpen(false);
        setEditingTrip(null);
        setFormData({ title: '', price: '', image: '' });
        fetchTrips();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openAddForm = () => {
    setEditingTrip(null);
    setFormData({ title: '', price: '', image: '' });
    setIsFormOpen(true);
  };

  const handleToggleSection = async (val) => {
    setIsSectionEnabled(val);
    try {
      await fetch(API_BASE_URL + '/api/upcoming-trips/toggle', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ enabled: val })
      });
    } catch (err) {
      console.error(err);
    }
  };

  const formStyles = `
    .utrip-form-wrap {
      background: rgba(15, 15, 15, 0.85);
      backdrop-filter: blur(40px);
      padding: 5rem;
      border-radius: 40px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      max-width: 700px;
      margin: 0 auto;
      box-shadow: 0 40px 100px rgba(0,0,0,0.6);
    }
    .utrip-form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4rem;
    }
    .utrip-form-header h2 { font-size: 2.2rem; font-weight: 950; letter-spacing: -1.5px; }
    .utrip-form-group { margin-bottom: 2.5rem; }
    .utrip-form-group label {
      display: block;
      font-size: 0.72rem;
      opacity: 0.4;
      margin-bottom: 0.8rem;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 1.5px;
    }
    .utrip-form-group input {
      width: 100%;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 1.4rem;
      border-radius: 20px;
      color: white;
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.3s ease;
      box-sizing: border-box;
    }
    .utrip-form-group input:focus {
      border-color: var(--primary, #c6ff00);
      outline: none;
      background: rgba(255, 255, 255, 0.06);
      box-shadow: 0 0 20px rgba(198, 255, 0, 0.1);
    }
    .utrip-img-upload {
      background: rgba(255, 255, 255, 0.02);
      border: 2px dashed rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 2rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .utrip-img-upload:hover { border-color: var(--primary, #c6ff00); background: rgba(198,255,0,0.02); }
    .utrip-preview { width: 100%; height: 200px; object-fit: cover; border-radius: 12px; margin-bottom: 1rem; }
    .utrip-form-actions { margin-top: 3rem; display: flex; gap: 1rem; justify-content: flex-end; }
    .btn-primary-admin {
      background: linear-gradient(135deg, #c6ff00 0%, #a2d200 100%);
      color: black;
      padding: 1.2rem 3rem;
      border-radius: 20px;
      font-weight: 950;
      border: none;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.175,0.885,0.32,1.275);
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      box-shadow: 0 10px 40px rgba(198,255,0,0.2);
    }
    .btn-primary-admin:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 20px 50px rgba(198,255,0,0.4); }
    .btn-secondary-admin {
      background: rgba(255, 255, 255, 0.03);
      color: white;
      padding: 1.2rem 2.5rem;
      border-radius: 20px;
      font-weight: 800;
      border: 1px solid rgba(255, 255, 255, 0.1);
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .btn-secondary-admin:hover { background: rgba(255,255,255,0.08); transform: translateY(-2px); }
  `;

  const listStyles = `
    .utrip-list { width: 100%; }
    .utrip-list-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4rem; flex-wrap: wrap; gap: 1rem; }
    .header-actions { display: flex; align-items: center; gap: 1.5rem; }
    
    .toggle-container {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      background: rgba(255,255,255,0.05);
      padding: 0.6rem 1.2rem;
      border-radius: 50px;
    }
    .toggle-label { font-size: 0.8rem; font-weight: 800; text-transform: uppercase; color: rgba(255,255,255,0.8); }
    .switch { position: relative; width: 44px; height: 24px; display: inline-block; }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; inset: 0; background-color: rgba(255,255,255,0.2); transition: .4s; border-radius: 34px; }
    .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 4px; bottom: 4px; background-color: white; transition: .4s; border-radius: 50%; }
    input:checked + .slider { background-color: var(--primary, #c6ff00); }
    input:checked + .slider:before { transform: translateX(20px); background-color: black; }
    .utrip-list-title { font-size: 2.8rem; font-weight: 900; letter-spacing: -2px; }
    .utrip-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
      margin-top: 1rem;
    }
    .utrip-card {
      position: relative;
      border-radius: 24px;
      overflow: hidden;
      height: 320px;
      background: #1a1a1a;
      border: 1px solid rgba(255,255,255,0.05);
      transition: all 0.4s ease;
    }
    .utrip-card:hover { transform: translateY(-8px); box-shadow: 0 25px 50px rgba(0,0,0,0.4); }
    .utrip-card-img { width: 100%; height: 100%; object-fit: cover; }
    .utrip-card-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%);
    }
    .utrip-card-info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1.5rem;
      z-index: 2;
    }
    .utrip-card-title { color: white; font-size: 1.1rem; font-weight: 900; text-transform: uppercase; margin: 0 0 0.3rem 0; }
    .utrip-card-price { color: var(--primary, #c6ff00); font-size: 1rem; font-weight: 800; }
    .utrip-card-actions {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 3;
      display: flex;
      gap: 0.5rem;
    }
    .btn-edit-action {
      background: rgba(51,102,255,0.2);
      color: #6699ff;
      border: 1px solid rgba(51,102,255,0.3);
      width: 36px; height: 36px;
      border-radius: 10px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }
    .btn-edit-action:hover { background: #3366ff; color: white; }
    .btn-delete-action {
      background: rgba(255,75,75,0.2);
      color: #ff7777;
      border: 1px solid rgba(255,75,75,0.3);
      width: 36px; height: 36px;
      border-radius: 10px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }
    .btn-delete-action:hover { background: #ff4b4b; color: white; }
    .btn-primary-admin {
      background: linear-gradient(135deg, #c6ff00 0%, #a2d200 100%);
      color: black;
      padding: 1.2rem 3rem;
      border-radius: 20px;
      font-weight: 950;
      border: none;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.175,0.885,0.32,1.275);
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      box-shadow: 0 10px 40px rgba(198,255,0,0.2);
    }
    .btn-primary-admin:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 20px 50px rgba(198,255,0,0.4); }
    .utrip-empty {
      text-align: center;
      padding: 6rem 2rem;
      opacity: 0.4;
    }
    .utrip-empty-icon { font-size: 4rem; margin-bottom: 1.5rem; }
    .utrip-empty h3 { font-size: 1.5rem; font-weight: 800; }
  `;

  if (isFormOpen) {
    return (
      <div className="utrip-form-wrap animate-fade-in">
        <style>{formStyles}</style>
        <div className="utrip-form-header">
          <h2>{editingTrip ? 'Edit Trip' : 'Add New Trip'}</h2>
          <button className="btn-secondary-admin" onClick={() => { setIsFormOpen(false); setEditingTrip(null); }}>Cancel</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="utrip-form-group">
            <label>Trip Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="e.g. ELLA HIGHLANDS"
            />
          </div>
          <div className="utrip-form-group">
            <label>Price (optional, e.g. $199)</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="Leave blank to hide price badge"
            />
          </div>
          <div className="utrip-form-group">
            <label>Cover Image *</label>
            <div className="utrip-img-upload" onClick={() => document.getElementById('utrip-img-input').click()}>
              {uploadLoading ? (
                <p style={{ opacity: 0.6 }}>Uploading...</p>
              ) : formData.image ? (
                <>
                  <img src={formData.image} className="utrip-preview" alt="Preview" />
                  <p style={{ opacity: 0.5, fontSize: '0.85rem' }}>Click to change image</p>
                </>
              ) : (
                <div style={{ padding: '2rem' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>IMG</div>
                  <p style={{ opacity: 0.6, fontWeight: 600 }}>Click to upload cover image</p>
                </div>
              )}
              <input id="utrip-img-input" type="file" hidden onChange={handleImageUpload} accept="image/*" />
            </div>
          </div>
          <div className="utrip-form-actions">
            <button type="submit" className="btn-primary-admin" disabled={!formData.image || uploadLoading}>
              {editingTrip ? 'Save Changes' : 'Add Trip'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="utrip-list animate-fade-in">
      <style>{listStyles}</style>
      <div className="utrip-list-header">
        <h1 className="utrip-list-title">Upcoming Trips</h1>
        <div className="header-actions">
          <div className="toggle-container">
            <span className="toggle-label">Show on Homepage</span>
            <label className="switch">
              <input type="checkbox" checked={isSectionEnabled} onChange={(e) => handleToggleSection(e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>
          <button className="btn-primary-admin" onClick={openAddForm}>+ Add Trip</button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '6rem 0', opacity: 0.4 }}>
          <p>Loading trips...</p>
        </div>
      ) : trips.length === 0 ? (
        <div className="utrip-empty">
          <div className="utrip-empty-icon">MAP</div>
          <h3>No trips added yet</h3>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Click "+ Add Trip" to create the first upcoming trip card.</p>
        </div>
      ) : (
        <div className="utrip-grid">
          {trips.map((trip) => (
            <div className="utrip-card" key={trip.id}>
              <img src={trip.image} alt={trip.title} className="utrip-card-img" />
              <div className="utrip-card-overlay" />
              <div className="utrip-card-actions">
                <button className="btn-edit-action" onClick={() => handleEdit(trip)} title="Edit">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                  </svg>
                </button>
                <button className="btn-delete-action" onClick={() => handleDelete(trip.id)} title="Delete">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
              <div className="utrip-card-info">
                <h3 className="utrip-card-title">{trip.title}</h3>
                {trip.price && <div className="utrip-card-price">{trip.price.startsWith('$') ? trip.price : `$${trip.price}`}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUpcomingTrips;


