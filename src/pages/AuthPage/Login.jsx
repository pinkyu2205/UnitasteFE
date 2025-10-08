import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import bg from '../../assets/login-bg.png'
import './CSS/Login.css'
import { LoginAPI } from './component/LoginAPI'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const token = await LoginAPI(email, password)
      if (token) {
        localStorage.setItem('token', token)
        navigate('/map')
      } else {
        setError('Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.')
      }
    } catch (err) {
      setError(err.message || 'Đã xảy ra lỗi trong quá trình đăng nhập.')
    }
  }
  return (
    <div className='auth'>
      <img src={bg} alt='background' className='auth__bg' />

      <form className='auth__form' onSubmit={handleSubmit}>
        <h1 className='auth__title'>Đăng nhập</h1>

        <div className='auth__inputs'>
          <div className='auth__box'>
            <input
              type='email'
              placeholder='Email'
              required
              className='auth__input'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='auth__box'>
            <input
              type='password'
              placeholder='Mật khẩu'
              required
              className='auth__input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && <p className='auth__error'>{error}</p>}

        <button type='submit' className='auth__button'>
          Đăng nhập
        </button>

        <div className='auth__footer'>
          <Link to='/reset-password'>Quên mật khẩu?</Link>
          <br />
          Bạn chưa có tài khoản? <Link to='/register'>Đăng kí ngay</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
