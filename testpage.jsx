import { useNavigate } from 'react-router-dom'
import LogoutButton from './src/components/LogoutButton'

function TestPage() {
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/') // điều hướng về trang chủ
  }

  const goLogin = () => {
    navigate('/login') // điều hướng sang trang login
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🚀 Đây là TestPage</h1>
      <p>Dùng để demo điều hướng giữa các trang.</p>
      <LogoutButton />

      <button onClick={goHome} style={{ margin: '10px', padding: '8px 16px' }}>
        Về Trang Chủ
      </button>

      <button onClick={goLogin} style={{ margin: '10px', padding: '8px 16px' }}>
        Đi đến Login
      </button>
    </div>
  )
}

export default TestPage
