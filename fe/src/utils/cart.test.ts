import test from 'node:test';
import assert from 'node:assert/strict';
import { formatVND, calculateCartTotals, filterProducts, sortProducts } from './cart';
import { CartItem, Product } from '../types';

const mockProductA: Product = {
  id: 'p1',
  name: 'Thịt Ba Rọi Heo VietGAP',
  category: 'Thực phẩm tươi sống',
  subCategory: 'Thịt heo thảo mộc & VietGAP',
  price: 76000,
  originalPrice: 95000,
  discountPercent: 20,
  unit: 'Khay 500g',
  image: 'https://example.com/pork.jpg',
  standards: ['VietGAP', 'ATTP'],
  origin: 'Trại heo thảo mộc Satra Củ Chi',
  tags: ['Đang giảm giá', 'Giao 2H'],
};

const mockProductB: Product = {
  id: 'p2',
  name: 'Cải Thìa Thủy Canh Chuẩn VietGAP',
  category: 'Thực phẩm tươi sống',
  subCategory: 'Rau củ sạch Đà Lạt',
  price: 16500,
  originalPrice: 20000,
  discountPercent: 18,
  unit: 'Túi 450g',
  image: 'https://example.com/cabbage.jpg',
  standards: ['VietGAP', 'OCOP'],
  origin: 'Hợp tác xã rau Đà Lạt',
  tags: ['Bán chạy nhất'],
};

test('formatVND formats Vietnamese currency properly', () => {
  assert.equal(formatVND(76000), '76.000 đ');
});

test('calculateCartTotals calculates subtotals, member discount, and item count correctly', () => {
  const items: CartItem[] = [
    { product: mockProductA, quantity: 2 }, // 76000 * 2 = 152000
    { product: mockProductB, quantity: 1 }, // 16500 * 1 = 16500
  ];
  // subtotal = 168500
  // totalOriginal = 95000*2 + 20000*1 = 210000
  // totalSavings = 210000 - 168500 = 41500
  // memberDiscount (2%) = round(168500 * 0.02) = 3370
  // shippingFee = 20000 (subtotal < 200000)
  // finalTotal = 168500 - 3370 - 0 + 20000 = 185130

  const totals = calculateCartTotals(items, true, 0);
  assert.equal(totals.subtotal, 168500);
  assert.equal(totals.totalOriginal, 210000);
  assert.equal(totals.totalItemSavings, 41500);
  assert.equal(totals.memberDiscount, 3370);
  assert.equal(totals.shippingFee, 20000);
  assert.equal(totals.finalTotal, 185130);
  assert.equal(totals.totalItemsCount, 3);
});

test('filterProducts filters by sub-category, search query, and standards', () => {
  const products = [mockProductA, mockProductB];

  // SubCategory filter
  const filteredSub = filterProducts(products, { subCategory: 'Thịt heo thảo mộc & VietGAP' });
  assert.equal(filteredSub.length, 1);
  assert.equal(filteredSub[0].id, 'p1');

  // Search filter
  const filteredSearch = filterProducts(products, { searchQuery: 'Cải thìa' });
  assert.equal(filteredSearch.length, 1);
  assert.equal(filteredSearch[0].id, 'p2');

  // Standards filter
  const filteredOcop = filterProducts(products, { standards: ['OCOP'] });
  assert.equal(filteredOcop.length, 1);
  assert.equal(filteredOcop[0].id, 'p2');

  // "Tất cả thực phẩm tươi sống" and "all" should return all products
  const allSub1 = filterProducts(products, { subCategory: 'all' });
  assert.equal(allSub1.length, 2);

  const allSub2 = filterProducts(products, { subCategory: 'Tất cả thực phẩm tươi sống' });
  assert.equal(allSub2.length, 2);

  const allSub3 = filterProducts(products, { subCategory: undefined });
  assert.equal(allSub3.length, 2);
});

test('sortProducts sorts correctly by price ascending and descending', () => {
  const products = [mockProductA, mockProductB];
  const asc = sortProducts(products, 'price_asc');
  assert.equal(asc[0].id, 'p2');
  assert.equal(asc[1].id, 'p1');

  const desc = sortProducts(products, 'price_desc');
  assert.equal(desc[0].id, 'p1');
  assert.equal(desc[1].id, 'p2');
});
