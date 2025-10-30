// src/pages/Social/component/Comment/Comment.jsx
import './Comment.css'

function Comment({ user, text, avatarUrl, createdAt, fullName }) {
  const formatTime = (date) => {
    if (!date) return ''
    try {
      const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
      const now = new Date()
      const diff = Math.floor((now - d) / 1000) // seconds
      
      if (diff < 60) return 'Vừa xong'
      if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`
      if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`
      if (diff < 604800) return `${Math.floor(diff / 86400)} ngày trước`
      return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
    } catch {
      return ''
    }
  }

  const displayName = fullName || user || 'Người dùng'
  const initials = displayName
    .split(' ')
    .map(n => n.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U'

  return (
    <div className='comment-container'>
      {avatarUrl ? (
        <img className='comment-avatar' src={avatarUrl} alt={displayName} />
      ) : (
        <div className='comment-avatar comment-avatar-placeholder'>
          {initials}
        </div>
      )}
      <div className='comment-bubble'>
        <div className='comment-header'>
          <span className='comment-user'>{displayName}</span>
        </div>
        {createdAt && (
          <div className='comment-submeta'>{formatTime(createdAt)}</div>
        )}
        <p className='comment-text'>{text}</p>
      </div>
    </div>
  )
}

export default Comment