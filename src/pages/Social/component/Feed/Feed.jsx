// src/pages/Social/component/Feed/Feed.jsx
import { useCallback, useEffect, useRef, useState } from 'react' // Add useEffect
import SocialApi from '../../../../api/socialApi' // Adjust path
import CreatePost from '../CreatePost/CreatePost'
import CreatePostModal from '../CreatePostModal/CreatePostModal'
import Post from '../Post/Post'
import './Feed.css'

function Feed() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true) // Track initial load

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
    [loading, hasMore] // Depend on loading and hasMore
  )

  // Function to load posts (used initially and for infinite scroll)
  const loadPosts = async (page) => {
    setLoading(true)
    try {
      const response = await SocialApi.getAllPosts(page, 5) // Fetch 5 per page
      setPosts((prevPosts) =>
        page === 1 ? response.items : [...prevPosts, ...response.items]
      )
      setTotalPages(response.totalPages)
      setCurrentPage(response.page)
      setHasMore(response.page < response.totalPages)
    } catch (error) {
      console.error('Failed to load posts:', error)
      // Handle error display if needed
    } finally {
      setLoading(false)
      if (page === 1) setInitialLoad(false) // Mark initial load complete
    }
  }

  // Initial load
  useEffect(() => {
    loadPosts(1)
  }, []) // Empty dependency array means run once on mount

  // Load more function for IntersectionObserver
  const loadMorePosts = () => {
    if (currentPage < totalPages) {
      loadPosts(currentPage + 1)
    }
  }

  // Function to add a newly created post to the top
  const handlePostCreated = (newPost) => {
    // Thêm bài mới lên đầu và loại bỏ trùng theo postId để tránh hiển thị 2 lần
    setPosts((prevPosts) => [
      newPost,
      ...prevPosts.filter((p) => p.postId !== newPost.postId),
    ])
    // Nếu muốn chắc chắn đồng bộ, có thể gọi loadPosts(1) ở đây
    // loadPosts(1)
  }

  return (
    <div className='feed-container'>
      <CreatePost onOpenModal={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <CreatePostModal
          onClose={() => setIsModalOpen(false)}
          onPostCreated={handlePostCreated} // Pass callback
        />
      )}

      <div className='post-list'>
        {/* Display message if initial load is done and no posts */}
        {!initialLoad && posts.length === 0 && !loading && (
          <div className='feed-empty'>Chưa có bài đăng nào.</div>
        )}

        {posts.map((post, index) => {
          // Attach ref to the last element
          if (posts.length === index + 1) {
            return (
              <div ref={lastPostElementRef} key={post.postId}>
                <Post post={post} />
              </div>
            )
          } else {
            return <Post key={post.postId} post={post} />
          }
        })}
      </div>

      {loading && (
        <div className='loading-spinner'>
          <div className='spinner'></div>
          <span>Đang tải thêm...</span>
        </div>
      )}
      {!loading && !hasMore && posts.length > 0 && (
        <div className='feed-end'>Hết bài đăng rồi!</div>
      )}
    </div>
  )
}

export default Feed
