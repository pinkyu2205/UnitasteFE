// src/pages/Social/component/LeftSidebar/LeftSidebar.jsx
import './LeftSidebar.css'
// import { useNavigate } from 'react-router-dom'; // Dùng khi bạn setup routing

function LeftSidebar() {
  // const navigate = useNavigate();

  const handleNavigate = (path) => {
    // navigate(path);
    console.log(`Maps to ${path}`)
  }

  return (
    <nav className='left-sidebar'>
      <a href='/profile' className='sidebar-item profile-link'>
        <div className='avatar-placeholder'></div>
        <span className='username'>Tên Người Dùng</span>
      </a>

      <button className='sidebar-item' onClick={() => handleNavigate('/map')}>
        <span className='sidebar-icon'>🗺️</span>
        <span>Bản đồ (Map)</span>
      </button>

      <button
        className='sidebar-item'
        onClick={() => handleNavigate('/top-up')}
      >
        <span className='sidebar-icon'>💰</span>
        <span>Nạp tiền</span>
      </button>

      {/* Các button khác */}
      <button className='sidebar-item'>
        <span className='sidebar-icon'>⭐</span>
        <span>Đã lưu</span>
      </button>

      <button className='sidebar-item'>
        <span className='sidebar-icon'>⚙️</span>
        <span>Cài đặt</span>
      </button>
    </nav>
  )
}

export default LeftSidebar
