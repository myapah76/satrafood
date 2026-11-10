import React, { useState } from 'react';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  subCategories?: { label: string; count: number }[];
  selectedSubCategory?: string;
  onSelectSubCategory?: (subCat: string) => void;
  safetyStandards: { id: string; label: string; count: number }[];
  selectedStandards: string[];
  onToggleStandard: (id: string) => void;
  selectedPriceRange: string;
  onSelectPriceRange: (range: 'all' | 'under50' | '50to100' | '100to200' | 'above200') => void;
  onResetFilters: () => void;
  totalProductsCount: number;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  safetyStandards,
  selectedStandards,
  onToggleStandard,
  selectedPriceRange,
  onSelectPriceRange,
  onResetFilters,
  totalProductsCount,
}) => {
  const [openSections, setOpenSections] = useState({
    safetyStandards: true,
    priceRange: true,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 bg-[#FFFFFF] border-b border-[#E3E8E1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#01B341] text-[22px]">tune</span>
            <h3 className="font-bold text-base text-[#111111]">Bộ Lọc Sản Phẩm</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onResetFilters}
              className="text-xs text-[#555E57] hover:text-[#01B341] underline cursor-pointer bg-transparent border-0 p-0"
              type="button"
            >
              Đặt lại
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-[4px] hover:bg-[#F6F8F5] flex items-center justify-center text-[#555E57] hover:text-[#111111] transition-colors cursor-pointer border-0"
              aria-label="Đóng bộ lọc"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Filter Body: Focus strictly on Tiêu Chuẩn An Toàn and Mức Giá with collapsible toggles */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 text-xs">
          {/* 1. Safety standards */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection('safetyStandards')}
              className="w-full flex items-center justify-between font-label-md text-xs text-[#111111] font-bold uppercase tracking-wider mb-2.5 bg-transparent border-0 p-0 cursor-pointer hover:text-[#01B341] transition-colors group select-none"
              aria-expanded={openSections.safetyStandards}
            >
              <span>Tiêu Chuẩn An Toàn</span>
              <span
                className="material-symbols-outlined text-[18px] text-[#555E57] group-hover:text-[#01B341] shrink-0 leading-none transition-transform"
                aria-hidden="true"
              >
                {openSections.safetyStandards ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {openSections.safetyStandards && (
              <div className="flex flex-wrap gap-2">
                {safetyStandards.map((std) => {
                  const isSelected = selectedStandards.includes(std.id);
                  return (
                    <button
                      key={std.id}
                      type="button"
                      onClick={() => onToggleStandard(std.id)}
                      className={`px-3 py-2 rounded-[4px] text-xs font-semibold cursor-pointer border transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#01B341] text-white border-[#01B341] shadow-2xs font-bold'
                          : 'bg-[#F6F8F5] text-[#111111] border-[#E3E8E1] hover:border-[#01B341]'
                      }`}
                    >
                      <span>{std.label}</span>
                      {isSelected && <span className="font-bold">✓</span>}
                      <span className={`text-[10.5px] ${isSelected ? 'text-white/80' : 'text-[#555E57]'}`}>
                        ({std.count})
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Price range */}
          <div className="pt-4 border-t border-[#E3E8E1]">
            <button
              type="button"
              onClick={() => toggleSection('priceRange')}
              className="w-full flex items-center justify-between font-label-md text-xs text-[#111111] font-bold uppercase tracking-wider mb-2.5 bg-transparent border-0 p-0 cursor-pointer hover:text-[#01B341] transition-colors group select-none"
              aria-expanded={openSections.priceRange}
            >
              <span>Mức Giá</span>
              <span
                className="material-symbols-outlined text-[18px] text-[#555E57] group-hover:text-[#01B341] shrink-0 leading-none transition-transform"
                aria-hidden="true"
              >
                {openSections.priceRange ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {openSections.priceRange && (
              <div className="space-y-2">
                {[
                  { id: 'all', label: 'Tất cả mức giá' },
                  { id: 'under50', label: 'Dưới 50.000 đ' },
                  { id: '50to100', label: '50.000 đ - 100.000 đ' },
                  { id: '100to200', label: '100.000 đ - 200.000 đ' },
                  { id: 'above200', label: 'Trên 200.000 đ' },
                ].map((p) => (
                  <label key={p.id} className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="price_range_mobile"
                      checked={selectedPriceRange === p.id}
                      onChange={() =>
                        onSelectPriceRange(p.id as 'all' | 'under50' | '50to100' | '100to200' | 'above200')
                      }
                      className="w-4 h-4 text-[#01B341] focus:ring-[#01B341] border-[#E3E8E1]"
                    />
                    <span className="text-[#111111] font-medium">{p.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-white border-t border-[#E3E8E1] space-y-2">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#01B341] text-white font-bold rounded-[4px] shadow-md hover:bg-[#006e24] transition-colors cursor-pointer flex items-center justify-center gap-2 border-0"
          >
            <span>Áp dụng bộ lọc</span>
            <span className="px-2 py-0.5 rounded-[4px] bg-[#DAFF01] text-[#111111] text-[11px] font-black">
              {totalProductsCount} sản phẩm
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
