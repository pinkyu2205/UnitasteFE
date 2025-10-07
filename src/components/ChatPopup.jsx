import { useEffect, useRef, useState } from 'react'
import AIChatApi from '../api/GeminiApi'
// ⚠️ Điều chỉnh đường dẫn này

// 💡 IMPORT FILE CSS MỚI
import './ChatPopup.css'

// Icon cơ bản
const ChatIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' />
  </svg>
)

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendPrompt = async () => {
    if (!input.trim() || loading) return

    const userMessage = { sender: 'user', text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const result = await AIChatApi.getAIResponse(input)
      const aiResponseText =
        result.data.response || 'Xin lỗi, tôi không hiểu câu hỏi của bạn.'
      const aiMessage = { sender: 'ai', text: aiResponseText }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('Lỗi khi gọi API AI:', error)
      const errorMessage = {
        sender: 'ai',
        text: 'Lỗi: Không thể kết nối với dịch vụ AI.',
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    // Sử dụng className="chat-container"
    <div className='chat-container'>
      {/* 1. Cửa sổ Chat */}
      {isOpen && (
        // Sử dụng className="chat-popup"
        <div className='chat-popup'>
          <div className='chat-header'>
            <span>Trợ lý AI</span>
            {/* Sử dụng className="chat-close-button" */}
            <button
              onClick={() => setIsOpen(false)}
              className='chat-close-button'
            >
              X
            </button>
          </div>
          {/* Sử dụng className="chat-messages-container" */}
          <div className='chat-messages-container'>
            {messages.length === 0 && (
              <p className='chat-welcome-message'>
                Chào mừng! Hãy hỏi tôi bất cứ điều gì về bản đồ, nhà hàng, hoặc
                các chủ đề khác.
              </p>
            )}
            {messages.map((msg, index) => (
              // Sử dụng className động dựa trên người gửi
              <div
                key={index}
                className={
                  msg.sender === 'user'
                    ? 'chat-user-message'
                    : 'chat-ai-message'
                }
              >
                <strong>{msg.sender === 'user' ? 'Bạn' : 'AI'}:</strong>{' '}
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
            {loading && <div className='chat-loading'>AI đang nhập...</div>}
          </div>
          {/* Sử dụng className="chat-input-area" */}
          <div className='chat-input-area'>
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSendPrompt()
              }}
              placeholder='Nhập câu hỏi...'
              disabled={loading}
              className='chat-input-field'
            />
            <button
              onClick={handleSendPrompt}
              disabled={loading || !input.trim()}
              className='chat-send-button'
            >
              Gửi
            </button>
          </div>
        </div>
      )}

      {/* 2. Nút Bật/Tắt */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='chat-toggle-button'
        aria-label={isOpen ? 'Đóng Chat' : 'Mở Chat'}
      >
        <ChatIcon />
      </button>
    </div>
  )
}

export default ChatPopup
