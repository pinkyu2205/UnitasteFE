import './CSS/SearchResults.css'

/**
 * Component SearchResults: Hiển thị danh sách kết quả tìm kiếm
 * @param {Array} restaurants - Danh sách nhà hàng
 * @param {function} onSelectRestaurant - Callback khi click vào một nhà hàng
 * @param {function} onClose - Callback khi đóng danh sách
 */
const SearchResults = ({ restaurants, onSelectRestaurant, onClose }) => {
  if (!restaurants || restaurants.length === 0) {
    return null
  }

  const formatOpeningHours = (hours) => {
    if (!hours || hours === 'Chưa cập nhật') return 'Chưa có thông tin'

    // Lấy giờ mở cửa ngắn gọn từ chuỗi dài
    const match = hours.match(/(\d{2}:\d{2})[–-](\d{2}:\d{2})/)
    if (match) {
      return `${match[1]} - ${match[2]}`
    }
    return 'Xem chi tiết'
  }

  return (
    <div className='search-results-container'>
      <div className='search-results-header'>
        <span className='search-results-title'>
          Tìm thấy {restaurants.length} quán
        </span>
        <button
          className='search-results-close'
          onClick={onClose}
          aria-label='Đóng'
        >
          ×
        </button>
      </div>

      <div className='search-results-list'>
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.restaurantId}
            className='search-result-item'
            onClick={() => onSelectRestaurant(restaurant)}
          >
            <div className='result-name'>🍽️ {restaurant.name}</div>

            <div className='result-address'>📍 {restaurant.address}</div>

            <div className='result-info'>
              {restaurant.googleRating && (
                <div className='result-rating'>
                  ⭐ {restaurant.googleRating}
                </div>
              )}

              <div className='result-hours'>
                🕒 {formatOpeningHours(restaurant.openingHours)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchResults
