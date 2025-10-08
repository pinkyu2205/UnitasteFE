import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  Pin,
  useMap, // ✅ Import hook useMap
} from '@vis.gl/react-google-maps'
import { useEffect, useRef, useState } from 'react'

// AI chat
import RestaurantsApi from '../../api/restaurantApi.js'

import ChatPopup from '../../components/ChatPopup'
import SearchBox from '../../components/SearchBox'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const DEFAULT_CENTER = { lat: 10.8231, lng: 106.6297 }

// ✅ Component mới để render đường đi
const Directions = ({ request }) => {
  const map = useMap()
  const [directionsService, setDirectionsService] = useState(null)
  const [directionsRenderer, setDirectionsRenderer] = useState(null)

  useEffect(() => {
    if (!map) return
    // Khởi tạo service và renderer khi map đã sẵn sàng
    setDirectionsService(new window.google.maps.DirectionsService())
    setDirectionsRenderer(new window.google.maps.DirectionsRenderer({ map }))
  }, [map])

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return

    if (request) {
      // Gửi yêu cầu tìm đường đi
      directionsService.route(request, (response, status) => {
        if (status === 'OK') {
          // Vẽ đường đi lên bản đồ
          directionsRenderer.setDirections(response)
        } else {
          console.error('Lỗi chỉ đường:', status)
        }
      })
    } else {
      // Xóa đường đi cũ nếu không có request
      directionsRenderer.setDirections(null)
    }
  }, [directionsService, directionsRenderer, request])

  // Component này không render gì ra giao diện
  return null
}

const MapPage = () => {
  const [currentPosition, setCurrentPosition] = useState(DEFAULT_CENTER)
  const [isLocationLoading, setIsLocationLoading] = useState(true)
  const [displayedRestaurants, setDisplayedRestaurants] = useState([])
  const [selectedRestaurantDetail, setSelectedRestaurantDetail] = useState(null)

  // ✅ State mới để quản lý yêu cầu chỉ đường
  const [directionsRequest, setDirectionsRequest] = useState(null)

  const mapRef = useRef(null)

  // Lấy vị trí người dùng
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude
          const lng = pos.coords.longitude
          const userLocation = { lat, lng }

          setCurrentPosition(userLocation)
          setIsLocationLoading(false)
        },
        (err) => {
          console.error('Lỗi Geolocation:', err.message)
          setIsLocationLoading(false)
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      )
    } else {
      console.error('Trình duyệt không hỗ trợ Geolocation.')
      setIsLocationLoading(false)
    }
  }, [])

  // ✅ Xử lý khi tìm kiếm
  const handleSearchResults = (restaurants) => {
    setDisplayedRestaurants(restaurants)
    setDirectionsRequest(null) // Xóa đường đi cũ khi tìm kiếm mới
    setSelectedRestaurantDetail(null) // Đóng InfoWindow cũ

    if (restaurants.length > 0 && mapRef.current) {
      const first = restaurants[0]
      const newCenter = {
        lat: parseFloat(first.latitude),
        lng: parseFloat(first.longitude),
      }

      mapRef.current.panTo(newCenter)
      mapRef.current.setZoom(17)
    }
  }

  // ✅ Khi click vào marker
  const handleMarkerClick = async (restaurant) => {
    try {
      setDirectionsRequest(null) // Xóa đường đi cũ khi chọn marker khác
      const detail = await RestaurantsApi.getRestaurantById(
        restaurant.restaurantId
      )
      setSelectedRestaurantDetail(detail)
    } catch (err) {
      console.error('Lỗi khi lấy chi tiết nhà hàng:', err)
    }
  }

  // ✅ Hàm xử lý khi nhấn nút "Chỉ đường"
  const handleGetDirections = (restaurant) => {
    if (!restaurant) return

    const request = {
      origin: currentPosition,
      destination: {
        lat: parseFloat(restaurant.latitude),
        lng: parseFloat(restaurant.longitude),
      },
      travelMode: window.google.maps.TravelMode.DRIVING, // Hoặc 'WALKING', 'BICYCLING'
    }

    setDirectionsRequest(request)
    setSelectedRestaurantDetail(null) // Đóng InfoWindow để thấy rõ đường đi
  }

  if (isLocationLoading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Đang tải bản đồ và xác định vị trí của bạn...
      </div>
    )
  }

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div style={{ height: '100vh', width: '100%' }}>
        <SearchBox onSearchResults={handleSearchResults} />

        <Map
          ref={mapRef}
          defaultCenter={currentPosition}
          defaultZoom={15}
          gestureHandling={'greedy'}
          mapId={'YOUR_MAP_ID'}
          style={{ width: '100%', height: '100%' }}
        >
          {/* Component render đường đi */}
          <Directions request={directionsRequest} />

          {/* 📍 Marker người dùng */}
          <AdvancedMarker position={currentPosition}>
            <Pin
              background={'#007bff'}
              borderColor={'#fff'}
              glyphColor={'#fff'}
            >
              📍
            </Pin>
          </AdvancedMarker>

          {/* 🏠 Marker nhà hàng */}
          {displayedRestaurants.map((restaurant, index) => (
            <AdvancedMarker
              key={index}
              position={{
                lat: parseFloat(restaurant.latitude),
                lng: parseFloat(restaurant.longitude),
              }}
              onClick={() => handleMarkerClick(restaurant)}
            >
              <Pin />
            </AdvancedMarker>
          ))}

          {/* 💬 Popup chi tiết quán */}
          {selectedRestaurantDetail && (
            <InfoWindow
              position={{
                lat: parseFloat(selectedRestaurantDetail.latitude),
                lng: parseFloat(selectedRestaurantDetail.longitude),
              }}
              onCloseClick={() => setSelectedRestaurantDetail(null)}
            >
              <div style={{ maxWidth: '250px' }}>
                <h4>{selectedRestaurantDetail.name}</h4>
                <p>Địa chỉ: {selectedRestaurantDetail.address}</p>
                <p>
                  Giờ mở cửa:{' '}
                  {selectedRestaurantDetail.openingHours || 'Không rõ'}
                </p>
                {/* ✅ Nút chỉ đường */}
                <button
                  style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '8px',
                  }}
                  onClick={() => handleGetDirections(selectedRestaurantDetail)}
                >
                  Chỉ đường
                </button>
              </div>
            </InfoWindow>
          )}
        </Map>

        <ChatPopup />
      </div>
    </APIProvider>
  )
}

export default MapPage
