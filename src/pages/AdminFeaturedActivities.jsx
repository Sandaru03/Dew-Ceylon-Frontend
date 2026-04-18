import React, { useState, useEffect } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminFeaturedActivities = () => {
  const [allActivities, setAllActivities] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const [actRes, featuredRes] = await Promise.all([
          fetch(API_BASE_URL + '/api/activities'),
          fetch(API_BASE_URL + '/api/featured-activities/ids', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);
        const activities = await actRes.json();
        const featuredIds = await featuredRes.json();
        
        // Ensure activities is an array, though it might error if API fails
        if (Array.isArray(activities)) {
          setAllActivities([...activities].sort((a, b) => b.id - a.id));
        } else {
          setAllActivities([]);
        }
        
        const parsedFeatured = Array.isArray(featuredIds) 
          ? featuredIds.map(item => ({...item, id: Number(item.id)})) 
          : [];
        setSelectedItems(parsedFeatured);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleActivity = (id) => {
    setSelectedItems(prev => {
      const exists = prev.find(item => item.id === id);
      if (exists) {
        return prev.filter(item => item.id !== id);
      }
      if (prev.length >= 4) {
        return [...prev.slice(0, 3), { id, discount: null }];
      }
      return [...prev, { id, discount: null }];
    });
    setSaved(false);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const newItems = [...selectedItems];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    setSelectedItems(newItems);
    setSaved(false);
  };

  const moveDown = (index) => {
    if (index === selectedItems.length - 1) return;
    const newItems = [...selectedItems];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    setSelectedItems(newItems);
    setSaved(false);
  };

  const updateDiscount = (index, val) => {
    const newItems = [...selectedItems];
    newItems[index].discount = val ? Number(val) : null;
    setSelectedItems(newItems);
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(API_BASE_URL + '/api/featured-activities', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ ids: selectedItems })
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const getActivityById = (id) => allActivities.find(a => a.id === id);

  return (
    <div className="fp-page animate-fade-in">
      <style>{`
        .fp-page { width: 100%; }

        .fp-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 4rem;
          gap: 2rem;
        }
        .fp-title { font-size: 2.8rem; font-weight: 900; letter-spacing: -2px; }
        .fp-subtitle { opacity: 0.4; font-size: 0.9rem; margin-top: 0.5rem; }

        .fp-layout {
          display: grid;
          grid-template-columns: 1fr 460px;
          gap: 3rem;
          align-items: start;
        }

        /* All Activities Grid */
        .fp-all-title {
          font-size: 0.72rem;
          font-weight: 800;
          opacity: 0.4;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1.5rem;
        }
        .fp-pkg-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1.2rem;
        }
        .fp-pkg-tile {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          height: 180px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }
        .fp-pkg-tile:hover { transform: translateY(-4px); }
        .fp-pkg-tile.selected {
          border-color: var(--primary, #c6ff00);
          box-shadow: 0 0 0 4px rgba(198,255,0,0.15);
        }
        .fp-pkg-tile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .fp-pkg-tile-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1rem;
        }
        .fp-pkg-tile.selected .fp-pkg-tile-overlay {
          background: linear-gradient(to top, rgba(10,30,10,0.85) 0%, rgba(0,0,0,0.15) 100%);
        }
        .fp-pkg-tile-name { color: white; font-size: 0.85rem; font-weight: 800; text-transform: uppercase; margin: 0; }
        .fp-pkg-tile-dur { color: rgba(255,255,255,0.6); font-size: 0.72rem; margin-top: 2px; }
        .fp-checkmark {
          position: absolute;
          top: 0.7rem;
          right: 0.7rem;
          width: 28px; height: 28px;
          border-radius: 8px;
          background: var(--primary, #c6ff00);
          color: black;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem;
          font-weight: 900;
        }
        .fp-slot-badge {
          position: absolute;
          top: 0.7rem;
          right: 0.7rem;
          width: 28px; height: 28px;
          border-radius: 8px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          color: white;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem;
          font-weight: 900;
        }
        .fp-no-packages {
          text-align: center;
          padding: 4rem;
          opacity: 0.4;
          grid-column: 1 / -1;
        }

        /* Selected Panel */
        .fp-selected-panel {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 30px;
          padding: 2.5rem;
          position: sticky;
          top: 100px;
        }
        .fp-panel-title {
          font-size: 0.72rem;
          font-weight: 800;
          opacity: 0.4;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 2rem;
        }
        .fp-slots {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }
        .fp-slot {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .fp-slot.empty {
          border-style: dashed;
          opacity: 0.35;
          justify-content: center;
        }
        .fp-slot-num {
          width: 32px; height: 32px;
          border-radius: 10px;
          background: var(--primary, #c6ff00);
          color: black;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem;
          font-weight: 900;
          flex-shrink: 0;
        }
        .fp-slot-img {
          width: 44px; height: 44px;
          border-radius: 10px;
          object-fit: cover;
          flex-shrink: 0;
        }
        .fp-slot-info { flex: 1; min-width: 0; }
        .fp-slot-name { font-size: 0.85rem; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .fp-slot-cat { font-size: 0.72rem; opacity: 0.4; margin-top: 2px; }
        .fp-slot-actions { display: flex; flex-direction: column; gap: 3px; }
        .fp-arr-btn {
          background: rgba(255,255,255,0.05);
          border: none;
          color: white;
          width: 24px; height: 24px;
          border-radius: 6px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s ease;
          font-size: 0.7rem;
        }
        .fp-arr-btn:hover { background: rgba(255,255,255,0.15); }
        .fp-remove-btn {
          background: rgba(255,75,75,0.08);
          border: none;
          color: #ff6b6b;
          width: 28px; height: 28px;
          border-radius: 8px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .fp-remove-btn:hover { background: #ff4b4b; color: white; }

        .btn-save-featured {
          width: 100%;
          padding: 1.2rem;
          background: linear-gradient(135deg, #c6ff00 0%, #a2d200 100%);
          color: black;
          border: none;
          border-radius: 18px;
          font-weight: 950;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175,0.885,0.32,1.275);
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 10px 30px rgba(198,255,0,0.2);
        }
        .btn-save-featured:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 18px 40px rgba(198,255,0,0.35); }
        .btn-save-featured:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-save-featured.saved { background: linear-gradient(135deg, #00c853, #00a040); color: white; box-shadow: 0 10px 30px rgba(0,200,83,0.25); }

        .fp-counter {
          text-align: center;
          font-size: 0.8rem;
          opacity: 0.4;
          margin-bottom: 1.5rem;
          font-weight: 700;
        }
        .fp-counter span { color: var(--primary, #c6ff00); opacity: 1; }

        @media (max-width: 1100px) {
          .fp-layout { grid-template-columns: 1fr; }
          .fp-selected-panel { position: static; }
        }
      `}</style>

      <div className="fp-header">
        <div>
          <h1 className="fp-title">Featured Activities</h1>
          <p className="fp-subtitle">Select up to 4 activities to feature in the "Popular Activities" section on the homepage.</p>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '6rem', opacity: 0.4 }}>Loading activities...</div>
      ) : (
        <div className="fp-layout">
          {/* Left: All activities grid */}
          <div>
            <p className="fp-all-title">All Activities - click to select/deselect</p>
            {allActivities.length === 0 ? (
              <div className="fp-pkg-grid">
                <div className="fp-no-packages">
                  <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>No Items</p>
                  <p>No activities found. Add activities in the Manage section first.</p>
                </div>
              </div>
            ) : (
              <div className="fp-pkg-grid">
                {allActivities.map((act) => {
                  const isSelected = selectedItems.some(i => i.id === act.id);
                  const slotIndex = selectedItems.findIndex(i => i.id === act.id);
                  return (
                    <div
                      key={act.id}
                      className={`fp-pkg-tile ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleActivity(act.id)}
                    >
                      {act.image ? (
                        <img src={act.image} alt={act.title} className="fp-pkg-tile-img" />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: '#1a1a1a' }} />
                      )}
                      <div className="fp-pkg-tile-overlay">
                        <p className="fp-pkg-tile-name">{act.title}</p>
                        <p className="fp-pkg-tile-dur">{act.category}</p>
                      </div>
                      {isSelected ? (
                        <div className="fp-checkmark">#{slotIndex + 1}</div>
                      ) : (
                        selectedItems.length < 4 && (
                          <div className="fp-slot-badge">+</div>
                        )
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: Selected panel */}
          <div className="fp-selected-panel">
            <p className="fp-panel-title">Selected for Homepage</p>
            <div className="fp-counter">
              <span>{selectedItems.length}</span> / 4 activities selected
            </div>
            <div className="fp-slots">
              {[0, 1, 2, 3].map((slotIdx) => {
                const item = selectedItems[slotIdx];
                const actId = item ? item.id : null;
                const act = actId ? getActivityById(actId) : null;
                if (!act) {
                  return (
                    <div key={slotIdx} className="fp-slot empty">
                      <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>Slot {slotIdx + 1} - empty</span>
                    </div>
                  );
                }
                return (
                  <div key={slotIdx} className="fp-slot">
                    <div className="fp-slot-num">{slotIdx + 1}</div>
                    {act.image && <img src={act.image} alt={act.title} className="fp-slot-img" />}
                    <div className="fp-slot-info">
                      <div className="fp-slot-name">{act.title}</div>
                      <div className="fp-slot-cat">{act.category}</div>
                    </div>
                    <div className="fp-slot-disc" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', marginBottom: '4px' }}>Discount</span>
                      <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '0.2rem 0.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <input 
                          type="number" 
                          min="0"
                          max="100"
                          placeholder="0"
                          value={item.discount || ''}
                          onChange={(e) => updateDiscount(slotIdx, e.target.value)}
                          style={{ width: '35px', background: 'transparent', border: 'none', color: '#c6ff00', fontSize: '0.9rem', fontWeight: 800, outline: 'none', textAlign: 'center', padding: 0 }}
                          title="Enter Discount Percentage"
                        />
                        <span style={{ color: '#c6ff00', fontWeight: 800, fontSize: '0.8rem', marginLeft: '2px' }}>%</span>
                      </div>
                    </div>
                    <div className="fp-slot-actions" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <button className="fp-arr-btn" onClick={() => moveUp(slotIdx)} title="Move up">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 15l-6-6-6 6"/></svg>
                      </button>
                      <button className="fp-arr-btn" onClick={() => moveDown(slotIdx)} title="Move down">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg>
                      </button>
                    </div>
                    <button
                      className="fp-remove-btn"
                      onClick={() => setSelectedItems(prev => prev.filter(i => i.id !== actId))}
                      title="Remove"
                    >x</button>
                  </div>
                );
              })}
            </div>
            <button
              className={`btn-save-featured ${saved ? 'saved' : ''}`}
              onClick={handleSave}
              disabled={saving || selectedItems.length !== 4}
            >
              {saving ? 'Saving...' : saved ? 'Saved!' : selectedItems.length < 4 ? `Select ${4 - selectedItems.length} more` : 'Save to Homepage'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeaturedActivities;
