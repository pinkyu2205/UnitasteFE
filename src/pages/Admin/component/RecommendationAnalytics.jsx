// src/pages/Admin/component/RecommendationAnalytics.jsx

import { useState } from 'react'
import '../CSS/RecommendationAnalytics.css'

const RecommendationAnalytics = () => {
  const [selectedMetric, setSelectedMetric] = useState('conversion')

  const recommendations = [
    {
      id: 1,
      userId: 'USR001',
      userName: 'Nguyễn Văn A',
      location: { lat: 10.8231, lng: 106.6297, address: 'Quận 1, TP.HCM' },
      recommendedDish: 'Phở Bò',
      restaurant: 'Phở Gia Truyền',
      recommendationReason: 'Yêu thích ẩm thực Việt + trong khu vực',
      status: 'converted',
      distance: '0.5 km',
      timestamp: '2024-01-15 14:30',
      accuracy: 'high',
    },
    {
      id: 2,
      userId: 'USR002',
      userName: 'Trần Thị B',
      location: { lat: 10.8435, lng: 106.7784, address: 'Quận 3, TP.HCM' },
      recommendedDish: 'Cà Phê Trứng',
      restaurant: 'Café Hà Nội',
      recommendationReason: 'Thích cà phê + khu vực gần',
      status: 'viewed',
      distance: '0.8 km',
      timestamp: '2024-01-15 14:25',
      accuracy: 'medium',
    },
    {
      id: 3,
      userId: 'USR003',
      userName: 'Lê Minh C',
      location: { lat: 10.8472, lng: 106.7606, address: 'Quận 7, TP.HCM' },
      recommendedDish: 'Bánh Mì Thập Cẩm',
      restaurant: 'Bánh Mì Ơi',
      recommendationReason: 'Bánh mì + lunch time',
      status: 'converted',
      distance: '0.3 km',
      timestamp: '2024-01-15 14:20',
      accuracy: 'high',
    },
  ]

  const metrics = {
    conversion: { label: 'Tỷ Lệ Chuyển Đổi', value: '78.2%', change: '+5.4%' },
    accuracy: { label: 'Độ Chính Xác', value: '87.5%', change: '+3.2%' },
    avgDistance: {
      label: 'Khoảng Cách TB',
      value: '0.54 km',
      change: '-0.12 km',
    },
    engagement: { label: 'Tham Gia', value: '92.1%', change: '+8.7%' },
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'converted':
        return 'success'
      case 'viewed':
        return 'info'
      case 'ignored':
        return 'warning'
      default:
        return 'default'
    }
  }

  const getAccuracyIcon = (accuracy) => {
    switch (accuracy) {
      case 'high':
        return '🎯'
      case 'medium':
        return '⚡'
      case 'low':
        return '⚠️'
      default:
        return '❓'
    }
  }

  return (
    <div className='recommendation-analytics'>
      <div className='metrics-grid'>
        {Object.entries(metrics).map(([key, metric]) => (
          <div
            key={key}
            className={`metric-card ${selectedMetric === key ? 'active' : ''}`}
            onClick={() => setSelectedMetric(key)}
          >
            <h4>{metric.label}</h4>
            <div className='metric-value'>{metric.value}</div>
            <p className='metric-change'>{metric.change}</p>
          </div>
        ))}
      </div>

      <div className='recommendations-section'>
        <h3>Lịch Sử Gợi Ý</h3>
        <div className='recommendations-table'>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Khu Vực</th>
                <th>Gợi Ý</th>
                <th>Nhà Hàng</th>
                <th>Lý Do</th>
                <th>Khoảng Cách</th>
                <th>Độ Chính Xác</th>
                <th>Trạng Thái</th>
                <th>Thời Gian</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((rec) => (
                <tr key={rec.id} className='rec-row'>
                  <td className='user-info'>
                    <div className='user-name'>{rec.userName}</div>
                    <div className='user-id'>{rec.userId}</div>
                  </td>
                  <td>
                    <div className='location-info'>
                      <span className='location-emoji'>📍</span>
                      <div>
                        <div className='location-name'>
                          {rec.location.address}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='dish-name'>{rec.recommendedDish}</td>
                  <td>{rec.restaurant}</td>
                  <td className='reason-text'>{rec.recommendationReason}</td>
                  <td className='distance'>{rec.distance}</td>
                  <td>
                    <span className='accuracy-badge'>
                      {getAccuracyIcon(rec.accuracy)}{' '}
                      {rec.accuracy.charAt(0).toUpperCase() +
                        rec.accuracy.slice(1)}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${getStatusColor(rec.status)}`}
                    >
                      {rec.status === 'converted'
                        ? '✓ Chuyển Đổi'
                        : rec.status === 'viewed'
                        ? '👁️ Xem'
                        : '❌ Bỏ Qua'}
                    </span>
                  </td>
                  <td className='timestamp'>{rec.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='insights-section'>
        <h3>Insights</h3>
        <div className='insights-grid'>
          <div className='insight-card'>
            <span className='insight-icon'>🎯</span>
            <div className='insight-content'>
              <h4>Tỷ Lệ Chuyển Đổi Cao Nhất</h4>
              <p>Phở Bò tại Quận 1 có tỷ lệ chuyển đổi 92%</p>
            </div>
          </div>
          <div className='insight-card'>
            <span className='insight-icon'>📍</span>
            <div className='insight-content'>
              <h4>Khu Vực Nóng</h4>
              <p>Quận 1 với 450 gợi ý thành công trong tuần này</p>
            </div>
          </div>
          <div className='insight-card'>
            <span className='insight-icon'>⚡</span>
            <div className='insight-content'>
              <h4>Thời Gian Tối Ưu</h4>
              <p>Gợi ý hiệu quả nhất vào lúc 12h-14h (lunch time)</p>
            </div>
          </div>
          <div className='insight-card'>
            <span className='insight-icon'>👥</span>
            <div className='insight-content'>
              <h4>User Segment Tốt</h4>
              <p>Nhóm tuổi 25-35 có tỷ lệ tham gia 94.2%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecommendationAnalytics
