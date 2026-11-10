import React, { useState } from 'react';
import { GiftIcon } from '../../components/icons';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  userPhone: string;
  onSavePhone: (phone: string) => void;
  onShowToast?: (msg: string) => void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({
  isOpen,
  onClose,
  userPhone,
  onSavePhone,
  onShowToast,
}) => {
  const [phoneInput, setPhoneInput] = useState(userPhone || '0908123456');
  const [points] = useState(420); // 420 points = 42,000 VND
  const [copiedCode, setCopiedCode] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSave = () => {
    onSavePhone(phoneInput);
    setUpdateSuccess(true);
    if (onShowToast) {
      onShowToast('Đã cập nhật số điện thoại thành viên thành công!');
    }
    setTimeout(() => setUpdateSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-[4px] max-w-md w-full overflow-hidden shadow-2xl border border-[#E3E8E1] text-[#111111]">
        {/* Header with Satra brand lime & green */}
        <div className="bg-gradient-to-r from-[#01B341] to-[#006e24] text-white p-6 relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#DAFF01]/20 rounded-[4px] blur-xl pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="px-2.5 py-1 rounded-[4px] bg-[#DAFF01] text-[#111111] font-bold text-[11px] uppercase tracking-wider">
              Satra Rewards
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-[4px] bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer border-0"
              aria-label="Đóng"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
          <h3 className="font-headline-sm text-xl font-bold">Thành Viên Thân Thiết</h3>
          <p className="text-xs text-white/85 mt-1">
            Tích lũy 2% giá trị hóa đơn mỗi ngày, đổi điểm mua thực phẩm sạch
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Member Card Box */}
          <div className="bg-gradient-to-br from-[#1c1b1b] to-[#313030] text-white rounded-[4px] p-4 shadow-md border border-neutral-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold tracking-widest text-[#DAFF01] uppercase">
                SATRA GOLD MEMBER
              </span>
              <span className="material-symbols-outlined text-[#DAFF01]">contactless</span>
            </div>
            <div className="text-xl font-mono tracking-wider font-bold text-white mb-2">
              SATRA •••• 8824
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10">
              <div>
                <span className="text-white/60 block text-[10px]">Chủ tài khoản:</span>
                <span className="font-semibold">Khách Hàng Thân Thiết</span>
              </div>
              <div className="text-right">
                <span className="text-white/60 block text-[10px]">Điểm hiện có:</span>
                <span className="font-bold text-[#DAFF01] text-sm">{points} Điểm (~42.000 đ)</span>
              </div>
            </div>
          </div>

          {/* Phone Lookup & Update */}
          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1">
              Số điện thoại đăng ký thành viên:
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="090..."
                className="flex-1 h-10 px-3 bg-[#F6F8F5] border border-[#E3E8E1] rounded-[4px] text-xs font-semibold focus:outline-none focus:border-[#01B341]"
              />
              <button
                onClick={handleSave}
                className="px-4 h-10 bg-[#01B341] text-white font-bold text-xs rounded-[4px] hover:bg-[#006e24] transition-colors cursor-pointer border-0"
              >
                {updateSuccess ? 'Đã lưu' : 'Cập nhật'}
              </button>
            </div>
          </div>

          {/* Member Benefits */}
          <div className="space-y-2 bg-[#F6F8F5] p-3.5 rounded-[4px] border border-[#E3E8E1] text-xs">
            <div className="font-bold text-[#111111] mb-1 flex items-center gap-1.5">
              <GiftIcon className="w-4 h-4 text-[#01B341] shrink-0" aria-hidden="true" />
              Đặc quyền riêng cho bạn hôm nay:
            </div>
            <div className="flex items-start gap-2 text-[#555E57]">
              <span className="text-[#01B341] font-bold">•</span>
              <span>Giảm thêm 2% trực tiếp trên tổng đơn hàng khi thanh toán.</span>
            </div>
            <div className="flex items-start gap-2 text-[#555E57]">
              <span className="text-[#01B341] font-bold">•</span>
              <span>Miễn phí giao hàng 2h cho đơn từ 200.000đ khắp TP.HCM.</span>
            </div>
            <div className="flex items-start gap-2 text-[#555E57]">
              <span className="text-[#01B341] font-bold">•</span>
              <span>Ưu tiên nhận thông báo mẻ cá hồi tươi và thịt heo mới về mỗi sáng.</span>
            </div>
          </div>

          {/* Exclusive Coupon Code */}
          <div className="border border-dashed border-[#01B341] rounded-[4px] p-3 flex items-center justify-between bg-[#DAFF01]/10">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#006e24] block">Mã voucher thành viên:</span>
              <strong className="text-sm font-mono text-[#111111]">SATRAFRESHT3</strong>
              <span className="text-[11px] text-[#555E57] block">Giảm 30.000đ cho đơn thực phẩm tươi từ 250k</span>
            </div>
            <button
              onClick={() => handleCopy('SATRAFRESHT3')}
              className="px-3 py-1.5 bg-[#01B341] text-white font-bold text-xs rounded-[4px] hover:bg-[#006e24] transition-colors cursor-pointer whitespace-nowrap border-0"
            >
              {copiedCode ? 'Đã sao chép!' : 'Sao chép'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
