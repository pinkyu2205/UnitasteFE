import { axiosClient } from './axios'

const UserApi = {
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
}

export default UserApi
