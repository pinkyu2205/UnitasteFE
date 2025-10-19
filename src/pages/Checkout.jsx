// src/pages/Checkout/Checkout.jsx
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/Unitaste-logo.png' // Dùng lại logo
import './Checkout.css'

// Hàm format tiền VND
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

const Checkout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Nhận dữ liệu 'tier' được gửi từ trang ProfilePayment
  const { tier } = location.state || {}

  if (!tier) {
    return (
      <div className='checkout-container'>
        <div className='checkout-card'>
          <h2>Lỗi</h2>
          <p>Không tìm thấy thông tin gói nạp. Vui lòng thử lại.</p>
          <button onClick={() => navigate(-1)} className='checkout-back-btn'>
            Quay lại
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='checkout-container'>
      <img src={logo} alt='Unitaste Logo' className='checkout-logo' />
      <div className='checkout-card'>
        <h2>Xác nhận thanh toán</h2>
        <p className='checkout-summary'>Bạn đang thanh toán cho gói:</p>
        <div className='checkout-details'>
          <span className='checkout-coin'>
            {tier.coin.toLocaleString('en-US')} Unicoin
          </span>
          <span className='checkout-vnd'>{formatCurrency(tier.vnd)}</span>
        </div>

        <div className='payment-gateway-placeholder'>
          <p>
            Đây là nơi tích hợp cổng thanh toán của bên thứ 3 (Ngân hàng, MoMo,
            VNPay...)
          </p>
          {/*  */}
        </div>

        <div className='checkout-actions'>
          <button onClick={() => navigate(-1)} className='checkout-back-btn'>
            Hủy
          </button>
          <button className='checkout-confirm-btn'>Xác nhận thanh toán</button>
        </div>
      </div>
    </div>
  )
}

export default Checkout
