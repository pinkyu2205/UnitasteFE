// src/pages/Admin/component/ReviewManagement.jsx

import { useState } from 'react'
import {
  CheckCircleIcon,
  EditIcon,
  EyeIcon,
  SearchIcon,
  StarIcon,
  TrashIcon,
  XCircleIcon,
} from './AdminIcons'
import '../CSS/ReviewManagement.css'

const ReviewManagement = () => {
  const [activeTab, setActiveTab] = useState('reviews') // 'reviews' or 'reports'
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterRating, setFilterRating] = useState('all')
  const [selectedReview, setSelectedReview] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [showReplyModal, setShowReplyModal] = useState(false)

  // Mock data - Danh sách đánh giá
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userName: 'Nguyễn Văn A',
      userAvatar: 'https://via.placeholder.com/40',
      restaurantName: 'Phở Gia Truyền',
      rating: 5,
      comment: 'Món ăn rất ngon, phục vụ tận tình. Sẽ quay lại!',
      date: '2024-01-15 14:30',
      status: 'approved', // approved, pending, hidden
      adminReply: null,
      images: [],
    },
    {
      id: 2,
      userName: 'Trần Thị B',
      userAvatar: 'https://via.placeholder.com/40',
      restaurantName: 'Bánh Mì Ơi',
      rating: 3,
      comment: 'Bánh mì ổn nhưng hơi đắt so với chất lượng',
      date: '2024-01-14 10:20',
      status: 'pending',
      adminReply: null,
      images: [],
    },
    {
      id: 3,
      userName: 'Lê Minh C',
      userAvatar: 'https://via.placeholder.com/40',
      restaurantName: 'Cơm Tấm 24h',
      rating: 1,
      comment: 'Không sạch sẽ, thái độ phục vụ tệ',
      date: '2024-01-13 20:15',
      status: 'hidden',
      adminReply: 'Cảm ơn bạn đã phản hồi. Chúng tôi sẽ kiểm tra lại.',
      images: [],
    },
    {
      id: 4,
      userName: 'Phạm Thị D',
      userAvatar: 'https://via.placeholder.com/40',
      restaurantName: 'Café Hà Nội',
      rating: 4,
      comment: 'Không gian đẹp, phù hợp để làm việc',
      date: '2024-01-12 16:45',
      status: 'approved',
      adminReply: null,
      images: [],
    },
  ])

  // Mock data - Báo cáo vi phạm
  const [reports, setReports] = useState([
    {
      id: 1,
      reviewId: 3,
      reporterName: 'User X',
      reason: 'Ngôn từ không phù hợp',
      description: 'Đánh giá có từ ngữ xúc phạm',
      date: '2024-01-13 21:00',
      status: 'pending', // pending, resolved, rejected
      review: {
        userName: 'Lê Minh C',
        restaurantName: 'Cơm Tấm 24h',
        rating: 1,
        comment: 'Không sạch sẽ, thái độ phục vụ tệ',
      },
    },
    {
      id: 2,
      reviewId: 5,
      reporterName: 'User Y',
      reason: 'Spam',
      description: 'Đánh giá spam nhiều lần',
      date: '2024-01-11 09:30',
      status: 'resolved',
      review: {
        userName: 'Spammer',
        restaurantName: 'Quán ABC',
        rating: 5,
        comment: 'Click vào link này để nhận ưu đãi...',
      },
    },
  ])

  // Filter reviews
  const filteredReviews = reviews.filter((review) => {
    const matchSearch =
      review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())

    const matchStatus = filterStatus === 'all' || review.status === filterStatus
    const matchRating = filterRating === 'all' || review.rating === parseInt(filterRating)

    return matchSearch && matchStatus && matchRating
  })

  // Filter reports
  const filteredReports = reports.filter((report) => {
    const matchSearch =
      report.reporterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchTerm.toLowerCase())

    const matchStatus = filterStatus === 'all' || report.status === filterStatus

    return matchSearch && matchStatus
  })

  // Statistics
  const stats = {
    total: reviews.length,
    approved: reviews.filter((r) => r.status === 'approved').length,
    pending: reviews.filter((r) => r.status === 'pending').length,
    hidden: reviews.filter((r) => r.status === 'hidden').length,
    reports: reports.filter((r) => r.status === 'pending').length,
  }

  // Handle actions
  const handleApprove = (id) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status: 'approved' } : r)))
  }

  const handleHide = (id) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status: 'hidden' } : r)))
  }

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
      setReviews(reviews.filter((r) => r.id !== id))
    }
  }

  const handleReply = (review) => {
    setSelectedReview(review)
    setReplyText(review.adminReply || '')
    setShowReplyModal(true)
  }

  const handleSubmitReply = () => {
    setReviews(
      reviews.map((r) =>
        r.id === selectedReview.id ? { ...r, adminReply: replyText } : r
      )
    )
    setShowReplyModal(false)
    setSelectedReview(null)
    setReplyText('')
  }

  const handleResolveReport = (id) => {
    setReports(reports.map((r) => (r.id === id ? { ...r, status: 'resolved' } : r)))
  }

  const handleRejectReport = (id) => {
    setReports(reports.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r)))
  }

  // Render stars
  const renderStars = (rating) => {
    return (
      <div className='star-rating'>
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} size={16} filled={i < rating} color='#f59e0b' />
        ))}
      </div>
    )
  }

  return (
    <div className='review-management'>
      {/* Statistics Cards */}
      <div className='review-stats'>
        <div className='stat-card blue'>
          <div className='stat-label'>Tổng Đánh Giá</div>
          <div className='stat-value'>{stats.total}</div>
        </div>
        <div className='stat-card green'>
          <div className='stat-label'>Đã Duyệt</div>
          <div className='stat-value'>{stats.approved}</div>
        </div>
        <div className='stat-card orange'>
          <div className='stat-label'>Chờ Duyệt</div>
          <div className='stat-value'>{stats.pending}</div>
        </div>
        <div className='stat-card red'>
          <div className='stat-label'>Đã Ẩn</div>
          <div className='stat-value'>{stats.hidden}</div>
        </div>
        <div className='stat-card purple'>
          <div className='stat-label'>Báo Cáo Vi Phạm</div>
          <div className='stat-value'>{stats.reports}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className='review-tabs'>
        <button
          className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Danh Sách Đánh Giá
        </button>
        <button
          className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          Báo Cáo Vi Phạm ({stats.reports})
        </button>
      </div>

      {/* Filters */}
      <div className='review-filters'>
        <div className='search-box'>
          <SearchIcon size={20} />
          <input
            type='text'
            placeholder={
              activeTab === 'reviews'
                ? 'Tìm theo tên, nhà hàng, nội dung...'
                : 'Tìm theo người báo cáo, lý do...'
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className='filter-select'
        >
          {activeTab === 'reviews' ? (
            <>
              <option value='all'>Tất cả trạng thái</option>
              <option value='approved'>Đã duyệt</option>
              <option value='pending'>Chờ duyệt</option>
              <option value='hidden'>Đã ẩn</option>
            </>
          ) : (
            <>
              <option value='all'>Tất cả trạng thái</option>
              <option value='pending'>Chờ xử lý</option>
              <option value='resolved'>Đã xử lý</option>
              <option value='rejected'>Đã từ chối</option>
            </>
          )}
        </select>
        {activeTab === 'reviews' && (
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className='filter-select'
          >
            <option value='all'>Tất cả đánh giá</option>
            <option value='5'>5 sao</option>
            <option value='4'>4 sao</option>
            <option value='3'>3 sao</option>
            <option value='2'>2 sao</option>
            <option value='1'>1 sao</option>
          </select>
        )}
      </div>

      {/* Content */}
      {activeTab === 'reviews' ? (
        <div className='reviews-list'>
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div key={review.id} className={`review-card ${review.status}`}>
                <div className='review-header'>
                  <div className='user-info'>
                    <img
                      src={review.userAvatar}
                      alt={review.userName}
                      className='user-avatar'
                    />
                    <div>
                      <h4>{review.userName}</h4>
                      <p className='restaurant-name'>{review.restaurantName}</p>
                    </div>
                  </div>
                  <div className='review-meta'>
                    {renderStars(review.rating)}
                    <span className='review-date'>{review.date}</span>
                    <span className={`status-badge ${review.status}`}>
                      {review.status === 'approved' ? (
                        <>
                          <CheckCircleIcon size={14} /> Đã duyệt
                        </>
                      ) : review.status === 'pending' ? (
                        <>
                          <EyeIcon size={14} /> Chờ duyệt
                        </>
                      ) : (
                        <>
                          <XCircleIcon size={14} /> Đã ẩn
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div className='review-content'>
                  <p>{review.comment}</p>
                </div>

                {review.adminReply && (
                  <div className='admin-reply'>
                    <strong>Phản hồi của Admin:</strong>
                    <p>{review.adminReply}</p>
                  </div>
                )}

                <div className='review-actions'>
                  {review.status !== 'approved' && (
                    <button
                      className='action-btn approve'
                      onClick={() => handleApprove(review.id)}
                    >
                      <CheckCircleIcon size={18} /> Duyệt
                    </button>
                  )}
                  {review.status !== 'hidden' && (
                    <button
                      className='action-btn hide'
                      onClick={() => handleHide(review.id)}
                    >
                      <XCircleIcon size={18} /> Ẩn
                    </button>
                  )}
                  <button
                    className='action-btn reply'
                    onClick={() => handleReply(review)}
                  >
                    <EditIcon size={18} /> {review.adminReply ? 'Sửa trả lời' : 'Trả lời'}
                  </button>
                  <button
                    className='action-btn delete'
                    onClick={() => handleDelete(review.id)}
                  >
                    <TrashIcon size={18} /> Xóa
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className='no-data'>Không tìm thấy đánh giá nào</div>
          )}
        </div>
      ) : (
        <div className='reports-list'>
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <div key={report.id} className={`report-card ${report.status}`}>
                <div className='report-header'>
                  <div className='report-info'>
                    <h4>Báo cáo #{report.id}</h4>
                    <p>
                      Người báo cáo: <strong>{report.reporterName}</strong>
                    </p>
                    <p className='report-date'>{report.date}</p>
                  </div>
                  <span className={`status-badge ${report.status}`}>
                    {report.status === 'pending'
                      ? 'Chờ xử lý'
                      : report.status === 'resolved'
                      ? 'Đã xử lý'
                      : 'Đã từ chối'}
                  </span>
                </div>

                <div className='report-reason'>
                  <strong>Lý do:</strong> {report.reason}
                  <p>{report.description}</p>
                </div>

                <div className='reported-review'>
                  <h5>Đánh giá bị báo cáo:</h5>
                  <div className='review-preview'>
                    <div className='preview-header'>
                      <span>{report.review.userName}</span>
                      {renderStars(report.review.rating)}
                    </div>
                    <p className='preview-restaurant'>{report.review.restaurantName}</p>
                    <p className='preview-comment'>{report.review.comment}</p>
                  </div>
                </div>

                {report.status === 'pending' && (
                  <div className='report-actions'>
                    <button
                      className='action-btn approve'
                      onClick={() => handleResolveReport(report.id)}
                    >
                      <CheckCircleIcon size={18} /> Xử lý
                    </button>
                    <button
                      className='action-btn reject'
                      onClick={() => handleRejectReport(report.id)}
                    >
                      <XCircleIcon size={18} /> Từ chối
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className='no-data'>Không tìm thấy báo cáo nào</div>
          )}
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && (
        <div className='modal-overlay' onClick={() => setShowReplyModal(false)}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <div className='modal-header'>
              <h3>Trả lời đánh giá</h3>
              <button className='close-btn' onClick={() => setShowReplyModal(false)}>
                ×
              </button>
            </div>
            <div className='modal-body'>
              <div className='review-info'>
                <p>
                  <strong>Người dùng:</strong> {selectedReview?.userName}
                </p>
                <p>
                  <strong>Nhà hàng:</strong> {selectedReview?.restaurantName}
                </p>
                <p>
                  <strong>Đánh giá:</strong> {selectedReview?.comment}
                </p>
              </div>
              <textarea
                className='reply-textarea'
                placeholder='Nhập phản hồi của bạn...'
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={5}
              />
            </div>
            <div className='modal-footer'>
              <button className='btn-cancel' onClick={() => setShowReplyModal(false)}>
                Hủy
              </button>
              <button className='btn-submit' onClick={handleSubmitReply}>
                Gửi phản hồi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewManagement

