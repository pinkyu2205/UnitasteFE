// src/pages/TermsOfService/TermsOfService.jsx
import Header from '../HomePage/components/Header'
import './TermsOfService.css'

const TermsOfService = () => {
  return (
    <>
      <Header />
      <div className='terms-page'>
        <div className='terms-container'>
          {/* Header Section */}
          <div className='terms-header'>
            <h1>Điều khoản sử dụng – UniTaste</h1>
            <p className='terms-update-date'>Cập nhật lần cuối: 02/11/2025</p>
          </div>

          {/* Introduction */}
          <div className='terms-section'>
            <p className='terms-intro'>
              Tài liệu này quy định điều khoản sử dụng ("Thỏa thuận") áp dụng cho việc truy cập và/hoặc 
              sử dụng trang web/ứng dụng do <strong>UniTaste</strong> vận hành, bao gồm nhưng không giới hạn 
              tại <strong>[tên miền chính thức của UniTaste]</strong> và các ứng dụng di động chính thức của 
              UniTaste (gọi chung là "Dịch vụ"). Bằng việc đăng ký tài khoản hoặc sử dụng Dịch vụ, Người Sử 
              Dụng xác nhận đã đọc, hiểu và đồng ý tuân thủ Thỏa thuận này.
            </p>
          </div>

          {/* Section 1 */}
          <div className='terms-section'>
            <h2>Điều 1. Phạm vi áp dụng & chấp thuận điều khoản</h2>
            <ol>
              <li>
                Trước khi đăng ký tài khoản, Người Sử Dụng xác nhận đã đọc, hiểu và đồng ý với toàn bộ 
                Thỏa thuận này bằng việc hoàn tất đăng ký và/hoặc tiếp tục sử dụng Dịch vụ.
              </li>
              <li>
                Khi sử dụng Dịch vụ, Người Sử Dụng cam kết có đầy đủ năng lực hành vi dân sự theo quy định 
                pháp luật hoặc đã được sự đồng ý của cha/mẹ hoặc người giám hộ hợp pháp.
              </li>
              <li>
                Bằng việc đăng ký tài khoản, Người Sử Dụng cam kết:
                <ul>
                  <li>
                    Cung cấp thông tin chính xác, đầy đủ (họ tên; ngày, tháng, năm sinh; số CMND/CCCD/hộ chiếu, 
                    ngày cấp, nơi cấp; thông tin liên hệ…) và chịu trách nhiệm về tính chính xác của các thông tin 
                    đã cung cấp, cũng như cập nhật khi có thay đổi.
                  </li>
                  <li>
                    Thừa nhận rằng mọi nội dung do Người Sử Dụng đăng tải/chia sẻ ("Thông tin") là do Người Sử 
                    Dụng chịu trách nhiệm. UniTaste có cơ chế rà soát, phát hiện, xử lý vi phạm theo quy định 
                    pháp luật Việt Nam và Quy chế nội bộ.
                  </li>
                </ul>
              </li>
              <li>
                Thông tin liên hệ hỗ trợ 24/7: <strong>[Unitasteplastform@gmail.com]</strong>.
              </li>
            </ol>
          </div>

          {/* Section 2 */}
          <div className='terms-section'>
            <h2>Điều 2. Quy định về tên tài khoản, ảnh đại diện và nội dung hiển thị công khai</h2>
            <ol>
              <li>
                <strong>Tên tài khoản/nhân vật</strong> không được:
                <ul>
                  <li>
                    Trùng hoặc tương tự gây nhầm lẫn với tên danh nhân; lãnh đạo; tổ chức khủng bố, phát xít; 
                    tội phạm; các tổ chức/cá nhân chống lại Nhà nước CHXHCN Việt Nam; hoặc gây phương hại đến 
                    an ninh quốc gia, trật tự an toàn xã hội.
                  </li>
                  <li>
                    Trùng hoặc tương tự gây nhầm lẫn với tên/viết tắt cơ quan Nhà nước; tổ chức chính trị, 
                    chính trị – xã hội; nghề nghiệp; tổ chức quốc tế.
                  </li>
                  <li>
                    Giả mạo tổ chức/cá nhân khác nhằm đưa thông tin sai sự thật, xuyên tạc, vu khống, xúc phạm 
                    danh dự, nhân phẩm.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Ảnh đại diện & hình ảnh sử dụng</strong> không được:
                <ul>
                  <li>Xâm phạm quyền sở hữu trí tuệ của bên thứ ba.</li>
                  <li>
                    Chứa nội dung bạo lực, khiêu dâm, đồi trụy; cổ súy tội ác, tệ nạn xã hội; mê tín dị đoan; 
                    trái thuần phong mỹ tục.
                  </li>
                  <li>
                    Xúc phạm danh nhân, anh hùng dân tộc, lãnh đạo Đảng và Nhà nước; lãnh đạo các tổ chức quốc tế.
                  </li>
                  <li>
                    Chứa biểu tượng/cờ/huy hiệu/tên viết tắt/tên đầy đủ của cơ quan, tổ chức ở mức gây nhầm lẫn 
                    hoặc làm ảnh hưởng uy tín các tổ chức này; hoặc kích động chia rẽ tôn giáo, dân tộc.
                  </li>
                  <li>
                    Sử dụng hình ảnh, dấu hiệu, logo tương tự gây nhầm lẫn với thương hiệu, nền tảng, sản phẩm/dịch 
                    vụ của UniTaste khi chưa có chấp thuận bằng văn bản.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Xử lý vi phạm</strong>: Tài khoản vi phạm quy định tại Điều này có thể bị khóa tạm thời 
                hoặc xóa vĩnh viễn mà không cần thông báo trước.
              </li>
            </ol>
          </div>

          {/* Section 3 */}
          <div className='terms-section'>
            <h2>Điều 3. Nội dung cung cấp, trao đổi thông tin</h2>
            <ol>
              <li>
                Người Sử Dụng có thể cung cấp/trao đổi thông tin (văn bản, hình ảnh, âm thanh, video, dữ liệu số…) 
                phù hợp phạm vi hoạt động của nền tảng UniTaste, không vi phạm pháp luật, thuần phong mỹ tục và 
                Thỏa thuận này.
              </li>
              <li>
                Nội dung đăng ở từng chuyên mục phải phù hợp mục đích cung cấp thông tin của UniTaste.
              </li>
              <li>
                UniTaste <strong>không chấp nhận</strong> các hành vi xâm phạm bản quyền/quyền sở hữu trí tuệ; 
                sẽ gỡ bỏ nội dung khi có căn cứ hợp lý hoặc theo yêu cầu hợp pháp từ chủ thể quyền/cơ quan có 
                thẩm quyền.
              </li>
              <li>
                Người Sử Dụng chịu trách nhiệm dân sự, hành chính hoặc hình sự (nếu có) đối với hành vi xâm phạm 
                quyền tác giả/quyền liên quan.
              </li>
              <li>
                Người Sử Dụng đồng ý cho Ban Quản Trị quyền sử dụng miễn phí, biên tập, tổng hợp các ý tưởng/đề 
                xuất/bình luận do Người Sử Dụng tự nguyện cung cấp, theo phạm vi luật pháp cho phép.
              </li>
              <li>
                UniTaste <strong>không bảo đảm</strong> tính chính xác, hữu ích, an toàn hoặc quyền sở hữu trí tuệ 
                đối với nội dung do người dùng khác đăng tải; Người Sử Dụng tự chịu rủi ro khi truy cập/ sử dụng 
                các nội dung đó. Khi phát hiện vi phạm, vui lòng thông báo <strong>[Unitasteplastform@gmail.com]</strong> để được xử lý.
              </li>
            </ol>
          </div>

          {/* Section 4 */}
          <div className='terms-section'>
            <h2>Điều 4. Các nội dung bị cấm</h2>
            <p>Bao gồm nhưng không giới hạn:</p>
            <ol>
              <li>
                Chống Nhà nước CHXHCN Việt Nam; xâm phạm an ninh quốc gia, trật tự an toàn xã hội; tổ chức, 
                xúi giục, lôi kéo người khác chống phá Nhà nước.
              </li>
              <li>Tuyên truyền chiến tranh, khủng bố; xúi giục phạm tội.</li>
              <li>
                Xuyên tạc lịch sử; phủ nhận thành tựu cách mạng; phá hoại khối đại đoàn kết; xúc phạm tôn giáo; 
                kích động hận thù, kỳ thị.
              </li>
              <li>
                Kích động bạo lực; đồi trụy, khiêu dâm; tệ nạn xã hội; mê tín dị đoan; trái thuần phong mỹ tục.
              </li>
              <li>
                Tiết lộ bí mật Nhà nước; bí mật quân sự, an ninh, kinh tế, đối ngoại; bí mật khác theo luật định.
              </li>
              <li>
                Xuyên tạc, vu khống, xúc phạm uy tín tổ chức, danh dự/nhân phẩm cá nhân.
              </li>
              <li>
                Quảng cáo, mua bán hàng hóa/dịch vụ bị cấm; phát tán ấn phẩm bị cấm.
              </li>
              <li>
                Giả mạo tổ chức/cá nhân; phát tán thông tin giả mạo, sai sự thật xâm hại quyền, lợi ích hợp pháp 
                của tổ chức/cá nhân.
              </li>
              <li>
                Xâm phạm quyền sở hữu trí tuệ và các quyền, lợi ích hợp pháp khác.
              </li>
            </ol>
          </div>

          {/* Section 5 */}
          <div className='terms-section'>
            <h2>Điều 5. Hành vi bị cấm khác về an toàn hệ thống</h2>
            <ol>
              <li>
                Cản trở trái phép hoạt động của hệ thống thông tin, hạ tầng mạng; truy cập trái phép, chiếm quyền 
                điều khiển, cài đặt/phát tán mã độc, vi rút; tạo công cụ tấn công.
              </li>
              <li>
                Sử dụng trái phép mật khẩu/khóa mật mã; xâm phạm dữ liệu cá nhân, tài nguyên Internet.
              </li>
              <li>
                Tạo liên kết trái phép, giả mạo giao diện, can thiệp vào Dịch vụ, làm tổn hại uy tín UniTaste.
              </li>
              <li>
                Phát tán, cổ vũ hoạt động xâm nhập, phá hoại dữ liệu/hệ thống; đăng nhập trái phép hoặc thử truy 
                cập trái phép.
              </li>
              <li>
                Quấy rối, xúc phạm, làm phiền người dùng khác.
              </li>
              <li>
                Quảng bá trái với Thỏa thuận và chính sách quảng cáo của UniTaste.
              </li>
              <li>
                Đánh bạc/tổ chức đánh bạc; các hành vi bị cấm khác theo pháp luật.
              </li>
            </ol>
          </div>

          {/* Section 6 */}
          <div className='terms-section'>
            <h2>Điều 6. Quyền và nghĩa vụ của Người Sử Dụng</h2>
            
            <h3>Quyền</h3>
            <ol>
              <li>
                Đăng ký tài khoản; thay đổi/bổ sung thông tin cá nhân; thay đổi mật khẩu.
              </li>
              <li>
                Được bảo đảm bí mật thông tin cá nhân theo Chính sách bảo mật của UniTaste và pháp luật.
              </li>
            </ol>

            <h3>Nghĩa vụ</h3>
            <ol>
              <li>
                Cung cấp thông tin trung thực, chính xác khi đăng ký và trong quá trình sử dụng; tự bảo mật tài 
                khoản (mật khẩu, email, số điện thoại bảo vệ, thông tin định danh…).
              </li>
              <li>
                Thông báo ngay cho UniTaste khi phát hiện sử dụng trái phép tài khoản hoặc vi phạm bảo mật qua 
                <strong> [Unitasteplastform@gmail.com]</strong>.
              </li>
              <li>
                Chịu trách nhiệm trước pháp luật về nội dung do mình cung cấp, truyền đưa, lưu trữ trên nền tảng/Internet.
              </li>
              <li>
                Bồi thường toàn bộ thiệt hại cho UniTaste nếu vi phạm Thỏa thuận/pháp luật gây thiệt hại về tài sản/uy tín.
              </li>
              <li>
                Tuân thủ quy định về an toàn, an ninh thông tin và quy định pháp luật liên quan.
              </li>
            </ol>
          </div>

          {/* Section 7 */}
          <div className='terms-section'>
            <h2>Điều 7. Quyền và trách nhiệm của UniTaste</h2>
            
            <h3>Quyền</h3>
            <ol>
              <li>
                Khóa/xóa tài khoản, từ chối hỗ trợ nếu Người Sử Dụng cung cấp thông tin không trung thực/không 
                chính xác hoặc vi phạm Thỏa thuận.
              </li>
              <li>
                Khi phát hiện vi phạm pháp luật/Thỏa thuận: (i) tước bỏ quyền lợi liên quan; (ii) khóa/xóa tài khoản 
                mà không cần chấp thuận của Người Sử Dụng; (iii) chuyển thông tin cho cơ quan chức năng theo quy định 
                pháp luật.
              </li>
            </ol>

            <h3>Trách nhiệm</h3>
            <ol>
              <li>
                Hỗ trợ Người Sử Dụng trong quá trình sử dụng Dịch vụ trong phạm vi thẩm quyền.
              </li>
              <li>
                Tiếp nhận, xử lý khiếu nại theo pháp luật và quy định nội bộ; chỉ hỗ trợ đối với tài khoản đăng ký 
                đầy đủ, trung thực, chính xác.
              </li>
              <li>
                Bảo mật thông tin cá nhân theo Chính sách bảo mật và pháp luật hiện hành; không bán/trao đổi thông tin 
                cá nhân cho bên thứ ba, trừ trường hợp pháp luật yêu cầu hoặc theo Thỏa thuận này.
              </li>
            </ol>
          </div>

          {/* Section 8 */}
          <div className='terms-section'>
            <h2>Điều 8. Quyền sở hữu trí tuệ</h2>
            <ol>
              <li>
                UniTaste sở hữu hoặc được cấp phép hợp pháp đối với toàn bộ quyền sở hữu trí tuệ liên quan đến Dịch vụ, 
                bao gồm nhưng không giới hạn: quyền tác giả/quyền liên quan, nhãn hiệu, kiểu dáng, sáng chế, bí mật kinh 
                doanh, chống cạnh tranh không lành mạnh…
              </li>
              <li>
                Mọi việc sử dụng tài sản sở hữu trí tuệ của UniTaste phải có <strong>văn bản chấp thuận</strong> trước của 
                UniTaste. Ngoài phạm vi được cấp phép bằng văn bản, Người Sử Dụng không được ngụ ý có bất kỳ quyền nào.
              </li>
            </ol>
          </div>

          {/* Section 9 */}
          <div className='terms-section'>
            <h2>Điều 9. Cơ chế xử lý vi phạm</h2>
            <ol>
              <li>
                Tùy mức độ vi phạm, UniTaste có thể áp dụng một hoặc nhiều biện pháp: cảnh báo; khóa 7 ngày; khóa 30 ngày; 
                khóa vĩnh viễn; thu hồi quyền lợi; thông báo cơ quan có thẩm quyền; các biện pháp pháp lý khác.
              </li>
              <li>
                <strong>Ví dụ</strong>:
                <ul>
                  <li>
                    <strong>Mức 1 – Khóa 7 ngày</strong>: Lôi kéo vi phạm; xúc phạm, xuyên tạc, xúc phạm nhân phẩm thành 
                    viên khác ở mức độ nhẹ.
                  </li>
                  <li>
                    <strong>Mức 2 – Khóa 30 ngày</strong>: Nội dung khiêu dâm mức độ nhẹ; spam; kích động gây rối; xâm phạm 
                    đời tư; công khai dữ liệu cá nhân trái phép; vi phạm bản quyền/sao chép không phép.
                  </li>
                  <li>
                    <strong>Mức 3 – Khóa vĩnh viễn</strong>: Chống phá Nhà nước; phát tán nội dung khiêu dâm nặng; tổ chức 
                    cá cược/cờ bạc; lừa đảo chiếm đoạt; tấn công/xâm nhập hệ thống; tổ chức hoạt động vi phạm pháp luật 
                    ngoài đời thực.
                  </li>
                </ul>
              </li>
              <li>
                Trường hợp hành vi chưa được nêu cụ thể, UniTaste có quyền quyết định biện pháp phù hợp dựa trên tính chất, 
                mức độ vi phạm.
              </li>
              <li>
                Khi có khiếu nại liên quan đến xử lý vi phạm, vui lòng liên hệ <strong>[Unitasteplastform@gmail.com]</strong> để được hướng dẫn.
              </li>
            </ol>
          </div>

          {/* Section 10 */}
          <div className='terms-section'>
            <h2>Điều 10. Cảnh báo rủi ro khi lưu trữ, trao đổi, chia sẻ thông tin</h2>
            <ol>
              <li>
                Việc chia sẻ thông tin cá nhân (địa chỉ nhà, nơi làm việc, trường học, số điện thoại, ngày sinh…) có thể 
                dẫn đến rủi ro bị quấy rối, mạo danh, xâm phạm quyền riêng tư.
              </li>
              <li>
                Nội dung đưa lên Internet có thể trở thành thông tin công khai và lan truyền rộng rãi. Người Sử Dụng cần 
                cân nhắc trước khi đăng tải.
              </li>
              <li>
                UniTaste nỗ lực bảo vệ dữ liệu cá nhân nhưng không thể bảo đảm an toàn tuyệt đối trong môi trường Internet; 
                Người Sử Dụng cần chủ động biện pháp bảo mật.
              </li>
            </ol>
          </div>

          {/* Section 11 */}
          <div className='terms-section'>
            <h2>Điều 11. Thu thập và bảo vệ thông tin cá nhân</h2>
            <ol>
              <li>
                <strong>Phạm vi thu thập</strong>: họ tên, CMND/CCCD/hộ chiếu, ngày sinh, email, số điện thoại, tên đăng 
                nhập, mật khẩu và các dữ liệu liên quan cần thiết cho việc cung cấp Dịch vụ/tuân thủ pháp luật.
              </li>
              <li>
                <strong>Bảo mật & trách nhiệm người dùng</strong>: Người Sử Dụng tự bảo mật thông tin tài khoản; thông báo 
                kịp thời cho UniTaste khi phát hiện lạm dụng/vi phạm bảo mật.
              </li>
              <li>
                <strong>Mục đích sử dụng</strong>: Cung cấp Dịch vụ; gửi thông báo liên quan; phòng chống gian lận; liên hệ, 
                hỗ trợ khi cần thiết; tuân thủ yêu cầu pháp luật.
              </li>
              <li>
                <strong>Cung cấp theo yêu cầu pháp luật</strong>: UniTaste sẽ cung cấp thông tin cho cơ quan có thẩm quyền 
                khi có yêu cầu hợp pháp theo quy định.
              </li>
              <li>
                <strong>Thời gian lưu trữ</strong>: Dữ liệu nhật ký hệ thống (thời điểm đăng nhập/đăng xuất, địa chỉ IP, nhật 
                ký xử lý…) được lưu trữ tối thiểu <strong>02 (hai) năm</strong> hoặc theo thời hạn pháp luật yêu cầu.
              </li>
              <li>
                <strong>Đầu mối liên hệ</strong> (cập nhật khi triển khai):
                <ul>
                  <li>Địa chỉ: <strong>[Tầng 6 - Nhà văn hoá sinh viên, Thủ Đức, Vietnam, Ho Chi Minh City, Vietnam]</strong></li>
                  <li>Điện thoại: <strong>[0865803493]</strong></li>
                  <li>Email: <strong>[Unitasteplastform@gmail.com]</strong></li>
                </ul>
              </li>
              <li>
                <strong>Quyền của Người Sử Dụng</strong>: Tự kiểm tra, cập nhật, điều chỉnh, hủy bỏ thông tin cá nhân trong 
                tài khoản; gửi yêu cầu hỗ trợ/khiếu nại liên quan đến bảo mật dữ liệu qua <strong>[Unitasteplastform@gmail.com]</strong>.
              </li>
              <li>
                <strong>Cam kết bảo mật</strong>: Thông tin cá nhân được bảo mật theo Chính sách bảo mật của UniTaste; không 
                chuyển giao/tiết lộ cho bên thứ ba nếu không có sự đồng ý của Người Sử Dụng, trừ các trường hợp pháp luật yêu 
                cầu hoặc theo Thỏa thuận này. Trường hợp bị tấn công gây rò rỉ dữ liệu, UniTaste sẽ thông báo cơ quan chức năng 
                và Người Sử Dụng theo quy định.
              </li>
            </ol>
          </div>

          {/* Section 12 */}
          <div className='terms-section'>
            <h2>Điều 12. Miễn trừ trách nhiệm và bồi thường</h2>
            <ol>
              <li>
                Người Sử Dụng đồng ý miễn trừ trách nhiệm cho UniTaste đối với mọi khiếu nại/phát sinh do vi phạm Thỏa thuận 
                hoặc pháp luật của Người Sử Dụng.
              </li>
              <li>
                Người Sử Dụng phải bồi thường đầy đủ mọi thiệt hại (bao gồm chi phí luật sư, chuyên gia, án phí…) cho UniTaste 
                phát sinh do hành vi vi phạm của mình.
              </li>
            </ol>
          </div>

          {/* Section 13 */}
          <div className='terms-section'>
            <h2>Điều 13. Luật áp dụng và giải quyết tranh chấp</h2>
            <ol>
              <li>Thỏa thuận này chịu sự điều chỉnh của pháp luật Việt Nam.</li>
              <li>Mọi tranh chấp sẽ do tòa án có thẩm quyền tại Việt Nam giải quyết theo pháp luật hiện hành.</li>
            </ol>
          </div>

          {/* Section 14 */}
          <div className='terms-section'>
            <h2>Điều 14. Cơ chế tiếp nhận và xử lý khiếu nại</h2>
            <ol>
              <li>
                Khiếu nại thuộc thẩm quyền của UniTaste cần được gửi trong vòng <strong>10 (mười) ngày</strong> kể từ ngày phát 
                sinh sự kiện.
              </li>
              <li>
                Quy trình xử lý tham khảo:
                <ul>
                  <li>
                    <strong>Bước 1</strong>: Người khiếu nại gửi bằng chứng liên quan (trong <strong>03</strong> ngày kể từ ngày 
                    có tranh chấp).
                  </li>
                  <li>
                    <strong>Bước 2</strong>: Ban Quản Trị kiểm tra, thẩm tra bằng chứng (trong <strong>03</strong> ngày kể từ ngày 
                    nhận được khiếu nại).
                  </li>
                  <li>
                    <strong>Bước 3</strong>: Ban Quản Trị áp dụng biện pháp xử lý theo mức độ vi phạm; nếu không thể tự thỏa thuận, 
                    quyết định của cơ quan có thẩm quyền là cuối cùng.
                  </li>
                </ul>
              </li>
              <li>
                Liên hệ khiếu nại: <strong>[Unitasteplastform@gmail.com]</strong>.
              </li>
            </ol>
          </div>

          {/* Section 15 */}
          <div className='terms-section'>
            <h2>Điều 15. Hiệu lực và sửa đổi Thỏa thuận</h2>
            <ol>
              <li>
                Thỏa thuận có hiệu lực ràng buộc từ thời điểm Người Sử Dụng hoàn tất đăng ký tài khoản hoặc bắt đầu sử dụng 
                Dịch vụ của UniTaste (tùy thời điểm nào đến trước).
              </li>
              <li>
                UniTaste có thể sửa đổi, bổ sung Thỏa thuận bất cứ lúc nào. Nội dung cập nhật sẽ được công bố trên 
                <strong> [tên miền chính thức của UniTaste]</strong> và có hiệu lực ngay khi đăng tải, trừ khi có quy định khác.
              </li>
              <li>
                Nếu có điều khoản bị tuyên vô hiệu bởi tòa án có thẩm quyền, phần còn lại của Thỏa thuận vẫn có hiệu lực. 
                Điều khoản vô hiệu sẽ được điều chỉnh để phù hợp pháp luật hiện hành.
              </li>
            </ol>
          </div>

          {/* Note */}
          <div className='terms-note'>
            <p>
              <strong>Lưu ý điền thông tin</strong>: Vui lòng thay thế các dấu <strong>[ … ]</strong> bằng thông tin chính thức 
              của UniTaste (tên miền, email hỗ trợ, địa chỉ, số điện thoại).
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default TermsOfService

