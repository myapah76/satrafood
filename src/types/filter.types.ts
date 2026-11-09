export type PriceRangeOption = 'all' | 'under50' | '50to100' | '100to200' | 'above200';

export interface FilterOptions {
  subCategory?: string;
  standards?: string[];
  priceRange?: PriceRangeOption;
  tags?: string[];
  searchQuery?: string;
}

export type SortOption = 'popular' | 'best_selling' | 'price_asc' | 'price_desc' | 'best_deal';
