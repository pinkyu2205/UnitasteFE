import axios from 'axios'

// ------------------------------------------------
// 1. AXIOS CLIENT CHUNG (Dùng cho Auth, AI Chat)
// BASE_URL: https://localhost:5001/api
// ------------------------------------------------
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_GATEWAY, // https://localhost:5001/api
  headers: {
    'Content-Type': 'application/json',
  },
})

// ------------------------------------------------
// 🚀 2. AXIOS CLIENT RIÊNG CHO RESTAURANT
// BASE_URL: https://localhost:5003/api
// ------------------------------------------------
const axiosRestaurantClient = axios.create({
  baseURL: import.meta.env.VITE_API_RESTAURANT, // https://localhost:5003/api
  headers: {
    'Content-Type': 'application/json',
  },
})

// ------------------------------------------------
// ✨ 3. AXIOS CLIENT MỚI CHO PAYMENT
// BASE_URL: https://localhost:5005/
// ------------------------------------------------
const axiosPaymentClient = axios.create({
  // Thêm biến này vào file .env của bạn: VITE_API_PAYMENT=https://localhost:5005
  baseURL: import.meta.env.VITE_API_PAYMENT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ------------------------------------------------
// 💬 4. AXIOS CLIENT MỚI CHO SOCIAL SERVICE
// BASE_URL: https://localhost:5002
// ------------------------------------------------
const axiosSocialClient = axios.create({
  // Add to .env: VITE_API_SOCIAL=https://localhost:5002/api
  baseURL: import.meta.env.VITE_API_SOCIAL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ------------------------------------------------
// 5. INTERCEPTOR LOGIC (Áp dụng cho tất cả)
// ------------------------------------------------
const setupInterceptors = (client) => {
  // Request Interceptor: Thêm Token
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      if (config.headers['Content-Type'] === 'multipart/form-data') {
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  client.interceptors.response.use(
    (response) => response.data,
    (error) => {
      console.error('Axios Error:', error.response?.data || error.message) // Improved logging
      return Promise.reject(error)
    }
  )
}

// Áp dụng Interceptors cho cả ba client
setupInterceptors(axiosClient)
setupInterceptors(axiosRestaurantClient)
setupInterceptors(axiosPaymentClient)
setupInterceptors(axiosSocialClient)

// 🚀 Export tất cả client
export {
  axiosClient,
  axiosPaymentClient,
  axiosRestaurantClient,
  axiosSocialClient,
}
