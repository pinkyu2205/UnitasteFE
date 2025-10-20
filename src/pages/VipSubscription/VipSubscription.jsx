import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PaymentApi from '../../api/paymentApi'
import './VipSubscription.css' // File CSS mới

// Hàm format tiền
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

const VipSubscription = () => {
  const [view, setView] = useState('compare') // 'compare' hoặc 'select'
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Hàm gọi API khi người dùng bấm "Đăng ký VIP"
  const handleShowPackages = async () => {
    setView('select') // Chuyển sang màn hình chọn gói
    setLoading(true)
    setError(null)
    try {
      const data = await PaymentApi.getAllServicePackages()
      setPackages(data)
    } catch (err) {
      console.error('Lỗi khi tải gói VIP:', err)
      setError('Không thể tải danh sách gói. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  // Hàm chọn gói và chuyển sang trang xác nhận
  const handleSelectPackage = (pkg) => {
    navigate('/vip-checkout', { state: { selectedPackage: pkg } })
  }

  // Giao diện so sánh ban đầu
  const renderCompareView = () => (
    <div className='subscription-cards'>
      {/* Thẻ Gói Thường */}
      <div className='sub-card'>
        <h2 className='card-title-free'>Gói Thường</h2>
        <ul className='features-list'>
          <li>
            <span className='icon-no'>❌</span> Chứa quảng cáo
          </li>
          <li>
            <span className='icon-no'>❌</span> Giới hạn lượt dùng AI
          </li>
          <li>
            <span className='icon-no'>❌</span> Giới hạn tìm kiếm
          </li>
          <li>
            <span className='icon-no'>❌</span> Không xem được bản đồ thời tiết
          </li>
        </ul>
        <button className='sub-button-free' disabled>
          Bạn đang dùng gói này
        </button>
      </div>

      {/* Thẻ Gói VIP */}
      <div className='sub-card vip'>
        <div className='popular-badge'>PREMIUM</div>
        <h2 className='card-title-vip'>Thành viên VIP</h2>
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
        <button className='sub-button-vip' onClick={handleShowPackages}>
          Đăng ký ngay
        </button>
      </div>
    </div>
  )

  // Giao diện chọn gói (sau khi bấm "Đăng ký")
  const renderSelectView = () => (
    <div className='package-selection'>
      <button className='back-btn' onClick={() => setView('compare')}>
        &larr; Quay lại
      </button>
      <h2 className='select-title'>Chọn gói đăng ký của bạn</h2>
      {loading && <div className='loading-spinner'>Đang tải...</div>}
      {error && <div className='error-message'>{error}</div>}

      <div className='package-grid'>
        {packages.map((pkg, index) => {
          // Tính toán giá mỗi tháng để hiển thị (nếu muốn)
          const pricePerMonth = pkg.price / pkg.durationInMonths
          const isPopular = index === packages.length - 1 // Đánh dấu gói dài nhất là "Phổ biến"

          return (
            <div
              key={pkg.servicePackageId}
              className={`package-card ${isPopular ? 'popular' : ''}`}
              onClick={() => handleSelectPackage(pkg)}
            >
              {isPopular && (
                <div className='popular-badge-pkg'>Tiết kiệm nhất</div>
              )}
              <h3 className='pkg-name'>{pkg.description}</h3>
              <div className='pkg-price'>{formatCurrency(pkg.price)}</div>
              <div className='pkg-duration'>{pkg.durationInMonths} tháng</div>
              <div className='pkg-price-per-month'>
                (Chỉ {formatCurrency(pricePerMonth)}/tháng)
              </div>
              <button className='pkg-select-btn'>Chọn gói này</button>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className='subscription-container'>
      {view === 'compare' ? renderCompareView() : renderSelectView()}
    </div>
  )
}

export default VipSubscription
