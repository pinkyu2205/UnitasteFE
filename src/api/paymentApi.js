// src/api/paymentApi.js
import { axiosPaymentClient } from './axios' // Make sure you are using the correct client (port 5005)

// Helper function to get UserID from token
const getUserIdFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.userId || payload.sub || payload.id
  } catch (error) {
    console.error('Error parsing token:', error)
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
   * Body: { servicePackageId, returnUrl, cancelUrl }
   */
  createServicePackagePayment: (servicePackageId) => {
    // Lấy base URL từ window.location
    const baseUrl = window.location.origin

    return axiosPaymentClient.post('/create-service-package-payment', {
      servicePackageId,
      returnUrl: `${baseUrl}/payment/success`, // URL khi thanh toán thành công
      cancelUrl: `${baseUrl}/vip-checkout`, // URL khi hủy thanh toán
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

  /**
   * Callback xác nhận thanh toán thành công
   * GET: /payment-success-callback?orderCode={orderCode}
   * (hoặc /api/payments/payment-success-callback nếu backend dùng /api prefix)
   */
  paymentSuccessCallback: (orderCode) => {
    return axiosPaymentClient.get(
      `/payment-success-callback?orderCode=${orderCode}`
    )
  },
}

export default PaymentApi
