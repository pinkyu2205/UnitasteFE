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

  /** POST /api/PostReactions/make-creaction (Swagger: postId, reactionType in query) */
  makeReaction: (postId, reactionType) => {
    return axiosSocialClient.post('/PostReactions/make-creaction', null, {
      params: {
        postId: Number(postId),
        reactionType: reactionType || '',
      },
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

  // socialApi.js
  getCommentsForPost: async (postId) => {
    try {
      const res = await axiosSocialClient.get('/Comments/get-comments-by-postId', {
        params: { postId: Number(postId) },
      })
      
      // 204 No Content → coi như mảng rỗng
      if (res?.status === 204) return []
      
      const data = res?.data ?? res
      if (data === undefined || data === null || data === '') return []
      
      // ✅ QUAN TRỌNG: Nếu backend trả về object đơn, bọc thành mảng
      let arr
      if (Array.isArray(data)) {
        arr = data
      } else if (typeof data === 'object' && data.commentId !== undefined) {
        // Trả về 1 comment đơn → bọc thành mảng
        arr = [data]
      } else {
        // Thử các nested properties
        arr = Array.isArray(data?.comments) ? data.comments
          : Array.isArray(data?.items) ? data.items
          : Array.isArray(data?.result) ? data.result
          : Array.isArray(data?.data) ? data.data
          : Array.isArray(data?.list) ? data.list
          : []
      }
      
      // Chuẩn hóa field để FE hiển thị thống nhất
      return arr.map((c) => ({
        commentId: c.commentId ?? c.id,
        userId: c.userId ?? c.authorUserId ?? c.authorId,
        fullName: c.fullName ?? c.userName ?? c.authorName ?? 'Người dùng',
        avatarUrl: c.avatarUrl ?? c.userAvatar ?? c.avatar,
        content: c.content ?? c.commentText ?? c.text,
        createdAt: c.createdAt ?? c.createdDate ?? c.createdOn,
      }))
    } catch (e) {
      if (e?.response?.status === 404) {
        // Backend trả 404 khi chưa có bình luận → coi như danh sách rỗng
        return []
      }
      throw e
    }
  },


  /** GET /api/users/get-profile-user-by-id/{userId} (Assuming this is in UserApi on port 5001) */
  // Import UserApi if needed, or create a function here that uses the correct axiosClient
  getUserProfile: async (userId) => {
    if (!userId) {
      console.warn('getUserProfile: userId is missing');
      return { fullName: 'Người dùng', avatarUrl: null };
    }
    
    try {
      const { axiosClient } = await import('./axios');
      const res = await axiosClient.get(`/Users/get-profile-user-by-id/${userId}`);
      const d = res?.data ?? res ?? {};
      
      // Log để debug
      console.log(`getUserProfile for userId ${userId}:`, d);
      
      // Trả đúng shape mà Post.jsx mong đợi - ưu tiên các field phổ biến
      const fullName = d.fullName || d.name || d.userName || d.displayName || null;
      const avatarUrl = d.avatarUrl || d.avatar || d.profilePicture || null;
      
      if (!fullName) {
        console.warn(`getUserProfile: No name found for userId ${userId}, data:`, d);
        return { fullName: 'Người dùng', avatarUrl };
      }
      
      return {
        fullName,
        avatarUrl,
      };
    } catch (e) {
      console.error(`Error fetching user profile for userId ${userId}:`, e);
      // Kiểm tra nếu là 404 hoặc lỗi khác
      if (e?.response?.status === 404) {
        console.warn(`User ${userId} not found`);
      }
      return { fullName: 'Người dùng', avatarUrl: null };
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
