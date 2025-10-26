import '../CSS/Footer.css'

const Footer = () => {
  const footerSections = [
    {
      title: 'Về Unitaste',
      links: [
        { 
          text: 'Giới thiệu', 
          href: '/about'
        },
      ],
    },
    {
      title: 'Hỗ trợ',
      links: [
        { text: 'Trung tâm trợ giúp', href: '/support' },
        { text: 'Liên hệ', href: 'mailto:unitasteplatform@gmail.com' },
        { text: 'Câu hỏi thường gặp', href: '/support' },
      ],
    },
    {
      title: 'Pháp lý',
      links: [
        { text: 'Chính sách bảo mật', href: '#privacy' },
        { text: 'Điều khoản sử dụng', href: '#terms' },
        { text: 'Cookie', href: '#cookies' },
      ],
    },
    {
      title: 'Kết nối',
      links: [
        {
          text: 'Facebook',
          href: 'https://www.facebook.com/profile.php?id=61581366073185&locale=vi_VN',
          target: '_blank',
        },
        { text: 'TikTok', href: 'https://www.tiktok.com/@unitasteplatform' },
      ],
    },
  ]

  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-content'>
          {footerSections.map((section, index) => (
            <div key={index} className='footer-section'>
              <h3>{section.title}</h3>
              <ul>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      target={link.target || '_self'}
                      rel={
                        link.target === '_blank'
                          ? 'noopener noreferrer'
                          : undefined
                      }
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className='footer-bottom'>
          <p>&copy; 2025 Unitaste. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
