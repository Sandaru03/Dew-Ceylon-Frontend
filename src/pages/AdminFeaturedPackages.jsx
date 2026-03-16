import React, { useState, useEffect } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const AdminFeaturedPackages = () => {
  const [allPackages, setAllPackages] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const [pkgRes, featuredRes] = await Promise.all([
          fetch(API_BASE_URL + '/api/packages?includeHidden=true'),
          fetch(API_BASE_URL + '/api/featured-packages/ids', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);
        const packages = await pkgRes.json();
        const featuredIds = await featuredRes.json();
        setAllPackages([...packages].sort((a, b) => b.id - a.id));
        setSelectedIds(featuredIds);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const togglePackage = (id) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      }
      if (prev.length >= 4) {
        // Replace the last one
        return [...prev.slice(0, 3), id];
      }
      return [...prev, id];
    });
    setSaved(false);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const newIds = [...selectedIds];
    [newIds[index - 1], newIds[index]] = [newIds[index], newIds[index - 1]];
    setSelectedIds(newIds);
    setSaved(false);
  };

  const moveDown = (index) => {
    if (index === selectedIds.length - 1) return;
    const newIds = [...selectedIds];
    [newIds[index], newIds[index + 1]] = [newIds[index + 1], newIds[index]];
    setSelectedIds(newIds);
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(API_BASE_URL + '/api/featured-packages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ ids: selectedIds })
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

  const getPackageById = (id) => allPackages.find(p => p.id === id);

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
          grid-template-columns: 1fr 380px;
          gap: 3rem;
          align-items: start;
        }

        /* All Packages Grid */
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
          <h1 className="fp-title">Featured Packages</h1>
          <p className="fp-subtitle">Select exactly 4 packages to feature in the "Popular Packages" section on the homepage.</p>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '6rem', opacity: 0.4 }}>Loading packages...</div>
      ) : (
        <div className="fp-layout">
          {/* Left: All packages grid */}
          <div>
            <p className="fp-all-title">All Packages - click to select/deselect</p>
            {allPackages.length === 0 ? (
              <div className="fp-pkg-grid">
                <div className="fp-no-packages">
                  <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>No Items</p>
                  <p>No packages found. Add packages in the Journeys section first.</p>
                </div>
              </div>
            ) : (
              <div className="fp-pkg-grid">
                {allPackages.map((pkg) => {
                  const isSelected = selectedIds.includes(pkg.id);
                  const slotIndex = selectedIds.indexOf(pkg.id);
                  return (
                    <div
                      key={pkg.id}
                      className={`fp-pkg-tile ${isSelected ? 'selected' : ''}`}
                      onClick={() => togglePackage(pkg.id)}
                    >
                      {pkg.image ? (
                        <img src={pkg.image} alt={pkg.title} className="fp-pkg-tile-img" />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: '#1a1a1a' }} />
                      )}
                      <div className="fp-pkg-tile-overlay">
                        <p className="fp-pkg-tile-name">{pkg.title}</p>
                        <p className="fp-pkg-tile-dur">{pkg.duration} | {pkg.category}</p>
                      </div>
                      {isSelected ? (
                        <div className="fp-checkmark">#{slotIndex + 1}</div>
                      ) : (
                        selectedIds.length < 4 && (
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
              <span>{selectedIds.length}</span> / 4 packages selected
            </div>
            <div className="fp-slots">
              {[0, 1, 2, 3].map((slotIdx) => {
                const pkgId = selectedIds[slotIdx];
                const pkg = pkgId ? getPackageById(pkgId) : null;
                if (!pkg) {
                  return (
                    <div key={slotIdx} className="fp-slot empty">
                      <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>Slot {slotIdx + 1} - empty</span>
                    </div>
                  );
                }
                return (
                  <div key={slotIdx} className="fp-slot">
                    <div className="fp-slot-num">{slotIdx + 1}</div>
                    {pkg.image && <img src={pkg.image} alt={pkg.title} className="fp-slot-img" />}
                    <div className="fp-slot-info">
                      <div className="fp-slot-name">{pkg.title}</div>
                      <div className="fp-slot-cat">{pkg.category} | {pkg.duration}</div>
                    </div>
                    <div className="fp-slot-actions">
                      <button className="fp-arr-btn" onClick={() => moveUp(slotIdx)} title="Move up">Up</button>
                      <button className="fp-arr-btn" onClick={() => moveDown(slotIdx)} title="Move down">Down</button>
                    </div>
                    <button
                      className="fp-remove-btn"
                      onClick={() => setSelectedIds(prev => prev.filter(id => id !== pkgId))}
                      title="Remove"
                    >x</button>
                  </div>
                );
              })}
            </div>
            <button
              className={`btn-save-featured ${saved ? 'saved' : ''}`}
              onClick={handleSave}
              disabled={saving || selectedIds.length !== 4}
            >
              {saving ? 'Saving...' : saved ? 'Saved!' : selectedIds.length < 4 ? `Select ${4 - selectedIds.length} more` : 'Save to Homepage'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeaturedPackages;



