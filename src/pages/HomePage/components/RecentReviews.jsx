// src/pages/HomePage/components/RecentReviews.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../CSS/RecentReviews.css'
import SocialApi from '../../../api/socialApi'

const RecentReviews = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentReviews = async () => {
      try {
        setLoading(true)
        // Lấy các bài post mới nhất từ trang social
        const res = await SocialApi.getAllPosts(1, 4)
        const raw = res?.data ?? res ?? {}
        const items = Array.isArray(raw?.items)
          ? raw.items
          : Array.isArray(raw?.data)
          ? raw.data
          : Array.isArray(raw)
          ? raw
          : []

        const mapped = await Promise.all(
          items.slice(0, 4).map(async (p) => {
            let name = p.authorName || p.userName || p.fullName || null
            let avatar = p.authorAvatar || p.avatarUrl || p.userAvatar || null
            if (!name || name.toLowerCase() === 'người dùng') {
              try {
                if (p.authorUserId) {
                  const profile = await SocialApi.getUserProfile(p.authorUserId)
                  name = profile.fullName || name
                  avatar = profile.avatarUrl || avatar
                }
              } catch {
                // ignore, keep fallback
              }
            }
            if (!name) name = 'Người dùng'
            if (!avatar) {
              avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                name.charAt(0)
              )}&background=ff6b35&color=fff&rounded=true`
            }
            return {
              id: p.postId ?? p.id,
              userName: name,
              userAvatar: avatar,
              restaurantName: p.restaurantName || p.locationName || 'Bài đăng mới',
              restaurantId: p.restaurantId || p.placeId || undefined,
              reviewText: p.content || p.description || '',
              rating: typeof p.rating === 'number' ? p.rating : 4.5,
              createdAt: p.createdAt || p.createdDate || p.createdOn || '',
            }
          })
        )

        setReviews(mapped)
      } catch (error) {
        console.error('Error fetching recent social posts:', error)
      } finally {
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

  const formatRelativeTime = (input) => {
    try {
      const date = input ? new Date(input) : new Date()
      const diffMs = Date.now() - date.getTime()
      if (diffMs < 0) return 'vừa xong'
      const sec = Math.floor(diffMs / 1000)
      if (sec < 60) return 'vừa xong'
      const min = Math.floor(sec / 60)
      if (min < 60) return `${min} phút trước`
      const hour = Math.floor(min / 60)
      if (hour < 24) return `${hour} giờ trước`
      const day = Math.floor(hour / 24)
      if (day < 30) return `${day} ngày trước`
      const month = Math.floor(day / 30)
      if (month < 12) return `${month} tháng trước`
      const year = Math.floor(month / 12)
      return `${year} năm trước`
    } catch {
      return 'vừa xong'
    }
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
                    <span className='review-time'>{formatRelativeTime(review.createdAt)}</span>
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

