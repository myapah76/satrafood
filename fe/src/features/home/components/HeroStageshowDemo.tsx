import React, { useState, useEffect, useRef } from 'react';

interface HeroDemoState {
  cursorPos: { x: number; y: number };
  isClicking: boolean;
  activeItem: 'none' | 'lettuce' | 'pork';
  showTraceability: boolean;
  addedPork: boolean;
  cartCount: number;
  showVoucherToast: boolean;
  cartBumping: boolean;
}

const INITIAL_STATE: HeroDemoState = {
  cursorPos: { x: 78, y: 76 }, // percentage-based for seamless responsiveness
  isClicking: false,
  activeItem: 'none',
  showTraceability: false,
  addedPork: false,
  cartCount: 2,
  showVoucherToast: false,
  cartBumping: false,
};

const POSTER_STATE: HeroDemoState = {
  cursorPos: { x: 62, y: 58 },
  isClicking: false,
  activeItem: 'pork',
  showTraceability: false,
  addedPork: true,
  cartCount: 3,
  showVoucherToast: true,
  cartBumping: false,
};

export const HeroStageshowDemo: React.FC<{ onExplore?: () => void }> = ({ onExplore }) => {
  const [state, setState] = useState<HeroDemoState>(INITIAL_STATE);
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check system prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Choreographed 5-beat loop (13 seconds cycle)
  useEffect(() => {
    if (reducedMotion || isHovered) return;

    let timeoutIds: NodeJS.Timeout[] = [];

    const runLoop = () => {
      // Step 0: Initial Reset (0s)
      setState(INITIAL_STATE);

      // Beat 1: Glide to VietGAP Hydro Lettuce QR badge (at 1.2s - 2.2s)
      timeoutIds.push(
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            cursorPos: { x: 26, y: 64 },
            activeItem: 'lettuce',
          }));
        }, 1200)
      );

      // Beat 2: Click VietGAP badge & popover blooms (at 2.4s)
      timeoutIds.push(
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            isClicking: true,
          }));
        }, 2400)
      );

      timeoutIds.push(
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            isClicking: false,
            showTraceability: true,
          }));
        }, 2650)
      );

      // Beat 3: Close popover & glide to Ba Rọi Heo CP "Thêm" button (at 4.6s)
      timeoutIds.push(
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            showTraceability: false,
            activeItem: 'none',
            cursorPos: { x: 62, y: 65 },
          }));
        }, 4600)
      );

      // Beat 4: Click "+ Thêm" on Ba Rọi Heo CP (at 6.0s)
      timeoutIds.push(
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            cursorPos: { x: 62, y: 65 },
            activeItem: 'pork',
            isClicking: true,
          }));
        }, 6000)
      );

      timeoutIds.push(
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            isClicking: false,
            addedPork: true,
            cartCount: 3,
            cartBumping: true,
            showVoucherToast: true,
          }));
        }, 6250)
      );

      // Settle cart bump (at 6.8s)
      timeoutIds.push(
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            cartBumping: false,
          }));
        }, 6800)
      );

      // Beat 5: Hold Payoff (6.8s - 10.8s) -> Glide cursor to calm resting position
      timeoutIds.push(
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            cursorPos: { x: 82, y: 78 },
            activeItem: 'none',
          }));
        }, 8200)
      );

      // Loop Seam Reset (at 11.8s)
      timeoutIds.push(
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            showVoucherToast: false,
            addedPork: false,
          }));
        }, 11800)
      );
    };

    runLoop();
    const intervalId = setInterval(runLoop, 12800);

    return () => {
      timeoutIds.forEach(clearTimeout);
      clearInterval(intervalId);
    };
  }, [reducedMotion, isHovered]);

  const current = reducedMotion ? POSTER_STATE : state;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-[680px] mx-auto rounded-[8px] bg-white border border-[#E3E8E1] shadow-xl overflow-hidden select-none transition-shadow hover:shadow-2xl"
      aria-label="Minh họa quy trình mua sắm thực phẩm tươi sống Satrafoods trực tuyến"
    >
      {/* 1. Browser Chrome / Window Titlebar */}
      <div className="bg-[#F6F8F5] px-3.5 py-2.5 border-b border-[#E3E8E1] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
        </div>

        {/* Address Pill */}
        <div className="flex items-center gap-1.5 bg-white border border-[#E3E8E1] rounded-[4px] px-3 py-0.5 text-[11px] font-medium text-[#555E57] shadow-2xs">
          <svg className="w-3 h-3 text-[#01B341]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-[#111111] font-semibold">satrafoods.com.vn</span>
          <span className="text-[#889088]">/fresh-mart</span>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-1 text-[10.5px] font-bold text-[#006e24]">
          <span className="w-2 h-2 rounded-full bg-[#01B341] animate-pulse" />
          <span className="hidden sm:inline">Giao Nhanh 2H</span>
        </div>
      </div>

      {/* 2. Mini App Header */}
      <div className="bg-white px-3.5 py-2 border-b border-[#E3E8E1] flex items-center justify-between gap-2">
        {/* Brand Logo & Location */}
        <div className="flex items-center gap-2">
          <span className="font-black text-xs sm:text-sm tracking-tight text-[#01B341]">SATRAFOODS</span>
          <span className="text-[10px] bg-[#F6F8F5] text-[#555E57] px-1.5 py-0.5 rounded-[4px] border border-[#E3E8E1] hidden sm:inline">
            📍 TP. Hồ Chí Minh
          </span>
        </div>

        {/* Search Mockup (Quiet placeholder) */}
        <div className="flex-1 max-w-[200px] h-6 bg-[#F6F8F5] border border-[#E3E8E1] rounded-[4px] px-2 flex items-center gap-1.5">
          <svg className="w-3 h-3 text-[#717A73]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <div className="w-16 h-2 bg-[#DCE2DB] rounded-full" />
        </div>

        {/* Interactive Mini Cart Indicator */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] transition-all duration-300 ${
            current.cartBumping
              ? 'bg-[#DAFF01] text-[#111111] scale-105 shadow-md'
              : 'bg-[#01B341] text-white shadow-2xs'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="font-bold text-[11px] whitespace-nowrap">
            {current.cartCount} món
          </span>
          {current.addedPork && (
            <span className="text-[9px] bg-white/25 px-1 py-0.2 rounded font-black text-white">
              +1
            </span>
          )}
        </div>
      </div>

      {/* 3. Interactive Showcase Stage Canvas */}
      <div className="p-3.5 sm:p-4 bg-[#FDFCFC] relative min-h-[260px] sm:min-h-[290px] flex flex-col justify-between">
        {/* Floating Voucher Banner (Appears on Beat 4) */}
        <div
          className={`absolute top-2 left-3.5 right-3.5 z-20 transition-all duration-500 ease-out transform ${
            current.showVoucherToast
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 -translate-y-3 scale-95 pointer-events-none'
          }`}
        >
          <div className="bg-[#111111] text-white px-3 py-2 rounded-[4px] shadow-xl border border-[#DAFF01]/60 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#DAFF01] text-[#111111] flex items-center justify-center text-[10px] font-black">
                ✓
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-[11px] sm:text-xs text-[#DAFF01]">
                  Đạt giỏ hàng 200.000đ • Kích hoạt GIAO 2H MIỄN PHÍ!
                </span>
                <span className="text-[9.5px] text-[#A6B2A8]">
                  Áp dụng cho mọi phường xã tại TP.HCM & Cần Thơ
                </span>
              </div>
            </div>
            <span className="font-label-sm text-[10px] bg-[#DAFF01] text-[#111111] font-black px-2 py-0.5 rounded-[3px] uppercase">
              FREESHIP
            </span>
          </div>
        </div>

        {/* Shelf Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 bg-[#01B341] rounded-xs" />
            <span className="font-bold text-xs sm:text-[13px] text-[#111111] uppercase tracking-wide">
              Thực Phẩm Tươi Sống Trong Ngày
            </span>
            <span className="text-[10px] bg-[#DAFF01] text-[#111111] font-extrabold px-1.5 py-0.2 rounded-[2px]">
              VIETGAP
            </span>
          </div>

          <span className="text-[10.5px] text-[#006e24] font-semibold hover:underline cursor-pointer" onClick={onExplore}>
            Xem tất cả 180+ món →
          </span>
        </div>

        {/* Products Showcase Grid (Restrained Storytelling) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 relative">
          {/* Card 1: VietGAP Hydroponic Lettuce (The Traceability Story) */}
          <div
            className={`bg-white rounded-[4px] border p-2.5 transition-all duration-300 relative flex flex-col justify-between ${
              current.activeItem === 'lettuce'
                ? 'border-[#01B341] shadow-md ring-2 ring-[#01B341]/20'
                : 'border-[#E3E8E1] shadow-2xs'
            }`}
          >
            {/* VietGAP Tag */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-black text-[#006e24] bg-[#E8F8EC] px-1.5 py-0.5 rounded-[2px] uppercase">
                VietGAP
              </span>
              <button
                type="button"
                className="text-[9px] font-bold text-[#01B341] bg-[#F6F8F5] border border-[#E3E8E1] px-1.5 py-0.5 rounded-[2px] flex items-center gap-0.5 hover:border-[#01B341]"
              >
                <span>QR Nguồn gốc</span>
              </button>
            </div>

            {/* Product Image & Title */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[4px] bg-[#EAF7EE] flex items-center justify-center shrink-0 border border-[#D5EEDB]">
                <svg className="w-6 h-6 text-[#01B341]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-[11px] sm:text-xs text-[#111111] leading-tight line-clamp-2">
                  Xà Lách Thủy Canh VietGAP
                </h4>
                <span className="text-[9.5px] text-[#555E57]">Gói 300g • Tươi mới</span>
              </div>
            </div>

            {/* Price & Add */}
            <div className="flex items-center justify-between pt-1.5 border-t border-[#F0F4EF]">
              <span className="font-bold text-xs text-[#FF161F]">24.000đ</span>
              <span className="text-[10px] text-[#717A73] bg-[#F6F8F5] px-2 py-0.5 rounded-[2px]">Đã có</span>
            </div>

            {/* Popover Satellite (Beat 2: Harvest & Farm Verification) */}
            <div
              className={`absolute -top-16 left-0 right-0 sm:-right-8 sm:left-auto sm:w-[220px] z-30 transition-all duration-300 transform ${
                current.showTraceability
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
              }`}
            >
              <div className="bg-[#111111] text-white p-2 rounded-[4px] shadow-2xl border border-[#01B341] text-[10px]">
                <div className="flex items-center gap-1 font-bold text-[#DAFF01] mb-0.5">
                  <span>✓ 100% NÔNG TRƯỜNG VIETGAP</span>
                </div>
                <div className="text-[9px] text-[#E3E8E1] space-y-0.5">
                  <p>• HTX Rau Sạch Củ Chi, TP.HCM</p>
                  <p>• Thu hoạch: 05:30 Sáng nay</p>
                  <p className="text-[#DAFF01] font-semibold">• Mã QR: #SG-VG-8821 (Hợp chuẩn)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Fresh CP Pork Belly (The Hero Conversion Action) */}
          <div
            className={`bg-white rounded-[4px] border p-2.5 transition-all duration-300 relative flex flex-col justify-between ${
              current.activeItem === 'pork'
                ? 'border-[#01B341] shadow-lg ring-2 ring-[#01B341]/30 bg-[#F8FFF9]'
                : 'border-[#E3E8E1] shadow-2xs'
            }`}
          >
            {/* CP Badge */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-black text-[#24102E] bg-[#FC95FD] px-1.5 py-0.5 rounded-[2px] uppercase">
                Bình Ổn Giá
              </span>
              <span className="text-[9px] font-bold text-[#006e24]">Chuẩn CP</span>
            </div>

            {/* Product Image & Title */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[4px] bg-[#FFF0F2] flex items-center justify-center shrink-0 border border-[#FAD2D8]">
                <svg className="w-6 h-6 text-[#E63946]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-[11px] sm:text-xs text-[#111111] leading-tight line-clamp-2">
                  Ba Rọi Heo CP Tươi Sạch
                </h4>
                <span className="text-[9.5px] text-[#555E57]">Khay 500g • Mỗi sáng</span>
              </div>
            </div>

            {/* Price & Add Button */}
            <div className="flex items-center justify-between pt-1.5 border-t border-[#F0F4EF]">
              <div>
                <span className="font-black text-xs text-[#FF161F] block leading-none">139.000đ</span>
                <span className="text-[9px] text-[#717A73] line-through leading-none">155.000đ</span>
              </div>

              <button
                type="button"
                className={`px-2.5 py-1 rounded-[3px] font-bold text-[10.5px] flex items-center gap-1 transition-all duration-200 cursor-pointer ${
                  current.addedPork
                    ? 'bg-[#006e24] text-white scale-98 shadow-inner'
                    : current.activeItem === 'pork' && current.isClicking
                    ? 'bg-[#006e24] text-white scale-95 ring-2 ring-[#01B341]'
                    : 'bg-[#01B341] text-white hover:bg-[#006e24] shadow-xs'
                }`}
              >
                {current.addedPork ? (
                  <>
                    <span className="text-[11px]">✓</span> Đã thêm
                  </>
                ) : (
                  <>
                    <span className="text-[12px] leading-none">+</span> Thêm
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 3: Fresh Salmon (Quiet Placeholder/Supporting Card for Visual Restraint) */}
          <div className="bg-white rounded-[4px] border border-[#E3E8E1] p-2.5 shadow-2xs hidden sm:flex flex-col justify-between opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-bold text-[#006e24] bg-[#F6F8F5] px-1.5 py-0.5 rounded-[2px] uppercase">
                Tươi Sống
              </span>
              <div className="w-8 h-2 bg-[#E3E8E1] rounded-full" />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-[4px] bg-[#FFF5EB] flex items-center justify-center shrink-0 border border-[#FEDDC2]">
                <svg className="w-5 h-5 text-[#FF9400]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-[11px] text-[#111111] leading-tight truncate">
                  Cá Hồi Nauy Tươi
                </h4>
                <div className="w-16 h-2 bg-[#E3E8E1] rounded-full mt-1" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1.5 border-t border-[#F0F4EF]">
              <span className="font-bold text-xs text-[#FF161F]">98.000đ</span>
              <div className="w-12 h-5 bg-[#F6F8F5] rounded-[2px]" />
            </div>
          </div>
        </div>

        {/* Quiet footer filler bar adhering to Stageshow restraint */}
        <div className="mt-3 pt-2.5 border-t border-[#E3E8E1] flex items-center justify-between text-[10px] text-[#555E57]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#006e24]">✓ Đảm bảo tươi ngon:</span>
            <span>Đổi trả 100% trong 24h nếu không hài lòng</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-12 h-2 bg-[#E3E8E1] rounded-full" />
            <div className="w-8 h-2 bg-[#E3E8E1] rounded-full" />
          </div>
        </div>
      </div>

      {/* 4. Realistic Stageshow Cursor Overlay */}
      {!reducedMotion && (
        <div
          className="absolute z-50 pointer-events-none transition-all ease-out"
          style={{
            left: `${current.cursorPos.x}%`,
            top: `${current.cursorPos.y}%`,
            transitionDuration: '700ms',
            transitionTimingFunction: 'cubic-bezier(0.45, 0, 0.1, 1)',
            transform: 'translate(-2px, -2px)',
          }}
        >
          {/* Cursor Graphic */}
          <div
            className={`transition-transform duration-150 ${
              current.isClicking ? 'scale-85 translate-y-0.5' : 'scale-100'
            }`}
          >
            <svg
              className="w-5 h-5 drop-shadow-md"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 3L10.5 21L13.8 13.8L21 10.5L3 3Z"
                fill="#111111"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>

            {/* Ripple Wave when clicking */}
            {current.isClicking && (
              <span className="absolute -top-1 -left-1 w-7 h-7 rounded-full bg-[#01B341]/30 animate-ping pointer-events-none" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};