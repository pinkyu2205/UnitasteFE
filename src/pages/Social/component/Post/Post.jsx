// src/pages/Social/component/Post/Post.jsx
import Comment from '../Comment/Comment'
import ReactionBar from '../ReactionBar/ReactionBar'
import './Post.css'

function Post({ post }) {
  return (
    <div className='post-card'>
      {/* Post Header */}
      <div className='post-header'>
        <div className='avatar-placeholder-small'></div>
        <div className='post-info'>
          <span className='post-user'>{post.user}</span>
          <span className='post-meta'>
            đã review tại <span className='post-location'>{post.location}</span>
          </span>
        </div>
        <button className='post-menu'>...</button>
      </div>

      {/* Post Content */}
      <div className='post-content'>
        <p>{post.content}</p>
        {/* Placeholder cho hình ảnh */}
        {/* <img src="image-url" alt="Review image" className="post-image" /> */}
      </div>

      {/* Post Stats */}
      <div className='post-stats'>
        <span>{post.likes} Lượt thích</span>
        <span>{post.comments} Bình luận</span>
      </div>

      {/* Post Actions (Reaction Bar) */}
      <ReactionBar />

      {/* Comment Section */}
      <div className='comment-section'>
        {/* Hiển thị vài comment */}
        <Comment user='User 1' text='Đồng ý, quán này ngon!' />
        {/* Input để comment */}
        <div className='comment-input-wrapper'>
          <div className='avatar-placeholder-small'></div>
          <input
            type='text'
            className='comment-input'
            placeholder='Viết bình luận...'
          />
        </div>
      </div>
    </div>
  )
}

export default Post
