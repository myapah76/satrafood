import React, { useState } from 'react';

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
  onCopyVoucher?: () => void;
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
}) => {
  const [openSections, setOpenSections] = useState({
    subCategories: true,
    safetyStandards: true,
    priceRange: true,
    packaging: true,
    tags: true,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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
          <button
            type="button"
            onClick={() => toggleSection('subCategories')}
            className="w-full flex items-center justify-between font-label-md text-xs text-[#111111] font-bold uppercase tracking-wider mb-2.5 bg-transparent border-0 p-0 cursor-pointer hover:text-[#01B341] transition-colors group select-none"
            aria-expanded={openSections.subCategories}
          >
            <span>Danh mục con</span>
            <span
              className="material-symbols-outlined text-[18px] text-[#555E57] group-hover:text-[#01B341] shrink-0 leading-none transition-transform"
              aria-hidden="true"
            >
              {openSections.subCategories ? 'expand_less' : 'expand_more'}
            </span>
          </button>
          {openSections.subCategories && (
            <ul className="space-y-1 text-xs list-none p-0 m-0">
              <li>
                <button
                  onClick={() => onSelectSubCategory('all')}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-left transition-colors cursor-pointer border-0 ${
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-left transition-all active:scale-[0.98] duration-150 cursor-pointer border-0 ${
                    selectedSubCategory === 'all'
                      ? 'bg-[#F6F8F5] font-bold text-[#01B341] border-l-4 border-[#01B341]'
                      : 'text-[#555E57] hover:text-[#111111] hover:bg-[#F6F8F5]'
                  }`}
                >
                  <span className="line-clamp-1">Tất cả thực phẩm tươi sống</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-[4px] ${
                      selectedSubCategory === 'all'
                        ? 'bg-[#DAFF01] text-[#111111] font-bold'
                        : 'text-[#555E57]'
                    }`}
                  >
                    12
                  </span>
                </button>
              </li>
              {subCategories.map((cat) => {
                const isActive = selectedSubCategory === cat.label;
                return (
                  <li key={cat.label}>
                    <button
                      onClick={() => onSelectSubCategory(cat.label)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-left transition-colors cursor-pointer border-0 ${
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-left transition-all active:scale-[0.98] duration-150 cursor-pointer border-0 ${
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
          )}
        </div>

        {/* 2. Safety Standards */}
        <div className="mb-5 pt-4 border-t border-[#E3E8E1]">
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
          )}
        </div>

        {/* 3. Price Range */}
        <div className="mb-5 pt-4 border-t border-[#E3E8E1]">
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
          )}
        </div>

        {/* 4. Packaging Specification */}
        <div className="mb-5 pt-4 border-t border-[#E3E8E1]">
          <button
            type="button"
            onClick={() => toggleSection('packaging')}
            className="w-full flex items-center justify-between font-label-md text-xs text-[#111111] font-bold uppercase tracking-wider mb-2.5 bg-transparent border-0 p-0 cursor-pointer hover:text-[#01B341] transition-colors group select-none"
            aria-expanded={openSections.packaging}
          >
            <span>Quy Cách Đóng Gói</span>
            <span
              className="material-symbols-outlined text-[18px] text-[#555E57] group-hover:text-[#01B341] shrink-0 leading-none transition-transform"
              aria-hidden="true"
            >
              {openSections.packaging ? 'expand_less' : 'expand_more'}
            </span>
          </button>
          {openSections.packaging && (
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
          )}
        </div>

        {/* 5. Status / Tags */}
        <div className="pt-4 border-t border-[#E3E8E1]">
          <button
            type="button"
            onClick={() => toggleSection('tags')}
            className="w-full flex items-center justify-between font-label-md text-xs text-[#111111] font-bold uppercase tracking-wider mb-2.5 bg-transparent border-0 p-0 cursor-pointer hover:text-[#01B341] transition-colors group select-none"
            aria-expanded={openSections.tags}
          >
            <span>Trạng Thái Sản Phẩm</span>
            <span
              className="material-symbols-outlined text-[18px] text-[#555E57] group-hover:text-[#01B341] shrink-0 leading-none transition-transform"
              aria-hidden="true"
            >
              {openSections.tags ? 'expand_less' : 'expand_more'}
            </span>
          </button>
          {openSections.tags && (
            <div className="flex flex-wrap gap-1.5">
              {['Đang giảm giá', 'Hàng mới về', 'Bán chạy nhất', 'Giao 2H'].map((tag) => {
                const isTagActive =
                  selectedTags.includes(tag) || (tag === 'Đang giảm giá' && selectedTags.length === 0);
                const isDiscountTag = tag === 'Đang giảm giá';
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onToggleTag(tag)}
                    className={`px-2.5 py-1 rounded-[4px] text-[11px] font-semibold transition-colors cursor-pointer border ${
                    className={`px-2.5 py-1 rounded-[4px] text-[11px] font-semibold transition-all active:scale-[0.98] duration-150 cursor-pointer border ${
                      isTagActive
                        ? isDiscountTag
                          ? 'bg-[#FC95FD] text-[#24102E] border-[#FC95FD] font-bold shadow-xs tracking-[1px]'
                          : 'bg-[#DAFF01] text-[#111111] border-[#01B341]/30 font-bold'
                        : 'bg-[#F6F8F5] text-[#555E57] hover:text-[#111111] border-[#E3E8E1]'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
