import React from 'react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

const DISTRICT_LIST = [
  'TP. Hồ Chí Minh',
  'Quận 1, TP.HCM',
  'Quận 3, TP.HCM',
  'Bình Thạnh, TP.HCM',
  'Phú Nhuận, TP.HCM',
  'TP. Thủ Đức, TP.HCM',
  'Gò Vấp, TP.HCM',
  'Quận 7, TP.HCM',
  'Quận 10, TP.HCM',
  'Tân Bình, TP.HCM',
  'Cần Thơ (Ninh Kiều)',
];

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  selectedCity,
  onSelectCity,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-[#E3E8E1] text-[#111111]">
        {/* Header */}
        <div className="bg-[#01B341] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[24px]">local_shipping</span>
            <div>
              <h3 className="font-bold text-base leading-tight">Chọn Khu Vực Giao Hàng Siêu Tốc 2H</h3>
              <p className="text-[11px] text-white/85">
                Hơn 180 cửa hàng Satrafoods sẵn sàng giao ngay
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer border-0"
            aria-label="Đóng"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-[#555E57]">
            Vui lòng chọn quận/huyện bạn đang sinh sống để kiểm tra tình trạng hàng tươi sống và thời gian giao hàng gần nhất:
          </p>

          <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
            {DISTRICT_LIST.map((loc) => {
              const isSelected = selectedCity === loc;
              return (
                <button
                  key={loc}
                  onClick={() => {
                    onSelectCity(loc);
                    onClose();
                  }}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-left border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#01B341] text-white border-[#01B341] shadow-sm'
                      : 'bg-[#F6F8F5] border-[#E3E8E1] text-[#111111] hover:border-[#01B341] hover:bg-white'
                  }`}
                >
                  <span>{loc}</span>
                  {isSelected && (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-[#DAFF01]/20 border border-[#DAFF01] rounded-xl flex items-center gap-2.5 text-xs text-[#111111]">
            <span className="material-symbols-outlined text-[#01B341] text-[20px]">bolt</span>
            <span>
              <strong>Cam kết 2 Giờ:</strong> Nhận hàng mát lạnh, tươi mới tận tay từ cửa hàng gần nhất.
            </span>
          </div>
        </div>

        <div className="p-4 bg-[#F6F8F5] border-t border-[#E3E8E1] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#01B341] text-white text-xs font-bold rounded-lg hover:bg-[#006e24] cursor-pointer"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};
