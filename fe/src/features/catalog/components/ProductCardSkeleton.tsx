import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-[4px] shadow-xs p-2.5 border border-[#E3E8E1] flex flex-col justify-between">
      <div>
        {/* Placeholder Image Square */}
        <div className="w-full aspect-square rounded-[4px] stageshow-shimmer mb-2 relative overflow-hidden" />

        {/* Quiet grey metadata bar */}
        <div className="w-24 h-2.5 rounded-full stageshow-shimmer mb-2" />

        {/* Quiet grey title bars */}
        <div className="w-full h-3.5 rounded-full stageshow-shimmer mb-1.5" />
        <div className="w-2/3 h-3.5 rounded-full stageshow-shimmer mb-3" />

        {/* Price row bar */}
        <div className="w-20 h-4 rounded-full stageshow-shimmer" />
      </div>

      {/* Button bar */}
      <div className="w-full h-8 rounded-[4px] stageshow-shimmer mt-3" />
    </div>
  );
};
