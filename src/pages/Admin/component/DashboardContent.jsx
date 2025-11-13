// src/components/Admin/DashboardContent.jsx

import { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import PaymentApi from '../../../api/paymentApi'
import UserApi from '../../../api/userApi'
import { StarIcon } from './AdminIcons'
import '../CSS/DashboardContent.css'

// Simple SVG Icons
const RevenueIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <text x="12" y="16" textAnchor="middle" fontSize="12" fill="currentColor" stroke="none">₫</text>
  </svg>
)

const TransactionIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
)

const UsersIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const DashboardContent = ({ setActiveMenu }) => {
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalTransactions, setTotalTransactions] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)
  const [revenueData, setRevenueData] = useState([])
  const [transactionData, setTransactionData] = useState([])
  const [recentTransactions, setRecentTransactions] = useState([])
  const [recentReviews, setRecentReviews] = useState([])
  const [ratingStats, setRatingStats] = useState({
    average: 0,
    distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true)
      try {
        // Gọi song song: dùng admin API, có fallback nếu không có quyền
        const [sumRevenueSet, totalTxSet, allTxSet, allUsersSet] = await Promise.allSettled([
          PaymentApi.getSumAmountSuccessTransactions(),
          PaymentApi.countTotalTransactions(),
          // Fallback admin -> user token
          PaymentApi.getAllPaymentTransactions().catch(() => PaymentApi.getPurchasesByUserToken()),
          UserApi.getAllUsers(),
        ])

        const sumRevenueResp = sumRevenueSet.status === 'fulfilled' ? sumRevenueSet.value : null
        const totalTransactionsResp = totalTxSet.status === 'fulfilled' ? totalTxSet.value : null
        const allTransactionsResp = allTxSet.status === 'fulfilled' ? allTxSet.value : []
        const allUsersResp = allUsersSet.status === 'fulfilled' ? allUsersSet.value : []

        // Lưu ý: axios interceptor đã trả về response.data; đề phòng BE bọc dữ liệu trong thuộc tính khác
        const allTransactions = Array.isArray(allTransactionsResp)
          ? allTransactionsResp
          : (allTransactionsResp?.data ?? allTransactionsResp?.items ?? [])
        
        // Tính tổng doanh thu từ các giao dịch thành công
        // Ưu tiên lấy từ BE; fallback tự tính nếu BE trả sai định dạng
        const computedRevenue = allTransactions
          .filter(t => {
            const status = (t.status || '').toString().toUpperCase()
            return status === 'SUCCESS' || status === 'ACTIVE' || status === 'COMPLETED'
          })
          .reduce((sum, t) => sum + (t.amount || t.totalAmount || 0), 0)
        const totalRevenueFromBE =
          typeof sumRevenueResp === 'number'
            ? sumRevenueResp
            : Number(sumRevenueResp) || 0
        const totalRevenue = Number.isFinite(totalRevenueFromBE)
          ? totalRevenueFromBE
          : computedRevenue

        // Tạo dữ liệu doanh thu 7 ngày qua
        const revenueData = []
        const transactionData = []
        
        for (let i = 6; i >= 0; i--) {
          const date = new Date()
          date.setDate(date.getDate() - i)
          const dateStr = date.toISOString().split('T')[0]
          
          const dayTransactions = allTransactions.filter(t => {
            const tDate = new Date(t.createdAt || t.purchaseDate).toISOString().split('T')[0]
            return tDate === dateStr
          })
          
          const dayRevenue = dayTransactions
            .filter(t => {
              const status = (t.status || '').toString().toUpperCase()
              return status === 'SUCCESS' || status === 'ACTIVE' || status === 'COMPLETED'
            })
            .reduce((sum, t) => sum + (t.amount || t.totalAmount || 0), 0)
          
          revenueData.push({
            date: date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
            revenue: dayRevenue,
          })
          
          transactionData.push({
            date: date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
            transactions: dayTransactions.length,
          })
        }

        // Lấy 5 giao dịch gần nhất
        const recentTransactions = allTransactions
          .sort((a, b) => new Date(b.createdAt || b.purchaseDate) - new Date(a.createdAt || a.purchaseDate))
          .slice(0, 5)

        // Mock data cho reviews và rating stats
        const recentReviews = [
          {
            id: 9,
            userName: 'Nguyen Kinh Tam',
            restaurantName: 'Jollibee Bình Thạnh',
            rating: 5,
            comment:
              'Hôm nay thèm Jollibee và quyết định đi ăn liền! ✨ Gọi món: Burger bò phô mai...',
            date: '2025-11-04',
          },
          {
            id: 5,
            userName: 'Nguyễn Văn Thành',
            restaurantName: 'KFC',
            rating: 5,
            comment:
              'Hôm nay mình ghé KFC và phải nói là ngon hơn mấy lần trước rất nhiều...',
            date: '2025-11-04',
          },
          {
            id: 3,
            userName: 'Nguyễn Đăng Khoa',
            restaurantName: 'Lẩu siêu đỉnh',
            rating: 5,
            comment:
              'Đi ăn Lẩu Thái Nước lẩu chua vừa, cay nhẹ, topping siêu nhiều...',
            date: '2025-11-04',
          },
        ]

        const ratingStats = {
          average: 4.2,
          distribution: { 5: 120, 4: 50, 3: 10, 2: 2, 1: 5 },
        }

        // Tổng số giao dịch: ưu tiên từ BE, fallback = allTransactions.length
        const totalTxFromBE =
          typeof totalTransactionsResp === 'number'
            ? totalTransactionsResp
            : (totalTransactionsResp?.count ?? totalTransactionsResp?.total ?? Number(totalTransactionsResp))
        setTotalRevenue(totalRevenue)
        setTotalTransactions(
          Number.isFinite(totalTxFromBE) && totalTxFromBE >= 0
            ? totalTxFromBE
            : allTransactions.length
        )
        // Tổng người dùng từ API get-all
        const usersCount = Array.isArray(allUsersResp)
          ? allUsersResp.length
          : (allUsersResp?.total ?? allUsersResp?.count ?? Number(allUsersResp))
        setTotalUsers(Number.isFinite(usersCount) ? usersCount : 0)
        setRevenueData(revenueData)
        setTransactionData(transactionData)
        setRecentTransactions(recentTransactions)
        setRecentReviews(recentReviews)
        setRatingStats(ratingStats)

      } catch (error) {
        console.error('Lỗi khi tải dữ liệu dashboard:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  // Format số tiền
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount)
  }

  const statsCards = [
    {
      title: 'Tổng Doanh Thu',
      value: formatCurrency(totalRevenue),
      icon: <RevenueIcon />,
      color: 'blue',
    },
    {
      title: 'Tổng Số Giao Dịch',
      value: totalTransactions.toLocaleString(),
      icon: <TransactionIcon />,
      color: 'green',
    },
    {
      title: 'Tổng Người Dùng',
      value: `${totalUsers.toLocaleString()} người`,
      icon: <UsersIcon />,
      color: 'orange',
    },
  ]

  // Render stars
  const renderStars = (rating) => {
    return (
      <div className='star-rating'>
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} size={14} filled={i < rating} color='#f59e0b' />
        ))}
      </div>
    )
  }

  return (
    <div className='dashboard-content'>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className='stats-cards'>
        {statsCards.map((card, index) => (
          <div key={index} className={`stat-card ${card.color}`}>
            <div className='stat-icon'>{card.icon}</div>
            <div className='stat-info'>
              <h4>{card.title}</h4>
              <div className='stat-value'>{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className='charts-grid'>
        {/* Revenue Chart */}
        <div className='chart-card'>
          <div className='chart-header'>
            <h3>Đồ Thị Doanh Thu (7 Ngày Qua)</h3>
          </div>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray='3 3' stroke='#eee' />
              <XAxis dataKey='date' />
              <YAxis />
              <Tooltip 
                formatter={(value) => [formatCurrency(value), 'Doanh thu']}
                labelStyle={{ color: '#333' }}
              />
              <Line
                type='monotone'
                dataKey='revenue'
                stroke='#3b82f6'
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Transaction Chart */}
        <div className='chart-card'>
          <div className='chart-header'>
            <h3>Giao Dịch Mới (7 Ngày Qua)</h3>
          </div>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={transactionData}>
              <CartesianGrid strokeDasharray='3 3' stroke='#eee' />
              <XAxis dataKey='date' />
              <YAxis />
              <Tooltip />
              <Bar dataKey='transactions' fill='#10b981' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reviews & Transactions Section */}
      <div className='bottom-section'>
        {/* Reviews Column */}
        <div className='reviews-column'>
          <div className='section-card'>
            <div className='section-header'>
              <h3>Thống Kê Đánh Giá</h3>
            </div>
            
            {/* Average Rating */}
            <div className='average-rating'>
              <div className='rating-display'>
                <span className='rating-number'>{ratingStats.average}</span>
                <div className='rating-stars'>
                  {renderStars(Math.floor(ratingStats.average))}
                </div>
                <span className='rating-text'>trên 5 sao</span>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className='rating-distribution'>
              <h4>Phân bố đánh giá:</h4>
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className='rating-bar'>
                  <span className='rating-label'>
                    {[...Array(rating)].map((_, i) => (
                      <StarIcon key={i} size={12} filled color='#f59e0b' />
                    ))}
                  </span>
                  <div className='bar-container'>
                    <div 
                      className='bar-fill'
                      style={{ 
                        width: `${(ratingStats.distribution[rating] / Math.max(...Object.values(ratingStats.distribution))) * 100}%` 
                      }}
                    />
                  </div>
                  <span className='rating-count'>{ratingStats.distribution[rating]}</span>
                </div>
              ))}
            </div>

            {/* Recent Reviews */}
            <div className='recent-reviews'>
              <h4>Đánh giá gần đây:</h4>
              <div className='reviews-list'>
                {recentReviews.map((review) => (
                  <div key={review.id} className='review-item'>
                    <div className='review-header'>
                      <span className='user-name'>{review.userName}</span>
                      {renderStars(review.rating)}
                    </div>
                    <p className='restaurant-name'>{review.restaurantName}</p>
                    <p className='review-comment'>"{review.comment}"</p>
                    <span className='review-date'>{review.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Column */}
        <div className='transactions-column'>
          <div className='section-card'>
            <div className='section-header'>
              <h3>Giao Dịch Gần Đây</h3>
              <button 
                className='view-all-btn'
                onClick={() => {
                  // Navigate to transactions page
                  setActiveMenu('transactions')
                }}
              >
                Xem tất cả
              </button>
            </div>
            
            <div className='transactions-table'>
              <table>
                <thead>
                  <tr>
                    <th>ID Giao Dịch</th>
                    <th>Tên Người Dùng</th>
                    <th>Số Tiền</th>
                    <th>Trạng Thái</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((transaction, index) => (
                    <tr key={index}>
                      <td className='transaction-id'>
                        #{transaction.id || transaction.orderCode || 'N/A'}
                      </td>
                      <td>{transaction.userName || 'Người dùng'}</td>
                      <td className='amount'>
                        {formatCurrency(transaction.amount || transaction.totalAmount || 0)}
                      </td>
                      <td>
                        {(() => {
                          const status = (transaction.status || '').toString().toUpperCase()
                          let statusClass = 'pending'
                          let statusLabel = 'Chờ thanh toán'
                          
                          if (status === 'SUCCESS' || status === 'ACTIVE' || status === 'COMPLETED') {
                            statusClass = 'completed'
                            statusLabel = 'Hoàn thành'
                          } else if (status === 'CANCEL' || status === 'CANCELLED') {
                            statusClass = 'cancelled'
                            statusLabel = 'Đã hủy'
                          } else if (status === 'PENDING') {
                            statusClass = 'pending'
                            statusLabel = 'Chờ thanh toán'
                          }
                          
                          return (
                            <span className={`status-badge ${statusClass}`}>
                              {statusLabel}
                            </span>
                          )
                        })()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default DashboardContent
