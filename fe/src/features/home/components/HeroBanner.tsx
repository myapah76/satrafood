import React from 'react';

interface HeroBannerProps {
  onExplore: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExplore }) => {
  return (
    <section className="w-full rounded-[4px] overflow-hidden shadow-sm mb-4 mt-1">
      <img
        src="/images/Hero.png"
        alt="SATRAFOODS Hero Banner - Thịt Tươi Mỗi Sáng Nấu Trọn Bữa Ngon"
        className="w-full h-auto object-cover rounded-[4px] cursor-pointer hover:opacity-98 transition-opacity"
        onClick={onExplore}
      />
    </section>
  );
};
