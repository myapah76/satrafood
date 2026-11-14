import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
interface ProductCardSkeletonProps {
  viewMode?: 'grid' | 'list';
}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-[4px] p-3 border border-[#E3E8E1] flex items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* List Image Square */}
          <div className="relative w-20 h-20 shrink-0 rounded-[4px] stageshow-shimmer border border-[#E3E8E1]" />

          {/* Text lines */}
          <div className="min-w-0 flex-1 space-y-2">
            <div className="w-24 h-2.5 rounded-full stageshow-shimmer" />
            <div className="w-48 sm:w-64 h-3.5 rounded-full stageshow-shimmer" />
            <div className="w-32 h-2.5 rounded-full stageshow-shimmer" />
          </div>
        </div>

        {/* Right side price & button */}
        <div className="text-right shrink-0 flex flex-col items-end">
          <div className="w-20 h-4 rounded-full stageshow-shimmer mb-1" />
          <div className="w-14 h-3 rounded-full stageshow-shimmer mb-2" />
          <div className="w-20 h-7 rounded-[4px] stageshow-shimmer mt-1" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[4px] shadow-xs p-2.5 border border-[#E3E8E1] flex flex-col justify-between">
      <div>
        {/* Placeholder Image Square */}
        <div className="w-full aspect-square rounded-[4px] stageshow-shimmer mb-2 relative overflow-hidden" />
        {/* Media Image Block */}
        <div className="relative w-full aspect-square rounded-[4px] stageshow-shimmer mb-2 overflow-hidden border border-[#E3E8E1]" />

        {/* Quiet grey metadata bar */}
        {/* Thin placeholder line (Weight / spec) */}
        <div className="w-24 h-2.5 rounded-full stageshow-shimmer mb-2" />

        {/* Quiet grey title bars */}
        {/* Title placeholder lines (2 lines) */}
        <div className="w-full h-3.5 rounded-full stageshow-shimmer mb-1.5" />
        <div className="w-2/3 h-3.5 rounded-full stageshow-shimmer mb-3" />
        <div className="w-2/3 h-3.5 rounded-full stageshow-shimmer mb-2.5" />

        {/* Price row bar */}
        <div className="w-20 h-4 rounded-full stageshow-shimmer" />
        {/* Subtle price pill placeholder */}
        <div className="flex items-baseline gap-1.5 mt-1.5">
          <div className="w-20 h-4 rounded-full stageshow-shimmer" />
          <div className="w-12 h-3 rounded-full stageshow-shimmer" />
        </div>
      </div>

      {/* Button bar */}
      <div className="w-full h-8 rounded-[4px] stageshow-shimmer mt-3" />
      {/* Button placeholder bar */}
      <div className="w-full h-8 rounded-[4px] stageshow-shimmer mt-2.5" />
    </div>
  );
};

