// src/api/paymentApi.js
import { axiosPaymentClient } from './axios' // baseURL = import.meta.env.VITE_API_PAYMENT (ví dụ https://paymentservice-.../api)

// Lưu ý: KHÔNG để dấu cách sau dấu "=" trong .env
// VITE_API_PAYMENT=https://paymentservice-5ccj.onrender.com/api

// Helper: lấy userId từ JWT (nếu cần)
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
   * Gói dịch vụ (ServicePackagesController)
   */
  getAllServicePackages: () => {
    // baseURL đã có /api → KHÔNG thêm /api lần nữa
    return axiosPaymentClient.get('/ServicePackages/get-all-service-package')
  },

  /**
   * Tạo thanh toán gói dịch vụ
   * BE (PayOSService) sẽ tự dùng ReturnUrl/CancelUrl từ appsettings → KHÔNG gửi từ FE
   * POST: /ServicePackages/create-service-package-payment
   * Body: { servicePackageId }
   */
  createServicePackagePayment: (servicePackageId) => {
    return axiosPaymentClient.post(
      '/ServicePackages/create-service-package-payment',
      { servicePackageId }
    )
  },

  /**
   * Lịch sử mua hàng theo token
   * GET: /ServicePackages/get-purchases-by-user-token
   */
  getPurchasesByUserToken: () => {
    return axiosPaymentClient.get('/ServicePackages/get-purchases-by-user-token')
  },

  /**
   * Kiểm tra trạng thái VIP (cần userId)
   * GET: /ServicePackages/check-service-package-status?userId={id}
   */
  checkVipStatus: () => {
    const userId = getUserIdFromToken()
    if (!userId) return Promise.reject(new Error('User ID not found in token'))
    return axiosPaymentClient.get(`/ServicePackages/check-service-package-status`, {
      params: { userId }
    })
  },

  /**
   * CALLBACK thanh toán (PaymentsController)
   * GET: /payments/payment-success-callback?orderCode={orderCode}
   * GET: /payments/payment-cancel-callback?orderCode={orderCode}
   */
  paymentSuccessCallback: (orderCode) => {
    return axiosPaymentClient.get('/payments/payment-success-callback', {
      params: { orderCode }
    })
  },

  paymentCancelCallback: (orderCode) => {
    return axiosPaymentClient.get('/payments/payment-cancel-callback', {
      params: { orderCode }
    })
  },

  /**
   * ADMIN dashboards (PaymentsController)
   * Lưu ý: KHÔNG thêm "/api" ở path vì baseURL đã có /api
   */
  countSuccessTransactions: () => {
    return axiosPaymentClient.get('/payments/count-success-transactions')
  },

  countCancelTransactions: () => {
    return axiosPaymentClient.get('/payments/count-cancel-transactions')
  },

  getSumAmountSuccessTransactions: () => {
    // BE trả số; axios tự parse theo headers
    return axiosPaymentClient.get('/payments/sum-amount-success-transactions')
  },

  countTotalTransactions: () => {
    return axiosPaymentClient.get('/payments/count-amount-of-paymentTransaction')
  },

  getAllPaymentTransactions: () => {
    // Sửa lỗi cũ: trước đây viết "/api/Payments/..." → trùng /api
    return axiosPaymentClient.get('/payments/get-all-payment-transaction')
  }
}

export default PaymentApi
