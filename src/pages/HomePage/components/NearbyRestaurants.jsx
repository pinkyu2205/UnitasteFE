import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RestaurantsApi from '../../../api/restaurantApi' // Your API file
import '../CSS/NearbyRestaurants.css' // New CSS file for this section

// Import Swiper components and styles (same as RestaurantShowcase)
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Grid, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Default center if location fails (e.g., Ho Chi Minh City center)
const DEFAULT_CENTER = { lat: 10.7769, lng: 106.7009 }

// Render stars function (same as RestaurantShowcase)
const renderStars = (rating) => {
  if (typeof rating !== 'number' || rating < 0 || rating > 5) {
    return 'N/A'
  }
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
  let stars = '⭐'.repeat(fullStars)
  if (halfStar) stars += '✨'
  stars += '☆'.repeat(emptyStars)
  return stars
}

const NearbyRestaurants = () => {
  const [nearbyRestaurants, setNearbyRestaurants] = useState([])
  const [userLocation, setUserLocation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [permissionStatus, setPermissionStatus] = useState('checking')
  const navigate = useNavigate()

  // 1. Get User Location
  useEffect(() => {
    if (!navigator.geolocation || !navigator.permissions) {
      setError('Trình duyệt không hỗ trợ vị trí.')
      setPermissionStatus('denied') // Coi như bị từ chối nếu không hỗ trợ
      return
    }

    navigator.permissions
      .query({ name: 'geolocation' })
      .then((permission) => {
        setPermissionStatus(permission.state) // 'granted', 'prompt', 'denied'

        // Nếu đã cấp quyền trước đó, tự động lấy vị trí
        if (permission.state === 'granted') {
          requestLocation()
        }

        // Lắng nghe sự thay đổi quyền (nếu người dùng đổi trong cài đặt trình duyệt)
        permission.onchange = () => {
          setPermissionStatus(permission.state)
          if (permission.state === 'granted') {
            requestLocation() // Lấy vị trí nếu vừa được cấp quyền
          } else {
            setUserLocation(null) // Xóa vị trí nếu quyền bị thu hồi
            setNearbyRestaurants([]) // Xóa danh sách nhà hàng
          }
        }
      })
      .catch((err) => {
        console.error('Lỗi khi kiểm tra quyền vị trí:', err)
        setError('Không thể kiểm tra quyền truy cập vị trí.')
        setPermissionStatus('denied')
      })
  }, []) // Chỉ chạy 1 lần

  // 2. Hàm yêu cầu vị trí (và gọi API nếu thành công)
  const requestLocation = () => {
    setLoading(true) // Bắt đầu loading khi yêu cầu vị trí
    setError(null)
    setNearbyRestaurants([]) // Xóa kq cũ (nếu có)

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }
        setUserLocation(location)
        setPermissionStatus('granted') // Cập nhật state nếu user cấp quyền lần đầu
        // setLoading(false); // Sẽ set false trong hàm fetchNearby
        fetchNearby(location) // Gọi API fetch nhà hàng
      },
      (err) => {
        console.error('Lỗi Geolocation:', err.message)
        if (err.code === 1) {
          // Lỗi PERMISSION_DENIED
          setError('Bạn đã từ chối quyền truy cập vị trí.')
          setPermissionStatus('denied')
        } else {
          setError('Không thể lấy vị trí của bạn.')
          setPermissionStatus('prompt') // Vẫn cho phép thử lại
        }
        setLoading(false) // Dừng loading nếu không lấy được vị trí
        setUserLocation(null)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // Tăng timeout
    )
  }

  // 3. Hàm fetch nhà hàng (chỉ gọi khi có vị trí)
  const fetchNearby = async (location) => {
    // setLoading(true); // Đã set true trong requestLocation
    setError(null)
    try {
      const payload = {
        latitude: location.lat,
        longitude: location.lng,
        radiusKm: 10,
      }
      const response = await RestaurantsApi.findRestaurantsByLocation(payload)
      setNearbyRestaurants(response.restaurants || [])
      if (!response.restaurants || response.restaurants.length === 0) {
        setError('Không tìm thấy nhà hàng nào trong bán kính 10km.') // Dùng error state để hiển thị thông báo này
      }
    } catch (err) {
      console.error('Lỗi khi tải nhà hàng gần bạn:', err)
      setError('Không thể tải danh sách nhà hàng gần bạn.')
    } finally {
      setLoading(false) // Kết thúc loading sau khi fetch API
    }
  }

  // Handle Directions button click (same as RestaurantShowcase)
  const handleDirections = (restaurant) => {
    // No need to check login here again, HomePage already does
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
  }

  // Don't render anything if loading location or no restaurants found yet
  if (loading && nearbyRestaurants.length === 0) {
    return (
      <section className='nearby-restaurants'>
        <div className='nearby-container'>
          <h2 className='section-title'>Quán ăn quanh bạn</h2>
          <p>Đang tìm vị trí và quán ăn...</p>
        </div>
      </section>
    )
  }

  // Handle case where location was found but no restaurants returned
  if (!loading && nearbyRestaurants.length === 0 && !error) {
    return (
      <section className='nearby-restaurants'>
        <div className='nearby-container'>
          <h2 className='section-title'>Quán ăn quanh bạn</h2>
          <p>Không tìm thấy nhà hàng nào trong bán kính 10km.</p>
        </div>
      </section>
    )
  }

  // Handle API error
  if (error && nearbyRestaurants.length === 0) {
    return (
      <section className='nearby-restaurants'>
        <div className='nearby-container'>
          <h2 className='section-title'>Quán ăn quanh bạn</h2>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className='nearby-restaurants'>
      <div className='nearby-container'>
        <h2 className='section-title'>Quán ăn quanh bạn</h2>

        <Swiper
          slidesPerView={5}
          grid={{ rows: 2, fill: 'row' }}
          spaceBetween={30}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Grid, Pagination, Navigation]}
          className='restaurant-swiper'
          breakpoints={{
            640: { slidesPerView: 2, grid: { rows: 2 }, spaceBetween: 20 },
            768: { slidesPerView: 3, grid: { rows: 2 }, spaceBetween: 20 },
            1024: { slidesPerView: 4, grid: { rows: 2 }, spaceBetween: 30 },
          }}
        >
          {nearbyRestaurants.map((restaurant) => (
            <SwiperSlide key={restaurant.restaurantId}>
              <div className='restaurant-card'>
                <div
                  className='restaurant-image'
                  style={{
                    backgroundImage: `url(${
                      restaurant.coverImageUrl || '/placeholder-image.jpg'
                    })`,
                  }}
                ></div>
                <div className='restaurant-info'>
                  <h3 className='restaurant-name'>{restaurant.name}</h3>
                  <div className='restaurant-rating'>
                    <span className='stars'>{renderStars(restaurant.googleRating)}</span>
                    <span className='rating-text'>
                      {restaurant.googleRating ? restaurant.googleRating.toFixed(1) : 'N/A'}
                    </span>
                  </div>
                  <button
                    className='directions-btn'
                    onClick={() => handleDirections(restaurant)}
                  >
                    <span className='directions-icon'></span>
                    Chỉ đường 🗺️
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default NearbyRestaurants
