// src/components/SearchBox.jsx
import { useEffect, useState } from 'react'
import RestaurantsApi from '../api/restaurantApi'
import './CSS/SearchBox.css' // Updated CSS

// Define available types
const SEARCH_TYPES = [
  { id: 'restaurant', label: 'Nhà hàng 🍽️' },
  { id: 'cafe', label: 'Cà phê ☕' },
  // Add more types here if needed (e.g., bar, bakery)
]

/**
 * Component SearchBox: Tìm kiếm địa điểm với bộ lọc và phân trang.
 * @param {function} onSearchResults - Callback({ items, totalPages, currentPage })
 * @param {object} userLocation - Vị trí hiện tại của người dùng { lat, lng }
 */
const SearchBox = ({ onSearchResults, userLocation }) => {
  const [keyword, setKeyword] = useState('')
  const [selectedTypes, setSelectedTypes] = useState([]) // State for selected types
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1) // Track current page
  const [totalPages, setTotalPages] = useState(1) // Track total pages

  // Reset page to 1 whenever keyword or types change
  useEffect(() => {
    setCurrentPage(1)
    setTotalPages(1) // Reset total pages too
  }, [keyword, selectedTypes])

  // Handle type button clicks
  const handleTypeToggle = (typeId) => {
    setSelectedTypes(
      (prevTypes) =>
        prevTypes.includes(typeId)
          ? prevTypes.filter((t) => t !== typeId) // Remove if exists
          : [...prevTypes, typeId] // Add if not exists
    )
  }

  // Main search function
  const performSearch = async (page = 1) => {
    // Don't search if location isn't available
    if (!userLocation) {
      setError('Vui lòng cho phép truy cập vị trí để tìm kiếm.')
      return
    }

    setLoading(true)
    setError(null)
    setCurrentPage(page) // Update current page state

    // Combine selected types into a single string (e.g., "caferestaurant")
    const typeString = selectedTypes.join('')

    try {
      const params = {
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        radius: 5000, // Fixed radius
        type: typeString,
        keyword: keyword.trim(),
        currentPage: page,
        pageSize: 5, // Fixed page size
      }
      // API returns { totalItems, totalPages, currentPage, pageSize, items }
      const result = await RestaurantsApi.searchNearbyWithPaging(params)

      setTotalPages(result.totalPages || 1) // Update total pages from response

      // Pass relevant data up to MapPage
      onSearchResults({
        items: result.items || [],
        totalPages: result.totalPages || 1,
        currentPage: result.currentPage || 1,
        keyword: keyword.trim(),
        types: selectedTypes,
      })

      if (!result.items || result.items.length === 0) {
        setError('Không tìm thấy địa điểm nào khớp.')
      }
    } catch (err) {
      console.error('Lỗi tìm kiếm địa điểm:', err)
      setError('Lỗi kết nối hoặc lỗi server khi tìm kiếm.')
      onSearchResults({ items: [], totalPages: 1, currentPage: 1 }) // Clear results on error
    } finally {
      setLoading(false)
    }
  }

  // Handler for the main search button click (always searches page 1)
  const handleInitialSearch = () => {
    performSearch(1) // Always start search from page 1
  }

  // Handlers for pagination (to be called by SearchResults)
  // You might pass these down or lift state up to MapPage
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      performSearch(currentPage + 1)
    }
  }
  const handlePrevPage = () => {
    if (currentPage > 1) {
      performSearch(currentPage - 1)
    }
  }

  return (
    <div className='search-panel-container'>
      {' '}
      {/* New outer container */}
      <div className='search-box-container'>
        {' '}
        {/* Original search box */}
        <input
          type='text'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleInitialSearch()
          }}
          placeholder='Tìm theo tên, địa chỉ, loại hình...'
          disabled={loading}
          className='search-input'
        />
        <button
          onClick={handleInitialSearch}
          disabled={loading || !userLocation} // Disable if no location
          className='search-button'
        >
          {loading ? 'Đang tìm...' : 'Tìm kiếm'}
        </button>
      </div>
      {/* Type Filter Buttons */}
      <div className='search-type-filters'>
        {SEARCH_TYPES.map((type) => (
          <button
            key={type.id}
            className={`type-button ${
              selectedTypes.includes(type.id) ? 'active' : ''
            }`}
            onClick={() => handleTypeToggle(type.id)}
            disabled={loading}
          >
            {type.label}
          </button>
        ))}
      </div>
      {/* Display error below filters */}
      {error && <div className='search-error'>{error}</div>}
      {/* Pass pagination handlers (optional, depends on where pagination UI lives) */}
      {/* This assumes pagination controls are in SearchResults */}
      {/* <SearchResults ... onNextPage={handleNextPage} onPrevPage={handlePrevPage} currentPage={currentPage} totalPages={totalPages} /> */}
    </div>
  )
}

export default SearchBox
