import { Loader2, MessageCircle, Send, Trash2, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import './CSS/ChatPopup.css'

const CHAT_HISTORY_KEY = 'unitaste_ai_chat_history'

// Các gợi ý nhanh
const QUICK_SUGGESTIONS = [
  'Đề xuất các món ăn gần tớ',
  'Tìm quán cà phê yên tĩnh để học bài',
  'Gợi ý quán ăn cho gia đình',
]

// Tin nhắn chào mừng mặc định
const createWelcomeMessage = () => ({
  role: 'assistant',
  content: 'Xin chào! Tôi có thể giúp bạn tìm kiếm quán ăn. Bạn muốn tìm gì?',
  timestamp: new Date().toISOString(),
  restaurants: [], // Thêm mảng rỗng
})

/**
 * Tải lịch sử chat từ localStorage
 */
const loadChatHistory = () => {
  try {
    const savedMessages = localStorage.getItem(CHAT_HISTORY_KEY)
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (error) {
    console.error('Lỗi parse lịch sử chat:', error)
    localStorage.removeItem(CHAT_HISTORY_KEY)
  }
  // Trả về mặc định nếu không có gì
  return [createWelcomeMessage()]
}

/**
 * Lưu lịch sử chat vào localStorage
 */
const saveChatHistory = (messages) => {
  try {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages))
  } catch (error) {
    console.error('Lỗi lưu lịch sử chat:', error)
  }
}

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(loadChatHistory) // Chỉ quản lý 1 mảng tin nhắn
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)

  // Tự động cuộn xuống
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // 1. Tự động LƯU và CUỘN khi tin nhắn thay đổi
  useEffect(() => {
    saveChatHistory(messages)
    scrollToBottom()
  }, [messages, scrollToBottom])

  // 2. Tự động cuộn khi mở cửa sổ chat
  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [isOpen, scrollToBottom])

  // 3. Hàm Gửi Tin Nhắn (Bao gồm cả khi bấm gợi ý)
  const handleSendMessage = async (messageContent) => {
    // Nếu không có nội dung (từ input hoặc gợi ý) hoặc đang tải thì không làm gì
    const content = messageContent || inputMessage
    if (!content.trim() || isLoading) return

    const userMessage = {
      role: 'user',
      content: content,
      timestamp: new Date().toISOString(),
    }

    // Cập nhật UI ngay lập tức
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInputMessage('') // Xóa input
    setIsLoading(true)

    try {
      const userId = localStorage.getItem('userId')
      const token = localStorage.getItem('token')

      // --- Lấy vị trí động ---
      let lat = 10.762622 // Vị trí mặc định (dự phòng)
      let lng = 106.660172
      const storedLocation = sessionStorage.getItem('userLocation')
      if (storedLocation) {
        const parsedLocation = JSON.parse(storedLocation)
        lat = parsedLocation.lat
        lng = parsedLocation.lng
      }
      // -------------------------

      const response = await fetch(
        `${
          import.meta.env.VITE_API_GATEWAY
        }/AI/smart-recommend?userId=${userId}&prompt=${encodeURIComponent(
          content // Dùng content đã chuẩn hóa
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
        content: data.answer || 'Xin lỗi, tôi không thể xử lý yêu cầu của bạn.',
        timestamp: new Date().toISOString(),
        restaurants: data.restaurants || [], // <-- LƯU DANH SÁCH NHÀ HÀNG
      }

      setMessages((prev) => [...prev, assistantMessage]) // Thêm tin nhắn của AI
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = {
        role: 'assistant',
        content: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.',
        timestamp: new Date().toISOString(),
        restaurants: [], // Thêm mảng rỗng
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // 4. Hàm xử lý khi bấm nút gợi ý
  const handleSuggestionClick = (suggestion) => {
    if (isLoading) return
    // Đặt tin nhắn vào ô input và gửi ngay lập tức
    // setInputMessage(suggestion); // Không cần set vào input
    handleSendMessage(suggestion) // Gửi trực tiếp
  }

  // 5. Hàm Xóa Chat
  const handleDeleteChat = () => {
    if (
      window.confirm(
        'Bạn có chắc chắn muốn xóa toàn bộ lịch sử trò chuyện này?'
      )
    ) {
      localStorage.removeItem(CHAT_HISTORY_KEY)
      setMessages([createWelcomeMessage()])
      toast.info('Đã xóa lịch sử trò chuyện.')
    }
  }

  // 6. Hàm xử lý bấm Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage() // Gửi tin nhắn từ input
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
            <div className='chat-popup-actions'>
              <button
                onClick={handleDeleteChat}
                className='chat-action-btn delete'
                title='Xóa cuộc trò chuyện này'
              >
                <Trash2 size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className='chat-popup-close'
              >
                <X className='chat-popup-close-icon' />
              </button>
            </div>
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

                  {/* --- HIỂN THỊ DANH SÁCH NHÀ HÀNG --- */}
                  {msg.restaurants && msg.restaurants.length > 0 && (
                    <div className='chat-restaurant-list'>
                      <h4 className='chat-restaurant-title'>Gợi ý cho bạn:</h4>
                      {msg.restaurants.map((restaurant, idx) => (
                        <div
                          key={restaurant.placeId || idx}
                          className='chat-restaurant-item'
                        >
                          <div className='chat-restaurant-info'>
                            <span className='chat-restaurant-name'>
                              {idx + 1}. {restaurant.name}
                            </span>
                            <span className='chat-restaurant-address'>
                              {restaurant.address}
                            </span>
                          </div>
                          {restaurant.mapUrl && (
                            <a
                              href={restaurant.mapUrl}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='chat-directions-btn'
                              title='Xem trên Google Maps'
                            >
                              📍 Chỉ đường
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {/* ------------------------------------ */}

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
            {!isLoading &&
              messages.length <= 1 && ( // Chỉ hiện khi mới bắt đầu chat
                <div className='chat-quick-suggestions'>
                  {QUICK_SUGGESTIONS.map((text, i) => (
                    <button
                      key={i}
                      className='quick-suggestion-btn'
                      onClick={() => handleSuggestionClick(text)}
                    >
                      {text}
                    </button>
                  ))}
                </div>
              )}
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
