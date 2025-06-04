import type { ReactNode } from 'react';

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
};

export interface Toast {
  id: string;
  message: string;
  duration?: number;
  type?: (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES];
}

export interface ToastContainerProps {
  toasts: Toast[];
}

export type ShowToastOptions = Omit<Toast, 'id'>;

export type ToastContextType = {
  showToast: ({ type, message, duration }: ShowToastOptions) => void;
};

export interface ErrorProps {
  status: number;
  title: string;
  description: string;
  navigateTo?: string | false;
  navigateTitle?: string;
}

export interface CoinDetailData {
  id: string;
  symbol: string;
  name: string;
  thumbnail: string;
  currentPrice: number;
  currentPriceBTC: number;
  currentPriceETH: number;
  change24hUSD: number;
  change24hBTC: number;
  change24hETH: number;
  marketCap: number;
  fullyDilutedValuation: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  changePercentage1h: number;
  changePercentage24h: number;
  changePercentage7d: number;
  changePercentage14d: number;
  changePercentage30d: number;
  changePercentage1y: number;
  volume: number;
}

export type CoinHistory = { timeStamps: number[]; prices: number[] };

export type TimeRangeType = '1h' | '24h' | '7d';

export type FavoriteCoin = {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
  changePercentage1h: number;
  changePercentage24h: number;
  changePercentage7d: number;
  changePercentage30d: number;
  volume: number;
  marketCap: number;
};

export type ChartProps = {
  coinData?: CoinDetailData;
};

export const TIME_MODES = [
  {
    name: '1h',
    id: '1h',
  },
  {
    name: '24h',
    id: '24h',
  },
  {
    name: '7d',
    id: '7d',
  },
];

export type TimeManagementProps = {
  value: (typeof TIME_MODES)[number]['id'];
  onChange?: (id: string) => void;
};

type Variant = 'TEXT' | 'OUTLINED' | 'CONTAINED';
type Color = 'PRIMARY' | 'SECONDARY' | 'YELLOW' | 'WARNING' | 'TRANSPARENT';

export type ButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: Variant;
  color?: Color;
  disable?: boolean;
};

export type DeltaBadgeProps = {
  value: number;
  className?: string;
};

export type LineChartProps = {
  chartData: number[];
  isIncrease: boolean;
};

export type MarketCardProps = {
  value: number;
  percentageChange: number;
  chartData: number[];
};

export type SkeletonProps = {
  width?: string;
  height?: string;
  rounded?: boolean;
  className?: string;
};

export type SearchItemProps = Pick<CoinDetailData, 'id' | 'name' | 'symbol' | 'thumbnail'>;

export type UseCoinsDataParams = {
  page: number;
  perPage: number;
  sortBy?: string;
};

export type FormatHistoryResult = {
  timeStamps: number[];
  prices: number[];
};
