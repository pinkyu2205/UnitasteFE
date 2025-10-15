import { Loader2, MessageCircle, Send, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import './CSS/ChatPopup.css'

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Xin chào! Tôi có thể giúp bạn tìm kiếm quán ăn gần đây. Bạn muốn tìm gì?',
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const userId = localStorage.getItem('userId')
      const token = localStorage.getItem('token')

      // Giả sử bạn có lat, lng từ vị trí hiện tại
      const lat = 10.762622 // Vị trí mặc định (TP.HCM)
      const lng = 106.660172

      const response = await fetch(
        `${
          import.meta.env.VITE_API_GATEWAY
        }/AI/smart-recommend?userId=${userId}&prompt=${encodeURIComponent(
          inputMessage
        )}&lat=${lat}&lng=${lng}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) throw new Error('Lỗi khi gọi API')

      const data = await response.json()

      const assistantMessage = {
        role: 'assistant',
        content:
          data.answer ||
          'Xin lỗi, tôi không thể xử lý yêu cầu của bạn lúc này.',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = {
        role: 'assistant',
        content: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className='chat-popup-container'>
      {/* Chat Button */}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className='chat-popup-button'>
          <MessageCircle className='chat-popup-icon' />
          <span className='chat-popup-badge'>AI</span>
          <div className='chat-popup-ping'></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className='chat-popup-window'>
          {/* Header */}
          <div className='chat-popup-header'>
            <div className='chat-popup-header-bg'></div>
            <div className='chat-popup-header-content'>
              <div className='chat-popup-avatar-wrapper'>
                <div className='chat-popup-avatar'>
                  <MessageCircle className='chat-popup-avatar-icon' />
                </div>
                <span className='chat-popup-status'></span>
              </div>
              <div>
                <h3 className='chat-popup-title'>AI Assistant</h3>
                <p className='chat-popup-subtitle'>Luôn sẵn sàng hỗ trợ</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className='chat-popup-close'
            >
              <X className='chat-popup-close-icon' />
            </button>
          </div>

          {/* Messages Container */}
          <div ref={chatContainerRef} className='chat-popup-messages'>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-popup-message ${
                  msg.role === 'user'
                    ? 'chat-popup-message-user'
                    : 'chat-popup-message-assistant'
                }`}
              >
                <div
                  className={`chat-popup-message-bubble ${
                    msg.role === 'user'
                      ? 'chat-popup-bubble-user'
                      : 'chat-popup-bubble-assistant'
                  }`}
                >
                  <p className='chat-popup-message-text'>{msg.content}</p>
                  <span
                    className={`chat-popup-message-time ${
                      msg.role === 'user'
                        ? 'chat-popup-time-user'
                        : 'chat-popup-time-assistant'
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className='chat-popup-message chat-popup-message-assistant'>
                <div className='chat-popup-message-bubble chat-popup-bubble-assistant'>
                  <div className='chat-popup-loading'>
                    <Loader2 className='chat-popup-loading-icon' />
                    <span className='chat-popup-loading-text'>
                      Đang suy nghĩ...
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className='chat-popup-input-wrapper'>
            <div className='chat-popup-input-container'>
              <div className='chat-popup-textarea-wrapper'>
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder='Nhập tin nhắn...'
                  className='chat-popup-textarea'
                  rows='1'
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className='chat-popup-send-button'
              >
                {isLoading ? (
                  <Loader2 className='chat-popup-send-icon chat-popup-send-loading' />
                ) : (
                  <Send className='chat-popup-send-icon' />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatPopup
