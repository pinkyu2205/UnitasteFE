// src/pages/Social/component/ReactionBar/ReactionBar.jsx
import { useEffect, useState } from 'react' // Add hooks
import SocialApi from '../../../../api/socialApi' // Adjust path
import ShareModal from '../ShareModal/ShareModal' // Import ShareModal
import './ReactionBar.css'

const REACTION_TYPES = ['Like', 'Love', 'Haha', 'Wow', 'Sad', 'Angry'] // Order matters for display
// Sử dụng emoji sát thực + sẽ được style thành huy hiệu tròn như các MXH
const REACTION_ICONS = {
  Like: '👍',
  Love: '❤️',
  Haha: '😆',
  Wow: '😮',
  Sad: '😢',
  Angry: '😠',
  Default: '👍',
}

function ReactionBar({ postId, onCommentClick, onReactionChange }) {
  // Receive postId
  const [currentUserReaction, setCurrentUserReaction] = useState(null) // 'Like', 'Love', etc. or null
  const [isReacting, setIsReacting] = useState(false) // Loading state for reaction
  const [showShareModal, setShowShareModal] = useState(false)
  // TODO: Add state and fetch for reaction summary (counts) if needed here

  // Fetch initial reaction status for the current user
  useEffect(() => {
    if (!postId) return
    SocialApi.checkUserReaction(postId)
      .then((response) => {
        if (response.hasReacted) {
          setCurrentUserReaction(response.reactionType)
        } else {
          setCurrentUserReaction(null)
        }
      })
      .catch((error) => console.error('Failed to check reaction:', error))
  }, [postId])

  // Handle clicking a reaction icon (including removing reaction)
  const handleReaction = async (reactionType) => {
    if (isReacting || !postId) return
    setIsReacting(true)

    const oldReaction = currentUserReaction
    // Optimistic update: Toggle reaction or change it
    const newReaction = oldReaction === reactionType ? null : reactionType
    setCurrentUserReaction(newReaction)
    // Notify parent for immediate count update
    if (typeof onReactionChange === 'function') {
      try {
        onReactionChange(oldReaction, newReaction)
      } catch {}
    }

    try {
      // Chuẩn hóa tên reaction cho API (backend thường dùng UPPERCASE)
      const apiType = newReaction ? String(newReaction).toUpperCase() : null
      await SocialApi.makeReaction(postId, apiType) // Pass null/'' to remove
      // Optionally refetch counts or update based on response if needed
    } catch (error) {
      console.error('Failed to make reaction:', error)
      setCurrentUserReaction(oldReaction) // Revert on error
      // Revert parent count change on error
      if (typeof onReactionChange === 'function') {
        try {
          onReactionChange(newReaction, oldReaction)
        } catch {}
      }
      // Show error toast?
    } finally {
      setIsReacting(false)
    }
  }

  // Determine current button text/icon
  const currentReactionIcon =
    REACTION_ICONS[currentUserReaction] || REACTION_ICONS.Default
  const currentReactionText = currentUserReaction || 'Thích' // Text for the main button

  return (
    <>
      <div className='reaction-bar-container'>
        {/* Reaction Popup (shown on hover/long press of Like button) */}

        {/* Main Like/React Button */}
        <button
          className={`action-button reaction-trigger ${
            currentUserReaction ? 'reacted' : ''
          } ${currentUserReaction ? currentUserReaction.toLowerCase() : ''}`}
          onClick={() => handleReaction('Like')} // Click nút chính: luôn là LIKE (toggle sẽ xử lý trong handleReaction)
          disabled={isReacting}
          onMouseEnter={() => {
            /* Consider logic for popup on hover */
          }}
          onMouseLeave={() => {
            /* Consider logic for popup on hover */
          }}
        >
          <svg className='icon-svg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 9V5a3 3 0 10-6 0v7H5a2 2 0 00-2 2v4a2 2 0 002 2h8.764a3 3 0 002.916-2.163l1.53-5.355A2 2 0 0016.298 10H14z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>{' '}
          {currentReactionText}
        </button>

        <div className='reaction-popup'>
          {REACTION_TYPES.map((type) => (
            <span
              key={type}
              className={`reaction-icon badge ${
                currentUserReaction === type ? 'active' : ''
              }`}
              onClick={() => handleReaction(type)}
              title={type}
            >
              {REACTION_ICONS[type]}
            </span>
          ))}
        </div>

        {/* Comment Button (focus input in Post.jsx - needs different approach like refs or context) */}
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
