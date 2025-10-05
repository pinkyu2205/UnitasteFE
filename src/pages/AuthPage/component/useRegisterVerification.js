import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userApi from '../../../api/userApi'


export default function useRegisterVerification() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  // ✅ Xác minh OTP
  const verifyOtp = async (email, otp) => {
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const res = await userApi.verifyRegister({
        email: email,      // ✅ chữ thường, trùng với backend
        otpCode: otp,
      })
      console.log(res.data?.status)
       console.log(res?.status)
      if (res.data?.status === true || res?.status === true) {
        setSuccess('🎉 Đăng ký thành công! Vui lòng đăng nhập.')
        setTimeout(() => navigate('/'), 2000)
      } else {
        setError(res.data?.error || '❌ OTP không hợp lệ hoặc đã hết hạn.')
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Xác minh OTP thất bại.')
    } finally {
      setLoading(false)
    }
  }

  // ✅ Gửi lại OTP
  const resendOtp = async (email) => {
    if (!email) {
      setError('Không tìm thấy email để gửi lại OTP.')
      return
    }

    setError('')
    setSuccess('')
    setLoading(true)
    try {
      const res = await userApi.requestResetPassword({ email })
      if (res.status === 200) {
        setSuccess('✅ OTP mới đã được gửi đến email của bạn.')
      }
    } catch (err) {
      setError(err.response?.data || 'Gửi lại OTP thất bại, thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return {
    verifyOtp,
    resendOtp,
    loading,
    error,
    success,
  }
}
