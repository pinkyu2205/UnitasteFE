// src/pages/Admin/component/LocationHeatmap.jsx

import '../CSS/LocationHeatmap.css'

const LocationHeatmap = () => {
  const locations = [
    {
      district: 'Quận 1',
      users: 450,
      recommendations: 1200,
      restaurants: 89,
      orders: 2340,
      hotspot: 'very-hot',
    },
    {
      district: 'Quận 3',
      users: 320,
      recommendations: 890,
      restaurants: 67,
      orders: 1980,
      hotspot: 'hot',
    },
    {
      district: 'Quận 7',
      users: 280,
      recommendations: 720,
      restaurants: 54,
      orders: 1650,
      hotspot: 'medium',
    },
    {
      district: 'Quận 5',
      users: 200,
      recommendations: 540,
      restaurants: 42,
      orders: 1420,
      hotspot: 'warm',
    },
    {
      district: 'Quận 4',
      users: 150,
      recommendations: 380,
      restaurants: 31,
      orders: 890,
      hotspot: 'cool',
    },
    {
      district: 'Quận 6',
      users: 180,
      recommendations: 460,
      restaurants: 38,
      orders: 950,
      hotspot: 'cool',
    },
  ]

  const getHotspotColor = (hotspot) => {
    const colors = {
      'very-hot': '#FF1744',
      hot: '#FF6B35',
      medium: '#FFA726',
      warm: '#FFD93D',
      cool: '#81C784',
    }
    return colors[hotspot] || '#999'
  }

  const getHotspotLabel = (hotspot) => {
    const labels = {
      'very-hot': '🔥 Rất Nóng',
      hot: '🌡️ Nóng',
      medium: '⚡ Trung Bình',
      warm: '🌤️ Ấm',
      cool: '❄️ Lạnh',
    }
    return labels[hotspot] || 'N/A'
  }

  return (
    <div className='location-heatmap'>
      <div className='heatmap-header'>
        <h2>Bản Đồ Nhiệt Độ - Phân Bố Người Dùng & Gợi Ý</h2>
        <div className='legend'>
          <div className='legend-item'>
            <span
              className='legend-color'
              style={{ background: '#FF1744' }}
            ></span>
            <span>Rất Nóng</span>
          </div>
          <div className='legend-item'>
            <span
              className='legend-color'
              style={{ background: '#FF6B35' }}
            ></span>
            <span>Nóng</span>
          </div>
          <div className='legend-item'>
            <span
              className='legend-color'
              style={{ background: '#FFA726' }}
            ></span>
            <span>Trung Bình</span>
          </div>
          <div className='legend-item'>
            <span
              className='legend-color'
              style={{ background: '#FFD93D' }}
            ></span>
            <span>Ấm</span>
          </div>
          <div className='legend-item'>
            <span
              className='legend-color'
              style={{ background: '#81C784' }}
            ></span>
            <span>Lạnh</span>
          </div>
        </div>
      </div>

      <div className='map-container'>
        <svg viewBox='0 0 800 600' className='district-map'>
          {/* Placeholder for map - In thực tế sẽ sử dụng Google Maps API */}
          <text x='400' y='300' textAnchor='middle' fontSize='24' fill='#999'>
            🗺️ Google Maps Integration
          </text>
        </svg>
      </div>

      <div className='heatmap-data'>
        <table className='heatmap-table'>
          <thead>
            <tr>
              <th>Quận</th>
              <th>Người Dùng</th>
              <th>Gợi Ý</th>
              <th>Nhà Hàng</th>
              <th>Đơn Hàng</th>
              <th>Tỷ Lệ</th>
              <th>Nhiệt Độ</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((loc, index) => {
              const conversionRate = (
                (loc.orders / loc.recommendations) *
                100
              ).toFixed(1)
              return (
                <tr key={index} className={`location-row ${loc.hotspot}`}>
                  <td className='location-name'>
                    <span
                      className='hotspot-indicator'
                      style={{ background: getHotspotColor(loc.hotspot) }}
                    ></span>
                    {loc.district}
                  </td>
                  <td>{loc.users}</td>
                  <td>{loc.recommendations}</td>
                  <td>{loc.restaurants}</td>
                  <td className='orders-cell'>{loc.orders}</td>
                  <td className='conversion-cell'>{conversionRate}%</td>
                  <td>
                    <span className='hotspot-badge'>
                      {getHotspotLabel(loc.hotspot)}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className='insights-grid'>
        <div className='insight-box'>
          <h3>Khu Vực Nóng Nhất</h3>
          <div className='insight-content'>
            <p className='district-name'>Quận 1</p>
            <p className='insight-stat'>450 người dùng hoạt động</p>
            <p className='insight-stat'>1,200 gợi ý/tuần</p>
            <p className='insight-stat'>2,340 đơn hàng</p>
          </div>
        </div>

        <div className='insight-box'>
          <h3>Tiềm Năng Phát Triển</h3>
          <div className='insight-content'>
            <p className='district-name'>Quận 6</p>
            <p className='insight-stat'>Tỷ lệ tham gia: 73.5%</p>
            <p className='insight-stat'>Có 38 nhà hàng</p>
            <p className='insight-stat'>Có thể tăng 40% chỉ bằng marketing</p>
          </div>
        </div>

        <div className='insight-box'>
          <h3>Tỷ Lệ Chuyển Đổi Tốt Nhất</h3>
          <div className='insight-content'>
            <p className='district-name'>Quận 1</p>
            <p className='insight-stat'>195% tỷ lệ gợi ý → đơn hàng</p>
            <p className='insight-stat'>Highest engagement area</p>
            <p className='insight-stat'>Target area for premium offers</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationHeatmap
