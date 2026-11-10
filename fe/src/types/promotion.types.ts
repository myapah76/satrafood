export type PromoTagType = 'discount' | 'same_price' | 'combo' | 'new';

export interface PromoDeal {
  id: string;
  tag: string;
  tagType: PromoTagType;
  category: string;
  title: string;
  spec: string;
  price: number;
  originalPrice: number;
  image: string;
  targetProductId?: string;
}

export interface CampaignBanner {
  title: string;
  subtitle: string;
  countdownHours: string;
  bannerUrl: string;
}

export interface Voucher {
  code: string;
  discountAmount: number;
  minOrderAmount: number;
  title: string;
  description: string;
}
