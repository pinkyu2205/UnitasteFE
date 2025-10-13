import { useNavigate } from 'react-router-dom'

function LogoutButton() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Xóa token
    localStorage.removeItem('token')

    // Có thể clear thêm dữ liệu khác nếu cần
    // localStorage.clear();

    // Điều hướng về Login
    navigate('/')
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: '10px 20px',
        backgroundColor: '#ff4d4f',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
      }}
    >
      Logout
    </button>
  )
}

export default LogoutButton
