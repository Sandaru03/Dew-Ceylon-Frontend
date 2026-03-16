import React, { useState, useEffect } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Form States
  const [formData, setFormData] = useState({
    title: '', excerpt: '', content: '', image: '', images: [], author: 'Ceyloria Team', category: 'Travel Tips', anchor: '', link: '#'
  });



  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL + '/api/blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(API_BASE_URL + '/api/categories?type=blog');
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
        if (field === 'images' && index !== null) {
          const newImages = [...formData.images];
          newImages[index] = data.imageUrl;
          setFormData({ ...formData, images: newImages });
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

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    
    // images is stored as JSON in the database, parse it if necessary
    let parsedImages = [];
    if (blog.images) {
       if (typeof blog.images === 'string') {
          try { parsedImages = JSON.parse(blog.images); } catch(e) {}
       } else {
          parsedImages = blog.images;
       }
    }

    setFormData({
      ...blog,
      images: parsedImages
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this story?')) return;
    try {
      await fetch(API_BASE_URL + `/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Auto-generate anchor from title if empty
    let finalAnchor = formData.anchor;
    if (!finalAnchor) finalAnchor = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const submitData = { ...formData, anchor: finalAnchor };

    const url = editingBlog ? API_BASE_URL + `/api/blogs/${editingBlog.id}` : API_BASE_URL + '/api/blogs';
    const method = editingBlog ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(submitData)
      });

      if (response.ok) {
        setIsFormOpen(false);
        setEditingBlog(null);
        fetchBlogs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addToList = (field) => {
    setFormData({...formData, [field]: [...formData[field], '']});
  };

  const removeFromList = (field, index) => {
    const newList = formData[field].filter((_, i) => i !== index);
    setFormData({...formData, [field]: newList});
  };

  if (isFormOpen) {
    return (
      <div className="admin-form-view animate-fade-in">
        <style>{`
          .admin-form-view { background: rgba(15, 15, 15, 0.85); backdrop-filter: blur(40px); padding: 5rem; border-radius: 40px; border: 1px solid rgba(255, 255, 255, 0.1); max-width: 1100px; margin: 0 auto; position: relative; box-shadow: 0 40px 100px rgba(0,0,0,0.6); }
          .form-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5rem; }
          .form-header h2 { font-size: 2.8rem; font-weight: 950; letter-spacing: -2px; }
          .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
          .form-group { margin-bottom: 2.5rem; }
          .form-group label { display: block; font-size: 0.75rem; opacity: 0.4; margin-bottom: 1rem; text-transform: uppercase; font-weight: 800; letter-spacing: 1.5px; }
          .form-group input, .form-group textarea, .form-group select { width: 100%; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); padding: 1.4rem; border-radius: 20px; color: white; font-weight: 600; font-size: 1rem; transition: all 0.3s ease; }
          .form-group input:focus, .form-group textarea:focus, .form-group select:focus { border-color: var(--primary, #c6ff00); outline: none; background: rgba(255, 255, 255, 0.06); }
          .image-upload-wrapper { background: rgba(255, 255, 255, 0.02); border: 2px dashed rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 2rem; text-align: center; cursor: pointer; }
          .preview-img { width: 100%; height: 200px; object-fit: cover; border-radius: 12px; margin-bottom: 1rem; }
          .list-editor { margin-top: 4rem; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 3rem; }
          .list-item-row { display: flex; gap: 1rem; margin-bottom: 1rem; align-items: center; }
          .list-editor input:not([type="file"]), .list-editor textarea { width: 100%; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); padding: 1.4rem; border-radius: 20px; color: white; font-weight: 600; font-size: 1rem; transition: all 0.3s ease; }
          .list-editor input:not([type="file"]):focus, .list-editor textarea:focus { border-color: var(--primary, #c6ff00); outline: none; background: rgba(255, 255, 255, 0.06); }
          .remove-btn { background: rgba(255, 75, 75, 0.1); color: #FF4B4B; border: none; width: 45px; height: 45px; border-radius: 12px; cursor: pointer; font-weight: 800; }
          .btn-primary-admin { background: linear-gradient(135deg, #c6ff00 0%, #a2d200 100%); color: black; padding: 1.2rem 3rem; border-radius: 20px; font-weight: 950; border: none; cursor: pointer; text-transform: uppercase; }
          .btn-secondary-admin { background: rgba(255, 255, 255, 0.03); color: white; padding: 1.2rem 2.5rem; border-radius: 20px; font-weight: 800; border: 1px solid rgba(255, 255, 255, 0.1); cursor: pointer; }
          .add-list-btn { background: rgba(198, 255, 0, 0.08); color: var(--primary, #c6ff00); padding: 0.7rem 1.4rem; border-radius: 12px; border: 1px solid rgba(198, 255, 0, 0.2); font-weight: 800; cursor: pointer; text-transform: uppercase; }
        `}</style>

        <div className="form-header">
          <h2>{editingBlog ? 'Edit Story' : 'Write New Story'}</h2>
          <button className="btn-secondary-admin" onClick={() => {setIsFormOpen(false); setEditingBlog(null);}}>Cancel</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Story Title</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required placeholder="e.g. A Journey Through the Tea Country" />
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
            <div className="form-group">
               <label>Author</label>
               <input type="text" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} placeholder="e.g. Ceyloria Team" />
            </div>
            <div className="form-group">
               <label>Anchor id (URL Slug)</label>
               <input type="text" value={formData.anchor} onChange={(e) => setFormData({...formData, anchor: e.target.value})} placeholder="e.g. tea-country-journey (auto-generated if empty)" />
            </div>
          </div>

          <div className="form-group">
            <label>Short Excerpt (Introductory snippet)</label>
            <input type="text" value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} required placeholder="e.g. The misty hills of Nuwara Eliya promise..." />
          </div>

          <div className="form-group">
            <label>Main Cover Image</label>
            <div className="image-upload-wrapper" onClick={() => document.getElementById('cover-upload').click()}>
              {uploadLoading ? <p>Uploading...</p> : (
                <>
                  {formData.image ? <img src={formData.image} className="preview-img" alt="Preview" /> : <p>Click to choose image</p>}
                  <input id="cover-upload" type="file" hidden onChange={(e) => handleImageUpload(e, 'image')} accept="image/*" />
                </>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Full Content (Markdown/Text)</label>
            <textarea rows="15" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} required placeholder="Write the story... Use paragraphs and plain text."></textarea>
          </div>

          {/* Optional inline images gallery */}
          <div className="list-editor">
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1.5rem', alignItems:'center'}}>
               <h3 style={{fontSize:'1.2rem'}}>Story Embedded Images (Optional)</h3>
               <button type="button" className="add-list-btn" onClick={() => addToList('images')}>+ Add Image Slot</button>
            </div>
            <div style={{display:'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem'}}>
              {formData.images.map((img, i) => (
                <div key={i} className="list-item-row" style={{flexDirection: 'column', alignItems: 'stretch'}}>
                  <div className="image-upload-wrapper" style={{padding: '1rem'}} onClick={() => document.getElementById(`gall-upload-${i}`).click()}>
                    {img ? <img src={img} style={{height:'100px'}} className="preview-img" alt="Gallery" /> : <p style={{fontSize:'0.8rem'}}>Upload Content Image</p>}
                    <input id={`gall-upload-${i}`} type="file" hidden onChange={(e) => handleImageUpload(e, 'images', i)} accept="image/*" />
                  </div>
                  <button type="button" className="remove-btn" style={{width:'100%', marginTop:'0.5rem', height:'35px'}} onClick={() => removeFromList('images', i)}>Remove</button>
                </div>
              ))}
            </div>
          </div>

          <div style={{marginTop:'5rem', textAlign: 'center'}}>
            <button type="submit" className="btn-primary-admin">{editingBlog ? 'Update Story' : 'Publish Story'}</button>
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
        .pkg-table { width: 100%; border-collapse: separate; border-spacing: 0 1rem; margin-top: 2rem; }
        .pkg-table th { text-align: left; padding: 1rem 2rem; opacity: 0.3; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; }
        .pkg-table tr { background: rgba(255, 255, 255, 0.02); transition: all 0.3s ease; }
        .pkg-table tr:hover { background: rgba(255, 255, 255, 0.05); transform: scale(1.01); }
        .pkg-table td { padding: 1.5rem 2rem; }
        .pkg-table td:first-child { border-radius: 20px 0 0 20px; }
        .pkg-table td:last-child { border-radius: 0 20px 20px 0; }
        .pkg-row-img { width: 80px; height: 55px; border-radius: 12px; object-fit: cover; }
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
        }
        .btn-delete-action:hover {
          background: #ff4b4b;
          color: white;
          transform: translateY(-2px);
        }
        .status-badge { background: rgba(198, 255, 0, 0.1); color: var(--primary, #c6ff00); padding: 0.4rem 0.8rem; border-radius: 8px; font-size: 0.75rem; font-weight: 800; }
        .btn-primary-admin { background: linear-gradient(135deg, #c6ff00 0%, #a2d200 100%); color: black; padding: 1.2rem 3rem; border-radius: 20px; font-weight: 950; border: none; cursor: pointer; text-transform: uppercase; }
      `}</style>

      <div className="view-header">
        <h1 className="view-title">Manage Stories</h1>
        <button className="btn-primary-admin" onClick={() => {
           setFormData({
            title: '', excerpt: '', content: '', image: '', images: [], author: 'Ceyloria Team', category: categories.length > 0 ? categories[0].name : '', anchor: '', link: '#'
          });
          setIsFormOpen(true);
        }}>+ Write New Story</button>
      </div>

      {loading ? <p>Loading stories...</p> : (
        <table className="pkg-table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Story Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog.id}>
                <td><img src={blog.image} className="pkg-row-img" alt={blog.title} /></td>
                <td>
                  <div style={{fontWeight:900, fontSize:'1.1rem'}}>{blog.title}</div>
                  <div style={{opacity:0.6, fontSize:'0.8rem'}}>{new Date(blog.created_at).toLocaleDateString()}</div>
                </td>
                <td><span className="status-badge" style={{background: 'rgba(255,255,255,0.05)', color: 'white', opacity: 0.6}}>{blog.category}</span></td>
                <td><div style={{opacity:0.8, fontSize:'0.9rem'}}>{blog.author}</div></td>
                <td>
                  <div className="action-btns">
                    <button className="btn-edit-action" onClick={() => handleEdit(blog)} title="Edit">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                      </svg>
                    </button>
                    <button className="btn-delete-action" onClick={() => handleDelete(blog.id)} title="Delete">
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

export default AdminBlogs;


