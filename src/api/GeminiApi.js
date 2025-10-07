import axiosClient from './axios'

const AIChatApi = {
  getAIResponse: async (prompt) => {
    const data = {
      prompt: prompt,
    }
    return await axiosClient.post('/AI/chat', data)
  },
}

export default AIChatApi
