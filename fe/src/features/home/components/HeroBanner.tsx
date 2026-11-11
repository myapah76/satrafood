import React from 'react';
import { HeroStageshowDemo } from './HeroStageshowDemo';

interface HeroBannerProps {
  onExplore: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExplore }) => {
  return (
    <section className="w-full mb-6 mt-1">
      {/* Elevated Hero Showcase Container */}
      <div className="relative w-full rounded-[6px] sm:rounded-[8px] bg-gradient-to-br from-[#FFFFFF] via-[#F8FAF7] to-[#F1F6F0] border border-[#E3E8E1] p-4 sm:p-6 lg:p-8 shadow-sm overflow-hidden">
        {/* Soft Decorative Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#01B341]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-80 h-80 bg-[#DAFF01]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Brand Value Proposition & Direct CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            {/* Kicker Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8F8EC] border border-[#01B341]/30 text-[#006e24] rounded-[4px] text-[11px] sm:text-xs font-black uppercase tracking-wider w-fit mb-3 sm:mb-4 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#01B341] animate-pulse" />
              100% Nông Trường VietGAP & OCOP
            </div>

            {/* Main Headline */}
            <h1 className="font-headline-lg sm:font-headline-xl text-2xl sm:text-3xl lg:text-[38px] lg:leading-[44px] font-black text-[#111111] tracking-tight mb-3">
              Thịt Tươi Mỗi Sáng, <br className="hidden sm:inline" />
              <span className="text-[#01B341]">Nấu Trọn Bữa Ngon</span>
            </h1>

            {/* Sub-headline / Brand Promise */}
            <p className="font-body-md text-xs sm:text-sm text-[#555E57] mb-5 sm:mb-6 max-w-[480px] leading-relaxed">
              Hệ thống 180+ cửa hàng tiện lợi tại TP.HCM & Cần Thơ. Đặt rau củ quả, thịt sạch CP, cá tươi mỗi sáng — an tâm bình ổn giá, giao hỏa tốc 2 giờ.
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button
                type="button"
                onClick={onExplore}
                className="px-5 py-2.5 bg-[#01B341] hover:bg-[#006e24] text-white font-bold text-xs sm:text-sm rounded-[4px] shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer border-0 active:scale-98"
                aria-label="Khám phá ngay danh mục thực phẩm tươi sống"
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Mua Sắm Ngay</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const locator = document.getElementById('store-locator');
                  if (locator) locator.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2.5 bg-white hover:bg-[#F6F8F5] text-[#111111] hover:text-[#01B341] font-bold text-xs sm:text-sm rounded-[4px] border border-[#E3E8E1] hover:border-[#01B341] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-98"
              >
                <svg className="w-4 h-4 text-[#01B341]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>180+ Điểm Bán</span>
              </button>
            </div>

            {/* Social Proof Trust Badges */}
            <div className="pt-4 border-t border-[#E3E8E1]/80 grid grid-cols-3 gap-2 text-left">
              <div>
                <span className="font-black text-sm sm:text-base text-[#111111] block leading-none">
                  180+
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#717A73]">Cửa hàng tiện lợi</span>
              </div>
              <div>
                <span className="font-black text-sm sm:text-base text-[#01B341] block leading-none">
                  2 Giờ
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#717A73]">Giao trọn vị tươi</span>
              </div>
              <div>
                <span className="font-black text-sm sm:text-base text-[#111111] block leading-none">
                  100%
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#717A73]">Bình ổn giá chợ</span>
              </div>
            </div>
          </div>

          {/* Right Column: Stageshow Faux UI Interactive Experience */}
          <div className="lg:col-span-7 flex justify-center items-center w-full">
            <HeroStageshowDemo onExplore={onExplore} />
          </div>
        </div>
      </div>
    </section>
  );
};