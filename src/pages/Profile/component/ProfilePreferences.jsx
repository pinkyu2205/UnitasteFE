import { useEffect, useState } from 'react'
import UserApi from '../../../api/userApi'
import '../CSS/ProfilePreferences.css' // CSS cho layout chung
import TagEditor from './TagEditor'

// Helper để lấy UserID
const getUserIdFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]))
    const claim =
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    return decoded[claim] || decoded.sub || decoded.id || decoded.userId
  } catch (e) {
    return null
  }
}

// Khởi tạo state rỗng với các key từ API
const initialFormData = {
  preferredPlaceTypes: '',
  preferredPriceRange: '',
  preferredLocation: '',
  goingWith: '',
  purpose: '',
  requiredFeatures: '',
  note: '',
  venueAtmosphere: '',
  cuisineType: '',
  visitTime: '',
}

const ProfilePreferences = () => {
  const [formData, setFormData] = useState(initialFormData)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const userId = getUserIdFromToken()

  // 1. Tải sở thích đã lưu của người dùng
  useEffect(() => {
    const fetchPreferences = async () => {
      if (!userId) {
        setError('Không tìm thấy thông tin người dùng.')
        setIsLoading(false)
        return
      }
      try {
        const data = await UserApi.getUserPreferenceByUserId(userId)
        if (data) {
          // Gán dữ liệu (đảm bảo không có trường nào null)
          setFormData({
            preferredPlaceTypes: data.preferredPlaceTypes || '',
            preferredPriceRange: data.preferredPriceRange || '',
            preferredLocation: data.preferredLocation || '',
            goingWith: data.goingWith || '',
            purpose: data.purpose || '',
            requiredFeatures: data.requiredFeatures || '',
            note: data.note || '',
            venueAtmosphere: data.venueAtmosphere || '',
            cuisineType: data.cuisineType || '',
            visitTime: data.visitTime || '',
          })
        }
      } catch (err) {
        console.warn('Chưa có dữ liệu sở thích hoặc lỗi:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPreferences()
  }, [userId])

  // 2. Hàm cập nhật state chung
  // 'field' là tên key (ví dụ: 'preferredLocation')
  // 'newValue' là chuỗi mới (ví dụ: "Quận 1,Quận 3")
  const handleFieldChange = (field, newValue) => {
    setFormData((prev) => ({
      ...prev,
      [field]: newValue,
    }))
  }

  // 3. Xử lý cho input "Ghi chú" (textarea)
  const handleNoteChange = (e) => {
    setFormData((prev) => ({ ...prev, note: e.target.value }))
  }

  // 4. Gửi dữ liệu cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    if (!userId) {
      setError('Lỗi xác thực. Vui lòng đăng nhập lại.')
      setIsSubmitting(false)
      return
    }

    try {
      // API: PUT /Users/update-user-preference/{userId}
      // formData đã ở đúng định dạng chuỗi
      await UserApi.updateUserPreference(userId, formData)
      setSuccess('Cập nhật sở thích thành công!')
    } catch (err) {
      // Xử lý nếu user chưa có sở thích -> Tạo mới
      if (
        err.response &&
        (err.response.status === 404 || err.response.status === 400)
      ) {
        // 404 hoặc 400 tùy API
        try {
          // API: POST /Users/create-user-preference
          await UserApi.createUserPreference({ ...formData, userId: userId })
          setSuccess('Lưu sở thích thành công!')
        } catch (createErr) {
          setError('Lỗi khi lưu sở thích. Vui lòng thử lại.')
        }
      } else {
        setError('Lỗi khi cập nhật sở thích. Vui lòng thử lại.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div className='loading-screen'>Đang tải sở thích...</div>
  }

  return (
    <div className='pref-container'>
      <form onSubmit={handleSubmit}>
        <div className='pref-header'>
          <h2>Sở thích của bạn</h2>
          <p>Quản lý các lựa chọn của bạn để nhận được gợi ý tốt nhất.</p>
        </div>

        {/* --- Dùng TagEditor cho từng mục --- */}

        <TagEditor
          label='Khu vực bạn muốn đến'
          value={formData.preferredLocation}
          onChange={(newValue) =>
            handleFieldChange('preferredLocation', newValue)
          }
          placeholder='Thêm khu vực...'
        />

        <TagEditor
          label='Mức giá mong muốn'
          value={formData.preferredPriceRange}
          onChange={(newValue) =>
            handleFieldChange('preferredPriceRange', newValue)
          }
          placeholder='Thêm mức giá...'
        />

        <TagEditor
          label='Những địa điểm bạn thường hay tới'
          value={formData.preferredPlaceTypes}
          onChange={(newValue) =>
            handleFieldChange('preferredPlaceTypes', newValue)
          }
          placeholder='Thêm địa điểm...'
        />

        <TagEditor
          label='Bạn thường đi ăn với ai?'
          value={formData.goingWith}
          onChange={(newValue) => handleFieldChange('goingWith', newValue)}
          placeholder='Thêm người đi cùng...'
        />

        <TagEditor
          label='Mục đích bạn thường đi để làm gì?'
          value={formData.purpose}
          onChange={(newValue) => handleFieldChange('purpose', newValue)}
          placeholder='Thêm mục đích...'
        />

        <TagEditor
          label='Loại ẩm thực bạn yêu thích'
          value={formData.cuisineType}
          onChange={(newValue) => handleFieldChange('cuisineType', newValue)}
          placeholder='Thêm ẩm thực...'
        />

        <TagEditor
          label='Không khí / Phong cách của địa điểm'
          value={formData.venueAtmosphere}
          onChange={(newValue) =>
            handleFieldChange('venueAtmosphere', newValue)
          }
          placeholder='Thêm phong cách...'
        />

        <TagEditor
          label='Đặc điểm địa điểm mà bạn mong muốn'
          value={formData.requiredFeatures}
          onChange={(newValue) =>
            handleFieldChange('requiredFeatures', newValue)
          }
          placeholder='Thêm đặc điểm...'
        />

        <TagEditor
          label='Thời gian bạn thường đi ăn'
          value={formData.visitTime}
          onChange={(newValue) => handleFieldChange('visitTime', newValue)}
          placeholder='Thêm thời gian...'
        />

        {/* --- Mục Ghi chú (dùng textarea) --- */}
        <div className='pref-group'>
          <label htmlFor='note'>Ghi chú thêm</label>
          <textarea
            id='note'
            name='note'
            className='pref-textarea'
            rows='4'
            placeholder='Ví dụ: Mình bị dị ứng đậu phộng, ưu tiên quán có chỗ đậu xe hơi...'
            value={formData.note}
            onChange={handleNoteChange}
          ></textarea>
        </div>

        {/* --- Nút Cập nhật & Thông báo --- */}
        <div className='pref-footer'>
          {error && <div className='pref-message error'>{error}</div>}
          {success && <div className='pref-message success'>{success}</div>}

          <button type='submit' className='save-btn' disabled={isSubmitting}>
            {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật sở thích'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProfilePreferences
