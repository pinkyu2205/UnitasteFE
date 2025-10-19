// src/pages/Social/component/Comment/Comment.jsx
import './Comment.css'

function Comment({ user, text }) {
  return (
    <div className='comment-container'>
      <div className='avatar-placeholder-small'></div>
      <div className='comment-content'>
        <span className='comment-user'>{user}</span>
        <p className='comment-text'>{text}</p>
      </div>
    </div>
  )
}

export default Comment
