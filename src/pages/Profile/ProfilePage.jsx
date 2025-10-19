// src/pages/Profile/ProfilePage.jsx

import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import UserApi from '../../api/userApi'
import ChangePassword from './component/ChangePassword'
import ProfileInfo from './component/ProfileInfo'
import ProfilePayment from './component/ProfilePayment'
import ProfileSidebar from './component/ProfileSidebar'
import './CSS/ProfilePage.css'
import ProfilePreferences from './component/ProfilePreferences'

const getUserIdFromToken = () => {
  // 1. Lấy token từ Local Storage
  const token = localStorage.getItem('token')
  if (!token) {
    return null
  }

  try {
    // 2. Giải mã token
    const decoded = jwtDecode(token)

    // 3. Định nghĩa claim chứa User ID theo cấu trúc token bạn cung cấp
    const nameIdentifierClaim =
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'

    // 4. Lấy ID, ưu tiên claim chuẩn
    let id =
      decoded[nameIdentifierClaim] ||
      decoded.sub ||
      decoded.id ||
      decoded.userId

    if (!id) {
      console.warn('Không tìm thấy User ID trong payload của Token.')
      return null
    }

    // 5. Chuyển đổi thành số nguyên (vì API dùng ID dạng int: /id/23)
    const userIdInt = parseInt(id, 10)

    return isNaN(userIdInt) ? null : userIdInt
  } catch (e) {
    console.error('Lỗi giải mã token:', e)
    return null
  }
}

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('info')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userData, setUserData] = useState(null)

  const userId = getUserIdFromToken()

  // --------------------------------------------------------
  // ✅ EFFECT: Lấy thông tin người dùng (GET)
  // --------------------------------------------------------
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError(
          'Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.'
        )
        setIsLoading(false)
        return
      }

      try {
        // API: GET /Users/get-profile-user-by-id/{userId}
        const data = await UserApi.getProfile(userId)
        setUserData(data)
      } catch (err) {
        console.error('Lỗi khi tải thông tin người dùng:', err)
        setError(
          'Không thể tải thông tin người dùng. Vui lòng kiểm tra lại kết nối và trạng thái đăng nhập.'
        )
      } finally {
        setIsLoading(false)
      }
    }
    fetchUserData()
  }, [userId])

  // --------------------------------------------------------
  // ✅ Hàm xử lý cập nhật profile (PUT)
  // --------------------------------------------------------
  const handleUpdateProfile = async (updatedData) => {
    if (!userId) {
      throw new Error('Không có User ID. Vui lòng đăng nhập lại.')
    }

    // Payload theo yêu cầu của API PUT
    const payload = {
      fullName: updatedData.fullName,
      bio: updatedData.bio,
      gender: updatedData.gender,
      birthDate: updatedData.birthDate,
      // Các trường khác như email thường không được phép cập nhật
    }

    try {
      // API: PUT /Users/update-profile-user/{userId}
      await UserApi.updateProfile(userId, payload)
      // Cập nhật State (UI)
      setUserData((prev) => ({ ...prev, ...updatedData }))
      return true
    } catch (err) {
      console.error('Lỗi cập nhật profile:', err)
      const apiErrorMessage =
        err.response?.data?.message || 'Cập nhật thông tin thất bại.'
      throw new Error(apiErrorMessage)
    }
  }

  // --------------------------------------------------------
  // ✅ Hàm xử lý đổi mật khẩu (POST)
  // --------------------------------------------------------
  const handleChangePassword = async (passwordData) => {
    if (!userId) {
      throw new Error('Không có User ID. Vui lòng đăng nhập lại.')
    }

    try {
      // API: POST /Users/change-password
      // Request body: { userId, oldPassword, newPassword }
      const payload = {
        userId: userId,
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }

      await UserApi.changePassword(payload)
      return true
    } catch (err) {
      console.error('Lỗi đổi mật khẩu:', err)
      // Trích xuất thông báo lỗi cụ thể từ API
      const apiErrorMessage =
        err.response?.data?.message ||
        'Mật khẩu hiện tại không đúng hoặc lỗi hệ thống.'
      throw new Error(apiErrorMessage)
    }
  }

  // --- UI phần Loading, Error (Không thay đổi) ---

  if (isLoading) {
    return (
      <div
        className='profile-page-container'
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <div className='loading-screen'>Đang tải thông tin...</div>
      </div>
    )
  }

  if (error || !userData) {
    return (
      <div
        className='profile-page-container'
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <div className='error-screen'>
          {error || 'Không tìm thấy dữ liệu người dùng.'}
        </div>
      </div>
    )
  }

  return (
    <div className='profile-page-container'>
      <div className='profile-content-wrapper'>
        {/* Sidebar bên trái */}
        <aside className='profile-sidebar'>
          <ProfileSidebar
            userData={userData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </aside>

        {/* Content bên phải */}
        <main className='profile-main-content'>
          {activeTab === 'info' && (
            <ProfileInfo
              userData={userData}
              onUpdateProfile={handleUpdateProfile}
            />
          )}

          {activeTab === 'password' && (
            <ChangePassword onChangePassword={handleChangePassword} />
          )}

          {activeTab === 'history' && <ProfilePayment />}
          {activeTab === 'bookmarks' && <ProfilePreferences />}

          {/* {activeTab === 'settings' && (
            <div className='settings-placeholder'>
              <h2>Cài đặt</h2>
              <p>Sắp ra mắt...</p>
            </div>
          )} */}
        </main>
      </div>
    </div>
  )
}

export default ProfilePage
