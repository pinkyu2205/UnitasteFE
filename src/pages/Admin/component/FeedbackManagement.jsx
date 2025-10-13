// src/pages/Admin/component/FeedbackManagement.jsx

import { useState } from 'react'
import '../CSS/FeedbackManagement.css'

const FeedbackManagement = () => {
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      userId: 'USR001',
      userName: 'Nguyễn Văn A',
      type: 'recommendation',
      rating: 5,
      title: 'Gợi ý rất chính xác!',
      content: 'Phở được gợi ý rất phù hợp với vị trí của tôi',
      relatedItem: 'Phở Gia Truyền',
      status: 'resolved',
      date: '2024-01-15',
      response: 'Cảm ơn bạn đã phản hồi tích cực!',
    },
    {
      id: 2,
      userId: 'USR002',
      userName: 'Trần Thị B',
      type: 'restaurant',
      rating: 3,
      title: 'Nhà hàng không sạch sẽ',
      content: 'Nhà hàng này không đạt yêu cầu vệ sinh',
      relatedItem: 'Quán Ăn ABC',
      status: 'pending',
      date: '2024-01-15',
      response: null,
    },
    {
      id: 3,
      userId: 'USR003',
      userName: 'Lê Minh C',
      type: 'app',
      rating: 4,
      title: 'App rất tiện lợi',
      content: 'Giao diện dễ sử dụng, tìm được nhiều quán ăn tốt',
      relatedItem: 'FoodFinder App',
      status: 'resolved',
      date: '2024-01-14',
      response: 'Cảm ơn bạn! Chúng tôi sẽ tiếp tục cải thiện',
    },
    {
      id: 4,
      userId: 'USR004',
      userName: 'Phạm Thị D',
      type: 'recommendation',
      rating: 2,
      title: 'Gợi ý không phù hợp',
      content: 'Khoảng cách quá xa, nhà hàng đã đóng cửa',
      relatedItem: 'Bánh Mì Ơi',
      status: 'in_progress',
      date: '2024-01-14',
      response: null,
    },
  ])

  const filteredFeedbacks = feedbacks.filter((fb) => {
    const matchSearch =
      fb.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fb.userName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = filterStatus === 'all' || fb.status === filterStatus
    return matchSearch && matchStatus
  })

  const handleRespond = (id, response) => {
    setFeedbacks(
      feedbacks.map((fb) =>
        fb.id === id ? { ...fb, response, status: 'resolved' } : fb
      )
    )
  }

  const handleStatusChange = (id, newStatus) => {
    setFeedbacks(
      feedbacks.map((fb) => (fb.id === id ? { ...fb, status: newStatus } : fb))
    )
  }

  const getRatingStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  const getTypeLabel = (type) => {
    const types = {
      recommendation: '🎯 Gợi ý',
      restaurant: '🍽️ Nhà hàng',
      app: '📱 App',
      other: '📝 Khác',
    }
    return types[type] || 'Khác'
  }

  const getStatusColor = (status) => {
    const colors = {
      resolved: 'success',
      pending: 'warning',
      in_progress: 'info',
      rejected: 'danger',
    }
    return colors[status] || 'default'
  }

  const getStatusLabel = (status) => {
    const labels = {
      resolved: '✓ Đã xử lý',
      pending: '⏳ Chờ xử lý',
      in_progress: '⚙️ Đang xử lý',
      rejected: '✗ Từ chối',
    }
    return labels[status] || 'N/A'
  }

  const stats = [
    { label: 'Tổng Feedback', value: feedbacks.length, color: 'blue' },
    {
      label: 'Chờ Xử Lý',
      value: feedbacks.filter((f) => f.status === 'pending').length,
      color: 'warning',
    },
    {
      label: 'Đang Xử Lý',
      value: feedbacks.filter((f) => f.status === 'in_progress').length,
      color: 'info',
    },
    {
      label: 'Đã Xử Lý',
      value: feedbacks.filter((f) => f.status === 'resolved').length,
      color: 'success',
    },
  ]

  return (
    <div className='feedback-management'>
      <div className='feedback-stats'>
        {stats.map((stat, idx) => (
          <div key={idx} className={`stat-card ${stat.color}`}>
            <div className='stat-label'>{stat.label}</div>
            <div className='stat-value'>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className='feedback-header'>
        <div className='search-filter'>
          <input
            type='text'
            placeholder='Tìm theo tiêu đề hoặc tên user...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='search-input'
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className='filter-select'
          >
            <option value='all'>Tất cả trạng thái</option>
            <option value='pending'>Chờ xử lý</option>
            <option value='in_progress'>Đang xử lý</option>
            <option value='resolved'>Đã xử lý</option>
          </select>
        </div>
      </div>

      <div className='feedbacks-container'>
        {filteredFeedbacks.map((feedback) => (
          <div key={feedback.id} className={`feedback-card ${feedback.status}`}>
            <div className='feedback-header-section'>
              <div className='feedback-user'>
                <div className='user-avatar'>{feedback.userName.charAt(0)}</div>
                <div className='user-info'>
                  <h4>{feedback.userName}</h4>
                  <p>{feedback.userId}</p>
                </div>
              </div>

              <div className='feedback-meta'>
                <span className='feedback-type'>
                  {getTypeLabel(feedback.type)}
                </span>
                <span className='feedback-date'>{feedback.date}</span>
              </div>

              <div className='feedback-rating'>
                <span className='stars'>{getRatingStars(feedback.rating)}</span>
              </div>

              <div
                className={`status-badge ${getStatusColor(feedback.status)}`}
              >
                {getStatusLabel(feedback.status)}
              </div>
            </div>

            <div className='feedback-content'>
              <h3>{feedback.title}</h3>
              <p>{feedback.content}</p>
              <div className='related-item'>
                📌 Liên quan đến: <strong>{feedback.relatedItem}</strong>
              </div>
            </div>

            {feedback.response && (
              <div className='feedback-response'>
                <h5>Phản hồi:</h5>
                <p>{feedback.response}</p>
              </div>
            )}

            <div className='feedback-actions'>
              <select
                value={feedback.status}
                onChange={(e) =>
                  handleStatusChange(feedback.id, e.target.value)
                }
                className='status-select'
              >
                <option value='pending'>Chờ xử lý</option>
                <option value='in_progress'>Đang xử lý</option>
                <option value='resolved'>Đã xử lý</option>
              </select>

              {!feedback.response && (
                <button className='btn-respond'>✏️ Phản hồi</button>
              )}

              <button className='btn-details'>📋 Chi tiết</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeedbackManagement
