// src/pages/Social/component/RightSidebar/RightSidebar.jsx
import { useEffect, useState } from 'react'
import RestaurantsApi from '../../../../api/restaurantApi'
import './RightSidebar.css'

function RightSidebar() {
  const [topRestaurants, setTopRestaurants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch featured restaurants from API
    const fetchFeaturedRestaurants = async () => {
      try {
        const response = await RestaurantsApi.getAllSimpleRestaurants(1, 5)
        const restaurants = response.items || []
        // Map API data to component state format
        const mappedRestaurants = restaurants.slice(0, 5).map((restaurant, index) => ({
          id: restaurant.restaurantId || restaurant.id || index + 1,
          name: restaurant.name || 'Không có tên',
          address: restaurant.address || restaurant.formattedAddress || 'Chưa có địa chỉ',
          saves: restaurant.savedCount || restaurant.saves || 0,
          rating: restaurant.rating || 0,
          coverImageUrl: restaurant.coverImageUrl || null,
        }))
        setTopRestaurants(mappedRestaurants)
      } catch (error) {
        console.error('Lỗi khi tải địa điểm nổi bật:', error)
        // Fallback to empty array or keep default
        setTopRestaurants([])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedRestaurants()
  }, [])

  if (loading) {
    return (
      <div className='right-sidebar'>
        <div className='sidebar-section'>
          <div className='section-loading'>
            <div className='mini-spinner'></div>
            <p>Đang tải...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='right-sidebar'>
      {/* Địa điểm nổi bật */}
      <div className='sidebar-section'>
        <div className='section-header'>
          <span className='section-icon icon-star'>
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
          </span>
          <h3 className='section-title'>Địa điểm nổi bật</h3>
        </div>
        <div className='section-content'>
          {topRestaurants.length > 0 ? (
            topRestaurants.map((restaurant, index) => (
              <div key={restaurant.id} className='restaurant-item'>
                <div className='restaurant-rank'>#{index + 1}</div>
                <div className='restaurant-info'>
                  <h4 className='restaurant-name'>{restaurant.name}</h4>
                  <p className='restaurant-address'>
                    <svg className='inline-icon' viewBox="0 0 24 24" fill="none">
                      <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    {restaurant.address}
                  </p>
                  {restaurant.saves > 0 && (
                    <div className='restaurant-saves'>
                      <span className='save-badge'>
                        <svg className='inline-icon' viewBox="0 0 24 24" fill="none">
                          <path d="M19 21L12 16L5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {restaurant.saves.toLocaleString()} lượt lưu
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className='section-empty'>
              <p>Chưa có địa điểm nổi bật</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className='sidebar-footer'>
        <p>© 2025 Unitaste</p>
        <div className='footer-links'>
          <a href='/about'>Về chúng tôi</a>
          <span>•</span>
          <a href='/terms'>Điều khoản</a>
          <span>•</span>
          <a href='/privacy'>Quyền riêng tư</a>
        </div>
      </div>
    </div>
  )
}

export default RightSidebar

