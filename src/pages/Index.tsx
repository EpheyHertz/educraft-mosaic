
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Welcome to EduSchool
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Empowering students with quality education and innovative learning experiences.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
