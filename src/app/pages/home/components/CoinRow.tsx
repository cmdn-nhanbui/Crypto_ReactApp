import { Link } from 'react-router-dom';

import { LineChart } from '@/shared/components/LineChart';
import { StarFilled, StarOutlined } from '@ant-design/icons';

import type { FavoriteCoin } from '@/core/constants/types';
import { formatUSPrice } from '@/core/helpers/coin.helper';
import { DeltaBadge } from '@/shared/components/DeltaBadge';
import { useStorage } from '@/shared/hooks/useStorage';
import { memo, useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';

export type CoinProps = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  percentOneHourChange: number;
  percentDayChange: number;
  percentWeekChange: number;
  percentMonthChange: number;
  volume: number;
  sparkline: number[];
  thumbnail: string;
  marketCap: number;
  fullyDilutedValuation: number;
};

export const CoinRow = memo(({ index, data }: { index: number; data: CoinProps }) => {
  const ratioMarketCap = data?.marketCap / data?.fullyDilutedValuation;
  const isIncreaseInWeek = data?.percentWeekChange > 0;

  const { favoriteCoins, setFavoriteCoins } = useStorage();
  const [isLiked, setIsLiked] = useState<boolean>(favoriteCoins?.some((item) => item?.id === data?.id));
  const debouncedIsLiked = useDebounce(isLiked, 1000);

  const priceRefElemet = useRef<HTMLTableCellElement>(null);
  const prevPriceRef = useRef<number>(data?.price);

  useEffect(() => {
    const isExistedInStorage = favoriteCoins?.some((item) => item?.id === data?.id);

    if (debouncedIsLiked !== isExistedInStorage) {
      setFavoriteCoins((prev) => {
        let newState = [...prev];
        if (debouncedIsLiked) {
          // Add to favorites
          const newFavoriteCoin: FavoriteCoin = {
            id: data?.id,
            name: data?.name,
            thumbnail: data?.thumbnail,
            changePercentage1h: data?.percentOneHourChange,
            changePercentage7d: data?.percentWeekChange,
            changePercentage24h: data?.percentDayChange,
            changePercentage30d: data?.percentMonthChange,
            price: data?.price,
            volume: data?.volume,
            marketCap: data?.marketCap,
          };
          newState.push(newFavoriteCoin);
        } else {
          // Remove from favorites
          newState = newState?.filter((item) => item?.id !== data?.id);
        }
        return newState;
      });
    }
  }, [debouncedIsLiked]);

  useEffect(() => {
    const prevPrice = prevPriceRef.current;

    if (priceRefElemet.current) {
      if (data?.price > prevPrice) {
        priceRefElemet.current.classList.add('text-green-500');
      } else if (data?.price < prevPrice) {
        priceRefElemet.current.classList.add('text-red-500');
      }
    }

    prevPriceRef.current = data?.price;

    if (data?.price !== prevPrice) {
      const timeout = setTimeout(() => {
        if (priceRefElemet.current) {
          priceRefElemet.current.classList.remove(...['text-green-500', 'text-red-500']);
        }
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [data?.price]);

  return (
    <tr className='hover:bg-[var(--background-secondary)] bg-[var(--background)] text-sm text-[var(--text-primary)]'>
      <td className='left-0 px-1 py-2.5 bg-inheritw-10 text-center'>
        <button onClick={() => setIsLiked(!isLiked)} className='cursor-pointer'>
          {isLiked ? (
            <StarFilled style={{ color: '#eab308', fontSize: 18 }} />
          ) : (
            <StarOutlined style={{ color: '#eab308', fontSize: 18 }} />
          )}
        </button>
      </td>
      <td className='min-w-10 text-center  px-1 py-2.5 bg-inherit '>{index}</td>
      <td className='w-[150px] px-1 py-2.5 bg-inherit'>
        <Link className='flex items-center w-full' to={`/coin/${data?.id}`}>
          <img className='mr-2 !h-6 w-6 object-fill' src={data?.thumbnail} alt={data?.symbol} />
          <div className='flex flex-col 2lg:flex-row items-start'>
            <div className='font-semibold text-sm leading-5 max-w-[100px] truncate'>
              {data?.name}
              <div className='block 2lg:inline text-xs leading-4 text-gray-500 font-medium'>{data?.symbol}</div>
            </div>
          </div>
        </Link>
      </td>

      <td ref={priceRefElemet} className={`text-center px-1 py-2.5 hover:bg-[var(--background-secondary)]`}>
        ${formatUSPrice(data?.price)}
      </td>
      <td className='text-center px-1 py-2.5 bg-inherit'>
        <DeltaBadge value={data?.percentOneHourChange} />
      </td>
      <td className='text-center px-1 py-2.5 bg-inherit'>
        <DeltaBadge value={data?.percentDayChange} />
      </td>
      <td className='text-center px-1 py-2.5 bg-inherit'>
        <DeltaBadge value={data?.percentWeekChange} />
      </td>
      <td className='text-center d30 px-1 py-2.5 bg-inherit'>
        <DeltaBadge value={data?.percentMonthChange} />
      </td>
      <td className='text-center px-1 py-2.5 bg-inherit'>${formatUSPrice(data?.volume)}</td>
      <td className='text-center px-1 py-2.5 bg-inherit'>${formatUSPrice(data?.marketCap)}</td>
      <td className='text-center ratio px-1 py-2.5 bg-inherit'>{ratioMarketCap.toFixed(1)}</td>
      <td className='text-center box-content h-[56px] px-1 py-2.5 bg-inherit'>
        <div className='w-[135px] max-h-[50px]'>
          <LineChart chartData={data?.sparkline} isIncrease={isIncreaseInWeek} />
        </div>
      </td>
    </tr>
  );
});
