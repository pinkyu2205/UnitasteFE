import axios from 'axios'
import { useEffect, useState } from 'react'

export default function ChatSidebar({ selectedUser, onSelectUser }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('accessToken') // Lấy access token
      const currentUser = localStorage.getItem('fullName') // Lấy tên người dùng hiện tại

      try {
        const res = await axios.get(
          'http://localhost:8001/api/users/get-all', // 🔁 SỬA thành localhost thay vì onrender
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào header
            },
          }
        )

        // Loại bỏ chính người dùng hiện tại khỏi danh sách
        const filteredUsers = res.data.filter(
          (user) => user.fullName !== currentUser
        )

        setUsers(filteredUsers)
      } catch (err) {
        console.error('❌ Lỗi khi lấy danh sách người dùng:', err)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className='sidebar'>
      <h2>Tin nhắn</h2>
      {users.length === 0 ? (
        <p>Không có người dùng nào khác.</p>
      ) : (
        users.map((user) => (
          <div
            key={user.userId}
            className={`user ${selectedUser === user.fullName ? 'active' : ''}`}
            onClick={() => onSelectUser(user.fullName)}
          >
            <img
              src={user.avatarUrl || 'https://via.placeholder.com/40'}
              alt='User'
            />
            <span>{user.fullName}</span>
          </div>
        ))
      )}
    </div>
  )
}
