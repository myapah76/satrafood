import React, { useState } from 'react';
import { CartItem } from '../../types';
import { calculateCartTotals, formatVND } from '../../utils/cart';
import { CartIcon, GiftIcon, RightIcon } from '../../components/icons';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  deliveryCity: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  deliveryCity,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const totals = calculateCartTotals(items, true, appliedCoupon ? appliedCoupon.discount : 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'SATRAFRESHT3') {
      if (totals.subtotal < 250000) {
        setCouponError('Mã SATRAFRESHT3 áp dụng cho đơn từ 250.000 đ');
        return;
      }
      setAppliedCoupon({ code: 'SATRAFRESHT3', discount: 30000 });
      setCouponCode('');
    } else if (code === 'SATRA50K') {
      setAppliedCoupon({ code: 'SATRA50K', discount: 50000 });
      setCouponCode('');
    } else {
      setCouponError('Mã ưu đãi không hợp lệ. Hãy thử: SATRAFRESHT3 hoặc SATRA50K');
    }
  };

  const handleCompleteOrder = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      const fakeOrderCode = 'SATRA-' + Math.floor(100000 + Math.random() * 900000);
      setOrderSuccess(fakeOrderCode);
      onClearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Cart Header */}
        <div className="p-4 bg-[#FFFFFF] border-b border-[#E3E8E1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CartIcon className="w-6 h-6 text-[#01B341]" />
            <h3 className="font-bold text-base text-[#111111]">
              Giỏ Hàng Của Bạn ({totals.totalItemsCount})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-[4px] hover:bg-[#F6F8F5] flex items-center justify-center text-[#555E57] hover:text-[#111111] transition-colors cursor-pointer border-0"
            aria-label="Đóng giỏ hàng"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        <div className="bg-[#F6F8F5] px-4 py-2.5 border-b border-[#E3E8E1] text-xs">
          {totals.subtotal >= 200000 ? (
            <div className="flex items-center gap-1.5 text-[#006e24] font-bold">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              Đơn hàng đủ điều kiện MIỄN PHÍ GIAO HÀNG 2H!
            </div>
          ) : (
            <div>
              <div className="flex justify-between font-medium text-[#555E57] mb-1">
                <span>Giao nhanh 2h tại {deliveryCity}</span>
                <span>Thêm {formatVND(200000 - totals.subtotal)} để Freeship</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-[4px] overflow-hidden">
                <div
                  className="bg-[#01B341] h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (totals.subtotal / 200000) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Order Success Screen */}
        {orderSuccess ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-[4px] bg-[#DAFF01] text-[#006e24] flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]">check</span>
            </div>
            <h4 className="text-xl font-bold text-[#111111]">Đặt Hàng Thành Công!</h4>
            <p className="text-xs text-[#555E57] leading-relaxed max-w-xs">
              Mã đơn hàng: <strong className="text-[#01B341] font-mono text-sm">{orderSuccess}</strong>
              <br />
              Cửa hàng Satrafoods gần nhất đang tiến hành đóng gói và giao hàng trong 2 giờ.
            </p>
            <div className="p-3 bg-[#F6F8F5] rounded-[4px] border border-[#E3E8E1] text-xs text-left w-full space-y-1">
              <div className="flex justify-between">
                <span className="text-[#555E57]">Địa chỉ giao:</span>
                <span className="font-semibold text-[#111111]">{deliveryCity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#555E57]">Thời gian dự kiến:</span>
                <span className="font-semibold text-[#01B341]">Trước 120 phút</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#555E57]">Phương thức:</span>
                <span className="font-semibold text-[#111111]">Thanh toán khi nhận hàng (COD)</span>
              </div>
            </div>
            <button
              onClick={() => {
                setOrderSuccess(null);
                onClose();
              }}
              className="w-full py-2.5 bg-[#01B341] text-white font-bold text-xs rounded-[4px] hover:bg-[#006e24] transition-colors cursor-pointer border-0"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        ) : items.length === 0 ? (
          /* Empty Cart */
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-20 h-20 rounded-[4px] bg-[#F6F8F5] border border-[#E3E8E1] flex items-center justify-center text-[#555E57]">
              <CartIcon className="w-10 h-10 text-[#555E57]/60" aria-hidden="true" />
            </div>
            <h4 className="font-bold text-base text-[#111111]">Giỏ hàng của bạn đang trống</h4>
            <p className="text-xs text-[#555E57] max-w-xs">
              Hãy chọn các mặt hàng rau củ quả, thịt cá tươi sống chuẩn VietGAP mỗi ngày tại Satrafoods!
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-5 py-2.5 bg-[#01B341] text-white font-bold text-xs rounded-[4px] hover:bg-[#006e24] cursor-pointer border-0"
            >
              Khám phá thực phẩm ngay
            </button>
          </div>
        ) : (
          /* Cart Items List */
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-3 bg-white rounded-[4px] border border-[#E3E8E1] shadow-2xs hover:border-[#01B341]/50 transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-[4px] shrink-0 border border-[#E3E8E1]"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-[#111111] line-clamp-1 leading-snug">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-[#555E57]">{product.unit}</p>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="font-black text-xs text-[#01B341]">
                      {formatVND(product.price)}
                    </span>
                    <span className="text-[10px] text-[#555E57] line-through">
                      {formatVND(product.originalPrice)}
                    </span>
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center gap-1.5 bg-[#F6F8F5] border border-[#E3E8E1] rounded-[4px] p-1 shrink-0">
                  <button
                    onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                    className="w-5 h-5 rounded-[4px] hover:bg-white text-xs font-bold text-[#111111] flex items-center justify-center cursor-pointer border-0"
                    aria-label="Giảm"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold w-4 text-center">{quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                    className="w-5 h-5 rounded-[4px] hover:bg-white text-xs font-bold text-[#111111] flex items-center justify-center cursor-pointer border-0"
                    aria-label="Tăng"
                  >
                    +
                  </button>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => onRemoveItem(product.id)}
                  className="text-gray-400 hover:text-[#FF161F] transition-colors p-1 bg-transparent border-0 cursor-pointer rounded-[4px]"
                  aria-label="Xóa"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Cart Footer Summary */}
        {items.length > 0 && !orderSuccess && (
          <div className="p-4 bg-[#F6F8F5] border-t border-[#E3E8E1] space-y-3">
            {/* Quick Available Voucher Card */}
            <div className="bg-gradient-to-br from-[#DAFF01]/25 to-[#01B341]/10 border border-[#01B341]/30 rounded-[4px] p-2.5 sm:p-3 shadow-2xs">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 min-w-0">
                  <GiftIcon className="w-5 h-5 text-[#01B341] shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h5 className="font-label-lg font-bold text-xs text-[#111111]">Voucher Giảm 30K</h5>
                      <span className="bg-[#DAFF01] text-[#111111] font-black text-[9.5px] px-1.5 py-0.2 rounded-[3px]">
                        HOT
                      </span>
                    </div>
                    <p className="font-body-sm text-[#555E57] text-[11px] mt-0.5 leading-snug">
                      Đơn hàng thực phẩm tươi sống từ 250.000đ khi thanh toán thẻ thành viên.
                    </p>
                    <div className="text-[11px] text-[#006e24] font-medium mt-1">
                      Mã: <span className="font-mono font-bold tracking-wide select-all bg-white px-1.5 py-0.5 rounded-[3px] border border-[#01B341]/30">SATRAFRESHT3</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (appliedCoupon?.code === 'SATRAFRESHT3') {
                      setAppliedCoupon(null);
                      setCouponError('');
                      return;
                    }
                    if (totals.subtotal < 250000) {
                      setCouponError(
                        `Mã SATRAFRESHT3 áp dụng cho đơn từ 250.000 đ (cần thêm ${formatVND(250000 - totals.subtotal)})`
                      );
                      setCouponCode('SATRAFRESHT3');
                      return;
                    }
                    setAppliedCoupon({ code: 'SATRAFRESHT3', discount: 30000 });
                    setCouponCode('');
                    setCouponError('');
                  }}
                  className={`shrink-0 px-2.5 py-1.5 rounded-[4px] text-xs font-bold transition-all border-0 cursor-pointer shadow-2xs ${
                    appliedCoupon?.code === 'SATRAFRESHT3'
                      ? 'bg-[#006e24] hover:bg-[#00521b] text-white flex items-center gap-1'
                      : 'bg-[#01B341] hover:bg-[#006e24] text-white active:scale-95'
                  }`}
                  aria-label={appliedCoupon?.code === 'SATRAFRESHT3' ? 'Hủy mã SATRAFRESHT3' : 'Áp dụng mã SATRAFRESHT3'}
                >
                  {appliedCoupon?.code === 'SATRAFRESHT3' ? (
                    <>
                      <span className="material-symbols-outlined text-[14px]">check</span>
                      <span>Đã áp dụng</span>
                    </>
                  ) : (
                    'Áp dụng'
                  )}
                </button>
              </div>
            </div>

            {/* Voucher input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="Mã giảm giá (ví dụ: SATRAFRESHT3)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 h-9 px-3 bg-white border border-[#E3E8E1] rounded-[4px] text-xs font-mono uppercase focus:outline-none focus:border-[#01B341]"
              />
              <button
                type="submit"
                className="px-3.5 h-9 bg-[#01B341] text-white text-xs font-bold rounded-[4px] hover:bg-[#006e24] cursor-pointer border-0"
              >
                Áp dụng
              </button>
            </form>
            {couponError && <p className="text-[11px] text-[#FF161F]">{couponError}</p>}
            {appliedCoupon && (
              <div className="flex items-center justify-between text-xs text-[#006e24] font-semibold bg-[#DAFF01]/30 p-2 rounded-[4px]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>Đã áp dụng mã {appliedCoupon.code}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">-{formatVND(appliedCoupon.discount)}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setAppliedCoupon(null);
                      setCouponError('');
                    }}
                    className="text-[11px] text-[#555E57] hover:text-[#FF161F] underline cursor-pointer bg-transparent border-0 p-0"
                  >
                    Bỏ mã
                  </button>
                </div>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#555E57] pt-2 border-t border-[#E3E8E1]">
              <div className="flex justify-between">
                <span>Tạm tính hàng:</span>
                <span className="font-semibold text-[#111111]">{formatVND(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#006e24]">
                <span>Tích điểm thành viên Satra (2%):</span>
                <span className="font-bold">-{formatVND(totals.memberDiscount)}</span>
              </div>
              {totals.totalItemSavings > 0 && (
                <div className="flex justify-between text-[#FF161F]">
                  <span>Khuyến mãi giá trực tiếp:</span>
                  <span className="font-bold">Tiết kiệm {formatVND(totals.totalItemSavings)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Phí giao hàng siêu tốc 2h:</span>
                <span className="font-semibold text-[#111111]">
                  {totals.shippingFee === 0 ? (
                    <span className="text-[#01B341] font-bold">MIỄN PHÍ</span>
                  ) : (
                    formatVND(totals.shippingFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-[#111111] pt-2 border-t border-[#E3E8E1]">
                <span>Tổng thanh toán:</span>
                <span className="text-base text-[#FF161F]">{formatVND(totals.finalTotal)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleCompleteOrder}
              disabled={isCheckingOut}
              className="w-full py-3 bg-[#01B341] hover:bg-[#006e24] text-white font-bold text-sm rounded-[4px] transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2 border-0"
            >
              {isCheckingOut ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                  <span>Đang xử lý đơn hàng...</span>
                </>
              ) : (
                <>
                  <span>GIAO HÀNG NGAY 2H</span>
                  <RightIcon className="w-4 h-4 text-white shrink-0" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
