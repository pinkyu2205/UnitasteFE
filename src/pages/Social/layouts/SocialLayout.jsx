// src/pages/Social/layouts/SocialLayout.jsx
import { useState } from 'react'
import ChatIcon from '../component/ChatIcon/ChatIcon'
import ChatList from '../component/ChatList/ChatList'
import Feed from '../component/Feed/Feed'
import LeftSidebar from '../component/LeftSidebar/LeftSidebar'
import './SocialLayout.css'

function SocialLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className='social-layout'>
      <div className='social-layout-sidebar-left'>
        <LeftSidebar />
      </div>

      <div className='social-layout-main-content'>
        <Feed />
      </div>

      {/* Cột phải có thể để trống hoặc thêm component sau */}
      <div className='social-layout-sidebar-right'>
        {/* Ví dụ: có thể thêm danh sách bạn bè, sự kiện... */}
      </div>

      {/* Chat components */}
      <ChatIcon onClick={() => setIsChatOpen(!isChatOpen)} />
      {isChatOpen && <ChatList onClose={() => setIsChatOpen(false)} />}
    </div>
  )
}

export default SocialLayout
