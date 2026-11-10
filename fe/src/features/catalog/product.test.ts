import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import productsData from '../../data/products.json';
import promotionsData from '../../data/promotions.json';
import { Product, PromoDeal } from '../../types';

describe('Product Data and Mobile Specs Integrity', () => {
  it('all 12 products have specMeta and overlay metadata for mobile cards', () => {
    const products = productsData as Product[];
    assert.equal(products.length, 12, 'should have 12 fresh food products');

    products.forEach((product) => {
      assert.ok(product.id, 'product must have an id');
      assert.ok(product.name, 'product must have a name');
      assert.ok(product.price > 0, 'product price must be positive');
      assert.ok(product.originalPrice > 0, 'product originalPrice must be positive');
      assert.ok(product.specMeta, `product ${product.id} must have specMeta`);
      assert.ok(product.overlayLeft, `product ${product.id} must have overlayLeft`);
      assert.ok(product.overlayRight, `product ${product.id} must have overlayRight`);
    });
  });

  it('featured deals contain 4 items matching Picture 1 specifications', () => {
    const deals = promotionsData.featuredDeals as PromoDeal[];
    assert.equal(deals.length, 4, 'should have 4 featured deals for 2x2 grid');

    const expectedDeals = [
      { id: 'deal-1', tag: '-20%', tagType: 'discount' },
      { id: 'deal-2', tag: 'Đồng giá', tagType: 'same_price' },
      { id: 'deal-3', tag: 'Combo', tagType: 'combo' },
      { id: 'deal-4', tag: 'Mới', tagType: 'new' },
    ];

    expectedDeals.forEach((expected, i) => {
      assert.equal(deals[i].id, expected.id);
      assert.equal(deals[i].tag, expected.tag);
      assert.equal(deals[i].tagType, expected.tagType);
      assert.ok(deals[i].category, 'deal must have uppercase category');
      assert.ok(deals[i].title, 'deal must have title');
      assert.ok(deals[i].price > 0, 'deal price must be positive');
      assert.ok(deals[i].originalPrice > deals[i].price, 'original price must be greater than sale price');
    });
  });
});
