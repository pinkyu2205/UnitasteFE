// src/pages/PrivacyPolicy/PrivacyPolicy.jsx
import Header from '../HomePage/components/Header'
import './PrivacyPolicy.css'

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <div className='privacy-page'>
        <div className='privacy-container'>
          {/* Header Section */}
          <div className='privacy-header'>
            <h1>Chính sách bảo mật – UniTaste</h1>
            <p className='privacy-update-date'>Cập nhật lần cuối: 02/11/2025</p>
          </div>

          {/* Introduction */}
          <div className='privacy-section'>
            <p className='privacy-intro'>
              UniTaste (sau đây gọi là "chúng tôi") tôn trọng quyền riêng tư của người dùng. 
              Cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu người dùng tuân theo Chính sách 
              bảo mật này. Chính sách áp dụng cho trang web và/hoặc các ứng dụng di động chính thức 
              của UniTaste. Vui lòng đọc kỹ; nếu bạn không đồng ý với Chính sách này, vui lòng không 
              truy cập hoặc sử dụng dịch vụ của chúng tôi.
            </p>
            <p className='privacy-intro'>
              Chúng tôi có thể thay đổi Chính sách này bất kỳ lúc nào vì bất kỳ lý do gì. Thời điểm 
              cập nhật gần nhất sẽ được thể hiện ở đầu tài liệu này. Mọi thay đổi có hiệu lực ngay 
              khi Chính sách được đăng tải.
            </p>
          </div>

          {/* Section 1 */}
          <div className='privacy-section'>
            <h2>1) Thu thập thông tin của bạn</h2>
            <p>
              Chúng tôi có thể thu thập thông tin về bạn theo nhiều cách. Các loại thông tin có thể bao gồm:
            </p>

            <h3>a) Dữ liệu cá nhân</h3>
            <p>Là các thông tin giúp nhận dạng bạn, ví dụ:</p>
            <ul>
              <li>
                Tên, ngày sinh, địa chỉ email, số điện thoại, ảnh đại diện, quê quán, sở thích, 
                nền tảng giáo dục;
              </li>
              <li>
                Lượt thích, nhận xét, nội dung bạn cung cấp khi tham gia các hoạt động trên trang/ứng dụng 
                (tạo tài khoản, để lại đánh giá/bình luận…).
              </li>
            </ul>
            <p>
              Một số thông tin có thể là bắt buộc để sử dụng tính năng; số khác là tùy chọn. 
              Bạn không bắt buộc cung cấp, nhưng nếu từ chối, có thể không sử dụng được một số chức năng.
            </p>

            <h3>b) Dữ liệu dẫn xuất</h3>
            <p>
              Thông tin máy chủ thu thập tự động, ví dụ: địa chỉ IP, vị trí gần đúng, trình duyệt, 
              thông tin thiết bị, hệ điều hành.
            </p>

            <h3>c) Quyền của Facebook và Google</h3>
            <p>
              Nếu bạn đăng ký/đăng nhập qua Facebook hoặc Google, chúng tôi có thể truy cập một số 
              thông tin cơ bản bạn đã công khai (ví dụ: tên, giới tính, ngày sinh, ảnh hồ sơ).
            </p>
            <p>
              Để biết thêm: vui lòng xem trang Tài liệu về quyền của Facebook và Các trang web & 
              ứng dụng của bên thứ ba có quyền truy cập vào tài khoản Google.
            </p>

            <h3>d) Dữ liệu thiết bị di động</h3>
            <p>
              Khi truy cập từ thiết bị di động: ID thiết bị, kiểu máy, nhà sản xuất, thông tin vị trí 
              (nếu bạn cho phép).
            </p>
          </div>

          {/* Section 2 */}
          <div className='privacy-section'>
            <h2>2) Cách chúng tôi sử dụng thông tin</h2>
            <p>
              Chúng tôi xử lý dữ liệu để cung cấp quyền truy cập trơn tru và hiệu quả, bao gồm:
            </p>
            <ul>
              <li>Tổng hợp thông tin người dùng vào cơ sở dữ liệu nội bộ;</li>
              <li>Tạo và quản lý tài khoản;</li>
              <li>Phân tích dữ liệu thống kê ẩn danh cho mục đích nội bộ hoặc với bên thứ ba;</li>
              <li>Cung cấp quảng cáo;</li>
              <li>Gửi email về tài khoản/hoạt động của bạn;</li>
              <li>Gửi bản tin (nếu bạn đăng ký);</li>
              <li>Giải quyết tranh chấp, khắc phục sự cố;</li>
              <li>Hỗ trợ và chăm sóc khách hàng.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className='privacy-section'>
            <h2>3) Quyền sử dụng và chia sẻ thông tin</h2>
            <p>Chúng tôi có thể chia sẻ thông tin trong một số trường hợp:</p>

            <h3>a) Nhà cung cấp dịch vụ bên thứ ba</h3>
            <p>
              Chúng tôi có thể chia sẻ thông tin với các nhà cung cấp dịch vụ (ví dụ: lưu trữ, phân tích, 
              email, thanh toán) để họ thực hiện dịch vụ thay mặt chúng tôi, theo hợp đồng và nghĩa vụ 
              bảo mật hiện hành.
            </p>

            <h3>b) Tương tác với người dùng khác</h3>
            <p>
              Khi tương tác trên nền tảng, những người dùng khác có thể thấy tên hiển thị, ảnh đại diện 
              và/hoặc bút danh của bạn.
            </p>

            <h3>c) Bài đăng công khai</h3>
            <p>
              Bài viết/bình luận bạn đăng có thể được xem công khai trên nền tảng và có thể được phân 
              phối lại bên ngoài.
            </p>

            <h3>d) Nhà quảng cáo bên thứ ba</h3>
            <p>
              Chúng tôi có thể cho phép các đối tác quảng cáo sử dụng cookie/ID tương tự để hiển thị 
              quảng cáo phù hợp sở thích.
            </p>

            <h3>e) Đơn vị liên kết (Affiliates)</h3>
            <p>
              Chúng tôi có thể chia sẻ với công ty mẹ, công ty con, đối tác liên doanh hoặc đơn vị dưới 
              cùng sự kiểm soát, với yêu cầu tuân thủ Chính sách này.
            </p>

            <h3>f) Đối tác kinh doanh</h3>
            <p>
              Chúng tôi có thể chia sẻ để đồng cung cấp sản phẩm/dịch vụ/chương trình khuyến mại.
            </p>

            <h3>g) Các bên thứ ba khác</h3>
            <p>
              Chúng tôi có thể chia sẻ thông tin tổng hợp/ẩn danh với nhà quảng cáo/nhà đầu tư cho mục 
              đích phân tích kinh doanh hoặc tiếp thị trong phạm vi pháp luật cho phép.
            </p>
          </div>

          {/* Section 4 */}
          <div className='privacy-section'>
            <h2>4) Công nghệ theo dõi</h2>

            <h3>a) Cookies</h3>
            <p>
              Chúng tôi sử dụng cookie để cải thiện trải nghiệm. Hầu hết trình duyệt mặc định cho phép 
              cookie; bạn có thể tắt, nhưng một số chức năng có thể bị ảnh hưởng.
            </p>

            <h3>b) Quảng cáo trực tuyến</h3>
            <p>
              Chúng tôi có thể sử dụng phần mềm bên thứ ba để phân phát quảng cáo, email marketing, 
              chiến dịch tương tác. Các công cụ này có thể dùng cookie/công nghệ theo dõi tương tự để 
              tối ưu trải nghiệm. Bạn có thể từ chối quảng cáo dựa trên sở thích qua Network Advertising 
              Initiative Opt-Out Tool hoặc Digital Advertising Alliance Opt-Out Tool.
            </p>

            <h3>c) Phân tích dữ liệu</h3>
            <p>
              Chúng tôi có thể dùng dữ liệu ẩn danh với nhà cung cấp như Google Analytics để phân tích 
              và theo dõi hành vi sử dụng. Khi tiếp tục sử dụng, bạn đồng ý với việc xử lý này cho mục 
              đích nội bộ.
            </p>
          </div>

          {/* Section 5 */}
          <div className='privacy-section'>
            <h2>5) Liên kết đến trang web bên thứ ba</h2>
            <p>
              Nền tảng UniTaste có thể chứa liên kết đến website/dịch vụ của bên thứ ba. Khi bạn nhấp vào, 
              mọi thông tin bạn cung cấp cho bên đó sẽ không thuộc phạm vi Chính sách này. Chúng tôi không 
              chịu trách nhiệm về nội dung/chính sách của các bên thứ ba.
            </p>
          </div>

          {/* Section 6 */}
          <div className='privacy-section'>
            <h2>6) Bảo mật thông tin của bạn</h2>
            <p>
              Chúng tôi áp dụng biện pháp hành chính và kỹ thuật hợp lý để bảo vệ dữ liệu cá nhân. 
              Tuy nhiên, không có phương thức nào an toàn tuyệt đối; dữ liệu truyền qua Internet có thể 
              bị can thiệp trái phép. Do đó, chúng tôi không thể đảm bảo an ninh tuyệt đối cho mọi thông 
              tin bạn cung cấp.
            </p>
          </div>

          {/* Section 7 */}
          <div className='privacy-section'>
            <h2>7) Lựa chọn về thông tin của bạn</h2>

            <h3>a) Thông tin tài khoản</h3>
            <p>
              Bạn có thể xem/chỉnh sửa thông tin tài khoản bằng cách đăng nhập và thay đổi trong phần 
              cài đặt.
            </p>

            <h3>b) Chấm dứt tài khoản</h3>
            <p>
              Khi bạn yêu cầu xóa tài khoản, chúng tôi sẽ xóa tài khoản và thông tin của bạn khỏi hệ 
              thống và cơ sở dữ liệu đang hoạt động (một số dữ liệu có thể được lưu trữ theo yêu cầu 
              pháp luật hoặc cho mục đích hợp pháp khác, nếu có).
            </p>
          </div>

          {/* Section 8 */}
          <div className='privacy-section'>
            <h2>8) Liên hệ</h2>
            <p>
              Nếu có câu hỏi về Chính sách bảo mật, vui lòng liên hệ bộ phận hỗ trợ của UniTaste.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicy

