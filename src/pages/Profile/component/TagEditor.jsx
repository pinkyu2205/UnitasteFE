import { useState } from 'react'
import '../CSS/TagEditor.css' // File CSS riêng cho component này

/**
 * Component để hiển thị và chỉnh sửa một danh sách các tag (cục cam)
 * @param {string} label - Tiêu đề của mục (ví dụ: "Khu vực bạn muốn đến")
 * @param {string} value - Chuỗi sở thích (ví dụ: "Quận 1,Quận 3,Gò Vấp")
 * @param {function(string):void} onChange - Hàm callback khi giá trị thay đổi, trả về chuỗi mới
 * @param {string} placeholder - Chữ gợi ý cho ô input
 */
const TagEditor = ({ label, value, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState('')

  // Tách chuỗi thành mảng các tag. Lọc bỏ các tag rỗng (nếu có)
  const tags = value ? value.split(',').filter(Boolean) : []

  // Xử lý Xóa tag
  const handleRemoveTag = (tagToRemove) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove)
    onChange(newTags.join(',')) // Gửi chuỗi mới về component cha
  }

  // Xử lý Thêm tag
  const handleAddTag = () => {
    const newTag = inputValue.trim()
    if (newTag && !tags.includes(newTag)) {
      const newTags = [...tags, newTag]
      onChange(newTags.join(',')) // Gửi chuỗi mới về component cha
      setInputValue('') // Xóa nội dung input
    }
  }

  // Xử lý khi bấm Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault() // Ngăn form submit (nếu có)
      handleAddTag()
    }
  }

  return (
    <div className='tag-editor-group'>
      <label>{label}</label>

      {/* Khu vực hiển thị các tag đã chọn */}
      {tags.length > 0 && (
        <div className='selected-tags-area'>
          {tags.map((tag) => (
            <div key={tag} className='selected-tag-item'>
              {tag}
              <button type='button' onClick={() => handleRemoveTag(tag)}>
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Khu vực nhập để thêm tag mới */}
      <div className='custom-input-group'>
        <input
          type='text'
          placeholder={placeholder || 'Nhập và bấm Enter để thêm...'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type='button' onClick={handleAddTag}>
          + Thêm
        </button>
      </div>
    </div>
  )
}

export default TagEditor
