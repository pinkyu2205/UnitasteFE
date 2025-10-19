// src/pages/Profile/component/ProfilePayment.jsx
import { useNavigate } from 'react-router-dom'
import logo from '../../../assets/Unitaste-logo.png' // Giả sử bạn có logo trong assets
import '../CSS/ProfilePayment.css'

// Dữ liệu các gói nạp
const paymentTiers = [
  { id: 1, vnd: 10000, coin: 52, bonus: false },
  { id: 2, vnd: 20000, coin: 110, bonus: '5+' },
  { id: 3, vnd: 50000, coin: 275, bonus: '10+' },
  { id: 4, vnd: 100000, coin: 610, bonus: '60+' },
  { id: 5, vnd: 200000, coin: 1220, bonus: '100+' },
  { id: 6, vnd: 500000, coin: 3040, bonus: '290+' },
  { id: 7, vnd: 1000000, coin: 6550, bonus: '1300+' },
  { id: 8, vnd: 2000000, coin: 13250, bonus: '2750+' },
]

// Hàm format tiền VND
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

const ProfilePayment = () => {
  const navigate = useNavigate()

  const handleCheckout = (tier) => {
    // Chuyển sang trang Checkout, mang theo thông tin gói
    navigate('/checkout', { state: { tier } })
  }

  return (
    <div className='profile-payment-container'>
      <div className='payment-header'>
        {/* Bạn có thể dùng logo hoặc icon đồng xu */}
        <img src={logo} alt='Unitaste Logo' className='payment-logo-icon' />
        <h2>Nạp Unicoin</h2>
        <p>Chọn gói nạp để tiếp tục thanh toán</p>
      </div>

      <div className='payment-grid'>
        {paymentTiers.map((tier) => (
          <div className='payment-card' key={tier.id}>
            {/* Tag bonus "lung linh" */}
            {tier.bonus && (
              <div className='bonus-tag'>{`+${
                tier.coin - (tier.vnd / 10000) * 52
              } Unicoin`}</div>
            )}

            <div className='coin-amount'>
              {tier.coin.toLocaleString('en-US')}
              <span> Unicoin</span>
            </div>
            <div className='vnd-amount'>{formatCurrency(tier.vnd)}</div>

            <button
              className='payment-add-btn'
              onClick={() => handleCheckout(tier)}
              title={`Nạp ${formatCurrency(tier.vnd)}`}
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfilePayment
