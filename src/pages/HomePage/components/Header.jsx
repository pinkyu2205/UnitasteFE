import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="homepage-header">
      <div className="logo">
        <img src="/src/assets/Unitaste-logo.png" alt="Unitaste Logo" />
      </div>
      <nav>
        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Trang chủ</Link></li>
          <li><Link to="/map" onClick={() => setIsMobileMenuOpen(false)}>Bản đồ</Link></li>
          <li><Link to="/social" onClick={() => setIsMobileMenuOpen(false)}>Cộng đồng</Link></li>
          <li><Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>Hồ sơ</Link></li>
        </ul>
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>
    </header>
  );
};

export default Header;
