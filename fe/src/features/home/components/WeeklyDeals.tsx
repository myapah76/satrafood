import React from 'react';
import promotionsData from '../../../data/promotions.json';
import { PromoDeal } from '../../../types';
import { formatVND } from '../../../utils/cart';
import { TagIcon, CartIcon } from '../../../components/icons';

interface WeeklyDealsProps {
  onAddDealToCart: (dealId: string) => void;
}

export const WeeklyDeals: React.FC<WeeklyDealsProps> = ({ onAddDealToCart }) => {
  const deals = promotionsData.featuredDeals as PromoDeal[];
  const campaign = promotionsData.campaign;

  const [hours, minutes, seconds] = (campaign.countdownHours || '02:14:48').split(':');

  return (
    <section className="w-full my-4">
      <div className="rounded-[4px] p-4 sm:p-6 shadow-lg text-white relative overflow-hidden bg-[#01B341]">
        {/* Decorative Packaging Graphic Texture */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#DAFF01]/15 rounded-[4px] blur-2xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-20 w-80 h-80 bg-[#FC95FD]/15 rounded-[4px] blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-5 sm:mb-6 relative z-10 gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
            <div className="px-3 py-1 bg-[#DAFF01] text-[#111111] font-label-lg rounded-[4px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 text-xs w-fit">
              <TagIcon className="w-4 h-4 text-[#111111]" />
              {campaign.title || 'GÓI TRỌN ƯU ĐÃI'}
            </div>
            <span className="font-body-md text-xs text-white/90">
              {campaign.subtitle || 'Flash Sale giảm tới 20% các mặt hàng tươi sống Satra'}
            </span>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-[4px] text-white self-start sm:self-auto">
            <span className="font-label-sm text-[11px] text-[#DAFF01] uppercase font-bold">
              Kết thúc sau:
            </span>
            <div className="flex items-center gap-1 font-label-md text-xs font-bold">
              <span className="px-2 py-0.5 bg-white text-[#111111] rounded-[4px]">
                {hours || '02'}
              </span>
              :
              <span className="px-2 py-0.5 bg-white text-[#111111] rounded-[4px]">
                {minutes || '14'}
              </span>
              :
              <span className="px-2 py-0.5 bg-white text-[#111111] rounded-[4px]">
                {seconds || '48'}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Featured Deals in 2x2 Grid (Mobile) / 4-column (Desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 relative z-10">
          {deals.map((deal) => {
            const badgeBg =
              deal.tagType === 'discount'
                ? 'bg-[#FC95FD] text-[#24102E] tracking-[1px]'
                : deal.tagType === 'same_price'
                ? 'bg-[#DAFF01] text-[#111111]'
                : deal.tagType === 'combo'
                ? 'bg-[#FF9400] text-white'
                : 'bg-[#DAFF01] text-[#111111]';

            return (
              <div
                key={deal.id}
                className="bg-white rounded-[4px] text-[#111111] shadow-md hover:shadow-xl transition-all relative overflow-hidden group p-2.5 sm:p-3 flex flex-col justify-between cursor-pointer"
                onClick={() => onAddDealToCart(deal.id)}
              >
                {/* Top-right corner tag */}
                <div
                  className={`absolute top-0 right-0 font-label-md text-[10px] sm:text-[11px] font-extrabold px-2.5 py-0.5 rounded-bl-[4px] shadow-xs z-10 ${badgeBg}`}
                >
                  {deal.tag}
                </div>

                <div>
                  {/* Image Box */}
                  <div className="w-full aspect-square rounded-[4px] overflow-hidden bg-[#F6F8F5] mb-2 border border-[#E3E8E1]">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Category */}
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#006e24] uppercase tracking-wider block mb-0.5 truncate">
                    {deal.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-bold text-xs sm:text-[13px] text-[#111111] line-clamp-1 mb-1 leading-snug">
                    {deal.title}
                  </h3>

                  {/* Specification */}
                  <p className="font-body-sm text-[11px] text-[#555E57] line-clamp-1 mb-2">
                    {deal.spec}
                  </p>
                </div>

                {/* Price and Cart button - Mobile stacked & compact to prevent awkward line breaks */}
                <div className="flex items-center justify-between pt-1.5 border-t border-[#E3E8E1] gap-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1.5 min-w-0 pr-0.5">
                    <span className="font-title-lg text-[11px] sm:text-sm text-[#FF161F] font-black leading-tight whitespace-nowrap">
                      {formatVND(deal.price)}
                    </span>
                    <span className="font-body-sm text-[9px] sm:text-[11px] text-[#717A73] line-through leading-tight whitespace-nowrap">
                      {formatVND(deal.originalPrice)}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddDealToCart(deal.id);
                    }}
                    className="w-7 h-7 rounded-[4px] bg-[#01B341] text-white flex items-center justify-center hover:bg-[#006e24] transition-colors shadow-xs cursor-pointer border-0 shrink-0"
                    title="Thêm vào giỏ"
                    type="button"
                    aria-label={`Thêm ${deal.title} vào giỏ hàng`}
                  >
                    <CartIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
