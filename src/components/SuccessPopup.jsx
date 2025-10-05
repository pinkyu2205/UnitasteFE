import { useEffect, useState } from 'react'

const SuccessPopup = ({ message, duration = 3, onClose }) => {
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
    <div className='fixed inset-0 flex items-center justify-center bg-black/50'>
      <div className='bg-white p-6 rounded-2xl shadow-xl text-center max-w-sm'>
        <h2 className='text-lg font-semibold text-green-600 mb-2'>
          Đăng ký thành công!
        </h2>
        <p className='text-gray-700'>
          {message} ({countdown}s)
        </p>
      </div>
    </div>
  )
}

export default SuccessPopup
