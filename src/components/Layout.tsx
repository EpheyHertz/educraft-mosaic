
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from './AuthContext';

const Layout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Only hide footer on dashboard pages
  const isDashboardPage = location.pathname.includes('/teacher') || 
                          location.pathname.includes('/student') || 
                          location.pathname.includes('/admin') ||
                          location.pathname.includes('/profile');
  
  return (
    <>
      <Navbar />
      <div className={`min-h-screen ${!isDashboardPage ? 'pt-16' : 'pt-16'}`}>
        <Outlet />
      </div>
      {!isDashboardPage && <Footer />}
    </>
  );
};

export default Layout;
