import axios from 'axios'
import { axiosClient } from './axios'

const UserApi = {
  //USER AUTH
  // Login
  login: async (data) => {
    return await axiosClient.post('/Users/Login', data)
  },

  // Register
  register: async (data) => {
    return await axiosClient.post('/Users/Register', data)
  },

  // Verify register OTP
  verifyRegister: async (data) => {
    return await axiosClient.post('/Users/verify-register', data)
  },

  // Request reset password
  requestResetPassword: async (payload) => {
    return await axiosClient.post('/Users/request-reset-password', payload)
  },
  // Confirm reset password
  confirmResetPassword: async (data) => {
    return await axiosClient.post('/Users/confirm-reset-password', data)
  },
  // 🚀 CÁC API CHO PROFILE (SỬ DỤNG TOKEN) 🚀

  // Lấy thông tin Profile (GET /api/Users/get-profile-user-by-id/{userId})
  // Token sẽ được tự động đính kèm.
  getProfile: async (userId) => {
    return await axiosClient.get(`/Users/get-profile-user-by-id/${userId}`)
  },

  // Cập nhật Profile (PUT /api/Users/update-profile-user-by-id/{userId})
  updateProfile: async (userId, data) => {
    return await axiosClient.put(
      `/Users/update-profile-user-by-id/${userId}`,
      data
    )
  },

  // Đổi mật khẩu (POST /api/Users/change-password)
  changePassword: async (data) => {
    return await axiosClient.post('/Users/change-password', data)
  },

  //Tải ảnh đại diện lên
  // Trả về: { avatarUrl: "..." }
  uploadAvatar: async (formData) => {
    return await axios.post(
      `${import.meta.env.VITE_API_GATEWAY}/Users/upload-avatar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
  },
  // Tạo user preference (POST /Users/create-user-preference)
  createUserPreference: async (payload) => {
    return await axiosClient.post('/Users/create-user-preference', payload)
  },

  // Lấy user preference theo userId (GET /Users/get-user-preference-by-userid/{userId})
  getUserPreferenceByUserId: async (userId) => {
    return await axiosClient.get(
      `/Users/get-user-preference-by-userid/${userId}`
    )
  },

  // Update user preference (PUT /Users/update-user-preference/{userId})
  updateUserPreference: async (userId, data) => {
    return await axiosClient.put(
      `/Users/update-user-preference/${userId}`,
      data
    )
  },

  //ADMIN PAGE
  // Đếm số người dùng đang hoạt động
  countActiveUsers: async () => {
    return await axiosClient.get('/Users/count-active')
  },

  // Đếm số người dùng ngừng hoạt động
  countInactiveUsers: async () => {
    return await axiosClient.get('/Users/count-inactive')
  },

  // Đếm số người dùng đăng kí theo tháng
  countRegisterByMonth: (year) => {
    return axiosClient.get(`/Users/count-register-by-month/${year}`)
  },
}

export default UserApi
