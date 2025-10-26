// src/pages/Admin/component/TransactionManagement.jsx

import { useEffect, useState } from 'react'
import PaymentApi from '../../../api/paymentApi'
import { CheckCircleIcon, ClockIcon, SearchIcon, XCircleIcon } from './AdminIcons'
import '../CSS/TransactionManagement.css'

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true)
      try {
        const response = await PaymentApi.getPurchasesByUserToken()
        const allTransactions = response.data || []
        
        // Sắp xếp theo ngày mới nhất
        const sortedTransactions = allTransactions.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.purchaseDate)
          const dateB = new Date(b.createdAt || b.purchaseDate)
          return dateB - dateA
        })
        
        setTransactions(sortedTransactions)
        setFilteredTransactions(sortedTransactions)
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu giao dịch:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  // Filter transactions
  useEffect(() => {
    let filtered = [...transactions]

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(transaction => {
        const status = transaction.status?.toUpperCase()
        if (filterStatus === 'completed') {
          return status === 'COMPLETED' || status === 'SUCCESS'
        } else if (filterStatus === 'processing') {
          return status === 'PROCESSING' || status === 'PENDING'
        } else if (filterStatus === 'cancelled') {
          return status === 'CANCELLED' || status === 'FAILED'
        }
        return true
      })
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(transaction => {
        const id = (transaction.id || transaction.orderCode || '').toString().toLowerCase()
        const packageName = (transaction.servicePackageName || transaction.packageName || '').toLowerCase()
        return id.includes(searchTerm.toLowerCase()) || packageName.includes(searchTerm.toLowerCase())
      })
    }

    setFilteredTransactions(filtered)
    setCurrentPage(1) // Reset to first page when filtering
  }, [searchTerm, filterStatus, transactions])

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem)
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
    if (upperStatus === 'COMPLETED' || upperStatus === 'SUCCESS') {
      return {
        label: 'Hoàn thành',
        class: 'completed',
        icon: <CheckCircleIcon size={16} />,
      }
    } else if (upperStatus === 'PROCESSING' || upperStatus === 'PENDING') {
      return {
        label: 'Đang xử lý',
        class: 'processing',
        icon: <ClockIcon size={16} />,
      }
    } else if (upperStatus === 'CANCELLED' || upperStatus === 'FAILED') {
      return {
        label: 'Đã hủy',
        class: 'cancelled',
        icon: <XCircleIcon size={16} />,
      }
    }
    return {
      label: 'Chờ thanh toán',
      class: 'pending',
      icon: <ClockIcon size={16} />,
    }
  }

  // Statistics
  const stats = {
    total: transactions.length,
    completed: transactions.filter(t => {
      const status = t.status?.toUpperCase()
      return status === 'COMPLETED' || status === 'SUCCESS'
    }).length,
    processing: transactions.filter(t => {
      const status = t.status?.toUpperCase()
      return status === 'PROCESSING' || status === 'PENDING'
    }).length,
    cancelled: transactions.filter(t => {
      const status = t.status?.toUpperCase()
      return status === 'CANCELLED' || status === 'FAILED'
    }).length,
    totalRevenue: transactions.reduce((sum, t) => {
      const status = t.status?.toUpperCase()
      if (status === 'COMPLETED' || status === 'SUCCESS') {
        return sum + (t.amount || t.totalAmount || 0)
      }
      return sum
    }, 0),
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
              <th>Mã Giao Dịch</th>
              <th>Ngày & Giờ</th>
              <th>Gói Dịch Vụ</th>
              <th>Số Tiền</th>
              <th>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.length > 0 ? (
              currentTransactions.map((transaction, index) => {
                const statusInfo = getStatusInfo(transaction.status)
                return (
                  <tr key={index}>
                    <td className='transaction-id'>
                      #{transaction.id || transaction.orderCode || 'N/A'}
                    </td>
                    <td>{formatDate(transaction.createdAt || transaction.purchaseDate)}</td>
                    <td>
                      {transaction.servicePackageName || transaction.packageName || 'VIP Package'}
                    </td>
                    <td className='amount'>
                      {formatCurrency(transaction.amount || transaction.totalAmount || 0)}
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
                <td colSpan='5' className='no-data'>
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
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Trước
          </button>
          <div className='page-info'>
            Trang {currentPage} / {totalPages}
          </div>
          <button
            className='page-btn'
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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

