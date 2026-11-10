import React from 'react';
import productsData from '../../data/products.json';
import { Product } from '../../types';
import { CategoryExplorer } from './components/CategoryExplorer';
import { FirstOrderVoucher } from './components/FirstOrderVoucher';
import { HeroBanner } from './components/HeroBanner';
import { StoreLocatorSection } from './components/StoreLocatorSection';
import { WeeklyDeals } from './components/WeeklyDeals';
import { CommitmentBanner } from '../catalog/components/CommitmentBanner';

interface HomeScreenProps {
  onNavigateToCategory: (subCategory?: string) => void;
  onAddToCart: (product: Product) => void;
  onShowTraceability: (product: Product) => void;
  onShowToast: (msg: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateToCategory,
  onAddToCart,
  onShowToast,
}) => {
  const products = productsData as Product[];

  const handleAddDealToCart = (dealId: string) => {
    // Map promo deal ID to corresponding product
    const targetProduct = products.find((p) => {
      if (dealId === 'deal-1') return p.id === 'p1';
      if (dealId === 'deal-2') return p.id === 'p2';
      if (dealId === 'deal-3') return p.id === 'p4';
      if (dealId === 'deal-4') return p.id === 'p8';
      return false;
    });
    if (targetProduct) {
      onAddToCart(targetProduct);
      onShowToast(`Đã thêm "${targetProduct.name}" vào giỏ hàng`);
    }
  };

  return (
    <div className="w-full pt-24 md:pt-32 lg:pt-36 bg-[#fdf8f8] max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 min-h-[calc(100vh-144px)] pb-3 sm:pb-4">
      <div className="flex flex-col w-full">
        {/* 1. Hero Promotional Visual Banner */}
        <HeroBanner onExplore={() => onNavigateToCategory()} />

        {/* 2. Value Proposition Commitments Grid */}
        <CommitmentBanner />

        {/* 3. "Gói Trọn Ưu Đãi" Weekly Deals & Countdown */}
        <WeeklyDeals onAddDealToCart={handleAddDealToCart} />

        {/* 3. New Member 50.000đ Voucher Form */}
        <FirstOrderVoucher onShowToast={onShowToast} />

        {/* 4. 18 Categorized Departments Explorer */}
        <CategoryExplorer onNavigateToCategory={onNavigateToCategory} />

        {/* 5. Store Locator & District Map */}
        <StoreLocatorSection onShowToast={onShowToast} />
      </div>
    </div>
  );
};
