import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import RestaurantShowcase from './components/RestaurantShowcase';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import './CSS/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <RestaurantShowcase />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;