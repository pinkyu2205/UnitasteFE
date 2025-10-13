// src/page/Admin/component/UserDetailModal.jsx

import '../CSS/UserDetailModal.css'

const UserDetailModal = ({ user, onClose }) => {
  if (!user) return null

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h2>Chi Tiết User</h2>
          <button className='close-btn' onClick={onClose}>
            ×
          </button>
        </div>

        <div className='modal-body'>
          {/* Personal Info Section */}
          <div className='info-section'>
            <h3>Thông Tin Cá Nhân</h3>
            <div className='info-grid'>
              <div className='info-card'>
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className='detail-avatar'
                />
                <div className='avatar-info'>
                  <h4>{user.fullName}</h4>
                  <p>{user.email}</p>
                  <span className={`status-badge ${user.status}`}>
                    {user.status === 'active'
                      ? '🟢 Hoạt động'
                      : '🔴 Không hoạt động'}
                  </span>
                </div>
              </div>

              <div className='info-card'>
                <div className='info-item'>
                  <span className='label'>Số Điện Thoại</span>
                  <span className='value'>{user.phone}</span>
                </div>
                <div className='info-item'>
                  <span className='label'>Giới Tính</span>
                  <span className='value'>{user.gender}</span>
                </div>
                <div className='info-item'>
                  <span className='label'>Ngày Sinh</span>
                  <span className='value'>
                    {new Date(user.birthDate).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <div className='info-item'>
                  <span className='label'>Ngày Tham Gia</span>
                  <span className='value'>
                    {new Date(user.joinDate).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              </div>

              <div className='info-card'>
                <div className='info-item'>
                  <span className='label'>Bio</span>
                  <span className='value bio-text'>
                    {user.bio || 'Chưa có thông tin'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Stats Section */}
          <div className='stats-section'>
            <h3>Thống Kê Hoạt Động</h3>
            <div className='stats-grid'>
              <div className='stat-box'>
                <div className='stat-number'>{user.orders}</div>
                <div className='stat-label'>Đơn Hàng</div>
              </div>
              <div className='stat-box'>
                <div className='stat-number'>
                  {(user.totalSpent / 1000000).toFixed(1)}M
                </div>
                <div className='stat-label'>Tổng Chi</div>
              </div>
              <div className='stat-box'>
                <div className='stat-number'>
                  {(user.totalSpent / user.orders / 1000).toFixed(0)}K
                </div>
                <div className='stat-label'>Chi Bình Quân</div>
              </div>
              <div className='stat-box'>
                <div className='stat-number'>
                  {new Date(user.lastOrder).toLocaleDateString('vi-VN')}
                </div>
                <div className='stat-label'>Đơn Cuối Cùng</div>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className='preferences-section'>
            <h3>Sở Thích Ẩm Thực</h3>
            <div className='preferences-grid'>
              <div className='preference-card'>
                <h4>💰 Mức Giá</h4>
                <div className='tag-list'>
                  {user.priceRange.map((price, idx) => (
                    <span key={idx} className='tag'>
                      {price}
                    </span>
                  ))}
                </div>
              </div>

              <div className='preference-card'>
                <h4>🍜 Loại Ẩm Thực</h4>
                <div className='tag-list'>
                  {user.cuisine.map((c, idx) => (
                    <span key={idx} className='tag'>
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className='preference-card'>
                <h4>🍽️ Loại Địa Điểm</h4>
                <div className='tag-list'>
                  {user.preferences.placeTypes.map((place, idx) => (
                    <span key={idx} className='tag'>
                      {place}
                    </span>
                  ))}
                </div>
              </div>

              <div className='preference-card'>
                <h4>✨ Đặc Điểm Mong Muốn</h4>
                <div className='tag-list'>
                  {user.preferences.features.length > 0 ? (
                    user.preferences.features.map((feature, idx) => (
                      <span key={idx} className='tag'>
                        {feature}
                      </span>
                    ))
                  ) : (
                    <span className='tag-empty'>Chưa cập nhật</span>
                  )}
                </div>
              </div>

              <div className='preference-card'>
                <h4>📍 Khoảng Cách</h4>
                <div className='distance-display'>
                  {user.preferences.distance}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info Section */}
          <div className='payment-section'>
            <h3>Thông Tin Thanh Toán</h3>
            <div className='payment-card'>
              <div className='payment-item'>
                <span className='label'>Phương Thức</span>
                <span className='value'>Thẻ Tín Dụng / Ví Điện Tử</span>
              </div>
              <div className='payment-item'>
                <span className='label'>Tổng Giao Dịch</span>
                <span className='value'>{user.orders} giao dịch</span>
              </div>
              <div className='payment-item'>
                <span className='label'>Tổng Tiền</span>
                <span className='value highlight'>
                  {user.totalSpent.toLocaleString()}₫
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='modal-footer'>
          <button className='btn-cancel' onClick={onClose}>
            Đóng
          </button>
          <button className='btn-edit'>✏️ Chỉnh sửa</button>
          <button className='btn-export'>📥 Xuất dữ liệu</button>
        </div>
      </div>
    </div>
  )
}

export default UserDetailModal
