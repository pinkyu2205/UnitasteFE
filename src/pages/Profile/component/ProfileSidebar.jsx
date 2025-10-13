// src/pages/Profile/component/ProfileSidebar.jsx

import '../CSS/ProfileSidebar.css'

const ProfileSidebar = ({ userData, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'info', label: 'Thông tin cá nhân', icon: '👤' },
    { id: 'password', label: 'Đổi mật khẩu', icon: '🔐' },
    { id: 'settings', label: 'Cài đặt', icon: '⚙️' },
    { id: 'bookmarks', label: 'Yêu thích', icon: '❤️' },
    { id: 'history', label: 'Lịch sử', icon: '📜' },
  ]
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('token')
    localStorage.removeItem('@secure.j.currentUser')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div className='profile-sidebar-container'>
      {/* User Card */}
      <div className='sidebar-user-card'>
        <div className='sidebar-avatar'>
          {userData.avatarUrl ? (
            <img src={userData.avatarUrl} alt={userData.fullName} />
          ) : (
            <div className='avatar-placeholder'>
              {userData.fullName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <h3 className='sidebar-user-name'>{userData.fullName}</h3>
        <p className='sidebar-user-email'>{userData.email}</p>
      </div>

      {/* Menu Items */}
      <nav className='sidebar-menu'>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className='menu-icon'>{item.icon}</span>
            <span className='menu-label'>{item.label}</span>
            {activeTab === item.id && <span className='menu-indicator'>›</span>}
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className='sidebar-footer'>
        <button className='logout-btn' onClick={handleLogout}>
          <span className='logout-icon'>🚪</span>
          Đăng xuất
        </button>
      </div>
    </div>
  )
}

export default ProfileSidebar
