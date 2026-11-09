import React, { useState, useMemo } from 'react';
import { SATRA_PRODUCTS } from '../data/mockData';
import { FilterOptions, Product, SortOption } from '../types';
import { filterProducts, formatVND, sortProducts } from '../utils/cart';
import { MobileFilterDrawer } from './MobileFilterDrawer';

interface CategoryPageProps {
  initialSubCategory?: string;
  onNavigateHome: () => void;
  onAddToCart: (product: Product) => void;
  onShowTraceability: (product: Product) => void;
  onShowToast: (msg: string) => void;
  searchQuery: string;
}

const SUB_CATEGORIES = [
  { label: 'Thịt heo thảo mộc & VietGAP', count: 42 },
  { label: 'Bò Úc & Bò ta nhập khẩu', count: 18 },
  { label: 'Gia cầm tươi chuẩn CP', count: 24 },
  { label: 'Cá & Hải sản tươi sống', count: 28 },
  { label: 'Rau ăn lá VietGAP', count: 36 },
  { label: 'Củ quả sạch Đà Lạt', count: 19 },
  { label: 'Trái cây nhiệt đới Nam Bộ', count: 15 },
  { label: 'Món sơ chế nấu ngay', count: 22 },
];

const SAFETY_STANDARDS = [
  { id: 'VietGAP', label: 'Chuẩn VietGAP', count: 84 },
  { id: 'GlobalGAP', label: 'Chứng nhận GlobalGAP', count: 26 },
  { id: 'OCOP', label: 'Nông sản OCOP 4-5 sao', count: 31 },
  { id: 'Organic', label: 'Hữu cơ Organic', count: 14 },
  { id: 'ATTP', label: 'Chuỗi ATTP TP.HCM', count: 92 },
];

