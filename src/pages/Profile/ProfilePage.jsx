// src/pages/Profile/ProfilePage.jsx

import { useState } from 'react'
import ChangePassword from './component/ChangePassword'
import ProfileInfo from './component/ProfileInfo'
import ProfileSidebar from './component/ProfileSidebar'
import './CSS/ProfilePage.css'

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('info')

  // Mock user data - thực tế lấy từ API
  const [userData, setUserData] = useState({
    userId: 1,
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    bio: 'Yêu thích ẩm thực và khám phá những quán ăn mới',
    gender: 'Nam',
    birthDate: '1990-01-15',
    avatarUrl: null,
    createdAt: '2025-01-10T10:30:00',
    status: 'Active',
  })

  const handleUpdateProfile = (updatedData) => {
    setUserData({ ...userData, ...updatedData })
    console.log('Profile updated:', updatedData)
  }

  const handleChangePassword = (passwordData) => {
    console.log('Password change request:', passwordData)
    // Gọi API để đổi mật khẩu
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

          {activeTab === 'settings' && (
            <div className='settings-placeholder'>
              <h2>Cài đặt</h2>
              <p>Sắp ra mắt...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default ProfilePage
