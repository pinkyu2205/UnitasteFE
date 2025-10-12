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
    if (errors[name] || errors.general) {
      // Clear general error on input
      setErrors((prev) => ({ ...prev, [name]: '', general: '' }))
    }
    setSuccess(false) // Reset success message on input
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  // ✅ CẬP NHẬT LOGIC KIỂM TRA MẬT KHẨU MỚI (PHÙ HỢP VỚI API)
  const validateForm = () => {
    const newErrors = {}

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại'
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'Vui lòng nhập mật khẩu mới'
    } else {
      // Tiêu chí API: ít nhất 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

      if (!passwordRegex.test(formData.newPassword)) {
        newErrors.newPassword =
          'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số, và ký tự đặc biệt (@$!%*?&)'
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu mới'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp'
    }

    return newErrors
  }
  // ✅ KẾT THÚC CẬP NHẬT LOGIC

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setErrors({}) // Reset lỗi
    setSuccess(false) // Reset thông báo thành công

    try {
      // Gọi API để đổi mật khẩu (hàm này đã được liên kết với UserApi trong ProfilePage)
      await onChangePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      })

      setSuccess(true)
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })

      // Hide success message sau 3 giây
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      // Bắt lỗi cụ thể từ API (ví dụ: mật khẩu cũ không đúng)
      const errorMessage = error.message || 'Có lỗi xảy ra. Vui lòng thử lại.'
      setErrors({ general: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  // --- HÀM TÍNH ĐỘ MẠNH (CẬP NHẬT LẠI TIÊU CHUẨN) ---
  const getPasswordStrength = (password) => {
    if (password.length < 8) return { label: '⚠️ Yếu', color: 'red' }

    let strength = 0
    if (/[a-z]/.test(password)) strength++ // Chữ thường
    if (/[A-Z]/.test(password)) strength++ // Chữ hoa
    if (/\d/.test(password)) strength++ // Số
    if (/[@$!%*?&]/.test(password)) strength++ // Ký tự đặc biệt

    if (strength === 4) return { label: '💪 Rất Mạnh', color: 'green' }
    if (strength >= 3) return { label: '👍 Mạnh', color: 'blue' }
    if (strength >= 2) return { label: '👌 Trung bình', color: 'orange' }
    return { label: '⚠️ Yếu', color: 'red' }
  }

  const strength = getPasswordStrength(formData.newPassword)
  // --- KẾT THÚC HÀM TÍNH ĐỘ MẠNH ---

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
          {/* ... (Giữ nguyên cấu trúc input) ... */}
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
          {/* ✅ Cập nhật hiển thị lỗi chi tiết */}
          {errors.newPassword && (
            <span className='error-text'>{errors.newPassword}</span>
          )}
          {/* ✅ Cập nhật hiển thị độ mạnh */}
          <div className='password-strength'>
            <span className='strength-label' style={{ color: strength.color }}>
              {strength.label}
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

      {/* Security Tips (Giữ nguyên) */}
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
