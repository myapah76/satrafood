import test from 'node:test';
import assert from 'node:assert/strict';
import { slugify, getSlugByCategory, getCategoryBySlug, CATEGORY_SLUG_MAP } from './slug';

test('slugify converts Vietnamese strings to clean URL slugs', () => {
  assert.equal(slugify('Thịt heo thảo mộc & VietGAP'), 'thit-heo-thao-moc-va-vietgap');
  assert.equal(slugify('Rau ăn lá VietGAP'), 'rau-an-la-vietgap');
  assert.equal(slugify('Cá & Hải sản tươi sống'), 'ca-va-hai-san-tuoi-song');
  assert.equal(slugify(''), '');
});

test('getSlugByCategory returns pre-mapped clean slug or slugified fallback', () => {
  assert.equal(getSlugByCategory('all'), 'tat-ca-thuc-pham-tuoi-song');
  assert.equal(getSlugByCategory(undefined), 'tat-ca-thuc-pham-tuoi-song');
  assert.equal(getSlugByCategory('Tất cả thực phẩm tươi sống'), 'tat-ca-thuc-pham-tuoi-song');
  assert.equal(getSlugByCategory('Thịt heo thảo mộc & VietGAP'), 'thit-heo-thao-moc-vietgap');
  assert.equal(getSlugByCategory('Khuyến mãi hot'), 'khuyen-mai-hot');
  assert.equal(getSlugByCategory('Trái cây nhiệt đới Nam Bộ'), 'trai-cay-nhiet-doi-nam-bo');
  assert.equal(getSlugByCategory('Đặc sản miền Tây'), 'dac-san-mien-tay');
});

test('getCategoryBySlug returns matching Vietnamese category label or "all"', () => {
  assert.equal(getCategoryBySlug('tat-ca-thuc-pham-tuoi-song'), 'all');
  assert.equal(getCategoryBySlug('tat-ca-thuc-pham'), 'all');
  assert.equal(getCategoryBySlug('thuc-pham-tuoi-song'), 'all');
  assert.equal(getCategoryBySlug('all'), 'all');
  assert.equal(getCategoryBySlug(undefined), 'all');
  assert.equal(getCategoryBySlug('thit-heo-thao-moc-vietgap'), 'Thịt heo thảo mộc & VietGAP');
  assert.equal(getCategoryBySlug('khuyen-mai-hot'), 'Khuyến mãi hot');
  assert.equal(getCategoryBySlug('cu-qua-sach-da-lat'), 'Củ quả sạch Đà Lạt');
  assert.equal(getCategoryBySlug('unknown-slug'), 'all');
});

test('CATEGORY_SLUG_MAP has bi-directional integrity', () => {
  for (const [category, slug] of Object.entries(CATEGORY_SLUG_MAP)) {
    if (
      category === 'all' ||
      category === 'Tất cả thực phẩm tươi sống' ||
      category === 'Tất cả thực phẩm' ||
      category === 'Thực phẩm tươi sống'
    ) {
      assert.equal(getCategoryBySlug(slug), 'all');
    } else {
      assert.equal(getCategoryBySlug(slug), category);
    }
  }
});
