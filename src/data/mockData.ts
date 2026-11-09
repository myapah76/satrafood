import productsData from './products.json';
import promotionsData from './promotions.json';
import categoriesData from './categories.json';
import storesData from './stores.json';
import siteConfigData from './site-config.json';
import { Product, PromoDeal, StoreLocation } from '../types';

export const SATRA_PRODUCTS: Product[] = productsData as unknown as Product[];
export const PROMO_DEALS: PromoDeal[] = promotionsData.featuredDeals as unknown as PromoDeal[];
export const CATEGORIES_GRID = categoriesData;
export const STORE_LOCATIONS: StoreLocation[] = storesData as unknown as StoreLocation[];
export const SITE_CONFIG = siteConfigData;
