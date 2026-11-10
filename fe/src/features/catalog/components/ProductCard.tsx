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

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode,
  onAddToCart,
  onShowTraceability,
  onShowToast,
}) => {
  // Trạng thái sản phẩm "Đang giảm giá" dùng màu hồng (#FC95FD)
  const isDiscount = product.badge === 'Đang giảm giá' || product.tags?.includes('Đang giảm giá');
  const badgeStyle =
    isDiscount || product.badgeColor === 'pink'
      ? 'bg-[#FC95FD] text-[#111111]'
      : product.badgeColor === 'lime'
      ? 'bg-[#DAFF01] text-[#111111]'
      : product.badgeColor === 'orange'
      ? 'bg-[#FF9400] text-white'
      : 'bg-[#01B341] text-white';

  const handleAdd = () => {
    onAddToCart(product);
    onShowToast(`Đã thêm "${product.name}" vào giỏ`);
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-[4px] p-3 border border-[#E3E8E1] flex items-center justify-between gap-4 shadow-xs hover:border-[#01B341] transition-all">
        <div className="flex items-center gap-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-[4px] shrink-0 border border-[#E3E8E1]"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#01B341] uppercase">
                {product.subCategory}
              </span>
              {/* Huy hiệu -20% dùng màu hồng (#FC95FD) */}
              {product.discountPercent && (
                <span className="px-1.5 py-0.5 bg-[#FC95FD] text-[#111111] rounded-[4px] text-[10px] font-extrabold shadow-2xs">
                  -{product.discountPercent}%
                </span>
              )}
              {product.badge && (
                <span className={`px-1.5 py-0.5 rounded-[4px] text-[10px] font-bold ${badgeStyle}`}>
                  {product.badge}
                </span>
              )}
            </div>
            <h4 className="font-bold text-sm text-[#111111]">{product.name}</h4>
            <p className="text-xs text-[#555E57]">{product.unit}</p>
            <button
              onClick={() => onShowTraceability(product)}
              className="text-[11px] text-[#006e24] hover:underline flex items-center gap-1 mt-1 bg-transparent border-0 p-0 cursor-pointer rounded-[4px]"
            >
              <span className="material-symbols-outlined text-[14px]">qr_code_2</span>
              Xem truy xuất nguồn gốc nông trại
            </button>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-base font-black text-[#FF161F]">{formatVND(product.price)}</div>
          <div className="text-xs text-[#555E57] line-through">{formatVND(product.originalPrice)}</div>
          <button
            onClick={handleAdd}
            className="mt-2 px-4 py-1.5 bg-[#01B341] text-white text-xs font-bold rounded-[4px] hover:bg-[#006e24] transition-colors cursor-pointer flex items-center gap-1 border-0"
          >
            <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
            Thêm vào giỏ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[4px] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group p-2.5 border border-[#E3E8E1]">
      <div>
        {/* Product Image Box */}
        <div className="relative w-full aspect-square rounded-[4px] overflow-hidden bg-[#F6F8F5] mb-2.5">
          <img
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={product.image}
          />
          {product.badge && (
            <span
              className={`absolute top-2 left-2 px-2 py-0.5 rounded-[4px] font-label-sm text-[10px] font-bold shadow-xs ${badgeStyle}`}
            >
              {product.badge}
            </span>
          )}
          {/* QR Code Traceability Button */}
          <button
            onClick={() => onShowTraceability(product)}
            className="absolute top-2 right-2 w-6 h-6 rounded-[4px] bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#006e24] shadow-xs hover:bg-[#DAFF01] transition-colors cursor-pointer border-0"
            title="Truy xuất nguồn gốc QR"
            type="button"
            aria-label={`Truy xuất nguồn gốc cho ${product.name}`}
          >
            <span className="material-symbols-outlined text-[15px]">qr_code_2</span>
          </button>
        </div>

        <span className="text-[11px] font-label-sm text-[#01B341] font-bold uppercase tracking-wider block">
          {product.subCategory}
        </span>
        <h3 className="font-title-md text-[14px] leading-tight text-[#111111] font-bold group-hover:text-[#01B341] transition-colors line-clamp-2 mt-0.5">
          {product.name}
        </h3>
        <p className="font-body-sm text-[12px] text-[#555E57] mt-1">{product.unit}</p>
      </div>

      {/* Price and Add button */}
      <div className="mt-3 pt-2.5 border-t border-[#E3E8E1]">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-baseline gap-1">
            <span className="font-title-lg text-[16px] text-[#FF161F] font-black">
              {formatVND(product.price)}
            </span>
            <span className="font-body-sm text-[11px] text-[#555E57] line-through ml-1">
              {formatVND(product.originalPrice)}
            </span>
          </div>
          {/* Huy hiệu -20% dùng màu hồng (#FC95FD) */}
          {product.discountPercent && (
            <span className="text-[10px] font-label-sm text-[#111111] bg-[#FC95FD] px-1.5 py-0.5 rounded-[4px] font-extrabold shadow-2xs">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          className="w-full py-2 bg-[#01B341] text-white font-label-md text-xs rounded-[4px] hover:bg-[#006e24] transition-colors flex items-center justify-center gap-1 font-bold shadow-xs cursor-pointer border-0"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
          <span>+ Thêm vào giỏ</span>
        </button>
      </div>
    </div>
  );
};
