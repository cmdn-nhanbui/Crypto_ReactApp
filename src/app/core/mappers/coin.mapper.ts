import type { CoinProps } from '@/pages/home/components/CoinRow';

export const mapApiCoinToComponent = (coinData: any): CoinProps => {
  return {
    name: coinData?.name,
    symbol: coinData?.symbol,
    price: coinData?.current_price,
    percentOneHourChange: coinData?.price_change_percentage_1h_in_currency,
    percentDayChange: coinData?.price_change_percentage_24h_in_currency,
    percentWeekChange: coinData?.price_change_percentage_7d_in_currency,
    percentMonthChange: coinData?.price_change_percentage_30d_in_currency,
    volume: coinData?.total_volume,
    sparkline: coinData?.sparkline_in_7d?.price,
    thumbnail: coinData?.image,
    marketCap: coinData?.market_cap,
    fullyDilutedValuation: coinData?.fully_diluted_valuation,
  };
};
