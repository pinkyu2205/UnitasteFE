import { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import SocialApi from '../../../api/socialApi'
import UserApi from '../../../api/userApi'
export default function ChatSidebar({
  selectedUser,
  onSelectUser,
  userList,
  unreadMap = {},
  onlineUsers = [],
}) {
  const [query, setQuery] = useState('')
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)
  const [remoteUsers, setRemoteUsers] = useState([])
  const debounceRef = useRef()

  const handleAddFriend = async (e, userId, fullName) => {
    e.stopPropagation()
    try {
      await SocialApi.sendFriendRequest(userId)
      toast.success(`Đã gửi lời mời tới ${fullName}`)
    } catch (err) {
      const msg = err?.response?.data?.message || 'Gửi lời mời thất bại'
      toast.error(msg)
    }
  }

  const filteredUsers = useMemo(() => {
    const base = query.trim().length >= 2 && remoteUsers.length > 0 ? remoteUsers : userList
    const q = query.trim().toLowerCase()
    return base.filter((u) => {
      const matches = !q || (u.fullName || '').toLowerCase().includes(q)
      const onlineOk = !showOnlineOnly || onlineUsers.includes(u.fullName)
      return matches && onlineOk
    })
  }, [userList, remoteUsers, query, showOnlineOnly, onlineUsers])

  // Debounced API search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!query || query.trim().length < 2) {
      setRemoteUsers([])
      return
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await UserApi.searchUsers(query)
        const arr = Array.isArray(res?.items) ? res.items : Array.isArray(res) ? res : []
        // Chuẩn hóa field
        const normalized = arr.map((u) => ({
          userId: u.userId ?? u.id,
          fullName: u.fullName ?? u.name ?? u.userName ?? 'Người dùng',
          avatarUrl: u.avatarUrl ?? u.avatar ?? null,
        }))
        setRemoteUsers(normalized)
      } catch (_) {
        setRemoteUsers([])
      }
    }, 350)
    return () => clearTimeout(debounceRef.current)
  }, [query])
  return (
    <div className='sidebar'>
      <h2>Tin nhắn</h2>
      <div className='sidebar-search'>
        <input
          type='text'
          placeholder='Tìm kiếm bạn bè...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className='filter-tabs'>
          <button
            className={`filter-tab ${!showOnlineOnly ? 'active' : ''}`}
            onClick={() => setShowOnlineOnly(false)}
          >
            Tất cả
          </button>
          <button
            className={`filter-tab ${showOnlineOnly ? 'active' : ''}`}
            onClick={() => setShowOnlineOnly(true)}
          >
            Online
          </button>
        </div>
      </div>
      {userList.length === 0 ? (
        <p>Không có người dùng nào khác.</p>
      ) : (
        filteredUsers.map((user) => {
          const isActive = selectedUser === user.fullName
          const isOnline = onlineUsers.includes(user.fullName)
          const unreadCount = unreadMap[user.fullName] || 0

          return (
            <div
              key={user.userId}
              className={`user ${isActive ? 'active' : ''}`}
              onClick={() => onSelectUser(user.fullName)}
            >
              <div className='avatar-wrapper'>
                <img
                  src={user.avatarUrl || 'https://via.placeholder.com/40'}
                  alt='User Avatar'
                />
                <span
                  className={`status-dot ${isOnline ? 'online' : 'offline'}`}
                />
              </div>
              <div className='user-info'>
                <span>{user.fullName}</span>
                {unreadCount > 0 && !isActive && (
                  <span className='unread-badge'>{unreadCount}</span>
                )}
              </div>
              <button
                className='add-friend-btn'
                title='Kết bạn'
                onClick={(e) => handleAddFriend(e, user.userId, user.fullName)}
              >
                +
              </button>
            </div>
          )
        })
      )}
    </div>
  )
}
