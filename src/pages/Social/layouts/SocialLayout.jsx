import { jwtDecode } from 'jwt-decode' // Import jwt-decode
import { useEffect, useState } from 'react' // Import hooks
import SocialApi from '../../../api/socialApi' // Import API của bạn
import Feed from '../component/Feed/Feed'
import LeftSidebar from '../component/LeftSidebar/LeftSidebar'
import RightSidebar from '../component/RightSidebar/RightSidebar'
import './SocialLayout.css'

// Helper function để lấy userId từ token
const getUserIdFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  try {
    const decoded = jwtDecode(token)
    // Thay claim này bằng claim đúng chứa ID user của bạn
    const nameIdentifierClaim =
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    const id =
      decoded[nameIdentifierClaim] ||
      decoded.sub ||
      decoded.id ||
      decoded.userId
    return id ? parseInt(id, 10) : null
  } catch (e) {
    console.error('Lỗi giải mã token:', e)
    return null
  }
}

function SocialLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [userInfo, setUserInfo] = useState(null) // State mới cho thông tin user
  const [loadingUser, setLoadingUser] = useState(true)

  // useEffect để lấy thông tin user khi component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = getUserIdFromToken()
      if (userId) {
        try {
          const profile = await SocialApi.getUserProfile(userId)
          setUserInfo(profile) // Lưu thông tin (fullName, avatarUrl)
        } catch (error) {
          console.error('Lỗi khi lấy profile user cho layout:', error)
        }
      }
      setLoadingUser(false)
    }
    fetchUserData()
  }, []) // Chạy 1 lần

  return (
    <div className='social-layout'>
      <div className='social-layout-sidebar-left'>
        {/* Truyền userInfo và loading state xuống */}
        <LeftSidebar userInfo={userInfo} isLoading={loadingUser} />
      </div>
      <div className='social-layout-main-content'>
        {/* Truyền userInfo và loading state xuống */}
        <Feed userInfo={userInfo} isLoadingUser={loadingUser} />
      </div>
      <div className='social-layout-sidebar-right'>
        <RightSidebar />
      </div>
      {/* Chat components */}
      {/* <ChatIcon onClick={() => setIsChatOpen(!isChatOpen)} /> */}
      {isChatOpen && <ChatList onClose={() => setIsChatOpen(false)} />} */
    </div>
  )
}

export default SocialLayout
