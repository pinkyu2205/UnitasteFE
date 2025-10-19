// src/pages/Social/component/ChatIcon/ChatIcon.jsx
import './ChatIcon.css'

function ChatIcon({ onClick }) {
  return (
    <button className='chat-icon-button' onClick={onClick} title='Mở Chat'>
      💬
    </button>
  )
}

export default ChatIcon
