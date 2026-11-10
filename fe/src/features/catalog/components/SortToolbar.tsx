import React, { useState, useRef, useEffect } from 'react';
import { SortOption } from '../../../types';
import { DownIcon, UpIcon, RightIcon } from '../../../components/icons';

interface SortToolbarProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  subCategories: { label: string; count: number }[];
  selectedSubCategory: string;
  onSelectSubCategory: (cat: string) => void;
  onOpenMobileFilter: () => void;
  activeFiltersCount: number;
  safetyStandards?: { id: string; label: string; count?: number }[];
  selectedStandards?: string[];
  onToggleStandard?: (std: string) => void;
}

const DEFAULT_STANDARDS = [
  { id: 'VietGAP', label: 'VietGAP' },
  { id: 'OCOP', label: 'Chuẩn OCOP' },
  { id: 'GlobalGAP', label: 'GlobalGAP' },
  { id: 'Organic', label: 'Organic' },
  { id: 'ATTP', label: 'Chuỗi ATTP' },
];

const SUB_CATEGORIES_MENU = [
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

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: 'popular', label: 'Phổ biến nhất' },
  { id: 'best_selling', label: 'Bán chạy' },
  { id: 'price_asc', label: 'Giá tăng dần' },
  { id: 'price_desc', label: 'Giá giảm dần' },
  { id: 'best_deal', label: 'Ưu đãi tốt nhất' },
];

