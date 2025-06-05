import type { FormatHistoryResult } from '../constants/types';

export const formatTimeStamp = (timestamp: number) => {
  const date = new Date(timestamp);

  return {
    timestamp,
    iso: date.toISOString(),
    utcString: date.toUTCString(),
    localString: date.toLocaleString(),
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekday: date.getDay(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    milliseconds: date.getMilliseconds(),
    timezoneOffsetMinutes: date.getTimezoneOffset(), // phút lệch UTC
  };
};

export const formatUSPrice = (price: unknown): string => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '-';
  }

  return price.toLocaleString('en-US', {
    maximumFractionDigits: 2,
  });
};

export const formatHistoryChart = (
  priceHistory: [number, number][],
  timeRange: '1h' | '24h' | '7d',
): FormatHistoryResult => {
  if (timeRange === '1h') {
    priceHistory = priceHistory.slice(-12);
  }

  const timeStamps: number[] = [];
  const prices: number[] = [];

  priceHistory?.forEach(([timestamp, price]) => {
    timeStamps.push(timestamp);
    prices.push(price);
  });

  return { timeStamps, prices };
};

export const generateFakeChartData = (length: number = 500, startPrice: number = 100): number[] => {
  const data: number[] = [startPrice];

  for (let i = 1; i < length; i++) {
    const last = data[i - 1];
    // Tăng/giảm ngẫu nhiên trong khoảng -1 đến +1.5 (dao động nhẹ, có thể thiên hướng lên)
    const change = (Math.random() - 0.5) * 2; // khoảng [-1, +1]
    const next = parseFloat((last + change).toFixed(2));
    data.push(next);
  }
  return data;
};
