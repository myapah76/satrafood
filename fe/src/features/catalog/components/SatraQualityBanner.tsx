import React from 'react';

export const SatraQualityBanner: React.FC = () => {
  return (
    <div className="w-full mb-4 sm:mb-5">
      <div className="w-full rounded-[4px] text-white p-3.5 sm:p-4.5 shadow-sm border border-[#01B341]/20 flex flex-col md:flex-row items-center justify-between gap-3.5 sm:gap-4 bg-[#01B341]">
        <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[4px] bg-[#DAFF01] text-[#111111] flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[26px] sm:text-[28px]">verified</span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded-[4px] bg-[#DAFF01] text-[#111111] font-label-sm text-[11px] font-black uppercase tracking-wider">
                Cam kết Satra
              </span>
              <h2 className="font-label-lg text-white font-bold text-xs sm:text-sm md:text-base m-0">
                100% Thịt mát, Rau quả VietGAP tươi mới mỗi ngày
              </h2>
            </div>
            <p className="text-white/90 font-body-sm text-[11px] sm:text-xs mt-0.5 leading-snug">
              Truy xuất nguồn gốc bằng mã QR. Đổi trả ngay trong 24h nếu sản phẩm không đảm bảo chất lượng.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 self-start md:self-auto">
          <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-xs px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-[4px] border border-white/20 text-white text-xs font-semibold">
            <span className="material-symbols-outlined text-[#DAFF01] text-[18px]">verified_user</span>
            <span>Chuẩn chuỗi TP.HCM</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-xs px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-[4px] border border-white/20 text-white text-xs font-semibold">
            <span className="material-symbols-outlined text-[#DAFF01] text-[18px]">bolt</span>
            <span>GIAO NHANH 2h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

