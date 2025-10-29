// src/pages/VipSubscription/VipSubscription.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PaymentApi from '../../api/paymentApi' // Import API đã cập nhật
import './VipSubscription.css'

// Định dạng tiền tệ VND
const formatCurrency = (amount) => {
  try {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(Number(amount) || 0)
  } catch {
    return `${amount}`
  }
}

const VipSubscription = () => {
  const [view, setView] = useState('compare')
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isVip, setIsVip] = useState(false) // <-- State mới để lưu trạng thái VIP
  const [checkingStatus, setCheckingStatus] = useState(true) // <-- State để biết đang kiểm tra
  const [currentDurationMonths, setCurrentDurationMonths] = useState(0) // Gói hiện tại
  const navigate = useNavigate()

  // 👇 THÊM useEffect ĐỂ KIỂM TRA TRẠNG THÁI VIP 👇
  useEffect(() => {
    const checkStatus = async () => {
      setCheckingStatus(true)
      try {
        // Gọi API checkVipStatus
        const response = await PaymentApi.checkVipStatus()
        const purchased =
          response?.hasPurchased ?? response?.data?.hasPurchased ?? false
        setIsVip(!!purchased)

        // Nếu đã có VIP, thử lấy lịch sử để biết thời hạn gói hiện tại
        try {
          const history = await PaymentApi.getPurchasesByUserToken()
          const items = Array.isArray(history)
            ? history
            : Array.isArray(history?.data)
            ? history.data
            : []
          // Tìm gói còn hiệu lực gần nhất
          const now = new Date()
          const active =
            items.find(
              (p) =>
                p?.isActive === true ||
                (p?.endDate && new Date(p.endDate) > now) ||
                (p?.status && String(p.status).toUpperCase() === 'ACTIVE')
            ) || items[0]
          const duration =
            active?.durationInMonths ||
            active?.servicePackage?.durationInMonths ||
            0
          setCurrentDurationMonths(Number(duration) || 0)
        } catch (_) {
          setCurrentDurationMonths(0)
        }
      } catch (err) {
        // Lỗi có thể do chưa đăng nhập (không có token/userId) hoặc lỗi mạng
        console.error('Lỗi kiểm tra trạng thái VIP:', err)
        // Mặc định là không phải VIP nếu có lỗi
        setIsVip(false)
      } finally {
        setCheckingStatus(false)
      }
    }
    checkStatus()
  }, []) // Chạy 1 lần khi component mount

  const handleShowPackages = async () => {
    // Chỉ cho phép hiển thị gói nếu chưa phải là VIP
    if (isVip) return

    setView('select')
    setLoading(true)
    setError(null)
    try {
      const result = await PaymentApi.getAllServicePackages()
      const list = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
        ? result.data
        : Array.isArray(result?.items)
        ? result.items
        : []
      setPackages(list)
    } catch (err) {
      console.error('Lỗi khi tải gói VIP:', err)
      setError('Không thể tải danh sách gói. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectPackage = (pkg) => {
    const locked =
      Number(currentDurationMonths) > 0 &&
      Number(pkg?.durationInMonths) <= Number(currentDurationMonths)
    if (locked) return
    navigate('/vip-checkout', { state: { selectedPackage: pkg } })
  }

  // Giao diện so sánh ban đầu
  const renderCompareView = () => (
    <div className='subscription-cards'>
      {/* Thẻ Gói Thường */}
      <div className='sub-card'>
        <h2 className='card-title-free'>Gói Thường</h2>
        {/* ... (danh sách features) ... */}
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
        <button className='sub-button-free' disabled={!isVip}>
          {' '}
          {/* Chỉ disable nếu đang là VIP */}
          {isVip ? 'Đang dùng gói VIP' : 'Bạn đang dùng gói này'}
        </button>
      </div>

      {/* Thẻ Gói VIP */}
      <div className='sub-card vip'>
        <div className='popular-badge'>PREMIUM</div>
        <h2 className='card-title-vip'>Thành viên VIP</h2>
        {/* ... (danh sách features) ... */}
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

        {/* 👇 CẬP NHẬT NÚT BẤM DỰA TRÊN isVip và checkingStatus 👇 */}
        <button
          className='sub-button-vip'
          onClick={handleShowPackages}
          // Vô hiệu hóa nút nếu đang kiểm tra HOẶC đã là VIP
          disabled={checkingStatus || isVip}
        >
          {checkingStatus
            ? 'Đang kiểm tra...'
            : isVip
            ? 'Bạn đã là thành viên VIP'
            : 'Đăng ký ngay'}
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
          const locked =
            Number(currentDurationMonths) > 0 &&
            Number(pkg.durationInMonths) <= Number(currentDurationMonths)

          return (
            <div
              key={pkg.servicePackageId}
              className={`package-card ${isPopular ? 'popular' : ''} ${
                locked ? 'disabled' : ''
              }`}
              onClick={() => !locked && handleSelectPackage(pkg)}
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
              <button className='pkg-select-btn' disabled={locked}>
                {locked
                  ? 'Bạn đã sở hữu gói này - Hãy nâng cấp'
                  : 'Chọn gói này'}
              </button>
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
