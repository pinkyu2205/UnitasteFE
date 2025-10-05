import { useState } from 'react'
import { Link } from 'react-router-dom'
import bg from '../../assets/login-bg.png'
import './CSS/OtpVerification.css'
import useOtpVerification from './component/useOtpVerification'

function OtpVerification() {
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { verifyAndResetPassword, resendOtp, loading, error, success } =
    useOtpVerification()

  const handleVerify = (e) => {
    e.preventDefault()
    if (otp && newPassword && confirmPassword) {
      verifyAndResetPassword(otp, newPassword, confirmPassword)
    }
  }

  return (
    <div className='auth'>
      <img src={bg} alt='background' className='auth__bg' />

      <form className='auth__form'>
        <h1 className='auth__title'>Xác thực OTP & Đặt lại mật khẩu</h1>

        <div className='auth__inputs'>
          <div className='auth__box'>
            <input
              type='text'
              placeholder='Nhập OTP'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className='auth__input'
            />
          </div>
          <div className='auth__box'>
            <input
              type='password'
              placeholder='Mật khẩu mới'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className='auth__input'
            />
          </div>
          <div className='auth__box'>
            <input
              type='password'
              placeholder='Xác nhận mật khẩu mới'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className='auth__input'
            />
          </div>
        </div>

        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
        {success && <p className='text-green-500 text-sm mt-2'>{success}</p>}

        <button
          type='submit'
          onClick={handleVerify}
          className='auth__button'
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : 'Xác nhận'}
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

export default OtpVerification
