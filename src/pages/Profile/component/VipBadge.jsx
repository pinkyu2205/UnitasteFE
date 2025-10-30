import { useEffect, useState } from 'react'
import '../CSS/VipBadge.css'

const VipBadge = ({ inline = false, title = 'Tài khoản đang là thành viên VIP', showText = true, isVip: isVipProp, forceShow = false }) => {
  const [isVip, setIsVip] = useState(() => {
    if (forceShow) return true
    if (typeof isVipProp === 'boolean') return isVipProp
    try {
      return localStorage.getItem('isVip') === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    if (forceShow) {
      setIsVip(true)
      return
    }
    if (typeof isVipProp === 'boolean') {
      setIsVip(isVipProp)
      return
    }

    const sync = () => {
      try {
        setIsVip(localStorage.getItem('isVip') === 'true')
      } catch {
        setIsVip(false)
      }
    }
    const onStorage = (e) => {
      if (e.key === 'isVip') {
        setIsVip(e.newValue === 'true')
      }
    }
    window.addEventListener('storage', onStorage)
    sync()
    return () => {
      window.removeEventListener('storage', onStorage)
    }
  }, [isVipProp, forceShow])

  if (!isVip && !forceShow) return null

  return (
    <div className={`vip-badge ${inline ? 'vip-badge--inline' : ''}`} title={title}>
      <span className='vip-badge__icon'>⭐</span>
      {showText && <span>Thành viên VIP</span>}
    </div>
  )
}

export default VipBadge


