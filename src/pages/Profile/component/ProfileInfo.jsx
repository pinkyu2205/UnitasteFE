import axios from 'axios'
import { useEffect, useState } from 'react'
import PaymentApi from '../../../api/paymentApi'
import '../CSS/ProfileInfo.css'
import VipBadge from './VipBadge'

const API_GATEWAY = import.meta.env.VITE_API_GATEWAY
const token = localStorage.getItem('token')

const ProfileInfo = ({ userData, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    fullName: userData.fullName,
    email: userData.email,
    bio: userData.bio,
    gender: userData.gender,
    birthDate: userData.birthDate,
  })
  const [avatarUrl, setAvatarUrl] = useState(userData.avatarUrl)
  const [isVip, setIsVip] = useState(false)

  // 🔁 Đồng bộ khi userData thay đổi
  useEffect(() => {
    setFormData({
      fullName: userData.fullName,
      email: userData.email,
      bio: userData.bio,
      gender: userData.gender,
      birthDate: userData.birthDate,
    })
    setAvatarUrl(userData.avatarUrl)
  }, [userData])

  // Kiểm tra trạng thái VIP để hiển thị dưới tên
  useEffect(() => {
    let mounted = true
    const check = async () => {
      try {
        // 1) Thử endpoint checkVipStatus
        const res = await PaymentApi.checkVipStatus()
        const data = res?.data ?? res
        // Chỉ coi là VIP khi trạng thái thật sự ACTIVE
        const status = (data?.status || data?.serviceStatus || '').toString().toUpperCase()
        const hasPurchased = data?.hasPurchased === true
        const isActive = data?.isActive === true || status === 'ACTIVE'
        if (mounted) {
          const vip = hasPurchased && isActive
          setIsVip(vip)
          localStorage.setItem('isVip', String(vip))
        }
        return
      } catch (_) {
        // ignore and fallback below
      }

      // 2) Fallback: xem lịch sử mua để xác định còn hiệu lực
      try {
        const history = await PaymentApi.getPurchasesByUserToken()
        const items = Array.isArray(history)
          ? history
          : Array.isArray(history?.data)
          ? history.data
          : []
        const now = new Date()
        const active = items.some((p) => {
          const status = String(p?.status || '').toUpperCase()
          const canceled = status.includes('CANCEL') || status === 'CANCELED'
          const expired = p?.endDate ? new Date(p.endDate) <= now : false
          const isActiveFlag = p?.isActive === true || status === 'ACTIVE'
          return isActiveFlag && !canceled && !expired
        })
        if (mounted) {
          setIsVip(active)
          localStorage.setItem('isVip', String(!!active))
        }
      } catch (_) {
        if (mounted) setIsVip(false)
        try { localStorage.setItem('isVip', 'false') } catch {}
      }
    }
    check()
    return () => {
      mounted = false
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }
  // ✅ HÀM DUY NHẤT xử lý upload avatar
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setUploading(true)

      // Tạo preview tạm
      const previewUrl = URL.createObjectURL(file)
      setAvatarUrl(previewUrl)

      // Gửi ảnh lên API
      const formData = new FormData()
      formData.append('avatarFile', file)

      const res = await axios.post(
        `${API_GATEWAY}/Users/upload-avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      // ✅ Cập nhật avatarUrl mới nhất
      const newUrl = res.data.avatarUrl
      setAvatarUrl(newUrl)

      const updatedUser = { ...userData, avatarUrl: newUrl }
      localStorage.setItem('user', JSON.stringify(updatedUser))
    } catch (error) {
      console.error('Lỗi khi upload ảnh:', error)
      setError('Không thể tải ảnh lên. Vui lòng thử lại.')
    } finally {
      setUploading(false)
    }
  }

  //luu thay doi
  const handleSave = async () => {
    setIsLoading(true)
    try {
      const success = await onUpdateProfile({
        ...formData,
        avatarUrl: avatarUrl,
      })
      if (success) setIsEditing(false)
    } catch (err) {
      console.error(err)
      setError('Lưu thông tin không thành công.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      fullName: userData.fullName,
      email: userData.email,
      bio: userData.bio,
      gender: userData.gender,
      birthDate: userData.birthDate,
    })
    setAvatarUrl(userData.avatarUrl)
    setIsEditing(false)
    setError(null)
  }

  // ✅ Giao diện
  return (
    <div className='profile-info-container'>
      <div className='info-header'>
        <h2>Thông tin cá nhân</h2>
        {/* Badge VIP hiển thị riêng ở Sidebar theo yêu cầu */}
      </div>

      {error && (
        <div className='error-message'>
          <span className='error-icon'>⚠️</span>
          {error}
        </div>
      )}

      <div className='profile-info-content'>
        <div className='avatar-section'>
          <div className='avatar-container'>
            {avatarUrl ? (
              <img src={avatarUrl} alt='avatar' className='avatar-image' />
            ) : (
              <div className='avatar-placeholder-large'>
                {formData.fullName?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>

          {isEditing && (
            <div className='avatar-upload'>
              <label htmlFor='avatar-input' className='upload-label'>
                {uploading ? 'Đang tải...' : '📸 Tải ảnh lên'}
              </label>
              <input
                id='avatar-input'
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
                className='upload-input'
                disabled={uploading}
              />
            </div>
          )}
        </div>

        <div className='form-fields'>
          <div className='form-group'>
            <label>Họ và tên</label>
            {isEditing ? (
              <input
                type='text'
                name='fullName'
                value={formData.fullName}
                onChange={handleInputChange}
                className='form-input'
              />
            ) : (
              <div className='form-value'>
                {userData.fullName}
              </div>
            )}
          </div>

          <div className='form-group'>
            <label>Email</label>
            <div className='form-value read-only'>{userData.email}</div>
          </div>

          <div className='form-group'>
            <label>Tiểu sử</label>
            {isEditing ? (
              <textarea
                name='bio'
                value={formData.bio}
                onChange={handleInputChange}
                className='form-textarea'
              />
            ) : (
              <div className='form-value bio-value'>
                {userData.bio || 'Chưa có thông tin'}
              </div>
            )}
          </div>

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

          <div className='form-group'>
            <label>Ngày sinh</label>
            {isEditing ? (
              <input
                type='date'
                name='birthDate'
                value={formData.birthDate?.substring(0, 10) || ''}
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

      {/* Nút chỉnh sửa ở cuối */}
      {!isEditing && (
        <div className='edit-button-section'>
          <button className='edit-btn' onClick={() => setIsEditing(true)}>
            ✏️ Chỉnh sửa thông tin
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfileInfo
