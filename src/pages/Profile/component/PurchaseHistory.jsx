import { useEffect, useState } from 'react'
import PaymentApi from '../../../api/paymentApi'
import '../CSS/PurchaseHistory.css' // Create a new CSS file

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const PurchaseHistory = () => {
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await PaymentApi.getPurchasesByUserToken()
        setPurchases(data || []) // Ensure it's an array
      } catch (err) {
        console.error('Lỗi tải lịch sử mua hàng:', err)
        setError('Không thể tải lịch sử mua hàng.')
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [])

  if (loading) return <div className='loading-screen'>Đang tải lịch sử...</div>
  if (error) return <div className='error-screen'>{error}</div>

  return (
    <div className='purchase-history-container'>
      <h2>Lịch sử Giao dịch</h2>
      {purchases.length === 0 ? (
        <p>Bạn chưa có giao dịch nào.</p>
      ) : (
        <table className='history-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Loại</th>
              <th>Mô tả</th>
              <th>Số tiền</th>
              <th>Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.purchaseId}>
                <td>{purchase.purchaseId}</td>
                <td>{purchase.purchaseType}</td>
                <td>{purchase.description}</td>
                <td>{formatCurrency(purchase.amount)}</td>
                <td>{formatDate(purchase.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default PurchaseHistory
