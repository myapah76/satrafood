import { CartItem, FilterOptions, Product, SortOption } from '../types';

export function formatVND(amount: number): string {
  return amount.toLocaleString('vi-VN') + ' đ';
}

export function calculateCartTotals(
  items: CartItem[],
  isMember = true,
  couponDiscount = 0
) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalOriginal = items.reduce(
    (sum, item) => sum + item.product.originalPrice * item.quantity,
    0
  );
  const totalItemSavings = Math.max(0, totalOriginal - subtotal);
  const memberDiscount = isMember ? Math.round(subtotal * 0.02) : 0;
  const shippingFee = subtotal >= 200000 || subtotal === 0 ? 0 : 20000;
  const finalTotal = Math.max(0, subtotal - memberDiscount - couponDiscount + shippingFee);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    subtotal,
    totalOriginal,
    totalItemSavings,
    memberDiscount,
    shippingFee,
    couponDiscount,
    finalTotal,
    totalItemsCount,
  };
}

export function filterProducts(products: Product[], options: FilterOptions): Product[] {
  return products.filter((p) => {
    // Search query filter
    if (options.searchQuery && options.searchQuery.trim() !== '') {
      const q = options.searchQuery.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchSubCategory = p.subCategory.toLowerCase().includes(q);
      const matchOrigin = p.origin.toLowerCase().includes(q);
      if (!matchName && !matchCategory && !matchSubCategory && !matchOrigin) {
        return false;
      }
    }

    // Sub-category filter
    if (
      options.subCategory &&
      options.subCategory !== 'all' &&
      options.subCategory !== 'Tất cả thực phẩm tươi sống' &&
      options.subCategory !== 'Tất cả thực phẩm' &&
      options.subCategory !== 'Thực phẩm tươi sống'
    ) {
      if (p.subCategory !== options.subCategory) {
        return false;
      }
    }

    // Standards filter (VietGAP, GlobalGAP, OCOP, Organic, ATTP)
    if (options.standards && options.standards.length > 0) {
      const hasAnyStandard = options.standards.some((std) =>
        p.standards.includes(std as any)
      );
      if (!hasAnyStandard) {
        return false;
      }
    }

    // Price range filter
    if (options.priceRange && options.priceRange !== 'all') {
      if (options.priceRange === 'under50' && p.price >= 50000) return false;
      if (options.priceRange === '50to100' && (p.price < 50000 || p.price > 100000)) return false;
      if (options.priceRange === '100to200' && (p.price < 100000 || p.price > 200000)) return false;
      if (options.priceRange === 'above200' && p.price <= 200000) return false;
    }

    // Tags filter
    if (options.tags && options.tags.length > 0) {
      const hasAnyTag = options.tags.some((t) => p.tags?.includes(t));
      if (!hasAnyTag) {
        return false;
      }
    }

    return true;
  });
}

export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const list = [...products];
  switch (sortBy) {
    case 'price_asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return list.sort((a, b) => b.price - a.price);
    case 'best_deal':
      return list.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    case 'best_selling':
      return list.sort((a, b) => (b.freshnessScore || 0) - (a.freshnessScore || 0));
    case 'popular':
    default:
      return list;
  }
}
