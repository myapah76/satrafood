import React, { useState, useMemo, useEffect } from 'react';
import productsData from '../../data/products.json';
import { FilterOptions, Product, SortOption } from '../../types';
import { filterProducts, sortProducts } from '../../utils/cart';
import { getSlugByCategory, getCategoryBySlug } from '../../utils/slug';
import { HomeIcon, LeftIcon, RightIcon } from '../../components/icons';
import { FilterSidebar } from './components/FilterSidebar';
import { MobileFilterDrawer } from './components/MobileFilterDrawer';
import { ProductCard } from './components/ProductCard';
import { SortToolbar } from './components/SortToolbar';
import { SatraQualityBanner } from './components/SatraQualityBanner';

interface CatalogScreenProps {
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

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  initialSubCategory,
  onNavigateHome,
  onAddToCart,
  onShowTraceability,
  onShowToast,
  searchQuery,
}) => {
  const products = productsData as Product[];

  const isAllCategory = (cat?: string) =>
    !cat ||
    cat === 'all' ||
    cat === 'Tất cả thực phẩm tươi sống' ||
    cat === 'Tất cả thực phẩm' ||
    cat === 'Thực phẩm tươi sống';

  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(() => {
    if (initialSubCategory) {
      return isAllCategory(initialSubCategory) ? 'all' : initialSubCategory;
    }
    if (typeof window !== 'undefined' && window.location.hash) {
      const rawSlug = window.location.hash.replace(/^#/, '');
      const mapped = getCategoryBySlug(rawSlug);
      return isAllCategory(mapped) ? 'all' : mapped;
    }
    return 'all';
  });

  const [selectedStandards, setSelectedStandards] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<
    'all' | 'under50' | '50to100' | '100to200' | 'above200'
  >('all');
  const [selectedPackaging, setSelectedPackaging] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync when initialSubCategory prop updates from header navigation
  useEffect(() => {
    if (initialSubCategory) {
      const cat = isAllCategory(initialSubCategory) ? 'all' : initialSubCategory;
      setSelectedSubCategory(cat);
      const slug = getSlugByCategory(cat === 'all' ? undefined : cat);
      if (window.location.hash !== `#${slug}`) {
        window.location.hash = slug;
      }
    } else {
      setSelectedSubCategory('all');
    }
  }, [initialSubCategory]);

  // Sync when window.location.hash changes (deep linking / back-forward navigation)
  useEffect(() => {
    const handleHashSync = () => {
      if (typeof window !== 'undefined' && window.location.hash) {
        const rawSlug = window.location.hash.replace(/^#/, '');
        const mapped = getCategoryBySlug(rawSlug);
        setSelectedSubCategory(isAllCategory(mapped) ? 'all' : mapped);
      } else {
        setSelectedSubCategory('all');
      }
    };

    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, []);

  const handleSelectSubCategory = (subCat: string) => {
    const cat = isAllCategory(subCat) ? 'all' : subCat;
    setSelectedSubCategory(cat);
    const slug = getSlugByCategory(cat === 'all' ? undefined : cat);
    window.location.hash = slug;
  };

  const handleToggleStandard = (id: string) => {
    setSelectedStandards((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleTogglePackaging = (pkg: string) => {
    setSelectedPackaging((prev) =>
      prev.includes(pkg) ? prev.filter((s) => s !== pkg) : [...prev, pkg]
    );
  };

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleResetFilters = () => {
    handleSelectSubCategory('all');
    setSelectedStandards([]);
    setSelectedPriceRange('all');
    setSelectedPackaging([]);
    setSelectedTags([]);
    onShowToast('Đã đặt lại bộ lọc. Đang hiển thị toàn bộ 12 sản phẩm.');
  };

  const handleResetDrawerFilters = () => {
    setSelectedStandards([]);
    setSelectedPriceRange('all');
    onShowToast('Đã đặt lại bộ lọc tiêu chuẩn và mức giá.');
  };

  const handleCopyVoucher = () => {
    navigator.clipboard.writeText('SATRAFRESHT3');
    onShowToast('Đã lưu mã SATRAFRESHT3 (-30.000đ). Dán vào giỏ hàng để sử dụng!');
  };

  // Filter & sort logic
  const filteredAndSortedProducts = useMemo(() => {
    const isAll = isAllCategory(selectedSubCategory);

    const filterOpts: FilterOptions = {
      subCategory: isAll ? undefined : selectedSubCategory,
      standards: selectedStandards.length > 0 ? selectedStandards : undefined,
      priceRange: selectedPriceRange,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      searchQuery: searchQuery,
    };

    let result = filterProducts(products, filterOpts);
    if (result.length === 0 && isAll) {
      result = products;
    }
    return sortProducts(result, sortBy);
  }, [products, selectedSubCategory, selectedStandards, selectedPriceRange, selectedTags, searchQuery, sortBy]);

  // Drawer filter count only counts Tiêu chuẩn an toàn and Mức giá
  const drawerFiltersCount =
    selectedStandards.length + (selectedPriceRange !== 'all' ? 1 : 0);

  return (
    <div className="w-full pt-24 md:pt-32 lg:pt-36 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 min-h-[calc(100vh-144px)] pb-12 md:pb-14">
      {/* Breadcrumb Navigation: Hidden on mobile (< md) */}
      <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-1.5 text-xs text-[#555E57] my-3">
        <button
          onClick={onNavigateHome}
          className="hover:text-[#01B341] transition-colors flex items-center gap-1 bg-transparent border-0 p-0 rounded-[4px] cursor-pointer text-xs text-[#555E57]"
        >
          <HomeIcon className="w-3.5 h-3.5" />
          <span>Trang chủ</span>
        </button>
        <span className="text-[#E3E8E1] font-bold">/</span>
        <button
          onClick={() => handleSelectSubCategory('all')}
          className="hover:text-[#01B341] transition-colors bg-transparent border-0 p-0 rounded-[4px] cursor-pointer text-xs text-[#555E57]"
        >
          Danh mục sản phẩm
        </button>
        <span className="text-[#E3E8E1] font-bold">/</span>
        <span className="text-[#111111] font-bold">
          {selectedSubCategory === 'all' ? 'Tất cả sản phẩm tươi sống' : selectedSubCategory}
        </span>
      </nav>

      {/* Satra Quality Commitment Banner - Placed right under breadcrumb as requested */}
      <SatraQualityBanner />

      {/* Mobile Voucher Banner matching Image 2 */}
      <div className="md:hidden mb-2.5 bg-[#01B341] text-white rounded-[4px] p-2.5 sm:p-3 flex items-center justify-between shadow-xs">
        <div className="min-w-0 pr-2">
          <div className="flex items-center gap-1.5">
            <span className="font-black text-sm text-white">Giảm 30.000đ</span>
            <span className="bg-[#DAFF01] text-[#111111] font-black text-[9.5px] px-1.5 py-0.2 rounded-[4px]">
              HOT
            </span>
          </div>
          <p className="text-[11px] text-white/95 mt-0.5 truncate">
            Đơn đồ tươi từ 250k • Mã: <span className="font-bold underline">SATRAFRESHT3</span>
          </p>
        </div>
        <button
          onClick={handleCopyVoucher}
          className="shrink-0 px-3 py-1.5 bg-[#008f33] hover:bg-[#007a2c] text-white text-xs font-bold rounded-[4px] border border-white/20 cursor-pointer shadow-2xs"
          type="button"
        >
          Lưu mã
        </button>
      </div>

      {/* 2-Column Catalog Layout: 
          - Cột trái: Bộ lọc sản phẩm (FilterSidebar)
          - Cột phải: Div món (Row trên là thanh lọc "sắp xếp theo", Row dưới là danh sách món)
      */}
      <div className="grid grid-cols-12 gap-6 lg:gap-8 items-start mt-4">
        {/* Left Column: Filter Sidebar */}
        <FilterSidebar
          subCategories={SUB_CATEGORIES}
          selectedSubCategory={selectedSubCategory}
          onSelectSubCategory={handleSelectSubCategory}
          safetyStandards={SAFETY_STANDARDS}
          selectedStandards={selectedStandards}
          onToggleStandard={handleToggleStandard}
          selectedPriceRange={selectedPriceRange}
          onSelectPriceRange={setSelectedPriceRange}
          selectedPackaging={selectedPackaging}
          onTogglePackaging={handleTogglePackaging}
          selectedTags={selectedTags}
          onToggleTag={handleToggleTag}
          onResetFilters={handleResetFilters}
          onCopyVoucher={handleCopyVoucher}
        />

        {/* Right Column: Div Món (Bao gồm thanh lọc Sắp xếp theo ở trên món + Grid các món ăn bên dưới) */}
        <section className="col-span-12 lg:col-span-9 space-y-4">
          {/* Row 1 (ở trên món): Thanh lọc "Sắp xếp theo" & "Chế độ xem" */}
          <SortToolbar
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            subCategories={SUB_CATEGORIES}
            selectedSubCategory={selectedSubCategory}
            onSelectSubCategory={handleSelectSubCategory}
            onOpenMobileFilter={() => setIsMobileFilterOpen(true)}
            activeFiltersCount={drawerFiltersCount}
            safetyStandards={SAFETY_STANDARDS}
            selectedStandards={selectedStandards}
            onToggleStandard={handleToggleStandard}
          />

          {/* Search Result Indicator if search query active */}
          {searchQuery && (
            <div className="p-3 bg-[#F6F8F5] rounded-[4px] border border-[#E3E8E1] text-xs flex items-center justify-between">
              <span>
                Kết quả tìm kiếm cho: <strong>"{searchQuery}"</strong> ({filteredAndSortedProducts.length} sản phẩm)
              </span>
            </div>
          )}

          {/* Row 2 (dưới thanh sắp xếp): Danh sách món ăn / thực phẩm tươi sống */}
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5'
                : 'space-y-3'
            }
          >
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
                onAddToCart={onAddToCart}
                onShowTraceability={onShowTraceability}
                onShowToast={onShowToast}
              />
            ))}
          </div>

          {/* Row 3: Pagination */}
          <div className="bg-white rounded-[4px] border border-[#E3E8E1] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs mt-6 text-xs">
            <p className="font-body-sm text-[#555E57]">
              Đang xem 1 - {filteredAndSortedProducts.length} trên tổng số 156 mặt hàng tươi sống
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-[4px] border border-[#E3E8E1] text-[#555E57] hover:text-[#111111] hover:bg-[#F6F8F5] text-xs flex items-center gap-1 disabled:opacity-40 cursor-pointer"
              >
                <LeftIcon className="w-3.5 h-3.5 mr-0.5" /> Trước
              </button>
              <button
                onClick={() => setCurrentPage(1)}
                className={`w-8 h-8 rounded-[4px] font-bold text-xs cursor-pointer border ${
                  currentPage === 1
                    ? 'bg-[#FC95FD] text-[#24102E] border-[#FC95FD] shadow-xs font-black tracking-[1px]'
                    : 'border-[#E3E8E1] hover:bg-[#F6F8F5] text-[#111111]'
                }`}
              >
                1
              </button>
              <button
                onClick={() => setCurrentPage(2)}
                className={`w-8 h-8 rounded-[4px] font-bold text-xs cursor-pointer border ${
                  currentPage === 2
                    ? 'bg-[#FC95FD] text-[#24102E] border-[#FC95FD] shadow-xs font-black tracking-[1px]'
                    : 'border-[#E3E8E1] hover:bg-[#F6F8F5] text-[#111111]'
                }`}
              >
                2
              </button>
              <button
                onClick={() => setCurrentPage(3)}
                className={`w-8 h-8 rounded-[4px] font-bold text-xs cursor-pointer border ${
                  currentPage === 3
                    ? 'bg-[#FC95FD] text-[#24102E] border-[#FC95FD] shadow-xs font-black tracking-[1px]'
                    : 'border-[#E3E8E1] hover:bg-[#F6F8F5] text-[#111111]'
                }`}
              >
                3
              </button>
              <span className="px-1 text-[#555E57] text-xs">...</span>
              <button
                onClick={() => setCurrentPage(10)}
                className={`w-8 h-8 rounded-[4px] font-bold text-xs cursor-pointer border ${
                  currentPage === 10
                    ? 'bg-[#FC95FD] text-[#24102E] border-[#FC95FD] font-black tracking-[1px]'
                    : 'border-[#E3E8E1] hover:bg-[#F6F8F5] text-[#111111]'
                }`}
              >
                10
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(10, p + 1))}
                disabled={currentPage === 10}
                className="px-3 py-1.5 rounded-[4px] border border-[#E3E8E1] text-[#01B341] hover:bg-[#F6F8F5] text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                Sau <RightIcon className="w-3.5 h-3.5 ml-0.5" />
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
          handleSelectSubCategory(sub);
          setIsMobileFilterOpen(false);
        }}
        safetyStandards={SAFETY_STANDARDS}
        selectedStandards={selectedStandards}
        onToggleStandard={handleToggleStandard}
        selectedPriceRange={selectedPriceRange}
        onSelectPriceRange={(range) => setSelectedPriceRange(range)}
        onResetFilters={handleResetDrawerFilters}
        totalProductsCount={filteredAndSortedProducts.length}
      />
    </div>
  );
};
