import React, { useState } from 'react';

interface FirstOrderVoucherProps {
  onShowToast: (msg: string) => void;
}

export const FirstOrderVoucher: React.FC<FirstOrderVoucherProps> = ({ onShowToast }) => {
  const [newsletterInput, setNewsletterInput] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterInput.trim()) return;
    setNewsletterSubscribed(true);
    onShowToast('Đăng ký thành công! Mã Voucher SATRA50K (50.000đ) đã gửi đến bạn.');
  };

  return (
    <section className="w-full bg-[#F6F8F5] rounded-[4px] p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between shadow-sm mt-2 mb-6 border border-[#E3E8E1] gap-4">
      <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
        <div className="w-12 h-12 rounded-[4px] bg-[#DAFF01] flex items-center justify-center text-[#111111] shrink-0 shadow-sm">
          <span className="material-symbols-outlined text-[26px]">mark_email_read</span>
        </div>
        <div>
          <h3 className="font-title-lg text-sm sm:text-base text-[#111111] font-bold">
            Nhận Voucher 50.000đ Cho Đơn Hàng Đầu Tiên
          </h3>
          <p className="font-body-sm text-xs text-[#555E57]">
            Đăng ký thành viên Satra Rewards để tích điểm 2% và nhận thông báo thịt tươi mỗi sáng.
          </p>
        </div>
      </div>

      <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 w-full md:w-96">
        <input
          className="flex-1 h-11 px-3 sm:px-4 rounded-[4px] bg-white border border-[#E3E8E1] font-body-md text-xs text-[#111111] placeholder:text-[#555E57] focus:outline-none focus:ring-2 focus:ring-[#01B341]"
          placeholder="Nhập số điện thoại hoặc email..."
          type="text"
          value={newsletterInput}
          onChange={(e) => setNewsletterInput(e.target.value)}
          disabled={newsletterSubscribed}
          aria-label="Số điện thoại hoặc email nhận ưu đãi"
        />
        <button
          className="h-11 px-4 sm:px-5 bg-[#01B341] text-white font-label-md text-xs font-bold rounded-[4px] hover:bg-[#006e24] transition-colors whitespace-nowrap cursor-pointer shadow-sm border-0"
          type="submit"
        >
          {newsletterSubscribed ? 'Đã Nhận Mã' : 'Đăng Ký'}
        </button>
      </form>
    </section>
  );
};
