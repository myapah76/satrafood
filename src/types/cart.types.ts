import { Product } from './product.types';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartTotals {
  subtotal: number;
  totalOriginal: number;
  totalItemSavings: number;
  memberDiscount: number;
  couponDiscount: number;
  shippingFee: number;
  finalTotal: number;
  totalItemsCount: number;
}

export interface Coupon {
  code: string;
  discount: number;
  minOrder?: number;
}
