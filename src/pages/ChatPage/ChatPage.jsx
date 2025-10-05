import './CSS/ChatPage.css'

export default function Chat() {
  return (
    <div className='chat-container'>
      {/* Sidebar */}
      <div className='sidebar'>
        <h2>Messages</h2>
        <div className='user'>
          <img src='https://via.placeholder.com/40' alt='User' />
          <span>Ipad Pro/Air5,6/Mini</span>
        </div>
        <div className='user'>
          <img src='https://via.placeholder.com/40' alt='User' />
          <span>NDTTX</span>
        </div>
        <div className='user'>
          <img src='https://via.placeholder.com/40' alt='User' />
          <span>Eber Martinez</span>
        </div>
      </div>

      {/* Chat */}
      <div className='chat'>
        <div className='chat-header'>
          <h3>Eber Martinez</h3>
        </div>
        <div className='chat-messages'>
          <div className='message'>
            <p>[This message type isn’t supported.]</p>
            <span className='time'>07:11</span>
          </div>
        </div>
        <div className='chat-input'>
          <input type='text' placeholder='Send a message...' />
          <button>Send</button>
        </div>
      </div>
    </div>
  )
}
