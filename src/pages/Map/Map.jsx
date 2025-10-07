import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from '@vis.gl/react-google-maps'

//AI chat
import ChatPopup from '../../components/ChatPopup'

// Key API
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

// Tọa độ trung tâm và mức zoom
const INITIAL_POSITION = { lat: 10.8231, lng: 106.6297 }

const MapPage = () => {
  return (
    // 1. APIProvider: Component bắt buộc để tải Google Maps API
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div style={{ height: '100vh', width: '100%' }}>
        {/* 2. Map: Component Bản đồ chính */}
        <Map
          defaultCenter={INITIAL_POSITION}
          defaultZoom={13}
          gestureHandling={'greedy'} // Tùy chỉnh cách xử lý tương tác chuột/cảm ứng
          mapId={'YOUR_MAP_ID'} // Tùy chọn, dùng cho Cloud-based map styling
          style={{ width: '100%', height: '100%' }}
        >
          {/* 3. AdvancedMarker: Điểm đánh dấu (Marker) */}
          <AdvancedMarker position={INITIAL_POSITION}>
            <Pin background={'#000'} borderColor={'#fff'} glyphColor={'#fff'}>
              {/* Nội dung Pin (Tùy chọn) */}
            </Pin>
          </AdvancedMarker>

          {/* Bạn có thể thêm các Marker khác, Polyline, v.v. tại đây */}
        </Map>

        <ChatPopup />
      </div>
    </APIProvider>
  )
}

export default MapPage
