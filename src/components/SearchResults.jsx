// src/components/SearchResults.jsx
import { useState } from 'react'
import './CSS/SearchResults.css'
const SearchResults = ({
  items,
  currentPage,
  totalPages,
  onSelectRestaurant,
  onClose,
  onNextPage,
  onPrevPage,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  // If no items are passed (initial state or error cleared results)
  if (!items || items.length === 0) {
    return null // Don't render anything if there are no items
  }

  const formatOpeningHours = (hours) => {
    /* ... same as before ... */
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    // Add collapsed class based on state
    <div
      className={`search-results-container ${isCollapsed ? 'collapsed' : ''}`}
    >
      <div className='search-results-header'>
        <span className='search-results-title'>
          Kết quả ({items.length} trên trang {currentPage}/{totalPages})
        </span>
        {/* Collapse/Expand Toggle Button */}
        <button
          className='search-results-toggle'
          onClick={toggleCollapse}
          aria-label={isCollapsed ? 'Mở rộng' : 'Thu gọn'}
          title={isCollapsed ? 'Mở rộng' : 'Thu gọn'}
        >
          {/* Use different icons for states */}
          {isCollapsed ? '▲' : '▼'}
        </button>
        {/* Keep the close button */}
        <button
          className='search-results-close'
          onClick={onClose}
          aria-label='Đóng'
          title='Đóng kết quả'
        >
          ×
        </button>
      </div>

      {/* Content that will be hidden when collapsed */}
      <div className='search-results-body'>
        {' '}
        {/* Wrap list and pagination */}
        <div className='search-results-list'>
          {items.map((item) => (
            <div
              key={item.placeId || `${item.name}-${item.latitude}`}
              className='search-result-item'
              onClick={() => onSelectRestaurant(item)}
            >
              {/* ... item details ... */}
              <div className='result-name'>
                {item.types?.includes('cafe') ? '☕' : '🍽️'} {item.name}
              </div>
              <div className='result-address'>
                📍 {item.formattedAddress || item.address}
              </div>
              <div className='result-info'>
                {item.rating && (
                  <div className='result-rating'>
                    {' '}
                    ⭐ {item.rating.toFixed(1)}{' '}
                  </div>
                )}
                {item.priceLevel && item.priceLevel !== 'Chưa cập nhật' && (
                  <div className='result-price'>
                    {' '}
                    💰 {'$'.repeat(parseInt(item.priceLevel, 10))}{' '}
                  </div>
                )}
                <div className='result-hours'>
                  {' '}
                  🕒 {formatOpeningHours(item.openingHours)}{' '}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className='search-results-pagination'>
            {/* ... pagination buttons ... */}
            <button
              onClick={onPrevPage}
              disabled={currentPage <= 1}
              className='pagination-button'
            >
              {' '}
              &lt; Trang trước{' '}
            </button>
            <span className='pagination-info'>
              {' '}
              Trang {currentPage} / {totalPages}{' '}
            </span>
            <button
              onClick={onNextPage}
              disabled={currentPage >= totalPages}
              className='pagination-button'
            >
              {' '}
              Trang kế &gt;{' '}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResults
