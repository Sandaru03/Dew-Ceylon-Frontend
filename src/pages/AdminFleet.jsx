import React, { useState, useEffect } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const AdminFleet = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Form States
  const [formData, setFormData] = useState({
    image: '',
    vehicle_type: '',
    per_km: '',
    max_person: ''
  });

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL + '/api/fleet');
      const data = await response.json();
      setVehicles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const resetForm = () => {
    setFormData({ image: '', vehicle_type: '', per_km: '', max_person: '' });
    setImageFile(null);
    setPreviewImage(null);
    setEditingVehicle(null);
    setIsFormOpen(false);
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      image: vehicle.image || '',
      vehicle_type: vehicle.vehicle_type || '',
      per_km: vehicle.per_km || '',
      max_person: vehicle.max_person || ''
    });
    setImageFile(null);
    setPreviewImage(vehicle.image || null);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;
    try {
      await fetch(API_BASE_URL + `/api/fleet/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      fetchVehicles();
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.image;
    
    const uploadData = new FormData();
    uploadData.append('image', imageFile);

    try {
      const response = await fetch(API_BASE_URL + '/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: uploadData
      });
      
      if (!response.ok) throw new Error('Image upload failed');
      
      const data = await response.json();
      return data.imageUrl; // e.g. API_BASE_URL + "/uploads/..."
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await uploadImage();
      }

      if (!imageUrl) {
         alert("Please upload an image.");
         return;
      }

      const payload = { ...formData, image: imageUrl };

      const endpoint = editingVehicle ? API_BASE_URL + `/api/fleet/${editingVehicle.id}` : API_BASE_URL + '/api/fleet';
      const method = editingVehicle ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        resetForm();
        fetchVehicles();
      }
    } catch (err) {
      console.error(err);
    }
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
          .form-group input {
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
          .form-group input:focus { 
            border-color: var(--primary, #c6ff00); 
            outline: none; 
            background: rgba(255, 255, 255, 0.06);
            box-shadow: 0 0 20px rgba(198, 255, 0, 0.1);
          }
          .image-upload-area {
            width: 100%;
            height: 250px;
            border: 2px dashed rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
          }
          .image-upload-area:hover {
            border-color: var(--primary, #c6ff00);
            background: rgba(198, 255, 0, 0.02);
          }
          .image-preview {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
          .upload-placeholder {
            text-align: center;
            opacity: 0.5;
          }
          .upload-placeholder svg {
            margin-bottom: 1rem;
          }
          .file-input-hidden {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
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
        `}</style>

        <div className="form-header">
          <h2>{editingVehicle ? 'Edit Fleet Vehicle' : 'Add Fleet Vehicle'}</h2>
          <button className="btn-secondary-admin" onClick={() => {
            resetForm();
          }}>Cancel</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Vehicle Image</label>
            <div className="image-upload-area">
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="image-preview" />
              ) : (
                <div className="upload-placeholder">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <div>Click to upload image</div>
                </div>
              )}
              <input type="file" className="file-input-hidden" accept="image/*" onChange={handleImageChange} required={!previewImage && !formData.image} />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Vehicle Type</label>
              <input type="text" value={formData.vehicle_type} onChange={(e) => setFormData({...formData, vehicle_type: e.target.value})} required placeholder="e.g. Comfort SUV" />
            </div>
            <div className="form-group">
              <label>Max Person (Capacity)</label>
              <input type="text" value={formData.max_person} onChange={(e) => setFormData({...formData, max_person: e.target.value})} required placeholder="e.g. 4 Persons" />
            </div>
          </div>

          <div className="form-grid" style={{gridTemplateColumns: '1fr'}}>
            <div className="form-group">
              <label>Per KM Rate</label>
              <input type="text" value={formData.per_km} onChange={(e) => setFormData({...formData, per_km: e.target.value})} required placeholder="e.g. LKR 150" />
            </div>
          </div>

          <div style={{marginTop:'5rem', textAlign: 'center'}}>
            <button type="submit" className="btn-primary-admin">{editingVehicle ? 'Update Vehicle' : 'Publish Vehicle'}</button>
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
        .pkg-table td { padding: 1.5rem 2rem; vertical-align: middle; }
        .pkg-table td:first-child { border-radius: 20px 0 0 20px; }
        .pkg-table td:last-child { border-radius: 0 20px 20px 0; }
        
        .vehicle-img-thumb {
          width: 80px;
          height: 60px;
          border-radius: 10px;
          object-fit: cover;
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
        }

        .btn-edit-action {
          background: rgba(198, 255, 0, 0.08);
          color: var(--primary, #c6ff00);
          border: 1px solid rgba(198, 255, 0, 0.2);
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
          background: var(--primary, #c6ff00);
          color: black;
          transform: translateY(-2px);
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
        <h1 className="view-title">Premium Fleet</h1>
        <button className="btn-primary-admin" onClick={() => {
          setIsFormOpen(true);
        }}>+ Add Vehicle</button>
      </div>

      {loading ? <p>Loading vehicles...</p> : (
        <table className="pkg-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Type & Capacity</th>
              <th>Per KM Rate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => (
              <tr key={vehicle.id}>
                <td>
                  <img src={vehicle.image} alt={vehicle.vehicle_type} className="vehicle-img-thumb" />
                </td>
                <td>
                  <div style={{fontWeight: 900, fontSize:'1.1rem'}}>{vehicle.vehicle_type}</div>
                  <div style={{opacity: 0.5, fontSize: '0.8rem'}}>{vehicle.max_person}</div>
                </td>
                <td style={{fontWeight: 900, color: 'var(--primary, #c6ff00)', fontSize: '1.2rem'}}>{vehicle.per_km}</td>
                <td>
                  <div style={{display: 'flex', gap: '0.6rem'}}>
                    <button className="btn-edit-action" onClick={() => handleEdit(vehicle)} title="Edit">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
                      </svg>
                    </button>
                    <button className="btn-delete-action" onClick={() => handleDelete(vehicle.id)} title="Delete">
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
            {vehicles.length === 0 && (
              <tr>
                <td colSpan="4" style={{textAlign: 'center', opacity: 0.5, padding: '3rem'}}>
                  No fleet vehicles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminFleet;


