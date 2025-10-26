import { useEffect, useState } from 'react'
import './CSS/SuccessPopup.css'

const SuccessPopup = ({ 
  message, 
  duration = 3, 
  onClose,
  title = '✅ Thành công!' 
}) => {
  const [countdown, setCountdown] = useState(duration)

  useEffect(() => {
    if (countdown <= 0) {
      if (onClose) onClose()
      return
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, onClose])

  return (
    <div className='success-popup-overlay'>
      <div className='success-popup-card'>
        <div className='success-popup-icon'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <circle cx='12' cy='12' r='10'></circle>
            <path d='M9 12l2 2 4-4'></path>
          </svg>
        </div>
        
        <h2 className='success-popup-title'>{title}</h2>
        
        <p className='success-popup-message'>
          {message}
        </p>
        
        <div className='success-popup-countdown'>
          <span className='countdown-number'>{countdown}</span>s
        </div>
      </div>
    </div>
  )
}

export default SuccessPopup
