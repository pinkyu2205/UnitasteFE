import { useEffect, useState } from 'react'
import './Shortcuts.css' // File CSS mới

// Dữ liệu giả cho lối tắt
const getMockShortcuts = () => [
  {
    id: 1,
    name: 'Katinat Kha Vạn Cân',
    type: 'place',
    imageUrl: 'https://placehold.co/100x100/f26522/white?text=K',
  },
  {
    id: 2,
    name: 'Review Ẩm Thực Sài Gòn',
    type: 'group',
    imageUrl: 'https://placehold.co/100x100/e63946/white?text=R',
  },
  {
    id: 3,
    name: 'Hội Săn Voucher',
    type: 'group',
    imageUrl: 'https://placehold.co/100x100/2a9d8f/white?text=V',
  },
  {
    id: 4,
    name: 'Bamos Coffee',
    type: 'place',
    imageUrl: 'https://placehold.co/100x100/f4a261/white?text=B',
  },
]

function Shortcuts() {
  const [shortcuts, setShortcuts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Giả lập gọi API
    setLoading(true)
    const timer = setTimeout(() => {
      setShortcuts(getMockShortcuts())
      setLoading(false)
    }, 700) // Giả lập độ trễ mạng
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className='sidebar-widget-left'>
        <h4 className='widget-title-left'>Lối tắt của bạn</h4>
        <p className='widget-loading-text'>Đang tải...</p>
      </div>
    )
  }

  if (shortcuts.length === 0) {
    return null // Không hiển thị gì nếu không có lối tắt
  }

  return (
    <div className='sidebar-widget-left'>
      <h4 className='widget-title-left'>Lối tắt của bạn</h4>
      <div className='shortcut-list'>
        {shortcuts.map((item) => (
          <a href='#' key={item.id} className='shortcut-item'>
            <img
              src={
                item.imageUrl || 'https://placehold.co/100x100/ccc/white?text=?'
              }
              alt={item.name}
              className='shortcut-image'
            />
            <span className='shortcut-name'>{item.name}</span>
          </a>
        ))}
        <button className='shortcut-item more-btn'>
          <span className='shortcut-icon'>▼</span>
          <span className='shortcut-name'>Xem thêm</span>
        </button>
      </div>
    </div>
  )
}

export default Shortcuts
