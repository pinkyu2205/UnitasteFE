import { axiosRestaurantClient } from './axios'

axiosRestaurantClient

const AIChatApi = {
  getAIResponse: async (prompt) => {
    const data = {
      prompt: prompt,
    }
    return await axiosRestaurantClient.post('/AI/chat', data)
  },
}

export default AIChatApi
