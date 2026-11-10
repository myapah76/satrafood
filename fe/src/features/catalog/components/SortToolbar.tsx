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
  selectedStandards?: string[];
  onToggleStandard?: (std: string) => void;
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
  selectedStandards,
  onToggleStandard,
}) => {
  const isVietGAPActive = selectedStandards?.includes('VietGAP') ?? false;
  const isOCOPActive = selectedStandards?.includes('OCOP') ?? false;

  return (
    <>
      {/* MOBILE FILTER & QUICK TOOLBAR (lg:hidden) matching Picture 3 */}
      <div className="lg:hidden space-y-2 mb-3">
        {/* Row 1: Quick Filter Bar: [tune] Bộ lọc (3) | VietGAP ✓ | Chuẩn OCOP | Phổ biến ⇅ */}
        <div className="flex items-center justify-between gap-2 bg-[#F6F8F5] p-2 rounded-[4px] border border-[#E3E8E1] shadow-2xs overflow-x-auto">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Bộ lọc button with tune icon and circular pink badge */}
            <button
              onClick={onOpenMobileFilter}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#EEEEEE] hover:bg-[#E2E2E2] text-[#111111] rounded-[4px] font-bold text-xs cursor-pointer border-0 shadow-2xs transition-colors"
              type="button"
              aria-label="Mở bộ lọc"
            >
              <span className="material-symbols-outlined text-[16px] text-[#01B341]">tune</span>
              <span>Bộ lọc</span>
              <span className="w-5 h-5 rounded-full bg-[#FC95FD] text-white text-[10.5px] font-extrabold flex items-center justify-center">
                {activeFiltersCount > 0 ? activeFiltersCount : 3}
              </span>
            </button>

            {/* Quick Filter Chip 1: VietGAP */}
            <button
              onClick={() => onToggleStandard?.('VietGAP')}
              className={`px-3 py-1.5 rounded-[4px] text-xs font-bold shrink-0 cursor-pointer border-0 transition-colors flex items-center gap-1 ${
                isVietGAPActive
                  ? 'bg-[#01B341] text-white shadow-2xs'
                  : 'bg-[#EEEEEE] text-[#111111] hover:bg-[#E2E2E2]'
              }`}
              type="button"
            >
              <span>VietGAP</span>
              {isVietGAPActive && <span>✓</span>}
            </button>

            {/* Quick Filter Chip 2: Chuẩn OCOP */}
            <button
              onClick={() => onToggleStandard?.('OCOP')}
              className={`px-3 py-1.5 rounded-[4px] text-xs font-medium shrink-0 cursor-pointer border-0 transition-colors flex items-center gap-1 ${
                isOCOPActive
                  ? 'bg-[#01B341] text-white font-bold shadow-2xs'
                  : 'bg-[#EEEEEE] text-[#111111] hover:bg-[#E2E2E2]'
              }`}
              type="button"
            >
              <span>Chuẩn OCOP</span>
              {isOCOPActive && <span>✓</span>}
            </button>
          </div>

          {/* Right side: Phổ biến ⇅ (Native Select with stylized display) */}
          <div className="relative shrink-0 flex items-center">
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
              <span>
                {sortBy === 'popular'
                  ? 'Phổ biến'
                  : SORT_OPTIONS.find((o) => o.id === sortBy)?.label.split(' ')[0] || 'Phổ biến'}
              </span>
              <span className="text-sm font-bold leading-none">⇅</span>
            </div>
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
