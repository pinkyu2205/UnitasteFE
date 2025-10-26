// src/pages/About/About.jsx
import { useNavigate } from 'react-router-dom'
import Header from '../HomePage/components/Header'
import unitasteLogo from '../../assets/Unitaste-logo.png'
import food2Image from '../../assets/food2.png'
import './About.css'

const About = () => {
  const navigate = useNavigate()

  const stats = [
    { number: '10,000+', label: 'Người dùng' },
    { number: '5,000+', label: 'Quán ăn' },
    { number: '50,000+', label: 'Đánh giá' },
    { number: '4.8/5', label: 'Đánh giá trung bình' }
  ]

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Tìm kiếm thông minh',
      description: 'Khám phá hàng ngàn quán ăn xung quanh bạn với công nghệ bản đồ và tìm kiếm tiên tiến.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Đánh giá chân thực',
      description: 'Đọc và chia sẻ những đánh giá trung thực từ cộng đồng yêu ẩm thực.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'AI Chatbot',
      description: 'Trợ lý AI thông minh giúp bạn tìm kiếm và gợi ý món ăn phù hợp với sở thích.'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Cộng đồng sôi động',
      description: 'Kết nối với những người yêu thích ẩm thực và chia sẻ trải nghiệm của bạn.'
    }
  ]

  return (
    <>
      <Header />
      <div className='about-page'>
        <div className='about-container'>
          {/* Hero Section */}
          <div className='about-hero'>
            <div className='hero-icon'>
              <img src={unitasteLogo} alt='Unitaste Logo' />
            </div>
            <h1>Về Unitaste</h1>
            <p className='hero-subtitle'>
              Nền tảng khám phá ẩm thực hàng đầu dành cho sinh viên và cộng đồng yêu thích món ăn
            </p>
          </div>

          {/* Stats Section */}
          <div className='stats-grid'>
            {stats.map((stat, index) => (
              <div key={index} className='stat-card'>
                <div className='stat-number'>{stat.number}</div>
                <div className='stat-label'>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mission & Vision */}
          <div className='mission-vision-section'>
            <div className='mission-card'>
              <div className='card-icon'>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Sứ mệnh</h3>
              <p>
                Kết nối người dùng với những trải nghiệm ẩm thực tuyệt vời nhất xung quanh họ. 
                Chúng tôi tin rằng mỗi bữa ăn đều có thể trở thành một kỷ niệm đáng nhớ khi bạn 
                tìm đúng nơi và đúng món ăn.
              </p>
            </div>
            <div className='vision-card'>
              <div className='card-icon'>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Tầm nhìn</h3>
              <p>
                Trở thành nền tảng khám phá ẩm thực số 1 tại Việt Nam, nơi mọi người có thể 
                tìm thấy, chia sẻ và kết nối thông qua tình yêu với món ăn. Chúng tôi hướng tới 
                một cộng đồng ẩm thực lớn mạnh và gắn kết.
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div className='features-section'>
            <h2>Tính năng nổi bật</h2>
            <div className='features-grid'>
              {features.map((feature, index) => (
                <div key={index} className='feature-card'>
                  <div className='feature-icon'>
                    {feature.icon}
                  </div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Story Section */}
          <div className='story-section'>
            <h2>Câu chuyện của chúng tôi</h2>
            <div className='story-content'>
              <div className='story-text'>
                <p>
                  Unitaste được ra đời từ câu chuyện của những sinh viên yêu thích khám phá ẩm thực. 
                  Chúng tôi nhận thấy rằng việc tìm kiếm một quán ăn ngon, phù hợp với túi tiền và 
                  sở thích cá nhân không phải lúc nào cũng dễ dàng.
                </p>
                <p>
                  Với mong muốn giải quyết vấn đề này, chúng tôi đã xây dựng Unitaste - một nền tảng 
                  kết hợp công nghệ AI, bản đồ thông minh và cộng đồng đánh giá chân thực để mang đến 
                  trải nghiệm tìm kiếm ẩm thực tốt nhất.
                </p>
                <p>
                  Hơn cả một ứng dụng tìm kiếm, Unitaste là một cộng đồng nơi những người yêu thích 
                  ẩm thực có thể kết nối, chia sẻ và cùng nhau khám phá những món ăn mới mẻ.
                </p>
              </div>
              <div className='story-image'>
                <img src={food2Image} alt='Unitaste Food Experience' className='story-food-image' />
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className='about-cta'>
            <h2>Sẵn sàng khám phá?</h2>
            <p>Tham gia cộng đồng Unitaste ngay hôm nay và bắt đầu hành trình ẩm thực của bạn!</p>
            <div className='cta-buttons'>
              <button className='cta-primary' onClick={() => navigate('/register')}>
                Đăng ký ngay
              </button>
              <button className='cta-secondary' onClick={() => navigate('/map')}>
                Khám phá quán ăn
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About

