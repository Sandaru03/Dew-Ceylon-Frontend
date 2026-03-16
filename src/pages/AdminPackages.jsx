import React, { useState, useEffect } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const AdminPackages = () => {
  const [packages, setPackages] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Form States
  const [formData, setFormData] = useState({
    title: '', category: 'Safari', duration: '', price: '', originalPrice: '',
    rating: 4.5, bookings: '0+', type: 'All Inclusive', image: '', shortDescription: '', description: '',
    gallery: [], locations: [], inclusions: [], exclusions: [], highlights: [], itinerary: []
  });

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL + '/api/packages');
      const data = await response.json();
      setPackages([...data].sort((a, b) => b.id - a.id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(API_BASE_URL + '/api/categories?type=package');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleImageUpload = async (e, field = 'image', index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadLoading(true);
    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const response = await fetch(API_BASE_URL + '/api/upload', {
        method: 'POST',
        body: uploadData
      });
      const data = await response.json();
      
      if (data.imageUrl) {
        if (field === 'gallery' && index !== null) {
          const newGallery = [...formData.gallery];
          newGallery[index] = data.imageUrl;
          setFormData({ ...formData, gallery: newGallery });
        } else {
          setFormData({ ...formData, [field]: data.imageUrl });
        }
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleEdit = (pkg) => {
    setEditingPkg(pkg);
    setFormData({
      ...pkg,
      gallery: JSON.parse(pkg.gallery || '[]'),
      locations: JSON.parse(pkg.locations || '[]'),
      inclusions: JSON.parse(pkg.inclusions || '[]'),
      exclusions: JSON.parse(pkg.exclusions || '[]'),
      highlights: JSON.parse(pkg.highlights || '[]'),
      itinerary: JSON.parse(pkg.itinerary || '[]')
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return;
    try {
      await fetch(API_BASE_URL + `/api/packages/${id}`, {
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
    const url = editingPkg ? API_BASE_URL + `/api/packages/${editingPkg.id}` : API_BASE_URL + '/api/packages';
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
      } else {
        const errorData = await response.json();
        alert('Server Error: ' + errorData.message);
      }
    } catch (err) {
      console.error(err);
      alert('Network Error: ' + err.message);
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
            max-width: 1100px;
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
          
          .image-upload-wrapper {
            background: rgba(255, 255, 255, 0.02);
            border: 2px dashed rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            text-align: center;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            cursor: pointer;
          }
          .image-upload-wrapper:hover { border-color: var(--primary, #c6ff00); background: rgba(198, 255, 0, 0.02); }
          .preview-img { width: 100%; height: 200px; object-fit: cover; border-radius: 12px; margin-bottom: 1rem; }
          .upload-label { font-size: 0.9rem; font-weight: 600; opacity: 0.8; }
          
          .list-editor { 
            margin-top: 4rem; 
            border-top: 1px solid rgba(255, 255, 255, 0.05); 
            padding-top: 3rem; 
          }
          .list-item-row { display: flex; gap: 1rem; margin-bottom: 1rem; align-items: center; }
          .list-editor input:not([type="file"]), .list-editor textarea { 
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
          .list-editor input:not([type="file"]):focus, .list-editor textarea:focus {
            border-color: var(--primary, #c6ff00); 
            outline: none; 
            background: rgba(255, 255, 255, 0.06);
            box-shadow: 0 0 20px rgba(198, 255, 0, 0.1);
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
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
          }
          .add-list-btn:hover {
            background: var(--primary, #c6ff00);
            color: black;
            box-shadow: 0 10px 20px rgba(198, 255, 0, 0.2);
          }
        `}</style>

        <div className="form-header">
          <h2>{editingPkg ? 'Edit Journey' : 'Create New Journey'}</h2>
          <button className="btn-secondary-admin" onClick={() => {setIsFormOpen(false); setEditingPkg(null);}}>Cancel</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Package Title</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required placeholder="e.g. Safari Dreams" />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group"><label>Duration</label><input type="text" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} placeholder="e.g. 5 Days / 4 Nights" /></div>
            <div className="form-group"><label>Price ($)</label><input type="text" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="e.g. 450" /></div>
          </div>

          <div className="form-group">
            <label>Cover Image</label>
            <div className="image-upload-wrapper" onClick={() => document.getElementById('cover-upload').click()}>
              {uploadLoading ? <p>Uploading...</p> : (
                <>
                  {formData.image ? <img src={formData.image} className="preview-img" alt="Preview" /> : (
                    <div style={{padding: '2rem'}}>
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{opacity: 0.75}}>
                        <rect x="3" y="3" width="18" height="18" rx="3"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                      <p className="upload-label">Click to choose or drag image</p>
                    </div>
                  )}
                  <input id="cover-upload" type="file" hidden onChange={(e) => handleImageUpload(e, 'image')} accept="image/*" />
                </>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Detailed Description</label>
            <textarea rows="6" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Describe the amazing journey..."></textarea>
          </div>

          {/* Gallery Section */}
          <div className="list-editor">
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1.5rem', alignItems:'center'}}>
               <h3 style={{fontSize:'1.2rem'}}>Gallery Images</h3>
               <button type="button" className="add-list-btn" onClick={() => addToList('gallery')}>+ Add Image Slot</button>
            </div>
            <div style={{display:'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem'}}>
              {formData.gallery.map((img, i) => (
                <div key={i} className="list-item-row" style={{flexDirection: 'column', alignItems: 'stretch'}}>
                  <div className="image-upload-wrapper" style={{padding: '1rem'}} onClick={() => document.getElementById(`gallery-upload-${i}`).click()}>
                    {img ? <img src={img} style={{height:'100px'}} className="preview-img" alt="Gallery" /> : <p style={{fontSize:'0.8rem'}}>Upload Gallery Image</p>}
                    <input id={`gallery-upload-${i}`} type="file" hidden onChange={(e) => handleImageUpload(e, 'gallery', i)} accept="image/*" />
                  </div>
                  <button type="button" className="remove-btn" style={{width:'100%', marginTop:'0.5rem', height:'35px'}} onClick={() => removeFromList('gallery', i)}>Remove</button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Short Description (Single Line Pitch)</label>
            <input 
              value={formData.shortDescription} 
              onChange={(e) => setFormData({...formData, shortDescription: e.target.value})} 
              placeholder="e.g. Experience the wild heart of Sri Lanka in a luxurious safari adventure..."
            />
          </div>

          <div className="form-group">
            <label>Detailed Trip Description</label>
            <textarea 
              rows="6" 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
              placeholder="Detailed overview of the journey..."
            />
          </div>

          <div className="form-grid">
            <div className="form-group"><label>Rating (e.g. 4.8)</label><input type="text" value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})} /></div>
            <div className="form-group"><label>Bookings Count (e.g. 150+)</label><input type="text" value={formData.bookings} onChange={(e) => setFormData({...formData, bookings: e.target.value})} /></div>
          </div>

          <div className="list-editor">
             <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1.5rem', alignItems:'center'}}>
               <h3 style={{fontSize:'1.2rem', fontWeight: 900}}>Cities Covered</h3>
               <button type="button" className="add-list-btn" onClick={() => addToList('locations')}>+ Add City</button>
             </div>
             <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'0.8rem'}}>
               {formData.locations.map((loc, i) => (
                 <div key={i} className="list-item-row" style={{marginBottom: 0}}>
                   <input value={loc} onChange={(e) => updateListField('locations', i, e.target.value)} placeholder="e.g. Yala" />
                   <button type="button" className="remove-btn" onClick={() => removeFromList('locations', i)}>x</button>
                 </div>
               ))}
             </div>
          </div>

          <div className="list-editor">
             <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1.5rem', alignItems:'center'}}>
               <h3 style={{fontSize:'1.2rem', fontWeight: 900}}>Highlights (Why travelers love this)</h3>
               <button type="button" className="add-list-btn" onClick={() => addToList('highlights')}>+ Add Highlight</button>
             </div>
             {formData.highlights.map((h, i) => (
               <div key={i} className="list-item-row">
                 <input value={h} onChange={(e) => updateListField('highlights', i, e.target.value)} placeholder="e.g. High leopard spotting success rates..." />
                 <button type="button" className="remove-btn" onClick={() => removeFromList('highlights', i)}>x</button>
               </div>
             ))}
          </div>

          <div className="list-editor">
             <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1.5rem', alignItems:'center'}}>
               <h3 style={{fontSize:'1.2rem', fontWeight: 900}}>Inclusions</h3>
               <button type="button" className="add-list-btn" onClick={() => addToList('inclusions')}>+ Add Inclusion</button>
             </div>
             <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.8rem'}}>
               {formData.inclusions.map((item, i) => (
                 <div key={i} className="list-item-row" style={{marginBottom: 0}}>
                   <input value={item} onChange={(e) => updateListField('inclusions', i, e.target.value)} placeholder="e.g. Luxury Tent Stay" />
                   <button type="button" className="remove-btn" onClick={() => removeFromList('inclusions', i)}>x</button>
                 </div>
               ))}
             </div>
          </div>

          <div className="list-editor">
             <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1.5rem', alignItems:'center'}}>
               <h3 style={{fontSize:'1.2rem', fontWeight: 900}}>Exclusions</h3>
               <button type="button" className="add-list-btn" onClick={() => addToList('exclusions')}>+ Add Exclusion</button>
             </div>
             <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.8rem'}}>
               {formData.exclusions.map((item, i) => (
                 <div key={i} className="list-item-row" style={{marginBottom: 0}}>
                   <input value={item} onChange={(e) => updateListField('exclusions', i, e.target.value)} placeholder="e.g. International Flights" />
                   <button type="button" className="remove-btn" onClick={() => removeFromList('exclusions', i)}>x</button>
                 </div>
               ))}
             </div>
          </div>

          <div className="list-editor">
             <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1.5rem', alignItems:'center'}}>
               <h3 style={{fontSize:'1.2rem', fontWeight: 900}}>Journey Roadmap (Itinerary)</h3>
               <button type="button" className="add-list-btn" onClick={() => {
                 setFormData({...formData, itinerary: [...formData.itinerary, { day: formData.itinerary.length + 1, title: '', desc: '' }]});
               }}>+ Add Day</button>
             </div>
             {formData.itinerary.map((day, i) => (
               <div key={i} style={{background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '25px', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.05)'}}>
                 <div style={{display:'flex', gap: '2rem', alignItems: 'center'}}>
                    <div style={{minWidth: '50px', height: '50px', background: 'var(--primary)', color: 'black', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900}}>0{day.day}</div>
                    <div style={{flex: 1}}>
                      <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
                        <input style={{flex: 1}} value={day.title} onChange={(e) => {
                          const newItin = [...formData.itinerary];
                          newItin[i].title = e.target.value;
                          setFormData({...formData, itinerary: newItin});
                        }} placeholder="Day Title (e.g. Arrival & Evening Safari)" />
                        <button type="button" className="remove-btn" onClick={() => {
                          const newItin = formData.itinerary.filter((_, idx) => idx !== i).map((d, idx) => ({...d, day: idx + 1}));
                          setFormData({...formData, itinerary: newItin});
                        }}>x</button>
                      </div>
                      <textarea rows="3" value={day.desc} onChange={(e) => {
                        const newItin = [...formData.itinerary];
                        newItin[i].desc = e.target.value;
                        setFormData({...formData, itinerary: newItin});
                      }} placeholder="Day Description..." />
                    </div>
                 </div>
               </div>
             ))}
          </div>

          <div style={{marginTop:'5rem', textAlign: 'center'}}>
            <button type="submit" className="btn-primary-admin">{editingPkg ? 'Update & Save Changes' : 'Publish New Journey'}</button>
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
          margin-top: 2rem; 
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
        .pkg-table tr:hover { background: rgba(255, 255, 255, 0.05); transform: scale(1.01); }
        .pkg-table td { padding: 1.5rem 2rem; }
        .pkg-table td:first-child { border-radius: 20px 0 0 20px; }
        .pkg-table td:last-child { border-radius: 0 20px 20px 0; }
        
        .pkg-row-img { width: 80px; height: 55px; border-radius: 12px; object-fit: cover; box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
        .action-btns { display: flex; gap: 0.8rem; }
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
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
        }
        .btn-edit-action:hover { 
          background: #3366ff; 
          color: white; 
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(51, 102, 255, 0.2);
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
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-delete-action:hover { 
          background: #ff4b4b; 
          color: white; 
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(255, 75, 75, 0.2);
        }
        
        .status-badge { background: rgba(198, 255, 0, 0.1); color: var(--primary, #c6ff00); padding: 0.4rem 0.8rem; border-radius: 8px; font-size: 0.75rem; font-weight: 800; }

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
      `}</style>

      <div className="view-header">
        <h1 className="view-title">Manage Journeys</h1>
        <button className="btn-primary-admin" onClick={() => {
           setFormData({
            title: '', 
            category: categories.length > 0 ? categories[0].name : '', 
            duration: '', 
            price: '', 
            originalPrice: '',
            rating: 4.5, 
            bookings: '0+', 
            type: 'All Inclusive', 
            image: '', 
            shortDescription: '',
            description: '',
            gallery: [], 
            locations: [], 
            inclusions: [], 
            exclusions: [], 
            highlights: [], 
            itinerary: []
          });
          setIsFormOpen(true);
        }}>+ Add New Package</button>
      </div>

      {loading ? <p>Loading journeys...</p> : (
        <table className="pkg-table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Journey Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map(pkg => (
              <tr key={pkg.id}>
                <td><img src={pkg.image} className="pkg-row-img" alt={pkg.title} /></td>
                <td>
                  <div style={{fontWeight:900, fontSize:'1.1rem'}}>{pkg.title}</div>
                  <div style={{opacity:0.4, fontSize:'0.8rem'}}>{pkg.duration}</div>
                </td>
                <td><span className="status-badge" style={{background: 'rgba(255,255,255,0.05)', color: 'white', opacity: 0.6}}>{pkg.category}</span></td>
                <td><span className="status-badge">Live</span></td>
                <td style={{fontWeight: 900, color: 'var(--primary, #c6ff00)', fontSize: '1.2rem'}}>${pkg.price}</td>
                <td>
                  <div className="action-btns">
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

export default AdminPackages;



