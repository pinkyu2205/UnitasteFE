import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
  useMap,
} from '@vis.gl/react-google-maps'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import RestaurantsApi from '../../api/restaurantApi.js'

import ChatPopup from '../../components/ChatPopup'
import RestaurantInfoWindow from '../../components/RestaurantInfoWindow' // ✅ Import component mới
import SearchBox from '../../components/SearchBox'
import SearchResults from '../../components/SearchResults'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const DEFAULT_CENTER = { lat: 10.8231, lng: 106.6297 }

const Directions = ({ request }) => {
  const map = useMap()
  const [directionsService, setDirectionsService] = useState(null)
  const [directionsRenderer, setDirectionsRenderer] = useState(null)

  useEffect(() => {
    if (!map) return
    setDirectionsService(new window.google.maps.DirectionsService())
    setDirectionsRenderer(new window.google.maps.DirectionsRenderer({ map }))
  }, [map])

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return

    if (request) {
      directionsService.route(request, (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response)

          // === PHẦN BỔ SUNG ===
          const route = response.routes[0]
          const leg = route.legs[0] // Chỉ lấy chặng đầu tiên

          // Lấy ra mảng các bước đi
          const steps = leg.steps.map((step) => ({
            instructions: step.instructions, // "Đi về hướng Đông trên Đường Nguyễn Oanh"
            distance: step.distance.text, // "30 m"
            duration: step.duration.text, // "1 phút"
          }))

          // ✅ Gửi steps này ra ngoài MapPage (qua props hoặc callback)
          // Ví dụ: onRouteCalculated(steps);
          // ====================
        } else {
          console.error('Lỗi chỉ đường:', status)
        }
      })
    } else {
      directionsRenderer.setDirections(null)
    }
  }, [directionsService, directionsRenderer, request])

  return null
}

