export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  originalPrice: number;
  discountPercent?: number;
  badge?: string;
  badgeColor?: 'green' | 'lime' | 'orange' | 'red';
  unit: string;
  image: string;
  standards: ('VietGAP' | 'GlobalGAP' | 'OCOP' | 'Organic' | 'ATTP')[];
  origin: string;
  harvestTime?: string;
  batchNumber?: string;
  freshnessScore?: number;
  description?: string;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterOptions {
  subCategory?: string;
  standards?: string[];
  priceRange?: 'all' | 'under50' | '50to100' | '100to200' | 'above200';
  tags?: string[];
  searchQuery?: string;
}

export type SortOption = 'popular' | 'best_selling' | 'price_asc' | 'price_desc' | 'best_deal';

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  district: string;
  city: string;
  hours: string;
  distance: string;
  phone: string;
  lat?: number;
  lng?: number;
}

export interface PromoDeal {
  id: string;
  tag: string;
  tagType: 'discount' | 'same_price' | 'combo';
  category: string;
  title: string;
  spec: string;
  price: number;
  originalPrice: number;
  image: string;
}
