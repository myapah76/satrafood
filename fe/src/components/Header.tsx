import React, { useState, useRef, useEffect } from 'react';
import { CartItem } from '../types';
import { getSlugByCategory } from '../utils/slug';

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
  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(event.target as Node)
      ) {
        setIsCategoryMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const subCategories = [
    { label: 'Tất cả thực phẩm tươi sống', id: 'all', icon: 'storefront' },
    { label: 'Thịt heo thảo mộc & VietGAP', id: 'Thịt heo thảo mộc & VietGAP', icon: 'nutrition' },
    { label: 'Bò Úc & Bò ta nhập khẩu', id: 'Bò Úc & Bò ta nhập khẩu', icon: 'set_meal' },
    { label: 'Gia cầm tươi chuẩn CP', id: 'Gia cầm tươi chuẩn CP', icon: 'egg' },
    { label: 'Cá & Hải sản tươi sống', id: 'Cá & Hải sản tươi sống', icon: 'phishing' },
    { label: 'Rau ăn lá VietGAP', id: 'Rau ăn lá VietGAP', icon: 'eco' },
    { label: 'Củ quả sạch Đà Lạt', id: 'Củ quả sạch Đà Lạt', icon: 'agriculture' },
    { label: 'Trái cây nhiệt đới Nam Bộ', id: 'Trái cây nhiệt đới Nam Bộ', icon: 'yard' },
    { label: 'Món sơ chế nấu ngay', id: 'Món sơ chế nấu ngay', icon: 'skillet' },
  ];

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== '') {
      onNavigate('category');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF] shadow-[0_2px_12px_rgba(17,17,17,0.06)] border-b border-[#E3E8E1]">
      {/* DESKTOP HEADER (hidden md:block) - Exactly matches the design specification screenshot */}
      <div className="hidden md:block">
        {/* ROW 1: Top Bar: Left (Delivery + Search) | Center (Logo) | Right (Rewards + Cart + Avatar) */}
        <div className="h-[68px] bg-[#FFFFFF] border-b border-[#E3E8E1]/60">
          <div className="max-w-[1240px] mx-auto px-4 lg:px-8 h-full flex items-center justify-between gap-4">
            
            {/* 1. Left Group: Delivery Location Box + Search Input Box */}
            <div className="flex items-center gap-2.5 shrink-0">
              {/* Delivery Location Selector Box */}
              <button
                onClick={onOpenLocation}
                className="flex items-center gap-2 bg-[#FFFFFF] border border-[#E3E8E1] rounded-[4px] px-3 py-1.5 shrink-0 text-left hover:border-[#01B341] transition-colors cursor-pointer shadow-2xs"
                type="button"
                aria-label="Chọn khu vực giao hàng"
              >
                <span className="material-symbols-outlined text-[#01B341] text-[22px]">
                  two_wheeler
                </span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-[9.5px] text-[#01B341] uppercase font-black tracking-wider leading-none">
                    GIAO NHANH 2H
                  </span>
                  <span className="font-body-sm text-[12px] text-[#111111] font-bold leading-tight truncate max-w-[90px]">
                    {selectedCity.includes('Cần Thơ') ? 'CẦN THƠ' : 'TP.HCM'}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[#555E57] text-[16px] ml-0.5">
                  expand_more
                </span>
              </button>

              {/* Search Bar Box */}
              <div className="relative flex items-center bg-[#FFFFFF] border border-[#E3E8E1] rounded-[4px] px-2.5 py-1.5 w-60 lg:w-68 focus-within:border-[#01B341] focus-within:ring-1 focus-within:ring-[#01B341]/30 transition-all shadow-2xs">
                <span className="material-symbols-outlined text-[#555E57] text-[18px] mr-1.5 pointer-events-none">
                  search
                </span>
                <input
                  className="w-full bg-transparent font-body-md text-xs text-[#111111] placeholder:text-[#555E57] outline-none"
                  placeholder="Tìm rau củ, thịt tươi..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    if (e.target.value.trim() !== '' && currentView !== 'category') {
                      onNavigate('category');
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchSubmit();
                    }
                  }}
                  aria-label="Tìm kiếm thực phẩm"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="text-[#555E57] hover:text-[#111111] cursor-pointer bg-transparent border-0 p-0.5 flex items-center justify-center rounded-[4px]"
                    title="Xóa tìm kiếm"
                    type="button"
                    aria-label="Xóa nội dung tìm kiếm"
                  >
                    <span className="material-symbols-outlined text-[15px]">close</span>
                  </button>
                )}
              </div>
            </div>

            {/* 2. Center: SATRAFOODS Brand Name / Stencil Logo (Prominently Centered) */}
            <div className="flex items-center justify-center shrink-0 px-2">
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center justify-center cursor-pointer bg-transparent border-0 p-0.5 rounded-[4px] hover:opacity-95 transition-opacity"
                aria-label="Satrafoods Trang Chủ - Logo thương hiệu"
              >
                <img
                  alt="SATRAFOODS"
                  className="h-10 lg:h-11 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHxkGMdUJhI3u0eym5gViRsz7AvScSba5gFHF5r-o767qlFJSlORJ1uHAVHOye6JVzYUHRvM_DW9BQxTjDnRZ2xgpKWiPOQ4zhiQ5npwRjMXC5a82VE1iX7oEk1zAKrR2uVoaq_qW6M00QvSF2l-dH_W4rR5icSXz6QCiFLLtIZpShl93Q1QzYFPnvrjBlnXEqFYI3Jp9Pxl4DiRlzwdNSZl2XkwpNCu6xDw99IyHu1DFq4cL6vnG4vQ"
                />
              </button>
            </div>

            {/* 3. Right Group: Satra Rewards Box + Cart Box + Avatar Button */}
            <div className="flex items-center justify-end gap-2.5 shrink-0">
              {/* Satra Rewards Box */}
              <button
                onClick={onOpenMembership}
                className="flex items-center gap-2 bg-[#FFFFFF] border border-[#E3E8E1] rounded-[4px] px-3 py-1.5 hover:border-[#01B341] transition-colors text-[#111111] cursor-pointer shadow-2xs"
                type="button"
                aria-label="Tích điểm thành viên Satra Rewards"
              >
                <span className="material-symbols-outlined text-[#01B341] text-[22px]">
                  redeem
                </span>
                <div className="flex flex-col text-left">
                  <span className="font-label-sm text-[9.5px] text-[#555E57] leading-none">
                    Tích điểm 2%
                  </span>
                  <span className="font-label-md text-xs text-[#111111] font-bold leading-tight">
                    Thành viên
                  </span>
                </div>
              </button>

              {/* Cart Box with Lime Yellow Badge */}
              <button
                onClick={onOpenCart}
                className="relative flex items-center gap-2 bg-[#FFFFFF] border border-[#E3E8E1] rounded-[4px] px-3 py-1.5 hover:border-[#01B341] transition-colors cursor-pointer shadow-2xs"
                type="button"
                aria-label="Giỏ hàng Satrafoods"
              >
                <span className="material-symbols-outlined text-[#01B341] text-[22px]">
                  shopping_basket
                </span>
                <div className="flex flex-col text-left">
                  <span className="font-label-sm text-[9.5px] text-[#555E57] leading-none">
                    Giỏ hàng
                  </span>
                  <span className="font-label-md text-xs text-[#111111] font-bold leading-tight">
                    {totalCount > 0 ? `${totalCount} món` : '0đ'}
                  </span>
                </div>
                {/* Yellow counter badge matching screenshot */}
                <span className="bg-[#DAFF01] text-[#111111] font-black text-[11px] px-1.5 py-0.2 rounded-[4px] ml-1 shadow-2xs">
                  {totalCount}
                </span>
              </button>

              {/* User Account / Avatar Button (Solid Green Square Button) */}
              <button
                onClick={onOpenMembership}
                className="w-9 h-9 rounded-[4px] bg-[#01B341] flex items-center justify-center shrink-0 cursor-pointer text-white border-0 hover:bg-[#006e24] transition-colors shadow-xs"
                type="button"
                aria-label="Tài khoản khách hàng"
              >
                <span className="material-symbols-outlined text-[20px]">person</span>
              </button>
            </div>
          </div>
        </div>

        {/* ROW 2: Sub-Bar: Left (Danh mục sản phẩm + HOT Khuyến mãi hot) | Right (Hệ thống 180+ Cửa hàng) */}
        <div className="h-11 bg-[#FFFFFF]">
          <div className="max-w-[1240px] mx-auto px-4 lg:px-8 h-full flex items-center justify-between text-xs">
            {/* Left side: Danh mục sản phẩm (sổ ra danh mục con) + HOT Khuyến mãi hot */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Green "Danh mục sản phẩm" button with dropdown */}
              <div
                ref={categoryMenuRef}
                className="relative"
                onMouseEnter={() => setIsCategoryMenuOpen(true)}
                onMouseLeave={() => setIsCategoryMenuOpen(false)}
              >
                <button
                  onClick={() => setIsCategoryMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 bg-[#01B341] text-white px-3.5 py-1.5 rounded-[4px] font-bold hover:bg-[#006e24] transition-colors cursor-pointer text-xs border-0 shadow-xs"
                  type="button"
                  aria-expanded={isCategoryMenuOpen}
                  aria-label="Danh mục sản phẩm"
                >
                  <span className="material-symbols-outlined text-[18px]">menu</span>
                  <span className="whitespace-nowrap font-bold">Danh mục sản phẩm</span>
                  <span className="material-symbols-outlined text-[16px] transition-transform duration-200">
                    {isCategoryMenuOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {/* Sổ ra danh mục con tươi sống */}
                {isCategoryMenuOpen && (
                  <div className="absolute left-0 top-full pt-1.5 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="bg-white border border-[#E3E8E1] rounded-[4px] shadow-2xl py-2 text-left">
                      <div className="px-3.5 py-1.5 text-[11px] font-bold text-[#555E57] uppercase tracking-wider border-b border-[#E3E8E1] mb-1 flex items-center justify-between">
                        <span>Phân ngành hàng tươi sống</span>
                        <span className="text-[10px] bg-[#DAFF01] text-[#111111] px-1.5 py-0.5 rounded-[4px] font-black">
                          VietGAP
                        </span>
                      </div>
                      {subCategories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setIsCategoryMenuOpen(false);
                            onNavigate('category', cat.id === 'all' ? undefined : cat.id);
                          }}
                          data-slug={getSlugByCategory(cat.id === 'all' ? undefined : cat.id)}
                          className="w-full px-3.5 py-2 text-left text-[13px] hover:bg-[#F6F8F5] text-[#111111] hover:text-[#01B341] font-medium flex items-center justify-between transition-colors cursor-pointer border-0 bg-transparent rounded-[4px] group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="material-symbols-outlined text-[18px] text-[#01B341] shrink-0 group-hover:scale-110 transition-transform">
                              {cat.icon}
                            </span>
                            <span className="truncate">{cat.label}</span>
                          </div>
                          <span className="material-symbols-outlined text-[16px] text-[#555E57] group-hover:text-[#01B341] group-hover:translate-x-0.5 transition-all shrink-0">
                            chevron_right
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* HOT Khuyến mãi hot: HOT là màu hồng, Khuyến mãi hot là KHÔNG CÓ MÀU NỀN */}
              <button
                onClick={() => onNavigate('category', 'Khuyến mãi hot')}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-[4px] text-xs font-bold transition-all cursor-pointer border-0 bg-transparent hover:opacity-85"
                aria-label="Khuyến mãi hot"
              >
                <span className="bg-[#FC95FD] text-[#111111] font-extrabold text-[10.5px] px-1.5 py-0.5 rounded-[4px] shadow-2xs">
                  HOT
                </span>
                <span className="text-[#111111] hover:text-[#01B341] font-bold text-xs transition-colors">
                  Khuyến mãi hot
                </span>
              </button>
            </div>

            {/* Right side: Hệ thống 180+ Cửa hàng */}
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
              className="flex items-center gap-1.5 text-[#111111] hover:text-[#01B341] cursor-pointer transition-colors bg-transparent border-0 text-xs font-semibold shrink-0 rounded-[4px] px-2 py-1"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] text-[#01B341]">pin_drop</span>
              <span>Hệ thống 180+ Cửa hàng</span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE HEADER (md:hidden) */}
      <div className="flex md:hidden flex-col bg-white">
        {/* Row 1: Location + Logo (Centered) + Member + Cart */}
        <div className="px-3 py-2 flex items-center justify-between gap-2 border-b border-[#E3E8E1]">
          {/* Mobile Delivery Location */}
          <button
            onClick={onOpenLocation}
            className="flex items-center gap-1 px-2 py-1 bg-[#F6F8F5] border border-[#E3E8E1] rounded-[4px] text-[11px] font-bold text-[#006e24] cursor-pointer hover:bg-[#f1edec]"
            aria-label="Chọn khu vực giao hàng"
          >
            <span className="material-symbols-outlined text-[15px]">two_wheeler</span>
            <span className="truncate max-w-[70px]">
              {selectedCity.includes('Cần Thơ') ? 'Cần Thơ' : 'TP.HCM'}
            </span>
            <span className="material-symbols-outlined text-[14px] text-[#555E57]">expand_more</span>
          </button>

          {/* Mobile Center Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center justify-center cursor-pointer bg-transparent border-0 p-0"
            aria-label="Satrafoods Trang Chủ"
          >
            <img
              alt="SATRAFOODS"
              className="h-7 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHxkGMdUJhI3u0eym5gViRsz7AvScSba5gFHF5r-o767qlFJSlORJ1uHAVHOye6JVzYUHRvM_DW9BQxTjDnRZ2xgpKWiPOQ4zhiQ5npwRjMXC5a82VE1iX7oEk1zAKrR2uVoaq_qW6M00QvSF2l-dH_W4rR5icSXz6QCiFLLtIZpShl93Q1QzYFPnvrjBlnXEqFYI3Jp9Pxl4DiRlzwdNSZl2XkwpNCu6xDw99IyHu1DFq4cL6vnG4vQ"
            />
          </button>

          {/* Right Mobile Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenMembership}
              className="w-7 h-7 rounded-[4px] bg-[#F6F8F5] border border-[#E3E8E1] flex items-center justify-center text-[#006e24] cursor-pointer hover:bg-[#f1edec]"
              aria-label="Tài khoản Satra Rewards"
            >
              <span className="material-symbols-outlined text-[16px]">redeem</span>
            </button>

            <button
              onClick={onOpenCart}
              className="relative w-7 h-7 rounded-[4px] bg-[#01B341] text-white flex items-center justify-center cursor-pointer hover:bg-[#006e24]"
              aria-label="Giỏ hàng"
            >
              <span className="material-symbols-outlined text-[16px]">shopping_basket</span>
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-0.5 bg-[#DAFF01] text-[#111111] text-[9px] rounded-[4px] flex items-center justify-center font-black border border-white">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Mobile Search input */}
        <div className="px-3 py-2 bg-[#F6F8F5] border-b border-[#E3E8E1]">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-2.5 text-[#6d7b6a] text-[18px] pointer-events-none">
              search
            </span>
            <input
              className="w-full h-8 pl-8 pr-8 bg-white border border-[#E3E8E1] rounded-[4px] text-xs text-[#111111] placeholder:text-[#555E57] focus:outline-none focus:border-[#01B341] transition-all"
              placeholder="Tìm thịt heo VietGAP, cá tươi, rau củ quả..."
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (e.target.value.trim() !== '' && currentView !== 'category') {
                  onNavigate('category');
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 w-5 h-5 rounded-[4px] bg-gray-200 flex items-center justify-center text-gray-600 hover:text-black border-0 cursor-pointer p-0"
                aria-label="Xóa tìm kiếm"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Row 3: Horizontal scrollable subcategories with HOT promo */}
        <div className="px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap bg-white text-xs scrollbar-none">
          {/* Mobile HOT Promo button: HOT là màu hồng, Khuyến mãi hot là không có màu nền */}
          <button
            onClick={() => onNavigate('category', 'Khuyến mãi hot')}
            className="px-2 py-1 rounded-[4px] text-xs font-bold shrink-0 cursor-pointer border-0 bg-transparent flex items-center gap-1"
          >
            <span className="bg-[#FC95FD] text-[#111111] font-black text-[9.5px] px-1.5 py-0.2 rounded-[4px]">
              HOT
            </span>
            <span className="text-[#111111]">Khuyến mãi hot</span>
          </button>

          {subCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate('category', cat.id === 'all' ? undefined : cat.id)}
              className="px-2 py-1 rounded-[4px] text-xs font-medium shrink-0 cursor-pointer border-0 bg-[#F6F8F5] text-[#555E57] hover:text-[#111111]"
            >
              {cat.label.replace(' & VietGAP', '').replace(' tươi sống', '')}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
