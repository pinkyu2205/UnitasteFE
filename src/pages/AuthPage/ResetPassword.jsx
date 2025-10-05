import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userApi from '../../api/userApi'
import bg from '../../assets/login-bg.png'
import './CSS/ResetPassword.css'

function ResetPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!email) return

    setLoading(true)
    try {
      const res = await userApi.requestResetPassword({ email })
      setTimeout(() => {
        navigate('/otp-verification', { state: { email } })
        // truyền state thay vì localStorage
      }, 2000)
    } catch (err) {
      console.log(err)
      setError(err.response?.data || 'Gửi OTP thất bại, thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='auth'>
      <img src={bg} alt='background' className='auth__bg' />

      <form className='auth__form' onSubmit={handleSubmit}>
        <h1 className='auth__title'>Quên mật khẩu</h1>

        <div className='auth__inputs'>
          <div className='auth__box'>
            <input
              type='email'
              placeholder='Nhập email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='auth__input'
            />
          </div>
        </div>

        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
        {success && <p className='text-green-500 text-sm mt-2'>{success}</p>}

        <button type='submit' className='auth__button' disabled={loading}>
          {loading ? 'Đang gửi...' : 'Gửi mã OTP'}
        </button>

        <div className='auth__footer'>
          <Link to='/'>Trở về trang đăng nhập</Link>
        </div>
      </form>
    </div>
  )
}

export default ResetPassword
