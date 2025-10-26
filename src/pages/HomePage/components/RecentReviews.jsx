// src/pages/HomePage/components/RecentReviews.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../CSS/RecentReviews.css'

const RecentReviews = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Replace with actual API call
    // Simulate API call with setTimeout
    const fetchRecentReviews = async () => {
      try {
        // Mock data for demonstration
        const mockReviews = [
          {
            id: 1,
            userName: 'Minh Anh',
            userAvatar: 'https://ui-avatars.com/api/?name=Minh+Anh&background=ff6b35&color=fff&rounded=true',
            restaurantName: 'Quán Cơm Tấm Sườn Bì Chả',
            restaurantId: 101,
            reviewText: 'Quán này view đẹp, nước uống tạm ổn, giá cả phải chăng. Phục vụ nhiệt tình, không gian thoáng mát. Rất đáng để thử!',
            rating: 4.5,
            createdAt: '2 giờ trước'
          },
          {
            id: 2,
            userName: 'Thu Hà',
            userAvatar: 'https://ui-avatars.com/api/?name=Thu+Ha&background=3b82f6&color=fff&rounded=true',
            restaurantName: 'Bún Bò Huế An Nhiên',
            restaurantId: 102,
            reviewText: 'Bún bò chuẩn vị Huế, nước dùng đậm đà, sả thơm lừng. Giá hợp lý, chỉ hơi đông người vào giờ cao điểm.',
            rating: 5,
            createdAt: '5 giờ trước'
          },
          {
            id: 3,
            userName: 'Quang Huy',
            userAvatar: 'https://ui-avatars.com/api/?name=Quang+Huy&background=10b981&color=fff&rounded=true',
            restaurantName: 'Phở Gà Tân Phú',
            restaurantId: 103,
            reviewText: 'Phở gà ngon, nước dùng trong, thịt gà mềm. Không gian sạch sẽ, giá sinh viên. Sẽ quay lại!',
            rating: 4,
            createdAt: '1 ngày trước'
          },
          {
            id: 4,
            userName: 'Lan Phương',
            userAvatar: 'https://ui-avatars.com/api/?name=Lan+Phuong&background=8b5cf6&color=fff&rounded=true',
            restaurantName: 'Cafe The Long Roastery',
            restaurantId: 104,
            reviewText: 'Cafe ngon, không gian yên tĩnh, phù hợp làm việc. Wifi nhanh, nhân viên thân thiện. Giá hơi cao nhưng xứng đáng.',
            rating: 4.5,
            createdAt: '2 ngày trước'
          }
        ]

        setTimeout(() => {
          setReviews(mockReviews)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error('Error fetching recent reviews:', error)
        setLoading(false)
      }
    }

    fetchRecentReviews()
  }, [])

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className='star full'>
          ★
        </span>
      )
    }

    if (hasHalfStar) {
      stars.push(
        <span key='half' className='star half'>
          ★
        </span>
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className='star empty'>
          ★
        </span>
      )
    }

    return stars
  }

  if (loading) {
    return (
      <section className='recent-reviews-section'>
        <div className='container'>
          <div className='section-header'>
            <h2>Đánh giá mới nhất</h2>
          </div>
          <div className='loading-spinner'>Đang tải...</div>
        </div>
      </section>
    )
  }

  return (
    <section className='recent-reviews-section'>
      <div className='container'>
        <div className='section-header'>
          <h2>Đánh giá mới nhất</h2>
        
        </div>

        <div className='reviews-grid'>
          {reviews.map((review) => (
            <div key={review.id} className='review-card'>
              <div className='review-header'>
                <div className='user-info'>
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className='user-avatar'
                  />
                  <div className='user-details'>
                    <h4 className='user-name'>{review.userName}</h4>
                    <span className='review-time'>{review.createdAt}</span>
                  </div>
                </div>
                <div className='rating-stars'>{renderStars(review.rating)}</div>
              </div>

              <div className='review-body'>
                <h3 className='restaurant-name'>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='location-icon'
                  >
                    <path
                      d='M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  {review.restaurantName}
                </h3>
                <p className='review-text'>{review.reviewText}</p>
              </div>

              <div className='review-footer'>
                <Link
                  to={`/social`}
                  className='view-detail-btn'
                >
                  Xem chi tiết
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='arrow-icon'
                  >
                    <path
                      d='M5 12H19M19 12L12 5M19 12L12 19'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className='section-footer'>
          <Link to='/social' className='view-all-btn'>
            Xem tất cả đánh giá
            <svg
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='arrow-icon'
            >
              <path
                d='M5 12H19M19 12L12 5M19 12L12 19'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default RecentReviews

