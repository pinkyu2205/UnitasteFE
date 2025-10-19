// src/pages/Social/component/CreatePostModal/CreatePostModal.jsx
import './CreatePostModal.css'

function CreatePostModal({ onClose }) {
  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h2>Tạo bài đăng review</h2>
          <button className='close-button' onClick={onClose}>
            ×
          </button>
        </div>

        <div className='modal-body'>
          <textarea
            className='post-textarea'
            placeholder='Viết review của bạn ở đây...'
          ></textarea>
        </div>

        <div className='modal-toolbar'>
          <span>Thêm vào bài đăng:</span>
          <div className='tool-icons'>
            <button className='tool-icon' title='Đính kèm hình ảnh'>
              🖼️
            </button>
            <button className='tool-icon' title='Tag địa điểm'>
              📍
            </button>
            <button className='tool-icon' title='Emoji'>
              😀
            </button>
            <button className='tool-icon' title='Mention bạn bè'>
              @
            </button>
            <button className='tool-icon' title='GIF'>
              GIF
            </button>
          </div>
        </div>

        <div className='modal-footer'>
          <button className='post-submit-button'>Đăng</button>
        </div>
      </div>
    </div>
  )
}

export default CreatePostModal
