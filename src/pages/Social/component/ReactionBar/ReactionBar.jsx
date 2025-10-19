// src/pages/Social/component/ReactionBar/ReactionBar.jsx
import './ReactionBar.css'

function ReactionBar() {
  return (
    <div className='reaction-bar-container'>
      <div className='reaction-popup'>
        <span className='reaction-icon'>👍</span>
        <span className='reaction-icon'>❤️</span>
        <span className='reaction-icon'>😂</span>
        <span className='reaction-icon'>😮</span>
        <span className='reaction-icon'>😢</span>
        <span className='reaction-icon'>😡</span>
      </div>
      <button className='action-button'>
        <span className='icon'>👍</span> Thích
      </button>
      <button className='action-button'>
        <span className='icon'>💬</span> Bình luận
      </button>
      <button className='action-button'>
        <span className='icon'>↪️</span> Chia sẻ
      </button>
    </div>
  )
}

export default ReactionBar
