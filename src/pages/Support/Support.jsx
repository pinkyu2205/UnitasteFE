// src/pages/Support/Support.jsx
import { useState } from 'react'
import Header from '../HomePage/components/Header'
import './Support.css'

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'technical',
    message: ''
  })
  const [showNotification, setShowNotification] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supportOptions = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Email hỗ trợ',
      content: 'unitasteplatform@gmail.com',
      subtext: 'Phản hồi trong vòng 24 giờ',
      buttonText: 'Liên hệ',
      buttonLink: 'mailto:unitasteplatform@gmail.com',
      color: '#3b82f6'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 16.92V19.92C22 20.4728 21.5523 20.92 21 20.92H18C7.50659 20.92 0 13.4134 0 2.92V0.92C0 0.367157 0.447715 -0.08 1 -0.08H4C4.55228 -0.08 5 0.367157 5 0.92V5.92C5 6.47229 4.55228 6.92 4 6.92H2C2 12.4429 6.47715 16.92 12 16.92V14.92C12 14.3677 12.4477 13.92 13 13.92H18C18.5523 13.92 19 14.3677 19 14.92V17.92C19 18.4723 18.5523 18.92 18 18.92C21.866 18.92 22 16.92 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.05 5C16.0267 5.19057 16.9244 5.66826 17.6281 6.37194C18.3318 7.07561 18.8095 7.97326 19 8.95M15.05 1C17.0793 1.22544 18.9716 2.13417 20.4162 3.57701C21.8609 5.01984 22.7721 6.91101 23 8.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Hotline',
      content: '(+84) 0865803493',
      subtext: 'Thứ 2 - Thứ 6: 8:00 - 18:00',
      buttonText: 'Liên hệ',
      buttonLink: 'tel:+84865803493',
      color: '#10b981'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Địa chỉ',
      content: 'Tầng 6 - Nhà văn hoá sinh viên, Thủ Đức, Vietnam, Ho Chi Minh City, Vietnam',
      subtext: 'Đại học FPT, Hồ Chí Minh',
      buttonText: 'Xem bản đồ',
      buttonLink: 'https://maps.app.goo.gl/7mwgJog2gwoKXd2U7',
      color: '#ef4444'
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Show success notification
      setShowNotification(true)
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: 'technical',
        message: ''
      })
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowNotification(false)
      }, 3000)
      
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      
      {/* Success Notification */}
      {showNotification && (
        <div className='support-notification'>
          <div className='notification-content'>
            <div className='notification-icon'>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className='notification-text'>
              <h4>Gửi yêu cầu thành công!</h4>
              <p>Chúng tôi đã nhận được yêu cầu hỗ trợ của bạn và sẽ phản hồi trong vòng 24 giờ.</p>
            </div>
          </div>
        </div>
      )}
      
      <div className='support-page'>
      <div className='support-container'>
        {/* Header */}
        <div className='support-header'>
          <h1>Trung tâm hỗ trợ</h1>
          <p className='support-subtitle'>
            Chúng tôi luôn sẵn sàng hỗ trợ bạn trong quá trình sử dụng Unitaste
          </p>
        </div>

        {/* Support Options Grid */}
        <div className='support-grid'>
          {supportOptions.map((option, index) => (
            <div key={index} className='support-card' style={{ '--card-color': option.color }}>
              <div className='support-card-icon'>
                {option.icon}
              </div>
              <h3 className='support-card-title'>{option.title}</h3>
              <p className='support-card-content'>{option.content}</p>
              <p className='support-card-subtext'>{option.subtext}</p>
              <a 
                href={option.buttonLink}
                className='support-card-button'
                target={option.buttonLink.startsWith('http') ? '_blank' : '_self'}
                rel={option.buttonLink.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {option.buttonText}
              </a>
            </div>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className='contact-form-section'>
          <div className='form-header'>
            <h2>Gửi yêu cầu hỗ trợ</h2>
            <p>Điền form bên dưới và chúng tôi sẽ phản hồi trong vòng 24 giờ</p>
          </div>
          
          <form className='contact-form' onSubmit={handleSubmit}>
            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='name'>Họ và tên *</label>
                <input 
                  type='text' 
                  id='name' 
                  name='name' 
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder='Nguyễn Văn A'
                  required 
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email *</label>
                <input 
                  type='email' 
                  id='email' 
                  name='email' 
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='example@email.com'
                  required 
                />
              </div>
            </div>

            <div className='form-group'>
              <label htmlFor='subject'>Chủ đề</label>
              <select 
                id='subject' 
                name='subject'
                value={formData.subject}
                onChange={handleInputChange}
              >
                <option value='technical'>Vấn đề kỹ thuật</option>
                <option value='account'>Tài khoản</option>
                <option value='payment'>Thanh toán</option>
                <option value='feature'>Đề xuất tính năng</option>
                <option value='other'>Khác</option>
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='message'>Nội dung *</label>
              <textarea 
                id='message' 
                name='message' 
                value={formData.message}
                onChange={handleInputChange}
                rows='6'
                placeholder='Mô tả chi tiết vấn đề của bạn...'
                required
              ></textarea>
            </div>

            <button type='submit' className='submit-btn' disabled={isSubmitting}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu'}</span>
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className='support-faq-section'>
          <h2>Câu hỏi thường gặp</h2>
          <div className='faq-grid'>
            <div className='faq-item'>
              <h4>🍽️ Làm thế nào để tìm quán ăn phù hợp?</h4>
              <p>Sử dụng tính năng bản đồ và bộ lọc thông minh của chúng tôi để tìm quán ăn theo vị trí, giá cả và sở thích cá nhân.</p>
            </div>
            <div className='faq-item'>
              <h4>⭐ Cách đánh giá và review quán ăn?</h4>
              <p>Sau khi đăng nhập, bạn có thể đánh giá quán ăn bằng cách nhấn vào quán và chọn "Viết đánh giá".</p>
            </div>
            <div className='faq-item'>
              <h4>🤖 AI Chatbot hoạt động như thế nào?</h4>
              <p>AI của chúng tôi học từ sở thích của bạn và đưa ra gợi ý quán ăn phù hợp dựa trên đánh giá và lịch sử tìm kiếm.</p>
            </div>
            <div className='faq-item'>
              <h4>💎 Lợi ích của tài khoản VIP?</h4>
              <p>Thành viên VIP được sử dụng AI không giới hạn, không quảng cáo, và nhiều tính năng độc quyền khác.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Support

