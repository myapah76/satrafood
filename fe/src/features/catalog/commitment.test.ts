import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { COMMITMENT_ITEMS } from './components/CommitmentBanner';

describe('CommitmentBanner Integrity', () => {
  it('contains exactly 4 commitment items matching the design specifications', () => {
    assert.equal(COMMITMENT_ITEMS.length, 4, 'must have 4 commitment items');

    const expected = [
      { id: 'c1', title: 'Giao nhanh 2 Giờ', subtitle: 'Nhanh chóng & trọn vị tươi sống' },
      { id: 'c2', title: 'Chuẩn VietGAP & OCOP', subtitle: '100% truy xuất nguồn gốc an toàn' },
      { id: 'c3', title: 'Giá Luôn Bình Ổn', subtitle: 'Đồng hành trợ giá cho mọi gia đình' },
      { id: 'c4', title: '180+ Cửa Hàng Phủ Rộng', subtitle: 'Phục vụ khắp TP.HCM & Cần Thơ' },
    ];

    expected.forEach((item, index) => {
      assert.equal(COMMITMENT_ITEMS[index].id, item.id);
      assert.equal(COMMITMENT_ITEMS[index].title, item.title);
      assert.equal(COMMITMENT_ITEMS[index].subtitle, item.subtitle);
      assert.ok(COMMITMENT_ITEMS[index].icon, `item ${item.id} must have an icon`);
    });
  });
});

