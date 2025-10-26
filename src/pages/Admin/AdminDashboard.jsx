// src/pages/Admin/AdminDashboard.jsx

import { useState } from 'react'
import './CSS/AdminDashboard.css'
import AdminSidebar from './component/AdminSidebar'
import DashboardContent from './component/DashboardContent'
import ReviewManagement from './component/ReviewManagement'
import TransactionManagement from './component/TransactionManagement'
import { DashboardIcon, StarIcon } from './component/AdminIcons'

const TransactionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
)

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const menuItems = [
    { id: 'dashboard', label: 'Tổng Quan', icon: <DashboardIcon size={20} /> },
    {
      id: 'transactions',
      label: 'Quản Lý Giao Dịch',
      icon: <TransactionIcon />,
    },
    {
      id: 'reviews',
      label: 'Quản Lý Đánh Giá',
      icon: <StarIcon size={20} />,
    },
  ]

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardContent setActiveMenu={setActiveMenu} />
      case 'transactions':
        return <TransactionManagement />
      case 'reviews':
        return <ReviewManagement />
      default:
        return <DashboardContent setActiveMenu={setActiveMenu} />
    }
  }

  return (
    <div className='admin-container'>
      <AdminSidebar
        menuItems={menuItems}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className={`admin-main ${sidebarOpen ? 'expanded' : 'collapsed'}`}>
        <div className='admin-header'>
          <button
            className='toggle-sidebar-btn'
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className='header-title'>
            <h1>{menuItems.find((m) => m.id === activeMenu)?.label}</h1>
            <p>Hệ thống quản lý UniTaste</p>
          </div>
          <div className='header-right'>
            <div className='search-box'>
              <svg className='search-icon' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input type='text' placeholder='Tìm kiếm...' />
            </div>
            <div className='admin-profile'>
              <div className='profile-avatar'>A</div>
              <span>Admin</span>
            </div>
          </div>
        </div>

        <div className='admin-content'>{renderContent()}</div>
      </div>
    </div>
  )
}

export default AdminDashboard
