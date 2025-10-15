// src/api/authApi.js
import UserApi from '../../../api/userApi'

export const LoginAPI = async (email, password) => {
  try {
    const res = await UserApi.login({
      email: email,
      password: password,
    })
    console.log('Login response:', res)
    return { token: res.token, userId: res.userId }
  } catch (err) {
    throw err.response?.data || { message: 'Login failed' }
  }
}
