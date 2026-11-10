import React from 'react';

interface HeroBannerProps {
  onExplore: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExplore }) => {
  return (
    <section className="w-full rounded-[4px] overflow-hidden shadow-sm mb-4 mt-1">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd6DgUy3G0ro6Xj-nzFbGUkXeIhalpkCiNwgZm3HioxueCJz8wGoir07zgt7gMgDEyrZjRZEng306OU69AImu1xXOdsgfndxmGSERaKsf302Y_OobfteB-MAQFb-2U6PBS76Qi-qF0tEGAIo8YWW1JDWVbRIt0t-YFKYWMCOajENP2irUdDYxwPeLkfSkEx6BI4MQuOiXloeWHi7IihJTr6WOOanc4qmSjfdoLf83ACFc546mz4TaeSg"
        alt="SATRAFOODS Hero Banner - Thịt Tươi Mỗi Sáng Nấu Trọn Bữa Ngon"
        className="w-full h-auto object-cover rounded-[4px] cursor-pointer hover:opacity-98 transition-opacity"
        onClick={onExplore}
      />
    </section>
  );
};
