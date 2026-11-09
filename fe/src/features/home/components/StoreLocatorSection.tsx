import React, { useState } from 'react';
import storesData from '../../../data/stores.json';
import { StoreLocation } from '../../../types';

interface StoreLocatorSectionProps {
  onShowToast: (msg: string) => void;
}

const DISTRICT_CHIPS = [
  'Quận 1',
  'Quận 3',
  'Bình Thạnh',
  'TP. Thủ Đức',
  'Phú Nhuận',
  'Gò Vấp',
  'Quận 7',
];

export const StoreLocatorSection: React.FC<StoreLocatorSectionProps> = ({ onShowToast }) => {
  const stores = storesData as StoreLocation[];
  const [selectedDistrict, setSelectedDistrict] = useState('Bình Thạnh');
  const [storeSearch, setStoreSearch] = useState('');

  // Filtered store based on district selection
  const activeStore: StoreLocation =
    stores.find((s) => s.district.toLowerCase().includes(selectedDistrict.toLowerCase())) ||
    stores[0];

  const handleSearch = () => {
    if (storeSearch.trim()) {
      setSelectedDistrict(storeSearch.trim());
      onShowToast(`Đã tìm kiếm cửa hàng gần: ${storeSearch.trim()}`);
    }
  };

  return (
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                aria-label="Tìm kiếm cửa hàng Satrafoods"
              />
              <button
                className="absolute right-1.5 px-3 sm:px-4 h-8 sm:h-9 bg-[#01B341] text-white font-bold text-xs rounded-lg hover:bg-[#006e24] transition-colors cursor-pointer border-0"
                type="button"
                onClick={handleSearch}
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
                {DISTRICT_CHIPS.map((district) => {
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
                href={`tel:${activeStore.phone.replace(/\s+/g, '')}`}
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>Gọi cửa hàng</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
