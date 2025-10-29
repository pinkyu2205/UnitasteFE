// src/pages/Social/component/Post/Post.jsx
import { useEffect, useState } from 'react' // Add hooks
import { toast } from 'react-toastify'
import SocialApi from '../../../../api/socialApi' // Adjust path
import ReactionBar from '../ReactionBar/ReactionBar'
import './Post.css'

function Post({ post }) {
  const [author, setAuthor] = useState({
    fullName: 'Loading...',
    avatarUrl: null,
  })
  const [commentText, setCommentText] = useState('')
  const [isCommenting, setIsCommenting] = useState(false)
  // You'll need a way to fetch and display actual comments later
  const [comments, setComments] = useState([])
  const [showComments, setShowComments] = useState(false)
  const [loadingComments, setLoadingComments] = useState(false)
  const [commentsError, setCommentsError] = useState(null)
  const [reactionsCount, setReactionsCount] = useState(post.reactionsCount || 0)

  // API đã trả đúng mảng comment đã bóc vỏ -> không cần normalize phức tạp

  // Lấy tên nhà hàng
  const [restaurantName, setRestaurantName] = useState(null)
  // Fetch author details when post data is available
  useEffect(() => {
    if (post.authorUserId) {
      SocialApi.getUserProfile(post.authorUserId)
        .then((profile) => {
          setAuthor({
            fullName: profile.fullName || 'Unknown User',
            avatarUrl: profile.avatarUrl,
          })
        })
        .catch((err) => {
          console.error('Failed to fetch author for post', post.postId, err)
          setAuthor({ fullName: 'Unknown User', avatarUrl: null })
        })
    }
  }, [post.authorUserId, post.postId])

  // Sync reactions count when post changes
  useEffect(() => {
    setReactionsCount(post.reactionsCount || 0)
  }, [post.postId, post.reactionsCount])

  // Format date (can be moved to utils)
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('vi-VN', {
      dateStyle: 'short',
      timeStyle: 'short',
    })
  }

  // Toggle and load comments on demand
  const handleToggleComments = async () => {
    const willShow = !showComments
    setShowComments(willShow)
    if (!willShow) return
    // Load comments when opening
    setLoadingComments(true)
    setCommentsError(null)
    try {
      const result = await SocialApi.getCommentsForPost(post.postId)
      setComments(Array.isArray(result) ? result : [])
    } catch (e) {
      console.error('Failed to load comments:', e)
      setCommentsError('Không thể tải bình luận. Vui lòng thử lại.')
    } finally {
      setLoadingComments(false)
    }
  }

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    if (e.key !== 'Enter') return
    e.preventDefault()
    const text = commentText.trim()
    if (!text) return

    setIsCommenting(true)
    try {
      const response = await SocialApi.createComment(post.postId, text)
      toast.success(response?.message || 'Bình luận thành công!')

      // mở khung bình luận nếu đang đóng để user thấy bình luận
      if (!showComments) setShowComments(true)

      // Thêm ngay bình luận mới vào UI (optimistic)
      const me = {
        commentId:
          response?.data?.commentId ||
          (window.crypto && window.crypto.randomUUID
            ? window.crypto.randomUUID()
            : `temp-${Date.now()}`),
        userId: localStorage.getItem('userId'),
        fullName: localStorage.getItem('fullName') || 'Tôi',
        avatarUrl: localStorage.getItem('avatarUrl'),
        content: text,
        createdAt: new Date().toISOString(),
      }
      setComments((prev) => [me, ...(prev || [])])

      setCommentText('') // xóa input

      // Refetch để đồng bộ với server (an toàn nhưng không bắt buộc)
      try {
        const result = await SocialApi.getCommentsForPost(post.postId)
        setComments(Array.isArray(result) ? result : [])
      } catch (err) {
        // nếu refetch lỗi, vẫn giữ optimistic UI
        console.warn('Refetch comments failed:', err)
      }
    } catch (error) {
      console.error('Failed to post comment:', error)
      toast.error(error?.response?.data?.message || 'Không thể gửi bình luận.')
    } finally {
      setIsCommenting(false)
    }
  }

  // Xử lý nút chỉ đường
  const handleGoogleMapsRedirect = (googlePlaceId) => {
    if (!googlePlaceId) return

    // Cấu trúc link bạn cung cấp
    const mapUrl = `https://www.google.com/maps/place/?q=place_id:${googlePlaceId}`

    // Mở tab mới
    window.open(mapUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className='post-card'>
      {/* Post Header */}
      <div className='post-header'>
        <img
          src={
            author.avatarUrl ||
            `https://ui-avatars.com/api/?name=${author.fullName?.charAt(
              0
            )}&background=random`
          }
          alt={author.fullName}
          className='avatar-placeholder-small' // Reuse class or create new avatar class
        />
        <div className='post-info'>
          <span className='post-user'>{author.fullName}</span>
          <span className='post-meta'>
            {formatDate(post.createdAt)}
            {/* Display location/restaurant if it's a review */}
            {post.isReview && post.title && (
              <>
                {' '}
                • Review tại{' '}
                <span className='post-location'>
                  {post.title} {}
                </span>{' '}
              </>
            )}
            {/* Add visibility icon later */}
          </span>
          {/* Display rating if it's a review */}
          {post.isReview && post.rating > 0 && (
            <div className='post-rating-display'>
              {'⭐'.repeat(post.rating)}
            </div>
          )}
        </div>
        <button className='post-menu'>...</button>{' '}
        {/* Add functionality later */}
      </div>

      {/* Post Content */}
      <div className='post-content'>
        {post.title && !post.isReview && (
          <h3 className='post-title-display'>{post.title}</h3>
        )}
        <p>{post.content}</p>
        {/* Display Media */}
        {post.mediaUrls && post.mediaUrls.length > 0 && (
          <div
            className={`post-media media-count-${Math.min(
              post.mediaUrls.length,
              4
            )}`}
          >
            {post.mediaUrls.slice(0, 4).map(
              (
                url,
                index // Show max 4 previews
              ) => (
                <img key={index} src={url} alt={`post media ${index + 1}`} />
              )
            )}
            {post.mediaUrls.length > 4 && (
              <div className='media-more'>+{post.mediaUrls.length - 4}</div>
            )}
          </div>
        )}
        {/* Display Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className='post-tags'>
            {post.tags.map((tag, index) => (
              <span key={index} className='tag'>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {post.isReview && post.googlePlaceId && (
        <div className='post-directions-bar'>
          <button
            className='directions-btn-google'
            onClick={() => handleGoogleMapsRedirect(post.googlePlaceId)}
          >
            <span className='directions-icon'>📍</span>
            Chỉ đường đến địa điểm này
          </button>
        </div>
      )}
      {/* Post Stats */}
      <div className='post-stats'>
        {/* TODO: Integrate reaction summary API here */}
        <span>{reactionsCount} Thích</span>
        <span>{post.commentsCount} Bình luận</span>
        <span>{post.sharesCount} Chia sẻ</span>
      </div>

      {/* Pass postId to ReactionBar */}
      <ReactionBar
        postId={post.postId}
        onCommentClick={handleToggleComments}
        onReactionChange={(oldType, newType) => {
          // Optimistic adjust total likes: count all reactions as "likes" total
          if (!oldType && newType) {
            setReactionsCount((c) => c + 1)
          } else if (oldType && !newType) {
            setReactionsCount((c) => (c > 0 ? c - 1 : 0))
          }
          // Changing type keeps same count
        }}
      />

      {/* Comment Section */}
      {showComments && (
        <div className='comment-section'>
          {loadingComments && (
            <div className='comments-loading'>Đang tải bình luận...</div>
          )}
          {commentsError && (
            <div className='comments-error'>
              {commentsError}{' '}
              <button className='comments-retry' onClick={handleToggleComments}>
                Thử lại
              </button>
            </div>
          )}
          {comments?.length > 0 ? (
            <div className='comments-list'>
              {comments.map((c) => (
                <div
                  key={c.commentId || `${c.userId}-${c.createdAt}`}
                  className='comment-item'
                >
                  <img
                    src={
                      c.avatarUrl ||
                      `https://ui-avatars.com/api/?name=${(c.fullName || 'U').charAt(0)}&background=random`
                    }
                    alt={c.fullName || 'user'}
                    className='avatar-placeholder-small'
                  />
                  <div className='comment-bubble'>
                    <div className='comment-meta'>
                      <span className='comment-user'>
                        {c.fullName || 'Người dùng'}
                      </span>
                      <span className='comment-time'>
                        {new Date(c.createdAt || Date.now()).toLocaleString(
                          'vi-VN',
                          {
                            dateStyle: 'short',
                            timeStyle: 'short',
                          }
                        )}
                      </span>
                    </div>
                    <div className='comment-text'>{c.content}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='comments-empty'>Chưa có bình luận</div>
          )}

          <div className='comment-input-wrapper'>
            {/* Add current user avatar */}
            <img
              src={
                localStorage.getItem('avatarUrl') ||
                `https://ui-avatars.com/api/?name=${localStorage
                  .getItem('fullName')
                  ?.charAt(0)}&background=random`
              }
              alt='My avatar'
              className='avatar-placeholder-small'
            />
            <input
              type='text'
              className='comment-input'
              placeholder='Viết bình luận...'
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={handleCommentSubmit} // Use onKeyDown for Enter
              disabled={isCommenting}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Post
