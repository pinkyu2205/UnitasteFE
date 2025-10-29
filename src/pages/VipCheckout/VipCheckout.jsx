import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PaymentApi from '../../api/paymentApi'
import './VipCheckout.css' // File CSS mới

// Hàm format tiền
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

const VipCheckout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { selectedPackage } = location.state || {}

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Lấy thông tin người dùng (từ localStorage hoặc context)
  const userName = localStorage.getItem('fullName') || 'Người dùng Unitaste'

  // Tính toán ngày hết hạn
  const getExpiryDate = () => {
    const expiry = new Date()
    expiry.setMonth(expiry.getMonth() + selectedPackage.durationInMonths)
    return expiry.toLocaleDateString('vi-VN')
  }

  // Hàm gọi API tạo thanh toán
  const handleConfirmPayment = async () => {
    setLoading(true)
    setError(null)

    // No need to create uniqueOrderCode or description here anymore

    try {
      // Validate đầu vào
      const packageId = selectedPackage?.servicePackageId
      if (!packageId) {
        setError('Thiếu mã gói dịch vụ. Vui lòng chọn lại gói.')
        return
      }

      // Gọi API tạo thanh toán, axios interceptor trả về response.data
      const response = await PaymentApi.createServicePackagePayment(packageId)

      // Đồng bộ với paymentApi: backend trả về URL thanh toán trong trường phổ biến
      const checkoutUrl =
        response?.checkoutUrl ||
        response?.paymentUrl ||
        response?.redirectUrl ||
        response?.url ||
        response?.data?.checkoutUrl

      if (checkoutUrl) {
        window.location.href = checkoutUrl
      } else {
        console.error('API response missing checkoutUrl:', response)
        setError('Không nhận được liên kết thanh toán. Vui lòng thử lại.')
      }
    } catch (err) {
      console.error('Lỗi khi tạo thanh toán:', err)
      // More specific error handling if needed based on backend response
      const errorMessage =
        err.response?.data?.message ||
        'Tạo thanh toán thất bại. Vui lòng thử lại.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (!selectedPackage) {
    return (
      <div className='checkout-container'>
        <h2>Lỗi</h2>
        <p>Không tìm thấy gói đã chọn. Vui lòng quay lại.</p>
        <button onClick={() => navigate('/vip-subscription')}>Quay lại</button>
      </div>
    )
  }

  return (
    <div className='checkout-container'>
      <div className='checkout-card'>
        <h2 className='checkout-title'>Xác nhận đơn hàng</h2>

        {/* Cột 1: Thông tin gói */}
        <div className='checkout-section'>
          <h3 className='section-title'>Quyền lợi gói VIP</h3>
          <ul className='features-list'>
            <li>
              <span className='icon-yes'>✅</span> Chặn toàn bộ quảng cáo
            </li>
            <li>
              <span className='icon-yes'>✅</span> Dùng AI không giới hạn
            </li>
            <li>
              <span className='icon-yes'>✅</span> Bản đồ thời tiết khu vực
              (Coming Soon)
            </li>
            <li>
              <span className='icon-yes'>✅</span> Ưu tiên hỗ trợ 24/7
            </li>
          </ul>
        </div>

        {/* Cột 2: Tóm tắt */}
        <div className='checkout-section'>
          <h3 className='section-title'>Thông tin thanh toán</h3>
          <div className='summary-table'>
            <div className='summary-row'>
              <span className='summary-label'>Người mua:</span>
              <span className='summary-value'>{userName}</span>
            </div>
            <div className='summary-row'>
              <span className='summary-label'>Gói đăng ký:</span>
              <span className='summary-value'>
                {selectedPackage.description}
              </span>
            </div>
            <div className='summary-row'>
              <span className='summary-label'>Thời hạn:</span>
              <span className='summary-value'>
                {selectedPackage.durationInMonths} tháng
              </span>
            </div>
            <div className='summary-row'>
              <span className='summary-label'>Ngày hết hạn:</span>
              <span className='summary-value'>{getExpiryDate()}</span>
            </div>
            <div className='summary-row total'>
              <span className='summary-label'>Tổng cộng:</span>
              <span className='summary-value total-price'>
                {formatCurrency(selectedPackage.price)}
              </span>
            </div>
          </div>
        </div>

        {/* Nút xác nhận */}
        <div className='checkout-footer'>
          {error && <div className='error-message'>{error}</div>}
          <button
            className='confirm-btn'
            onClick={handleConfirmPayment}
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'Xác nhận và Thanh toán'}
          </button>
          <button
            className='cancel-btn'
            onClick={() => navigate('/vip-subscription')}
            disabled={loading}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  )
}

export default VipCheckout
