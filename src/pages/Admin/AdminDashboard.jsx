// src/pages/Admin/AdminDashboard.jsx

import { useState } from 'react'
import './CSS/AdminDashboard.css'
import AdminSidebar from './component/AdminSidebar'
import DashboardContent from './component/DashboardContent'
import FeedbackManagement from './component/FeedbackManagement'
import LocationHeatmap from './component/LocationHeatmap'
import RecommendationAnalytics from './component/RecommendationAnalytics'
import RestaurantManagement from './component/RestaurantManagement'
import UserManagement from './component/UserManagement'

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const menuItems = [
    { id: 'dashboard', label: 'Tổng Quan', icon: '📊' },
    // { id: 'recommendations', label: 'Phân Tích Gợi Ý', icon: '🎯' },
    { id: 'locations', label: 'Bản Đồ Nhiệt Độ', icon: '🗺️' },
    { id: 'restaurants', label: 'Quản Lý Nhà Hàng', icon: '🍽️' },
    { id: 'users', label: 'Quản Lý User', icon: '👥' },
    // { id: 'feedback', label: 'Feedback & Reviews', icon: '⭐' },
    // { id: 'settings', label: 'Cài Đặt', icon: '⚙️' },
  ]

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardContent />
      case 'recommendations':
        return <RecommendationAnalytics />
      case 'locations':
        return <LocationHeatmap />
      case 'restaurants':
        return <RestaurantManagement />
      case 'users':
        return <UserManagement />
      case 'feedback':
        return <FeedbackManagement />
      default:
        return <DashboardContent />
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
            {sidebarOpen ? '◀' : '▶'}
          </button>
          <div className='header-title'>
            <h1>{menuItems.find((m) => m.id === activeMenu)?.label}</h1>
            <p>FoodFinder - Hệ Thống Đề Xuất Món Ăn Theo Vị Trí</p>
          </div>
          <div className='header-right'>
            <div className='search-box'>
              <input type='text' placeholder='Tìm kiếm...' />
              <span>🔍</span>
            </div>
            <div className='admin-profile'>
              <img src='https://via.placeholder.com/40' alt='Admin' />
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
