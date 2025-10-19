// src/pages/Social/component/CreatePost/CreatePost.jsx
import React from 'react';
import './CreatePost.css';

function CreatePost({ onOpenModal }) {
  return (
    <div className="create-post-bar">
      <div className="avatar-placeholder-small"></div>
      <button className="create-post-trigger" onClick={onOpenModal}>
        Bạn muốn review quán nào hôm nay?
      </button>
    </div>
  );
}

export default CreatePost;