import { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/ProfileInfo.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8001";
const token = localStorage.getItem("token");

const ProfileInfo = ({ userData, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: userData.fullName,
    email: userData.email,
    bio: userData.bio,
    gender: userData.gender,
    birthDate: userData.birthDate,
  });
  const [avatarUrl, setAvatarUrl] = useState(userData.avatarUrl);

  // 🔁 Đồng bộ khi userData thay đổi
  useEffect(() => {
    setFormData({
      fullName: userData.fullName,
      email: userData.email,
      bio: userData.bio,
      gender: userData.gender,
      birthDate: userData.birthDate,
    });
    setAvatarUrl(userData.avatarUrl);
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };
  // ✅ HÀM DUY NHẤT xử lý upload avatar
const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    setUploading(true);

    // Tạo preview tạm
    const previewUrl = URL.createObjectURL(file);
    setAvatarUrl(previewUrl);

    // Gửi ảnh lên API
    const formData = new FormData();
    formData.append("avatarFile", file);

    const res = await axios.post(
      `${API_URL}/api/users/upload-avatar`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // ✅ Cập nhật avatarUrl mới nhất
    const newUrl = res.data.avatarUrl;
    setAvatarUrl(newUrl);

    const updatedUser = { ...userData, avatarUrl: newUrl };
    localStorage.setItem("user", JSON.stringify(updatedUser));
  } catch (error) {
    console.error("Lỗi khi upload ảnh:", error);
    setError("Không thể tải ảnh lên. Vui lòng thử lại.");
  } finally {
    setUploading(false);
  }
};

//luu thay doi
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const success = await onUpdateProfile({
        ...formData,
        avatarUrl: avatarUrl,
      });
      if (success) setIsEditing(false);
    } catch (err) {
      console.error(err);
      setError("Lưu thông tin không thành công.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: userData.fullName,
      email: userData.email,
      bio: userData.bio,
      gender: userData.gender,
      birthDate: userData.birthDate,
    });
    setAvatarUrl(userData.avatarUrl);
    setIsEditing(false);
    setError(null);
  };

  // ✅ Giao diện
  return (
    <div className="profile-info-container">
      <div className="info-header">
        <h2>Thông tin cá nhân</h2>
        {!isEditing && (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            ✏️ Chỉnh sửa
          </button>
        )}
      </div>

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      <div className="profile-info-content">
        <div className="avatar-section">
          <div className="avatar-container">
            {avatarUrl ? (
              <img src={avatarUrl} alt="avatar" className="avatar-image" />
            ) : (
              <div className="avatar-placeholder-large">
                {formData.fullName?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>

          {isEditing && (
            <div className="avatar-upload">
              <label htmlFor="avatar-input" className="upload-label">
                {uploading ? "Đang tải..." : "📸 Tải ảnh lên"}
              </label>
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="upload-input"
                disabled={uploading}
              />
            </div>
          )}
        </div>

        <div className="form-fields">
          <div className="form-group">
            <label>Họ và tên</label>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="form-input"
              />
            ) : (
              <div className="form-value">{userData.fullName}</div>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <div className="form-value read-only">{userData.email}</div>
          </div>

          <div className="form-group">
            <label>Tiểu sử</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="form-textarea"
              />
            ) : (
              <div className="form-value bio-value">
                {userData.bio || "Chưa có thông tin"}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Giới tính</label>
            {isEditing ? (
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">-- Chọn giới tính --</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            ) : (
              <div className="form-value">
                {userData.gender || "Chưa cập nhật"}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Ngày sinh</label>
            {isEditing ? (
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate?.substring(0, 10) || ""}
                onChange={handleInputChange}
                className="form-input"
              />
            ) : (
              <div className="form-value">
                {userData.birthDate
                  ? new Date(userData.birthDate).toLocaleDateString("vi-VN")
                  : "Chưa cập nhật"}
              </div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="form-actions">
            <button
              className="btn-save"
              onClick={handleSave}
              disabled={isLoading || uploading}
            >
              {isLoading ? "Đang lưu..." : "💾 Lưu thay đổi"}
            </button>
            <button
              className="btn-cancel"
              onClick={handleCancel}
              disabled={isLoading || uploading}
            >
              ❌ Hủy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
