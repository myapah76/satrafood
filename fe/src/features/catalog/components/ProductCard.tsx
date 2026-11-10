import React from 'react';
import { Product } from '../../../types';
import { formatVND } from '../../../utils/cart';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  onAddToCart: (product: Product) => void;
  onShowTraceability: (product: Product) => void;
  onShowToast: (msg: string) => void;
}

const VALID_SAFETY_STANDARDS = ['VietGAP', 'GlobalGAP', 'OCOP', 'Organic', 'ATTP'];

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode,
  onAddToCart,
  onShowTraceability,
  onShowToast,
}) => {
  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    onShowToast(`Đã thêm "${product.name}" vào giỏ`);
  };

  const isSafetyBadge = product.badge && VALID_SAFETY_STANDARDS.includes(product.badge);

  const standardBadgeStyle =
    product.badge === 'OCOP' || product.badgeColor === 'lime'
      ? 'bg-[#DAFF01] text-[#111111]'
      : 'bg-white/95 text-[#01B341] border border-[#E3E8E1]';

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-[4px] p-3 border border-[#E3E8E1] flex items-center justify-between gap-4 shadow-xs hover:border-[#01B341] transition-all">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-20 h-20 shrink-0 rounded-[4px] overflow-hidden bg-[#F6F8F5] border border-[#E3E8E1]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discountPercent && (
              <span className="absolute top-1 left-1 px-1.5 py-0.2 bg-[#FC95FD] text-[#24102E] rounded-[4px] text-[9.5px] font-extrabold shadow-2xs tracking-[1px]">
                -{product.discountPercent}%
              </span>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              {isSafetyBadge && (
                <span className={`px-1.5 py-0.2 rounded-[4px] text-[10px] font-bold ${standardBadgeStyle}`}>
                  {product.badge}
                </span>
              )}
              <span className="text-[11px] text-[#555E57] truncate">
                {product.specMeta || product.unit}
              </span>
            </div>
            <h4 className="font-bold text-sm text-[#111111] truncate">{product.name}</h4>
            <button
              onClick={() => onShowTraceability(product)}
              className="text-[11px] text-[#01B341] hover:underline flex items-center gap-1 mt-1 bg-transparent border-0 p-0 cursor-pointer rounded-[4px]"
            >
              <span className="material-symbols-outlined text-[14px]">qr_code_2</span>
              {product.overlayLeft || 'Xem truy xuất nguồn gốc'}
            </button>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-base font-black text-[#01B341]">{formatVND(product.price)}</div>
          <div className="text-xs text-[#888888] line-through">{formatVND(product.originalPrice)}</div>
          <button
            onClick={handleAdd}
            className="mt-2 px-4 py-1.5 bg-[#01B341] text-white text-xs font-bold rounded-[4px] hover:bg-[#009636] transition-colors cursor-pointer flex items-center justify-center gap-1 border-0 shadow-xs"
            type="button"
          >
            + Thêm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[4px] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group p-2.5 border border-[#E3E8E1]">
      <div>
        {/* Product Image Box matching Picture 2 */}
        <div className="relative w-full aspect-square rounded-[4px] overflow-hidden bg-[#F6F8F5] mb-2">
          <img
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={product.image}
          />

          {/* Top-left: Pink discount pill (-20%, -18%, etc.) */}
          {product.discountPercent && (
            <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#FC95FD] text-[#24102E] rounded-[4px] text-[10.5px] font-bold shadow-2xs z-10 tracking-[1px]">
              -{product.discountPercent}%
            </span>
          )}

          {/* Top-right: Standard/certification badge strictly for Tiêu chuẩn an toàn */}
          {isSafetyBadge && (
            <span
              className={`absolute top-2 right-2 px-2 py-0.5 rounded-[4px] text-[10px] font-bold shadow-xs z-10 flex items-center gap-1 max-w-[55%] truncate ${standardBadgeStyle}`}
            >
              {(product.badge === 'VietGAP' || product.badge === 'GlobalGAP') && (
                <span className="material-symbols-outlined text-[13px] text-[#01B341] shrink-0">verified</span>
              )}
              {product.badge === 'OCOP' && (
                <span className="material-symbols-outlined text-[13px] text-[#111111] shrink-0">workspace_premium</span>
              )}
              {product.badge === 'Organic' && (
                <span className="material-symbols-outlined text-[13px] text-[#01B341] shrink-0">eco</span>
              )}
              {product.badge === 'ATTP' && (
                <span className="material-symbols-outlined text-[13px] text-[#01B341] shrink-0">verified_user</span>
              )}
              <span className="truncate">{product.badge}</span>
            </span>
          )}

          {/* Bottom image overlay strip: dark semi-transparent bar with left tag and right yellow/gold tag */}
          {(product.overlayLeft || product.overlayRight) && (
            <div
              onClick={() => onShowTraceability(product)}
              className="absolute bottom-0 inset-x-0 bg-black/75 backdrop-blur-xs px-2 py-1 flex items-center justify-between text-[10px] cursor-pointer hover:bg-black/85 transition-colors z-10"
              title="Bấm để xem truy xuất nguồn gốc"
            >
              <span className="text-white font-medium truncate pr-1">
                {product.overlayLeft}
              </span>
              <span className="text-[#DAFF01] font-bold shrink-0">
                {product.overlayRight}
              </span>
            </div>
          )}
        </div>

        {/* Packaging Specification Meta e.g. "Khay 500g • Hút chân không" */}
        <p className="text-[11px] text-[#555E57] line-clamp-1">
          {product.specMeta || product.unit}
        </p>

        {/* Product Title (2 lines max, bold, black) */}
        <h3 className="font-bold text-[13px] sm:text-[14px] text-[#111111] leading-snug line-clamp-2 mt-0.5 group-hover:text-[#01B341] transition-colors">
          {product.name}
        </h3>

        {/* Price Row: Green Sale Price + Gray Strikethrough Original Price */}
        <div className="flex items-baseline gap-1.5 mt-1.5">
          <span className="text-[15px] sm:text-[16px] font-black text-[#01B341]">
            {formatVND(product.price)}
          </span>
          <span className="text-[11px] text-[#888888] line-through">
            {formatVND(product.originalPrice)}
          </span>
        </div>
      </div>

      {/* Full-width + Thêm button */}
      <button
        onClick={handleAdd}
        className="w-full mt-2.5 py-1.5 sm:py-2 bg-[#01B341] hover:bg-[#009636] text-white font-bold text-xs rounded-[4px] flex items-center justify-center gap-1 transition-colors cursor-pointer border-0 shadow-xs"
        type="button"
        aria-label={`Thêm ${product.name} vào giỏ hàng`}
      >
        + Thêm
      </button>
    </div>
  );
};
