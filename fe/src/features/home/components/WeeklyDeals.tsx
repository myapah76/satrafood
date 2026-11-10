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

  const [hours, minutes, seconds] = campaign.countdownHours.split(':');

  return (
    <section className="w-full my-4">
      <div className="rounded-[4px] p-4 sm:p-6 shadow-lg text-white relative overflow-hidden bg-[#01B341]">
        {/* Decorative Packaging Graphic Texture */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#DAFF01]/15 rounded-[4px] blur-2xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-20 w-80 h-80 bg-[#FC95FD]/15 rounded-[4px] blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-5 sm:mb-6 relative z-10 gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
            <div className="px-3 py-1 bg-[#DAFF01] text-[#111111] font-label-lg rounded-[4px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 text-xs w-fit">
              <span className="material-symbols-outlined text-[18px]">local_offer</span>
              {campaign.title}
            </div>
            <span className="font-body-md text-xs text-white/90">
              {campaign.subtitle}
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

        {/* 3 Featured Promo Deals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 relative z-10">
          {deals.map((deal) => {
            const badgeBg =
              deal.tagType === 'discount'
                ? 'bg-[#FC95FD] text-[#111111]'
                : deal.tagType === 'same_price'
                ? 'bg-[#DAFF01] text-[#111111]'
                : 'bg-[#FF9400] text-white';

            return (
              <div
                key={deal.id}
                className="bg-white rounded-[4px] text-[#111111] shadow-md hover:shadow-xl transition-all relative overflow-hidden group p-3 cursor-pointer"
                onClick={() => onAddDealToCart(deal.id)}
              >
                <div
                  className={`absolute top-0 right-0 font-label-md text-[11px] font-extrabold px-3 py-1 rounded-bl-[4px] shadow-xs z-10 ${badgeBg}`}
                >
                  {deal.tag}
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <div className="w-22 h-22 sm:w-24 sm:h-24 rounded-[4px] overflow-hidden bg-[#F6F8F5] shrink-0 border border-[#E3E8E1]">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="pr-16">
                      <span className="text-[10px] sm:text-[11px] font-label-sm text-[#006e24] font-bold uppercase tracking-wider block truncate">
                        {deal.category}
                      </span>
                      <h3 className="font-title-md text-xs sm:text-sm text-[#111111] font-bold line-clamp-1 mt-0.5">
                        {deal.title}
                      </h3>
                      <p className="font-body-sm text-[11px] text-[#555E57] line-clamp-1">
                        {deal.spec}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-title-lg text-xs sm:text-sm text-[#FF161F] font-black">
                          {formatVND(deal.price)}
                        </span>
                        <span className="font-body-sm text-[10px] sm:text-[11px] text-[#555E57] line-through">
                          {formatVND(deal.originalPrice)}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddDealToCart(deal.id);
                        }}
                        className="w-7 h-7 rounded-[4px] bg-[#01B341] text-white flex items-center justify-center hover:bg-[#006e24] transition-colors shadow-xs cursor-pointer border-0"
                        title="Thêm vào giỏ"
                        type="button"
                        aria-label={`Thêm ${deal.title} vào giỏ hàng`}
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
