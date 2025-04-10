
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="min-h-screen pt-16">
          <Outlet />
        </div>
      </main>
      {!isDashboardPage && <Footer />}
    </div>
  );
};

export default Layout;
