// src/api/paymentApi.js
import { jwtDecode } from 'jwt-decode'
import { axiosPaymentClient } from './axios' // Make sure you are using the correct client (port 5005)

const getUserIdFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return null
  }
  try {
    const decoded = jwtDecode(token) // Lấy claim chứa User ID
    const nameIdentifierClaim =
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    const id =
      decoded[nameIdentifierClaim] ||
      decoded.sub ||
      decoded.id ||
      decoded.userId
    const userIdInt = id ? parseInt(id, 10) : null
    return isNaN(userIdInt) ? null : userIdInt
  } catch (e) {
    console.error('Lỗi giải mã token trong paymentApi:', e)
    return null
  }
}

const PaymentApi = {
  /**
   * Lấy tất cả các gói dịch vụ VIP
   * GET: /get-all-service-package
   */
  getAllServicePackages: () => {
    return axiosPaymentClient.get('/get-all-service-package')
  },

  /**
   * Tạo một yêu cầu thanh toán cho gói dịch vụ
   * POST: /create-service-package-payment
   * Body: { servicePackageId }
   */
  createServicePackagePayment: (servicePackageId) => {
    // Chỉ cần gửi servicePackageId trong body
    return axiosPaymentClient.post('/create-service-package-payment', {
      servicePackageId,
    })
  },

  /**
   * Lấy lịch sử mua hàng của người dùng (dựa trên token)
   * GET: /get-purchases-by-user-token
   */
  getPurchasesByUserToken: () => {
    return axiosPaymentClient.get('/get-purchases-by-user-token')
  },
  checkVipStatus: () => {
    const userId = getUserIdFromToken()
    if (!userId) {
      // Trả về Promise reject nếu không có userId
      return Promise.reject(new Error('User ID not found in token'))
    }
    // API yêu cầu userId làm query parameter
    return axiosPaymentClient.get(
      `/check-service-package-status?userId=${userId}`
    )
  },
}

export default PaymentApi
