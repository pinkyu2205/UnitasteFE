import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'

const parseQuery = (search) => {
  const params = new URLSearchParams(search)
  const obj = {}
  params.forEach((v, k) => (obj[k] = v))
  return obj
}

const PaymentFail = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const query = useMemo(() => parseQuery(location.search), [location.search])

  const reason =
    (query.message || query.reason || query.code || query.status || '').toString()

  return (
    <div style={{ maxWidth: 600, margin: '60px auto', textAlign: 'center', padding: '24px' }}>
      <h2>❌ Thanh toán thất bại</h2>
      {reason && <p>Lý do: {reason}</p>}
      <div style={{ marginTop: 16 }}>
        <button className='btn' onClick={() => navigate(-1)}>Thử lại</button>
        <span style={{ margin: '0 8px' }} />
        <Link to='/vip-checkout' className='btn'>Chọn lại gói</Link>
        <span style={{ margin: '0 8px' }} />
        <Link to='/' className='btn'>Về trang chủ</Link>
      </div>
    </div>
  )
}

export default PaymentFail


