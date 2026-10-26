# Hardware Inspector v4 — Website giới thiệu sản phẩm

Đây là **website giới thiệu / landing page** dành cho IT Hardware Inspector Web Scanner v4.0, không phải server quét phần cứng. Website gồm HTML, CSS, JavaScript thuần và các tệp tải xuống **bản v4**, không dùng bản v5.

## Mở thử trên Windows

1. Giải nén toàn bộ `Hardware_Inspector_v4_Landing_Website.zip`.
2. Mở `index.html` bằng Chrome hoặc Edge.
3. Xem các phần Giới thiệu, Tính năng, Giao diện, Hướng dẫn và nút tải v4.0.
4. Nhấp **Tải v4.0 · File RAR** để tải file trong thư mục `downloads`.

Website giới thiệu **không tự quét máy** khi mở. Muốn quét phần cứng, người dùng cần tải và chạy công cụ v4.

## Triển khai lên Internet bằng Netlify (không cần backend)

1. Tạo tài khoản Netlify và mở mục triển khai thủ công (`Deploy manually` / kéo thả).
2. Giải nén ZIP website, **tải lên chính thư mục có `index.html`** cùng toàn bộ thư mục `assets` và `downloads` (không upload riêng `index.html`).
3. Netlify sẽ cấp URL dạng `https://....netlify.app`; các nút tải trong trang dùng đường dẫn tương đối nên hoạt động cùng domain.
4. Có thể cấu hình custom domain trong Netlify nếu đã sở hữu tên miền.
5. Thử tải RAR và giải nén sau khi deploy.

## Triển khai bằng GitHub Pages

1. Tạo repository và tải toàn bộ nội dung thư mục website vào thư mục gốc của nhánh phát hành.
2. `Settings` → `Pages` → chọn `Deploy from a branch`, nhánh `main`, thư mục `/ (root)`.
3. Chờ GitHub Pages cung cấp URL và kiểm tra mục `downloads`.

Website hoạt động trên hosting tĩnh khác (Cloudflare Pages, Vercel, Apache/Nginx) miễn là host cho phép phục vụ file `.rar` và `.zip` và giữ nguyên đường dẫn thư mục.

## File trong gói

```text
index.html                     Trang giới thiệu
styles.css                     Giao diện responsive và animations
script.js                      Menu, hiệu ứng cuộn, chuyển preview, sao chép checksum
assets/favicon.svg             Biểu tượng trang web
assets/cpu.png                 Ảnh thật giao diện CPU v4
assets/overview.png            Ảnh thật giao diện Tổng quan v4
downloads/IT_Hardware_Inspector_WebScanner_v4_Windows.rar   Bản RAR thật, chứa mã nguồn và bộ chạy v4
downloads/IT_Hardware_Inspector_WebScanner_v4_Windows.zip   Bản ZIP dự phòng gốc
_headers                       Gợi ý content-type tải RAR cho Netlify
```

## Người dùng cài bộ quét v4 thế nào?

1. Tải RAR từ website giới thiệu.
2. Giải nén thành thư mục `IT_Hardware_Inspector_WebScanner_v4`.
3. Nhấp đúp `KIEM_TRA_WINDOWS.cmd` nếu muốn chạy kiểm tra trước.
4. Nhấp đúp `CHAY_WEBSITE.cmd` trên Windows 10/11.
5. Giữ cửa sổ PowerShell đang mở, mở `http://127.0.0.1:8766`.
6. Xem cấu hình và xuất CSV/JSON.

**Lưu ý:** Bản v4 không quét từ xa chỉ bằng trình duyệt. File `CHAY_WEBSITE.cmd` chạy PowerShell cục bộ và lấy dữ liệu WMI/CIM. Không cần Python hay Node.js. Có thể xảy ra giới hạn bởi chính sách bảo mật doanh nghiệp hoặc firmware thiếu thông số.

## Kiểm tra tải xuống

- Tệp RAR: `IT_Hardware_Inspector_WebScanner_v4_Windows.rar`
- SHA-256: `d857fca7550a4da357c4d2379c562bb103d213f275f8eceb7fd8615009d13004`
- Trong Windows CMD, chạy `certutil -hashfile IT_Hardware_Inspector_WebScanner_v4_Windows.rar SHA256` để đối chiếu.
- File RAR được đóng theo định dạng RAR4 / Store (không nén lại), kiểm tra đọc đủ **13/13** tệp với libarchive. Thư mục nguồn lấy từ bản ZIP v4 đã có.

## Mức độ kiểm tra

- Kiểm tra tĩnh file HTML/CSS/JS, nút download, đường dẫn ảnh, tính toàn vẹn ZIP/RAR.
- Kiểm thử trực tiếp các tương tác website bằng Chromium (desktop + mobile) tại môi trường dựng trang.
- Chưa tự đưa website lên một hosting công khai, và chưa kiểm thử lại WMI/CIM của ứng dụng v4 trên máy Windows cụ thể của người dùng.
