import React from 'react';
import categoriesData from '../../../data/categories.json';
import { CategoryGridItem } from '../../../types';

interface CategoryExplorerProps {
  onNavigateToCategory: (subCategory?: string) => void;
}

export const CategoryExplorer: React.FC<CategoryExplorerProps> = ({ onNavigateToCategory }) => {
  const categories = categoriesData as CategoryGridItem[];

  return (
    <section
      className="w-full bg-white rounded-2xl p-4 sm:p-8 shadow-sm mb-6 border border-[#E3E8E1]"
      id="explore-categories"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-headline-sm font-bold text-[#111111] tracking-tight">
            Khám Phá Danh Mục Sản Phẩm
          </h2>
          <p className="text-xs text-[#555E57] mt-1">
            Đa dạng nguồn thực phẩm tươi sống, hàng tiêu dùng chuẩn an toàn mỗi ngày
          </p>
        </div>
        <button
          onClick={() => onNavigateToCategory()}
          className="inline-flex items-center gap-1 text-[#006e24] hover:text-[#01B341] font-bold text-xs transition-colors cursor-pointer bg-transparent border-0"
        >
          <span className="hidden sm:inline">Xem tất cả ngành hàng</span>
          <span className="sm:hidden">Tất cả</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-y-6 sm:gap-y-8 gap-x-2.5 sm:gap-x-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onNavigateToCategory(cat.subCategory)}
            className="group flex flex-col items-center text-center p-1.5 sm:p-2 rounded-xl hover:bg-[#F6F8F5] transition-all duration-200 cursor-pointer bg-transparent border-0"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-3 flex items-center justify-center rounded-2xl bg-[#F6F8F5] border border-[#E3E8E1] group-hover:scale-105 group-hover:shadow-md transition-all duration-300 overflow-hidden">
              {cat.isSpecialBadge ? (
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center font-bold text-center leading-none text-[9px] sm:text-[10px] p-1 uppercase shadow-sm ${cat.badgeColor}`}
                >
                  {cat.badgeText}
                </div>
              ) : (
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg drop-shadow-xs"
                />
              )}
            </div>
            <span
              className={`font-title-md text-[11px] sm:text-xs text-[#111111] font-bold group-hover:text-[#01B341] transition-colors leading-tight ${
                cat.isSpecialBadge && cat.id === 'cat-13' ? 'text-[#FF161F]' : ''
              }`}
            >
              {cat.title}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
