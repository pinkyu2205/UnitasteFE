// src/pages/ChatPage/component/EmojiPicker/EmojiPicker.jsx
import EmojiPicker from 'emoji-picker-react' // Thư viện emoji chuẩn
import { useState } from 'react'
import '../../CSS/EmojiPicker.css'
import { stickerPacks } from './stickerData' // Dữ liệu sticker custom

export default function CustomEmojiPicker({ onSelectEmoji, onSelectSticker }) {
  const [activeTab, setActiveTab] = useState('sticker') // Mặc định mở sticker
  const [activePack, setActivePack] = useState(stickerPacks[0].id) // Gói đầu tiên

  const currentPack = stickerPacks.find((pack) => pack.id === activePack)

  return (
    <div className='emoji-picker-container'>
      {/* 1. Phần nội dung (Tab Content) */}
      <div className='picker-content'>
        {activeTab === 'emoji' && (
          <div className='emoji-tab-content'>
            <EmojiPicker
              onEmojiClick={(emojiData) => onSelectEmoji(emojiData.emoji)}
              width='100%'
              height={350}
              searchDisabled
              previewConfig={{ showPreview: false }}
            />
          </div>
        )}

        {activeTab === 'sticker' && (
          <div className='sticker-tab-content'>
            <div className='sticker-grid'>
              {currentPack.stickers.map((sticker) => (
                <button
                  key={sticker.id}
                  className='sticker-item'
                  onClick={() => onSelectSticker(sticker.url)}
                >
                  <img src={sticker.url} alt={sticker.id} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. Phần Footer (Chọn Gói Sticker) */}
      {activeTab === 'sticker' && (
        <div className='sticker-pack-footer'>
          {stickerPacks.map((pack) => (
            <button
              key={pack.id}
              className={`pack-icon ${pack.id === activePack ? 'active' : ''}`}
              onClick={() => setActivePack(pack.id)}
            >
              <img src={pack.icon} alt={pack.name} />
            </button>
          ))}
        </div>
      )}

      {/* 3. Phần Header (Chọn Tab) */}
      <div className='picker-header'>
        <button
          className={activeTab === 'sticker' ? 'active' : ''}
          onClick={() => setActiveTab('sticker')}
        >
          Sticker
        </button>
        <button
          className={activeTab === 'emoji' ? 'active' : ''}
          onClick={() => setActiveTab('emoji')}
        >
          Emoji
        </button>
      </div>
    </div>
  )
}
