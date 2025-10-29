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
    processing: 0, // Vẫn giữ lại nếu bạn muốn đếm từ danh sách
    cancelled: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true)
      try {
        // Gọi song song các API để tải nhanh hơn
        const [
          historyResponse,
          successCountResponse,
          cancelCountResponse,
          revenueResponse,
          totalCountResponse,
          pendingCountResponse,
        ] = await Promise.all([
          PaymentApi.getPurchasesByUserToken(), // Giữ lại để lấy danh sách
          PaymentApi.countSuccessTransactions(),
          PaymentApi.countCancelTransactions(),
          PaymentApi.getSumAmountSuccessTransactions(),
          PaymentApi.countTotalTransactions(),
          PaymentApi.countPendingTransactions(),
        ])

        // 1. Xử lý danh sách giao dịch (như cũ)
        const allTransactions = historyResponse || [] // Giả sử API trả về mảng
        const sortedTransactions = allTransactions.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.purchaseDate)
          const dateB = new Date(b.createdAt || b.purchaseDate)
          return dateB - dateA
        })
        setTransactions(sortedTransactions)
        setFilteredTransactions(sortedTransactions)

        // 2. Cập nhật các thẻ thống kê từ API
        setStats({
          total: totalCountResponse || 0,
          completed: successCountResponse.successTransactionCount || 0,
          cancelled: cancelCountResponse.cancelTransactionCount || 0,
          totalRevenue: revenueResponse || 0, // API trả về số trực tiếp
          // Tính toán các trạng thái còn lại nếu cần
          processing: pendingCountResponse.pendingTransactionCount || 0,
        })
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu giao dịch:', error)
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
        const status = transaction.status?.toUpperCase() // 'PENDING', 'SUCCESS', 'CANCEL', 'ACTIVE'
        if (filterStatus === 'completed') {
          return status === 'SUCCESS' || status === 'ACTIVE' // Coi 'Active' và 'Success' là hoàn thành
        } else if (filterStatus === 'processing') {
          return status === 'PENDING'
        } else if (filterStatus === 'cancelled') {
          return status === 'CANCEL' // Sửa từ 'CANCELLED' thành 'CANCEL'
        }
        return true
      })
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((transaction) => {
        // Tìm theo orderCode hoặc description
        const code = (transaction.orderCode || '').toString().toLowerCase()
        const desc = (transaction.description || '').toLowerCase()
        return (
          code.includes(searchTerm.toLowerCase()) ||
          desc.includes(searchTerm.toLowerCase())
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
    const upperStatus = status?.toUpperCase()
    if (upperStatus === 'SUCCESS' || upperStatus === 'ACTIVE') {
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
    } else if (upperStatus === 'CANCEL') {
      // Sửa 'CANCELLED' thành 'CANCEL'
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
        <div className='stat-card orange'>
          <div className='stat-label'>Đang Xử Lý</div>
          <div className='stat-value'>{stats.processing}</div>
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
          <option value='processing'>Đang xử lý</option>
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
              currentTransactions.map((transaction) => {
                const statusInfo = getStatusInfo(transaction.status)
                return (
                  <tr key={transaction.paymentTransactionId}>
                    <td className='transaction-id'>
                      #{transaction.paymentTransactionId}
                    </td>
                    <td>{transaction.userId}</td>
                    <td>{formatDate(transaction.createdAt)}</td>
                    <td>{transaction.description}</td>
                    <td className='amount'>
                      {formatCurrency(transaction.amount)}
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
