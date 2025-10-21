// src/components/RestaurantInfoWindow.jsx
import { InfoWindow } from '@vis.gl/react-google-maps'
import { useState } from 'react'
import './CSS/RestaurantInfoWindow.css' // Ensure CSS path is correct

// --- Utility Functions (Keep these as they are compatible) ---
const parseOpeningHours = (hoursString) => {
  if (
    typeof hoursString !== 'string' ||
    hoursString === 'Chưa cập nhật' ||
    !hoursString
  ) {
    return null
  }
  try {
    const days = hoursString
      .split(';')
      .map((item) => item.trim())
      .filter(Boolean)
    return days
      .map((dayStr) => {
        const parts = dayStr.split(': ')
        return parts.length === 2
          ? { dayName: parts[0], hours: parts[1] }
          : null
      })
      .filter(Boolean)
  } catch (e) {
    console.error('Error parsing opening hours:', e)
    return null
  }
}

const renderStars = (rating) => {
  if (typeof rating !== 'number' || rating <= 0) {
    return <span className='no-rating'>Chưa có đánh giá</span>
  }
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.4
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  return (
    <div className='star-rating'>
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className='star star-full'>
          ★
        </span>
      ))}
      {hasHalfStar && (
        <span key='half' className='star star-half'>
          ★
        </span>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className='star star-empty'>
          ★
        </span>
      ))}
      <span className='rating-number'>{rating.toFixed(1)}</span>
    </div>
  )
}

const renderPriceLevel = (level) => {
  const levelNum = parseInt(level, 10)
  return !isNaN(levelNum) && levelNum > 0 ? '$'.repeat(levelNum) : 'N/A'
}
// --- End Utility Functions ---

/**
 * Component hiển thị thông tin chi tiết (từ kết quả search)
 * @param {Object} restaurant - Item object from searchNearbyWithPaging result
 * @param {function} onClose - Callback khi đóng
 * @param {function} onGetDirections - Callback khi nhấn nút chỉ đường
 */
const RestaurantInfoWindow = ({ restaurant, onClose, onGetDirections }) => {
  const [showHoursDetail, setShowHoursDetail] = useState(false)

  if (!restaurant) return null

  // Directly use properties from the search result 'item'
  const name = restaurant.name
  const address = restaurant.formattedAddress // Use formattedAddress
  const phone = restaurant.phone
  const website = restaurant.website
  const rating = restaurant.rating
  const priceLevel = restaurant.priceLevel
  const openingHoursString = restaurant.openingHours
  const coverImageUrl = restaurant.coverImageUrl

  const openingHoursArray = parseOpeningHours(openingHoursString)

  return (
    <InfoWindow
      position={{
        lat: parseFloat(restaurant.latitude),
        lng: parseFloat(restaurant.longitude),
      }}
      onCloseClick={onClose}
    >
      <div className='restaurant-info-container'>
        {/* Image Display */}
        <div className='image-gallery'>
          <img
            src={coverImageUrl || '/placeholder-image.jpg'} // Use placeholder if no image
            alt={name}
            className='restaurant-image-single'
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg'
            }}
          />
        </div>

        {/* Restaurant Info */}
        <div className='restaurant-details'>
          <h3 className='restaurant-name'>{name || 'Không có tên'}</h3>

          <div className='info-section'>
            {/* Address */}
            <div className='info-item'>
              <span className='info-icon'>📍</span>
              <div className='info-content'>
                <span className='info-label'>Địa chỉ</span>
                <span className='info-value'>
                  {address || 'Chưa có thông tin'}
                </span>
              </div>
            </div>

            {/* Phone */}
            {phone && phone !== 'Chưa cập nhật' && (
              <div className='info-item'>
                <span className='info-icon'>📞</span>
                <div className='info-content'>
                  <span className='info-label'>Số điện thoại</span>
                  <span className='info-value'>{phone}</span>
                </div>
              </div>
            )}

            {/* Website */}
            {website && website !== 'Chưa cập nhật' && (
              <div className='info-item'>
                <span className='info-icon'>🌐</span>
                <div className='info-content'>
                  <span className='info-label'>Website</span>
                  <a
                    href={
                      website.startsWith('http') ? website : `http://${website}`
                    }
                    target='_blank'
                    rel='noopener noreferrer'
                    className='info-value website-link'
                    onClick={(e) => e.stopPropagation()}
                  >
                    {website}
                  </a>
                </div>
              </div>
            )}

            {/* Rating */}
            <div className='info-item'>
              <span className='info-icon'>⭐</span>
              <div className='info-content'>
                <span className='info-label'>Đánh giá</span>
                {renderStars(rating)}
              </div>
            </div>

            {/* Price Level */}
            {priceLevel && priceLevel !== 'Chưa cập nhật' && (
              <div className='info-item'>
                <span className='info-icon'>💰</span>
                <div className='info-content'>
                  <span className='info-label'>Mức giá</span>
                  <span className='info-value price-level'>
                    {renderPriceLevel(priceLevel)}
                  </span>
                </div>
              </div>
            )}

            {/* Opening Hours */}
            <div className='info-item hours-section'>
              <span className='info-icon'>🕒</span>
              <div className='info-content'>
                <button
                  className='hours-toggle'
                  onClick={() => setShowHoursDetail(!showHoursDetail)}
                  disabled={!openingHoursArray}
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
            className='directions-btn-info'
            // Pass the original restaurant item (from search results)
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
