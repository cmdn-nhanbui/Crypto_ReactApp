import type { CoinProps } from '@/pages/home/components/CoinRow';
import type { CoinDetailData } from '../constants/types';

export const mapApiCoinToComponent = (coinData: any): CoinProps => {
  return {
    id: coinData?.id,
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

export const mapCoinDetailData = (responseData: any): CoinDetailData => {
  const marketData = responseData?.market_data;

  return {
    id: responseData?.id,
    symbol: responseData?.symbol,
    name: responseData?.name,
    thumbnail: responseData?.image?.thumb,

    // Giá hiện tại
    currentPrice: marketData?.current_price?.usd,
    currentPriceBTC: marketData?.current_price?.btc,
    currentPriceETH: marketData?.current_price?.eth,

    // Thay đổi % trong 24h
    change24hUSD: marketData?.price_change_percentage_24h_in_currency?.usd,
    change24hBTC: marketData?.price_change_percentage_24h_in_currency?.btc,
    change24hETH: marketData?.price_change_percentage_24h_in_currency?.eth,

    changePercentage1h: marketData?.price_change_percentage_1h_in_currency?.usd,
    changePercentage24h: marketData?.price_change_percentage_1h_in_currency?.usd,
    changePercentage7d: marketData?.price_change_percentage_7d_in_currency?.usd,
    changePercentage14d: marketData?.price_change_percentage_14d_in_currency?.usd,
    changePercentage30d: marketData?.price_change_percentage_30d_in_currency?.usd,
    changePercentage1y: marketData?.price_change_percentage_1y_in_currency?.usd,
    volume: marketData?.total_volume?.usd,

    // Market Cap & Supply
    marketCap: marketData?.market_cap?.usd,
    fullyDilutedValuation: marketData?.fully_diluted_valuation?.usd,
    circulatingSupply: marketData?.circulating_supply,
    totalSupply: marketData?.total_supply,
    maxSupply: marketData?.max_supply,
  };
};
