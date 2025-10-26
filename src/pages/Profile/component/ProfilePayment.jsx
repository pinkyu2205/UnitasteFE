// src/pages/Profile/component/ProfilePayment.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PaymentApi from '../../../api/paymentApi'
import logo from '../../../assets/Unitaste-logo.png'
import '../CSS/ProfilePayment.css'

// Hàm format tiền VND
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

const ProfilePayment = () => {
  const navigate = useNavigate()
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Lấy dữ liệu gói VIP từ API
  useEffect(() => {
    const fetchPackages = async () => {
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
    fetchPackages()
  }, [])

  const handleSelectPackage = (pkg) => {
    navigate('/vip-checkout', { state: { selectedPackage: pkg } })
  }

  if (loading) {
    return (
      <div className='profile-payment-container'>
        <div className='loading-state'>
          <div className='loading-spinner'></div>
          <p>Đang tải các gói dịch vụ...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='profile-payment-container'>
        <div className='error-state'>
          <div className='error-icon'>⚠️</div>
          <p>{error}</p>
          <button className='retry-btn' onClick={() => window.location.reload()}>
            Thử lại
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='profile-payment-container'>
      <div className='payment-header'>
        <div className='header-icon-wrapper'>
          <img src={logo} alt='Unitaste Logo' className='payment-logo-icon' />
          <div className='icon-glow'></div>
        </div>
        <h2>Nâng cấp lên VIP</h2>
        <p className='header-subtitle'>
          Trải nghiệm đầy đủ tính năng với gói thành viên VIP
        </p>
        <div className='vip-benefits'>
          <div className='benefit-item'>
            <span className='benefit-icon'>✨</span>
            <span>Không quảng cáo</span>
          </div>
          <div className='benefit-item'>
            <span className='benefit-icon'>🤖</span>
            <span>AI không giới hạn</span>
          </div>
          <div className='benefit-item'>
            <span className='benefit-icon'>🗺️</span>
            <span>Bản đồ thời tiết</span>
          </div>
          <div className='benefit-item'>
            <span className='benefit-icon'>⚡</span>
            <span>Ưu tiên hỗ trợ</span>
          </div>
        </div>
      </div>

      <div className='payment-grid'>
        {packages.map((pkg, index) => {
          const pricePerMonth = pkg.price / pkg.durationInMonths
          const isPopular = index === Math.floor(packages.length / 2) // Đánh dấu gói giữa là phổ biến
          const isBestValue = index === packages.length - 1 // Gói dài nhất là tiết kiệm nhất

          return (
            <div
              key={pkg.servicePackageId}
              className={`payment-card ${isPopular ? 'popular' : ''} ${
                isBestValue ? 'best-value' : ''
              }`}
              onClick={() => handleSelectPackage(pkg)}
            >
              {isPopular && <div className='badge-tag popular-badge'>PHỔ BIẾN</div>}
              {isBestValue && <div className='badge-tag best-value-badge'>TIẾT KIỆM NHẤT</div>}

              <div className='card-header'>
                <div className='duration-badge'>
                  <svg className='duration-icon' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2'/>
                    <path d='M12 6V12L16 14' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
                  </svg>
                  <span>{pkg.durationInMonths} tháng</span>
                </div>
              </div>

              <div className='card-content'>
                <h3 className='package-name'>{pkg.description}</h3>
                <div className='price-section'>
                  <div className='main-price'>{formatCurrency(pkg.price)}</div>
                  <div className='price-per-month'>
                    {formatCurrency(pricePerMonth)}/tháng
                  </div>
                </div>
                
                <div className='package-features'>
                  <div className='feature-item'>
                    <svg className='check-icon' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M20 6L9 17L4 12' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
                    </svg>
                    <span>Tất cả tính năng VIP</span>
                  </div>
                  <div className='feature-item'>
                    <svg className='check-icon' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M20 6L9 17L4 12' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
                    </svg>
                    <span>Hỗ trợ ưu tiên 24/7</span>
                  </div>
                  {isBestValue && (
                    <div className='feature-item highlight'>
                      <svg className='star-icon' viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z'/>
                      </svg>
                      <span>Tiết kiệm {Math.round((1 - pricePerMonth / (packages[0].price / packages[0].durationInMonths)) * 100)}%</span>
                    </div>
                  )}
                </div>
              </div>

              <button className='select-package-btn'>
                <span>Chọn gói này</span>
                <svg className='arrow-icon' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M5 12H19M19 12L12 5M19 12L12 19' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
                </svg>
              </button>
            </div>
          )
        })}
      </div>

      <div className='payment-footer'>
        <p className='footer-note'>
          💡 <strong>Lưu ý:</strong> Sau khi thanh toán, gói VIP sẽ được kích hoạt ngay lập tức.
        </p>
      </div>
    </div>
  )
}

export default ProfilePayment
