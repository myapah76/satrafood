import { useState, useCallback, useMemo } from 'react';
import { CartItem, CartTotals, Product } from '../types';
import { calculateCartTotals } from '../utils/cart';

export interface UseCartStoreReturn {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  appliedCoupon: { code: string; discount: number } | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  totals: CartTotals;
}

export function useCart(initialItems: CartItem[] = []): UseCartStoreReturn {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  const addToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setAppliedCoupon(null);
  }, []);

  const totals = useMemo(() => {
    return calculateCartTotals(cartItems, true, appliedCoupon ? appliedCoupon.discount : 0);
  }, [cartItems, appliedCoupon]);

  const applyCoupon = useCallback(
    (code: string): { success: boolean; message: string } => {
      const cleanCode = code.trim().toUpperCase();
      if (cleanCode === 'SATRAFRESHT3') {
        if (totals.subtotal < 250000) {
          return { success: false, message: 'Mã SATRAFRESHT3 áp dụng cho đơn từ 250.000 đ' };
        }
        setAppliedCoupon({ code: 'SATRAFRESHT3', discount: 30000 });
        return { success: true, message: 'Đã áp dụng mã SATRAFRESHT3 (-30.000đ)' };
      }
      if (cleanCode === 'SATRA50K') {
        setAppliedCoupon({ code: 'SATRA50K', discount: 50000 });
        return { success: true, message: 'Đã áp dụng mã SATRA50K (-50.000đ)' };
      }
      return { success: false, message: 'Mã ưu đãi không hợp lệ. Hãy thử: SATRAFRESHT3 hoặc SATRA50K' };
    },
    [totals.subtotal]
  );

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    totals,
  };
}
