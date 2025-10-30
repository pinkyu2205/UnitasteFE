import { useEffect, useMemo, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import PaymentApi from '../../api/paymentApi'

const parseQuery = (search) => {
  const params = new URLSearchParams(search)
  const obj = {}
  params.forEach((v, k) => {
    obj[k] = v
  })
  return obj
}

const PaymentSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const query = useMemo(() => parseQuery(location.search), [location.search])
  const [status, setStatus] = useState('processing') // 'processing' | 'success' | 'failed'
  const [message, setMessage] = useState('Đang xác nhận thanh toán...')

  useEffect(() => {
    const finalize = async () => {
      try {
        // Một số cổng trả 'orderCode', có nơi trả 'orderId' hoặc 'order_code'
        const orderCode = query.orderCode || query.ordercode || query.orderId || query.order_id
        const gatewayStatus = (query.status || query.code || '').toString().toUpperCase()

        // Gọi callback phù hợp nếu có orderCode
        if (orderCode) {
          if (gatewayStatus === 'PAID' || gatewayStatus === 'SUCCESS' || gatewayStatus === '00') {
            await PaymentApi.paymentSuccessCallback(orderCode)
          } else if (gatewayStatus === 'CANCEL' || gatewayStatus === 'CANCELLED' || gatewayStatus === 'FAILED') {
            await PaymentApi.paymentCancelCallback(orderCode)
          }
        }

        if (gatewayStatus === 'PAID' || gatewayStatus === 'SUCCESS' || gatewayStatus === '00') {
          setStatus('success')
          setMessage('Thanh toán thành công! Cảm ơn bạn đã ủng hộ.')
        } else if (gatewayStatus === 'CANCEL' || gatewayStatus === 'CANCELLED' || gatewayStatus === 'FAILED') {
          setStatus('failed')
          setMessage('Thanh toán đã bị hủy hoặc thất bại.')
        } else {
          setStatus('success')
          setMessage('Thanh toán đã được ghi nhận.')
        }
      } catch (err) {
        console.error('Finalize payment error:', err)
        setStatus('failed')
        setMessage('Không thể xác nhận thanh toán. Vui lòng liên hệ hỗ trợ.')
      }
    }

    finalize()
  }, [query])

  return (
    <div style={{ maxWidth: 600, margin: '60px auto', textAlign: 'center', padding: '24px' }}>
      {status === 'processing' && (
        <>
          <h2>Đang xử lý...</h2>
          <p>{message}</p>
        </>
      )}
      {status === 'success' && (
        <>
          <h2>✅ Thành công</h2>
          <p>{message}</p>
          <div style={{ marginTop: 16 }}>
            <Link to='/profile' className='btn'>Xem tài khoản</Link>
            <span style={{ margin: '0 8px' }} />
            <Link to='/' className='btn'>Về trang chủ</Link>
          </div>
        </>
      )}
      {status === 'failed' && (
        <>
          <h2>❌ Không thành công</h2>
          <p>{message}</p>
          <div style={{ marginTop: 16 }}>
            <button className='btn' onClick={() => navigate(-1)}>Thử lại</button>
            <span style={{ margin: '0 8px' }} />
            <Link to='/vip-checkout' className='btn'>Chọn lại gói</Link>
          </div>
        </>
      )}
    </div>
  )
}

export default PaymentSuccess


