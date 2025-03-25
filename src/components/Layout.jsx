
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from './AuthContext';

const Layout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Check if current page is login page
  const isLoginPage = location.pathname === '/login';
  
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
