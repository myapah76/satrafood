import React from 'react';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  subCategories: { label: string; count: number }[];
  selectedSubCategory: string;
  onSelectSubCategory: (subCat: string) => void;
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
  subCategories,
  selectedSubCategory,
  onSelectSubCategory,
  safetyStandards,
  selectedStandards,
  onToggleStandard,
  selectedPriceRange,
  onSelectPriceRange,
  onResetFilters,
  totalProductsCount,
}) => {
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
              className="w-8 h-8 rounded-full hover:bg-[#F6F8F5] flex items-center justify-center text-[#555E57] hover:text-[#111111] transition-colors cursor-pointer border-0"
              aria-label="Đóng bộ lọc"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Filter Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 text-xs">
          {/* Sub-categories */}
          <div>
            <h4 className="font-label-md text-xs text-[#111111] font-bold uppercase tracking-wider mb-2.5">
              Danh Mục Con
            </h4>
            <div className="space-y-1.5">
              <button
                onClick={() => onSelectSubCategory('all')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer border-0 ${
                  selectedSubCategory === 'all'
                    ? 'bg-[#F6F8F5] font-bold text-[#01B341] border-l-4 border-[#01B341]'
                    : 'text-[#555E57] hover:bg-[#F6F8F5]'
                }`}
              >
                <span>Tất cả sản phẩm tươi sống</span>
                <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-[#DAFF01] text-[#111111] font-bold">
                  12
                </span>
              </button>

              {subCategories.map((cat) => {
                const isActive = selectedSubCategory === cat.label;
                return (
                  <button
                    key={cat.label}
                    onClick={() => onSelectSubCategory(cat.label)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer border-0 ${
                      isActive
                        ? 'bg-[#F6F8F5] font-bold text-[#01B341] border-l-4 border-[#01B341]'
                        : 'text-[#555E57] hover:bg-[#F6F8F5]'
                    }`}
                  >
                    <span className="line-clamp-1">{cat.label}</span>
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-[#DAFF01] text-[#111111] font-bold'
                          : 'text-[#555E57] bg-gray-100'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Safety standards */}
          <div>
            <h4 className="font-label-md text-xs text-[#111111] font-bold uppercase tracking-wider mb-2.5">
              Tiêu Chuẩn An Toàn
            </h4>
            <div className="space-y-2">
              {safetyStandards.map((std) => (
                <label key={std.id} className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStandards.includes(std.id)}
                    onChange={() => onToggleStandard(std.id)}
                    className="w-4 h-4 rounded text-[#01B341] focus:ring-[#01B341] border-[#E3E8E1]"
                  />
                  <span className="flex-1 text-[#111111] font-medium">{std.label}</span>
                  <span className="text-[#555E57] font-normal">({std.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div>
            <h4 className="font-label-md text-xs text-[#111111] font-bold uppercase tracking-wider mb-2.5">
              Mức Giá
            </h4>
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
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-white border-t border-[#E3E8E1] space-y-2">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#01B341] text-white font-bold rounded-xl shadow-md hover:bg-[#006e24] transition-colors cursor-pointer flex items-center justify-center gap-2 border-0"
          >
            <span>Áp dụng bộ lọc</span>
            <span className="px-2 py-0.5 rounded-full bg-[#DAFF01] text-[#111111] text-[11px] font-black">
              {totalProductsCount} sản phẩm
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
