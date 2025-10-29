import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/CTASection.css';

const CTASection = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLearnMoreClick = () => {
    navigate('/about');
  };

  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">Sẵn sàng khám phá?</h2>
        <p className="cta-subtitle">
          Tham gia cộng đồng Unitaste để chia sẻ trải nghiệm ẩm thực của bạn
        </p>
        <div className="cta-buttons">
          <button className="cta-button primary" onClick={handleRegisterClick}>
            Đăng ký ngay
          </button>
          <button className="cta-button secondary" onClick={handleLearnMoreClick}>
            Tìm hiểu thêm
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
