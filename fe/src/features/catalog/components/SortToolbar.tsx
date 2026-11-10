import React from 'react';
import { SortOption } from '../../../types';

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
}

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
  subCategories,
  selectedSubCategory,
  onSelectSubCategory,
  onOpenMobileFilter,
  activeFiltersCount,
}) => {
  return (
    <>
      {/* MOBILE FILTER & CATEGORY QUICK BAR (lg:hidden) */}
      <div className="lg:hidden space-y-2.5 mb-4">
        {/* Row 1: Filter button with active count + Sort selector + View mode */}
        <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-[4px] border border-[#E3E8E1] shadow-2xs">
          <button
            onClick={onOpenMobileFilter}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#01B341] text-white rounded-[4px] font-bold text-xs cursor-pointer shadow-xs border-0"
            type="button"
            aria-label="Mở bộ lọc"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>Bộ lọc</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-[4px] bg-[#DAFF01] text-[#111111] text-[10px] font-black flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Quick Sort Dropdown */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-[#555E57] hidden xs:inline">Xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="h-8 px-2 bg-[#F6F8F5] border border-[#E3E8E1] rounded-[4px] text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#01B341] cursor-pointer"
              aria-label="Sắp xếp sản phẩm"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-[4px] cursor-pointer border-0 ${
                viewMode === 'grid'
                  ? 'bg-[#DAFF01] text-[#111111]'
                  : 'bg-[#F6F8F5] text-[#555E57]'
              }`}
              title="Dạng lưới"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] block">grid_view</span>
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-[4px] cursor-pointer border-0 ${
                viewMode === 'list'
                  ? 'bg-[#DAFF01] text-[#111111]'
                  : 'bg-[#F6F8F5] text-[#555E57]'
              }`}
              title="Dạng danh sách"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] block">view_list</span>
            </button>
          </div>
        </div>

        {/* Row 2: Sub-category chips horizontal scroll with 4px corner radius */}
        <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5 text-xs">
          <button
            onClick={() => onSelectSubCategory('all')}
            className={`px-3 py-1.5 rounded-[4px] text-xs font-semibold shrink-0 cursor-pointer border-0 ${
              selectedSubCategory === 'all'
                ? 'bg-[#01B341] text-white shadow-xs font-bold'
                : 'bg-white border border-[#E3E8E1] text-[#555E57] hover:text-[#111111]'
            }`}
          >
            Tất cả (12)
          </button>

          {/* HOT Promo chip: HOT là màu hồng, Khuyến mãi hot là không có màu nền */}
          <button
            onClick={() => onSelectSubCategory('Khuyến mãi hot')}
            className={`px-2.5 py-1.5 rounded-[4px] text-xs font-bold shrink-0 cursor-pointer border flex items-center gap-1.5 transition-colors bg-transparent ${
              selectedSubCategory === 'Khuyến mãi hot'
                ? 'border-[#01B341] shadow-2xs'
                : 'border-[#E3E8E1] hover:border-[#01B341]'
            }`}
          >
            <span className="bg-[#FC95FD] text-[#111111] font-black text-[10px] px-1.5 py-0.5 rounded-[4px]">
              HOT
            </span>
            <span className="text-[#111111]">Khuyến mãi hot</span>
          </button>

          {subCategories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => onSelectSubCategory(cat.label)}
              className={`px-3 py-1.5 rounded-[4px] text-xs font-semibold shrink-0 cursor-pointer border-0 ${
                selectedSubCategory === cat.label
                  ? 'bg-[#01B341] text-white shadow-xs font-bold'
                  : 'bg-white border border-[#E3E8E1] text-[#555E57] hover:text-[#111111]'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
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
