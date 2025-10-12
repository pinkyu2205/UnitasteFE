// src/components/SearchBox.jsx

import { useState } from 'react'
import RestaurantsApi from '../api/restaurantApi'

// 💡 IMPORT FILE CSS MỚI
import './CSS/SearchBox.css'

/**
 * Component SearchBox: Cho phép tìm kiếm nhà hàng.
 * @param {function} onSearchResults - Callback function (restaurants) khi tìm kiếm thành công.
 */
const SearchBox = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    setLoading(true)
    setError(null)

    try {
      const result = await RestaurantsApi.searchRestaurants(searchTerm)

      // Xử lý response theo cấu trúc { "count": X, "restaurants": [...] }
      const foundRestaurants = result.restaurants || []

      onSearchResults(foundRestaurants)

      if (foundRestaurants.length === 0) {
        setError('Không tìm thấy nhà hàng nào khớp với từ khóa.')
      }
    } catch (err) {
      console.error('Lỗi tìm kiếm nhà hàng:', err)
      setError('Lỗi kết nối hoặc lỗi server khi tìm kiếm.')
    } finally {
      setLoading(false)
    }
  }

  return (
    // 🚀 Sử dụng className="search-container"
    <div className='search-container'>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleSearch()
        }}
        placeholder='Tìm kiếm nhà hàng theo tên...'
        disabled={loading}
        className='search-input' // Sử dụng className="search-input"
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className='search-button' // Sử dụng className="search-button"
      >
        {loading ? 'Đang tìm...' : 'Tìm kiếm'}
      </button>
      {/* Sử dụng className="search-error" */}
      {error && <div className='search-error'>{error}</div>}
    </div>
  )
}

export default SearchBox
