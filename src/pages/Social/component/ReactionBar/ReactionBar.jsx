// src/pages/Social/component/ReactionBar/ReactionBar.jsx
import { useEffect, useState } from 'react' // Add hooks
import SocialApi from '../../../../api/socialApi' // Adjust path
import ShareModal from '../ShareModal/ShareModal' // Import ShareModal
import './ReactionBar.css'

const REACTION_TYPES = ['Like', 'Love', 'Haha', 'Wow', 'Sad', 'Angry'] // Order matters for display
const REACTION_ICONS = {
  // Map types to icons
  Like: '👍',
  Love: '❤️',
  Haha: '😂',
  Wow: '😮',
  Sad: '😢',
  Angry: '😡',
  Default: '👍', // Default icon
}

function ReactionBar({ postId }) {
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

    try {
      await SocialApi.makeReaction(postId, newReaction) // Pass null to remove
      // Optionally refetch counts or update based on response if needed
    } catch (error) {
      console.error('Failed to make reaction:', error)
      setCurrentUserReaction(oldReaction) // Revert on error
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
          onClick={() => handleReaction(currentUserReaction ? null : 'Like')} // Click toggles Like or removes current reaction
          disabled={isReacting}
          onMouseEnter={() => {
            /* Consider logic for popup on hover */
          }}
          onMouseLeave={() => {
            /* Consider logic for popup on hover */
          }}
        >
          <span className='icon'>{currentReactionIcon}</span>{' '}
          {currentReactionText}
        </button>

        <div className='reaction-popup'>
          {REACTION_TYPES.map((type) => (
            <span
              key={type}
              className={`reaction-icon ${
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
        <button className='action-button'>
          <span className='icon'>💬</span> Bình luận
        </button>

        {/* Share Button */}
        <button
          className='action-button'
          onClick={() => setShowShareModal(true)}
        >
          <span className='icon'>↪️</span> Chia sẻ
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
