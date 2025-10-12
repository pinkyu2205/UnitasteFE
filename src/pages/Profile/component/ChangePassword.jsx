// src/pages/Profile/component/ChangePassword.jsx

import { useState } from 'react'
import '../CSS/ChangePassword.css'

const ChangePassword = ({ onChangePassword }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại'
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'Vui lòng nhập mật khẩu mới'
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Mật khẩu phải có ít nhất 6 ký tự'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu mới'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      // Gọi API để đổi mật khẩu
      onChangePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSuccess(true)
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })

      // Hide success message sau 3 giây
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      setErrors({ general: 'Có lỗi xảy ra. Vui lòng thử lại.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='change-password-container'>
      <div className='password-header'>
        <h2>Đổi mật khẩu</h2>
        <p>Cập nhật mật khẩu của bạn để bảo vệ tài khoản</p>
      </div>

      {success && (
        <div className='success-message'>
          <span className='success-icon'>✓</span>
          Đổi mật khẩu thành công!
        </div>
      )}

      {errors.general && (
        <div className='error-message'>
          <span className='error-icon'>⚠️</span>
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className='password-form'>
        {/* Mật khẩu hiện tại */}
        <div className='form-group-password'>
          <label htmlFor='currentPassword'>Mật khẩu hiện tại</label>
          <div className='password-input-wrapper'>
            <input
              id='currentPassword'
              type={showPasswords.current ? 'text' : 'password'}
              name='currentPassword'
              value={formData.currentPassword}
              onChange={handleInputChange}
              className={`password-input ${
                errors.currentPassword ? 'error' : ''
              }`}
              placeholder='Nhập mật khẩu hiện tại'
            />
            <button
              type='button'
              className='password-toggle'
              onClick={() => togglePasswordVisibility('current')}
            >
              {showPasswords.current ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.currentPassword && (
            <span className='error-text'>{errors.currentPassword}</span>
          )}
        </div>

        {/* Mật khẩu mới */}
        <div className='form-group-password'>
          <label htmlFor='newPassword'>Mật khẩu mới</label>
          <div className='password-input-wrapper'>
            <input
              id='newPassword'
              type={showPasswords.new ? 'text' : 'password'}
              name='newPassword'
              value={formData.newPassword}
              onChange={handleInputChange}
              className={`password-input ${errors.newPassword ? 'error' : ''}`}
              placeholder='Nhập mật khẩu mới'
            />
            <button
              type='button'
              className='password-toggle'
              onClick={() => togglePasswordVisibility('new')}
            >
              {showPasswords.new ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.newPassword && (
            <span className='error-text'>{errors.newPassword}</span>
          )}
          <div className='password-strength'>
            <span className='strength-label'>
              {formData.newPassword.length >= 8
                ? '💪 Mạnh'
                : formData.newPassword.length >= 6
                ? '👍 Trung bình'
                : '⚠️ Yếu'}
            </span>
          </div>
        </div>

        {/* Xác nhận mật khẩu mới */}
        <div className='form-group-password'>
          <label htmlFor='confirmPassword'>Xác nhận mật khẩu mới</label>
          <div className='password-input-wrapper'>
            <input
              id='confirmPassword'
              type={showPasswords.confirm ? 'text' : 'password'}
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`password-input ${
                errors.confirmPassword ? 'error' : ''
              }`}
              placeholder='Xác nhận mật khẩu mới'
            />
            <button
              type='button'
              className='password-toggle'
              onClick={() => togglePasswordVisibility('confirm')}
            >
              {showPasswords.confirm ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className='error-text'>{errors.confirmPassword}</span>
          )}
        </div>

        {/* Submit Button */}
        <button type='submit' className='submit-btn' disabled={loading}>
          {loading ? (
            <>
              <span className='loading-spinner'></span>
              Đang cập nhật...
            </>
          ) : (
            <>
              <span className='btn-icon'>🔐</span>
              Cập nhật mật khẩu
            </>
          )}
        </button>
      </form>

      {/* Security Tips */}
      <div className='security-tips'>
        <h4>💡 Mẹo bảo mật:</h4>
        <ul>
          <li>Sử dụng mật khẩu độc nhất, không trùng với các tài khoản khác</li>
          <li>Kết hợp chữ cái, số và ký tự đặc biệt</li>
          <li>Tránh sử dụng thông tin cá nhân dễ đoán</li>
          <li>Đổi mật khẩu định kỳ để bảo vệ tài khoản</li>
        </ul>
      </div>
    </div>
  )
}

export default ChangePassword
