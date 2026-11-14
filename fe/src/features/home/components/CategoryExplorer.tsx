import React from 'react';
import React, { useState, useEffect } from 'react';
import { useInView } from '../../../utils/useInView';

interface CategoryExplorerProps {
  onNavigateToCategory: (subCategory?: string) => void;
}

const CategorySkeleton: React.FC = () => (
  <div className="flex flex-col items-center text-center p-0">
    <div className="w-full aspect-square rounded-[14px] stageshow-shimmer border border-[#E3E8E1] p-1.5 shadow-2xs" />
    <div className="w-12 h-2.5 rounded-full stageshow-shimmer mt-2" />
  </div>
);

const FEATURED_CATEGORIES = [
  {
    id: 'feat-1',
    title: 'Rau Củ Tươi',
    subCategory: 'Rau ăn lá VietGAP',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'feat-2',
    title: 'Thịt & Cá',
    subCategory: 'Thịt heo thảo mộc & VietGAP',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'feat-3',
    title: 'Trứng & Sữa',
    subCategory: 'Gia cầm tươi chuẩn CP',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'feat-4',
    title: 'Món Nấu Ngay',
    subCategory: 'Món sơ chế nấu ngay',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'feat-5',
    title: 'Gạo & Gia Vị',
    subCategory: 'all',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'feat-6',
    title: 'Đồ Đông Lạnh',
    subCategory: 'Cá & Hải sản tươi sống',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'feat-7',
    title: 'Đồ Uống',
    subCategory: 'Trái cây nhiệt đới Nam Bộ',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'feat-8',
    title: 'OCOP Đặc Sản',
    subCategory: 'all',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=240&q=80',
  },
];

export const CategoryExplorer: React.FC<CategoryExplorerProps> = ({ onNavigateToCategory }) => {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.1, rootMargin: '-40px', once: true });
  const [isLoading, setIsLoading] = useState(true);

  // Authentic staged skeleton preview (400ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white rounded-[4px] p-3.5 sm:p-5 shadow-xs mb-6 border border-[#E3E8E1]"
      id="explore-categories"
    >
      {/* Header: Title on Left + Green "Xem tất cả >" on Right */}
      <div className="flex items-center justify-between mb-3.5 sm:mb-4">
        <h2 className="text-base sm:text-lg font-bold text-[#111111] tracking-tight">
          Danh Mục Nổi Bật
        </h2>
        <button
          onClick={() => onNavigateToCategory()}
          className="inline-flex items-center gap-0.5 text-[#01B341] hover:underline font-semibold text-xs sm:text-sm transition-colors cursor-pointer bg-transparent border-0 p-0"
          type="button"
          aria-label="Xem tất cả danh mục"
        >
          <span>Xem tất cả</span>
          <span className="text-base font-bold leading-none">›</span>
        </button>
      </div>

      {/* 2 Rows x 4 Columns = 8 Categories in squircle containers matching Picture 5 */}
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-2.5 sm:gap-4">
        {FEATURED_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onNavigateToCategory(cat.subCategory === 'all' ? undefined : cat.subCategory)}
            className="group flex flex-col items-center text-center p-0 cursor-pointer bg-transparent border-0 focus:outline-none"
            type="button"
          >
            {/* Squircle icon container (rounded-[14px]) */}
            <div className="w-full aspect-square rounded-[14px] bg-[#F6F8F5] border border-[#E3E8E1] p-1.5 flex items-center justify-center overflow-hidden group-hover:scale-105 group-hover:border-[#01B341] transition-all duration-200 shadow-2xs">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>
            {/* Label below */}
            <span className="font-semibold text-[11px] sm:text-xs text-[#111111] group-hover:text-[#01B341] transition-colors leading-tight line-clamp-1 mt-1.5 text-center">
              {cat.title}
            </span>
          </button>
        ))}
        {isLoading || !isInView
          ? Array.from({ length: 8 }).map((_, i) => (
              <CategorySkeleton key={`cat-skel-${i}`} />
            ))
          : FEATURED_CATEGORIES.map((cat, index) => (
              <button
                key={cat.id}
                onClick={() => onNavigateToCategory(cat.subCategory === 'all' ? undefined : cat.subCategory)}
                className="group flex flex-col items-center text-center p-0 cursor-pointer bg-transparent border-0 focus:outline-none hover:-translate-y-0.5 transition-transform duration-150 stageshow-card-entry"
                style={{ '--stagger-index': index, '--stagger-step': '35ms' } as React.CSSProperties}
                type="button"
              >
                {/* Squircle icon container (rounded-[14px]) */}
                <div className="w-full aspect-square rounded-[14px] bg-[#F6F8F5] border border-[#E3E8E1] p-1.5 flex items-center justify-center overflow-hidden group-hover:scale-105 group-hover:border-[#01B341] transition-all duration-200 shadow-2xs">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover rounded-[10px]"
                  />
                </div>
                {/* Label below */}
                <span className="font-semibold text-[11px] sm:text-xs text-[#111111] group-hover:text-[#01B341] transition-colors leading-tight line-clamp-1 mt-1.5 text-center">
                  {cat.title}
                </span>
              </button>
            ))}
      </div>
    </section>
  );
};