const MapPage = () => {
  const [currentPosition, setCurrentPosition] = useState(DEFAULT_CENTER)
  const [isLocationLoading, setIsLocationLoading] = useState(true)
  const [displayedRestaurants, setDisplayedRestaurants] = useState([]) // Now stores only 'items'
  const [selectedRestaurantDetail, setSelectedRestaurantDetail] = useState(null)
  const [directionsRequest, setDirectionsRequest] = useState(null)

  // ✅ State để hiển thị/ẩn danh sách kết quả tìm kiếm
  const [showSearchResults, setShowSearchResults] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  // Keep track of last search params to use for pagination
  const [lastSearchParams, setLastSearchParams] = useState({
    keyword: '',
    types: [],
  })

  const mapRef = useRef(null)
  const location = useLocation()

  // Lấy vị trí người dùng
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }
          setCurrentPosition(userLocation) // Update state directly
          setIsLocationLoading(false)
          // Pass userLocation to handleDestination
          handleDestinationFromState(
            userLocation,
            location.state?.destinationRestaurant
          )
        },
        (err) => {
          console.error('Lỗi Geolocation:', err.message)
          setCurrentPosition(DEFAULT_CENTER) // Use default if error
          setIsLocationLoading(false)
          // Pass default location to handleDestination
          handleDestinationFromState(
            DEFAULT_CENTER,
            location.state?.destinationRestaurant
          )
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      )
    } else {
      console.error('Trình duyệt không hỗ trợ Geolocation.')
      setIsLocationLoading(false)
    }
  }, [location.state])

  // Xử lý điểm đến được truyền qua state
  const handleDestinationFromState = (origin, destination) => {
    // Chỉ thực hiện nếu có điểm đến được truyền và chưa có request chỉ đường nào
    if (destination && !directionsRequest) {
      console.log('Nhận được điểm đến từ state:', destination)
      const request = {
        origin: origin, // Dùng vị trí hiện tại (hoặc mặc định)
        destination: {
          lat: parseFloat(destination.latitude),
          lng: parseFloat(destination.longitude),
        },
        travelMode: window.google.maps.TravelMode.DRIVING,
      }
      setDirectionsRequest(request)
      setSelectedRestaurantDetail(null) // Đóng info window nếu đang mở
      setShowSearchResults(false) // Đóng kết quả tìm kiếm nếu đang mở

      // Có thể pan/zoom map đến khu vực giữa origin và destination nếu muốn
      // (Phần này tùy chọn và cần tính toán bounds)
    }
  }

  // ✅ Xử lý khi tìm kiếm
  const handleSearchResultsUpdate = (results) => {
    setDisplayedRestaurants(results.items) // Update list
    setCurrentPage(results.currentPage) // Update current page
    setTotalPages(results.totalPages)
    setLastSearchParams({ keyword: results.keyword, types: results.types })
    setDirectionsRequest(null)
    setSelectedRestaurantDetail(null)
    setShowSearchResults(true) // ✅ Hiển thị danh sách kết quả

    if (results.items.length > 0 && mapRef.current) {
      const first = results.items[0]
      const newCenter = {
        lat: parseFloat(first.latitude),
        lng: parseFloat(first.longitude),
      }
      mapRef.current.panTo(newCenter)
      mapRef.current.setZoom(15)
    }
  }

  const handlePageChange = async (newPage) => {
    if (newPage < 1 || newPage > totalPages || isLocationLoading) return // Basic validation

    // Reuse the search logic from SearchBox's performSearch
    // We need userLocation, last keyword, and last types
    setShowSearchResults(false) // Optionally hide results while loading new page
    setSelectedRestaurantDetail(null) // Clear detail view

    // You need access to the keyword and types used for the LAST search.
    // Easiest way: Lift keyword and selectedTypes state UP from SearchBox to MapPage
    // OR: Modify SearchBox's onSearchResults to include the params used.
    // Assuming you lift state up (keyword and selectedTypes are now state in MapPage):

    // const typeString = selectedTypes.join(''); // Assuming selectedTypes is state here
    // const currentKeyword = keyword; // Assuming keyword is state here

    // For now, let's assume lastSearchParams holds this (requires modification in SearchBox callback)
    const typeString = lastSearchParams.types.join('')
    const currentKeyword = lastSearchParams.keyword

    try {
      const params = {
        latitude: currentPosition.lat,
        longitude: currentPosition.lng,
        radius: 5000,
        type: typeString,
        keyword: currentKeyword.trim(),
        currentPage: newPage,
        pageSize: 5,
      }
      const result = await RestaurantsApi.searchNearbyWithPaging(params)

      setDisplayedRestaurants(result.items || [])
      setCurrentPage(result.currentPage || newPage)
      setTotalPages(result.totalPages || 1)
      setShowSearchResults(true) // Show results again

      // Optionally pan to the first result of the new page
      if (result.items.length > 0 && mapRef.current) {
        const first = result.items[0]
        const newCenter = {
          lat: parseFloat(first.latitude),
          lng: parseFloat(first.longitude),
        }
        mapRef.current.panTo(newCenter)
      }
    } catch (err) {
      console.error('Error fetching page:', err)
      // Handle error (e.g., show message)
    }
  }

  // ✅ Xử lý khi click vào một quán trong danh sách kết quả
  const handleSelectRestaurant = (item) => {
    // Parameter is now 'item' from search results
    setDirectionsRequest(null)
    setSelectedRestaurantDetail(item) // Directly set the item from search results
    setShowSearchResults(false)

    // Pan map to the selected item's location
    if (mapRef.current) {
      const position = {
        lat: parseFloat(item.latitude),
        lng: parseFloat(item.longitude),
      }
      mapRef.current.panTo(position)
      mapRef.current.setZoom(17) // Zoom in closer
    }
  }

  // Khi click vào marker trên bản đồ
  const handleMarkerClick = (item) => {
    // Parameter is now 'item' from search results
    setDirectionsRequest(null)
    setSelectedRestaurantDetail(item) // Directly set the item from search results
    setShowSearchResults(false) // Hide search results list if open
    // Optionally pan map closer to the marker if needed
    if (mapRef.current) {
      const position = {
        lat: parseFloat(item.latitude),
        lng: parseFloat(item.longitude),
      }
      mapRef.current.panTo(position)
      // mapRef.current.setZoom(17); // Uncomment if you want to zoom on marker click too
    }
  }

  // ✅ Hàm đóng danh sách kết quả
  const handleCloseSearchResults = () => {
    setShowSearchResults(false)
  }

  // Hàm xử lý khi nhấn nút "Chỉ đường"
  const handleGetDirections = (restaurant) => {
    if (!restaurant) return

    const request = {
      origin: currentPosition,
      destination: {
        lat: parseFloat(restaurant.latitude),
        lng: parseFloat(restaurant.longitude),
      },
      travelMode: window.google.maps.TravelMode.DRIVING,
    }

    setDirectionsRequest(request)
    setSelectedRestaurantDetail(null)
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
        <SearchBox
          onSearchResults={handleSearchResultsUpdate}
          userLocation={currentPosition}
        />

        {/* ✅ Hiển thị danh sách kết quả tìm kiếm */}
        {showSearchResults && (
          <SearchResults
            items={displayedRestaurants} // Pass items
            currentPage={currentPage}
            totalPages={totalPages}
            onSelectRestaurant={handleSelectRestaurant}
            onClose={handleCloseSearchResults}
            onNextPage={() => handlePageChange(currentPage + 1)} // Pass handlers
            onPrevPage={() => handlePageChange(currentPage - 1)} // Pass handlers
          />
        )}

        <Map
          ref={mapRef}
          defaultCenter={currentPosition}
          defaultZoom={15}
          gestureHandling={'greedy'}
          mapId={'YOUR_MAP_ID'}
          style={{ width: '100%', height: '100%' }}
        >
          <Directions request={directionsRequest} />

          {/* 📍 Marker người dùng */}
          <AdvancedMarker
            key='user-location-marker' // Use placeId
            position={currentPosition}
            // onClick={() => handleMarkerClick(item)}
          >
            <Pin>📍</Pin>
          </AdvancedMarker>

          {/* 🏠 Marker nhà hàng */}
          {displayedRestaurants.map((item, index) => (
            <AdvancedMarker
              key={item.placeId || index} // Use placeId from search results
              position={{
                lat: parseFloat(item.latitude),
                lng: parseFloat(item.longitude),
              }}
              onClick={() => handleMarkerClick(item)} // Pass the correct 'item'
            >
              {/* Default Pin or custom icon for restaurants */}
              <Pin
                borderColor={'#FF6B35'}
                background={'#FF8C42'}
                glyphColor={'#FFF'}
              />
            </AdvancedMarker>
          ))}

          {/* 💬 Popup chi tiết quán với UI đẹp */}
          {selectedRestaurantDetail && (
            <RestaurantInfoWindow
              restaurant={selectedRestaurantDetail}
              onClose={() => setSelectedRestaurantDetail(null)}
              onGetDirections={handleGetDirections}
            />
          )}
        </Map>

        <ChatPopup />
      </div>
    </APIProvider>
  )
}

export default MapPage
