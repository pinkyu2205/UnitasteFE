// src/pages/HomePage/components/RestaurantShowcase.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate
import RestaurantsApi from '../../../api/restaurantApi' // Đường dẫn tới API của bạn
import '../CSS/RestaurantShowcase.css'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import required modules
import { Grid, Navigation, Pagination } from 'swiper/modules'
import AuthPopup from '../../../components/AuthPopup'

// Hàm render sao (giữ nguyên)
const renderStars = (rating) => {
  if (typeof rating !== 'number' || rating < 0 || rating > 5) {
    return 'N/A' // Hoặc hiển thị mặc định
  }
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
  let stars = '⭐'.repeat(fullStars)
  if (halfStar) stars += '✨' // Dùng icon khác cho nửa sao nếu muốn
  stars += '☆'.repeat(emptyStars) // Sao rỗng
  return stars
}

const RestaurantShowcase = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate() // Hook để điều hướng
  const [showAuthPopup, setShowAuthPopup] = useState(false)

  const isLoggedIn = () => {
    // Kiểm tra sự tồn tại của token trong localStorage
    return !!localStorage.getItem('token')
  }
  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true)
      setError(null)
      try {
        // Gọi API lấy danh sách nhà hàng (ví dụ trang 1, 20 nhà hàng)
        // API trả về { items: [...], totalPages: ..., ... }
        const response = await RestaurantsApi.getAllSimpleRestaurants(1, 20)
        setRestaurants(response.items || []) // Lấy mảng 'items'
      } catch (err) {
        console.error('Lỗi khi tải nhà hàng nổi bật:', err)
        setError('Không thể tải danh sách nhà hàng.')
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurants()
  }, []) // Chạy 1 lần khi component mount

  // Hàm xử lý khi bấm nút "Chỉ đường"
  const handleDirections = (restaurant) => {
    if (isLoggedIn()) {
      // Nếu đã đăng nhập, chuyển hướng như cũ
      navigate('/map', {
        state: {
          destinationRestaurant: {
            latitude: restaurant.latitude,
            longitude: restaurant.longitude,
            name: restaurant.name,
            address: restaurant.address,
          },
        },
      })
    } else {
      // Nếu chưa đăng nhập, hiển thị popup
      setShowAuthPopup(true)
    }
  }

  if (loading) {
    return (
      <section className='restaurant-showcase'>
        <div className='showcase-container'>
          <h2 className='section-title'>Nhà hàng nổi bật</h2>
          <p>Đang tải...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className='restaurant-showcase'>
        <div className='showcase-container'>
          <h2 className='section-title'>Nhà hàng nổi bật</h2>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className='restaurant-showcase'>
      <div className='showcase-container'>
        <h2 className='section-title'>Nhà hàng nổi bật</h2>

        <Swiper
          slidesPerView={5} // Hiển thị 5 cột trên mỗi slide
          grid={{
            rows: 2, // Hiển thị 2 hàng
            fill: 'row',
          }}
          spaceBetween={30} // Khoảng cách giữa các thẻ
          pagination={{
            clickable: true,
          }}
          navigation={true} // Bật nút prev/next
          modules={[Grid, Pagination, Navigation]}
          className='restaurant-swiper' // Class để style nếu cần
          breakpoints={{
            // Responsive (Tùy chỉnh nếu cần)
            // Khi màn hình <= 640px
            640: {
              slidesPerView: 2,
              grid: { rows: 2 },
              spaceBetween: 20,
            },
            // Khi màn hình <= 768px
            768: {
              slidesPerView: 3,
              grid: { rows: 2 },
              spaceBetween: 20,
            },
            // Khi màn hình <= 1024px
            1024: {
              slidesPerView: 4,
              grid: { rows: 2 },
              spaceBetween: 30,
            },
          }}
        >
          {restaurants.map((restaurant) => (
            <SwiperSlide key={restaurant.restaurantId}>
              <div className='restaurant-card'>
                {/* Sử dụng ảnh từ API hoặc ảnh placeholder */}
                <div
                  className='restaurant-image'
                  style={{
                    backgroundImage: `url(${
                      restaurant.coverImageUrl || '/placeholder-image.jpg'
                    })`,
                  }} // Thêm ảnh placeholder nếu API không có
                ></div>
                <div className='restaurant-info'>
                  <h3 className='restaurant-name'>{restaurant.name}</h3>
                  <div className='restaurant-rating'>
                    <span className='stars'>
                      {renderStars(restaurant.googleRating)}
                    </span>
                    <span className='rating-text'>
                      {restaurant.googleRating
                        ? restaurant.googleRating.toFixed(1)
                        : 'N/A'}
                      {/* Thêm số lượng review nếu API có */}
                    </span>
                  </div>
                  {/* <p className="restaurant-description">{restaurant.description || 'Chưa có mô tả'}</p> */}

                  {/* Nút Chỉ đường */}
                  <button
                    className='directions-btn'
                    onClick={() => handleDirections(restaurant)}
                  >
                    <span className='directions-icon'>📍</span>
                    Chỉ đường
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {showAuthPopup && <AuthPopup onClose={() => setShowAuthPopup(false)} />}
    </section>
  )
}

export default RestaurantShowcase
