import React from 'react';

export interface CommitmentItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export const COMMITMENT_ITEMS: CommitmentItem[] = [
  {
    id: 'c1',
    title: 'Giao nhanh 2 Giờ',
    subtitle: 'Nhanh chóng & trọn vị tươi sống',
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#01B341]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 14" />
      </svg>
    ),
  },
  {
    id: 'c2',
    title: 'Chuẩn VietGAP & OCOP',
    subtitle: '100% truy xuất nguồn gốc an toàn',
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#01B341]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: 'c3',
    title: 'Giá Luôn Bình Ổn',
    subtitle: 'Đồng hành trợ giá cho mọi gia đình',
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#01B341]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
  {
    id: 'c4',
    title: '180+ Cửa Hàng Phủ Rộng',
    subtitle: 'Phục vụ khắp TP.HCM & Cần Thơ',
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#01B341]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
        <path d="M8 15c1 1.5 3 2 4 2s3-.5 4-2" />
      </svg>
    ),
  },
];

export const CommitmentBanner: React.FC = () => {
  return (
    <div className="w-full mb-3.5 sm:mb-5">
      {/* 2x2 Grid (Mobile) / 4-column (Desktop) matching reference design exactly */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3.5">
        {COMMITMENT_ITEMS.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#E3E8E1] rounded-[6px] sm:rounded-[8px] p-2.5 sm:p-4 flex items-center gap-2.5 sm:gap-3.5 shadow-2xs hover:border-[#01B341] transition-colors"
          >
            {/* Squircle Icon Box */}
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-[10px] sm:rounded-[14px] bg-[#F6F8F5] flex items-center justify-center shrink-0">
              {item.icon}
            </div>

            {/* Content Text Stack */}
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-[11.5px] sm:text-[14px] lg:text-[15px] text-[#111111] leading-tight truncate">
                {item.title}
              </span>
              <span className="text-[9.5px] sm:text-xs text-[#555E57] leading-tight mt-0.5 sm:mt-1 truncate">
                {item.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
