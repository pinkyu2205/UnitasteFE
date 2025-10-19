import React from 'react';
import '../CSS/HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          Khám phá ẩm thực tuyệt vời
        </h1>
        <p className="hero-subtitle">
          Tìm kiếm và đánh giá các nhà hàng ngon nhất trong khu vực của bạn
        </p>
        <button className="hero-button">
          Bắt đầu khám phá
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
