import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import SocialApi from '../../../api/socialApi' // Import API
import Post from '../../Social/component/Post/Post' // <-- Tái sử dụng component Post
import '../CSS/MyPosts.css' // File CSS mới

// Helper để lấy UserID
const getUserIdFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  try {
    const decoded = jwtDecode(token)
    const nameIdentifierClaim =
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    const id =
      decoded[nameIdentifierClaim] ||
      decoded.sub ||
      decoded.id ||
      decoded.userId
    const userIdInt = id ? parseInt(id, 10) : null
    return isNaN(userIdInt) ? null : userIdInt
  } catch (e) {
    console.error('Lỗi giải mã token:', e)
    return null
  }
}

const MyPosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMyPosts = async () => {
      const userId = getUserIdFromToken() // Lấy ID của user đang đăng nhập
      if (!userId) {
        setError('Không thể xác thực người dùng.')
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)
      try {
        // Gọi API mới: getPostsByUserId
        // Giả sử API này không cần truyền userId vì nó lấy từ token
        const response = await SocialApi.getPostsByUserId()

        // API của bạn trả về một mảng các bài viết
        setPosts(response || [])
      } catch (err) {
        console.error('Lỗi khi tải bài viết của tôi:', err)
        setError('Không thể tải bài viết của bạn.')
      } finally {
        setLoading(false)
      }
    }

    fetchMyPosts()
  }, []) // Chỉ chạy 1 lần

  if (loading) {
    return <div className='loading-screen'>Đang tải bài viết...</div>
  }

  if (error) {
    return <div className='error-screen'>{error}</div>
  }

  return (
    <div className='my-posts-container'>
      <div className='my-posts-header'>
        <h2>Bài viết của tôi</h2>
        <p>Tổng cộng: {posts.length} bài viết</p>
      </div>

      <div className='my-posts-list'>
        {posts.length === 0 ? (
          <p className='no-posts-message'>Bạn chưa có bài viết nào.</p>
        ) : (
          posts.map((post) => (
            // Tái sử dụng component Post từ trang Social
            <Post key={post.postId} post={post} />
          ))
        )}
      </div>
    </div>
  )
}

export default MyPosts
