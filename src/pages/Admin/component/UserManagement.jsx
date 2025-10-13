// src/pages/Admin/components/UserManagement.jsx

import { useState } from 'react'
import '../CSS/UserManagement.css'
import UserDetailModal from './UserDetailModal'

const UserManagement = () => {
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock user data
  const [users, setUsers] = useState([
    {
      id: 1,
      fullName: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0901234567',
      avatar: 'https://via.placeholder.com/40',
      status: 'active',
      joinDate: '2024-01-15',
      orders: 45,
      totalSpent: 2500000,
      lastOrder: '2024-01-10',
      bio: 'Yêu thích ẩm thực và khám phá quán ăn mới',
      gender: 'Nam',
      birthDate: '1990-01-15',
      priceRange: ['Trung bình', 'Cao cấp'],
      cuisine: ['Việt Nam', 'Nhật Bản', 'Thái Lan'],
      preferences: {
        placeTypes: ['Nhà hàng', 'Quán ăn'],
        features: ['Wi-Fi', 'Không khí lạnh'],
        distance: '5km',
      },
    },
    {
      id: 2,
      fullName: 'Trần Thị B',
      email: 'tranthib@example.com',
      phone: '0912345678',
      avatar: 'https://via.placeholder.com/40',
      status: 'active',
      joinDate: '2024-02-20',
      orders: 23,
      totalSpent: 1200000,
      lastOrder: '2024-01-08',
      bio: 'Người yêu thích cà phê',
      gender: 'Nữ',
      birthDate: '1995-05-20',
      priceRange: ['Bình dân', 'Vừa phải'],
      cuisine: ['Ẩm thực Tây', 'Bánh mì'],
      preferences: {
        placeTypes: ['Tiệm cà phê', 'Quán vỉa hẻ'],
        features: ['Yên tĩnh', 'Checkin'],
        distance: '2km',
      },
    },
    {
      id: 3,
      fullName: 'Lê Minh C',
      email: 'leminc@example.com',
      phone: '0923456789',
      avatar: 'https://via.placeholder.com/40',
      status: 'inactive',
      joinDate: '2024-03-10',
      orders: 5,
      totalSpent: 350000,
      lastOrder: '2023-12-15',
      bio: '',
      gender: 'Nam',
      birthDate: '2000-03-10',
      priceRange: ['Bình dân'],
      cuisine: ['Phở', 'Cơm tấm'],
      preferences: {
        placeTypes: ['Quán ăn bình dân'],
        features: [],
        distance: '1km',
      },
    },
  ])

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = filterStatus === 'all' || user.status === filterStatus
    return matchSearch && matchStatus
  })

  const handleDeleteUser = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa user này?')) {
      setUsers(users.filter((u) => u.id !== id))
      setSelectedUser(null)
    }
  }

  const handleToggleStatus = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
          : u
      )
    )
  }

  return (
    <div className='user-management'>
      <div className='management-header'>
        <div className='search-filter'>
          <input
            type='text'
            placeholder='Tìm theo tên hoặc email...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='search-input'
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className='filter-select'
          >
            <option value='all'>Tất cả trạng thái</option>
            <option value='active'>Hoạt động</option>
            <option value='inactive'>Không hoạt động</option>
          </select>
        </div>
        <div className='header-stats'>
          <span>Tổng: {filteredUsers.length} users</span>
        </div>
      </div>

      <div className='users-table-container'>
        <table className='users-table'>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Họ và Tên</th>
              <th>Email</th>
              <th>Số ĐT</th>
              <th>Ngày Tham Gia</th>
              <th>Đơn Hàng</th>
              <th>Tổng Chi</th>
              <th>Trạng Thái</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className='user-row'>
                <td>
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className='user-avatar'
                  />
                </td>
                <td className='user-name'>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{new Date(user.joinDate).toLocaleDateString('vi-VN')}</td>
                <td className='text-center'>{user.orders}</td>
                <td className='text-right'>
                  {user.totalSpent.toLocaleString()}₫
                </td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    {user.status === 'active'
                      ? '🟢 Hoạt động'
                      : '🔴 Không hoạt động'}
                  </span>
                </td>
                <td className='actions-cell'>
                  <button
                    className='btn-view'
                    onClick={() => setSelectedUser(user)}
                    title='Xem chi tiết'
                  >
                    👁️
                  </button>
                  <button
                    className={`btn-toggle ${user.status}`}
                    onClick={() => handleToggleStatus(user.id)}
                    title={
                      user.status === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'
                    }
                  >
                    {user.status === 'active' ? '🔒' : '🔓'}
                  </button>
                  <button
                    className='btn-delete'
                    onClick={() => handleDeleteUser(user.id)}
                    title='Xóa'
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  )
}

export default UserManagement
