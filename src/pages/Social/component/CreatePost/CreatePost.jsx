import './CreatePost.css'

// Nhận props từ Feed
function CreatePost({ onOpenModal, userInfo, isLoadingUser }) {
  // Lấy avatar, cung cấp giá trị dự phòng
  const avatarUrl =
    userInfo?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${
      userInfo?.fullName?.charAt(0) || 'U'
    }&background=random`

  return (
    <div className='create-post-bar'>
      {/* Thay thế div bằng img */}
      {isLoadingUser ? (
        <div className='avatar-placeholder-small'></div> // Hiển thị placeholder khi đang tải
      ) : (
        <img
          src={avatarUrl}
          alt='Avatar'
          className='avatar-placeholder-small' // Giữ class cũ để CSS hoạt động
        />
      )}
      <button className='create-post-trigger' onClick={onOpenModal}>
        Bạn muốn review quán nào hôm nay?
      </button>
    </div>
  )
}

export default CreatePost
