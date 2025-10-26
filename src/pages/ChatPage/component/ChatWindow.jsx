import { useEffect, useRef } from 'react'

export default function ChatWindow({
  selectedUser,
  messages,
  message,
  setMessage,
  sendMessage,
  connection,
  currentUser,
  typingUser,
}) {
  const messagesEndRef = useRef(null)

  // ✅ Auto scroll xuống cuối khi có tin nhắn mới
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, typingUser]) // chạy mỗi khi tin nhắn hoặc typing thay đổi

  // ✅ Tìm index tin nhắn cuối cùng do "Bạn" gửi
  const lastOwnIndex = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].user === 'Bạn') return i
    }
    return -1
  })()

  return (
    <div className='chat'>
      <div className='chat-header'>
        <h3>{selectedUser || 'Chưa chọn người chat'}</h3>
      </div>

      <div className='chat-messages'>
        {messages.length === 0 ? (
          <p className='no-messages'>Chưa có tin nhắn nào.</p>
        ) : (
          messages.map((msg, idx) => {
            const isOwn = msg.user === 'Bạn'
            const isLastOwnSeen = isOwn && msg.seen && idx === lastOwnIndex

            return (
              <div key={idx} className={`message ${isOwn ? 'own' : ''}`}>
                <div className='bubble'>
                  <p>{msg.message}</p>
                  <span className='time'>
                    {msg.time}{' '}
                    {isOwn && msg.seen && (
                      <span className='seen-check'>✓✓</span>
                    )}
                  </span>
                </div>

                {/* ✅ chỉ hiện “Đã xem” dưới tin cuối cùng của mình */}
                {isLastOwnSeen && (
                  <div className='seen-text'>
                    <span>Đã xem</span>
                  </div>
                )}
              </div>
            )
          })
        )}

        {/* Hiện “đang nhập...” */}
        {typingUser === selectedUser && (
          <div className='typing-indicator'>
            <div className='typing-dots'>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {/* 👇 điểm neo cuộn xuống cuối */}
        <div ref={messagesEndRef} />
      </div>

      <div className='chat-input'>
        <input
          type='text'
          placeholder='Gửi tin nhắn...'
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
            if (connection && selectedUser) {
              connection.invoke('UserTyping', currentUser, selectedUser)
              clearTimeout(window.typingTimeout)
              window.typingTimeout = setTimeout(() => {
                connection.invoke('UserStopTyping', currentUser, selectedUser)
              }, 1500)
            }
          }}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Gửi</button>
      </div>
    </div>
  )
}
