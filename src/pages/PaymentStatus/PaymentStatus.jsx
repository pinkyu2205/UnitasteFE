import { useEffect, useMemo, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import PaymentApi from '../../api/paymentApi'
import './PaymentStatus.css'

const parseQuery = (search) => {
  const params = new URLSearchParams(search)
  const obj = {}
  params.forEach((v, k) => {
    obj[k] = v
  })
  return obj
}

const PaymentStatus = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const query = useMemo(() => parseQuery(location.search), [location.search])

  const [status, setStatus] = useState('processing') // 'processing' | 'success' | 'failed'
  const [message, setMessage] = useState('Đang xác nhận thanh toán...')
  const [orderCode, setOrderCode] = useState('')

  useEffect(() => {
    const finalize = async () => {
      try {
        const oc = query.orderCode || query.ordercode || query.orderId || query.order_id
        setOrderCode(oc || '')
        const gatewayStatus = (query.status || query.code || '').toString().toUpperCase()

        if (oc) {
          if (gatewayStatus === 'PAID' || gatewayStatus === 'SUCCESS' || gatewayStatus === '00') {
            await PaymentApi.paymentSuccessCallback(oc)
          } else if (gatewayStatus === 'CANCEL' || gatewayStatus === 'CANCELLED' || gatewayStatus === 'FAILED') {
            await PaymentApi.paymentCancelCallback(oc)
          }
        }

        if (gatewayStatus === 'PAID' || gatewayStatus === 'SUCCESS' || gatewayStatus === '00') {
          setStatus('success')
          setMessage('Thanh toán thành công! Cảm ơn bạn đã ủng hộ.')
        } else if (gatewayStatus === 'CANCEL' || gatewayStatus === 'CANCELLED' || gatewayStatus === 'FAILED') {
          setStatus('failed')
          setMessage('Thanh toán đã bị hủy hoặc thất bại.')
        } else if (gatewayStatus) {
          setStatus('success')
          setMessage('Thanh toán đã được ghi nhận.')
        } else {
          setStatus('processing')
          setMessage('Đang xác nhận thanh toán...')
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
    <div className='pay-status'>
      <div className={`pay-card pay-card--${status}`}>
        {status === 'processing' && (
          <div className='pay-content'>
            <div className='pay-icon' aria-hidden='true'>⏳</div>
            <h2 className='pay-title'>Đang xử lý thanh toán</h2>
            <p className='pay-message'>{message}</p>
            {orderCode && (
              <div className='pay-meta'>
                <span className='pay-chip'>Mã đơn: {orderCode}</span>
              </div>
            )}
          </div>
        )}

        {status === 'success' && (
          <div className='pay-content'>
            <div className='pay-icon pay-icon--success' aria-hidden='true'>✅</div>
            <h2 className='pay-title'>Thanh toán thành công</h2>
            <p className='pay-message'>{message}</p>
            {orderCode && (
              <div className='pay-meta'>
                <span className='pay-chip pay-chip--success'>Mã đơn: {orderCode}</span>
              </div>
            )}
            <div className='pay-actions'>
              <Link to='/profile' className='ps-btn ps-btn--primary'>Xem tài khoản</Link>
              <Link to='/' className='ps-btn ps-btn--ghost'>Về trang chủ</Link>
            </div>
          </div>
        )}

        {status === 'failed' && (
          <div className='pay-content'>
            <div className='pay-icon pay-icon--failed' aria-hidden='true'>❌</div>
            <h2 className='pay-title'>Thanh toán không thành công</h2>
            <p className='pay-message'>{message}</p>
            {orderCode && (
              <div className='pay-meta'>
                <span className='pay-chip pay-chip--failed'>Mã đơn: {orderCode}</span>
              </div>
            )}
            <div className='pay-actions'>
              <button className='ps-btn ps-btn--primary' onClick={() => navigate(-1)}>Thử lại</button>
              <Link to='/vip-checkout' className='ps-btn ps-btn--ghost'>Chọn lại gói</Link>
              <Link to='/' className='ps-btn ps-btn--ghost'>Về trang chủ</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentStatus


