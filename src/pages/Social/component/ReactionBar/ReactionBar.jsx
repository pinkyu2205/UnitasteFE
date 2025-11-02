// src/pages/Social/component/ReactionBar/ReactionBar.jsx
import { useEffect, useState } from 'react'
import SocialApi from '../../../../api/socialApi'
import ShareModal from '../ShareModal/ShareModal'
import './ReactionBar.css'

function ReactionBar({ postId, onCommentClick, onReactionChange }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isReacting, setIsReacting] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  // Fetch initial like status for the current user
  useEffect(() => {
    if (!postId) return
    SocialApi.checkUserReaction(postId)
      .then((response) => {
        setIsLiked(response.hasReacted)
      })
      .catch((error) => console.error('Failed to check reaction:', error))
  }, [postId])

  // Handle clicking the like button
  const handleLike = async () => {
    if (isReacting || !postId) return
    setIsReacting(true)

    const oldLiked = isLiked
    const newLiked = !oldLiked
    setIsLiked(newLiked)
    
    // Notify parent for immediate count update
    if (typeof onReactionChange === 'function') {
      try {
        onReactionChange(oldLiked ? 'Like' : null, newLiked ? 'Like' : null)
      } catch {}
    }

    try {
      const apiType = newLiked ? 'LIKE' : null
      await SocialApi.makeReaction(postId, apiType)
    } catch (error) {
      console.error('Failed to make reaction:', error)
      setIsLiked(oldLiked) // Revert on error
      // Revert parent count change on error
      if (typeof onReactionChange === 'function') {
        try {
          onReactionChange(newLiked ? 'Like' : null, oldLiked ? 'Like' : null)
        } catch {}
      }
    } finally {
      setIsReacting(false)
    }
  }

  return (
    <>
      <div className='reaction-bar-container'>
        {/* Like Button */}
        <button
          className={`action-button like-button ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
          disabled={isReacting}
        >
          <svg 
            className='icon-svg heart-icon' 
            viewBox="0 0 24 24" 
            fill={isLiked ? 'currentColor' : 'none'} 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          Thích
        </button>

        {/* Comment Button */}
        <button className='action-button' onClick={onCommentClick}>
          <svg className='icon-svg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12c0 4.418-4.03 8-9 8-1.06 0-2.073-.163-3.01-.463L3 20l1.53-3.06A7.8 7.8 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Bình luận
        </button>

        {/* Share Button */}
        <button
          className='action-button'
          onClick={() => setShowShareModal(true)}
        >
          <svg className='icon-svg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 16V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M7 9l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Chia sẻ
        </button>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal postId={postId} onClose={() => setShowShareModal(false)} />
      )}
    </>
  )
}

export default ReactionBar
