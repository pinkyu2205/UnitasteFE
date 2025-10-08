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
// 3. INTERCEPTOR LOGIC (Áp dụng cho cả hai)
// ------------------------------------------------
const setupInterceptors = (client) => {
  // Request Interceptor: Thêm Token
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // Response Interceptor: Trích xuất response.data và xử lý lỗi
  client.interceptors.response.use(
    (response) => response.data,
    (error) => {
      console.error(error.response?.data || error.message)
      return Promise.reject(error)
    }
  )
}

// Áp dụng Interceptors cho cả hai client
setupInterceptors(axiosClient)
setupInterceptors(axiosRestaurantClient)

// 🚀 Export cả hai client
export { axiosClient, axiosRestaurantClient }
