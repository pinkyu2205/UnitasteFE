// src/components/RestaurantInfoWindow.jsx

import { InfoWindow } from '@vis.gl/react-google-maps'
import { useState } from 'react'
import './CSS/RestaurantInfoWindow.css'

/**
 * Component hiển thị thông tin chi tiết nhà hàng với UI đẹp mắt
 * @param {Object} restaurant - Thông tin nhà hàng
 * @param {function} onClose - Callback khi đóng
 * @param {function} onGetDirections - Callback khi nhấn nút chỉ đường
 */
const RestaurantInfoWindow = ({ restaurant, onClose, onGetDirections }) => {
  const [showHoursDetail, setShowHoursDetail] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!restaurant) return null

  // Mock images - thực tế sẽ lấy từ restaurant.images
  const images = [
    restaurant.coverImageUrl ||
      'https://via.placeholder.com/1920x1080/667eea/ffffff?text=Restaurant+Image',
    'https://via.placeholder.com/1920x1080/764ba2/ffffff?text=Image+2',
    'https://via.placeholder.com/1920x1080/f093fb/ffffff?text=Image+3',
  ]

  function parseOpeningHours(hoursString) {
    if (typeof hoursString !== 'string') {
      return []
    }

    return hoursString.split(';').map((item) => item.trim())
  }

  const openingHoursArray = parseOpeningHours(restaurant.openingHours)

  const renderStars = (rating) => {
    if (!rating) return <span className='no-rating'>Chưa có đánh giá</span>

    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className='star-rating'>
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className='star star-full'>
            ★
          </span>
        ))}
        {hasHalfStar && <span className='star star-half'>★</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className='star star-empty'>
            ★
          </span>
        ))}
        <span className='rating-number'>{rating}</span>
      </div>
    )
  }

  const nextImage = (e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <InfoWindow
      position={{
        lat: parseFloat(restaurant.latitude),
        lng: parseFloat(restaurant.longitude),
      }}
      onCloseClick={onClose}
    >
      <div className='restaurant-info-container'>
        {/* Image Gallery */}
        <div className='image-gallery'>
          <div className='image-wrapper'>
            <img
              src={images[currentImageIndex]}
              alt={restaurant.name}
              className='restaurant-image'
            />
            <div className='image-overlay'>
              <span className='image-counter'>
                {currentImageIndex + 1} / {images.length}
              </span>
            </div>
          </div>

          {images.length > 1 && (
            <>
              <button
                className='image-nav-btn prev-btn'
                onClick={prevImage}
                aria-label='Ảnh trước'
              >
                ‹
              </button>
              <button
                className='image-nav-btn next-btn'
                onClick={nextImage}
                aria-label='Ảnh tiếp'
              >
                ›
              </button>
            </>
          )}

          {/* Image Dots */}
          {images.length > 1 && (
            <div className='image-dots'>
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${
                    index === currentImageIndex ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(index)
                  }}
                  aria-label={`Ảnh ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Restaurant Info */}
        <div className='restaurant-details'>
          <h3 className='restaurant-name'>{restaurant.name}</h3>

          <div className='info-section'>
            <div className='info-item'>
              <span className='info-icon'>📍</span>
              <div className='info-content'>
                <span className='info-label'>Địa chỉ</span>
                <span className='info-value'>{restaurant.address}</span>
              </div>
            </div>

            <div className='info-item'>
              <span className='info-icon'>📞</span>
              <div className='info-content'>
                <span className='info-label'>Số điện thoại</span>
                <span className='info-value'>
                  {restaurant.phone && restaurant.phone !== 'Chưa cập nhật'
                    ? restaurant.phone
                    : 'Không có'}
                </span>
              </div>
            </div>

            <div className='info-item'>
              <span className='info-icon'>🌐</span>
              <div className='info-content'>
                <span className='info-label'>Website</span>
                {restaurant.website &&
                restaurant.website !== 'Chưa cập nhật' ? (
                  <a
                    href={restaurant.website}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='info-value website-link'
                    onClick={(e) => e.stopPropagation()}
                  >
                    {restaurant.website}
                  </a>
                ) : (
                  <span className='info-value'>Không có</span>
                )}
              </div>
            </div>

            <div className='info-item'>
              <span className='info-icon'>⭐</span>
              <div className='info-content'>
                <span className='info-label'>Đánh giá</span>
                {renderStars(restaurant.googleRating)}
              </div>
            </div>

            {/* Opening Hours Dropdown */}
            <div className='info-item hours-section'>
              <span className='info-icon'>🕒</span>
              <div className='info-content'>
                <button
                  className='hours-toggle'
                  onClick={() => setShowHoursDetail(!showHoursDetail)}
                >
                  <span className='info-label'>Giờ mở cửa</span>
                  <span
                    className={`dropdown-arrow ${
                      showHoursDetail ? 'open' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {showHoursDetail && openingHoursArray && (
                  <div className='hours-detail'>
                    {openingHoursArray.map((day, index) => (
                      <div key={index} className='hours-day'>
                        <span className='day-name'>{day.dayName}</span>
                        <span className='day-hours'>{day.hours}</span>
                      </div>
                    ))}
                  </div>
                )}

                {showHoursDetail && !openingHoursArray && (
                  <div className='hours-detail'>
                    <span className='no-hours'>
                      Chưa có thông tin giờ mở cửa
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            className='directions-btn'
            onClick={() => onGetDirections(restaurant)}
          >
            <span className='btn-icon'>🧭</span>
            <span className='btn-text'>Chỉ đường</span>
          </button>
        </div>
      </div>
    </InfoWindow>
  )
}

export default RestaurantInfoWindow
