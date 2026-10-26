# QA / Báo cáo kiểm tra website giới thiệu v4

## Đạt

- Đã dùng **đúng tệp nguồn IT_Hardware_Inspector_WebScanner_v4_Windows.zip** để tạo bản RAR.
- RAR hợp lệ, libarchive đọc được 13/13 tệp, đúng kích thước và nội dung của ZIP nguồn.
- Kiểm tra cú pháp JS bằng `node --check`: PASS.
- Kiểm tra cú pháp CSS bằng tinycss2: không có lỗi phân tích cú pháp.
- HTML không có ID trùng, toàn bộ đường dẫn nội bộ của ảnh/CSS/JS/download đều trỏ tới tệp tồn tại.
- Test HTTP cục bộ: `index.html`, CSS, JavaScript, ảnh CPU, và tệp RAR đều trả HTTP 200.
- Website không chứa mã thu thập dữ liệu thiết bị hoặc gửi dữ liệu đi nơi khác. Nội dung giới thiệu tách riêng khỏi bộ quét v4.

## Chưa thể xác minh trong môi trường hiện tại

- Chính sách trình duyệt Chromium của môi trường này chặn toàn bộ URL, kể cả `localhost`, nên không thể xác nhận trực tiếp các thao tác UI và giao diện desktop/mobile bằng trình duyệt headless. Cần chạy thử trên Chrome/Edge thật sau khi giải nén.
- Việc hosting công khai tại Netlify/GitHub Pages chưa được thực hiện trong cuộc trò chuyện này.
- Khả năng đọc thông số phần cứng v4 trên Windows chưa được kiểm thử lại trong lần đóng gói website này.

## Các mục cần kiểm tra khi deploy thực tế

1. Mở `index.html`, kiểm tra CSS/ảnh xuất hiện đầy đủ.
2. Chuyển tab **CPU chuyên sâu** và **Tổng quan**.
3. Mở menu trên màn hình điện thoại và kiểm tra các nút điều hướng.
4. Nhấp **Tải v4.0 · File RAR**, giải nén kiểm tra `CHAY_WEBSITE.cmd`.
5. Đối chiếu SHA-256 hiện trên web với file đã tải bằng `certutil -hashfile [filename] SHA256`.
6. Trên máy Windows kiểm thử, chạy `KIEM_TRA_WINDOWS.cmd` và `CHAY_WEBSITE.cmd` của v4.
