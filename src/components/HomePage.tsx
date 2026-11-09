import React, { useState } from 'react';
import { CATEGORIES_GRID, PROMO_DEALS, SATRA_PRODUCTS, STORE_LOCATIONS } from '../data/mockData';
import { Product, StoreLocation } from '../types';
import { formatVND } from '../utils/cart';

interface HomePageProps {
  onNavigateToCategory: (subCategory?: string) => void;
  onAddToCart: (product: Product) => void;
  onShowTraceability: (product: Product) => void;
  onShowToast: (msg: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateToCategory,
  onAddToCart,
  onShowTraceability,
  onShowToast,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState('Bình Thạnh');
  const [storeSearch, setStoreSearch] = useState('');
  const [newsletterInput, setNewsletterInput] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Filtered store based on district selection
  const activeStore: StoreLocation =
    STORE_LOCATIONS.find((s) => s.district.toLowerCase().includes(selectedDistrict.toLowerCase())) ||
    STORE_LOCATIONS[0];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterInput.trim()) return;
    setNewsletterSubscribed(true);
    onShowToast('Đăng ký thành công! Mã Voucher SATRA50K (50.000đ) đã gửi đến bạn.');
  };

  const handleAddDealToCart = (dealId: string) => {
    // Find matching product
    let targetProduct = SATRA_PRODUCTS.find((p) => {
      if (dealId === 'deal-1') return p.id === 'p1';
      if (dealId === 'deal-2') return p.id === 'p2';
      return p.id === 'p4';
    });
    if (targetProduct) {
      onAddToCart(targetProduct);
      onShowToast(`Đã thêm "${targetProduct.name}" vào giỏ hàng`);
    }
  };

  return (
    <div className="w-full pt-32 lg:pt-36 bg-[#fdf8f8] max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 min-h-[calc(100vh-144px)] pb-20 md:pb-8">
      <div className="flex flex-col w-full">
        {/* 1. HERO SECTION BANNER */}
        <section className="w-full rounded-2xl overflow-hidden shadow-sm mb-4 mt-1">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd6DgUy3G0ro6Xj-nzFbGUkXeIhalpkCiNwgZm3HioxueCJz8wGoir07zgt7gMgDEyrZjRZEng306OU69AImu1xXOdsgfndxmGSERaKsf302Y_OobfteB-MAQFb-2U6PBS76Qi-qF0tEGAIo8YWW1JDWVbRIt0t-YFKYWMCOajENP2irUdDYxwPeLkfSkEx6BI4MQuOiXloeWHi7IihJTr6WOOanc4qmSjfdoLf83ACFc546mz4TaeSg"
            alt="SATRAFOODS Hero Banner"
            className="w-full h-auto object-cover rounded-2xl cursor-pointer hover:opacity-98 transition-opacity"
            onClick={() => onNavigateToCategory()}
          />
        </section>

        {/* 2. PROMOTIONAL CAMPAIGN BANNER: "GÓI TRỌN ƯU ĐÃI" */}
        <section className="w-full my-4">
          <div className="rounded-2xl p-4 sm:p-6 shadow-lg text-white relative overflow-hidden bg-[#01B341]">
            {/* Decorative Packaging Graphic Texture */}
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#DAFF01]/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute left-1/3 -bottom-20 w-80 h-80 bg-[#FC95FD]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-5 sm:mb-6 relative z-10 gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
                <div className="px-3 py-1 bg-[#DAFF01] text-[#111111] font-label-lg rounded-md font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 text-xs w-fit">
                  <span className="material-symbols-outlined text-[18px]">local_offer</span>
                  GÓI TRỌN ƯU ĐÃI TUẦN NÀY
                </div>
                <span className="font-body-md text-xs text-white/90">
                  Áp dụng từ thứ Hai đến Chủ Nhật trên toàn chuỗi Satrafoods
                </span>
              </div>

              {/* Countdown Timer */}
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-white self-start sm:self-auto">
                <span className="font-label-sm text-[11px] text-[#DAFF01] uppercase font-bold">
                  Kết thúc sau:
                </span>
                <div className="flex items-center gap-1 font-label-md text-xs font-bold">
                  <span className="px-2 py-0.5 bg-white text-[#111111] rounded">02</span>:
                  <span className="px-2 py-0.5 bg-white text-[#111111] rounded">14</span>:
                  <span className="px-2 py-0.5 bg-white text-[#111111] rounded">48</span>
                </div>
              </div>
            </div>

            {/* 3 Featured Promo Parcels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 relative z-10">
              {PROMO_DEALS.map((deal) => {
                const badgeBg =
                  deal.tagType === 'discount'
                    ? 'bg-[#FF161F] text-white'
                    : deal.tagType === 'same_price'
                    ? 'bg-[#DAFF01] text-[#111111]'
                    : 'bg-[#FF9500] text-white';

                return (
                  <div
                    key={deal.id}
                    className="bg-white rounded-xl text-[#111111] shadow-md hover:shadow-xl transition-all relative overflow-hidden group p-3 cursor-pointer"
                    onClick={() => handleAddDealToCart(deal.id)}
                  >
                    <div
                      className={`absolute top-0 right-0 font-label-md text-[11px] font-extrabold px-3 py-1 rounded-bl-lg shadow-xs z-10 ${badgeBg}`}
                    >
                      {deal.tag}
                    </div>

                    <div className="flex gap-3 sm:gap-4">
                      <div className="w-22 h-22 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-[#F6F8F5] shrink-0 border border-[#E3E8E1]">
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
                          <p className="font-body-sm text-[11px] text-[#555E57] line-clamp-1">{deal.spec}</p>
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
                              handleAddDealToCart(deal.id);
                            }}
                            className="w-7 h-7 rounded-lg bg-[#01B341] text-white flex items-center justify-center hover:bg-[#006e24] transition-colors shadow-xs cursor-pointer border-0"
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

        {/* 3. VOUCHER 50.000đ HOOK / NEWSLETTER */}
        <section className="w-full bg-[#F6F8F5] rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between shadow-sm mt-2 mb-6 border border-[#E3E8E1] gap-4">
          <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
            <div className="w-12 h-12 rounded-full bg-[#DAFF01] flex items-center justify-center text-[#111111] shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[26px]">mark_email_read</span>
            </div>
            <div>
              <h3 className="font-title-lg text-sm sm:text-base text-[#111111] font-bold">
                Nhận Voucher 50.000đ Cho Đơn Hàng Đầu Tiên
              </h3>
              <p className="font-body-sm text-xs text-[#555E57]">
                Đăng ký thành viên Satra Rewards để tích điểm 2% và nhận thông báo thịt tươi mỗi sáng.
              </p>
            </div>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 w-full md:w-96">
            <input
              className="flex-1 h-11 px-3 sm:px-4 rounded-lg bg-white border border-[#E3E8E1] font-body-md text-xs text-[#111111] placeholder:text-[#555E57] focus:outline-none focus:ring-2 focus:ring-[#01B341]"
              placeholder="Nhập số điện thoại hoặc email..."
              type="text"
              value={newsletterInput}
              onChange={(e) => setNewsletterInput(e.target.value)}
              disabled={newsletterSubscribed}
            />
            <button
              className="h-11 px-4 sm:px-5 bg-[#01B341] text-white font-label-md text-xs font-bold rounded-lg hover:bg-[#006e24] transition-colors whitespace-nowrap cursor-pointer shadow-sm border-0"
              type="submit"
            >
              {newsletterSubscribed ? 'Đã Nhận Mã' : 'Đăng Ký'}
            </button>
          </form>
        </section>

        {/* 4. EXPLORE CATEGORIES (18 CATEGORIES IN 6 COLS ON DESKTOP, 3 ON MOBILE) */}
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
            {CATEGORIES_GRID.map((cat) => (
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

        {/* 5. STORE LOCATOR & OMNICHANNEL CONVENIENCE */}
        <section
          className="w-full bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm mb-4 border border-[#E3E8E1]"
          id="store-locator"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Left: Interactive Search & Quick Filters */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DAFF01] text-[#111111] font-bold text-[11px] uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-[16px] text-[#006e24]">pin_drop</span>
                HỆ THỐNG PHỦ KHẮP ĐỊA BÀN
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111111] mb-2">
                Tìm Cửa Hàng Satrafoods Gần Nhất
              </h2>
              <p className="font-body-md text-xs text-[#555E57] mb-5 sm:mb-6">
                Với hơn 180 điểm bán phủ kín các quận huyện TP.HCM và Cần Thơ, bạn luôn có thể ghé mua hoặc nhận hàng tận cửa trong nháy mắt.
              </p>

              {/* Search Bar With District Quick Selector */}
              <div className="space-y-4">
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-[#555E57] text-[20px]">
                    search
                  </span>
                  <input
                    className="w-full h-11 sm:h-12 pl-11 pr-24 bg-[#F6F8F5] border border-[#E3E8E1] rounded-xl font-body-md text-xs text-[#111111] placeholder:text-[#555E57] focus:outline-none focus:ring-2 focus:ring-[#01B341]"
                    placeholder="Nhập tên đường, phường hoặc quận..."
                    type="text"
                    value={storeSearch}
                    onChange={(e) => setStoreSearch(e.target.value)}
                  />
                  <button
                    className="absolute right-1.5 px-3 sm:px-4 h-8 sm:h-9 bg-[#01B341] text-white font-bold text-xs rounded-lg hover:bg-[#006e24] transition-colors cursor-pointer border-0"
                    type="button"
                    onClick={() => {
                      if (storeSearch.trim()) {
                        setSelectedDistrict(storeSearch.trim());
                        onShowToast(`Đã tìm kiếm cửa hàng gần: ${storeSearch}`);
                      }
                    }}
                  >
                    Tìm ngay
                  </button>
                </div>

                {/* Quick District Chips */}
                <div>
                  <div className="font-label-sm text-[11px] text-[#555E57] uppercase mb-2 font-bold tracking-wider">
                    Chọn nhanh khu vực:
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {[
                      'Quận 1',
                      'Quận 3',
                      'Bình Thạnh',
                      'TP. Thủ Đức',
                      'Phú Nhuận',
                      'Gò Vấp',
                      'Quận 7',
                    ].map((district) => {
                      const isSelected = selectedDistrict.includes(district);
                      return (
                        <button
                          key={district}
                          onClick={() => setSelectedDistrict(district)}
                          className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer border-0 ${
                            isSelected
                              ? 'bg-[#01B341] text-white shadow-xs'
                              : 'bg-[#F6F8F5] text-[#111111] hover:bg-[#DAFF01]'
                          }`}
                          type="button"
                        >
                          {district === 'Bình Thạnh' ? 'Bình Thạnh (18 Cửa hàng)' : district}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Map with Pin Overlays & Active Store Snippet */}
            <div className="lg:col-span-6 relative">
              <div
                className="w-full h-72 sm:h-80 rounded-2xl bg-[#F6F8F5] border border-[#E3E8E1] bg-cover bg-center overflow-hidden relative shadow-inner flex items-center justify-center"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80")`,
                }}
              >
                {/* Visual Map Pins */}
                <div className="absolute top-1/4 left-1/3 bg-[#01B341] text-white p-1.5 rounded-full shadow-lg animate-bounce">
                  <span className="material-symbols-outlined text-[20px] block">store</span>
                </div>
                <div className="absolute top-1/2 left-2/3 bg-[#006e24] text-white p-1 rounded-full shadow-md">
                  <span className="material-symbols-outlined text-[16px] block">store</span>
                </div>
                <div className="absolute top-1/3 right-1/4 bg-[#006e24] text-white p-1 rounded-full shadow-md">
                  <span className="material-symbols-outlined text-[16px] block">store</span>
                </div>

                {/* Active Store Card Overlay */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-lg border border-[#E3E8E1] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#006e24] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[20px] sm:text-[22px]">store</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#111111]">{activeStore.name}</h4>
                      <p className="font-body-sm text-[11px] sm:text-xs text-[#555E57]">{activeStore.address}</p>
                      <div className="flex items-center gap-2 mt-1 text-[#006e24] font-bold text-[10px] sm:text-[11px]">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#01B341] animate-pulse" />
                          Đang mở ({activeStore.hours})
                        </span>
                        <span>•</span>
                        <span>{activeStore.distance}</span>
                      </div>
                    </div>
                  </div>
                  <a
                    className="self-end sm:self-auto px-3.5 py-1.5 sm:py-2 bg-[#DAFF01] text-[#111111] font-bold text-xs rounded-lg hover:bg-[#01B341] hover:text-white transition-colors shrink-0 flex items-center gap-1 no-underline"
                    href="tel:18001199"
                  >
                    <span className="material-symbols-outlined text-[16px]">directions</span>
                    <span>Chỉ đường</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
