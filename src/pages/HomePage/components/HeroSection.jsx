import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/map');
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          Khám phá ẩm thực tuyệt vời
        </h1>
        <button className="hero-button" onClick={handleExploreClick}>
          Bắt đầu khám phá
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
