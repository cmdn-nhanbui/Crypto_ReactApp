import { useQuery } from '@tanstack/react-query';
import request from '../../core/services/api.service';

import type { CoinProps } from '@/pages/home/components/CoinRow';
import type { CoinDetailData, UseCoinsDataParams } from '../../core/constants/types';
import { mapApiCoinToComponent, mapCoinDetailData } from '../../core/mappers/coin.mapper';
import { QUERY_KEYS } from '../../core/constants/queryKeys';

const TOTAL_RECORD = 17241;

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

export const useCoinsData = ({ page, perPage, sortBy = 'market_cap_desc' }: UseCoinsDataParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_COIN_DATA, page, perPage, sortBy],
    queryFn: async () => {
      const response = await getCoinsData({ page, perPage, sortBy });
      const coins: CoinProps[] = response?.map(mapApiCoinToComponent);
      return { coins, totalDocs: TOTAL_RECORD };
    },
    staleTime: 1000 * 60,
  });
};

export const useCoinId = (id?: string) => {
  return useQuery<CoinDetailData, Error>({
    queryKey: [QUERY_KEYS.GET_COIN_BY_ID, id],
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

export const useCoinHistory = (id: string, days: number = 7) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_HISTORY_COIN, id, days],
    queryFn: async () => {
      const response = await request.get(`/coins/${id}/market_chart`, {
        params: { vs_currency: 'usd', days: days },
      });
      return response?.data;
    },
    staleTime: 3 * 60 * 1000,
    gcTime: 3 * 60 * 1000,
  });
};

export const useSearchCoin = (query: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_COIN, query],
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
    queryKey: [QUERY_KEYS.COIN_REAL_TIME, page, perPage, sortBy],
    queryFn: async () => {
      const res = await request.get(`http://localhost:3001/coins`, {
        params: {
          page: page,
          per_page: perPage,
          sort: sortBy,
        },
      });
      const totalDocs = res?.data?.totalDocs;
      const data = res?.data?.data;
      const coins: CoinProps[] = data?.map(mapApiCoinToComponent);
      return { coins, totalDocs };
    },
    refetchInterval: 3000,
  });
};
