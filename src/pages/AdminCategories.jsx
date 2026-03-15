import React, { useState, useEffect } from 'react';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: 'package' });
  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId 
      ? `http://localhost:5000/api/categories/${editingId}` 
      : 'http://localhost:5000/api/categories';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({ name: '', type: 'package' });
        setEditingId(null);
        fetchCategories();
      } else {
        const error = await response.json();
        alert(error.message || "Failed to save category");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setFormData({ name: cat.name, type: cat.type });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const getBadgeColor = (type) => {
    switch(type) {
      case 'package': return 'rgba(51, 102, 255, 0.2)';
      case 'activity': return 'rgba(198, 255, 0, 0.2)';
      case 'blog': return 'rgba(255, 0, 255, 0.2)';
      default: return 'rgba(255,255,255,0.1)';
    }
  };

  const getTextColor = (type) => {
    switch(type) {
      case 'package': return '#6699ff';
      case 'activity': return 'var(--primary, #c6ff00)';
      case 'blog': return '#ff66ff';
      default: return 'white';
    }
  };

  return (
    <div className="admin-categories-list animate-fade-in">
      <style>{`
        .admin-categories-list { width: 100%; max-width: 900px; margin: 0 auto; }
        .view-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
        .view-title { font-size: 2.8rem; font-weight: 900; letter-spacing: -2px; }
        
        .cat-form-container { 
          background: rgba(15, 15, 15, 0.85); 
          padding: 2rem 3rem; 
          border-radius: 20px; 
          border: 1px solid rgba(255, 255, 255, 0.1); 
          margin-bottom: 3rem;
          display: flex;
          gap: 2rem;
          align-items: flex-end;
        }
        
        .form-group-inline { flex: 1; }
        .form-group-inline label { display: block; font-size: 0.75rem; opacity: 0.4; margin-bottom: 0.8rem; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; }
        .form-group-inline input, .form-group-inline select { 
          width: 100%; 
          background: rgba(255, 255, 255, 0.03); 
          border: 1px solid rgba(255, 255, 255, 0.08); 
          padding: 1rem 1.4rem; 
          border-radius: 12px; 
          color: white; 
          font-weight: 600; 
          font-size: 1rem; 
          transition: all 0.3s ease; 
        }
        .form-group-inline input:focus, .form-group-inline select:focus { 
          border-color: var(--primary, #c6ff00); 
          outline: none; 
          background: rgba(255, 255, 255, 0.06); 
        }

        .btn-primary-admin { 
          background: linear-gradient(135deg, #c6ff00 0%, #a2d200 100%); 
          color: black; 
          padding: 1.1rem 2rem; 
          border-radius: 12px; 
          font-weight: 950; 
          border: none; 
          cursor: pointer; 
          transition: all 0.3s ease; 
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          height: 100%;
        }
        .btn-primary-admin:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(198, 255, 0, 0.2); }
        .btn-cancel {
          background: rgba(255,255,255,0.05);
          color: white;
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
        }

        .pkg-table { width: 100%; border-collapse: separate; border-spacing: 0 0.8rem; }
        .pkg-table th { text-align: left; padding: 1rem 2rem; opacity: 0.3; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; }
        .pkg-table tr { background: rgba(255, 255, 255, 0.02); transition: all 0.3s ease; }
        .pkg-table tr:hover { background: rgba(255, 255, 255, 0.05); transform: scale(1.01); }
        .pkg-table td { padding: 1.2rem 2rem; }
        .pkg-table td:first-child { border-radius: 15px 0 0 15px; }
        .pkg-table td:last-child { border-radius: 0 15px 15px 0; }
        
        .type-badge { padding: 0.4rem 0.8rem; border-radius: 8px; font-size: 0.75rem; font-weight: 800; text-transform: capitalize; }
        
        .action-btns { display: flex; gap: 0.8rem; }
        .btn-edit-action { background: rgba(51, 102, 255, 0.08); color: #3366ff; border: 1px solid rgba(51, 102, 255, 0.15); width: 40px; height: 40px; border-radius: 12px; cursor: pointer; display: flex; items-center; justify-content: center; }
        .btn-delete-action { background: rgba(255, 75, 75, 0.08); color: #ff4b4b; border: 1px solid rgba(255, 75, 75, 0.15); width: 40px; height: 40px; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
      `}</style>

      <div className="view-header">
        <h1 className="view-title">Manage Categories</h1>
      </div>

      <form onSubmit={handleSubmit} className="cat-form-container">
        <div className="form-group-inline">
          <label>Category Name</label>
          <input 
            type="text" 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            placeholder="e.g. Wildlife Safari" 
            required
          />
        </div>
        <div className="form-group-inline">
          <label>Assign To</label>
          <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
            <option value="package">Package</option>
            <option value="activity">Activity</option>
            <option value="blog">Blog</option>
          </select>
        </div>
        <button type="submit" className="btn-primary-admin">
          {editingId ? 'Update' : 'Add'}
        </button>
        {editingId && (
          <button type="button" className="btn-cancel" onClick={() => {
            setEditingId(null);
            setFormData({ name: '', type: 'package' });
          }}>Cancel</button>
        )}
      </form>

      {loading ? <p>Loading categories...</p> : (
        <table className="pkg-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id}>
                <td><div style={{fontWeight: 900, fontSize: '1.1rem'}}>{cat.name}</div></td>
                <td>
                  <span className="type-badge" style={{background: getBadgeColor(cat.type), color: getTextColor(cat.type)}}>
                    {cat.type}
                  </span>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="btn-edit-action" onClick={() => handleEdit(cat)} title="Edit">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                      </svg>
                    </button>
                    <button className="btn-delete-action" onClick={() => handleDelete(cat.id)} title="Delete">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminCategories;
