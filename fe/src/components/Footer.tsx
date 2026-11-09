import React from 'react';

interface FooterProps {
  onOpenStoreLocator?: () => void;
  onOpenPolicy?: (title: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenStoreLocator, onOpenPolicy }) => {
  return (
    <footer className="w-full bg-[#F6F8F5] border-t border-[#E3E8E1] mt-10">
      {/* 4 Service Promises Bar */}
      <div className="bg-[#FFFFFF] border-b border-[#E3E8E1] py-6">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#F6F8F5] border border-[#E3E8E1] flex items-center justify-center text-[#01B341] shrink-0">
              <span className="material-symbols-outlined text-[28px]">schedule</span>
            </div>
            <div>
              <h4 className="font-label-lg text-sm font-bold text-[#111111]">Giao nhanh 2 Giờ</h4>
              <p className="font-body-sm text-xs text-[#555E57]">Nhanh chóng &amp; trọn vị tươi sống</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#F6F8F5] border border-[#E3E8E1] flex items-center justify-center text-[#01B341] shrink-0">
              <span className="material-symbols-outlined text-[28px]">verified_user</span>
            </div>
            <div>
              <h4 className="font-label-lg text-sm font-bold text-[#111111]">Chuẩn VietGAP &amp; OCOP</h4>
              <p className="font-body-sm text-xs text-[#555E57]">100% truy xuất nguồn gốc an toàn</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#F6F8F5] border border-[#E3E8E1] flex items-center justify-center text-[#01B341] shrink-0">
              <span className="material-symbols-outlined text-[28px]">loyalty</span>
            </div>
            <div>
              <h4 className="font-label-lg text-sm font-bold text-[#111111]">Giá Luôn Bình Ổn</h4>
              <p className="font-body-sm text-xs text-[#555E57]">Đồng hành trợ giá cho mọi gia đình</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#F6F8F5] border border-[#E3E8E1] flex items-center justify-center text-[#01B341] shrink-0">
              <span className="material-symbols-outlined text-[28px]">storefront</span>
            </div>
            <div>
              <h4 className="font-label-lg text-sm font-bold text-[#111111]">180+ Cửa Hàng Phủ Rộng</h4>
              <p className="font-body-sm text-xs text-[#555E57]">Phục vụ khắp TP.HCM &amp; Cần Thơ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                alt="SATRAFOODS"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHxkGMdUJhI3u0eym5gViRsz7AvScSba5gFHF5r-o767qlFJSlORJ1uHAVHOye6JVzYUHRvM_DW9BQxTjDnRZ2xgpKWiPOQ4zhiQ5npwRjMXC5a82VE1iX7oEk1zAKrR2uVoaq_qW6M00QvSF2l-dH_W4rR5icSXz6QCiFLLtIZpShl93Q1QzYFPnvrjBlnXEqFYI3Jp9Pxl4DiRlzwdNSZl2XkwpNCu6xDw99IyHu1DFq4cL6vnG4vQ"
              />
            </div>
            <p className="font-body-sm text-xs text-[#555E57] leading-relaxed">
              Hệ thống chuỗi cửa hàng thực phẩm tiện lợi Satrafoods mang đến giải pháp bữa ăn dinh dưỡng, an toàn và tươi ngon mỗi ngày cho mọi gia đình Việt.
            </p>
            <div className="pt-1">
              <p className="font-label-md text-xs font-bold text-[#111111]">Đơn vị chủ quản:</p>
              <p className="font-body-sm text-xs text-[#555E57]">
                Tổng Công ty Thương mại Sài Gòn - TNHH Một Thành Viên (SATRA)
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="px-2 py-1 rounded bg-[#01B341] text-white font-label-sm text-[11px] font-bold">
                Bình ổn thị trường
              </span>
              <span className="px-2 py-1 rounded bg-[#DAFF01] text-[#111111] font-label-sm text-[11px] font-bold">
                VietGAP Food
              </span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-title-md text-sm text-[#111111] mb-4 font-bold">
              Chăm Sóc Khách Hàng
            </h4>
            <ul className="space-y-2.5 font-body-md text-xs text-[#555E57]">
              <li>
                Hotline CSKH: <strong className="text-[#01B341] font-bold text-sm">1800 1199</strong> (Miễn phí)
              </li>
              <li>
                Email:{' '}
                <a className="text-[#111111] hover:text-[#01B341] transition-colors" href="mailto:cskh@satrafoods.com.vn">
                  cskh@satrafoods.com.vn
                </a>
              </li>
              <li>Thời gian phục vụ: 07:00 - 21:30 mỗi ngày</li>
              <li>
                <button
                  onClick={() => onOpenPolicy?.('Câu hỏi thường gặp (FAQ)')}
                  className="hover:text-[#01B341] transition-colors bg-transparent border-0 p-0 text-left text-xs cursor-pointer text-[#555E57]"
                >
                  Câu hỏi thường gặp (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy?.('Quy chế Điểm thưởng Thành viên')}
                  className="hover:text-[#01B341] transition-colors bg-transparent border-0 p-0 text-left text-xs cursor-pointer text-[#555E57]"
                >
                  Quy chế Điểm thưởng Thành viên
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-title-md text-sm text-[#111111] mb-4 font-bold">
              Chính Sách &amp; Hỗ Trợ
            </h4>
            <ul className="space-y-2.5 font-body-md text-xs text-[#555E57]">
              <li>
                <button
                  onClick={() => onOpenPolicy?.('Chính sách giao hàng siêu tốc 2h')}
                  className="hover:text-[#01B341] transition-colors bg-transparent border-0 p-0 text-left text-xs cursor-pointer text-[#555E57]"
                >
                  Chính sách giao hàng siêu tốc 2h
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy?.('Chính sách đổi trả & hoàn tiền trong ngày')}
                  className="hover:text-[#01B341] transition-colors bg-transparent border-0 p-0 text-left text-xs cursor-pointer text-[#555E57]"
                >
                  Chính sách đổi trả &amp; hoàn tiền trong ngày
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy?.('Cam kết chất lượng thực phẩm VietGAP')}
                  className="hover:text-[#01B341] transition-colors bg-transparent border-0 p-0 text-left text-xs cursor-pointer text-[#555E57]"
                >
                  Cam kết chất lượng thực phẩm VietGAP
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy?.('Chính sách bảo mật thông tin khách hàng')}
                  className="hover:text-[#01B341] transition-colors bg-transparent border-0 p-0 text-left text-xs cursor-pointer text-[#555E57]"
                >
                  Chính sách bảo mật thông tin khách hàng
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy?.('Điều khoản sử dụng dịch vụ mua hàng')}
                  className="hover:text-[#01B341] transition-colors bg-transparent border-0 p-0 text-left text-xs cursor-pointer text-[#555E57]"
                >
                  Điều khoản sử dụng dịch vụ mua hàng
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-title-md text-sm text-[#111111] mb-4 font-bold">
              Mạng Lưới Phục Vụ
            </h4>
            <div className="p-4 bg-[#FFFFFF] border border-[#E3E8E1] rounded-xl space-y-2 shadow-sm">
              <div className="flex items-center gap-1.5 text-[#01B341] font-bold text-xs">
                <span className="material-symbols-outlined text-[18px]">store</span>
                <span>180+ Cửa hàng tại TP.HCM &amp; Cần Thơ</span>
              </div>
              <p className="font-body-sm text-xs text-[#555E57]">
                Tìm ngay cửa hàng Satrafoods gần nhà bạn nhất để mua sắm thuận tiện.
              </p>
              <button
                onClick={onOpenStoreLocator}
                className="inline-flex items-center justify-center w-full py-2 bg-[#01B341] text-white font-bold text-xs rounded-lg hover:bg-[#006e24] transition-colors cursor-pointer border-0 mt-2"
                type="button"
              >
                Tra cứu hệ thống điểm bán
              </button>
            </div>

            <div className="mt-4">
              <p className="font-label-sm text-[11px] text-[#555E57] mb-2 uppercase font-bold tracking-wider">
                Chứng nhận an toàn thực phẩm
              </p>
              <div className="flex items-center gap-2">
                <div className="px-2.5 py-1 bg-[#FFFFFF] border border-[#E3E8E1] rounded text-xs text-[#01B341] font-semibold flex items-center gap-1 shadow-2xs">
                  <span className="material-symbols-outlined text-[16px]">shield</span>Đã Đăng Ký BCT
                </div>
                <div className="px-2.5 py-1 bg-[#FFFFFF] border border-[#E3E8E1] rounded text-xs text-[#111111] font-semibold flex items-center gap-1 shadow-2xs">
                  <span className="material-symbols-outlined text-[16px] text-[#01B341]">eco</span>ATVSTP TP.HCM
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-[#E3E8E1] mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-[#555E57] gap-3">
          <div>
            © 2025 SATRAFOODS - Chuỗi cửa hàng tiện lợi trực thuộc Tổng Công ty Thương mại Sài Gòn (SATRA). Bảo lưu mọi quyền.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenPolicy?.('Bảo mật thông tin')}
              className="hover:text-[#01B341] transition-colors bg-transparent border-0 p-0 text-xs text-[#555E57] cursor-pointer"
            >
              Bảo mật
            </button>
            <button
              onClick={() => onOpenPolicy?.('Điều khoản dịch vụ')}
              className="hover:text-[#01B341] transition-colors bg-transparent border-0 p-0 text-xs text-[#555E57] cursor-pointer"
            >
              Điều khoản
            </button>
            <button
              onClick={onOpenStoreLocator}
              className="hover:text-[#01B341] transition-colors bg-transparent border-0 p-0 text-xs text-[#555E57] cursor-pointer"
            >
              Hệ thống cửa hàng
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
