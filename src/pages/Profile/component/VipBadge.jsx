import '../CSS/VipBadge.css'

const VipBadge = ({ inline = false, title = 'Tài khoản đang là thành viên VIP', showText = true }) => {
  return (
    <div className={`vip-badge ${inline ? 'vip-badge--inline' : ''}`} title={title}>
      <span className='vip-badge__icon'>⭐</span>
      {showText && <span>Thành viên VIP</span>}
    </div>
  )
}

export default VipBadge


