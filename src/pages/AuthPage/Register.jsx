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
  const [birthDate, setBirthDate] = useState('')

  const { registerUser, error, success } = useRegister()
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
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
          <h1 className='auth__title'>Register</h1>

          <div className='auth__inputs'>
            <div className='auth__box'>
              <input
                type='text'
                placeholder='Full Name'
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
            <div className='auth__box'>
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='auth__input'
              />
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
            Register
          </button>

          <div className='auth__footer'>
            Already have an account? <Link to='/'>Login</Link>
          </div>
        </form>
      </div>

      {success && (
        <SuccessPopup
          message='Bạn sẽ được chuyển về trang đăng nhập sau'
          duration={2}
          onClose={() => navigate('/')}
        />
      )}
    </div>
  )
}

export default Register
