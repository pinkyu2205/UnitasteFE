import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Bỏ SocialApi và jwtDecode nếu không dùng cho "Gợi ý bạn bè"
// import SocialApi from '../../../../api/socialApi';
// import { jwtDecode } from 'jwt-decode';
import RestaurantsApi from '../../../api/restaurantApi'
import TrendingTags from '../TrendingTags/TrendingTags'
import './RightSidebar.css'

// (Tạm thời bỏ/comment out hàm này nếu bạn chưa dùng)
// const getUserIdFromToken = () => { ... };

function RightSidebar() {
  // State cho Gợi ý bạn bè (Giữ nguyên)
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(true)

  // State MỚI cho Quán ăn gần bạn
  const [nearbyRestaurants, setNearbyRestaurants] = useState([])
  const [loadingNearby, setLoadingNearby] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState('checking') // 'checking', 'prompt', 'granted', 'denied'
  const [nearbyError, setNearbyError] = useState(null)

  // State cho Địa điểm nổi bật (từ HomePage RestaurantShowcase)
  const [topRestaurants, setTopRestaurants] = useState([])
  const [loadingTopRestaurants, setLoadingTopRestaurants] = useState(true)

  const navigate = useNavigate()

  // 1. Lấy danh sách gợi ý bạn bè (Giữ nguyên logic cũ)
  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true)
      try {
        const mockUsers = [
          { userId: 99, fullName: 'Quỳnh Aka', avatarUrl: null },
          { userId: 98, fullName: 'Foodie Sài Gòn', avatarUrl: null },
        ]
        // const currentUserId = getUserIdFromToken();
        // setSuggestedUsers(mockUsers.filter(u => u.userId !== currentUserId));
        setSuggestedUsers(mockUsers) // Tạm thời hiển thị mock
      } catch (err) {
        console.error('Lỗi tải gợi ý bạn bè:', err)
      } finally {
        setLoadingUsers(false)
      }
    }
    fetchUsers()
  }, [])

  // 1.5. Lấy địa điểm nổi bật từ API (giống HomePage RestaurantShowcase)
  useEffect(() => {
    const fetchTopRestaurants = async () => {
      setLoadingTopRestaurants(true)
      try {
        // Dùng cùng API như RestaurantShowcase trong HomePage
        const response = await RestaurantsApi.getAllSimpleRestaurants(1, 20)
        const restaurants = response.items || []
        
        // Sắp xếp theo tiêu chí nổi bật: ưu tiên rating cao, sau đó savedCount
        const sortedRestaurants = [...restaurants].sort((a, b) => {
          const ratingA = a.googleRating || a.rating || 0
          const ratingB = b.googleRating || b.rating || 0
          const savedA = a.savedCount || a.saves || 0
          const savedB = b.savedCount || b.saves || 0
          
          // Ưu tiên rating trước, nếu bằng nhau thì xét savedCount
          if (ratingB !== ratingA) {
            return ratingB - ratingA
          }
          return savedB - savedA
        })
        
        // Lấy 5 quán đầu tiên sau khi sắp xếp
        const top5 = sortedRestaurants.slice(0, 5)
        
        // Map API data to component state format
        const mappedRestaurants = top5.map((restaurant, index) => ({
          id: restaurant.restaurantId || restaurant.id || index + 1,
          name: restaurant.name || 'Không có tên',
          address: restaurant.address || restaurant.formattedAddress || 'Chưa có địa chỉ',
          saves: restaurant.savedCount || restaurant.saves || 0,
          rating: restaurant.googleRating || restaurant.rating || 0,
          coverImageUrl: restaurant.coverImageUrl || null,
          latitude: restaurant.latitude,
          longitude: restaurant.longitude,
        }))
        setTopRestaurants(mappedRestaurants)
      } catch (error) {
        console.error('Lỗi khi tải địa điểm nổi bật:', error)
        setTopRestaurants([])
      } finally {
        setLoadingTopRestaurants(false)
      }
    }

    fetchTopRestaurants()
  }, [])

  // 2. Logic MỚI: Lấy vị trí và quán ăn gần bạn
  useEffect(() => {
    if (!navigator.geolocation || !navigator.permissions) {
      setNearbyError('Trình duyệt không hỗ trợ vị trí.')
      setPermissionStatus('denied')
      return
    }

    navigator.permissions
      .query({ name: 'geolocation' })
      .then((permission) => {
        setPermissionStatus(permission.state)
        if (permission.state === 'granted') {
          requestLocation()
        }
        permission.onchange = () => {
          setPermissionStatus(permission.state)
          if (permission.state === 'granted') requestLocation()
        }
      })
      .catch((err) => {
        console.error('Lỗi kiểm tra quyền vị trí:', err)
        setNearbyError('Lỗi khi kiểm tra quyền vị trí.')
        setPermissionStatus('denied')
      })
  }, []) // Chạy 1 lần

  // Hàm yêu cầu vị trí
  const requestLocation = () => {
    setLoadingNearby(true)
    setNearbyError(null)
    setNearbyRestaurants([])

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }
        fetchNearby(location) // Gọi API fetch khi có vị trí
      },
      (err) => {
        if (err.code === 1) {
          // PERMISSION_DENIED
          setNearbyError('Bạn đã từ chối quyền truy cập vị trí.')
          setPermissionStatus('denied')
        } else {
          setNearbyError('Không thể lấy vị trí của bạn.')
          setPermissionStatus('prompt')
        }
        setLoadingNearby(false)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

  // Hàm fetch nhà hàng gần đây
  const fetchNearby = async (location) => {
    setLoadingNearby(true)
    setNearbyError(null)
    try {
      const payload = {
        latitude: location.lat,
        longitude: location.lng,
        radiusKm: 10, // Bán kính 10km
      }
      // API của bạn trả về { count: XX, restaurants: [...] }
      const response = await RestaurantsApi.findRestaurantsByLocation(payload)
      // Chỉ lấy 4 quán đầu tiên để hiển thị grid 2x2
      setNearbyRestaurants(response.restaurants?.slice(0, 4) || [])
      if (!response.restaurants || response.restaurants.length === 0) {
        setNearbyError('Không tìm thấy quán nào gần bạn.')
      }
    } catch (err) {
      console.error('Lỗi tải quán ăn gần bạn:', err)
      setNearbyError('Không thể tải danh sách quán ăn.')
    } finally {
      setLoadingNearby(false)
    }
  }

  // Hàm xử lý khi bấm vào nhà hàng (Giữ nguyên)
  const handleRestaurantClick = (restaurant) => {
    /* ... code cũ ... */
  }

  // Component con để render nội dung widget quán ăn
  const renderNearbyRestaurants = () => {
    switch (permissionStatus) {
      case 'checking':
        return (
          <p className='widget-loading-text'>Đang kiểm tra quyền vị trí...</p>
        )
      case 'prompt':
        return (
          <div className='permission-prompt-widget'>
            <p>Cấp quyền vị trí để xem quán ăn gần bạn.</p>
            <button
              className='request-location-btn-small'
              onClick={requestLocation}
            >
              Cấp quyền
            </button>
          </div>
        )
      case 'denied':
        return (
          <p className='widget-error-message'>
            {nearbyError || 'Bạn đã từ chối quyền truy cập vị trí.'}
          </p>
        )
      case 'granted':
        if (loadingNearby)
          return <p className='widget-loading-text'>Đang tìm quán ăn...</p>
        if (nearbyError)
          return <p className='widget-error-message'>{nearbyError}</p>
        if (nearbyRestaurants.length > 0) {
          return (
            <div className='suggestion-grid restaurant-grid'>
              {nearbyRestaurants.map((restaurant) => (
                <div
                  key={restaurant.restaurantId}
                  className='suggestion-item restaurant-item'
                  onClick={() => handleRestaurantClick(restaurant)}
                  title={restaurant.name}
                >
                  <img
                    src={
                      restaurant.coverImageUrl ||
                      'https://placehold.co/300x200/f26522/white?text=Unitaste'
                    }
                    alt={restaurant.name}
                    className='suggestion-image'
                  />
                  <strong className='suggestion-name overlay'>
                    {restaurant.name}
                  </strong>
                </div>
              ))}
            </div>
          )
        }
        return <p>Trạng thái không xác định.</p> // Fallback
      default:
        return null
    }
  }

  return (
    <aside className='right-sidebar-container'>
      {/* --- Widget 1: Gợi ý kết bạn (Giữ nguyên) --- */}
      <div className='sidebar-widget'>
        <h4 className='widget-title'>Gợi ý cho bạn</h4>
        {loadingUsers ? (
          <p className='widget-loading-text'>Đang tải...</p>
        ) : (
          <div className='suggestion-list'>
            {suggestedUsers.map((user) => (
              <div key={user.userId} className='suggestion-item user-item'>
                <img
                  src={
                    user.avatarUrl ||
                    `https://ui-avatars.com/api/?name=${user.fullName.charAt(
                      0
                    )}&background=random`
                  }
                  alt={user.fullName}
                  className='suggestion-avatar'
                />
                <div className='suggestion-info'>
                  <strong className='suggestion-name'>{user.fullName}</strong>
                  <span className='suggestion-subtext'>Gợi ý cho bạn</span>
                </div>
                <button className='add-friend-btn'>Kết bạn</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- Widget 2: Địa điểm nổi bật (từ HomePage) --- */}
      <div className='sidebar-widget'>
        <h4 className='widget-title'>Địa điểm nổi bật</h4>
        {loadingTopRestaurants ? (
          <p className='widget-loading-text'>Đang tải...</p>
        ) : topRestaurants.length > 0 ? (
          <div className='top-restaurants-list'>
            {topRestaurants.map((restaurant, index) => (
              <div
                key={restaurant.id}
                className='top-restaurant-item'
                onClick={() => {
                  // Navigate to restaurant detail or map (giống HomePage)
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
                }}
              >
                <div className='restaurant-rank-badge'>#{index + 1}</div>
                <div className='restaurant-info-compact'>
                  <h5 className='restaurant-name-compact'>{restaurant.name}</h5>
                  <p className='restaurant-address-compact'>{restaurant.address}</p>
                  {restaurant.rating > 0 && (
                    <span className='restaurant-rating-compact'>
                      ⭐ {restaurant.rating.toFixed(1)}
                    </span>
                  )}
                  {restaurant.saves > 0 && (
                    <span className='restaurant-saves-compact'>
                      💾 {restaurant.saves.toLocaleString()} lượt lưu
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='widget-empty-message'>Chưa có địa điểm nổi bật</p>
        )}
      </div>

      {/* --- Widget 3: Quán ăn gần bạn (Đã cập nhật) --- */}
      <div className='sidebar-widget'>
        <h4 className='widget-title'>Quán ăn gần bạn</h4>
        {renderNearbyRestaurants()}
      </div>
      <TrendingTags />

      {/* --- Footer nhỏ (Giữ nguyên) --- */}
      <div className='sidebar-footer-links'>{/* ... (links) ... */}</div>
    </aside>
  )
}

export default RightSidebar
