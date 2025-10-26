import { useNavigate } from 'react-router-dom'
import Shortcuts from '../../Shortcuts/Shortcuts'
import './LeftSidebar.css'

// Nhận props từ SocialLayout (như đã làm ở lần trước)
function LeftSidebar({ userInfo, isLoading }) {
  const navigate = useNavigate()

  const handleNavigate = (path) => {
    navigate(path)
  }

  // Lấy avatar và tên
  const avatarUrl =
    userInfo?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${
      userInfo?.fullName?.charAt(0) || 'U'
    }&background=random`
  const fullName = isLoading
    ? 'Đang tải...'
    : userInfo?.fullName || 'Người dùng'

  return (
    // Đổi <nav> thành <div className="left-sidebar-scrollable"> để chứa nav và widget
    <div className='left-sidebar-scrollable'>
      <nav className='left-sidebar-nav'>
        <a href='/profile' className='sidebar-item profile-link'>
          <img src={avatarUrl} alt='Avatar' className='avatar-placeholder' />
          <span className='username'>{fullName}</span>
        </a>

        <button className='sidebar-item' onClick={() => handleNavigate('/')}>
          <span className='sidebar-icon'>⭐</span>
          <span>Trang chủ</span>
        </button>

        <button className='sidebar-item' onClick={() => handleNavigate('/map')}>
          <span className='sidebar-icon'>🗺️</span>
          <span>Bản đồ (Map)</span>
        </button>

        <button
          className='sidebar-item'
          onClick={() => handleNavigate('/vip-subscription')}
        >
          <span className='sidebar-icon'>👑</span>{' '}
          {/* Thay icon Nạp tiền thành VIP */}
          <span>Nâng cấp VIP</span>
        </button>

        {/* <button className='sidebar-item'>
          <span className='sidebar-icon'>⚙️</span>
          <span>Cài đặt</span>
        </button> */}
      </nav>

      {/* --- 2. THÊM WIDGET LỐI TẮT VÀO ĐÂY --- */}
      <Shortcuts />
    </div>
  )
}

export default LeftSidebar
