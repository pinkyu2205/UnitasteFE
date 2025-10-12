import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import TestPage from '../testpage'
import Login from './pages/AuthPage/Login'
import OtpVerification from './pages/AuthPage/OtpVerification'
import Register from './pages/AuthPage/Register'
import { default as RegisterVerification } from './pages/AuthPage/RegisterVerification'
import ResetPassword from './pages/AuthPage/ResetPassword'
import ChatPage from './pages/ChatPage/ChatPage'
import MapPage from './pages/Map/Map'
import ProfilePage from './pages/Profile/ProfilePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AuthPage */}
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/register-verification'
          element={<RegisterVerification />}
        />
        <Route path='/testpage' element={<TestPage />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/message' element={<ChatPage />} />
        <Route path='/otp-verification' element={<OtpVerification />} />

        {/* MapPage */}
        <Route path='/map' element={<MapPage />} />

        <Route
          path='*'
          element={
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <h1>404 - Page Not Found</h1>
              <Link to='/'>Trở về trang chủ</Link>
            </div>
          }
        />

        {/* Profile */}
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
