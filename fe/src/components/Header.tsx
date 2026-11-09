import React, { useState } from 'react';
import { CartItem } from '../types';

interface HeaderProps {
  currentView: 'home' | 'category';
  onNavigate: (view: 'home' | 'category', subCategory?: string) => void;
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenMembership: () => void;
  onOpenLocation: () => void;
  selectedCity: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cartItems,
  onOpenCart,
  onOpenMembership,
  onOpenLocation,
  selectedCity,
  searchQuery,
  onSearchChange,
}) => {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subCategories = [
    { label: 'Tất cả thực phẩm tươi sống', id: 'all' },
    { label: 'Thịt heo thảo mộc & VietGAP', id: 'Thịt heo thảo mộc & VietGAP' },
    { label: 'Bò Úc & Bò ta nhập khẩu', id: 'Bò Úc & Bò ta nhập khẩu' },
    { label: 'Gia cầm tươi chuẩn CP', id: 'Gia cầm tươi chuẩn CP' },
    { label: 'Cá & Hải sản tươi sống', id: 'Cá & Hải sản tươi sống' },
    { label: 'Rau ăn lá VietGAP', id: 'Rau ăn lá VietGAP' },
    { label: 'Củ quả sạch Đà Lạt', id: 'Củ quả sạch Đà Lạt' },
    { label: 'Trái cây nhiệt đới Nam Bộ', id: 'Trái cây nhiệt đới Nam Bộ' },
    { label: 'Món sơ chế nấu ngay', id: 'Món sơ chế nấu ngay' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF] shadow-[0_4px_16px_rgba(17,17,17,0.08)] border-b border-[#E3E8E1]">
      {/* Top Bar - Desktop */}
      <div className="hidden md:block h-20 bg-[#FFFFFF]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 h-full flex items-center justify-between gap-4">
          {currentView === 'home' ? (
            <>
              {/* Left: Delivery + Search */}
              <div className="flex items-center gap-3 flex-1 max-w-[380px]">
                <button
                  onClick={onOpenLocation}
                  className="flex items-center gap-1.5 bg-[#F6F8F5] border border-[#E3E8E1] rounded-full px-3 py-1.5 shrink-0 text-left hover:bg-[#f1edec] transition-colors cursor-pointer"
                  type="button"
                  aria-label="Chọn khu vực giao hàng"
                >
                  <span className="material-symbols-outlined text-[#006e24] text-[18px]">
                    local_shipping
                  </span>
                  <div className="flex flex-col leading-none">
                    <span className="font-label-sm text-[10px] text-[#006e24] uppercase font-bold">
                      &nbsp;Giao nhanh 2h
                    </span>
                    <span className="font-body-sm text-[12px] text-[#111111] font-semibold">
                      {selectedCity.includes('Cần Thơ') ? 'Cần Thơ' : 'TP.HCM'}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[#555E57] text-[16px]">
                    expand_more
                  </span>
                </button>

                <div className="flex-1 relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                    <span className="material-symbols-outlined text-[#6d7b6a] text-[18px]">
                      search
                    </span>
                  </div>
                  <input
                    className="w-full h-9 pl-9 pr-3 bg-[#F6F8F5] border border-[#E3E8E1] rounded-full font-body-sm text-[13px] text-[#111111] placeholder:text-[#555E57] focus:outline-none focus:border-[#01B341] focus:bg-[#FFFFFF] transition-all"
                    placeholder="Tìm rau củ, thịt tươi..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      onSearchChange(e.target.value);
                      if (e.target.value.trim() !== '') {
                        onNavigate('category');
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onNavigate('category');
                      }
                    }}
                  />
                </div>
              </div>

              {/* Center: SATRAFOODS Brand Logo */}
              <div className="shrink-0 px-6 flex items-center justify-center">
                <button
                  onClick={() => onNavigate('home')}
                  className="inline-flex items-center justify-center hover:opacity-95 transition-opacity bg-transparent border-0 cursor-pointer p-0"
                  aria-label="Trang chủ Satrafoods"
                >
                  <img
                    alt="SATRAFOODS"
                    className="h-9 w-auto object-contain"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHxkGMdUJhI3u0eym5gViRsz7AvScSba5gFHF5r-o767qlFJSlORJ1uHAVHOye6JVzYUHRvM_DW9BQxTjDnRZ2xgpKWiPOQ4zhiQ5npwRjMXC5a82VE1iX7oEk1zAKrR2uVoaq_qW6M00QvSF2l-dH_W4rR5icSXz6QCiFLLtIZpShl93Q1QzYFPnvrjBlnXEqFYI3Jp9Pxl4DiRlzwdNSZl2XkwpNCu6xDw99IyHu1DFq4cL6vnG4vQ"
                  />
                </button>
              </div>

              {/* Right: Member + Cart + Avatar */}
              <div className="flex items-center justify-end gap-2.5 flex-1 max-w-[380px]">
                <button
                  onClick={onOpenMembership}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F6F8F5] border border-[#E3E8E1] hover:bg-[#f1edec] transition-colors text-[#111111] cursor-pointer"
                  type="button"
                  aria-label="Tích điểm thành viên"
                >
                  <div className="w-6 h-6 rounded-full bg-[#DAFF01]/30 flex items-center justify-center text-[#006e24] shrink-0">
                    <span className="material-symbols-outlined text-[15px]">card_membership</span>
                  </div>
                  <div className="flex flex-col text-left leading-none">
                    <span className="font-label-sm text-[10px] text-[#555E57]">Tích điểm 2%</span>
                    <span className="font-label-md text-[12px] text-[#111111] font-semibold">
                      Thành viên
                    </span>
                  </div>
                </button>

                <button
                  onClick={onOpenCart}
                  className="relative flex items-center gap-1.5 bg-[#F6F8F5] border border-[#E3E8E1] px-3 py-1.5 rounded-full hover:bg-[#f1edec] transition-colors cursor-pointer"
                  type="button"
                  aria-label="Giỏ hàng Satrafoods"
                >
                  <span className="material-symbols-outlined text-[#006e24] text-[18px]">
                    shopping_bag
                  </span>
                  <div className="flex flex-col leading-none text-left">
                    <span className="font-label-sm text-[10px] text-[#555E57]">Giỏ hàng</span>
                    <span className="font-label-md text-[12px] text-[#111111] font-bold">
                      {totalCount > 0 ? `${totalCount} món` : '0đ'}
                    </span>
                  </div>
                  <span className="w-4 h-4 bg-[#DAFF01] text-[#111111] font-label-sm text-[10px] rounded-full flex items-center justify-center font-bold border border-[#FFFFFF] ml-0.5">
                    {totalCount}
                  </span>
                </button>

                <button
                  onClick={onOpenMembership}
                  className="w-8 h-8 rounded-full bg-[#006e24] flex items-center justify-center shrink-0 cursor-pointer hover:bg-[#01B341] transition-colors border-0 text-white"
                  type="button"
                  aria-label="Tài khoản"
                >
                  <span className="material-symbols-outlined text-white text-[18px]">person</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Category screen top bar */}
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center gap-4 shrink-0 cursor-pointer bg-transparent border-0 p-0 hover:opacity-95 transition-opacity"
                aria-label="Satrafoods Trang Chủ"
              >
                <img
                  alt="SATRAFOODS"
                  className="h-9 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHxkGMdUJhI3u0eym5gViRsz7AvScSba5gFHF5r-o767qlFJSlORJ1uHAVHOye6JVzYUHRvM_DW9BQxTjDnRZ2xgpKWiPOQ4zhiQ5npwRjMXC5a82VE1iX7oEk1zAKrR2uVoaq_qW6M00QvSF2l-dH_W4rR5icSXz6QCiFLLtIZpShl93Q1QzYFPnvrjBlnXEqFYI3Jp9Pxl4DiRlzwdNSZl2XkwpNCu6xDw99IyHu1DFq4cL6vnG4vQ"
                />
              </button>

              <button
                onClick={onOpenLocation}
                className="flex items-center gap-2 bg-[#F6F8F5] border border-[#E3E8E1] rounded-lg px-3 py-1.5 shrink-0 text-left hover:bg-[#f1edec] transition-colors cursor-pointer"
                type="button"
                aria-label="Chọn khu vực giao hàng"
              >
                <span className="material-symbols-outlined text-[#01B341] text-[22px]">
                  local_shipping
                </span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-[10px] text-[#01B341] uppercase font-bold">
                    Giao nhanh 2h
                  </span>
                  <span className="font-body-sm text-[13px] text-[#111111] font-semibold">
                    {selectedCity}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[#555E57] text-[18px]">
                  expand_more
                </span>
              </button>

              <div className="flex-1 max-w-xl">
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 pointer-events-none flex items-center">
                    <span className="material-symbols-outlined text-[#6d7b6a] text-[20px]">
                      search
                    </span>
                  </div>
                  <input
                    className="w-full h-11 pl-11 pr-24 bg-[#F6F8F5] border border-[#E3E8E1] rounded-lg font-body-md text-sm text-[#111111] placeholder:text-[#555E57] focus:outline-none focus:border-[#01B341] focus:bg-[#FFFFFF] transition-all"
                    placeholder="Tìm thịt heo VietGAP, cá tươi, rau củ quả..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={onOpenMembership}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#F6F8F5] transition-colors text-[#111111] cursor-pointer bg-transparent border-0"
                  type="button"
                  aria-label="Tích điểm thành viên"
                >
                  <div className="w-8 h-8 rounded-full bg-[#F6F8F5] border border-[#E3E8E1] flex items-center justify-center text-[#006e24]">
                    <span className="material-symbols-outlined text-[18px]">card_membership</span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-label-sm text-[10px] text-[#555E57]">Tích điểm 2%</span>
                    <span className="font-label-md text-xs text-[#111111] font-bold">Thành viên</span>
                  </div>
                </button>

                <button
                  onClick={onOpenCart}
                  className="relative flex items-center gap-2 bg-[#F6F8F5] border border-[#E3E8E1] px-3 py-1.5 rounded-lg hover:bg-[#f1edec] transition-colors cursor-pointer"
                  type="button"
                  aria-label="Giỏ hàng Satrafoods"
                >
                  <span className="material-symbols-outlined text-[#01B341] text-[22px]">
                    shopping_bag
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="font-label-sm text-[10px] text-[#555E57]">Giỏ hàng</span>
                    <span className="font-label-md text-xs text-[#111111] font-bold">
                      {totalCount > 0 ? `${totalCount} món` : '0đ'}
                    </span>
                  </div>
                  {totalCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#DAFF01] text-[#111111] font-label-sm text-[11px] rounded-full flex items-center justify-center font-bold border border-[#FFFFFF] shadow-xs">
                      {totalCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={onOpenMembership}
                  className="w-8 h-8 rounded-full bg-[#01B341] flex items-center justify-center shrink-0 cursor-pointer text-white border-0 hover:bg-[#006e24] transition-colors"
                  type="button"
                  aria-label="Tài khoản"
                >
                  <span className="material-symbols-outlined text-[18px]">person</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* MOBILE HEADER (md:hidden) */}
      <div className="flex md:hidden flex-col bg-white">
        {/* Row 1: Logo + Delivery Location + Member + Cart */}
        <div className="px-3 py-2.5 flex items-center justify-between gap-2 border-b border-[#E3E8E1]">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center shrink-0 cursor-pointer bg-transparent border-0 p-0"
            aria-label="Satrafoods Trang Chủ"
          >
            <img
              alt="SATRAFOODS"
              className="h-7 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHxkGMdUJhI3u0eym5gViRsz7AvScSba5gFHF5r-o767qlFJSlORJ1uHAVHOye6JVzYUHRvM_DW9BQxTjDnRZ2xgpKWiPOQ4zhiQ5npwRjMXC5a82VE1iX7oEk1zAKrR2uVoaq_qW6M00QvSF2l-dH_W4rR5icSXz6QCiFLLtIZpShl93Q1QzYFPnvrjBlnXEqFYI3Jp9Pxl4DiRlzwdNSZl2XkwpNCu6xDw99IyHu1DFq4cL6vnG4vQ"
            />
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenLocation}
              className="flex items-center gap-1 px-2.5 py-1 bg-[#F6F8F5] border border-[#E3E8E1] rounded-full text-[11px] font-bold text-[#006e24] cursor-pointer hover:bg-[#f1edec]"
              aria-label="Chọn khu vực giao hàng"
            >
              <span className="material-symbols-outlined text-[15px]">local_shipping</span>
              <span className="truncate max-w-[80px]">
                {selectedCity.includes('Cần Thơ') ? 'Cần Thơ' : 'TP.HCM'}
              </span>
              <span className="material-symbols-outlined text-[14px] text-[#555E57]">expand_more</span>
            </button>

            <button
              onClick={onOpenMembership}
              className="w-8 h-8 rounded-full bg-[#F6F8F5] border border-[#E3E8E1] flex items-center justify-center text-[#006e24] cursor-pointer hover:bg-[#f1edec]"
              aria-label="Tài khoản Satra Rewards"
            >
              <span className="material-symbols-outlined text-[18px]">card_membership</span>
            </button>

            <button
              onClick={onOpenCart}
              className="relative w-8 h-8 rounded-full bg-[#01B341] text-white flex items-center justify-center cursor-pointer hover:bg-[#006e24]"
              aria-label="Giỏ hàng"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-[#DAFF01] text-[#111111] text-[10px] rounded-full flex items-center justify-center font-bold border border-white">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Mobile Search input */}
        <div className="px-3 py-2 bg-[#F6F8F5] border-b border-[#E3E8E1]">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[#6d7b6a] text-[18px] pointer-events-none">
              search
            </span>
            <input
              className="w-full h-9 pl-9 pr-8 bg-white border border-[#E3E8E1] rounded-full text-xs text-[#111111] placeholder:text-[#555E57] focus:outline-none focus:border-[#01B341] transition-all"
              placeholder="Tìm thịt heo VietGAP, cá tươi, rau củ quả..."
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (e.target.value.trim() !== '') {
                  onNavigate('category');
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onNavigate('category');
                }
              }}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:text-black border-0 cursor-pointer p-0"
                aria-label="Xóa tìm kiếm"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Row 3: Horizontal scrollable category links */}
        <div className="px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap bg-white text-xs scrollbar-none">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 cursor-pointer border-0 ${
              currentView === 'home'
                ? 'bg-[#01B341] text-white'
                : 'bg-[#F6F8F5] text-[#555E57] hover:text-[#111111]'
            }`}
          >
            Trang chủ
          </button>
          <button
            onClick={() => onNavigate('category')}
            className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 cursor-pointer border-0 ${
              currentView === 'category'
                ? 'bg-[#01B341] text-white'
                : 'bg-[#F6F8F5] text-[#555E57] hover:text-[#111111]'
            }`}
          >
            Thực phẩm tươi sống
          </button>
          <button
            onClick={() => onNavigate('category')}
            className="px-2.5 py-1 rounded-full text-xs font-bold shrink-0 cursor-pointer border-0 bg-[#DAFF01] text-[#111111] flex items-center gap-1"
          >
            <span className="text-[12px]">🔥</span>
            <span>Ưu đãi HOT</span>
          </button>
          {subCategories.slice(1, 6).map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate('category', cat.id)}
              className="px-2.5 py-1 rounded-full text-xs font-medium shrink-0 cursor-pointer border-0 bg-[#F6F8F5] text-[#555E57] hover:text-[#111111]"
            >
              {cat.label.replace(' & VietGAP', '').replace(' tươi sống', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Navigation Sub-Bar - Desktop Only */}
      <div className="hidden md:block bg-[#FFFFFF] border-t border-[#E3E8E1]">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-10 h-11 flex items-center justify-between text-xs font-medium overflow-x-auto">
          <div className="flex items-center gap-4 lg:gap-6 shrink-0">
            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-1.5 bg-[#01B341] text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-opacity-90 transition-colors cursor-pointer text-xs border-0"
                type="button"
              >
                <span className="material-symbols-outlined text-sm">menu</span>
                <span className="whitespace-nowrap">Danh mục sản phẩm</span>
                <span className="material-symbols-outlined text-sm">
                  {isCategoryMenuOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {isCategoryMenuOpen && (
                <div
                  className="absolute left-0 top-full mt-1.5 w-64 bg-white border border-[#E3E8E1] rounded-xl shadow-xl py-2 z-50 text-left"
                  onMouseLeave={() => setIsCategoryMenuOpen(false)}
                >
                  {subCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setIsCategoryMenuOpen(false);
                        onNavigate('category', cat.id === 'all' ? undefined : cat.id);
                      }}
                      className="w-full px-4 py-2 text-left text-[13px] hover:bg-[#F6F8F5] text-[#111111] hover:text-[#01B341] font-medium flex items-center justify-between transition-colors cursor-pointer border-0 bg-transparent"
                    >
                      <span>{cat.label}</span>
                      <span className="material-symbols-outlined text-[16px] text-[#555E57]">
                        chevron_right
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('home')}
              className={`text-xs font-semibold transition-colors cursor-pointer bg-transparent border-0 py-1 whitespace-nowrap ${
                currentView === 'home'
                  ? 'text-[#01B341] border-b-2 border-[#01B341]'
                  : 'text-[#111111] hover:text-[#01B341]'
              }`}
            >
              Trang chủ
            </button>

            <button
              onClick={() => onNavigate('category')}
              className={`text-xs font-semibold transition-colors cursor-pointer bg-transparent border-0 py-1 whitespace-nowrap ${
                currentView === 'category'
                  ? 'text-[#01B341] border-b-2 border-[#01B341]'
                  : 'text-[#111111] hover:text-[#01B341]'
              }`}
            >
              Thực phẩm tươi sống
            </button>

            <button
              onClick={() => onNavigate('category')}
              className="flex items-center gap-1.5 text-[#111111] hover:text-[#01B341] font-semibold transition-colors cursor-pointer bg-transparent border-0 py-1 whitespace-nowrap"
            >
              <span className="px-1.5 py-0.5 rounded bg-[#DAFF01] text-[#111111] text-[10px] font-bold">
                HOT
              </span>
              <span>Khuyến mãi hot</span>
            </button>
          </div>

          {/* Store Network */}
          <button
            onClick={() => {
              if (currentView !== 'home') {
                onNavigate('home');
                setTimeout(() => {
                  document.getElementById('store-locator')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                document.getElementById('store-locator')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="hidden sm:flex items-center gap-1.5 text-[#555E57] hover:text-[#01B341] cursor-pointer transition-colors bg-transparent border-0 text-xs font-medium shrink-0 ml-4"
            type="button"
          >
            <span className="material-symbols-outlined text-sm text-[#01B341]">pin_drop</span>
            <span>Hệ thống 180+ Cửa hàng</span>
          </button>
        </div>
      </div>
    </header>
  );
};
