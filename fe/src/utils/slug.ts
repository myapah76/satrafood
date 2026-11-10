/**
 * Slug-based navigation utility for Satrafoods
 * Handles bi-directional mapping between Vietnamese category labels and URL slugs
 */

export const CATEGORY_SLUG_MAP: Record<string, string> = {
  'all': 'tat-ca-thuc-pham',
  'Thịt heo thảo mộc & VietGAP': 'thit-heo-thao-moc-vietgap',
  'Bò Úc & Bò ta nhập khẩu': 'bo-uc-bo-ta-nhap-khau',
  'Gia cầm tươi chuẩn CP': 'gia-cam-tuoi-chuan-cp',
  'Cá & Hải sản tươi sống': 'ca-hai-san-tuoi-song',
  'Rau ăn lá VietGAP': 'rau-an-la-vietgap',
  'Củ quả sạch Đà Lạt': 'cu-qua-sach-da-lat',
  'Trái cây nhiệt đới Nam Bộ': 'trai-cay-nhiet-doi-nam-bo',
  'Món sơ chế nấu ngay': 'mon-so-che-nau-ngay',
  'Khuyến mãi hot': 'khuyen-mai-hot',
};

export const SLUG_TO_CATEGORY_MAP: Record<string, string> = Object.entries(
  CATEGORY_SLUG_MAP
).reduce((acc, [cat, slug]) => {
  acc[slug] = cat;
  return acc;
}, {} as Record<string, string>);

/**
 * Converts a Vietnamese text string into a clean URL-friendly kebab-case slug
 */
export function slugify(text: string): string {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/&/g, 'va')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Returns URL slug for given category label
 */
export function getSlugByCategory(category?: string): string {
  if (!category || category === 'all') return 'tat-ca-thuc-pham';
  return CATEGORY_SLUG_MAP[category] || slugify(category);
}

/**
 * Returns category label for given URL slug
 */
export function getCategoryBySlug(slug?: string): string {
  if (!slug || slug === 'tat-ca-thuc-pham' || slug === 'all') return 'all';
  return SLUG_TO_CATEGORY_MAP[slug] || 'all';
}
