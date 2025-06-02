import type { FavoriteCoin } from '../constants/types';

const sortKeyMap: Record<string, keyof FavoriteCoin> = {
  coin_name: 'name',
  volume: 'price', // Có thể bạn đặt nhầm, cần xác nhận
  '1h_volume_change': 'changePercentage1h',
  '24h_change': 'changePercentage24h',
  '7d_volume_change': 'changePercentage7d',
  '30d': 'changePercentage30d',
  '24h_volume': 'volume',
  market_cap: 'marketCap',
};

export const sortFavoriteCoins = (
  sortKey: string,
  direction: 'asc' | 'desc',
  coins: FavoriteCoin[],
): FavoriteCoin[] => {
  const actualKey = sortKeyMap[sortKey];

  if (!actualKey) return coins;

  return [...coins].sort((a, b) => {
    const valueA = a[actualKey];
    const valueB = b[actualKey];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return direction === 'asc' ? valueA - valueB : valueB - valueA;
    }

    return 0;
  });
};
