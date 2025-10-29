import { axiosSocialClient } from './axios' // Assuming you create this pointing to port 5002

// Helper to get UserID (reuse or move to utils)
const getUserIdFromToken = () => {
  /* ... same function as before ... */
}

const SocialApi = {
  /** GET /api/Post/get-all-paged */
  getAllPosts: (page = 1, pageSize = 5) => {
    // Default pageSize to 5 or more
    return axiosSocialClient.get('/Posts/get-all-paged', {
      params: { page, pageSize },
    })
  },

  /** POST /api/Post/create (multipart/form-data) */
  createPost: (formData) => {
    // Expects FormData object
    return axiosSocialClient.post('/Posts/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  /** POST /api/Comments/create-comment-for-post */
  createComment: (postId, content, parentId = null) => {
    // Chỉ cần tạo payload trực tiếp, parentId sẽ là null nếu không được truyền vào
    const payload = { postId, content, parentId }

    // 👇 XÓA DÒNG NÀY ĐI 👇
    // if (parentId === null) payload.parentId = 0

    // Giữ lại /api/ nếu baseURL của axiosSocialClient không có /api/
    return axiosSocialClient.post('/Comments/create-comment-for-post', payload)
  },

  /** POST /api/PostReactions/make-reaction */
  makeReaction: (postId, reactionType) => {
    // reactionType can be null/empty string to remove reaction
    const typeToSend = reactionType || ''
    return axiosSocialClient.post('/PostReactions/make-reaction', null, {
      params: { postId, reactionType: typeToSend },
    })
  },

  /** GET /api/PostReactions/Is-make-reaction-for-post */
  checkUserReaction: (postId) => {
    return axiosSocialClient.get('/PostReactions/Is-make-reaction-for-post', {
      params: { postId },
    })
  },

  /** GET /api/PostReactions/summary-amount-react */
  getReactionSummary: (postId) => {
    return axiosSocialClient.get('/PostReactions/summary-amount-react', {
      params: { postId },
    })
  },

  /** POST /api/PostShares/create */
  sharePost: (originalPostId, shareComment) => {
    return axiosSocialClient.post('/PostShares/create', {
      originalPostId,
      shareComment,
    })
  },

  getCommentsForPost: (postId) => {
    return axiosSocialClient.get('/Comments/get-comments-by-postId', {
      params: { postId }, // Pass postId as a query parameter
    })
  },

  /** GET /api/users/get-profile-user-by-id/{userId} (Assuming this is in UserApi on port 5001) */
  // Import UserApi if needed, or create a function here that uses the correct axiosClient
  getUserProfile: async (userId) => {
    // Example using a hypothetical UserApi import
    // import UserApi from './userApi'; // Adjust path
    // return UserApi.getProfile(userId);

    // Or directly using axiosClient (port 5001) if UserApi isn't set up
    try {
      const { axiosClient } = await import('./axios') // Dynamically import Gateway client
      return axiosClient.get(`/Users/get-profile-user-by-id/${userId}`)
    } catch (e) {
      console.error('Error fetching user profile', e)
      return { fullName: 'Người dùng ẩn', avatarUrl: null }
    }
  },

  getPostsByUserId: (userId) => {
    // API này lấy userId từ token (Authorization header)
    // Hoặc nếu nó cần userId làm param, dùng: params: { userId }
    return axiosSocialClient.get('/Posts/get-all-post-of-userId')
  },

  /** MỚI: Giả lập API lấy các tag nổi bật */
  getTrendingTags: async () => {
    // Giả lập độ trễ mạng
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Dữ liệu giả
    return [
      { tag: 'cafe', count: 120 },
      { tag: 'review', count: 95 },
      { tag: 'bunbo', count: 88 },
      { tag: 'banhmi', count: 76 },
      { tag: 'trasua', count: 65 },
      { tag: 'comtam', count: 50 },
      { tag: 'anvat', count: 43 },
    ]
  },
}

export default SocialApi