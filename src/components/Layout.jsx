
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from './AuthContext';

const Layout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Check if current page is dashboard or profile page
  const isDashboardPage = location.pathname.includes('/teacher') || 
                          location.pathname.includes('/student') || 
                          location.pathname.includes('/admin') ||
                          location.pathname.includes('/profile');
  
  // Check if current page is login page
  const isLoginPage = location.pathname === '/login';
  
  return (
    <>
      {!isDashboardPage && <Navbar />}
      <div className={`min-h-screen ${!isDashboardPage ? 'pt-16' : ''}`}>
        <Outlet />
      </div>
      {!isDashboardPage && <Footer />}
    </>
  );
};

export default Layout;
