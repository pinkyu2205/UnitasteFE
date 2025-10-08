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
}

export default UserApi
