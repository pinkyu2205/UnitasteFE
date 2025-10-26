// src/pages/Admin/component/AdminSidebar.jsx

import '../CSS/AdminSidebar.css'
import { ChefHatIcon, LogoutIcon } from './AdminIcons'

const AdminSidebar = ({
  menuItems,
  activeMenu,
  setActiveMenu,
  sidebarOpen,
}) => {
  return (
    <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <div className='sidebar-header'>
        <div className='logo'>
          <span className='logo-icon'>
            <ChefHatIcon size={28} />
          </span>
          {sidebarOpen && <span className='logo-text'>UniTaste Admin</span>}
        </div>
      </div>

      <nav className='sidebar-menu'>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
            onClick={() => setActiveMenu(item.id)}
            title={item.label}
          >
            <span className='menu-icon'>{item.icon}</span>
            {sidebarOpen && <span className='menu-label'>{item.label}</span>}
            {activeMenu === item.id && sidebarOpen && (
              <span className='menu-indicator'>›</span>
            )}
          </button>
        ))}
      </nav>

      <div className='sidebar-footer'>
        <button className='logout-btn' title='Đăng xuất'>
          <span>
            <LogoutIcon size={20} />
          </span>
          {sidebarOpen && <span>Đăng xuất</span>}
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar
