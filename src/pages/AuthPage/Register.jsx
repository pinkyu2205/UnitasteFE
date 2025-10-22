import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import bg from '../../assets/login-bg.png'
import SuccessPopup from '../../components/SuccessPopup'
import useRegister from './component/useRegister'
import './CSS/Register.css'

function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { registerUser, error, success } = useRegister()
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    
    // Kiểm tra mật khẩu khớp nhau
    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp. Vui lòng kiểm tra lại.')
      return
    }
    
    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      alert('Mật khẩu phải có ít nhất 6 ký tự.')
      return
    }
    
    const result = await registerUser({ fullName, email, password, birthDate })

    if (result?.status) {
      // Lưu email vào state khi navigate sang trang nhập OTP
      navigate('/register-verification', { state: { email } })
    }
  }

  return (
    <div className='relative'>
      <div className='auth'>
        <img src={bg} alt='background' className='auth__bg' />

        <form className='auth__form' onSubmit={handleRegister}>
          <h1 className='auth__title'>Đăng ký</h1>

          <div className='auth__inputs'>
            <div className='auth__box'>
              <input
                type='text'
                placeholder='Họ và tên'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className='auth__input'
              />
            </div>
            <div className='auth__box'>
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='auth__input'
              />
            </div>
            <div className='auth__box auth__box--password'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Mật khẩu'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='auth__input'
              />
              <button
                type='button'
                className='auth__password-toggle'
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <div className='auth__box auth__box--password'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Nhập lại mật khẩu'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className='auth__input'
              />
              <button
                type='button'
                className='auth__password-toggle'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <div className='auth__box'>
              <input
                type='date'
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                className='auth__input'
              />
            </div>
          </div>

          {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}

          <button type='submit' className='auth__button'>
            Đăng ký
          </button>

          <div className='auth__footer'>
            Đã có tài khoản? <Link to='/login'>Đăng nhập</Link>
          </div>
        </form>
      </div>

      {success && (
        <SuccessPopup
          message='Đăng ký thành công! Bạn sẽ được chuyển về trang đăng nhập sau'
          duration={2}
          onClose={() => navigate('/login')}
        />
      )}
    </div>
  )
}

export default Register
