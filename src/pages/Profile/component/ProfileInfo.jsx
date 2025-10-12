// src/pages/Profile/component/ProfileInfo.jsx

import { useState } from 'react'
import '../CSS/ProfileInfo.css'

const ProfileInfo = ({ userData, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: userData.fullName,
    email: userData.email,
    bio: userData.bio,
    gender: userData.gender,
    birthDate: userData.birthDate,
  })
  const [uploadedImage, setUploadedImage] = useState(userData.avatarUrl)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    onUpdateProfile({ ...formData, avatarUrl: uploadedImage })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      fullName: userData.fullName,
      email: userData.email,
      bio: userData.bio,
      gender: userData.gender,
      birthDate: userData.birthDate,
    })
    setUploadedImage(userData.avatarUrl)
    setIsEditing(false)
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

      <div className='profile-info-content'>
        {/* Avatar Section */}
        <div className='avatar-section'>
          <div className='avatar-container'>
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt={formData.fullName}
                className='avatar-image'
              />
            ) : (
              <div className='avatar-placeholder-large'>
                {formData.fullName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {isEditing && (
            <div className='avatar-upload'>
              <label htmlFor='avatar-input' className='upload-label'>
                📸 Tải ảnh lên
              </label>
              <input
                id='avatar-input'
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
                className='upload-input'
              />
            </div>
          )}
        </div>

        {/* Form Fields */}
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

          {/* Email */}
          <div className='form-group'>
            <label>Email</label>
            {isEditing ? (
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className='form-input'
                placeholder='Nhập email'
              />
            ) : (
              <div className='form-value'>{userData.email}</div>
            )}
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
                value={formData.birthDate}
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
            <button className='btn-save' onClick={handleSave}>
              💾 Lưu thay đổi
            </button>
            <button className='btn-cancel' onClick={handleCancel}>
              ❌ Hủy
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileInfo
