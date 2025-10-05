import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useRegister() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const registerUser = async ({ fullName, email, password, birthDate }) => {
    setError('')
    setSuccess(false)

    // Validation
    if (!fullName || !email || !password || !birthDate) {
      setError('⚠️ Vui lòng điền đầy đủ thông tin.')
      return
    }
    if (password.length < 8) {
      setError('⚠️ Mật khẩu phải ít nhất 8 ký tự.')
      return
    }
    if (!/[A-Z]/.test(password)) {
      setError('⚠️ Mật khẩu phải có ít nhất 1 chữ in hoa.')
      return
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError('⚠️ Mật khẩu phải có ít nhất 1 ký tự đặc biệt.')
      return
    }

    try {
      const res = await axios.post('https://localhost:5001/api/Users/Register', {
        fullName,
        email,
        passwordHash: password,
        birthDate,
      })

      if (res.data.status) {
        setSuccess(true)
        navigate('/register-verification', { state: { email } })
      } else {
        setError(res.data.message || 'Đăng ký thất bại, thử lại.')
      }
    } catch (err) {
      if (err.response?.data?.message?.includes('Email')) {
        setError('⚠️ Email này đã được đăng ký.')
      } else {
        setError(err.response?.data?.message || 'Đăng ký thất bại, thử lại.')
      }
    }

  }

  return { registerUser, error, success }
}
