import React, { useState, useEffect } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const [formData, setFormData] = useState({ name: '', role: '', rating: 5, review_text: '', image: '' });

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE_URL + '/api/reviews');
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

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

  const handleEdit = (review) => {
    setEditingReview(review);
    setFormData({ 
      name: review.name, 
      role: review.role || 'Explorer', 
      rating: review.rating || 5, 
      review_text: review.review_text, 
      image: review.image || '' 
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await fetch(API_BASE_URL + `/api/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingReview
      ? API_BASE_URL + `/api/reviews/${editingReview.id}`
      : API_BASE_URL + '/api/reviews';
    const method = editingReview ? 'PUT' : 'POST';
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
        setEditingReview(null);
        setFormData({ name: '', role: '', rating: 5, review_text: '', image: '' });
        fetchReviews();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openAddForm = () => {
    setEditingReview(null);
    setFormData({ name: '', role: 'Explorer', rating: 5, review_text: '', image: '' });
    setIsFormOpen(true);
  };

  const formStyles = `
    .form-wrap {
      background: rgba(15, 15, 15, 0.85);
      backdrop-filter: blur(40px);
      padding: 5rem;
      border-radius: 40px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      max-width: 700px;
      margin: 0 auto;
      box-shadow: 0 40px 100px rgba(0,0,0,0.6);
    }
    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4rem;
    }
    .form-header h2 { font-size: 2.2rem; font-weight: 950; letter-spacing: -1.5px; }
    .form-group { margin-bottom: 2.5rem; }
    .form-group label {
      display: block;
      font-size: 0.72rem;
      opacity: 0.4;
      margin-bottom: 0.8rem;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 1.5px;
    }
    .form-group input, .form-group textarea, .form-group select {
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
      font-family: 'Inter', sans-serif;
    }
    .form-group textarea {
      resize: vertical;
      min-height: 120px;
    }
    .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
      border-color: var(--primary, #c6ff00);
      outline: none;
      background: rgba(255, 255, 255, 0.06);
      box-shadow: 0 0 20px rgba(198, 255, 0, 0.1);
    }
    .img-upload {
      background: rgba(255, 255, 255, 0.02);
      border: 2px dashed rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 2rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .img-upload:hover { border-color: var(--primary, #c6ff00); background: rgba(198,255,0,0.02); }
    .preview-img { width: 120px; height: 120px; object-fit: cover; border-radius: 50%; margin-bottom: 1rem; }
    .form-actions { margin-top: 3rem; display: flex; gap: 1rem; justify-content: flex-end; }
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
    .list-wrap { width: 100%; }
    .list-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4rem; }
    .list-title { font-size: 2.8rem; font-weight: 900; letter-spacing: -2px; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
      margin-top: 1rem;
    }
    .card {
      position: relative;
      border-radius: 24px;
      padding: 2rem;
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.05);
      transition: all 0.4s ease;
      display: flex;
      flex-direction: column;
    }
    .card:hover { transform: translateY(-8px); box-shadow: 0 25px 50px rgba(0,0,0,0.4); border-color: rgba(198,255,0,0.2); }
    .card-actions {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      display: flex;
      gap: 0.5rem;
    }
    .btn-edit-action {
      background: rgba(51,102,255,0.1); color: #6699ff; border: 1px solid rgba(51,102,255,0.2);
      width: 32px; height: 32px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;
    }
    .btn-edit-action:hover { background: #3366ff; color: white; }
    .btn-delete-action {
      background: rgba(255,75,75,0.1); color: #ff7777; border: 1px solid rgba(255,75,75,0.2);
      width: 32px; height: 32px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;
    }
    .btn-delete-action:hover { background: #ff4b4b; color: white; }
    .card-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
    .card-img { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; background: rgba(255,255,255,0.1); }
    .card-reviewer { flex: 1; }
    .card-name { font-size: 1.1rem; font-weight: 900; margin: 0 0 0.2rem 0; }
    .card-role { font-size: 0.8rem; opacity: 0.6; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; margin: 0; }
    .card-rating { font-size: 0.9rem; color: #ffc107; margin-bottom: 1rem; }
    .card-text { font-size: 0.95rem; opacity: 0.8; line-height: 1.6; font-style: italic; }
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
    .empty-state { text-align: center; padding: 6rem 2rem; opacity: 0.4; }
    .empty-icon { font-size: 4rem; margin-bottom: 1.5rem; }
    .empty-state h3 { font-size: 1.5rem; font-weight: 800; }
  `;

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} style={{ opacity: i < rating ? 1 : 0.3 }}>★</span>
    ));
  };

  if (isFormOpen) {
    return (
      <div className="form-wrap animate-fade-in">
        <style>{formStyles}</style>
        <div className="form-header">
          <h2>{editingReview ? 'Edit Review' : 'Add New Review'}</h2>
          <button className="btn-secondary-admin" onClick={() => { setIsFormOpen(false); setEditingReview(null); }}>Cancel</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Reviewer Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="e.g. John Doe"
            />
          </div>
          <div className="form-group">
            <label>Role (e.g. Explorer, Nature Lover)</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Explorer"
            />
          </div>
          <div className="form-group">
            <label>Rating (1-5)</label>
            <select
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
            >
              {[5,4,3,2,1].map(num => (
                <option key={num} value={num}>{num} Stars</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Review Text *</label>
            <textarea
              value={formData.review_text}
              onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
              required
              placeholder="It was an amazing experience..."
            />
          </div>
          <div className="form-group">
            <label>Reviewer Image (optional)</label>
            <div className="img-upload" onClick={() => document.getElementById('img-input').click()}>
              {uploadLoading ? (
                <p style={{ opacity: 0.6 }}>Uploading...</p>
              ) : formData.image ? (
                <>
                  <img src={formData.image} className="preview-img" alt="Preview" />
                  <p style={{ opacity: 0.5, fontSize: '0.85rem' }}>Click to change image</p>
                </>
              ) : (
                <div style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📸</div>
                  <p style={{ opacity: 0.6, fontWeight: 600 }}>Click to upload profile photo</p>
                </div>
              )}
              <input id="img-input" type="file" hidden onChange={handleImageUpload} accept="image/*" />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary-admin" disabled={uploadLoading}>
              {editingReview ? 'Save Changes' : 'Add Review'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="list-wrap animate-fade-in">
      <style>{listStyles}</style>
      <div className="list-header">
        <h1 className="list-title">Customer Reviews</h1>
        <button className="btn-primary-admin" onClick={openAddForm}>+ Add Review</button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '6rem 0', opacity: 0.4 }}>
          <p>Loading reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">⭐</div>
          <h3>No reviews added yet</h3>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Click "+ Add Review" to create the first review.</p>
        </div>
      ) : (
        <div className="grid">
          {reviews.map((review) => (
            <div className="card" key={review.id}>
              <div className="card-actions">
                <button className="btn-edit-action" onClick={() => handleEdit(review)} title="Edit">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                  </svg>
                </button>
                <button className="btn-delete-action" onClick={() => handleDelete(review.id)} title="Delete">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
              <div className="card-header">
                {review.image ? (
                  <img src={review.image} alt={review.name} className="card-img" />
                ) : (
                  <div className="card-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {review.name.charAt(0)}
                  </div>
                )}
                <div className="card-reviewer">
                  <h3 className="card-name">{review.name}</h3>
                  <p className="card-role">{review.role}</p>
                </div>
              </div>
              <div className="card-rating">
                {renderStars(review.rating)}
              </div>
              <div className="card-text">
                "{review.review_text}"
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
