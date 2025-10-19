// src/pages/Social/component/Feed/Feed.jsx
import { useCallback, useRef, useState } from 'react'
import CreatePost from '../CreatePost/CreatePost'
import CreatePostModal from '../CreatePostModal/CreatePostModal'
import Post from '../Post/Post'
import './Feed.css'

// Dữ liệu giả
const getInitialPosts = () => [
  {
    id: 1,
    user: 'User A',
    location: 'Quán Ăn 1',
    content: 'Review 1... Rất ngon!',
    likes: 5,
    comments: 2,
  },
  {
    id: 2,
    user: 'User B',
    location: 'Quán Ăn 2',
    content: 'Review 2... Tạm ổn.',
    likes: 10,
    comments: 4,
  },
  {
    id: 3,
    user: 'User C',
    location: 'Quán Ăn 3',
    content: 'Review 3... Sẽ quay lại!',
    likes: 15,
    comments: 6,
  },
]

function Feed() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [posts, setPosts] = useState(getInitialPosts())
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  // Infinite Scroll Logic
  const observer = useRef()
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts()
        }
      })

      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  const loadMorePosts = () => {
    setLoading(true)
    // Giả lập API call
    setTimeout(() => {
      const newPosts = [
        {
          id: posts.length + 1,
          user: `User ${posts.length + 1}`,
          location: 'Quán Mới',
          content: 'Nội dung review mới...',
          likes: 0,
          comments: 0,
        },
        {
          id: posts.length + 2,
          user: `User ${posts.length + 2}`,
          location: 'Quán Mới 2',
          content: 'Nội dung review mới 2...',
          likes: 1,
          comments: 0,
        },
      ]
      setPosts((prevPosts) => [...prevPosts, ...newPosts])

      // Giả sử chỉ có 10 bài
      if (posts.length >= 10) {
        setHasMore(false)
      }
      setLoading(false)
    }, 1500)
  }

  return (
    <div className='feed-container'>
      {/* Thanh tạo bài đăng */}
      <CreatePost onOpenModal={() => setIsModalOpen(true)} />

      {/* Modal tạo bài đăng */}
      {isModalOpen && <CreatePostModal onClose={() => setIsModalOpen(false)} />}

      {/* Danh sách bài đăng */}
      <div className='post-list'>
        {posts.map((post, index) => {
          if (posts.length === index + 1) {
            // Gán ref cho phần tử cuối cùng
            return (
              <div ref={lastPostElementRef} key={post.id}>
                <Post post={post} />
              </div>
            )
          } else {
            return <Post key={post.id} post={post} />
          }
        })}
      </div>

      {/* Hiệu ứng loading "lung linh" */}
      {loading && (
        <div className='loading-spinner'>
          <div className='spinner'></div>
          <span>Đang tải thêm...</span>
        </div>
      )}
      {!hasMore && <div className='feed-end'>Hết bài đăng rồi!</div>}
    </div>
  )
}

export default Feed