export const SortToolbar: React.FC<SortToolbarProps> = ({
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  subCategories: _subCategories,
  selectedSubCategory,
  onSelectSubCategory,
  onOpenMobileFilter,
  activeFiltersCount,
  safetyStandards,
  selectedStandards,
  onToggleStandard,
}) => {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const standardsToRender = safetyStandards || DEFAULT_STANDARDS;

  // Close subcategories menu when clicking outside
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

  const categoryBtnLabel =
    selectedSubCategory &&
    selectedSubCategory !== 'all' &&
    selectedSubCategory !== 'Khuyến mãi hot'
      ? selectedSubCategory
      : 'Danh mục sản phẩm';

  return (
    <>
      {/* MOBILE FILTER & QUICK TOOLBAR (lg:hidden) matching Picture 3 & 4 */}
      <div className="lg:hidden space-y-2.5 mb-3">
        {/* Row 1 on Mobile: "Danh mục sản phẩm" dropdown button + "HOT" button */}
        <div className="relative flex items-center justify-between gap-2.5 pt-0.5">
          {/* Green Category Menu Dropdown */}
          <div className="relative" ref={categoryMenuRef}>
            <button
              onClick={() => setIsCategoryMenuOpen((prev) => !prev)}
              className="h-8 flex items-center gap-1.5 bg-[#01B341] text-white px-3 py-1.5 rounded-[4px] font-bold text-xs hover:bg-[#009636] transition-colors cursor-pointer border-0 shadow-xs"
              type="button"
              aria-expanded={isCategoryMenuOpen}
              aria-label="Danh mục sản phẩm"
            >
              <span className="material-symbols-outlined text-[17px]">menu</span>
              <span className="max-w-[170px] sm:max-w-xs truncate">{categoryBtnLabel}</span>
              {isCategoryMenuOpen ? (
                <UpIcon className="w-3.5 h-3.5 text-white" />
              ) : (
                <DownIcon className="w-3.5 h-3.5 text-white" />
              )}
            </button>

            {/* Subcategories Dropdown Panel */}
            {isCategoryMenuOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="bg-white border border-[#E3E8E1] rounded-[4px] shadow-2xl py-2 text-left">
                  <div className="px-3.5 py-1.5 text-[11px] font-bold text-[#555E57] uppercase tracking-wider border-b border-[#E3E8E1] mb-1 flex items-center justify-between">
                    <span>Phân ngành hàng tươi sống</span>
                    <span className="text-[10px] bg-[#DAFF01] text-[#111111] px-1.5 py-0.5 rounded-[4px] font-black">
                      VietGAP
                    </span>
                  </div>
                  {SUB_CATEGORIES_MENU.map((cat) => {
                    const isSelected =
                      (cat.id === 'all' && (selectedSubCategory === 'all' || !selectedSubCategory)) ||
                      selectedSubCategory === cat.label;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setIsCategoryMenuOpen(false);
                          onSelectSubCategory(cat.id === 'all' ? 'all' : cat.label);
                        }}
                        className={`w-full px-3.5 py-2 text-left text-[13px] font-medium flex items-center justify-between transition-colors cursor-pointer border-0 bg-transparent rounded-[4px] group ${
                          isSelected
                            ? 'bg-[#F6F8F5] text-[#01B341] font-bold'
                            : 'hover:bg-[#F6F8F5] text-[#111111] hover:text-[#01B341]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="material-symbols-outlined text-[18px] text-[#01B341] shrink-0 group-hover:scale-110 transition-transform">
                            {cat.icon}
                          </span>
                          <span className="truncate">{cat.label}</span>
                        </div>
                        <RightIcon className="w-3.5 h-3.5 text-[#555E57] group-hover:text-[#01B341] group-hover:translate-x-0.5 transition-all shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* HOT Promo Button: Just HOT on mobile as requested ("thành HOT thui bỏ khuyến mãi") */}
          <button
            onClick={() => onSelectSubCategory('Khuyến mãi hot')}
            className={`h-8 px-3.5 rounded-[4px] text-xs font-black transition-all cursor-pointer border flex items-center justify-center shrink-0 shadow-2xs ${
              selectedSubCategory === 'Khuyến mãi hot'
                ? 'bg-[#FC95FD] text-white border-[#01B341] ring-2 ring-[#01B341]'
                : 'bg-[#FC95FD] text-white border-transparent hover:opacity-90 active:scale-95'
            }`}
            aria-label="Khuyến mãi HOT"
          >
            HOT
          </button>
        </div>

        {/* Row 2: Quick Filter Bar: [tune] Bộ lọc (N) | [VietGAP ✓] [Chuẩn OCOP] [GlobalGAP]... | Phổ biến ⇅ */}
        <div className="flex items-center gap-1.5 bg-[#F6F8F5] p-2 rounded-[4px] border border-[#E3E8E1] shadow-2xs">
          {/* 1. Left Pinned: Bộ lọc button with tune icon and circular pink badge */}
          <button
            onClick={onOpenMobileFilter}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#EEEEEE] hover:bg-[#E2E2E2] text-[#111111] rounded-[4px] font-bold text-xs cursor-pointer border-0 shadow-2xs transition-colors shrink-0"
            type="button"
            aria-label="Mở bộ lọc"
          >
            <span className="material-symbols-outlined text-[16px] text-[#01B341]">tune</span>
            <span>Bộ lọc</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#FC95FD] text-white text-[10.5px] font-extrabold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* 2. Center: Horizontally scrollable safety standard tags */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap flex-1 min-w-0 py-0.5">
            {standardsToRender.map((std) => {
              const isActive = selectedStandards?.includes(std.id) ?? false;
              // Clean short display label if standard has long title
              const displayLabel =
                std.id === 'VietGAP'
                  ? 'VietGAP'
                  : std.id === 'OCOP'
                  ? 'Chuẩn OCOP'
                  : std.id === 'GlobalGAP'
                  ? 'GlobalGAP'
                  : std.id === 'Organic'
                  ? 'Organic'
                  : std.id === 'ATTP'
                  ? 'Chuỗi ATTP'
                  : std.label;

              return (
                <button
                  key={std.id}
                  onClick={() => onToggleStandard?.(std.id)}
                  className={`px-2.5 py-1.5 rounded-[4px] text-xs font-semibold shrink-0 cursor-pointer border-0 transition-all flex items-center gap-1 ${
                    isActive
                      ? 'bg-[#01B341] text-white font-bold shadow-2xs'
                      : 'bg-[#EEEEEE] text-[#111111] hover:bg-[#E2E2E2]'
                  }`}
                  type="button"
                >
                  <span>{displayLabel}</span>
                  {isActive && <span className="font-bold">✓</span>}
                </button>
              );
            })}
          </div>

          {/* 3. Right Pinned: Phổ biến ⇅ (Native Select with stylized display) */}
          <div className="relative shrink-0 flex items-center pl-1 border-l border-[#E3E8E1]">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              aria-label="Sắp xếp sản phẩm"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#111111] cursor-pointer hover:text-[#01B341] px-1 py-1">
              <span className="truncate max-w-[65px]">
                {sortBy === 'popular'
                  ? 'Phổ biến'
                  : SORT_OPTIONS.find((o) => o.id === sortBy)?.label.split(' ')[0] || 'Phổ biến'}
              </span>
              <span className="text-sm font-bold leading-none">⇅</span>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP SORT TOOLBAR */}
      <div className="hidden lg:flex bg-white rounded-[4px] border border-[#E3E8E1] p-3 items-center justify-between gap-3 shadow-sm text-xs">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="font-bold text-[#555E57] uppercase shrink-0 text-[11px]">
            Sắp xếp theo:
          </span>
          {SORT_OPTIONS.map((sort) => {
            const isActive = sortBy === sort.id;
            return (
              <button
                key={sort.id}
                onClick={() => onSortChange(sort.id)}
                className={`px-3 py-1.5 rounded-[4px] text-xs font-bold shrink-0 transition-colors cursor-pointer border-0 ${
                  isActive
                    ? 'bg-[#01B341] text-white shadow-xs'
                    : 'bg-[#F6F8F5] hover:bg-[#f1edec] text-[#555E57] hover:text-[#111111]'
                }`}
              >
                {sort.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-auto">
          <span className="text-xs text-[#555E57] mr-1 hidden sm:inline">Chế độ xem:</span>
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-1.5 rounded-[4px] shadow-2xs cursor-pointer border-0 ${
              viewMode === 'grid'
                ? 'bg-[#DAFF01] text-[#111111]'
                : 'bg-[#F6F8F5] text-[#555E57] hover:text-[#111111]'
            }`}
            title="Dạng lưới"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] block">grid_view</span>
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-1.5 rounded-[4px] cursor-pointer border-0 ${
              viewMode === 'list'
                ? 'bg-[#DAFF01] text-[#111111]'
                : 'bg-[#F6F8F5] text-[#555E57] hover:text-[#111111]'
            }`}
            title="Dạng danh sách"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] block">view_list</span>
          </button>
        </div>
      </div>
    </>
  );
};
