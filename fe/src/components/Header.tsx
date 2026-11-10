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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF] shadow-[0_4px_16px_rgba(17,17,17,0.08)] border-b border-[#E3E8E1]">
      {/* Top Bar - Desktop: Left (Danh mục sản phẩm + HOT khuyến mãi) | Center (Logo) | Right (Delivery & Search & Actions) */}
      <div className="hidden md:block h-20 bg-[#FFFFFF]">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-8 h-full flex items-center justify-between gap-4">
          
          {/* 1. LEFT: Chỉ hiển thị "Danh mục sản phẩm" (sổ ra danh mục con) và "HOT khuyến mãi" */}
          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            {/* Category Dropdown Button (Sổ ra được danh mục con) */}
            <div
              ref={categoryMenuRef}
              className="relative"
              onMouseEnter={() => setIsCategoryMenuOpen(true)}
              onMouseLeave={() => setIsCategoryMenuOpen(false)}
            >
              <button
                onClick={() => setIsCategoryMenuOpen((prev) => !prev)}
                className="flex items-center gap-1.5 bg-[#01B341] text-white px-3.5 py-2 rounded-[4px] font-bold hover:bg-[#006e24] transition-colors cursor-pointer text-xs border-0 shadow-xs"
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
                <div
                  className="absolute left-0 top-full pt-1.5 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <div className="bg-white border border-[#E3E8E1] rounded-[4px] shadow-2xl py-2 text-left">
                    <div className="px-3.5 py-1.5 text-[11px] font-bold text-[#555E57] uppercase tracking-wider border-b border-[#E3E8E1] mb-1 flex items-center justify-between">
                      <span>Phân ngành thực phẩm tươi sống</span>
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

            {/* HOT Promo Badge / Button (RGB: 252 149 253 | CMYK: 0 41 0 1 | Hex: #FC95FD) */}
            <button
              onClick={() => onNavigate('category', 'Khuyến mãi hot')}
              className="flex items-center gap-1.5 bg-[#FC95FD] text-[#111111] hover:opacity-90 px-3 py-2 rounded-[4px] text-xs font-bold transition-all cursor-pointer border-0 whitespace-nowrap shadow-xs"
              aria-label="Khuyến mãi hot"
            >
              <span className="material-symbols-outlined text-[16px] text-[#111111]">
                local_fire_department
              </span>
              <span>HOT khuyến mãi</span>
            </button>
          </div>

          {/* 2. CENTER: SATRAFOODS Brand Name / Logo (Centered prominently) */}
          <div className="flex items-center justify-center shrink-0 px-2">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center justify-center cursor-pointer bg-transparent border-0 p-1 rounded-[4px] hover:opacity-95 transition-opacity"
              aria-label="Satrafoods Trang Chủ - Logo thương hiệu"
            >
              <img
                alt="SATRAFOODS"
                className="h-10 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHxkGMdUJhI3u0eym5gViRsz7AvScSba5gFHF5r-o767qlFJSlORJ1uHAVHOye6JVzYUHRvM_DW9BQxTjDnRZ2xgpKWiPOQ4zhiQ5npwRjMXC5a82VE1iX7oEk1zAKrR2uVoaq_qW6M00QvSF2l-dH_W4rR5icSXz6QCiFLLtIZpShl93Q1QzYFPnvrjBlnXEqFYI3Jp9Pxl4DiRlzwdNSZl2XkwpNCu6xDw99IyHu1DFq4cL6vnG4vQ"
              />
            </button>
          </div>

          {/* 3. RIGHT: Delivery Location Selector + Search Bar + Satra Rewards + Cart + Avatar */}
          <div className="flex items-center justify-end gap-2.5 lg:gap-3 flex-1 max-w-xl">
            {/* Delivery Location Selector Button */}
            <button
              onClick={onOpenLocation}
              className="flex items-center gap-1.5 bg-[#F6F8F5] border border-[#E3E8E1] rounded-[4px] px-2.5 py-1.5 shrink-0 text-left hover:bg-[#f1edec] transition-colors cursor-pointer"
              type="button"
              aria-label="Chọn khu vực giao hàng"
            >
              <span className="material-symbols-outlined text-[#01B341] text-[20px]">
                local_shipping
              </span>
              <div className="flex flex-col">
                <span className="font-label-sm text-[10px] text-[#01B341] uppercase font-bold leading-tight">
                  Giao nhanh 2h
                </span>
                <span className="font-body-sm text-[12px] text-[#111111] font-semibold leading-tight truncate max-w-[100px]">
                  {selectedCity}
                </span>
              </div>
              <span className="material-symbols-outlined text-[#555E57] text-[16px]">
                expand_more
              </span>
            </button>

            {/* Prominent Search Bar on Right */}
            <div className="relative flex-1 min-w-[180px] max-w-[280px] lg:max-w-xs flex items-center">
              <div className="absolute left-2.5 pointer-events-none flex items-center">
                <span className="material-symbols-outlined text-[#6d7b6a] text-[18px]">
                  search
                </span>
              </div>
              <input
                className="w-full h-9 pl-8 pr-16 bg-[#F6F8F5] border border-[#E3E8E1] rounded-[4px] font-body-md text-xs text-[#111111] placeholder:text-[#555E57] focus:outline-none focus:border-[#01B341] focus:bg-[#FFFFFF] transition-all"
                placeholder="Tìm thịt heo, rau củ..."
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
                  className="absolute right-12 text-[#555E57] hover:text-[#111111] cursor-pointer bg-transparent border-0 p-1 flex items-center justify-center rounded-[4px]"
                  title="Xóa tìm kiếm"
                  type="button"
                  aria-label="Xóa nội dung tìm kiếm"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
              <button
                onClick={handleSearchSubmit}
                className="absolute right-1 px-2.5 h-7 bg-[#01B341] text-white rounded-[4px] font-bold text-xs hover:bg-[#006e24] transition-colors cursor-pointer border-0 flex items-center justify-center shadow-xs"
                type="button"
                aria-label="Tìm kiếm"
              >
                Tìm
              </button>
            </div>

            {/* Satra Rewards Button */}
            <button
              onClick={onOpenMembership}
              className="hidden xl:flex items-center gap-1.5 px-2 py-1.5 rounded-[4px] hover:bg-[#F6F8F5] transition-colors text-[#111111] cursor-pointer bg-transparent border-0"
              type="button"
              aria-label="Tích điểm thành viên Satra Rewards"
            >
              <div className="w-7 h-7 rounded-[4px] bg-[#F6F8F5] border border-[#E3E8E1] flex items-center justify-center text-[#006e24]">
                <span className="material-symbols-outlined text-[16px]">card_membership</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-label-sm text-[10px] text-[#555E57] leading-tight">Tích điểm 2%</span>
                <span className="font-label-md text-xs text-[#111111] font-bold leading-tight">Thành viên</span>
              </div>
            </button>

            {/* Cart Button with Count Badge */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 bg-[#F6F8F5] border border-[#E3E8E1] px-2.5 py-1.5 rounded-[4px] hover:bg-[#f1edec] transition-colors cursor-pointer"
              type="button"
              aria-label="Giỏ hàng Satrafoods"
            >
              <span className="material-symbols-outlined text-[#01B341] text-[20px]">
                shopping_bag
              </span>
              <div className="flex flex-col text-left">
                <span className="font-label-sm text-[10px] text-[#555E57] leading-tight">Giỏ hàng</span>
                <span className="font-label-md text-xs text-[#111111] font-bold leading-tight">
                  {totalCount > 0 ? `${totalCount} món` : '0đ'}
                </span>
              </div>
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-[#DAFF01] text-[#111111] font-label-sm text-[10px] rounded-[4px] flex items-center justify-center font-bold border border-[#FFFFFF] shadow-xs">
                  {totalCount}
                </span>
              )}
            </button>

            {/* User Account / Avatar Button */}
            <button
              onClick={onOpenMembership}
              className="w-8 h-8 rounded-[4px] bg-[#01B341] flex items-center justify-center shrink-0 cursor-pointer text-white border-0 hover:bg-[#006e24] transition-colors shadow-xs"
              type="button"
              aria-label="Tài khoản khách hàng"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Bar - Desktop: Category Sub-links & Store Locator */}
      <div className="hidden md:block bg-[#FFFFFF] border-t border-[#E3E8E1]">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-8 h-10 flex items-center justify-between text-xs font-medium overflow-x-auto">
          <div className="flex items-center gap-1.5 lg:gap-2 shrink-0">
            {subCategories.slice(1, 8).map((cat) => (
              <button
                key={cat.id}
                onClick={() => onNavigate('category', cat.id)}
                className="px-2.5 py-1 rounded-[4px] text-xs font-medium shrink-0 cursor-pointer border-0 bg-[#F6F8F5] text-[#555E57] hover:text-[#01B341] hover:bg-[#f1edec] transition-colors"
                data-slug={getSlugByCategory(cat.id)}
              >
                {cat.label.replace(' & VietGAP', '').replace(' tươi sống', '')}
              </button>
            ))}
          </div>

          {/* Store Network Link */}
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
            className="hidden lg:flex items-center gap-1.5 text-[#555E57] hover:text-[#01B341] cursor-pointer transition-colors bg-transparent border-0 text-xs font-medium shrink-0 ml-4 rounded-[4px] px-2 py-1"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-[#01B341]">pin_drop</span>
            <span>Hệ thống 180+ Cửa hàng Satrafoods</span>
          </button>
        </div>
      </div>

      {/* MOBILE HEADER (md:hidden) */}
      <div className="flex md:hidden flex-col bg-white">
        {/* Row 1: Logo (Centered) + Delivery Location + Member + Cart */}
        <div className="px-3 py-2 flex items-center justify-between gap-2 border-b border-[#E3E8E1]">
          {/* Mobile Delivery Location */}
          <button
            onClick={onOpenLocation}
            className="flex items-center gap-1 px-2 py-1 bg-[#F6F8F5] border border-[#E3E8E1] rounded-[4px] text-[11px] font-bold text-[#006e24] cursor-pointer hover:bg-[#f1edec]"
            aria-label="Chọn khu vực giao hàng"
          >
            <span className="material-symbols-outlined text-[15px]">local_shipping</span>
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
              <span className="material-symbols-outlined text-[16px]">card_membership</span>
            </button>

            <button
              onClick={onOpenCart}
              className="relative w-7 h-7 rounded-[4px] bg-[#01B341] text-white flex items-center justify-center cursor-pointer hover:bg-[#006e24]"
              aria-label="Giỏ hàng"
            >
              <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-0.5 bg-[#DAFF01] text-[#111111] text-[9px] rounded-[4px] flex items-center justify-center font-bold border border-white">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Mobile Search input with 4px corner radius */}
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

        {/* Row 3: Horizontal scrollable category links with 4px corner radius */}
        <div className="px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap bg-white text-xs scrollbar-none">
          {/* Mobile HOT Promo chip using #FC95FD and vector icon local_fire_department */}
          <button
            onClick={() => onNavigate('category', 'Khuyến mãi hot')}
            className="px-2.5 py-1 rounded-[4px] text-xs font-bold shrink-0 cursor-pointer border-0 bg-[#FC95FD] text-[#111111] flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px] text-[#111111]">
              local_fire_department
            </span>
            <span>Ưu đãi HOT</span>
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
