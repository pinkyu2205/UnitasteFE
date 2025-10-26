// src/pages/Social/component/RightSidebar/RightSidebar.jsx
import { useEffect, useState } from 'react'
import './RightSidebar.css'

function RightSidebar() {
  const [topReviews, setTopReviews] = useState([])
  const [topRestaurants, setTopRestaurants] = useState([])
  const [trendingRestaurants, setTrendingRestaurants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Replace with actual API calls
    // Giả lập data tạm thời
    setTimeout(() => {
      setTopReviews([
        {
          id: 1,
          title: 'Quán cơm tấm cực ngon!',
          restaurantName: 'Cơm Tấm Phúc Lộc Thọ',
          userName: 'Nguyễn Văn A',
          likes: 245,
          comments: 32,
        },
        {
          id: 2,
          title: 'Bún bò Huế đậm đà',
          restaurantName: 'Bún Bò Huế Đồng Khánh',
          userName: 'Trần Thị B',
          likes: 198,
          comments: 28,
        },
        {
          id: 3,
          title: 'Phở bò nước dùng ngọt',
          restaurantName: 'Phở Hòa Pasteur',
          userName: 'Lê Văn C',
          likes: 176,
          comments: 24,
        },
        {
          id: 4,
          title: 'Bánh mì thịt xá xíu',
          restaurantName: 'Bánh Mì Huỳnh Hoa',
          userName: 'Phạm Thị D',
          likes: 165,
          comments: 19,
        },
        {
          id: 5,
          title: 'Cafe view đẹp, không gian thoáng',
          restaurantName: 'The Coffee House',
          userName: 'Hoàng Văn E',
          likes: 142,
          comments: 15,
        },
      ])

      setTopRestaurants([
        { id: 1, name: 'Nhà Hàng Quán Bụi', address: 'Q1, TP.HCM', saves: 1248 },
        { id: 2, name: 'Phở 2000', address: 'Q1, TP.HCM', saves: 1156 },
        { id: 3, name: 'Cơm Niêu Singapore', address: 'Q3, TP.HCM', saves: 987 },
        { id: 4, name: 'Bánh Xèo 46A', address: 'Q3, TP.HCM', saves: 876 },
        { id: 5, name: 'Bún Chả Hà Nội', address: 'Q10, TP.HCM', saves: 765 },
      ])

      setTrendingRestaurants([
        { id: 1, name: 'Pizza 4P\'s Lê Thánh Tôn', newReviews: 42 },
        { id: 2, name: 'Gogi House BBQ', newReviews: 38 },
        { id: 3, name: 'Lẩu Thái Hồng Thái', newReviews: 35 },
        { id: 4, name: 'Sushi World', newReviews: 29 },
        { id: 5, name: 'Dimsum Thuận Kiều', newReviews: 24 },
      ])

      setLoading(false)
    }, 1000)
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
      {/* Top 5 Review của Tuần */}
      <div className='sidebar-section'>
        <div className='section-header'>
            <span className='section-icon icon-fire'>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C12 2 8 6 8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 6 12 2 12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 14C9.79086 14 8 15.7909 8 18C8 20.2091 9.79086 22 12 22C14.2091 22 16 20.2091 16 18C16 15.7909 14.2091 14 12 14Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <h3 className='section-title'>Top Review Tuần Này</h3>
        </div>
        <div className='section-content'>
          {topReviews.map((review, index) => (
            <div key={review.id} className='review-item'>
              <div className='review-rank'>#{index + 1}</div>
              <div className='review-info'>
                <h4 className='review-title'>{review.title}</h4>
                <p className='review-restaurant'>
                  <svg className='inline-icon' viewBox="0 0 24 24" fill="none">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  {review.restaurantName}
                </p>
                <div className='review-meta'>
                  <span className='review-author'>
                    <svg className='inline-icon' viewBox="0 0 24 24" fill="none">
                      <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    {review.userName}
                  </span>
                  <div className='review-stats'>
                    <span>
                      <svg className='inline-icon' viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      {review.likes}
                    </span>
                    <span>
                      <svg className='inline-icon' viewBox="0 0 24 24" fill="none">
                        <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {review.comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top 5 Quán được Lưu nhiều nhất */}
      <div className='sidebar-section'>
        <div className='section-header'>
          <span className='section-icon icon-star'>
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
          </span>
          <h3 className='section-title'>Quán Được Lưu Nhiều Nhất</h3>
        </div>
        <div className='section-content'>
          {topRestaurants.map((restaurant, index) => (
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
                <div className='restaurant-saves'>
                  <span className='save-badge'>
                    <svg className='inline-icon' viewBox="0 0 24 24" fill="none">
                      <path d="M19 21L12 16L5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {restaurant.saves.toLocaleString()} lượt lưu
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quán ăn Mới Nổi (Trending) */}
      <div className='sidebar-section'>
        <div className='section-header'>
          <span className='section-icon icon-rocket'>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15L15.5 18.5L14 22L10 18M12 15L8.5 18.5L10 22L14 18M12 15V9M12 9L8 5L6 6L8 8L4 12L6 14L10 10L12 9ZM12 9L16 5L18 6L16 8L20 12L18 14L14 10L12 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="5" r="3" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </span>
          <h3 className='section-title'>Quán Mới Nổi</h3>
        </div>
        <div className='section-content'>
          {trendingRestaurants.map((restaurant, index) => (
            <div key={restaurant.id} className='trending-item'>
              <div className='trending-rank'>#{index + 1}</div>
              <div className='trending-info'>
                <h4 className='trending-name'>{restaurant.name}</h4>
                <div className='trending-badge'>
                  <svg className='trending-icon' viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.6 10.81L16.19 9.4C16.1 9.31 16.04 9.19 16.04 9.08C16.04 8.96 16.09 8.85 16.19 8.75C17.28 7.66 18.04 6.33 18.5 4.88C18.61 4.54 18.96 4.31 19.32 4.31C19.41 4.31 19.5 4.33 19.58 4.36C20.27 4.65 20.66 5.43 20.37 6.13C19.67 7.92 18.5 9.5 17.02 10.73C17 10.75 17 10.77 17 10.79C17 10.85 17.02 10.9 17.06 10.94L19.23 13.11C19.66 13.54 19.66 14.24 19.23 14.67L14.67 19.23C14.24 19.66 13.54 19.66 13.11 19.23L10.94 17.06C10.9 17.02 10.85 17 10.79 17C10.77 17 10.75 17 10.73 17.02C9.5 18.5 7.92 19.67 6.13 20.37C5.43 20.66 4.65 20.27 4.36 19.58C4.33 19.5 4.31 19.41 4.31 19.32C4.31 18.96 4.54 18.61 4.88 18.5C6.33 18.04 7.66 17.28 8.75 16.19C8.85 16.09 8.96 16.04 9.08 16.04C9.19 16.04 9.31 16.1 9.4 16.19L10.81 17.6C10.87 17.66 10.95 17.69 11.03 17.69C11.11 17.69 11.19 17.66 11.25 17.6L17.6 11.25C17.72 11.13 17.72 10.93 17.6 10.81Z"/>
                  </svg>
                  <span className='trending-count'>+{restaurant.newReviews} review mới</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className='sidebar-footer'>
        <p>© 2024 Unitaste</p>
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

