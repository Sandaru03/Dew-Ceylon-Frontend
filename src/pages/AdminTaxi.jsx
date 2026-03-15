import React, { useState, useEffect } from 'react';

const AdminTaxi = () => {
  const [packages, setPackages] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    type: 'private',
    price: '',
    pax: '',
    vehicle_type: '',
    inclusions: [],
    terms: []
  });
  const [existingLocations, setExistingLocations] = useState([]);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/taxi-packages');
      const data = await response.json();
      setPackages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const resp = await fetch('http://localhost:5000/api/taxi-packages/locations');
      const data = await resp.json();
      setExistingLocations(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (pkg) => {
    setEditingPkg(pkg);
    setFormData({
      ...pkg,
      inclusions: typeof pkg.inclusions === 'string' ? JSON.parse(pkg.inclusions || '[]') : pkg.inclusions,
      terms: typeof pkg.terms === 'string' ? JSON.parse(pkg.terms || '[]') : pkg.terms
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this taxi package?')) return;
    try {
      await fetch(`http://localhost:5000/api/taxi-packages/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      fetchPackages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingPkg ? `http://localhost:5000/api/taxi-packages/${editingPkg.id}` : 'http://localhost:5000/api/taxi-packages';
    const method = editingPkg ? 'PUT' : 'POST';

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
        setIsFormOpen(false);
        setEditingPkg(null);
        fetchPackages();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateListField = (field, index, value) => {
     const newList = [...formData[field]];
     newList[index] = value;
     setFormData({...formData, [field]: newList});
  };

  const addToList = (field, defaultValue = '') => {
    setFormData({...formData, [field]: [...formData[field], defaultValue]});
  };

  const removeFromList = (field, index) => {
    const newList = formData[field].filter((_, i) => i !== index);
    setFormData({...formData, [field]: newList});
  };

  if (isFormOpen) {
    return (
      <div className="admin-form-view animate-fade-in">
        <style>{`
          .admin-form-view { 
            background: rgba(15, 15, 15, 0.85);
            backdrop-filter: blur(40px);
            padding: 5rem; 
            border-radius: 40px; 
            border: 1px solid rgba(255, 255, 255, 0.1);
            max-width: 1000px;
            margin: 0 auto;
            position: relative;
            box-shadow: 0 40px 100px rgba(0,0,0,0.6);
          }
          .form-header { 
            display: flex; 
            justify-content: space-between; 
            align-items: center;
            margin-bottom: 5rem; 
          }
          .form-header h2 { font-size: 2.8rem; font-weight: 950; letter-spacing: -2px; }
          .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
          .form-group { margin-bottom: 2.5rem; }
          .form-group label { 
            display: block; 
            font-size: 0.75rem; 
            opacity: 0.4; 
            margin-bottom: 1rem; 
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
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .form-group input:focus, .form-group textarea:focus, .form-group select:focus { 
            border-color: var(--primary, #c6ff00); 
            outline: none; 
            background: rgba(255, 255, 255, 0.06);
            box-shadow: 0 0 20px rgba(198, 255, 0, 0.1);
          }
          
          .list-editor { 
            margin-top: 4rem; 
            border-top: 1px solid rgba(255, 255, 255, 0.05); 
            padding-top: 3rem; 
          }
          .list-item-row { display: flex; gap: 1rem; margin-bottom: 1rem; align-items: center; }
          .list-item-row input {
            width: 100%; 
            background: rgba(255, 255, 255, 0.03) !important; 
            border: 1px solid rgba(255, 255, 255, 0.08) !important; 
            padding: 1.2rem !important; 
            border-radius: 15px !important; 
            color: white !important;
            font-weight: 600 !important;
            font-size: 1rem !important;
            transition: all 0.3s ease !important;
          }
          .list-item-row input:focus {
            border-color: var(--primary, #c6ff00) !important; 
            outline: none !important; 
            background: rgba(255, 255, 255, 0.06) !important;
          }
          .remove-btn { 
            background: rgba(255, 75, 75, 0.1); 
            color: #FF4B4B; 
            border: none; 
            width: 45px; 
            height: 45px; 
            border-radius: 12px; 
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
          }
          
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
            box-shadow: 0 10px 40px rgba(198, 255, 0, 0.2);
          }
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

          .add-list-btn { 
            background: rgba(198, 255, 0, 0.08); 
            color: var(--primary, #c6ff00); 
            padding: 0.7rem 1.4rem; 
            border-radius: 12px; 
            border: 1px solid rgba(198, 255, 0, 0.2); 
            font-weight: 800; 
            cursor: pointer; 
            font-size: 0.75rem;
            text-transform: uppercase;
          }
        `}</style>

        <div className="form-header">
          <h2>{editingPkg ? 'Edit Taxi Package' : 'Create Taxi Package'}</h2>
          <button className="btn-secondary-admin" onClick={() => {setIsFormOpen(false); setEditingPkg(null);}}>Cancel</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Pick-up Location</label>
              <input type="text" list="locations-list" value={formData.pickup} onChange={(e) => setFormData({...formData, pickup: e.target.value})} required placeholder="e.g. Negombo" />
            </div>
            <div className="form-group">
              <label>Drop-off Location</label>
              <input type="text" list="locations-list" value={formData.dropoff} onChange={(e) => setFormData({...formData, dropoff: e.target.value})} required placeholder="e.g. Sigiriya" />
            </div>
          </div>
          <datalist id="locations-list">
            {existingLocations.map(loc => <option key={loc} value={loc} />)}
          </datalist>

          <div className="form-grid">
            <div className="form-group">
              <label>Transfer Type</label>
              <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                <option value="private">Private Transfer</option>
                <option value="shared">Shared Transfer</option>
              </select>
            </div>
            <div className="form-group">
              <label>Price Range / Per Person</label>
              <input type="text" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required placeholder="e.g. LKR 16,000 – 20,000" />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Capacity / Pax</label>
              <input type="text" value={formData.pax} onChange={(e) => setFormData({...formData, pax: e.target.value})} placeholder="e.g. 2 Persons" />
            </div>
            <div className="form-group">
              <label>Vehicle Type</label>
              <input type="text" value={formData.vehicle_type} onChange={(e) => setFormData({...formData, vehicle_type: e.target.value})} placeholder="e.g. Private Air-Conditioned Car" />
            </div>
          </div>

          <div className="list-editor">
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1.5rem', alignItems:'center'}}>
              <h3 style={{fontSize:'1.2rem', fontWeight: 900}}>Inclusions</h3>
              <button type="button" className="add-list-btn" onClick={() => addToList('inclusions')}>+ Add Inclusion</button>
            </div>
            {formData.inclusions.map((item, i) => (
              <div key={i} className="list-item-row">
                <input value={item} onChange={(e) => updateListField('inclusions', i, e.target.value)} placeholder="e.g. Professional English-Speaking driver" />
                <button type="button" className="remove-btn" onClick={() => removeFromList('inclusions', i)}>✕</button>
              </div>
            ))}
          </div>

          <div className="list-editor">
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1.5rem', alignItems:'center'}}>
              <h3 style={{fontSize:'1.2rem', fontWeight: 900}}>Important Terms</h3>
              <button type="button" className="add-list-btn" onClick={() => addToList('terms')}>+ Add Term</button>
            </div>
            {formData.terms.map((item, i) => (
              <div key={i} className="list-item-row">
                <input value={item} onChange={(e) => updateListField('terms', i, e.target.value)} placeholder="e.g. Non-refundable if minimum passengers not reached" />
                <button type="button" className="remove-btn" onClick={() => removeFromList('terms', i)}>✕</button>
              </div>
            ))}
          </div>

          <div style={{marginTop:'5rem', textAlign: 'center'}}>
            <button type="submit" className="btn-primary-admin">{editingPkg ? 'Update Package' : 'Publish Package'}</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-packages-list animate-fade-in">
      <style>{`
        .admin-packages-list { width: 100%; }
        .view-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4rem; }
        .view-title { font-size: 2.8rem; font-weight: 900; letter-spacing: -2px; }
        
        .pkg-table { 
          width: 100%; 
          border-collapse: separate; 
          border-spacing: 0 1rem;
        }
        .pkg-table th { 
          text-align: left; 
          padding: 1rem 2rem; 
          opacity: 0.3; 
          font-size: 0.75rem; 
          text-transform: uppercase; 
          letter-spacing: 2px;
          font-weight: 800;
        }
        .pkg-table tr { background: rgba(255, 255, 255, 0.02); transition: all 0.3s ease; }
        .pkg-table td { padding: 1.5rem 2rem; }
        .pkg-table td:first-child { border-radius: 20px 0 0 20px; }
        .pkg-table td:last-child { border-radius: 0 20px 20px 0; }
        
        .type-badge {
          display: inline-block;
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
        }
        .type-private { background: rgba(198, 255, 0, 0.1); color: #c6ff00; }
        .type-shared { background: rgba(51, 153, 255, 0.1); color: #3399ff; }

        .btn-edit-action { 
          background: rgba(51, 102, 255, 0.08); 
          color: #3366ff; 
          border: 1px solid rgba(51, 102, 255, 0.15); 
          width: 40px;
          height: 40px;
          border-radius: 12px; 
          cursor: pointer; 
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .btn-edit-action:hover {
          background: #3366ff;
          color: white;
          transform: translateY(-2px);
        }
        .btn-delete-action { 
          background: rgba(255, 75, 75, 0.08); 
          color: #ff4b4b; 
          border: 1px solid rgba(255, 75, 75, 0.15); 
          width: 40px;
          height: 40px;
          border-radius: 12px; 
          cursor: pointer; 
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          margin-left: 0.5rem;
        }
        .btn-delete-action:hover {
          background: #ff4b4b;
          color: white;
          transform: translateY(-2px);
        }

        .btn-primary-admin { 
            background: linear-gradient(135deg, #c6ff00 0%, #a2d200 100%); 
            color: black; 
            padding: 1.2rem 3rem; 
            border-radius: 20px; 
            font-weight: 950; 
            border: none; 
            cursor: pointer; 
            transition: all 0.4s ease; 
            font-size: 1rem;
            text-transform: uppercase;
            box-shadow: 0 10px 40px rgba(198, 255, 0, 0.2);
        }
      `}</style>

      <div className="view-header">
        <h1 className="view-title">Taxi Transfers</h1>
        <button className="btn-primary-admin" onClick={() => {
           setFormData({
            pickup: '', dropoff: '', type: 'private', price: '', pax: '', vehicle_type: '', inclusions: [], terms: []
          });
          setIsFormOpen(true);
        }}>+ Add Route</button>
      </div>

      {loading ? <p>Loading taxi packages...</p> : (
        <table className="pkg-table">
          <thead>
            <tr>
              <th>Route (From - To)</th>
              <th>Type</th>
              <th>Vehicle / Pax</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map(pkg => (
              <tr key={pkg.id}>
                <td>
                  <div style={{fontWeight:900, fontSize:'1.1rem'}}>{pkg.pickup} → {pkg.dropoff}</div>
                  <div style={{opacity:0.4, fontSize:'0.8rem'}}>Sri Lanka Transfer</div>
                </td>
                <td>
                  <span className={`type-badge type-${pkg.type}`}>
                    {pkg.type}
                  </span>
                </td>
                <td>
                  <div style={{fontWeight: 700}}>{pkg.vehicle_type}</div>
                  <div style={{opacity: 0.5, fontSize: '0.8rem'}}>{pkg.pax}</div>
                </td>
                <td style={{fontWeight: 900, color: 'var(--primary, #c6ff00)', fontSize: '1.2rem'}}>{pkg.price}</td>
                <td>
                  <div style={{display: 'flex'}}>
                    <button className="btn-edit-action" onClick={() => handleEdit(pkg)} title="Edit">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                      </svg>
                    </button>
                    <button className="btn-delete-action" onClick={() => handleDelete(pkg.id)} title="Delete">
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

export default AdminTaxi;
