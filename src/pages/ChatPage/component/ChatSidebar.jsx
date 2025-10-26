export default function ChatSidebar({
  selectedUser,
  onSelectUser,
  userList,
  unreadMap = {},
  onlineUsers = [],
}) {
  return (
    <div className='sidebar'>
      <h2>Tin nhắn</h2>
      {userList.length === 0 ? (
        <p>Không có người dùng nào khác.</p>
      ) : (
        userList.map((user) => {
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
            </div>
          )
        })
      )}
    </div>
  )
}
