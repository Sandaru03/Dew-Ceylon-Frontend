import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';
import Loader from './components/Loader';
import './index.css';

// Lazy load components for performance
const HomePage = lazy(() => import('./pages/HomePage'));
const PackagesPage = lazy(() => import('./pages/Packages'));
const PackageOverviewPage = lazy(() => import('./pages/PackageOverviewPage'));
const Activities = lazy(() => import('./pages/Activities'));
const ActivityDetail = lazy(() => import('./pages/ActivityDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const PlanMyTrip = lazy(() => import('./pages/PlanMyTrip'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Taxi = lazy(() => import('./pages/Taxi'));
const AboutUs = lazy(() => import('./pages/AboutUs'));

const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <style>{`
        #root {
          max-width: 100vw;
          margin: 0;
          padding: 0;
          text-align: left;
        }
      `}</style>
      
      {!isAdmin && (
        <>
          {loading && <Loader onFinish={() => setLoading(false)} />}
          <Navbar />
          <WhatsAppButton />
        </>
      )}

      <Suspense fallback={<div style={{background: '#0F0F0F', height: '100vh', width: '100vw'}}></div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/package/:id" element={<PackageOverviewPage />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<ActivityDetail />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/plan-my-trip" element={<PlanMyTrip />} />
          <Route path="/taxi" element={<Taxi />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
