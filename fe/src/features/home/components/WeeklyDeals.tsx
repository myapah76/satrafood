import React from 'react';
import promotionsData from '../../../data/promotions.json';
import { PromoDeal } from '../../../types';
import { formatVND } from '../../../utils/cart';

interface WeeklyDealsProps {
  onAddDealToCart: (dealId: string) => void;
}

export const WeeklyDeals: React.FC<WeeklyDealsProps> = ({ onAddDealToCart }) => {
  const deals = promotionsData.featuredDeals as PromoDeal[];
  const campaign = promotionsData.campaign;

  return (
    <section className="w-full my-4">
      <div className="bg-white rounded-[4px] border border-[#E3E8E1] p-3 sm:p-4 shadow-xs">
        {/* Section Header: Pink FLASH SALE badge + Title + Green Timer */}
        <div className="flex items-center justify-between mb-3.5 sm:mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-[#FC95FD] text-white font-extrabold text-[11px] sm:text-xs px-2 py-0.5 rounded-[4px] tracking-wide uppercase shadow-2xs">
              FLASH SALE
            </span>
            <h2 className="text-[#111111] font-bold text-base sm:text-lg tracking-tight">
              {campaign.title || 'Gói Trọn Ưu Đãi'}
            </h2>
          </div>

          {/* Green Countdown Timer */}
          <div className="flex items-center gap-1 text-[#01B341] font-bold text-xs sm:text-sm">
            <svg
              className="w-4 h-4 text-[#01B341]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <polyline points="12 7 12 12 15 14" />
            </svg>
            <span>{campaign.countdownHours || '02:14:48'}</span>
          </div>
        </div>

        {/* 4 Featured Deals in 2x2 Grid (Mobile) / 4-column (Desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
          {deals.map((deal) => {
            const badgeStyle =
              deal.tagType === 'discount'
                ? 'bg-[#FC95FD] text-white'
                : deal.tagType === 'same_price'
                ? 'bg-[#DAFF01] text-[#111111]'
                : deal.tagType === 'combo'
                ? 'bg-[#FF9400] text-white'
                : 'bg-[#FC95FD] text-white';

            return (
              <div
                key={deal.id}
                className="bg-white rounded-[4px] border border-[#E3E8E1] p-2 sm:p-2.5 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                {/* Top-left Badge */}
                <span
                  className={`absolute top-2 left-2 z-10 text-[10.5px] sm:text-[11px] font-bold px-2 py-0.5 rounded-[4px] shadow-2xs ${badgeStyle}`}
                >
                  {deal.tag}
                </span>

                <div>
                  {/* Image Box */}
                  <div className="w-full aspect-square rounded-[4px] overflow-hidden bg-[#F6F8F5] mb-2 sm:mb-2.5">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Category */}
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#01B341] uppercase tracking-wider block mb-0.5 truncate">
                    {deal.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-bold text-xs sm:text-[13px] text-[#111111] line-clamp-1 mb-1 leading-snug">
                    {deal.title}
                  </h3>

                  {/* Price Row: Green Sale Price + Strikethrough Original */}
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-sm sm:text-base font-black text-[#01B341]">
                      {formatVND(deal.price)}
                    </span>
                    <span className="text-[10px] sm:text-xs text-[#888888] line-through">
                      {formatVND(deal.originalPrice)}
                    </span>
                  </div>
                </div>

                {/* Full-width + Thêm button */}
                <button
                  onClick={() => onAddDealToCart(deal.id)}
                  className="w-full bg-[#01B341] hover:bg-[#009636] text-white font-bold py-1.5 rounded-[4px] text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer border-0 shadow-xs"
                  type="button"
                  aria-label={`Thêm ${deal.title} vào giỏ hàng`}
                >
                  + Thêm
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
