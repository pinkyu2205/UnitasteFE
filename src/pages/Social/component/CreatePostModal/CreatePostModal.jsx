// src/pages/Social/component/CreatePostModal/CreatePostModal.jsx
import { useEffect, useRef, useState } from 'react' // Import React, hooks
import { toast } from 'react-toastify'
import RestaurantsApi from '../../../../api/restaurantApi' // Adjust path
import SocialApi from '../../../../api/socialApi' // Adjust path
import './CreatePostModal.css'

const VISIBILITY_OPTIONS = ['Công khai', 'Bạn bè', 'Chỉ mình tôi']
const TAG_OPTIONS = ['cafe', 'restaurant'] // Predefined tags

const getUserIdFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  try {
    // Basic decoding, assumes JWT structure. Use jwt-decode library for robustness
    const decoded = JSON.parse(atob(token.split('.')[1]))
    const claim =
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    const id = decoded[claim] || decoded.sub || decoded.id || decoded.userId
    // Ensure it's parsed as integer if your backend expects it
    const userIdInt = id ? parseInt(id, 10) : null
    return isNaN(userIdInt) ? null : userIdInt
  } catch (e) {
    console.error('Lỗi giải mã token trong CreatePostModal:', e)
    return null
  }
}

function CreatePostModal({ onClose, onPostCreated }) {
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(0) // 0 means no rating
  const [isReview, setIsReview] = useState(false)
  const [visibility, setVisibility] = useState(VISIBILITY_OPTIONS[0])
  const [mediaFiles, setMediaFiles] = useState([]) // Store File objects
  const [mediaPreviews, setMediaPreviews] = useState([]) // Store preview URLs
  const [tags, setTags] = useState([])
  const [restaurantId, setRestaurantId] = useState(null) // Selected restaurant ID
  const [restaurantsList, setRestaurantsList] = useState([]) // List for dropdown
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null) // Ref for file input

  // Fetch restaurants for dropdown
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Fetch a reasonable number, maybe first 50-100 simple restaurants
        const response = await RestaurantsApi.getAllSimpleRestaurants(1, 100)
        setRestaurantsList(response.items || [])
      } catch (error) {
        console.error('Failed to fetch restaurants for post modal:', error)
      }
    }
    fetchRestaurants()
  }, [])

  // Handle file selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files)
    setMediaFiles((prev) => [...prev, ...files])

    // Generate previews
    const newPreviews = files.map((file) => URL.createObjectURL(file))
    setMediaPreviews((prev) => [...prev, ...newPreviews])
  }

  // Remove a selected file/preview
  const removeMedia = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index))
    setMediaPreviews((prev) => {
      const urlToRemove = prev[index]
      URL.revokeObjectURL(urlToRemove) // Clean up blob URL
      return prev.filter((_, i) => i !== index)
    })
    // Reset file input value if needed to allow re-selection of the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Handle tag selection/deselection
  const handleTagToggle = (tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!content.trim() && mediaFiles.length === 0) {
      toast.error('Vui lòng nhập nội dung hoặc thêm ảnh/video.')
      return
    }
    setLoading(true)

    const formData = new FormData()
    formData.append('content', content)
    // Append optional fields only if they have a value or are required
    // formData.append('title', ''); // Title is optional, send empty if needed by API
    if (restaurantId) formData.append('restaurantId', restaurantId)
    if (rating > 0) formData.append('rating', rating) // Send rating only if selected
    formData.append('isReview', isReview)
    formData.append('visibility', visibility) // Send selected visibility
    tags.forEach((tag) => formData.append('tags', tag))
    mediaFiles.forEach((file) => formData.append('mediaFiles', file))

    try {
      const response = await SocialApi.createPost(formData)
      toast.success(response.message || 'Tạo bài viết thành công!')
      if (onPostCreated) {
        const currentUserId = getUserIdFromToken() // <-- Now this function exists
        if (currentUserId) {
          // Only create the basic post if we have the user ID
          const basicNewPost = {
            postId: response.postId,
            authorUserId: currentUserId, // Use the fetched ID
            content: content,
            createdAt: new Date().toISOString(),
            mediaUrls: mediaPreviews,
            tags: tags,
            reactionsCount: 0,
            commentsCount: 0,
            sharesCount: 0,
          }
          onPostCreated(basicNewPost)
        } else {
          // Optionally, still call onPostCreated but maybe signal to Feed to refetch instead
          console.warn(
            'Could not get user ID after post creation for immediate update.'
          )
          // onPostCreated(null); // Or pass null/undefined
        }
      }
      onClose()
    } catch (error) {
      console.error('Failed to create post:', error)
      toast.error(error.response?.data?.message || 'Tạo bài viết thất bại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className='modal-header'>
            <h2>Tạo bài đăng</h2>
            <button
              type='button'
              className='close-button'
              onClick={onClose}
              disabled={loading}
            >
              ×
            </button>
          </div>

          <div className='modal-body'>
            <textarea
              className='post-textarea'
              placeholder='Bạn muốn review quán nào hôm nay?'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
            />
            {/* Image Previews */}
            <div className='media-previews'>
              {mediaPreviews.map((previewUrl, index) => (
                <div key={index} className='media-preview-item'>
                  <img src={previewUrl} alt={`preview ${index}`} />
                  <button
                    type='button'
                    onClick={() => removeMedia(index)}
                    disabled={loading}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Additional Fields */}
            <div className='post-options'>
              <div className='option-group'>
                <label>Đây là bài review?</label>
                <label className='switch'>
                  <input
                    type='checkbox'
                    checked={isReview}
                    onChange={(e) => setIsReview(e.target.checked)}
                    disabled={loading}
                  />
                  <span className='slider round'></span>
                </label>
              </div>

              {isReview && ( // Only show rating and restaurant if it's a review
                <>
                  <div className='option-group'>
                    <label htmlFor='restaurantSelect'>Chọn nhà hàng:</label>
                    <select
                      id='restaurantSelect'
                      value={restaurantId || ''}
                      onChange={(e) =>
                        setRestaurantId(
                          e.target.value ? parseInt(e.target.value) : null
                        )
                      }
                      disabled={loading}
                    >
                      <option value=''>
                        -- Chọn nhà hàng (không bắt buộc) --
                      </option>
                      {restaurantsList.map((r) => (
                        <option key={r.restaurantId} value={r.restaurantId}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='option-group rating-group'>
                    <label>Đánh giá:</label>
                    <div className='star-rating-input'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={
                            star <= rating ? 'star-filled' : 'star-empty'
                          }
                          onClick={() => !loading && setRating(star)}
                        >
                          ★
                        </span>
                      ))}
                      {rating > 0 && (
                        <button
                          type='button'
                          className='clear-rating'
                          onClick={() => setRating(0)}
                          disabled={loading}
                        >
                          Xóa
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className='option-group'>
                <label htmlFor='visibilitySelect'>Ai có thể thấy?</label>
                <select
                  id='visibilitySelect'
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                  disabled={loading}
                >
                  {VISIBILITY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className='option-group'>
                <label>Tags:</label>
                <div className='tag-selection'>
                  {TAG_OPTIONS.map((tag) => (
                    <button
                      type='button'
                      key={tag}
                      className={`tag-btn ${
                        tags.includes(tag) ? 'active' : ''
                      }`}
                      onClick={() => handleTagToggle(tag)}
                      disabled={loading}
                    >
                      {tag === 'cafe' ? 'Cà phê ☕' : 'Nhà hàng 🍽️'}
                    </button>
                  ))}
                  {/* Add input for custom tags if needed */}
                </div>
              </div>
            </div>
          </div>

          <div className='modal-toolbar'>
            <span>Thêm vào bài đăng:</span>
            <div className='tool-icons'>
              <button
                type='button'
                className='tool-icon'
                title='Đính kèm hình ảnh'
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
              >
                🖼️
              </button>
              {/* Hidden file input */}
              <input
                type='file'
                multiple
                accept='image/*,video/*'
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              {/* Add functionality to other icons later */}
              {/* <button type='button' className='tool-icon' title='Tag địa điểm'>📍</button> */}
              {/* <button type='button' className='tool-icon' title='Emoji'>😀</button> */}
            </div>
          </div>

          <div className='modal-footer'>
            <button
              type='submit'
              className='post-submit-button'
              disabled={loading}
            >
              {loading ? 'Đang đăng...' : 'Đăng'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePostModal
