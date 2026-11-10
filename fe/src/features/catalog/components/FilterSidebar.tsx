import React from 'react';

interface FilterSidebarProps {
  subCategories: { label: string; count: number }[];
  selectedSubCategory: string;
  onSelectSubCategory: (cat: string) => void;
  safetyStandards: { id: string; label: string; count: number }[];
  selectedStandards: string[];
  onToggleStandard: (id: string) => void;
  selectedPriceRange: 'all' | 'under50' | '50to100' | '100to200' | 'above200';
  onSelectPriceRange: (range: 'all' | 'under50' | '50to100' | '100to200' | 'above200') => void;
  selectedPackaging: string[];
  onTogglePackaging: (pkg: string) => void;
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onResetFilters: () => void;
  onCopyVoucher: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  subCategories,
  selectedSubCategory,
  onSelectSubCategory,
  safetyStandards,
  selectedStandards,
  onToggleStandard,
  selectedPriceRange,
  onSelectPriceRange,
  selectedPackaging,
  onTogglePackaging,
  selectedTags,
  onToggleTag,
  onResetFilters,
  onCopyVoucher,
}) => {
  return (
    <aside className="hidden lg:block lg:col-span-3 space-y-4">
      <div className="bg-white rounded-[4px] border border-[#E3E8E1] p-5 shadow-sm text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8E1] mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#01B341] text-[20px]">tune</span>
            <h3 className="font-title-md text-sm text-[#111111] font-bold">Bộ Lọc Sản Phẩm</h3>
          </div>
          <button
            onClick={onResetFilters}
            className="font-label-sm text-[#555E57] hover:text-[#01B341] text-[12px] underline cursor-pointer bg-transparent border-0 p-0"
            type="button"
          >
            Đặt lại
          </button>
        </div>

        {/* 1. Sub-categories */}
        <div className="mb-5">
          <h4 className="font-label-md text-xs text-[#111111] font-bold uppercase tracking-wider mb-2.5 flex items-center justify-between">
            <span>Danh mục con</span>
            <span className="material-symbols-outlined text-[16px] text-[#555E57]">expand_less</span>
          </h4>
          <ul className="space-y-1 text-xs list-none p-0 m-0">
            {subCategories.map((cat, idx) => {
              const isActive =
                selectedSubCategory === cat.label ||
                (selectedSubCategory === 'all' && idx === 0);
              return (
                <li key={cat.label}>
                  <button
                    onClick={() => onSelectSubCategory(cat.label)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-left transition-colors cursor-pointer border-0 ${
                      isActive
                        ? 'bg-[#F6F8F5] font-bold text-[#01B341] border-l-4 border-[#01B341]'
                        : 'text-[#555E57] hover:text-[#111111] hover:bg-[#F6F8F5]'
                    }`}
                  >
                    <span className="line-clamp-1">{cat.label}</span>
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-[4px] ${
                        isActive
                          ? 'bg-[#DAFF01] text-[#111111] font-bold'
                          : 'text-[#555E57]'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* 2. Safety Standards */}
        <div className="mb-5 pt-4 border-t border-[#E3E8E1]">
          <h4 className="font-label-md text-xs text-[#111111] font-bold uppercase tracking-wider mb-2.5 flex items-center justify-between">
            <span>Tiêu Chuẩn An Toàn</span>
            <span className="material-symbols-outlined text-[16px] text-[#555E57]">expand_less</span>
          </h4>
          <div className="space-y-2 text-xs">
            {safetyStandards.map((std) => (
              <label key={std.id} className="flex items-center gap-2.5 cursor-pointer text-[#111111]">
                <input
                  type="checkbox"
                  checked={selectedStandards.includes(std.id)}
                  onChange={() => onToggleStandard(std.id)}
                  className="w-4 h-4 rounded-[4px] text-[#01B341] focus:ring-[#01B341] border-[#E3E8E1]"
                />
                <span className="flex-1">{std.label}</span>
                <span className="text-[11px] text-[#555E57]">({std.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* 3. Price Range */}
        <div className="mb-5 pt-4 border-t border-[#E3E8E1]">
          <h4 className="font-label-md text-xs text-[#111111] font-bold uppercase tracking-wider mb-2.5">
            Mức Giá
          </h4>
          <div className="space-y-2 text-xs">
            {[
              { id: 'all', label: 'Tất cả mức giá' },
              { id: 'under50', label: 'Dưới 50.000 đ' },
              { id: '50to100', label: '50.000 đ - 100.000 đ' },
              { id: '100to200', label: '100.000 đ - 200.000 đ' },
              { id: 'above200', label: 'Trên 200.000 đ' },
            ].map((p) => (
              <label key={p.id} className="flex items-center gap-2.5 cursor-pointer text-[#111111]">
                <input
                  type="radio"
                  name="price_range_desktop"
                  checked={selectedPriceRange === p.id}
                  onChange={() =>
                    onSelectPriceRange(p.id as 'all' | 'under50' | '50to100' | '100to200' | 'above200')
                  }
                  className="w-4 h-4 text-[#01B341] focus:ring-[#01B341] border-[#E3E8E1]"
                />
                <span className="flex-1">{p.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 4. Packaging Specification */}
        <div className="mb-5 pt-4 border-t border-[#E3E8E1]">
          <h4 className="font-label-md text-xs text-[#111111] font-bold uppercase tracking-wider mb-2.5">
            Quy Cách Đóng Gói
          </h4>
          <div className="space-y-2 text-xs">
            {[
              'Gói sơ chế sẵn nấu ngay',
              'Khay hút chân không kháng khuẩn',
              'Hộp / Túi sinh học tiện lợi',
            ].map((spec) => (
              <label key={spec} className="flex items-center gap-2.5 cursor-pointer text-[#111111]">
                <input
                  type="checkbox"
                  checked={selectedPackaging.includes(spec)}
                  onChange={() => onTogglePackaging(spec)}
                  className="w-4 h-4 rounded-[4px] text-[#01B341] focus:ring-[#01B341] border-[#E3E8E1]"
                />
                <span className="flex-1">{spec}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 5. Status / Tags */}
        <div className="pt-4 border-t border-[#E3E8E1]">
          <h4 className="font-label-md text-xs text-[#111111] font-bold uppercase tracking-wider mb-2.5">
            Trạng Thái Sản Phẩm
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {['Đang giảm giá', 'Hàng mới về', 'Bán chạy nhất', 'Giao 2H'].map((tag) => {
              const isTagActive =
                selectedTags.includes(tag) || (tag === 'Đang giảm giá' && selectedTags.length === 0);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onToggleTag(tag)}
                  className={`px-2.5 py-1 rounded-[4px] text-[11px] font-semibold transition-colors cursor-pointer border ${
                    isTagActive
                      ? 'bg-[#DAFF01] text-[#111111] border-[#01B341]/30 font-bold'
                      : 'bg-[#F6F8F5] text-[#555E57] hover:text-[#111111] border-[#E3E8E1]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Promotion Box in Sidebar */}
      <div className="bg-gradient-to-br from-[#DAFF01]/25 to-[#01B341]/10 border border-[#01B341]/30 rounded-[4px] p-4 text-center">
        <span className="material-symbols-outlined text-[#01B341] text-[32px] mb-1">redeem</span>
        <h5 className="font-label-lg font-bold text-xs text-[#111111]">Voucher Giảm 30K</h5>
        <p className="font-body-sm text-[#555E57] text-[11px] mt-1">
          Đơn hàng thực phẩm tươi sống từ 250.000đ khi thanh toán thẻ thành viên.
        </p>
        <button
          onClick={onCopyVoucher}
          className="mt-3 w-full py-1.5 bg-[#01B341] text-white font-bold text-xs rounded-[4px] hover:bg-[#006e24] transition-colors cursor-pointer shadow-xs border-0"
          type="button"
        >
          LƯU MÃ: SATRAFRESHT3
        </button>
      </div>
    </aside>
  );
};
