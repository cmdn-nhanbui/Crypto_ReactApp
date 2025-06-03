import { useQuery } from '@tanstack/react-query';
import request from './api.service';

import type { CoinProps } from '@/pages/home/components/CoinRow';
import type { CoinDetailData, CoinHistory } from '../constants/types';
import { mapApiCoinToComponent, mapCoinDetailData } from '../mappers/coin.mapper';

export const getCoinsData = async ({
  page,
  perPage,
  sortBy = 'market_cap_desc',
}: {
  page: number;
  perPage: number;
  sortBy?: string;
}) => {
  const response = await request.get(
    `/coins/markets?vs_currency=usd&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h,24h,7d,30d`,
  );
  return response?.data;
};

export const useCoinId = (id?: string) => {
  return useQuery<CoinDetailData, Error>({
    queryKey: ['coin_by_id', id],
    queryFn: async () => {
      const response = await request.get(`/coins/${id}`);
      return mapCoinDetailData(response.data);
    },
    enabled: !!id,
    retry: false,
    staleTime: 1 * 60 * 1000,
    gcTime: 1 * 60 * 1000,
  });
};

export const getCoinHistory = async (id: string, days: number = 7) => {
  const response = await request.get(`/coins/${id}/market_chart?vs_currency=usd&days=${days}`);
  return response?.data;
};

export const useCoinHistory = (id: string, days: number = 7) => {
  return useQuery({
    queryKey: ['coin_history', id, days],
    queryFn: async () => {
      const response = await request.get(`/coins/${id}/market_chart`, {
        params: { vs_currency: 'usd', days: days },
      });
      const data: CoinHistory = response?.data;
      return data;
    },
  });
};

export const useSearchCoin = (query: string) => {
  return useQuery({
    queryKey: ['search_coin', query],
    queryFn: async () => {
      const response = await request.get('/search', {
        params: { query },
      });
      return response.data;
    },
    enabled: !!query.trim(),
  });
};

export const useRealTimeCoinData = ({
  page,
  perPage,
  sortBy = 'market_cap_desc',
}: {
  page: number;
  perPage: number;
  sortBy?: string;
}) => {
  return useQuery({
    queryKey: ['coins_realtime', page, perPage, sortBy],
    queryFn: async () => {
      const res = await request.get(`http://localhost:3001/coins?page=${page}&per_page=${perPage}&sort=${sortBy}`);
      const data = res?.data?.data;
      const coins: CoinProps[] = data?.map(mapApiCoinToComponent);
      return coins;
    },
  });
};
