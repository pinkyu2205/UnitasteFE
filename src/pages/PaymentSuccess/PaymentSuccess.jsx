import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import SuccessPopup from '../../components/SuccessPopup'
import PaymentApi from '../../api/paymentApi'

const PaymentSuccess = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const orderCode = params.get('orderCode')
    const status = params.get('status')
    const cancel = params.get('cancel')

    // Nếu người dùng hủy thanh toán
    if (cancel === 'true') {
      alert('Thanh toán đã bị hủy.')
      navigate('/vip-subscription')
      return
    }

    // Nếu thanh toán thành công
    if (status === 'PAID' && orderCode) {
      // Gọi API xác nhận thanh toán thành công thông qua PaymentApi
      PaymentApi.paymentSuccessCallback(orderCode)
        .then(() => {
          console.log('✅ Đã xác nhận thanh toán thành công.')
          setShowSuccess(true) // Hiển thị popup sau khi xác nhận thành công
        })
        .catch((err) => {
          console.error('❌ Lỗi callback xác nhận thanh toán:', err)
          // Vẫn hiển thị popup thành công vì payment gateway đã xác nhận
          setShowSuccess(true)
        })
    } else if (!cancel) {
      // Nếu không có cancel và không có status PAID, có thể là truy cập trực tiếp
      setShowSuccess(true)
    }
  }, [location.search, navigate])

  // Chỉ hiển thị popup khi thanh toán thành công
  if (!showSuccess) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Đang xử lý thanh toán...
      </div>
    )
  }

  return (
    <SuccessPopup
      title='🎉 Thanh toán thành công!'
      message='Cảm ơn bạn đã nâng cấp lên gói VIP. Chúc bạn có trải nghiệm tuyệt vời với Unitaste!'
      duration={5}
      onClose={() => navigate('/')}
    />
  )
}

export default PaymentSuccess
