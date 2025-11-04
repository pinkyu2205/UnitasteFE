import { useEffect, useState } from 'react'
import UserApi from '../../../api/userApi' // Import UserApi
import '../CSS/UserManagement.css' // File CSS mới
import { CheckCircleIcon, SearchIcon, XCircleIcon } from './AdminIcons'

const UserManagement = () => {
  const [users, setUsers] = useState([]) // State cho danh sách user
  const [filteredUsers, setFilteredUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all') // 'all', 'Active', 'Inactive'
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10) // State cho các thẻ thống kê

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  }) // Lấy dữ liệu khi component mount

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true)
      try {
        // Gọi song song các API
        const [usersResponse, activeCountResponse, inactiveCountResponse] =
          await Promise.all([
            UserApi.getAllUsers(),
            UserApi.countActiveUsers(),
            UserApi.countInactiveUsers(),
          ]) // 1. Xử lý danh sách user

        const allUsers = usersResponse || []
        const sortedUsers = allUsers.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
        setUsers(sortedUsers)
        setFilteredUsers(sortedUsers) // 2. Cập nhật các thẻ thống kê

        setStats({
          total: allUsers.length,
          active: activeCountResponse.total || 0,
          inactive: inactiveCountResponse.total || 0,
        })
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu người dùng:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllData()
  }, []) // Chỉ chạy 1 lần lúc mount // Filter logic

  useEffect(() => {
    let filtered = [...users] // 1. Filter theo Status

    if (filterStatus !== 'all') {
      filtered = filtered.filter(
        (user) => user.status?.toUpperCase() === filterStatus.toUpperCase()
      )
    } // 2. Filter theo Search Term (theo yêu cầu: fullName hoặc userId)

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter((user) => {
        const id = (user.userId || '').toString().toLowerCase()
        const name = (user.fullName || '').toLowerCase()
        const email = (user.email || '').toLowerCase()
        return (
          id.includes(searchLower) ||
          name.includes(searchLower) ||
          email.includes(searchLower)
        )
      })
    }

    setFilteredUsers(filtered)
    setCurrentPage(1) // Reset về trang 1 khi filter
  }, [searchTerm, filterStatus, users]) // Logic phân trang

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) // Hàm format ngày

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } // Hàm lấy thông tin status

  const getStatusInfo = (status) => {
    const upperStatus = status?.toUpperCase()
    if (upperStatus === 'ACTIVE') {
      return {
        label: 'Hoạt động',
        class: 'active', // Dùng class 'active'
        icon: <CheckCircleIcon size={16} />,
      }
    }
    return {
      label: 'Không hoạt động',
      class: 'inactive', // Dùng class 'inactive'
      icon: <XCircleIcon size={16} />,
    }
  }

  return (
    <div className='user-management'>
      {isLoading && (
        <div className='loading-overlay'>
          <div className='loading-spinner'></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      )}
      {/* Thẻ thống kê */}
      <div className='user-stats'>
        <div className='stat-card blue'>
          <div className='stat-label'>Tổng Người Dùng</div>
          <div className='stat-value'>{stats.total}</div>
        </div>
        <div className='stat-card green'>
          <div className='stat-label'>Hoạt Động</div>
          <div className='stat-value'>{stats.active}</div>
        </div>
        <div className='stat-card red'>
          <div className='stat-label'>Không Hoạt Động</div>
          <div className='stat-value'>{stats.inactive}</div>
        </div>
      </div>
      {/* Thanh Filter và Search */}
      <div className='user-filters'>
        <div className='search-box'>
          <SearchIcon size={20} />
          <input
            type='text'
            placeholder='Tìm theo UserID, Họ tên, Email...'
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
          <option value='Active'>Hoạt động</option>
          <option value='Inactive'>Không hoạt động</option>
        </select>
      </div>
      {/* Bảng dữ liệu User */}
      <div className='user-table-container'>
        <table className='user-table'>
          <thead>
            <tr>
              <th>UserID</th>
              <th>Họ và Tên</th>
              <th>Email</th>
              <th>Ngày Tạo</th>
              <th>Vai Trò</th>
              <th>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => {
                const statusInfo = getStatusInfo(user.status)
                return (
                  <tr key={user.userId}>
                    <td className='user-id'>#{user.userId}</td>
                    <td className='user-name'>
                      {/* Thêm avatar nhỏ */}
                      <img
                        src={
                          user.avatarUrl ||
                          `https://ui-avatars.com/api/?name=${
                            user.fullName?.charAt(0) || 'U'
                          }&background=random&color=fff`
                        }
                        alt={user.fullName}
                        className='user-avatar-small'
                      />
                      {user.fullName || '(Chưa cập nhật)'}
                    </td>
                    <td>{user.email}</td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>
                      <span className={`role-badge role-${user.roleId}`}>
                        {user.roleName || 'N/A'}
                      </span>
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
                    ? 'Không tìm thấy người dùng nào'
                    : 'Chưa có người dùng nào'}
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

export default UserManagement
