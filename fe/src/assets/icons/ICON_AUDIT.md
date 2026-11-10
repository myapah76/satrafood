# Satrafoods Frontend UI Icon Audit & Mapping Manifesto

> **Single Source of Truth** for UI icon usage, SVG asset mapping, and icon gap documentation across the **Satrafoods** frontend (`fe/src/`).

---

## 1. Inventory of SVG Assets (`fe/src/assets/icons/`)

The repository includes **19 core brand and UI SVG assets** designed specifically for Satrafoods:

| Asset File | Internal Icon Component | ViewBox | Semantics & Business Meaning |
|---|---|---|---|
| `Magnify glass.svg` | `SearchIcon` / `MagnifyGlassIcon` | `0 0 82 89` | Tìm kiếm sản phẩm, rau củ, điểm bán hàng |
| `Cart.svg` | `CartIcon` | `0 0 103 83` | Giỏ hàng, thêm vào giỏ, giỏ hàng nổi, đếm số lượng món |
| `Nguoi.svg` | `UserIcon` / `PersonIcon` | `0 0 68 75` | Tài khoản người dùng, đại diện thành viên Satra |
| `Present.svg` | `GiftIcon` / `PresentIcon` | `0 0 87 89` | Tích điểm 2% Satra Rewards, quà tặng thành viên, ưu đãi |
| `Location.svg` | `LocationIcon` | `0 0 71 97` | Ghim địa điểm, hệ thống cửa hàng, chi nhánh siêu thị |
| `Bolt.svg` | `BoltIcon` | `0 0 87 76` | Giao hàng nhanh 2h, hỏa tốc, cam kết dịch vụ |
| `Home.svg` | `HomeIcon` | `0 0 79 82` | Trang chủ, breadcrumb, tab điều hướng chính |
| `Phone.svg` | `PhoneIcon` | `0 0 80 81` | Hotline tổng đài, gọi cửa hàng gần nhất |
| `Letter.svg` | `LetterIcon` | `0 0 83 83` | Hộp thư, đăng ký nhận bản tin, email voucher |
| `Tag.svg` | `TagIcon` | `0 0 85 86` | Thẻ giá, ưu đãi giảm giá, mã khuyến mãi |
| `Park.svg` | `EcoIcon` / `ParkIcon` | `0 0 71 71` | Nông sản sạch, lá xanh VietGAP, an toàn thực phẩm, sinh thái |
| `Face.svg` | `FaceIcon` | `0 0 87 87` | Mặt cười hài lòng, đánh giá chất lượng nông trại |
| `Globe.svg` | `GlobeIcon` | `0 0 83 83` | Toàn cầu, mạng lưới hệ thống chuỗi siêu thị |
| `Heart.svg` | `HeartIcon` | `0 0 87 78` | Yêu thích, tri ân khách hàng thân thiết, loyalty |
| `Box.svg` | `BoxIcon` | `0 0 82 93` | Hộp hàng hóa, danh mục sản phẩm, đóng gói tiêu chuẩn |
| `Right.svg` | `RightIcon` | `0 0 71 46` | Mũi tên phải, tiếp theo, xem chi tiết, phân trang Sau |
| `Group 8825.svg` | `LeftIcon` | `0 0 71 46` | Mũi tên trái, quay lại, phân trang Trước |
| `Group 8826.svg` | `UpIcon` | `0 0 46 71` | Mũi tên lên, thu gọn menu dropdown |
| `Group 8827.svg` | `DownIcon` | `0 0 46 71` | Mũi tên xuống, mở rộng menu dropdown, chọn địa phương |

---

## 2. Icon Mapping Table (Usage -> Asset)

