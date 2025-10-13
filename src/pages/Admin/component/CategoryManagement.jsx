// src/pages/Admin/component/CategoryManagement.jsx

import { useState } from 'react'
import '../CSS/components/Admin/CSS/CategoryManagement.css'

const CategoryManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Phở',
      description: 'Canh phở nóng',
      icon: '🍲',
      itemCount: 156,
      status: 'active',
    },
    {
      id: 2,
      name: 'Bánh mì',
      description: 'Bánh mì ngon',
      icon: '🥖',
      itemCount: 89,
      status: 'active',
    },
    {
      id: 3,
      name: 'Cơm tấm',
      description: 'Cơm tấm sài gòn',
      icon: '🍚',
      itemCount: 234,
      status: 'active',
    },
    {
      id: 4,
      name: 'Cà phê',
      description: 'Cà phê đen, cà phê sữa',
      icon: '☕',
      itemCount: 127,
      status: 'active',
    },
  ])

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '🍽️',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddCategory = () => {
    if (!formData.name.trim()) return

    const newCategory = {
      id: Math.max(...categories.map((c) => c.id), 0) + 1,
      ...formData,
      itemCount: 0,
      status: 'active',
    }

    setCategories([...categories, newCategory])
    setFormData({ name: '', description: '', icon: '🍽️' })
    setShowAddForm(false)
  }

  const handleDeleteCategory = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa category này?')) {
      setCategories(categories.filter((c) => c.id !== id))
    }
  }

  const handleToggleStatus = (id) => {
    setCategories(
      categories.map((c) =>
        c.id === id
          ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' }
          : c
      )
    )
  }

  return (
    <div className='category-management'>
      <div className='management-header'>
        <div className='header-info'>
          <h2>Quản Lý Category</h2>
          <p>Tổng cộng: {categories.length} category</p>
        </div>
        <button
          className='btn-add-category'
          onClick={() => setShowAddForm(!showAddForm)}
        >
          + Thêm Category
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className='add-form-container'>
          <div className='form-card'>
            <h3>Tạo Category Mới</h3>
            <div className='form-group'>
              <label>Icon</label>
              <div className='icon-input'>
                <input
                  type='text'
                  name='icon'
                  value={formData.icon}
                  onChange={handleInputChange}
                  maxLength='2'
                  className='icon-field'
                />
                <div className='icon-preview'>{formData.icon}</div>
              </div>
            </div>

            <div className='form-group'>
              <label>Tên Category</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                placeholder='Nhập tên category...'
                className='form-input'
              />
            </div>

            <div className='form-group'>
              <label>Mô Tả</label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleInputChange}
                placeholder='Nhập mô tả...'
                className='form-textarea'
                rows='3'
              />
            </div>

            <div className='form-actions'>
              <button
                className='btn-cancel'
                onClick={() => setShowAddForm(false)}
              >
                Hủy
              </button>
              <button className='btn-submit' onClick={handleAddCategory}>
                Tạo Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      <div className='categories-grid'>
        {categories.map((category) => (
          <div key={category.id} className={`category-card ${category.status}`}>
            <div className='category-icon'>{category.icon}</div>
            <div className='category-info'>
              <h4>{category.name}</h4>
              <p className='description'>{category.description}</p>
              <div className='category-stats'>
                <span className='item-count'>
                  📦 {category.itemCount} món ăn
                </span>
                <span className={`status-badge ${category.status}`}>
                  {category.status === 'active' ? '🟢' : '🔴'}{' '}
                  {category.status === 'active'
                    ? 'Hoạt động'
                    : 'Không hoạt động'}
                </span>
              </div>
            </div>
            <div className='category-actions'>
              <button
                className='btn-icon edit'
                onClick={() => setEditingId(category.id)}
              >
                ✏️
              </button>
              <button
                className={`btn-icon toggle ${category.status}`}
                onClick={() => handleToggleStatus(category.id)}
              >
                {category.status === 'active' ? '🔒' : '🔓'}
              </button>
              <button
                className='btn-icon delete'
                onClick={() => handleDeleteCategory(category.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryManagement
