// src/pages/Admin/component/TransactionManagement.jsx

import { useEffect, useState } from 'react'
import PaymentApi from '../../../api/paymentApi'
import '../CSS/TransactionManagement.css'
import {
  CheckCircleIcon,
  ClockIcon,
  SearchIcon,
  XCircleIcon,
} from './AdminIcons'

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    cancelled: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true)
      try {
        // Gọi song song các API để tải nhanh hơn
        // Có fallback: nếu getAllPaymentTransactions() thất bại, sẽ dùng getPurchasesByUserToken()
        let allTransactionsPromise = PaymentApi.getAllPaymentTransactions().catch((error) => {
          console.warn('getAllPaymentTransactions failed, trying fallback:', error)
          return PaymentApi.getPurchasesByUserToken()
        })

        const [allTxSet, successSet, cancelSet, revenueSet, totalSet] = await Promise.allSettled([
          allTransactionsPromise,
          PaymentApi.countSuccessTransactions(),
          PaymentApi.countCancelTransactions(),
          PaymentApi.getSumAmountSuccessTransactions(),
          PaymentApi.countTotalTransactions(),
        ])

        // Xử lý response từ getAllPaymentTransactions hoặc fallback
        let allTransactions = []
        if (allTxSet.status === 'fulfilled') {
          const response = allTxSet.value
          // Axios interceptor đã trả về response.data, nhưng có thể BE trả về thêm wrapper
          if (Array.isArray(response)) {
            allTransactions = response
          } else if (response?.data && Array.isArray(response.data)) {
            allTransactions = response.data
          } else if (response?.items && Array.isArray(response.items)) {
            allTransactions = response.items
          } else if (response?.result && Array.isArray(response.result)) {
            allTransactions = response.result
          } else {
            console.warn('Unexpected response format from getAllPaymentTransactions:', response)
            allTransactions = []
          }
        } else {
          console.error('Error fetching transactions:', allTxSet.reason)
          // Nếu cả hai đều thất bại, thử lấy lại một lần nữa
          try {
            const fallbackResponse = await PaymentApi.getPurchasesByUserToken()
            if (Array.isArray(fallbackResponse)) {
              allTransactions = fallbackResponse
            } else if (fallbackResponse?.data && Array.isArray(fallbackResponse.data)) {
              allTransactions = fallbackResponse.data
            } else if (fallbackResponse?.items && Array.isArray(fallbackResponse.items)) {
              allTransactions = fallbackResponse.items
            }
          } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError)
            allTransactions = []
          }
        }

        // Sắp xếp theo ngày mới nhất
        const sortedTransactions = allTransactions.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.purchaseDate || a.createdDate || 0)
          const dateB = new Date(b.createdAt || b.purchaseDate || b.createdDate || 0)
          return dateB - dateA
        })
        
        setTransactions(sortedTransactions)
        setFilteredTransactions(sortedTransactions)

        // Xử lý các thống kê
        const successCountResponse = successSet.status === 'fulfilled' ? successSet.value : null
        const cancelCountResponse = cancelSet.status === 'fulfilled' ? cancelSet.value : null
        const revenueResponse = revenueSet.status === 'fulfilled' ? revenueSet.value : null
        const totalCountResponse = totalSet.status === 'fulfilled' ? totalSet.value : null

        // Helper function để chuyển đổi sang số
        const toNum = (v) => {
          if (v == null) return null
          if (typeof v === 'number') return v
          if (typeof v === 'object' && v !== null) {
            // Nếu là object, thử lấy các thuộc tính phổ biến
            return v.count || v.total || v.amount || Number(v) || null
          }
          return Number(v) || null
        }

        // Tính toán từ danh sách giao dịch nếu API count không khả dụng
        const successFromList = sortedTransactions.filter(t => {
          const s = (t.status || '').toString().toUpperCase()
          return s === 'SUCCESS' || s === 'ACTIVE'
        }).length
        
        const cancelFromList = sortedTransactions.filter(t => {
          const s = (t.status || '').toString().toUpperCase()
          return s === 'CANCEL' || s === 'CANCELLED'
        }).length
        
        const revenueFromList = sortedTransactions
          .filter(t => {
            const s = (t.status || '').toString().toUpperCase()
            return s === 'SUCCESS' || s === 'ACTIVE'
          })
          .reduce((sum, t) => sum + Number(t.amount || t.totalAmount || t.amountValue || 0), 0)

        // Cập nhật stats với fallback
        setStats({
          total: toNum(totalCountResponse) ?? sortedTransactions.length,
          completed: toNum(successCountResponse) ?? successFromList,
          cancelled: toNum(cancelCountResponse) ?? cancelFromList,
          totalRevenue: toNum(revenueResponse) ?? revenueFromList,
        })

        console.log('✅ Loaded transactions:', sortedTransactions.length)
        if (sortedTransactions.length > 0) {
          console.log('Sample transaction:', sortedTransactions[0])
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu giao dịch:', error)
        // Đảm bảo vẫn hiển thị trạng thái rỗng nếu có lỗi
        setTransactions([])
        setFilteredTransactions([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllData()
  }, []) // Chỉ chạy 1 lần lúc mount

  // Filter transactions
  useEffect(() => {
    let filtered = [...transactions]

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter((transaction) => {
        const status = (transaction.status || '').toString().toUpperCase()
        if (filterStatus === 'completed') {
          return status === 'SUCCESS' || status === 'ACTIVE'
        } else if (filterStatus === 'cancelled') {
          return status === 'CANCEL' || status === 'CANCELLED'
        }
        return true
      })
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter((transaction) => {
        // Tìm theo nhiều trường: orderCode, transactionId, description, userId
        const code = (transaction.orderCode || transaction.paymentTransactionId || transaction.id || transaction.transactionId || '').toString().toLowerCase()
        const desc = (transaction.description || transaction.servicePackageName || transaction.packageName || '').toLowerCase()
        const userId = (transaction.userId || transaction.user?.id || '').toString().toLowerCase()
        return (
          code.includes(searchLower) ||
          desc.includes(searchLower) ||
          userId.includes(searchLower)
        )
      })
    }

    setFilteredTransactions(filtered)
    setCurrentPage(1) // Reset to first page when filtering
  }, [searchTerm, filterStatus, transactions])

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  )
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)

  // Format số tiền
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount)
  }

  // Format ngày
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Get status info
  const getStatusInfo = (status) => {
    const upperStatus = (status || '').toString().toUpperCase()
    if (upperStatus === 'SUCCESS' || upperStatus === 'ACTIVE' || upperStatus === 'COMPLETED') {
      return {
        label: 'Hoàn thành',
        class: 'completed',
        icon: <CheckCircleIcon size={16} />,
      }
    } else if (upperStatus === 'PENDING') {
      return {
        label: 'Chờ thanh toán',
        class: 'pending', // Dùng class 'pending' (màu xanh dương)
        icon: <ClockIcon size={16} />,
      }
    } else if (upperStatus === 'CANCEL' || upperStatus === 'CANCELLED') {
      // Xử lý cả CANCEL và CANCELLED
      return {
        label: 'Đã hủy',
        class: 'cancelled', // Dùng class 'cancelled' (màu đỏ)
        icon: <XCircleIcon size={16} />,
      }
    } // Fallback cho các trường hợp khác
    return {
      label: status || 'Đang xử lý',
      class: 'processing', // Dùng class 'processing' (màu cam)
      icon: <ClockIcon size={16} />,
    }
  }

  return (
    <div className='transaction-management'>
      {isLoading && (
        <div className='loading-overlay'>
          <div className='loading-spinner'></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      )}

      {/* Statistics Cards */}
      <div className='transaction-stats'>
        <div className='stat-card blue'>
          <div className='stat-label'>Tổng Giao Dịch</div>
          <div className='stat-value'>{stats.total}</div>
        </div>
        <div className='stat-card green'>
          <div className='stat-label'>Hoàn Thành</div>
          <div className='stat-value'>{stats.completed}</div>
        </div>
        <div className='stat-card red'>
          <div className='stat-label'>Đã Hủy</div>
          <div className='stat-value'>{stats.cancelled}</div>
        </div>
        <div className='stat-card purple'>
          <div className='stat-label'>Tổng Doanh Thu</div>
          <div className='stat-value'>{formatCurrency(stats.totalRevenue)}</div>
        </div>
      </div>

      {/* Filters */}
      <div className='transaction-filters'>
        <div className='search-box'>
          <SearchIcon size={20} />
          <input
            type='text'
            placeholder='Tìm theo mã giao dịch hoặc gói dịch vụ...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className='filter-select'
        >
          <option value='all'>Tất cả trạng thái</option>
          <option value='completed'>Hoàn thành</option>
          <option value='cancelled'>Đã hủy</option>
        </select>
      </div>

      {/* Transaction Table */}
      <div className='transaction-table-container'>
        <table className='transaction-table'>
          <thead>
            <tr>
              <th>Mã Đơn Hàng</th>
              <th>UserID</th>
              <th>Ngày & Giờ</th>
              <th>Mô Tả (Gói)</th>
              <th>Số Tiền</th>
              <th>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.length > 0 ? (
              currentTransactions.map((transaction, index) => {
                const statusInfo = getStatusInfo(transaction.status)
                const transactionId = transaction.paymentTransactionId || transaction.id || transaction.transactionId || transaction.orderCode || `tx-${index}`
                const userId = transaction.userId || transaction.user?.id || 'N/A'
                const date = transaction.createdAt || transaction.purchaseDate || transaction.createdDate || transaction.date
                const description = transaction.description || transaction.servicePackageName || transaction.packageName || 'N/A'
                const amount = transaction.amount || transaction.totalAmount || transaction.amountValue || 0
                
                return (
                  <tr key={transactionId || index}>
                    <td className='transaction-id'>
                      #{transactionId}
                    </td>
                    <td>{userId}</td>
                    <td>{date ? formatDate(date) : 'N/A'}</td>
                    <td>{description}</td>
                    <td className='amount'>
                      {formatCurrency(amount)}
                    </td>
                    <td>
                      <span className={`status-badge ${statusInfo.class}`}>
                        {statusInfo.icon}
                        {statusInfo.label}
                      </span>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan='6' className='no-data'>
                  {searchTerm || filterStatus !== 'all'
                    ? 'Không tìm thấy giao dịch nào'
                    : 'Chưa có giao dịch nào'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='pagination'>
          <button
            className='page-btn'
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Trước
          </button>
          <div className='page-info'>
            Trang {currentPage} / {totalPages}
          </div>
          <button
            className='page-btn'
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Sau
          </button>
        </div>
      )}
    </div>
  )
}

export default TransactionManagement
