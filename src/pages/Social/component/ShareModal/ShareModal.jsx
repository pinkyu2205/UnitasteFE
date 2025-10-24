// src/pages/Social/component/ShareModal/ShareModal.jsx
import { useState } from 'react'
import { toast } from 'react-toastify'
import SocialApi from '../../../../api/socialApi' // Adjust path
import './ShareModal.css' // Create this CSS file

function ShareModal({ postId, onClose }) {
  const [shareComment, setShareComment] = useState('')
  const [loading, setLoading] = useState(false)

  const handleShare = async () => {
    if (loading || !postId) return
    setLoading(true)
    try {
      const response = await SocialApi.sharePost(postId, shareComment)
      toast.success(response.message || 'Chia sẻ thành công!')
      onClose() // Close modal on success
    } catch (error) {
      console.error('Failed to share post:', error)
      // Check for specific "already shared" error message if backend sends it clearly
      if (
        error.response?.status === 500 &&
        error.response?.data?.message?.includes('already shared')
      ) {
        toast.warn('Bạn đã chia sẻ bài viết này rồi.')
      } else {
        toast.error(error.response?.data?.message || 'Chia sẻ thất bại.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div
        className='modal-content share-modal-content'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='modal-header'>
          <h2>Chia sẻ bài viết</h2>
          <button className='close-button' onClick={onClose} disabled={loading}>
            ×
          </button>
        </div>
        <div className='modal-body'>
          <textarea
            className='share-comment-textarea'
            placeholder='Thêm bình luận của bạn (không bắt buộc)...'
            value={shareComment}
            onChange={(e) => setShareComment(e.target.value)}
            disabled={loading}
          />
          {/* Optional: Preview of the original post could go here */}
        </div>
        <div className='modal-footer'>
          <button
            className='share-submit-button'
            onClick={handleShare}
            disabled={loading}
          >
            {loading ? 'Đang chia sẻ...' : 'Chia sẻ ngay'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShareModal
