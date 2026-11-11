import React, { useState } from 'react';

export interface CommitmentItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export const COMMITMENT_ITEMS: CommitmentItem[] = [
  {
    id: 'c1',
    title: 'Giao nhanh 2 Giờ',
    subtitle: 'Nhanh chóng & trọn vị tươi sống',
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#01B341]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 14" />
      </svg>
    ),
  },
  {
    id: 'c2',
    title: 'Chuẩn VietGAP & OCOP',
    subtitle: '100% truy xuất nguồn gốc an toàn',
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#01B341]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: 'c3',
    title: 'Giá Luôn Bình Ổn',
    subtitle: 'Đồng hành trợ giá cho mọi gia đình',
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#01B341]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
  {
    id: 'c4',
    title: '180+ Cửa Hàng Phủ Rộng',
    subtitle: 'Phục vụ khắp TP.HCM & Cần Thơ',
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#01B341]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
        <path d="M8 15c1 1.5 3 2 4 2s3-.5 4-2" />
      </svg>
    ),
  },
];

export const CommitmentBanner: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(2);

  return (
    <section className="w-full my-6" aria-label="Cam kết chất lượng và giá trị cốt lõi Satrafoods">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3.5 sm:mb-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-[#01B341] rounded-xs" />
          <h2 className="font-bold text-sm sm:text-base text-[#111111] uppercase tracking-wide">
            Cam Kết Dịch Vụ & Giá Trị Cốt Lõi
          </h2>
        </div>
        <span className="text-[11px] sm:text-xs text-[#555E57] hidden sm:inline">
          Tiêu chuẩn phục vụ 180+ điểm bán Satrafoods
        </span>
      </div>

      {/* Modern Satrafoods Bento Grid (4 Tiles: 2 UI / 2 Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* TILE 1: Giao nhanh 2 Giờ (Hero UI Tile - Spans 2 cols on lg) */}
        <div className="lg:col-span-2 bg-white border border-[#E3E8E1] rounded-[6px] p-4 sm:p-5 shadow-2xs hover:border-[#01B341] transition-all flex flex-col justify-between group">
          {/* Header copy */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[8px] bg-[#EAF7EE] flex items-center justify-center shrink-0 border border-[#D5EEDB]">
                {COMMITMENT_ITEMS[0].icon}
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#111111] leading-tight">
                  {COMMITMENT_ITEMS[0].title}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#555E57] leading-tight mt-0.5">
                  {COMMITMENT_ITEMS[0].subtitle}
                </p>
              </div>
            </div>

            <span className="font-label-sm text-[10px] bg-[#DAFF01] text-[#111111] font-black px-2 py-0.5 rounded-[3px] uppercase shrink-0">
              HỎA TỐC 2H
            </span>
          </div>

          {/* Faux UI: Live Delivery Route Stepper & Shipper Simulation */}
          <div className="bg-[#F6F8F5] border border-[#E3E8E1] rounded-[4px] p-3 sm:p-3.5 relative overflow-hidden">
            {/* Top Shipper Status Pill */}
            <div className="flex items-center justify-between mb-3 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#01B341] animate-ping" />
                <span className="font-bold text-[#006e24]">Shipper Satra đang di chuyển</span>
                <span className="text-[#717A73] hidden sm:inline">• Cách bạn 1.2km</span>
              </div>
              <span className="font-bold text-[#FF161F] bg-white px-2 py-0.5 rounded-[3px] border border-[#E3E8E1] shadow-2xs">
                Dự kiến: 18 phút
              </span>
            </div>

            {/* Stepper Graphic */}
            <div className="relative flex items-center justify-between z-10 px-2 sm:px-6 py-2">
              {/* Connecting line */}
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-[#E3E8E1] z-0">
                <div className="h-full bg-[#01B341] w-2/3 transition-all duration-700" />
              </div>

              {/* Step 1: Packaged */}
              <div className="flex flex-col items-center gap-1 relative z-10">
                <div className="w-6 h-6 rounded-full bg-[#01B341] text-white flex items-center justify-center text-[11px] font-bold shadow-xs">
                  ✓
                </div>
                <span className="text-[10px] font-semibold text-[#111111]">Đóng gói tươi</span>
              </div>

              {/* Step 2: On Route (Active Shipper) */}
              <div className="flex flex-col items-center gap-1 relative z-10">
                <div className="w-7 h-7 rounded-full bg-[#01B341] text-white flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-[#01B341]/20 animate-bounce">
                  🛵
                </div>
                <span className="text-[10px] font-bold text-[#006e24]">Đang giao hàng</span>
              </div>

              {/* Step 3: Delivered */}
              <div className="flex flex-col items-center gap-1 relative z-10">
                <div className="w-6 h-6 rounded-full bg-white border-2 border-[#DCE2DB] text-[#889088] flex items-center justify-center text-[11px] font-bold">
                  📍
                </div>
                <span className="text-[10px] text-[#717A73]">Nhận tận cửa</span>
              </div>
            </div>

            {/* Guarantee note */}
            <div className="mt-2.5 pt-2 border-t border-[#E3E8E1] flex items-center justify-between text-[10px] text-[#555E57]">
              <span>Bảo quản thùng giữ nhiệt chuyên dụng</span>
              <span className="font-bold text-[#006e24]">94% đơn hoàn tất đúng giờ</span>
            </div>
          </div>
        </div>

        {/* TILE 2: Giá Luôn Bình Ổn (Stat & Statement Tile - High contrast dark forest card) */}
        <div className="bg-[#006E24] text-white rounded-[6px] p-4 sm:p-5 shadow-sm flex flex-col justify-between relative overflow-hidden group">
          {/* Decorative packaging glow */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#DAFF01]/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-[8px] bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
                <div className="text-[#DAFF01]">{COMMITMENT_ITEMS[2].icon}</div>
              </div>
              <span className="font-label-sm text-[10px] bg-[#DAFF01] text-[#111111] font-black px-2 py-0.5 rounded-[3px] uppercase">
                BÌNH ỔN GIÁ
              </span>
            </div>

            <h3 className="font-bold text-sm sm:text-base text-white leading-tight">
              {COMMITMENT_ITEMS[2].title}
            </h3>
            <p className="text-[11px] text-white/80 leading-tight mt-0.5">
              {COMMITMENT_ITEMS[2].subtitle}
            </p>
          </div>

          {/* Big Display Stat (Rule 5: Big type is a tile) */}
          <div className="my-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-black text-3xl sm:text-4xl text-[#DAFF01] leading-none tracking-tight">
                0đ
              </span>
              <span className="text-xs text-white/90 font-semibold">
                chênh lệch giá chợ
              </span>
            </div>
            <p className="text-[10.5px] text-white/80 mt-1 leading-snug">
              Trợ giá thực phẩm thiết yếu cho mọi gia đình kể cả mùa cao điểm.
            </p>
          </div>

          <div className="pt-2.5 border-t border-white/15 text-[10px] text-[#DAFF01] font-bold flex items-center gap-1">
            <span>✓ Cam kết bình ổn từ Tổng Công ty Satra</span>
          </div>
        </div>

        {/* TILE 3: Chuẩn VietGAP & OCOP (Interactive Object Tile / QR Verification) */}
        <div className="bg-white border border-[#E3E8E1] rounded-[6px] p-4 sm:p-5 shadow-2xs hover:border-[#01B341] transition-all flex flex-col justify-between group">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[8px] bg-[#EAF7EE] flex items-center justify-center shrink-0 border border-[#D5EEDB]">
                {COMMITMENT_ITEMS[1].icon}
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#111111] leading-tight">
                  {COMMITMENT_ITEMS[1].title}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#555E57] leading-tight mt-0.5">
                  {COMMITMENT_ITEMS[1].subtitle}
                </p>
              </div>
            </div>

            <span className="text-[10px] font-black text-[#006e24] bg-[#E8F8EC] px-1.5 py-0.5 rounded-[2px] uppercase">
              100% SẠCH
            </span>
          </div>

          {/* Cropped QR Verification Component */}
          <div className="bg-[#F6F8F5] border border-[#E3E8E1] rounded-[4px] p-3 flex items-center gap-3 relative overflow-hidden">
            {/* Animated Laser Scanning Beam */}
            <div className="relative w-14 h-14 bg-white rounded-[4px] border border-[#E3E8E1] p-1 shrink-0 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-x-0 h-0.5 bg-[#01B341] shadow-[0_0_8px_#01B341] animate-pulse" style={{ top: '45%' }} />
              {/* QR Mock Matrix */}
              <div className="w-full h-full grid grid-cols-4 gap-0.5 opacity-80">
                <div className="bg-[#111111] rounded-xs" />
                <div className="bg-[#111111] rounded-xs" />
                <div className="bg-transparent" />
                <div className="bg-[#111111] rounded-xs" />
                <div className="bg-[#111111] rounded-xs" />
                <div className="bg-transparent" />
                <div className="bg-[#01B341] rounded-xs" />
                <div className="bg-[#111111] rounded-xs" />
                <div className="bg-transparent" />
                <div className="bg-[#01B341] rounded-xs" />
                <div className="bg-[#111111] rounded-xs" />
                <div className="bg-transparent" />
                <div className="bg-[#111111] rounded-xs" />
                <div className="bg-[#111111] rounded-xs" />
                <div className="bg-[#111111] rounded-xs" />
                <div className="bg-[#111111] rounded-xs" />
              </div>
            </div>

            {/* Verification Metadata */}
            <div className="min-w-0 flex-1">
              <span className="font-bold text-[11px] text-[#006e24] block truncate">
                Mã Lô: #SG-VG-2026
              </span>
              <span className="text-[10px] text-[#555E57] block truncate">
                HTX Nông Nghiệp Củ Chi
              </span>
              <span className="text-[9.5px] font-semibold text-[#01B341] bg-[#E8F8EC] px-1.5 py-0.2 rounded-[2px] inline-block mt-0.5">
                ✓ Đạt chuẩn an toàn VSTP
              </span>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[#E3E8E1] text-[10.5px] text-[#555E57] flex items-center justify-between">
            <span>Quét QR trên mỗi bao bì</span>
            <span className="text-[#006e24] font-bold">Minh bạch 100%</span>
          </div>
        </div>

        {/* TILE 4: 180+ Cửa Hàng Phủ Rộng (Stat & Collection Tile - Spans 2 cols on lg) */}
        <div className="lg:col-span-2 bg-white border border-[#E3E8E1] rounded-[6px] p-4 sm:p-5 shadow-2xs hover:border-[#01B341] transition-all flex flex-col justify-between group">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[8px] bg-[#EAF7EE] flex items-center justify-center shrink-0 border border-[#D5EEDB]">
                {COMMITMENT_ITEMS[3].icon}
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#111111] leading-tight">
                  {COMMITMENT_ITEMS[3].title}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#555E57] leading-tight mt-0.5">
                  {COMMITMENT_ITEMS[3].subtitle}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const locator = document.getElementById('store-locator');
                if (locator) locator.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[11px] font-bold text-[#006e24] hover:text-[#01B341] flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0"
            >
              <span>Xem bản đồ</span>
              <span>→</span>
            </button>
          </div>

          {/* District Collection Pills */}
          <div className="my-2">
            <div className="flex flex-wrap gap-1.5">
              {['Quận 1', 'Quận 3', 'Quận 5', 'Quận 7', 'Bình Thạnh', 'Tân Bình', 'Gò Vấp', 'TP. Thủ Đức', 'Cần Thơ'].map(
                (district) => (
                  <span
                    key={district}
                    className="px-2.5 py-1 bg-[#F6F8F5] border border-[#E3E8E1] rounded-[4px] text-[10.5px] font-medium text-[#111111] hover:border-[#01B341] transition-colors"
                  >
                    📍 {district}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-2.5 border-t border-[#E3E8E1] flex items-center justify-between text-[10.5px] text-[#555E57]">
            <span>Phục vụ từ 06:00 sáng đến 21:30 tối mỗi ngày</span>
            <span className="font-bold text-[#006e24]">Có mặt trong 15 phút tại khu vực của bạn</span>
          </div>
        </div>
      </div>
    </section>
  );
};