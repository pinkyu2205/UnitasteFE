import React from 'react';
import '../CSS/FeaturesSection.css';

const FeaturesSection = () => {
  const features = [
    {
      icon: '🍽️',
      title: 'Khám phá nhà hàng',
      description: 'Tìm kiếm các nhà hàng ngon nhất dựa trên vị trí và sở thích của bạn'
    },
    {
      icon: '⭐',
      title: 'Đánh giá chính xác',
      description: 'Đọc và viết đánh giá từ cộng đồng để đưa ra quyết định tốt nhất'
    },
    {
      icon: '🗺️',
      title: 'Bản đồ thông minh',
      description: 'Xem vị trí nhà hàng trên bản đồ và tìm đường đi thuận tiện nhất'
    }
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        <h2 className="section-title">Tại sao chọn Unitaste?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
