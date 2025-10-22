// src/pages/HomePage/components/Header.jsx
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserApi from '../../../api/userApi'
import '../CSS/Header.css'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [userNameInitial, setUserNameInitial] = useState('U')
  const navigate = useNavigate()

  // Check login status on component mount and update
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId') // Get userId
    const fullName = localStorage.getItem('fullName') // Get fullName for fallback initial

    if (token && userId) {
      setIsLoggedIn(true)
      if (fullName) {
        setUserNameInitial(fullName.charAt(0).toUpperCase()) // Set initial from localStorage first
      }

      // --- Fetch Profile ---
      const fetchUserProfile = async () => {
        try {
          // Call your API using the userId
          const profileData = await UserApi.getProfile(userId)
          if (profileData && profileData.avatarUrl) {
            setAvatarUrl(profileData.avatarUrl) // Set avatar from API response
          }
          // Optionally update the initial if fullName from API is different/better
          if (profileData && profileData.fullName) {
            setUserNameInitial(profileData.fullName.charAt(0).toUpperCase())
          }
        } catch (error) {
          console.error('Failed to fetch user profile for header:', error)
          // Keep using localStorage/fallback if API fails
        }
      }

      fetchUserProfile() // Execute the fetch function
      // --------------------
    } else {
      setIsLoggedIn(false)
      setAvatarUrl(null)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleProfileClick = () => {
    navigate('/profile')
    setIsMobileMenuOpen(false) // Close mobile menu if open
  }

  return (
    <header className='homepage-header'>
      {/* Logo on the Left */}
      <div className='header-left'>
        <Link to='/' className='logo'>
          <img src='/src/assets/Unitaste-logo.png' alt='Unitaste Logo' />
          <span className='logo-text'>UniTaste</span>
        </Link>
      </div>

      {/* Navigation in the Center */}
      <nav className='header-center'>
        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to='/' onClick={() => setIsMobileMenuOpen(false)}>
              Trang chủ
            </Link>
          </li>
          <li>
            <Link to='/map' onClick={() => setIsMobileMenuOpen(false)}>
              Bản đồ
            </Link>
          </li>
          <li>
            <Link to='/social' onClick={() => setIsMobileMenuOpen(false)}>
              Cộng đồng
            </Link>
          </li>
          {/* Only show Profile link here if logged in for consistency, or remove */}
          {/* {isLoggedIn && <li><Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>Hồ sơ</Link></li>} */}
        </ul>
      </nav>

      {/* Auth/User Section on the Right */}
      <div className='header-right'>
        {isLoggedIn ? (
          // Logged In: Show Avatar
          <button
            className='avatar-button'
            onClick={handleProfileClick}
            title='Xem hồ sơ'
          >
            <img
              src={
                avatarUrl ||
                `https://ui-avatars.com/api/?name=${
                  localStorage.getItem('fullName')?.charAt(0) || 'U'
                }&background=f26522&color=fff&rounded=true`
              }
              alt='User Avatar'
              className='header-avatar'
            />
          </button>
        ) : (
          // Logged Out: Show Buttons
          <div className='auth-buttons'>
            <Link to='/login' className='header-button login'>
              Đăng nhập
            </Link>
            <Link to='/register' className='header-button register'>
              Đăng ký
            </Link>
          </div>
        )}
        {/* Mobile Menu Button - Moved to the right */}
        <button className='mobile-menu-btn' onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu Content (if using overlay approach) */}
      {isMobileMenuOpen && (
        <div className='mobile-menu-overlay'>
          <ul className='mobile-nav-menu'>
            <li>
              <Link to='/' onClick={() => setIsMobileMenuOpen(false)}>
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to='/map' onClick={() => setIsMobileMenuOpen(false)}>
                Bản đồ
              </Link>
            </li>
            <li>
              <Link to='/social' onClick={() => setIsMobileMenuOpen(false)}>
                Cộng đồng
              </Link>
            </li>
            {/* Show profile link in mobile menu only if logged in */}
            {isLoggedIn && (
              <li>
                <Link to='/profile' onClick={() => setIsMobileMenuOpen(false)}>
                  Hồ sơ
                </Link>
              </li>
            )}
            {/* Add Login/Register links to mobile menu if NOT logged in */}
            {!isLoggedIn && (
              <>
                <li className='mobile-auth-separator'>
                  <hr />
                </li>
                <li>
                  <Link
                    to='/login'
                    className='mobile-auth-link'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Đăng nhập
                  </Link>
                </li>
                <li>
                  <Link
                    to='/register'
                    className='mobile-auth-link'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Đăng ký
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header
