import request from './api.service';

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

export const getCoinById = async (id: string) => {
  const response = await request.get(`/coins/${id}`);
  return response?.data;
};

export const getCoinHistory = async (id: string) => {
  const response = await request.get(`/v3/coins/${id}/market_chart?vs_currency=usd&days=7`);
  return response?.data;
};
