import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import TestPage from '../testpage'
import AdminDashboard from './pages/Admin/AdminDashboard'
import Login from './pages/AuthPage/Login'
import OtpVerification from './pages/AuthPage/OtpVerification'
import Register from './pages/AuthPage/Register'
import { default as RegisterVerification } from './pages/AuthPage/RegisterVerification'
import ResetPassword from './pages/AuthPage/ResetPassword'
import ChatPage from './pages/ChatPage/ChatPage'
import Checkout from './pages/Checkout'
import HomePage from './pages/HomePage/HomePage'
import MapPage from './pages/Map/Map'
import PreferenceSurvey from './pages/PreferenceSurvey/PreferenceSurvey'
import ProfilePage from './pages/Profile/ProfilePage'
import Social from './pages/Social/Social'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HomePage */}
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        
        {/* AuthPage */}
        <Route path='/login' element={<Login />} />
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

        {/* Survey */}
        <Route path='/survey' element={<PreferenceSurvey />} />

        {/* Admin */}
        <Route path='/admin' element={<AdminDashboard />} />

        {/* Chat */}
        <Route path='/chat' element={<ChatPage />} />

        {/* Social */}
        <Route path='/social' element={<Social />} />

        {/* Checkout */}
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
