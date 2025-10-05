import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import bg from '../../assets/login-bg.png'
import './CSS/OtpVerification.css'
import useRegisterVerification from './component/useRegisterVerification'
function RegisterVerification() {
  const [otp, setOtp] = useState('')
  const location = useLocation()
  const email = location.state?.email // ✅ lấy email từ state khi navigate từ Register

  const { verifyOtp, resendOtp, loading, error, success } =
    useRegisterVerification()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) {
      alert('Không tìm thấy email để xác minh!')
      return
    }
    verifyOtp(email, otp)
  }

  return (
    <div className='auth'>
      <img src={bg} alt='background' className='auth__bg' />

      <form className='auth__form' onSubmit={handleSubmit}>
        <h1 className='auth__title'>Xác minh đăng ký</h1>

        <div className='auth__inputs'>
          <div className='auth__box'>
            <input
              type='text'
              placeholder='Nhập mã OTP'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className='auth__input'
            />
          </div>
        </div>

        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
        {success && <p className='text-green-500 text-sm mt-2'>{success}</p>}

        <button type='submit' className='auth__button' disabled={loading}>
          {loading ? 'Đang xử lý...' : 'Xác minh'}
        </button>

        <div className='auth__footer'>
          <button
            type='button'
            onClick={() => resendOtp(email)}
            className='text-blue-500 underline'
            disabled={loading}
          >
            Gửi lại OTP
          </button>
          <br />
          <Link to='/'>Trở về trang đăng nhập</Link>
        </div>
      </form>
    </div>
  )
}

export default RegisterVerification