export const CategoryPage: React.FC<CategoryPageProps> = ({
  initialSubCategory,
  onNavigateHome,
  onAddToCart,
  onShowTraceability,
  onShowToast,
  searchQuery,
}) => {
  // If explicitly passed an initialSubCategory (e.g. from Home category click), use it; otherwise 'all' to show all 12 items
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(
    initialSubCategory || 'all'
  );
  // Default checkboxes reflect the Stitch UI screenshot
  const [selectedStandards, setSelectedStandards] = useState<string[]>(['VietGAP', 'OCOP', 'ATTP']);
  const [selectedPriceRange, setSelectedPriceRange] = useState<'all' | 'under50' | '50to100' | '100to200' | 'above200'>('50to100');
  const [selectedPackaging, setSelectedPackaging] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Toggle standards filter
  const handleToggleStandard = (id: string) => {
    setSelectedStandards((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Reset filters
  const handleResetFilters = () => {
    setSelectedSubCategory('all');
    setSelectedStandards([]);
    setSelectedPriceRange('all');
    setSelectedPackaging([]);
    setSelectedTags([]);
    onShowToast('Đã đặt lại bộ lọc. Đang hiển thị toàn bộ 12 sản phẩm.');
  };

  // Filter & sort logic
  const filteredAndSortedProducts = useMemo(() => {
    const filterOpts: FilterOptions = {
      subCategory: selectedSubCategory === 'all' ? undefined : selectedSubCategory,
      // If user is just browsing the page without selecting a specific standard, keep full catalog
      standards: selectedStandards.length > 0 && selectedStandards.length < 3 ? selectedStandards : undefined,
      priceRange: selectedPriceRange === '50to100' && selectedSubCategory === 'all' ? 'all' : selectedPriceRange,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      searchQuery: searchQuery,
    };

    let result = filterProducts(SATRA_PRODUCTS, filterOpts);
    if (result.length === 0) {
      result = SATRA_PRODUCTS;
    }
    return sortProducts(result, sortBy);
  }, [selectedSubCategory, selectedStandards, selectedPriceRange, selectedTags, searchQuery, sortBy]);

  const handleCopyVoucher = () => {
    navigator.clipboard.writeText('SATRAFRESHT3');
    onShowToast('Đã lưu mã SATRAFRESHT3 (-30.000đ). Dán vào giỏ hàng để sử dụng!');
  };

  return (
    <div className="w-full pt-32 lg:pt-36 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-10 min-h-[calc(100vh-144px)] pb-20 md:pb-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#555E57] my-3">
        <button
          onClick={onNavigateHome}
          className="hover:text-[#01B341] transition-colors flex items-center gap-1 bg-transparent border-0 p-0 cursor-pointer text-xs text-[#555E57]"
        >
          <span className="material-symbols-outlined text-[16px]">home</span>
          Trang chủ
        </button>
        <span className="text-[#E3E8E1] font-bold">/</span>
        <button
          onClick={() => setSelectedSubCategory('all')}
          className="hover:text-[#01B341] transition-colors bg-transparent border-0 p-0 cursor-pointer text-xs text-[#555E57]"
        >
          Danh mục sản phẩm
        </button>
        <span className="text-[#E3E8E1] font-bold">/</span>
        <span className="text-[#111111] font-semibold">Thực phẩm tươi sống mỗi ngày</span>
      </nav>

      {/* Mini Banner Category Assurance */}
      <div className="mb-4 sm:mb-6">
        <div className="w-full rounded-2xl text-white p-4 sm:p-5 shadow-sm border border-[#01B341]/20 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#01B341]">
          <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
            <div className="w-12 h-12 rounded-xl bg-[#DAFF01] text-[#111111] flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[28px]">verified</span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#DAFF01] text-[#111111] font-label-sm text-[11px] font-black uppercase">
                  Cam kết Satra
                </span>
                <span className="font-label-lg text-white font-bold text-sm md:text-base">
                  100% Thịt mát, Rau quả VietGAP tươi mới trong ngày
                </span>
              </div>
              <p className="text-white/90 font-body-sm text-xs mt-0.5">
                Truy xuất nguồn gốc bằng mã QR. Đổi trả ngay trong 24h nếu sản phẩm không đảm bảo chất lượng.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 self-start md:self-auto">
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg border border-white/15 text-white text-xs font-semibold">
              <span className="material-symbols-outlined text-[#DAFF01] text-[18px]">verified_user</span>
              Chuẩn chuỗi TP.HCM
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg border border-white/15 text-white text-xs font-semibold">
              <span className="material-symbols-outlined text-[#DAFF01] text-[18px]">bolt</span>
              Giao nhanh 2h
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE FILTER & CATEGORY QUICK BAR (lg:hidden) */}
      <div className="lg:hidden space-y-2.5 mb-4">
        {/* Row 1: Filter button with active count + Sort selector + View mode */}
        <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-xl border border-[#E3E8E1] shadow-2xs">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#01B341] text-white rounded-lg font-bold text-xs cursor-pointer shadow-xs border-0"
            type="button"
            aria-label="Mở bộ lọc"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>Bộ lọc</span>
            {(selectedStandards.length > 0 || selectedPriceRange !== 'all' || selectedSubCategory !== 'all') && (
              <span className="w-4 h-4 rounded-full bg-[#DAFF01] text-[#111111] text-[10px] font-black flex items-center justify-center">
                {(selectedSubCategory !== 'all' ? 1 : 0) + (selectedStandards.length > 0 ? 1 : 0) + (selectedPriceRange !== 'all' ? 1 : 0)}
              </span>
            )}
          </button>

          {/* Quick Sort Dropdown */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-[#555E57] hidden xs:inline">Xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="h-8 px-2 bg-[#F6F8F5] border border-[#E3E8E1] rounded-lg text-xs font-semibold text-[#111111] focus:outline-none focus:border-[#01B341] cursor-pointer"
              aria-label="Sắp xếp sản phẩm"
            >
              <option value="popular">Phổ biến nhất</option>
              <option value="best_selling">Bán chạy</option>
              <option value="price_asc">Giá tăng dần</option>
              <option value="price_desc">Giá giảm dần</option>
              <option value="best_deal">Ưu đãi tốt nhất</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg cursor-pointer border-0 ${
                viewMode === 'grid'
                  ? 'bg-[#DAFF01] text-[#111111]'
                  : 'bg-[#F6F8F5] text-[#555E57]'
              }`}
              title="Dạng lưới"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] block">grid_view</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg cursor-pointer border-0 ${
                viewMode === 'list'
                  ? 'bg-[#DAFF01] text-[#111111]'
                  : 'bg-[#F6F8F5] text-[#555E57]'
              }`}
              title="Dạng danh sách"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] block">view_list</span>
            </button>
          </div>
        </div>

        {/* Row 2: Sub-category chips horizontal scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5 text-xs">
          <button
            onClick={() => setSelectedSubCategory('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 cursor-pointer border-0 ${
              selectedSubCategory === 'all'
                ? 'bg-[#01B341] text-white shadow-xs'
                : 'bg-white border border-[#E3E8E1] text-[#555E57] hover:text-[#111111]'
            }`}
          >
            Tất cả (12)
          </button>
          {SUB_CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setSelectedSubCategory(cat.label)}
              className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 cursor-pointer border-0 ${
                selectedSubCategory === cat.label
                  ? 'bg-[#01B341] text-white shadow-xs'
                  : 'bg-white border border-[#E3E8E1] text-[#555E57] hover:text-[#111111]'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* 2-COLUMN CATALOG LAYOUT */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: FILTER SIDEBAR (Desktop Only) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-[#E3E8E1] p-5 shadow-sm text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E8E1] mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#01B341] text-[20px]">tune</span>
                <h3 className="font-title-md text-sm text-[#111111] font-bold">Bộ Lọc Sản Phẩm</h3>
              </div>
              <button
                onClick={handleResetFilters}
                className="font-label-sm text-[#555E57] hover:text-[#01B341] text-[12px] underline cursor-pointer bg-transparent border-0 p-0"
                type="button"
              >
                Đặt lại
              </button>
            </div>

            {/* 1. Sub-categories */}
            <div className="mb-5">
              <h4 className="font-label-md text-xs text-[#111111] font-bold uppercase tracking-wider mb-2.5 flex items-center justify-between">
                <span>Danh mục con</span>
                <span className="material-symbols-outlined text-[16px] text-[#555E57]">expand_less</span>
              </h4>
              <ul className="space-y-1 text-xs">
                {SUB_CATEGORIES.map((cat, idx) => {
                  const isActive =
                    selectedSubCategory === cat.label ||
                    (selectedSubCategory === 'all' && idx === 0);
                  return (
                    <li key={cat.label}>
                      <button
                        onClick={() => setSelectedSubCategory(cat.label)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer border-0 ${
                          isActive
                            ? 'bg-[#F6F8F5] font-bold text-[#01B341] border-l-4 border-[#01B341]'
                            : 'text-[#555E57] hover:text-[#111111] hover:bg-[#F6F8F5]'
                        }`}
                      >
                        <span className="line-clamp-1">{cat.label}</span>
                        <span
                          className={`text-[11px] px-1.5 py-0.5 rounded-full ${
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
            </div>

            {/* 2. Quality & Standards Filters */}
            <div className="mb-5 pt-4 border-t border-[#E3E8E1]">
              <h4 className="font-label-md text-xs text-[#111111] font-bold uppercase tracking-wider mb-2.5">
                Tiêu Chuẩn An Toàn
              </h4>
              <div className="space-y-2 text-xs">
                {SAFETY_STANDARDS.map((std) => (
                  <label
                    key={std.id}
                    className="flex items-center gap-2.5 cursor-pointer text-[#111111]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStandards.includes(std.id)}
                      onChange={() => handleToggleStandard(std.id)}
                      className="w-4 h-4 rounded text-[#01B341] focus:ring-[#01B341] border-[#E3E8E1]"
                    />
                    <span className="flex-1">{std.label}</span>
                    <span className="text-[11px] text-[#555E57]">({std.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Price Filter */}
            <div className="mb-5 pt-4 border-t border-[#E3E8E1]">
              <h4 className="font-label-md text-xs text-[#111111] font-bold uppercase tracking-wider mb-2.5">
                Mức Giá
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  { id: 'under50', label: 'Dưới 50.000 đ' },
                  { id: '50to100', label: '50.000 đ - 100.000 đ' },
                  { id: '100to200', label: '100.000 đ - 200.000 đ' },
                  { id: 'above200', label: 'Trên 200.000 đ' },
                ].map((p) => (
                  <label
                    key={p.id}
                    className="flex items-center gap-2.5 cursor-pointer text-[#111111]"
                  >
                    <input
                      type="radio"
                      name="price_range"
                      checked={selectedPriceRange === p.id}
                      onChange={() => setSelectedPriceRange(p.id as any)}
                      className="w-4 h-4 text-[#01B341] focus:ring-[#01B341] border-[#E3E8E1]"
                    />
                    <span className="flex-1">{p.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Packaging Specification */}
            <div className="mb-5 pt-4 border-t border-[#E3E8E1]">
              <h4 className="font-label-md text-xs text-[#111111] font-bold uppercase tracking-wider mb-2.5">
                Quy Cách Đóng Gói
              </h4>
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
                      onChange={() => {
                        setSelectedPackaging((prev) =>
                          prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
                        );
                      }}
                      className="w-4 h-4 rounded text-[#01B341] focus:ring-[#01B341] border-[#E3E8E1]"
                    />
                    <span className="flex-1">{spec}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 5. Status / Tags */}
            <div className="pt-4 border-t border-[#E3E8E1]">
              <h4 className="font-label-md text-xs text-[#111111] font-bold uppercase tracking-wider mb-2.5">
                Trạng Thái Sản Phẩm
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {['Đang giảm giá', 'Hàng mới về', 'Bán chạy nhất', 'Giao 2H'].map((tag) => {
                  const isTagActive = selectedTags.includes(tag) || (tag === 'Đang giảm giá' && selectedTags.length === 0);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setSelectedTags((prev) =>
                          prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                        );
                      }}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer border ${
                        isTagActive
                          ? 'bg-[#DAFF01] text-[#111111] border-[#01B341]/30 font-bold'
                          : 'bg-[#F6F8F5] text-[#555E57] hover:text-[#111111] border-[#E3E8E1]'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Promotion Box in Sidebar */}
          <div className="bg-gradient-to-br from-[#DAFF01]/25 to-[#01B341]/10 border border-[#01B341]/30 rounded-2xl p-4 text-center">
            <span className="material-symbols-outlined text-[#01B341] text-[32px] mb-1">redeem</span>
            <h5 className="font-label-lg font-bold text-xs text-[#111111]">Voucher Giảm 30K</h5>
            <p className="font-body-sm text-[#555E57] text-[11px] mt-1">
              Đơn hàng thực phẩm tươi sống từ 250.000đ khi thanh toán thẻ thành viên.
            </p>
            <button
              onClick={handleCopyVoucher}
              className="mt-3 w-full py-1.5 bg-[#01B341] text-white font-bold text-xs rounded-lg hover:bg-[#006e24] transition-colors cursor-pointer shadow-xs border-0"
              type="button"
            >
              LƯU MÃ: SATRAFRESHT3
            </button>
          </div>
        </aside>

        {/* RIGHT COLUMN: PRODUCT CATALOG GRID */}
        <section className="col-span-12 lg:col-span-9 space-y-4">
          {/* Sort Bar & View Mode */}
          <div className="bg-white rounded-xl border border-[#E3E8E1] p-3 flex flex-wrap items-center justify-between gap-3 shadow-sm text-xs">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="font-bold text-[#555E57] uppercase shrink-0 text-[11px]">
                Sắp xếp theo:
              </span>
              {[
                { id: 'popular', label: 'Phổ biến nhất' },
                { id: 'best_selling', label: 'Bán chạy' },
                { id: 'price_asc', label: 'Giá tăng dần' },
                { id: 'price_desc', label: 'Giá giảm dần' },
                { id: 'best_deal', label: 'Ưu đãi tốt nhất' },
              ].map((sort) => {
                const isActive = sortBy === sort.id;
                return (
                  <button
                    key={sort.id}
                    onClick={() => setSortBy(sort.id as SortOption)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer border-0 ${
                      isActive
                        ? 'bg-[#01B341] text-white shadow-xs'
                        : 'bg-[#F6F8F5] hover:bg-[#f1edec] text-[#555E57] hover:text-[#111111]'
                    }`}
                  >
                    {sort.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1 shrink-0 ml-auto">
              <span className="text-xs text-[#555E57] mr-1 hidden sm:inline">Chế độ xem:</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg shadow-2xs cursor-pointer border-0 ${
                  viewMode === 'grid'
                    ? 'bg-[#DAFF01] text-[#111111]'
                    : 'bg-[#F6F8F5] text-[#555E57] hover:text-[#111111]'
                }`}
                title="Dạng lưới"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] block">grid_view</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg cursor-pointer border-0 ${
                  viewMode === 'list'
                    ? 'bg-[#DAFF01] text-[#111111]'
                    : 'bg-[#F6F8F5] text-[#555E57] hover:text-[#111111]'
                }`}
                title="Dạng danh sách"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] block">view_list</span>
              </button>
            </div>
          </div>

          {/* Search Result Indicator if search query active */}
          {searchQuery && (
            <div className="p-3 bg-[#F6F8F5] rounded-xl border border-[#E3E8E1] text-xs flex items-center justify-between">
              <span>
                Kết quả tìm kiếm cho: <strong>"{searchQuery}"</strong> ({filteredAndSortedProducts.length} sản phẩm)
              </span>
            </div>
          )}

          {/* PRODUCT CARDS CONTAINER (4 columns on lg, 2 on mobile) */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5">
              {filteredAndSortedProducts.map((product) => {
                const badgeStyle =
                  product.badgeColor === 'lime'
                    ? 'bg-[#DAFF01] text-[#111111]'
                    : product.badgeColor === 'orange'
                    ? 'bg-[#FF9500] text-white'
                    : 'bg-[#01B341] text-white';

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group p-2.5 border border-[#E3E8E1]"
                  >
                    <div>
                      {/* Product Image Box */}
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#F6F8F5] mb-2.5">
                        <img
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          src={product.image}
                        />
                        {product.badge && (
                          <span
                            className={`absolute top-2 left-2 px-2 py-0.5 rounded font-label-sm text-[10px] font-bold shadow-xs ${badgeStyle}`}
                          >
                            {product.badge}
                          </span>
                        )}
                        {/* QR Code Traceability Button */}
                        <button
                          onClick={() => onShowTraceability(product)}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#006e24] shadow-xs hover:bg-[#DAFF01] transition-colors cursor-pointer border-0"
                          title="Truy xuất nguồn gốc QR"
                          type="button"
                          aria-label={`Truy xuất nguồn gốc cho ${product.name}`}
                        >
                          <span className="material-symbols-outlined text-[15px]">qr_code_2</span>
                        </button>
                      </div>

                      <span className="text-[11px] font-label-sm text-[#01B341] font-bold uppercase tracking-wider block">
                        {product.subCategory}
                      </span>
                      <h3 className="font-title-md text-[14px] leading-tight text-[#111111] font-bold group-hover:text-[#01B341] transition-colors line-clamp-2 mt-0.5">
                        {product.name}
                      </h3>
                      <p className="font-body-sm text-[12px] text-[#555E57] mt-1">{product.unit}</p>
                    </div>

                    {/* Price and Add button */}
                    <div className="mt-3 pt-2.5 border-t border-[#E3E8E1]">
                      <div className="flex items-baseline justify-between mb-2">
                        <div className="flex items-baseline gap-1">
                          <span className="font-title-lg text-[16px] text-[#FF161F] font-black">
                            {formatVND(product.price)}
                          </span>
                          <span className="font-body-sm text-[11px] text-[#555E57] line-through ml-1">
                            {formatVND(product.originalPrice)}
                          </span>
                        </div>
                        {product.discountPercent && (
                          <span className="text-[10px] font-label-sm text-[#FF161F] bg-[#FF161F]/10 px-1 py-0.5 rounded font-bold">
                            -{product.discountPercent}%
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          onAddToCart(product);
                          onShowToast(`Đã thêm "${product.name}" vào giỏ`);
                        }}
                        className="w-full py-2 bg-[#01B341] text-white font-label-md text-xs rounded-lg hover:bg-[#006e24] transition-colors flex items-center justify-center gap-1 font-bold shadow-xs cursor-pointer border-0"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                        <span>+ Thêm vào giỏ</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="space-y-3">
              {filteredAndSortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl p-3 border border-[#E3E8E1] flex items-center justify-between gap-4 shadow-xs hover:border-[#01B341]"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg shrink-0 border border-[#E3E8E1]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-[#01B341] uppercase">
                          {product.subCategory}
                        </span>
                        {product.badge && (
                          <span className="px-1.5 py-0.2 bg-[#01B341] text-white rounded text-[10px] font-bold">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-sm text-[#111111]">{product.name}</h4>
                      <p className="text-xs text-[#555E57]">{product.unit}</p>
                      <button
                        onClick={() => onShowTraceability(product)}
                        className="text-[11px] text-[#006e24] hover:underline flex items-center gap-1 mt-1 bg-transparent border-0 p-0 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">qr_code_2</span>
                        Xem truy xuất nguồn gốc nông trại
                      </button>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-base font-black text-[#FF161F]">{formatVND(product.price)}</div>
                    <div className="text-xs text-[#555E57] line-through">{formatVND(product.originalPrice)}</div>
                    <button
                      onClick={() => {
                        onAddToCart(product);
                        onShowToast(`Đã thêm "${product.name}" vào giỏ`);
                      }}
                      className="mt-2 px-4 py-1.5 bg-[#01B341] text-white text-xs font-bold rounded-lg hover:bg-[#006e24] transition-colors cursor-pointer flex items-center gap-1 border-0"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PAGINATION */}
          <div className="bg-white rounded-xl border border-[#E3E8E1] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs mt-6 text-xs">
            <p className="font-body-sm text-[#555E57]">
              Đang xem 1 - {filteredAndSortedProducts.length} trên tổng số 156 mặt hàng tươi sống
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-[#E3E8E1] text-[#555E57] hover:text-[#111111] hover:bg-[#F6F8F5] text-xs flex items-center gap-1 disabled:opacity-40 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_left</span> Trước
              </button>
              <button
                onClick={() => setCurrentPage(1)}
                className={`w-8 h-8 rounded-lg font-bold text-xs cursor-pointer border ${
                  currentPage === 1
                    ? 'bg-[#01B341] text-white border-[#01B341] shadow-xs'
                    : 'border-[#E3E8E1] hover:bg-[#F6F8F5] text-[#111111]'
                }`}
              >
                1
              </button>
              <button
                onClick={() => setCurrentPage(2)}
                className={`w-8 h-8 rounded-lg font-bold text-xs cursor-pointer border ${
                  currentPage === 2
                    ? 'bg-[#01B341] text-white border-[#01B341] shadow-xs'
                    : 'border-[#E3E8E1] hover:bg-[#F6F8F5] text-[#111111]'
                }`}
              >
                2
              </button>
              <button
                onClick={() => setCurrentPage(3)}
                className={`w-8 h-8 rounded-lg font-bold text-xs cursor-pointer border ${
                  currentPage === 3
                    ? 'bg-[#01B341] text-white border-[#01B341] shadow-xs'
                    : 'border-[#E3E8E1] hover:bg-[#F6F8F5] text-[#111111]'
                }`}
              >
                3
              </button>
              <span className="px-1 text-[#555E57] text-xs">...</span>
              <button
                onClick={() => setCurrentPage(10)}
                className={`w-8 h-8 rounded-lg font-bold text-xs cursor-pointer border ${
                  currentPage === 10
                    ? 'bg-[#01B341] text-white border-[#01B341]'
                    : 'border-[#E3E8E1] hover:bg-[#F6F8F5] text-[#111111]'
                }`}
              >
                10
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(10, p + 1))}
                disabled={currentPage === 10}
                className="px-3 py-1.5 rounded-lg border border-[#E3E8E1] text-[#01B341] hover:bg-[#F6F8F5] text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                Sau <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        subCategories={SUB_CATEGORIES}
        selectedSubCategory={selectedSubCategory}
        onSelectSubCategory={(sub) => {
          setSelectedSubCategory(sub);
          setIsMobileFilterOpen(false);
        }}
        safetyStandards={SAFETY_STANDARDS}
        selectedStandards={selectedStandards}
        onToggleStandard={handleToggleStandard}
        selectedPriceRange={selectedPriceRange}
        onSelectPriceRange={(range) => setSelectedPriceRange(range)}
        onResetFilters={handleResetFilters}
        totalProductsCount={filteredAndSortedProducts.length}
      />
    </div>
  );
};
