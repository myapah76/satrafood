export type SafetyStandard = 'VietGAP' | 'GlobalGAP' | 'OCOP' | 'Organic' | 'ATTP';
export type ProductBadgeColor = 'green' | 'lime' | 'orange' | 'red' | 'pink';

export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  originalPrice: number;
  discountPercent?: number;
  badge?: string;
  badgeColor?: ProductBadgeColor;
  unit: string;
  image: string;
  standards: SafetyStandard[];
  origin: string;
  harvestTime?: string;
  batchNumber?: string;
  freshnessScore?: number;
  description?: string;
  tags?: string[];
  overlayLeft?: string;
  overlayRight?: string;
  specMeta?: string;
}

export interface CategoryGridItem {
  id: string;
  title: string;
  subCategory?: string;
  image?: string;
  isSpecialBadge?: boolean;
  badgeText?: string;
  badgeColor?: string;
}