| Feature / Component | Current Icon Usage | Mapping Target SVG | Implementation Notes |
|---|---|---|---|
| **Header (Top bar)** | Ô tìm kiếm (`search`) | `SearchIcon` (`Magnify glass.svg`) | `currentColor`, `shrink-0` |
| **Header (Top bar)** | Nút giỏ hàng (`shopping_basket`) | `CartIcon` (`Cart.svg`) | Kèm huy hiệu đếm số lượng `#DAFF01` |
| **Header (Top bar)** | Nút người dùng (`person`) | `UserIcon` (`Nguoi.svg`) | Nền xanh đặc `#01B341`, icon màu trắng |
| **Header (Top bar)** | Khối thành viên (`redeem`) | `GiftIcon` (`PresentIcon`) | `text-[#01B341]`, tích điểm 2% |
| **Header (Top bar)** | Hộp giao nhanh (`two_wheeler`) | `BoltIcon` (`Bolt.svg`) | Tia chớp biểu tượng giao siêu tốc 2h |
| **Header (Top bar)** | Mũi tên chọn khu vực (`expand_more`) | `DownIcon` (`Group 8827.svg`) | Mũi tên chỉ xuống bo góc |
| **Header (Sub-bar)** | Hệ thống cửa hàng (`pin_drop`) | `LocationIcon` (`Location.svg`) | Màu xanh lá `#01B341` |
| **Header (Sub-bar)** | Mũi tên danh mục con (`chevron_right`) | `RightIcon` (`Right.svg`) | Chuyển động khi hover sang phải |
| **Header (Sub-bar)** | Mũi tên menu cha (`expand_less`/`more`) | `UpIcon` / `DownIcon` | Đổi hướng mượt mà theo trạng thái mở/đóng |
| **Catalog Screen** | Breadcrumb Trang chủ (`home`) | `HomeIcon` (`Home.svg`) | Icon kích thước $16\text{px}$, màu `#555E57` |
| **Catalog Screen** | Nút trang trước (`chevron_left`) | `LeftIcon` (`Group 8825.svg`) | Phân trang bảng sản phẩm |
| **Catalog Screen** | Nút trang sau (`chevron_right`) | `RightIcon` (`Right.svg`) | Phân trang bảng sản phẩm |
| **Product Card** | Nút "+ Thêm vào giỏ" (`add_shopping_cart`) | `CartIcon` (`Cart.svg`) | Hiển thị cả ở dạng Lưới và dạng Danh sách |
| **Commitment Banner**| Cam kết Giao nhanh 2h (`bolt`) | `BoltIcon` (`Bolt.svg`) | Màu `#DAFF01` trên nền xanh |
| **Commitment Banner**| Chuẩn chuỗi VietGAP (`verified`/`user`) | `EcoIcon` (`Park.svg`) | Nông nghiệp sạch tiêu chuẩn TP.HCM |
| **Category Explorer**| Nút xem tất cả (`arrow_forward`) | `RightIcon` (`Right.svg`) | Điều hướng danh mục |
| **Weekly Deals** | Huy hiệu deals sốc (`local_offer`) | `TagIcon` (`Tag.svg`) | Màu hồng `#FC95FD` / đỏ |
| **First Order Voucher**| Biểu tượng email đăng ký (`mark_email_read`) | `LetterIcon` (`Letter.svg`) | Đặt trong khối nền vàng chanh `#DAFF01` |
| **Store Locator** | Ghim tiêu đề & bản đồ (`pin_drop`, `store`) | `LocationIcon` (`Location.svg`) | Kích thước đồng bộ, hiệu ứng ghim |
| **Store Locator** | Ô tìm siêu thị (`search`) | `SearchIcon` (`Magnify glass.svg`) | Căn lề trái thanh tìm kiếm |
| **Store Locator** | Nút Gọi cửa hàng (`call`) | `PhoneIcon` (`Phone.svg`) | Nút gọi số hotline |
| **Footer** | Cam kết VietGAP & an toàn (`eco`, `shield`) | `EcoIcon` (`Park.svg`) | Huy hiệu chứng nhận ATVSTP & BCT |
| **Footer** | Địa chỉ cửa hàng / chuỗi (`store`, `storefront`) | `LocationIcon` (`Location.svg`) | Địa chỉ trụ sở và mạng lưới bán buôn |
| **Footer** | Satra Rewards tri ân (`loyalty`) | `HeartIcon` (`Heart.svg`) | Khối chăm sóc khách hàng thân thiết |
| **Mobile Bottom Nav** | Tab Trang chủ (`home`) | `HomeIcon` (`Home.svg`) | Thanh điều hướng đáy di động |
| **Mobile Bottom Nav** | Tab Danh mục (`category`) | `BoxIcon` (`Box.svg`) | Hộp hàng hóa danh mục |
| **Mobile Bottom Nav** | Tab Cửa hàng (`storefront`) | `LocationIcon` (`Location.svg`) | Ghim hệ thống cửa hàng |
| **Mobile Bottom Nav** | Tab Giỏ hàng (`shopping_bag`) | `CartIcon` (`Cart.svg`) | Giỏ hàng kèm số lượng |
| **Mobile Bottom Nav** | Tab Khuyến mãi (`local_fire_department`) | `TagIcon` (`Tag.svg`) | Thẻ giá / ưu đãi HOT |
| **Cart Drawer** | Tiêu đề giỏ hàng (`shopping_bag`) | `CartIcon` (`Cart.svg`) | Giỏ hàng mua sắm |
| **Traceability Modal**| Tiêu chuẩn nông nghiệp (`agriculture`, `gpp_good`) | `EcoIcon` (`Park.svg`) | Canh tác VietGAP sạch |
| **Traceability Modal**| Mã lô hàng / tem truy xuất (`tag`) | `TagIcon` (`Tag.svg`) | Mã lô nông sản |
| **Traceability Modal**| Khách hàng hài lòng (`sentiment_very_satisfied`)| `FaceIcon` (`Face.svg`) | Nụ cười đánh giá tích cực |
| **Traceability Modal**| Nút thêm giỏ hàng (`add_shopping_cart`) | `CartIcon` (`Cart.svg`) | Nút mua trực tiếp từ truy xuất |
| **Location Modal** | Giao nhanh 2h (`bolt`, `local_shipping`) | `BoltIcon` (`Bolt.svg`) | Phương thức giao hàng hỏa tốc |

