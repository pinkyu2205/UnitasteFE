import React from 'react';
import '../CSS/Footer.css';

const Footer = () => {
  const footerSections = [
    {
      title: 'Về Unitaste',
      links: [
        { text: 'Giới thiệu', href: '#about' },
        { text: 'Đội ngũ', href: '#team' },
        { text: 'Tuyển dụng', href: '#careers' }
      ]
    },
    {
      title: 'Hỗ trợ',
      links: [
        { text: 'Trung tâm trợ giúp', href: '#help' },
        { text: 'Liên hệ', href: '#contact' },
        { text: 'Câu hỏi thường gặp', href: '#faq' }
      ]
    },
    {
      title: 'Pháp lý',
      links: [
        { text: 'Chính sách bảo mật', href: '#privacy' },
        { text: 'Điều khoản sử dụng', href: '#terms' },
        { text: 'Cookie', href: '#cookies' }
      ]
    },
    {
      title: 'Kết nối',
      links: [
        { text: 'Facebook', href: '#facebook' },
        { text: 'Instagram', href: '#instagram' },
        { text: 'Twitter', href: '#twitter' }
      ]
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {footerSections.map((section, index) => (
            <div key={index} className="footer-section">
              <h3>{section.title}</h3>
              <ul>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href}>{link.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Unitaste. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
