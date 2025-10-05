import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userApi from '../../../api/userApi'

export default function useRegisterVerification() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  // Xác thực OTP + đổi mật khẩu
  const verifyAndResetPassword = async (otp, newPassword, confirmPassword) => {
    setLoading(true)
    setError('')
    setSuccess('')

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      setLoading(false)
      return
    }

    try {
      const res = await userApi.confirmResetPassword({
        token: otp,
        newPassword,
      })
      console.log(res?.status)
      if (res?.status === 'true') {
        setSuccess('Đặt lại mật khẩu thành công! Vui lòng đăng nhập.')
        console.log(res?.status)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
    } catch (err) {
      setError(err.response?.data || 'Xác minh OTP thất bại, thử lại.')
    } finally {
      setLoading(false)
    }
  }

  // Gửi lại OTP
  const resendOtp = async (email) => {
    if (!email) {
      setError('Không tìm thấy email để gửi lại OTP')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const res = await userApi.requestResetPassword({ email })
      if (res.status === 200) {
        setSuccess('OTP mới đã được gửi đến email của bạn.')
      }
    } catch (err) {
      setError(err.response?.data || 'Gửi lại OTP thất bại, thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return {
    verifyAndResetPassword,
    resendOtp,
    loading,
    error,
    success,
  }
}
