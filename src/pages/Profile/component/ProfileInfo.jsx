// src/pages/Profile/component/ProfileInfo.jsx

import { useState } from 'react'
import UserApi from '../../../api/userApi'
import '../CSS/ProfileInfo.css'

const ProfileInfo = ({ userData, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // State loading cho nút Save
  const [uploading, setUploading] = useState(false) // State loading cho upload ảnh
  const [error, setError] = useState(null) // State lỗi
  const [formData, setFormData] = useState({
    fullName: userData.fullName,
    email: userData.email,
    bio: userData.bio,
    gender: userData.gender,
    birthDate: userData.birthDate,
  })
  const [avatarUrl, setAvatarUrl] = useState(userData.avatarUrl) // ✅ Đổi tên thành avatarUrl cho rõ ràng

  // Đồng bộ State khi userData thay đổi (nếu được fetch lại)
  useState(() => {
    setFormData({
      fullName: userData.fullName,
      email: userData.email,
      bio: userData.bio,
      gender: userData.gender,
      birthDate: userData.birthDate,
    })
    setAvatarUrl(userData.avatarUrl)
  }, [userData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  // ✅ CẬP NHẬT LOGIC: Upload ảnh lên API và lấy URL
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    setError(null)

    try {
      const newFormData = new FormData()
      newFormData.append('avatarFile', file)

      // ✅ Gọi API upload ảnh
      const response = await UserApi.uploadAvatar(newFormData)

      // ✅ Lấy avatar URL trả về từ server (hoặc từ response.avatarUrl)
      const newAvatarUrl = response.avatarUrl || response.data?.avatarUrl

      // ✅ Cập nhật ảnh hiển thị ngay
      setAvatarUrl(newAvatarUrl)

      // ✅ Nếu có prop cập nhật profile ở cha thì truyền lại
      if (onUpdateProfile) {
        onUpdateProfile({ ...userData, avatarUrl: newAvatarUrl })
      }
    } catch (err) {
      console.error('Upload avatar error:', err)
      setError('Tải ảnh thất bại, vui lòng thử lại!')
    } finally {
      setUploading(false)
    }
  }

  // ✅ CẬP NHẬT LOGIC: Gọi onUpdateProfile với URL mới nhất
  const handleSave = async () => {
    // Có thể thêm validation cơ bản ở đây (ví dụ: fullName không được rỗng)

    setIsLoading(true)
    setError(null)

    try {
      const success = await onUpdateProfile({
        ...formData,
        avatarUrl: avatarUrl, // ✅ Truyền URL mới nhất (đã upload)
      })

      if (success) {
        setIsEditing(false)
        // Note: Logic set success message sẽ nằm ở ProfilePage.jsx
      } else {
        // Nếu onUpdateProfile không throw mà trả về false
        throw new Error('Lưu thông tin thất bại.')
      }
    } catch (err) {
      console.error('Lỗi khi lưu profile:', err)
      setError(err.message || 'Lưu thay đổi không thành công.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    // Reset về giá trị userData gốc
    setFormData({
      fullName: userData.fullName,
      email: userData.email,
      bio: userData.bio,
      gender: userData.gender,
      birthDate: userData.birthDate,
    })
    setAvatarUrl(userData.avatarUrl) // Reset URL ảnh về ban đầu
    setIsEditing(false)
    setError(null) // Xóa lỗi
  }

  return (
    <div className='profile-info-container'>
      <div className='info-header'>
        <h2>Thông tin cá nhân</h2>
        {!isEditing && (
          <button className='edit-btn' onClick={() => setIsEditing(true)}>
            ✏️ Chỉnh sửa
          </button>
        )}
      </div>

      {/* Hiển thị lỗi chung */}
      {error && (
        <div className='error-message'>
          <span className='error-icon'>⚠️</span>
          {error}
        </div>
      )}

      <div className='profile-info-content'>
        {/* Avatar Section */}
        <div className='avatar-section'>
          <div className='avatar-container'>
            {/* ✅ Sử dụng avatarUrl mới nhất */}
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={formData.fullName}
                className='avatar-image'
              />
            ) : (
              <div className='avatar-placeholder-large'>
                {formData.fullName?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>

          {isEditing && (
            <div className='avatar-upload'>
              <label
                htmlFor='avatar-input'
                className='upload-label'
                disabled={uploading}
              >
                {uploading ? 'Đang tải...' : '📸 Tải ảnh lên'}
              </label>
              <input
                id='avatar-input'
                type='file'
                accept='image/*'
                onChange={handleImageUpload} // ✅ Dùng hàm upload mới
                className='upload-input'
                disabled={uploading}
              />
            </div>
          )}
        </div>

        {/* Form Fields (Giữ nguyên cấu trúc) */}
        <div className='form-fields'>
          {/* Họ và Tên */}
          <div className='form-group'>
            <label>Họ và tên</label>
            {isEditing ? (
              <input
                type='text'
                name='fullName'
                value={formData.fullName}
                onChange={handleInputChange}
                className='form-input'
                placeholder='Nhập họ và tên'
              />
            ) : (
              <div className='form-value'>{userData.fullName}</div>
            )}
          </div>

          {/* Email (Không cho sửa theo API PUT) */}
          <div className='form-group'>
            <label>Email</label>
            <div className='form-value read-only'>{userData.email}</div>
            {isEditing && <small>Email không thể thay đổi.</small>}
          </div>

          {/* Bio */}
          <div className='form-group'>
            <label>Tiểu sử</label>
            {isEditing ? (
              <textarea
                name='bio'
                value={formData.bio}
                onChange={handleInputChange}
                className='form-textarea'
                placeholder='Viết gì đó về bản thân bạn...'
                rows='4'
              />
            ) : (
              <div className='form-value bio-value'>
                {userData.bio || 'Chưa có thông tin'}
              </div>
            )}
          </div>

          {/* Giới tính */}
          <div className='form-group'>
            <label>Giới tính</label>
            {isEditing ? (
              <select
                name='gender'
                value={formData.gender}
                onChange={handleInputChange}
                className='form-select'
              >
                <option value=''>-- Chọn giới tính --</option>
                <option value='Nam'>Nam</option>
                <option value='Nữ'>Nữ</option>
                <option value='Khác'>Khác</option>
              </select>
            ) : (
              <div className='form-value'>
                {userData.gender || 'Chưa cập nhật'}
              </div>
            )}
          </div>

          {/* Ngày sinh */}
          <div className='form-group'>
            <label>Ngày sinh</label>
            {isEditing ? (
              <input
                type='date'
                name='birthDate'
                value={formData.birthDate?.substring(0, 10) || ''} // Format date cho input
                onChange={handleInputChange}
                className='form-input'
              />
            ) : (
              <div className='form-value'>
                {userData.birthDate
                  ? new Date(userData.birthDate).toLocaleDateString('vi-VN')
                  : 'Chưa cập nhật'}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className='form-actions'>
            <button
              className='btn-save'
              onClick={handleSave}
              disabled={isLoading || uploading}
            >
              {isLoading ? 'Đang lưu...' : '💾 Lưu thay đổi'}
            </button>
            <button
              className='btn-cancel'
              onClick={handleCancel}
              disabled={isLoading || uploading}
            >
              ❌ Hủy
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileInfo
