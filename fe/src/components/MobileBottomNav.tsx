import React from 'react';
import { CartItem } from '../types';
import { HomeIcon, BoxIcon, TagIcon, LocationIcon, CartIcon } from './icons';

interface MobileBottomNavProps {
  currentView: 'home' | 'category';
  onNavigate: (view: 'home' | 'category', subCategory?: string) => void;
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenMembership: () => void;
  onOpenLocation: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onNavigate,
  cartItems,
  onOpenCart,
}) => {
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E3E8E1] shadow-[0_-4px_16px_rgba(17,17,17,0.06)] pb-[env(safe-area-inset-bottom,0px)]"
      aria-label="Điều hướng chính di động"
    >
      <div className="grid grid-cols-5 h-15 items-center px-1">
        {/* 1. Trang chủ */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center h-full w-full py-1 text-center transition-colors cursor-pointer bg-transparent border-0 rounded-[4px] ${
            currentView === 'home'
              ? 'text-[#01B341] font-bold'
              : 'text-[#555E57] hover:text-[#111111]'
          }`}
          type="button"
          aria-label="Trang chủ"
        >
          <HomeIcon className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight mt-0.5 leading-none">Trang chủ</span>
        </button>

        {/* 2. Danh mục */}
        <button
          onClick={() => onNavigate('category')}
          className={`flex flex-col items-center justify-center h-full w-full py-1 text-center transition-colors cursor-pointer bg-transparent border-0 rounded-[4px] ${
            currentView === 'category'
              ? 'text-[#01B341] font-bold'
              : 'text-[#555E57] hover:text-[#111111]'
          }`}
          type="button"
          aria-label="Danh mục sản phẩm"
        >
          <BoxIcon className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight mt-0.5 leading-none">Danh mục</span>
        </button>

        {/* 3. Khuyến mãi Hot (#FC95FD) */}
        <button
          onClick={() => {
            onNavigate('category', 'Khuyến mãi hot');
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
          }}
          className="flex flex-col items-center justify-center h-full w-full py-1 text-center transition-colors cursor-pointer bg-transparent border-0 rounded-[4px] text-[#555E57] hover:text-[#111111]"
          type="button"
          aria-label="Khuyến mãi"
        >
          <div className="relative flex items-center justify-center">
            <TagIcon className="w-5 h-5 text-[#FF161F] mb-0.5" />
            <span className="absolute -top-1 -right-2 px-1 py-0.5 bg-[#FC95FD] text-[#24102E] text-[8px] font-black rounded-[4px] leading-tight tracking-[1px]">
              HOT
            </span>
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 leading-none text-[#111111] font-semibold">Ưu đãi</span>
        </button>

        {/* 4. Cửa hàng */}
        <button
          onClick={() => {
            if (currentView !== 'home') {
              onNavigate('home');
              setTimeout(() => {
                document.getElementById('store-locator')?.scrollIntoView({ behavior: 'smooth' });
              }, 150);
            } else {
              document.getElementById('store-locator')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="flex flex-col items-center justify-center h-full w-full py-1 text-center transition-colors cursor-pointer bg-transparent border-0 rounded-[4px] text-[#555E57] hover:text-[#111111]"
          type="button"
          aria-label="Cửa hàng"
        >
          <LocationIcon className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight mt-0.5 leading-none">Cửa hàng</span>
        </button>

        {/* 5. Giỏ hàng */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center h-full w-full py-1 text-center transition-colors cursor-pointer bg-transparent border-0 rounded-[4px] text-[#006e24] hover:text-[#01B341]"
          type="button"
          aria-label="Giỏ hàng"
        >
          <div className="relative flex items-center justify-center">
            <CartIcon className="w-5 h-5 mb-0.5" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 bg-[#DAFF01] text-[#111111] text-[10px] font-bold rounded-[4px] flex items-center justify-center border border-white shadow-xs">
                {totalCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 leading-none font-bold">Giỏ hàng</span>
        </button>
      </div>
    </nav>
  );
};
