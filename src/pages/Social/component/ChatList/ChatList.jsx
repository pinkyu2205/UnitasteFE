// src/pages/Social/component/ChatList/ChatList.jsx
import './ChatList.css'

function ChatList({ onClose }) {
  return (
    <div className='chat-list-window'>
      <div className='chat-list-header'>
        <h3>Chat</h3>
        <button className='chat-close-btn' onClick={onClose}>
          ×
        </button>
      </div>
      <div className='chat-list-body'>
        {/* Dữ liệu giả */}
        <div className='chat-list-item'>
          <div className='avatar-placeholder-small'></div>
          <span>Bạn bè 1</span>
          <span className='status-dot online'></span>
        </div>
        <div className='chat-list-item'>
          <div className='avatar-placeholder-small'></div>
          <span>Bạn bè 2</span>
          <span className='status-dot offline'></span>
        </div>
        <div className='chat-list-item'>
          <div className='avatar-placeholder-small'></div>
          <span>Bạn bè 3</span>
          <span className='status-dot online'></span>
        </div>
      </div>
    </div>
  )
}

export default ChatList
