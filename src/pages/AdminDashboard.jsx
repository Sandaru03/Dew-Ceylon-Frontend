import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import AdminPackages from './AdminPackages';
import AdminAdmins from './AdminAdmins';
import AdminActivities from './AdminActivities';
import AdminBlogs from './AdminBlogs';
import AdminTaxi from './AdminTaxi';
import AdminFleet from './AdminFleet';
import AdminUpcomingTrips from './AdminUpcomingTrips';
import AdminFeaturedPackages from './AdminFeaturedPackages';
import AdminCategories from './AdminCategories';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    if (!token || !user) {
      navigate('/admin');
    } else {
      setAdminUser(JSON.parse(user));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  if (!adminUser) return null;

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="admin-layout animate-fade-in">
      <style>{`
        .admin-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          min-height: 100vh;
          background: #050505;
          color: white;
          font-family: 'Inter', sans-serif;
        }

        /* Sidebar Styling */
        .admin-sidebar {
          background: rgba(15, 15, 15, 0.8);
          backdrop-filter: blur(30px);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          padding: 3.5rem;
          position: sticky;
          top: 0;
          height: 100vh;
          z-index: 100;
        }

        .sidebar-logo-container {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 6rem;
          padding: 0 0.5rem;
        }

        .sidebar-logo {
          height: 55px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logo-text {
          font-size: 1.4rem;
          font-weight: 950;
          letter-spacing: -1px;
          line-height: 1;
        }

        .logo-text span {
          display: block;
          color: var(--primary, #c6ff00);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-top: 5px;
        }

        .nav-group {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .sidebar-link {
          padding: 1.2rem 1.8rem;
          border-radius: 18px;
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
          font-weight: 700;
          font-size: 0.95rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 1.2rem;
          border: 1px solid transparent;
        }

        .sidebar-link:hover {
          background: rgba(255, 255, 255, 0.03);
          color: white;
          transform: translateX(5px);
        }

        .sidebar-link.active {
          background: var(--primary, #c6ff00);
          color: black;
          box-shadow: 0 15px 35px rgba(198, 255, 0, 0.2);
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 3rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          margin-bottom: 2.5rem;
          padding: 0 0.5rem;
        }

        .user-avatar {
          width: 50px;
          height: 50px;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          color: var(--primary, #c6ff00);
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 1.2rem;
        }

        .logout-btn-side {
          width: 100%;
          padding: 1.2rem;
          background: rgba(255, 75, 75, 0.1);
          color: #FF4B4B;
          border-radius: 15px;
          font-weight: 800;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
        }

        .logout-btn-side:hover {
          background: #FF4B4B;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(255, 75, 75, 0.3);
        }

        /* Main Content */
        .admin-main {
          padding: 5rem 6rem;
          overflow-y: auto;
          background: radial-gradient(circle at top right, rgba(198, 255, 0, 0.03), transparent 400px);
        }

        .welcome-card {
          background: rgba(255,255,255,0.02);
          padding: 4rem;
          border-radius: 40px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .welcome-title {
          font-size: 3.5rem;
          font-weight: 950;
          letter-spacing: -3px;
          margin-bottom: 1rem;
        }

        @media (max-width: 1200px) {
          .admin-layout {
            grid-template-columns: 280px 1fr;
          }

          .admin-main {
            padding: 2.5rem 2rem;
          }

          .admin-sidebar {
            padding: 2rem 1.2rem;
          }
        }

        @media (max-width: 1024px) {
          .admin-layout {
            display: block;
          }

          .admin-sidebar {
            position: static;
            height: auto;
            padding: 1.1rem;
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          }

          .sidebar-logo-container {
            margin-bottom: 1rem;
          }

          .nav-group {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.6rem;
          }

          .sidebar-link {
            padding: 0.85rem;
            font-size: 0.8rem;
            border-radius: 12px;
            gap: 0.7rem;
          }

          .sidebar-link:hover {
            transform: none;
          }

          .sidebar-footer {
            margin-top: 1.1rem;
            padding-top: 1.1rem;
          }

          .admin-main {
            padding: 1.2rem;
          }

          .welcome-card {
            padding: 1.5rem;
            border-radius: 20px;
          }

          .welcome-title {
            font-size: 1.8rem;
            letter-spacing: -1px;
          }
        }

        @media (max-width: 640px) {
          .nav-group {
            grid-template-columns: 1fr;
          }

          .user-info {
            margin-bottom: 1rem;
          }
        }
      `}</style>

      <aside className="admin-sidebar">
        <div className="sidebar-logo-container">
          <img src="/Dewlogo.jpg" alt="Dew Ceylon" className="sidebar-logo" />
          <div className="logo-text">
            DEW CEYLON
            <span>Control Panel</span>
          </div>
        </div>
        
        <nav className="nav-group">
          <Link to="/admin/dashboard/packages" className={`sidebar-link ${isActive('packages') ? 'active' : ''}`}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
             Journeys
          </Link>
          <Link to="/admin/dashboard/activities" className={`sidebar-link ${isActive('activities') ? 'active' : ''}`}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
             Activities
          </Link>
          <Link to="/admin/dashboard/blogs" className={`sidebar-link ${isActive('blogs') ? 'active' : ''}`}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
             Stories & Blogs
          </Link>
          <Link to="/admin/dashboard/admins" className={`sidebar-link ${isActive('admins') ? 'active' : ''}`}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
             Operators
          </Link>
          <Link to="/admin/dashboard/taxi" className={`sidebar-link ${isActive('taxi') ? 'active' : ''}`}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="22" height="13" rx="2" ry="2"></rect><path d="M7 21h10"></path><path d="M12 16v5"></path></svg>
             Taxi Transfers
          </Link>
          <Link to="/admin/dashboard/fleet" className={`sidebar-link ${isActive('fleet') ? 'active' : ''}`}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M7 7h10"></path><path d="M7 11h10"></path><path d="M7 15h10"></path></svg>
             Premium Fleet
          </Link>
          <Link to="/admin/dashboard/categories" className={`sidebar-link ${isActive('categories') ? 'active' : ''}`}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
             Categories
          </Link>
          <Link to="/admin/dashboard/upcoming-trips" className={`sidebar-link ${isActive('upcoming-trips') ? 'active' : ''}`}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z"></path><circle cx="12" cy="11" r="3"></circle></svg>
             Upcoming Trips
          </Link>
          <Link to="/admin/dashboard/featured" className={`sidebar-link ${isActive('featured') ? 'active' : ''}`}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
             Featured Packages
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{adminUser.name[0]}</div>
            <div>
              <p style={{fontWeight: 900, fontSize: '1rem', marginBottom: '2px'}}>{adminUser.name}</p>
              <p style={{opacity: 0.4, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px'}}>{adminUser.role}</p>
            </div>
          </div>
          <button className="logout-btn-side" onClick={handleLogout}>Log Out</button>
        </div>
      </aside>

      <main className="admin-main">
        <Routes>
          <Route path="/" element={
            <div className="welcome-card animate-fade-in-up">
              <h1 className="welcome-title">Ayubowan, {adminUser.name.split(' ')[0]}!</h1>
              <p style={{opacity: 0.5, fontSize: '1.1rem'}}>Welcome back to the Dew Ceylon Tours Control Center.</p>
            </div>
          } />
          <Route path="/packages" element={<AdminPackages />} />
          <Route path="/activities" element={<AdminActivities />} />
          <Route path="/blogs" element={<AdminBlogs />} />
          <Route path="/admins" element={<AdminAdmins />} />
          <Route path="/taxi" element={<AdminTaxi />} />
          <Route path="/fleet" element={<AdminFleet />} />
          <Route path="/categories" element={<AdminCategories />} />
          <Route path="/upcoming-trips" element={<AdminUpcomingTrips />} />
          <Route path="/featured" element={<AdminFeaturedPackages />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
