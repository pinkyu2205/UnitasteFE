// ChatWindow.jsx
export default function ChatWindow({
  selectedUser,
  messages,
  message,
  setMessage,
  sendMessage,
}) {
  return (
    <div className='chat'>
      <div className='chat-header'>
        <h3>{selectedUser}</h3>
      </div>
      <div className='chat-messages'>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.user === 'Bạn' ? 'own' : ''}`}
          >
            <div className='bubble'>
              <p>{msg.message}</p>
              <span className='time'>{msg.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className='chat-input'>
        <input
          type='text'
          placeholder='Gửi tin nhắn...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Gửi</button>
      </div>
    </div>
  )
}
