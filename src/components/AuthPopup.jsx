import { useNavigate } from 'react-router-dom'
import './CSS/AuthPopup.css' // File CSS riêng

const AuthPopup = ({ onClose }) => {
  const navigate = useNavigate()

  const handleLoginRedirect = () => {
    navigate('/login') // Chuyển hướng đến trang đăng nhập
    onClose() // Đóng popup
  }

  return (
    <div className='auth-popup-overlay'>
      <div className='auth-popup-content'>
        <button className='auth-popup-close' onClick={onClose}>
          ×
        </button>
        <h3>Yêu cầu đăng nhập</h3>
        <p>Bạn phải đăng nhập mới có thể sử dụng chức năng này.</p>
        <div className='auth-popup-actions'>
          <button className='auth-popup-btn cancel' onClick={onClose}>
            Hủy
          </button>
          <button
            className='auth-popup-btn login'
            onClick={handleLoginRedirect}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthPopup
