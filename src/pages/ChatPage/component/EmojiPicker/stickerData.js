// src/pages/ChatPage/component/EmojiPicker/stickerData.js

// Bạn có thể thêm bao nhiêu gói tùy thích vào mảng này
export const stickerPacks = [
  {
    id: 'memes',
    name: 'Meme Custom',
    // Icon đại diện cho gói, hiển thị ở thanh dưới
    icon: '/stickers/cat-cry-thumbsup.png',
    stickers: [
      { id: 'cry', url: '/stickers/cry.gif' },
      { id: 'cry-thumb', url: '/stickers/cat-cry-thumbsup.png' },
      { id: 'cat-jam', url: '/stickers/cat-jam.gif' },
      { id: 'cat-kiss', url: '/stickers/cat-kiss.gif' },
      { id: 'cat-bite', url: '/stickers/cat-bitting.gif' },
      { id: 'cat-sus', url: '/stickers/cat-sus.png' },
      { id: 'plink', url: '/stickers/plink.gif' },
      { id: 'voices', url: '/stickers/voices.gif' },
      { id: 'jigglin', url: '/stickers/jigglin.gif' },
    ],
  },
  {
    id: 'quynh-aka',
    name: 'Quỳnh Aka (Demo)',
    // Lấy tạm 1 hình làm icon
    icon: '/stickers/cat-jam.gif',
    stickers: [
      // Giả sử bạn có các sticker này
      { id: 'q1', url: '/stickers/plink.gif' },
      { id: 'q2', url: '/stickers/cat-sus.png' },
    ],
  },
  // Thêm gói khác ở đây...
]