---

## 3. Documented Icon Gaps (No Suitable Existing SVG)

Theo quy định nghiêm ngặt của dự án, các biểu tượng dưới đây **không có asset SVG tương thích trong 19 tệp nguồn** và được ghi nhận minh bạch là khoảng trống (gaps). Tuyệt đối **không thay thế bằng hình ảnh không liên quan**:

1. **`close` (Đóng):** Dấu "X" đóng Modal, Giỏ hàng bay (Cart Drawer), Toast thông báo.
2. **`check` / `check_circle` (Hoàn thành/Chọn):** Dấu kiểm xác nhận đơn hàng thành công, checkbox đã chọn.
3. **`delete` (Thùng rác):** Xóa sản phẩm khỏi giỏ hàng.
4. **`tune` (Bộ lọc di động):** Nút mở thanh trượt bộ lọc nâng cao trên mobile.
5. **`grid_view` / `view_list` (Chế độ xem):** Chuyển đổi lưới 4 cột và danh sách hàng ngang.
6. **`qr_code_2` / `qr_code_scanner` (Mã QR):** Quét và hiển thị truy xuất nguồn gốc nông trại.
7. **`add` (Dấu cộng):** Tăng số lượng sản phẩm / Thêm ưu đãi.
8. **`menu` (Thanh điều hướng):** Nút mở menu danh mục di động / danh mục cha.
9. **`schedule` (Đồng hồ):** Giờ mở cửa hoạt động (06:00 - 22:00).

Các icon trên tiếp tục sử dụng font hệ thống với kích thước và màu sắc chuẩn hóa, không gây lỗi giao diện.
