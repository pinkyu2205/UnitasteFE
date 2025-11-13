// src/pages/Admin/component/ReviewManagement.jsx

import { useState } from 'react'
import '../CSS/ReviewManagement.css'
import {
  CheckCircleIcon,
  EditIcon,
  EyeIcon,
  SearchIcon,
  StarIcon,
  TrashIcon,
  XCircleIcon,
} from './AdminIcons'

const ReviewManagement = () => {
  const [activeTab, setActiveTab] = useState('reviews') // 'reviews' or 'reports'
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterRating, setFilterRating] = useState('all')
  const [selectedReview, setSelectedReview] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [showReplyModal, setShowReplyModal] = useState(false)

  // Mock data - Danh sách đánh giá
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userName: 'An Nhiên',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 5,
      comment:
        'App hay quá! Là sinh viên mà làm được app có AI thế này là đỉnh rồi. Gợi ý quán ăn trưa khá chuẩn gu mình.',
      date: '2025-11-01 10:20',
      status: 'approved',
      adminReply:
        'Cảm ơn bạn đã ủng hộ! Team mình sẽ cố gắng phát triển AI thông minh hơn nữa.',
      images: [],
    },
    {
      id: 2,
      userName: 'Bảo Long',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment:
        'Giao diện đơn giản, dễ dùng. Tính năng đăng bài review ổn. Mong app sớm có thêm nhiều quán ăn hơn.',
      date: '2025-11-01 14:35',
      status: 'approved',
      adminReply:
        'Cảm ơn góp ý của bạn! Tụi mình đang cập nhật dữ liệu quán ăn mỗi ngày ạ.',
      images: [],
    },
    {
      id: 3,
      userName: 'Minh Thư',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 3,
      comment:
        'Ý tưởng AI gợi ý hay đó, nhưng thỉnh thoảng nó gợi ý hơi chậm. Chắc do mới phát triển. Tạm cho 3 sao, hóng bản update sau.',
      date: '2025-11-02 09:10',
      status: 'approved',
      adminReply:
        'Cảm ơn bạn, tụi mình sẽ cố gắng tối ưu tốc độ của AI trong thời gian sớm nhất!',
      images: [],
    },
    {
      id: 4,
      userName: 'Gia Huy',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 5,
      comment:
        'Thích tính năng chia sẻ review lên MXH. Giao diện chia sẻ nhìn khá chuyên nghiệp. Ủng hộ các bạn sinh viên!',
      date: '2025-11-02 11:00',
      status: 'approved',
      adminReply: null,
      images: [],
    },
    {
      id: 5,
      userName: 'Tuấn Anh',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment:
        'App mượt, dùng không bị văng. Chức năng tìm kiếm quán ăn xung quanh khá chính xác.',
      date: '2025-11-02 17:45',
      status: 'approved',
      adminReply: null,
      images: [],
    },
    {
      id: 6,
      userName: 'Khánh Linh',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment:
        'Cộng đồng review trên app có vẻ khá thân thiện. Mình đăng bài review đầu tiên đã có mấy bạn vào tim.',
      date: '2025-11-03 08:30',
      status: 'approved',
      adminReply: 'Rất vui vì bạn đã tham gia cộng đồng!',
      images: [],
    },
    {
      id: 7,
      userName: 'Đức Minh',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 3,
      comment:
        'Nhiều quán mình hay ăn chưa có trên app. Mình có đề xuất thêm quán rồi, mong ad duyệt nhanh nhé.',
      date: '2025-11-03 12:15',
      status: 'pending',
      adminReply:
        'Tụi mình nhận được đề xuất rồi và sẽ duyệt ngay ạ. Cảm ơn bạn đã đóng góp!',
      images: [],
    },
    {
      id: 8,
      userName: 'Ngọc Ánh',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 5,
      comment:
        "AI gợi ý 'hôm nay ăn gì' khá hay. Giúp mình đỡ phải suy nghĩ mỗi bữa trưa. Rất tiện.",
      date: '2025-11-03 16:50',
      status: 'approved',
      adminReply: null,
      images: [],
    },
    {
      id: 9,
      userName: 'Văn Kiên',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 2,
      comment:
        'App tải ảnh review lên hơi chậm. Mình đăng 3 tấm ảnh mà chờ mất mấy phút. Mong team fix sớm.',
      date: '2025-11-04 10:05',
      status: 'approved',
      adminReply:
        'Xin lỗi bạn về sự bất tiện này. Tụi mình sẽ kiểm tra lại ngay phần máy chủ lưu ảnh. Cảm ơn bạn đã báo lỗi!',
      images: [],
    },
    {
      id: 10,
      userName: 'Thu Trang',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment:
        'Dùng khá ổn. Giao diện màu sắc hài hoà, dễ nhìn. Chúc team phát triển app thành công.',
      date: '2025-11-04 14:20',
      status: 'approved',
      adminReply: 'Cảm ơn lời chúc của bạn!',
      images: [],
    },
    {
      id: 11,
      userName: 'Hoàng Long',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 5,
      comment:
        'Biết đây là project sinh viên nên tải về dùng thử, không ngờ mượt ngoài mong đợi. AI gợi ý cũng thông minh.',
      date: '2025-11-04 18:00',
      status: 'approved',
      adminReply: null,
      images: [],
    },
    {
      id: 12,
      userName: 'Thùy Dương',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 3,
      comment:
        'Tính năng AI thỉnh thoảng gợi ý quán hơi xa chỗ mình. Nếu có thêm bộ lọc khoảng cách cho AI thì tốt quá.',
      date: '2025-11-05 09:30',
      status: 'approved',
      adminReply:
        'Đây là một góp ý rất hay! Tụi mình sẽ ghi nhận và nghiên cứu thêm tính năng này. Cảm ơn bạn.',
      images: [],
    },
    {
      id: 13,
      userName: 'Quốc Bảo',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment:
        'App nhẹ, cài nhanh. Đăng nhập bằng Google tiện lợi. Sẽ dùng tiếp để ủng hộ các bạn.',
      date: '2025-11-05 11:45',
      status: 'approved',
      adminReply: null,
      images: [],
    },
    {
      id: 14,
      userName: 'Mai Anh',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment:
        "Mình thích đọc review của mọi người. App nên có thêm tính năng 'Review nổi bật' để dễ tìm bài viết chất lượng.",
      date: '2025-11-05 15:00',
      status: 'pending',
      adminReply: null,
      images: [],
    },
    {
      id: 15,
      userName: 'Thành Đạt',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 5,
      comment:
        '5 sao cho nỗ lực của team! App chạy mượt trên máy mình (Android 10).',
      date: '2025-11-06 08:10',
      status: 'approved',
      adminReply: 'Cảm ơn bạn nhiều!',
      images: [],
    },
    {
      id: 16,
      userName: 'Hương Giang',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 3,
      comment:
        'Font chữ trong bài review hơi nhỏ, mình đọc hơi mỏi mắt. Team chỉnh to lên một chút được không?',
      date: '2025-11-06 10:40',
      status: 'approved',
      adminReply:
        'Cảm ơn góp ý của bạn, tụi mình sẽ điều chỉnh kích cỡ font chữ trong bản cập nhật kế tiếp.',
      images: [],
    },
    {
      id: 17,
      userName: 'Minh Hiếu',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment:
        'AI gợi ý quán ăn cho nhóm đông khá ổn. Hôm qua team mình đi ăn theo gợi ý của app rất hài lòng.',
      date: '2025-11-06 14:00',
      status: 'approved',
      adminReply: null,
      images: [],
    },
    {
      id: 18,
      userName: 'Tuyết Nhung',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment:
        "Mình dùng tính năng AI gợi ý theo 'tâm trạng', thấy nó gợi ý quán lẩu lúc mình chọn 'buồn' cũng vui vui.",
      date: '2025-11-07 09:00',
      status: 'approved',
      adminReply: "Haha, AI của tụi mình cũng 'tâm lý' phết bạn nhỉ!",
      images: [],
    },
    {
      id: 19,
      userName: 'Đình Phong',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 2,
      comment:
        'Thông báo của app hơi nhiều. Mới cài mà ngày nào cũng nhận 2-3 thông báo. Mình tắt tạm.',
      date: '2025-11-07 11:25',
      status: 'approved',
      adminReply:
        'Xin lỗi nếu thông báo làm phiền bạn. Tụi mình sẽ giảm tần suất gửi thông báo. Bạn cũng có thể tuỳ chỉnh trong cài đặt ạ.',
      images: [],
    },
    {
      id: 20,
      userName: 'Phương Uyên',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 5,
      comment:
        'Ủng hộ sản phẩm của sinh viên. App có tiềm năng lớn. Cố lên nhé team!',
      date: '2025-11-07 15:10',
      status: 'approved',
      adminReply: 'Tụi mình cảm ơn bạn rất nhiều!',
      images: [],
    },
    {
      id: 21,
      userName: 'Thế Vinh',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment:
        'Bản đồ chỉ đường hoạt động tốt, tích hợp Google Maps tiện lợi. Không bị chỉ sai đường.',
      date: '2025-11-08 10:00',
      status: 'approved',
      adminReply: null,
      images: [],
    },
    {
      id: 22,
      userName: 'Hồng Hạnh',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 3,
      comment:
        'Phần đăng ký tài khoản hơi rườm rà. Nếu cho đăng nhập bằng Apple ID/ Zalo nữa thì tốt hơn.',
      date: '2025-11-08 13:30',
      status: 'pending',
      adminReply: null,
      images: [],
    },
    {
      id: 23,
      userName: 'Quang Minh',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 5,
      comment:
        'Biết các bạn qua Facebook, tải về dùng thử thấy rất ấn tượng. AI gợi ý quán ăn vặt buổi chiều rất đúng ý mình.',
      date: '2025-11-08 16:15',
      status: 'approved',
      adminReply: 'Tuyệt vời! Cảm ơn bạn đã theo dõi và ủng hộ dự án.',
      images: [],
    },
    {
      id: 24,
      userName: 'Yến Nhi',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment:
        'App có vẻ còn mới nên ít review rác, seeding. Đọc review thấy tin tưởng được.',
      date: '2025-11-08 19:00',
      status: 'approved',
      adminReply:
        'Tụi mình sẽ luôn cố gắng kiểm duyệt để giữ cộng đồng trong sạch ạ.',
      images: [],
    },
    {
      id: 25,
      userName: 'Trung Kiên',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment:
        "Chức năng 'quán ăn gần đây' tải nhanh. Mình hay dùng khi đi làm về mà lười nghĩ món.",
      date: '2025-11-09 08:50',
      status: 'approved',
      adminReply: null,
      images: [],
    },
    {
      id: 26,
      userName: 'Thảo My',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 3,
      comment:
        'AI gợi ý quán ăn chay cho mình chưa chuẩn lắm, vẫn lẫn mấy quán mặn. Mong team cải thiện.',
      date: '2025-11-09 11:10',
      status: 'approved',
      adminReply:
        'Cảm ơn bạn đã chỉ ra, tụi mình sẽ kiểm tra và huấn luyện lại AI về bộ lọc đồ chay. Xin lỗi bạn nhé.',
      images: [],
    },
    {
      id: 27,
      userName: 'Việt Hoàng',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 5,
      comment:
        'Rất tự hào về project sinh viên này. Tính năng AI hoạt động tốt hơn mình nghĩ. Chúc team sớm ra bản chính thức.',
      date: '2025-11-09 15:00',
      status: 'approved',
      adminReply: 'Tụi mình cảm ơn lời động viên của bạn!',
      images: [],
    },
    {
      id: 28,
      userName: 'Kim Ngân',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment: 'Bộ lọc tìm kiếm (giá, món ăn, khu vực) rõ ràng, dễ thao tác.',
      date: '2025-11-09 17:30',
      status: 'approved',
      adminReply: null,
      images: [],
    },
    {
      id: 29,
      userName: 'Nhật Minh',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 2,
      comment:
        'App hay nhưng mình không tìm thấy nút sửa review đã đăng? Lỡ viết sai chính tả mà không sửa được.',
      date: '2025-11-10 09:20',
      status: 'approved',
      adminReply:
        'Chào bạn, hiện tại app chưa có tính năng này. Tụi mình sẽ bổ sung ngay trong bản cập nhật tới. Cảm ơn bạn đã góp ý!',
      images: [],
    },
    {
      id: 30,
      userName: 'Cẩm Tú',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment:
        'Dùng app để tìm quán cafe yên tĩnh làm việc. AI gợi ý khá chuẩn, mấy quán đều có wifi mạnh, ít ồn.',
      date: '2025-11-10 11:00',
      status: 'approved',
      adminReply: 'Chúc bạn làm việc hiệu quả nhé!',
      images: [],
    },
    {
      id: 31,
      userName: 'Đăng Khoa',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment:
        'App tốt. Nếu có thêm tính năng lưu lại quán ăn yêu thích thì 10 điểm.',
      date: '2025-11-10 14:15',
      status: 'pending',
      adminReply:
        "Góp ý này hay quá! Tụi mình sẽ thêm tính năng 'Wishlist' sớm ạ.",
      images: [],
    },
    {
      id: 32,
      userName: 'Hải Yến',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 5,
      comment:
        'Mình là sinh viên nên rất ủng hộ project này. App hữu ích, giúp mình tìm được nhiều quán ăn vặt rẻ quanh trường.',
      date: '2025-11-10 16:00',
      status: 'approved',
      adminReply: null,
      images: [],
    },
    {
      id: 33,
      userName: 'Phúc Thịnh',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 3,
      comment:
        'App dùng ổn, nhưng icon và hình ảnh minh hoạ nhìn hơi đơn giản. Nếu đầu tư hơn về UI/UX sẽ xịn hơn nhiều.',
      date: '2025-11-11 08:30',
      status: 'approved',
      adminReply:
        'Cảm ơn góp ý chi tiết của bạn. Tụi mình sẽ cải thiện thiết kế giao diện trong các phiên bản sau.',
      images: [],
    },
    {
      id: 34,
      userName: 'Thanh Mai',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment:
        'Mình đã chia sẻ bài review đầu tiên lên Facebook. Bạn bè mình cũng khen giao diện bài chia sẻ đẹp.',
      date: '2025-11-11 10:45',
      status: 'approved',
      adminReply: null,
      images: [],
    },
    {
      id: 35,
      userName: 'Đức Huy',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 5,
      comment:
        'App chạy nhanh, AI thông minh. Không tin nổi đây là sản phẩm của sinh viên. Quá giỏi!',
      date: '2025-11-11 13:00',
      status: 'approved',
      adminReply: 'Cảm ơn bạn đã quá khen! Tụi mình còn phải học hỏi nhiều.',
      images: [],
    },
    {
      id: 36,
      userName: 'Quỳnh Anh',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 3,
      comment:
        'Dữ liệu quán ở khu vực ngoại thành (Bình Chánh, Hóc Môn) còn ít quá. Mong app cập nhật thêm.',
      date: '2025-11-11 15:20',
      status: 'pending',
      adminReply: null,
      images: [],
    },
    {
      id: 37,
      userName: 'Khánh Duy',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment:
        'AI gợi ý quán ăn sáng (bún, phở) khá tốt. Tiết kiệm thời gian suy nghĩ cho mình.',
      date: '2025-11-12 07:15',
      status: 'approved',
      adminReply: null,
      images: [],
    },
    {
      id: 38,
      userName: 'Tường Vy',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment:
        'Thích cách app cho điểm người dùng khi đóng góp review. Có động lực viết bài hơn hẳn.',
      date: '2025-11-12 09:00',
      status: 'approved',
      adminReply: 'Hãy tích cực review để thăng hạng bạn nhé!',
      images: [],
    },
    {
      id: 39,
      userName: 'Gia Khiêm',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 2,
      comment:
        'Tìm kiếm tên quán thỉnh thoảng không ra kết quả, dù gõ đúng tên. Chắc lỗi vặt. Mong team sửa sớm.',
      date: '2025-11-12 10:30',
      status: 'approved',
      adminReply:
        'Cảm ơn bạn đã báo lỗi, tụi mình sẽ kiểm tra lại thuật toán tìm kiếm ngay.',
      images: [],
    },
    {
      id: 40,
      userName: 'Hà My',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 5,
      comment:
        "Dùng app mấy hôm nay thấy rất ưng ý. Nhất là con AI, gợi ý 'ăn gì giá sinh viên' quá chuẩn.",
      date: '2025-11-12 12:00',
      status: 'approved',
      adminReply: 'Tụi mình cũng là sinh viên nên hiểu mà! Cảm ơn bạn.',
      images: [],
    },
    {
      id: 41,
      userName: 'Chấn Hưng',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment:
        'App tốt, nên có thêm tính năng đặt bàn hoặc liên kết với các app giao đồ ăn thì tuyệt vời.',
      date: '2025-11-12 14:10',
      status: 'approved',
      adminReply:
        'Đây là những tính năng tụi mình sẽ phát triển trong tương lai. Cảm ơn ý tưởng của bạn!',
      images: [],
    },
    {
      id: 42,
      userName: 'Thanh Thảo',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment: 'Dùng ổn định, chưa thấy bị lỗi văng app lần nào. Cho 4 sao.',
      date: '2025-11-12 16:30',
      status: 'approved',
      adminReply: null,
      images: [],
    },
    {
      id: 43,
      userName: 'Hoài Nam',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 3,
      comment:
        'Giao diện đăng bài review hơi đơn giản. Nếu cho chỉnh font, in đậm, chèn ảnh vào giữa bài viết thì tốt hơn.',
      date: '2025-11-13 08:00',
      status: 'pending',
      adminReply: null,
      images: [],
    },
    {
      id: 44,
      userName: 'Mỹ Tâm',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 5,
      comment:
        'Biết các bạn làm project này vất vả. Sản phẩm chạy tốt, ý tưởng hay. 5 sao động viên team!',
      date: '2025-11-13 09:15',
      status: 'approved',
      adminReply: 'Trời ơi cảm ơn bạn nhiều lắm! Tụi mình sẽ cố gắng hơn nữa.',
      images: [],
    },
    {
      id: 45,
      userName: 'Trọng Nhân',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment:
        "Tính năng AI gợi ý 'quán đang hot' khá hay, giúp mình bắt trend nhanh.",
      date: '2025-11-13 09:45',
      status: 'approved',
      adminReply: null,
      images: [],
    },
    {
      id: 46,
      userName: 'Tố Quyên',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 3,
      comment:
        'Mình đăng review mà đang chờ duyệt (pending) hơi lâu. Mong ad duyệt nhanh để bài mình được đăng nhé.',
      date: '2025-11-13 10:00',
      status: 'pending',
      adminReply:
        'Tụi mình thấy review của bạn rồi và sẽ duyệt ngay trong vài phút nữa ạ. Cảm ơn bạn.',
      images: [],
    },
    {
      id: 47,
      userName: 'Đức Phúc',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment: 'App dùng ít tốn pin. Giao diện thân thiện. Ủng hộ các bạn.',
      date: '2025-11-13 10:15',
      status: 'approved',
      adminReply: null,
      images: [],
    },
    {
      id: 48,
      userName: 'Xuân An',
      userAvatar: 'https://via.placeholder.com/40',
      rating: 5,
      comment:
        'Mới dùng hôm nay mà thích liền. Con AI gợi ý quán bún bò gần chỗ làm cho mình ngon xuất sắc. Sẽ giới thiệu bạn bè dùng.',
      date: '2025-11-13 10:30',
      status: 'approved',
      adminReply:
        'Cảm ơn bạn đã tin tưởng AI của tụi mình. Giới thiệu bạn bè giúp tụi mình nhé!',
      images: [],
    },
  ])

  // Mock data - Báo cáo vi phạm
  const [reports, setReports] = useState([
    {
      id: 1,
      reviewId: 3,
      reporterName: 'User X',
      reason: 'Ngôn từ không phù hợp',
      description: 'Đánh giá có từ ngữ xúc phạm',
      date: '2024-01-13 21:00',
      status: 'pending', // pending, resolved, rejected
      review: {
        userName: 'Lê Minh C',
        restaurantName: 'Cơm Tấm 24h',
        rating: 1,
        comment: 'Không sạch sẽ, thái độ phục vụ tệ',
      },
    },
    {
      id: 2,
      reviewId: 5,
      reporterName: 'User Y',
      reason: 'Spam',
      description: 'Đánh giá spam nhiều lần',
      date: '2024-01-11 09:30',
      status: 'resolved',
      review: {
        userName: 'Spammer',
        restaurantName: 'Quán ABC',
        rating: 5,
        comment: 'Click vào link này để nhận ưu đãi...',
      },
    },
  ])

  // Filter reviews
  const filteredReviews = reviews.filter((review) => {
    const matchSearch =
      review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())

    const matchStatus = filterStatus === 'all' || review.status === filterStatus
    const matchRating =
      filterRating === 'all' || review.rating === parseInt(filterRating)

    return matchSearch && matchStatus && matchRating
  })

  // Filter reports
  const filteredReports = reports.filter((report) => {
    const matchSearch =
      report.reporterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchTerm.toLowerCase())

    const matchStatus = filterStatus === 'all' || report.status === filterStatus

    return matchSearch && matchStatus
  })

  // Statistics
  const stats = {
    total: reviews.length,
    approved: reviews.filter((r) => r.status === 'approved').length,
    pending: reviews.filter((r) => r.status === 'pending').length,
    hidden: reviews.filter((r) => r.status === 'hidden').length,
    reports: reports.filter((r) => r.status === 'pending').length,
  }

  // Handle actions
  const handleApprove = (id) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
    )
  }

  const handleHide = (id) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, status: 'hidden' } : r))
    )
  }

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
      setReviews(reviews.filter((r) => r.id !== id))
    }
  }

  const handleReply = (review) => {
    setSelectedReview(review)
    setReplyText(review.adminReply || '')
    setShowReplyModal(true)
  }

  const handleSubmitReply = () => {
    setReviews(
      reviews.map((r) =>
        r.id === selectedReview.id ? { ...r, adminReply: replyText } : r
      )
    )
    setShowReplyModal(false)
    setSelectedReview(null)
    setReplyText('')
  }

  const handleResolveReport = (id) => {
    setReports(
      reports.map((r) => (r.id === id ? { ...r, status: 'resolved' } : r))
    )
  }

  const handleRejectReport = (id) => {
    setReports(
      reports.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r))
    )
  }

  // Render stars
  const renderStars = (rating) => {
    return (
      <div className='star-rating'>
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} size={16} filled={i < rating} color='#f59e0b' />
        ))}
      </div>
    )
  }

  return (
    <div className='review-management'>
      {/* Statistics Cards */}
      <div className='review-stats'>
        <div className='stat-card blue'>
          <div className='stat-label'>Tổng Đánh Giá</div>
          <div className='stat-value'>{stats.total}</div>
        </div>
        <div className='stat-card green'>
          <div className='stat-label'>Đã Duyệt</div>
          <div className='stat-value'>{stats.approved}</div>
        </div>
        <div className='stat-card orange'>
          <div className='stat-label'>Chờ Duyệt</div>
          <div className='stat-value'>{stats.pending}</div>
        </div>
        <div className='stat-card red'>
          <div className='stat-label'>Đã Ẩn</div>
          <div className='stat-value'>{stats.hidden}</div>
        </div>
        <div className='stat-card purple'>
          <div className='stat-label'>Báo Cáo Vi Phạm</div>
          <div className='stat-value'>{stats.reports}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className='review-tabs'>
        <button
          className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Danh Sách Đánh Giá
        </button>
        <button
          className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          Báo Cáo Vi Phạm ({stats.reports})
        </button>
      </div>

      {/* Filters */}
      <div className='review-filters'>
        <div className='search-box'>
          <SearchIcon size={20} />
          <input
            type='text'
            placeholder={
              activeTab === 'reviews'
                ? 'Tìm theo tên, nhà hàng, nội dung...'
                : 'Tìm theo người báo cáo, lý do...'
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className='filter-select'
        >
          {activeTab === 'reviews' ? (
            <>
              <option value='all'>Tất cả trạng thái</option>
              <option value='approved'>Đã duyệt</option>
              <option value='pending'>Chờ duyệt</option>
              <option value='hidden'>Đã ẩn</option>
            </>
          ) : (
            <>
              <option value='all'>Tất cả trạng thái</option>
              <option value='pending'>Chờ xử lý</option>
              <option value='resolved'>Đã xử lý</option>
              <option value='rejected'>Đã từ chối</option>
            </>
          )}
        </select>
        {activeTab === 'reviews' && (
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className='filter-select'
          >
            <option value='all'>Tất cả đánh giá</option>
            <option value='5'>5 sao</option>
            <option value='4'>4 sao</option>
            <option value='3'>3 sao</option>
            <option value='2'>2 sao</option>
            <option value='1'>1 sao</option>
          </select>
        )}
      </div>

      {/* Content */}
      {activeTab === 'reviews' ? (
        <div className='reviews-list'>
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div key={review.id} className={`review-card ${review.status}`}>
                <div className='review-header'>
                  <div className='user-info'>
                    <img
                      src={review.userAvatar}
                      alt={review.userName}
                      className='user-avatar'
                    />
                    <div>
                      <h4>{review.userName}</h4>
                      <p className='restaurant-name'>{review.restaurantName}</p>
                    </div>
                  </div>
                  <div className='review-meta'>
                    {renderStars(review.rating)}
                    <span className='review-date'>{review.date}</span>
                    <span className={`status-badge ${review.status}`}>
                      {review.status === 'approved' ? (
                        <>
                          <CheckCircleIcon size={14} /> Đã duyệt
                        </>
                      ) : review.status === 'pending' ? (
                        <>
                          <EyeIcon size={14} /> Chờ duyệt
                        </>
                      ) : (
                        <>
                          <XCircleIcon size={14} /> Đã ẩn
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div className='review-content'>
                  <p>{review.comment}</p>
                </div>

                {review.adminReply && (
                  <div className='admin-reply'>
                    <strong>Phản hồi của Admin:</strong>
                    <p>{review.adminReply}</p>
                  </div>
                )}

                <div className='review-actions'>
                  {review.status !== 'approved' && (
                    <button
                      className='action-btn approve'
                      onClick={() => handleApprove(review.id)}
                    >
                      <CheckCircleIcon size={18} /> Duyệt
                    </button>
                  )}
                  {review.status !== 'hidden' && (
                    <button
                      className='action-btn hide'
                      onClick={() => handleHide(review.id)}
                    >
                      <XCircleIcon size={18} /> Ẩn
                    </button>
                  )}
                  <button
                    className='action-btn reply'
                    onClick={() => handleReply(review)}
                  >
                    <EditIcon size={18} />{' '}
                    {review.adminReply ? 'Sửa trả lời' : 'Trả lời'}
                  </button>
                  <button
                    className='action-btn delete'
                    onClick={() => handleDelete(review.id)}
                  >
                    <TrashIcon size={18} /> Xóa
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className='no-data'>Không tìm thấy đánh giá nào</div>
          )}
        </div>
      ) : (
        <div className='reports-list'>
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <div key={report.id} className={`report-card ${report.status}`}>
                <div className='report-header'>
                  <div className='report-info'>
                    <h4>Báo cáo #{report.id}</h4>
                    <p>
                      Người báo cáo: <strong>{report.reporterName}</strong>
                    </p>
                    <p className='report-date'>{report.date}</p>
                  </div>
                  <span className={`status-badge ${report.status}`}>
                    {report.status === 'pending'
                      ? 'Chờ xử lý'
                      : report.status === 'resolved'
                      ? 'Đã xử lý'
                      : 'Đã từ chối'}
                  </span>
                </div>

                <div className='report-reason'>
                  <strong>Lý do:</strong> {report.reason}
                  <p>{report.description}</p>
                </div>

                <div className='reported-review'>
                  <h5>Đánh giá bị báo cáo:</h5>
                  <div className='review-preview'>
                    <div className='preview-header'>
                      <span>{report.review.userName}</span>
                      {renderStars(report.review.rating)}
                    </div>
                    <p className='preview-restaurant'>
                      {report.review.restaurantName}
                    </p>
                    <p className='preview-comment'>{report.review.comment}</p>
                  </div>
                </div>

                {report.status === 'pending' && (
                  <div className='report-actions'>
                    <button
                      className='action-btn approve'
                      onClick={() => handleResolveReport(report.id)}
                    >
                      <CheckCircleIcon size={18} /> Xử lý
                    </button>
                    <button
                      className='action-btn reject'
                      onClick={() => handleRejectReport(report.id)}
                    >
                      <XCircleIcon size={18} /> Từ chối
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className='no-data'>Không tìm thấy báo cáo nào</div>
          )}
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && (
        <div className='modal-overlay' onClick={() => setShowReplyModal(false)}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <div className='modal-header'>
              <h3>Trả lời đánh giá</h3>
              <button
                className='close-btn'
                onClick={() => setShowReplyModal(false)}
              >
                ×
              </button>
            </div>
            <div className='modal-body'>
              <div className='review-info'>
                <p>
                  <strong>Người dùng:</strong> {selectedReview?.userName}
                </p>
                <p>
                  <strong>Nhà hàng:</strong> {selectedReview?.restaurantName}
                </p>
                <p>
                  <strong>Đánh giá:</strong> {selectedReview?.comment}
                </p>
              </div>
              <textarea
                className='reply-textarea'
                placeholder='Nhập phản hồi của bạn...'
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={5}
              />
            </div>
            <div className='modal-footer'>
              <button
                className='btn-cancel'
                onClick={() => setShowReplyModal(false)}
              >
                Hủy
              </button>
              <button className='btn-submit' onClick={handleSubmitReply}>
                Gửi phản hồi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewManagement
