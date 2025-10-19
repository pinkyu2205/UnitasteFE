import React from 'react';
import '../CSS/RestaurantShowcase.css';

const RestaurantShowcase = () => {
  const restaurants = [
    {
      name: 'Nhà hàng ABC',
      rating: 4.8,
      reviewCount: 120,
      description: 'Nhà hàng phục vụ các món ăn truyền thống với không gian ấm cúng và dịch vụ chuyên nghiệp.'
    },
    {
      name: 'Quán XYZ',
      rating: 4.6,
      reviewCount: 89,
      description: 'Quán ăn đường phố với các món ăn nhanh ngon miệng và giá cả hợp lý.'
    },
    {
      name: 'Café DEF',
      rating: 4.4,
      reviewCount: 156,
      description: 'Quán cà phê với không gian làm việc lý tưởng và đồ uống chất lượng cao.'
    }
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
      stars += '⭐';
    }
    
    if (hasHalfStar) {
      stars += '⭐';
    }
    
    return stars;
  };

  return (
    <section className="restaurant-showcase">
      <div className="showcase-container">
        <h2 className="section-title">Nhà hàng nổi bật</h2>
        <div className="restaurant-grid">
          {restaurants.map((restaurant, index) => (
            <div key={index} className="restaurant-card">
              <div className="restaurant-image"></div>
              <div className="restaurant-info">
                <h3 className="restaurant-name">{restaurant.name}</h3>
                <div className="restaurant-rating">
                  <span className="stars">{renderStars(restaurant.rating)}</span>
                  <span className="rating-text">{restaurant.rating} ({restaurant.reviewCount} đánh giá)</span>
                </div>
                <p className="restaurant-description">{restaurant.description}</p>
                <button className="view-menu-btn">Xem thực đơn</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestaurantShowcase;
