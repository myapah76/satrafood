import React from 'react';

export const CommitmentBanner: React.FC = () => {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="w-full rounded-2xl text-white p-4 sm:p-5 shadow-sm border border-[#01B341]/20 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#01B341]">
        <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
          <div className="w-12 h-12 rounded-xl bg-[#DAFF01] text-[#111111] flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[28px]">verified</span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#DAFF01] text-[#111111] font-label-sm text-[11px] font-black uppercase">
                Cam kết Satra
              </span>
              <span className="font-label-lg text-white font-bold text-sm md:text-base">
                100% Thịt mát, Rau quả VietGAP tươi mới trong ngày
              </span>
            </div>
            <p className="text-white/90 font-body-sm text-xs mt-0.5">
              Truy xuất nguồn gốc bằng mã QR. Đổi trả ngay trong 24h nếu sản phẩm không đảm bảo chất lượng.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 self-start md:self-auto">
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg border border-white/15 text-white text-xs font-semibold">
            <span className="material-symbols-outlined text-[#DAFF01] text-[18px]">verified_user</span>
            Chuẩn chuỗi TP.HCM
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg border border-white/15 text-white text-xs font-semibold">
            <span className="material-symbols-outlined text-[#DAFF01] text-[18px]">bolt</span>
            Giao nhanh 2h
          </div>
        </div>
      </div>
    </div>
  );
};
