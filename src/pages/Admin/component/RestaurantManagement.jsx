// src/pages/Admin/component/RestaurantManagement.jsx

import { useState } from 'react'
import '../CSS/RestaurantManagement.css'

const RestaurantManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: 'Phở Gia Truyền',
      address: '123 Đ. Hoàng Diệu 2, Linh Trung',
      phone: '028 7303 7466',
      email: 'info@phogia.com',
      website: 'http://katinat.vn/',
      category: 'Phở',
      rating: 3.7,
      reviewCount: 245,
      avatar: 'https://via.placeholder.com/60',
      status: 'active',
      district: 'Quận 1',
      openingHours: '07:00 - 22:30',
      owner: 'Nguyễn Văn A',
      dishes: 24,
      orders: 1250,
      revenue: 45200000,
      joinDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Bánh Mì Ơi',
      address: '56 Hồ Thị Tư, Hiệp Phú',
      phone: '0847 603 723',
      email: 'info@banhmioi.com',
      website: 'http://katinat.vn/',
      category: 'Bánh Mì',
      rating: 4.2,
      reviewCount: 189,
      avatar: 'https://via.placeholder.com/60',
      status: 'active',
      district: 'Quận 3',
      openingHours: '06:00 - 21:00',
      owner: 'Trần Thị B',
      dishes: 18,
      orders: 980,
      revenue: 32150000,
      joinDate: '2024-02-20',
    },
    {
      id: 3,
      name: 'Cơm Tấm 24h',
      address: '168 đường Đặng Văn Bi, Bình Thọ',
      phone: '028 7306 9339',
      email: 'info@comtam24h.com',
      website: 'http://katinat.vn/',
      category: 'Cơm Tấm',
      rating: 3.6,
      reviewCount: 156,
      avatar: 'https://via.placeholder.com/60',
      status: 'active',
      district: 'Quận 7',
      openingHours: '24/7',
      owner: 'Lê Minh C',
      dishes: 32,
      orders: 750,
      revenue: 28500000,
      joinDate: '2024-03-10',
    },
    {
      id: 4,
      name: 'Café Hà Nội',
      address: '895 Đ. Kha Vạn Cân, An Bình',
      phone: '0842 263 760',
      email: 'info@cafebh.com',
      website: 'https://katinat.vn/',
      category: 'Cà Phê',
      rating: 3.9,
      reviewCount: 203,
      avatar: 'https://via.placeholder.com/60',
      status: 'inactive',
      district: 'Quận 5',
      openingHours: '07:00 - 22:00',
      owner: 'Phạm Thị D',
      dishes: 22,
      orders: 620,
      revenue: 19800000,
      joinDate: '2024-01-05',
    },
  ])

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    category: '',
    district: '',
    openingHours: '',
    owner: '',
  })

  const filteredRestaurants = restaurants.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.owner.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = filterStatus === 'all' || r.status === filterStatus
    return matchSearch && matchStatus
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddRestaurant = () => {
    if (!formData.name.trim()) return

    const newRestaurant = {
      id: Math.max(...restaurants.map((r) => r.id), 0) + 1,
      ...formData,
      avatar: 'https://via.placeholder.com/60',
      status: 'active',
      rating: 0,
      reviewCount: 0,
      dishes: 0,
      orders: 0,
      revenue: 0,
      joinDate: new Date().toISOString().split('T')[0],
    }

    setRestaurants([...restaurants, newRestaurant])
    setFormData({
      name: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      category: '',
      district: '',
      openingHours: '',
      owner: '',
    })
    setShowAddForm(false)
  }

  const handleDeleteRestaurant = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa nhà hàng này?')) {
      setRestaurants(restaurants.filter((r) => r.id !== id))
      setSelectedRestaurant(null)
    }
  }

  const handleToggleStatus = (id) => {
    setRestaurants(
      restaurants.map((r) =>
        r.id === id
          ? { ...r, status: r.status === 'active' ? 'inactive' : 'active' }
          : r
      )
    )
  }

  const categories = [
    'Phở',
    'Bánh Mì',
    'Cơm Tấm',
    'Cà Phê',
    'Buffet',
    'Nướng',
    'Hải Sản',
  ]
  const districts = ['Quận 1', 'Quận 3', 'Quận 5', 'Quận 7', 'Quận 4', 'Quận 6']

  return (
    <div className='restaurant-management'>
      <div className='management-header'>
        <div className='header-info'>
          <h2>Quản Lý Nhà Hàng</h2>
          <p>Tổng cộng: {filteredRestaurants.length} nhà hàng</p>
        </div>
        <button
          className='btn-add-restaurant'
          onClick={() => setShowAddForm(!showAddForm)}
        >
          + Thêm Nhà Hàng
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className='add-form-container'>
          <div className='form-card'>
            <h3>Thêm Nhà Hàng Mới</h3>
            <div className='form-grid'>
              <div className='form-group'>
                <label>Tên Nhà Hàng</label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder='Nhập tên nhà hàng...'
                  className='form-input'
                />
              </div>

              <div className='form-group'>
                <label>Chủ Quán</label>
                <input
                  type='text'
                  name='owner'
                  value={formData.owner}
                  onChange={handleInputChange}
                  placeholder='Nhập tên chủ quán...'
                  className='form-input'
                />
              </div>

              <div className='form-group'>
                <label>Địa Chỉ</label>
                <input
                  type='text'
                  name='address'
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder='Nhập địa chỉ...'
                  className='form-input'
                />
              </div>

              <div className='form-group'>
                <label>Quận</label>
                <select
                  name='district'
                  value={formData.district}
                  onChange={handleInputChange}
                  className='form-select'
                >
                  <option value=''>-- Chọn Quận --</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className='form-group'>
                <label>Danh Mục</label>
                <select
                  name='category'
                  value={formData.category}
                  onChange={handleInputChange}
                  className='form-select'
                >
                  <option value=''>-- Chọn Danh Mục --</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className='form-group'>
                <label>Số Điện Thoại</label>
                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder='Nhập số điện thoại...'
                  className='form-input'
                />
              </div>

              <div className='form-group'>
                <label>Email</label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='Nhập email...'
                  className='form-input'
                />
              </div>

              <div className='form-group'>
                <label>Website</label>
                <input
                  type='url'
                  name='website'
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder='Nhập website...'
                  className='form-input'
                />
              </div>

              <div className='form-group'>
                <label>Giờ Mở Cửa</label>
                <input
                  type='text'
                  name='openingHours'
                  value={formData.openingHours}
                  onChange={handleInputChange}
                  placeholder='VD: 07:00 - 22:00'
                  className='form-input'
                />
              </div>
            </div>

            <div className='form-actions'>
              <button
                className='btn-cancel'
                onClick={() => setShowAddForm(false)}
              >
                Hủy
              </button>
              <button className='btn-submit' onClick={handleAddRestaurant}>
                Thêm Nhà Hàng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter */}
      <div className='search-filter-section'>
        <input
          type='text'
          placeholder='Tìm theo tên, địa chỉ hoặc chủ quán...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='search-input'
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className='filter-select'
        >
          <option value='all'>Tất cả trạng thái</option>
          <option value='active'>Đang hoạt động</option>
          <option value='inactive'>Không hoạt động</option>
        </select>
      </div>

      {/* Restaurants Grid */}
      <div className='restaurants-grid'>
        {filteredRestaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className={`restaurant-card ${restaurant.status}`}
          >
            <div className='restaurant-header'>
              <img
                src={restaurant.avatar}
                alt={restaurant.name}
                className='restaurant-avatar'
              />
              <div className='restaurant-badges'>
                <span className={`status-badge ${restaurant.status}`}>
                  {restaurant.status === 'active'
                    ? '🟢 Hoạt động'
                    : '🔴 Không hoạt động'}
                </span>
              </div>
            </div>

            <div className='restaurant-info'>
              <h4>{restaurant.name}</h4>
              <p className='category'>{restaurant.category}</p>
              <p className='owner'>Chủ: {restaurant.owner}</p>
              <p className='address'>📍 {restaurant.address}</p>
              <p className='district'>{restaurant.district}</p>
            </div>

            <div className='restaurant-stats'>
              <div className='stat'>
                <span className='label'>Đánh Giá</span>
                <span className='value'>⭐ {restaurant.rating}</span>
              </div>
              <div className='stat'>
                <span className='label'>Reviews</span>
                <span className='value'>{restaurant.reviewCount}</span>
              </div>
              <div className='stat'>
                <span className='label'>Đơn Hàng</span>
                <span className='value'>{restaurant.orders}</span>
              </div>
              <div className='stat'>
                <span className='label'>Doanh Thu</span>
                <span className='value'>
                  {(restaurant.revenue / 1000000).toFixed(1)}M
                </span>
              </div>
            </div>

            <div className='restaurant-actions'>
              <button
                className='btn-view'
                onClick={() => setSelectedRestaurant(restaurant)}
                title='Xem chi tiết'
              >
                👁️
              </button>
              <button
                className={`btn-toggle ${restaurant.status}`}
                onClick={() => handleToggleStatus(restaurant.id)}
                title={
                  restaurant.status === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'
                }
              >
                {restaurant.status === 'active' ? '🔒' : '🔓'}
              </button>
              <button
                className='btn-delete'
                onClick={() => handleDeleteRestaurant(restaurant.id)}
                title='Xóa'
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedRestaurant && (
        <div
          className='modal-overlay'
          onClick={() => setSelectedRestaurant(null)}
        >
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <div className='modal-header'>
              <h2>{selectedRestaurant.name}</h2>
              <button
                className='close-btn'
                onClick={() => setSelectedRestaurant(null)}
              >
                ×
              </button>
            </div>

            <div className='modal-body'>
              <div className='detail-section'>
                <h3>Thông Tin Cơ Bản</h3>
                <div className='detail-grid'>
                  <div className='detail-item'>
                    <span className='label'>Chủ Quán</span>
                    <span className='value'>{selectedRestaurant.owner}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='label'>Danh Mục</span>
                    <span className='value'>{selectedRestaurant.category}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='label'>Địa Chỉ</span>
                    <span className='value'>{selectedRestaurant.address}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='label'>Quận</span>
                    <span className='value'>{selectedRestaurant.district}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='label'>SĐT</span>
                    <span className='value'>{selectedRestaurant.phone}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='label'>Email</span>
                    <span className='value'>{selectedRestaurant.email}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='label'>Website</span>
                    <span className='value'>{selectedRestaurant.website}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='label'>Giờ Mở Cửa</span>
                    <span className='value'>
                      {selectedRestaurant.openingHours}
                    </span>
                  </div>
                </div>
              </div>

              <div className='detail-section'>
                <h3>Thống Kê</h3>
                <div className='stats-grid'>
                  <div className='stat-card'>
                    <div className='stat-value'>
                      {selectedRestaurant.dishes}
                    </div>
                    <div className='stat-label'>Món Ăn</div>
                  </div>
                  <div className='stat-card'>
                    <div className='stat-value'>
                      {selectedRestaurant.orders}
                    </div>
                    <div className='stat-label'>Đơn Hàng</div>
                  </div>
                  <div className='stat-card'>
                    <div className='stat-value'>
                      {(selectedRestaurant.revenue / 1000000).toFixed(1)}M
                    </div>
                    <div className='stat-label'>Doanh Thu</div>
                  </div>
                  <div className='stat-card'>
                    <div className='stat-value'>
                      ⭐ {selectedRestaurant.rating}
                    </div>
                    <div className='stat-label'>Đánh Giá</div>
                  </div>
                </div>
              </div>
            </div>

            <div className='modal-footer'>
              <button
                className='btn-cancel'
                onClick={() => setSelectedRestaurant(null)}
              >
                Đóng
              </button>
              <button className='btn-edit'>✏️ Chỉnh Sửa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RestaurantManagement
