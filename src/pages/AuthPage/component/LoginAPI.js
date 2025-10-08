// src/api/authApi.js
import UserApi from '../../../api/userApi'

export const LoginAPI = async (email, password) => {
  try {
    const res = await UserApi.login({
      email: email,
      password: password,
    })
    return res.token
  } catch (err) {
    throw err.response?.data || { message: 'Login failed' }
  }
}
