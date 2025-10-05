import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userApi from '../../../api/userApi'

export default function useResetPassword() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const sendResetEmail = async (email) => {
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const res = await userApi.requestResetPassword({ email })
      if (res.status === 200) {
        setSuccess('OTP đã được gửi, vui lòng kiểm tra email!')

        setTimeout(() => {
          navigate('/otp-verification', { state: { email } }) // ✅ truyền email qua state
        }, 2000)
      }
    } catch (err) {
      setError(err.response?.data || 'Gửi OTP thất bại, thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return { sendResetEmail, loading, error, success }
}
