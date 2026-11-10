import React from 'react';
import { Product } from '../../types';
import { formatVND } from '../../utils/cart';

interface TraceabilityModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const TraceabilityModal: React.FC<TraceabilityModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-[4px] max-w-lg w-full overflow-hidden shadow-2xl border border-[#E3E8E1] text-[#111111]">
        {/* Header */}
        <div className="bg-[#01B341] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[4px] bg-[#DAFF01] text-[#111111] flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[24px]">qr_code_scanner</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-[4px] text-white">
                Minh Bạch 100%
              </span>
              <h3 className="font-bold text-base leading-tight mt-0.5">
                Hồ Sơ Truy Xuất Nguồn Gốc Satra
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-[4px] bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer border-0"
            aria-label="Đóng cửa sổ"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Product brief */}
          <div className="flex items-center gap-4 bg-[#F6F8F5] p-3.5 rounded-[4px] border border-[#E3E8E1]">
            <img
              src={product.image}
              alt={product.name}
              className="w-18 h-18 object-cover rounded-[4px] shrink-0 border border-[#E3E8E1]"
            />
            <div className="flex-1">
              <span className="text-[11px] font-bold text-[#01B341] uppercase">
                {product.subCategory}
              </span>
              <h4 className="font-bold text-sm text-[#111111] leading-snug">
                {product.name}
              </h4>
              <p className="text-xs text-[#555E57]">{product.unit}</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-sm font-black text-[#FF161F]">
                  {formatVND(product.price)}
                </span>
                <span className="text-xs text-[#555E57] line-through">
                  {formatVND(product.originalPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Trace details table */}
          <div className="space-y-2.5 text-xs">
            <div className="flex items-start justify-between py-2 border-b border-[#E3E8E1]">
              <span className="text-[#555E57] font-medium flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#01B341]">agriculture</span>
                Nông trại / Cơ sở sản xuất:
              </span>
              <span className="font-semibold text-[#111111] text-right max-w-[240px]">
                {product.origin}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#E3E8E1]">
              <span className="text-[#555E57] font-medium flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#01B341]">schedule</span>
                Thời điểm thu hái / sơ chế:
              </span>
              <span className="font-semibold text-[#111111]">{product.harvestTime || 'Sáng sớm hôm nay'}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#E3E8E1]">
              <span className="text-[#555E57] font-medium flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#01B341]">tag</span>
                Mã lô kiểm nghiệm Satra:
              </span>
              <span className="font-mono font-bold text-[#006e24] bg-[#DAFF01]/30 px-2 py-0.5 rounded-[4px]">
                {product.batchNumber || 'VG-SATRA-2026'}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#E3E8E1]">
              <span className="text-[#555E57] font-medium flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#01B341]">verified_user</span>
                Tiêu chuẩn chứng nhận:
              </span>
              <div className="flex items-center gap-1">
                {product.standards.map((std) => (
                  <span
                    key={std}
                    className="px-2 py-0.5 bg-[#01B341] text-white rounded-[4px] font-bold text-[10px]"
                  >
                    {std}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#E3E8E1]">
              <span className="text-[#555E57] font-medium flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#01B341]">sentiment_very_satisfied</span>
                Chỉ số độ tươi mới (Freshness Score):
              </span>
              <span className="font-bold text-[#01B341] text-sm">
                {product.freshnessScore || 98}% (Tối ưu trong ngày)
              </span>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div className="bg-[#F6F8F5] p-3 rounded-[4px] border border-[#E3E8E1] text-xs text-[#555E57] leading-relaxed">
              <strong className="text-[#111111] block mb-1">Mô tả quy trình kiểm định:</strong>
              {product.description}
            </div>
          )}

          {/* Guarantee stamp */}
          <div className="p-3 rounded-[4px] bg-emerald-50 border border-emerald-200 flex items-center gap-3">
            <span className="material-symbols-outlined text-emerald-700 text-[28px]">gpp_good</span>
            <div className="text-[11px] text-emerald-900 leading-snug">
              <strong>Cam Kết Đổi Trả Miễn Phí Trong 24H:</strong> Nếu phát hiện sản phẩm dập nát hoặc không đạt độ tươi cam kết, Satrafoods hoàn tiền 100%.
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-[#F6F8F5] border-t border-[#E3E8E1] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#E3E8E1] bg-white rounded-[4px] text-xs font-semibold text-[#555E57] hover:bg-gray-50 cursor-pointer"
          >
            Đóng
          </button>
          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="px-5 py-2 bg-[#01B341] hover:bg-[#006e24] text-white rounded-[4px] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm border-0"
          >
            <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
            Thêm vào giỏ ({formatVND(product.price)})
          </button>
        </div>
      </div>
    </div>
  );
};
