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
  safetyStandards,
  selectedStandards,
  onToggleStandard,
}) => {
  const standardsToRender = safetyStandards || DEFAULT_STANDARDS;

  return (
    <>
      {/* MOBILE FILTER & QUICK TOOLBAR (lg:hidden) matching Picture 3 */}
      <div className="lg:hidden space-y-2 mb-3">
        {/* Row 1: Quick Filter Bar: [tune] Bộ lọc (N) | [VietGAP ✓] [Chuẩn OCOP] [GlobalGAP]... | Phổ biến ⇅ */}
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
