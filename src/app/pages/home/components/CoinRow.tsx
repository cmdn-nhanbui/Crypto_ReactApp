import { DeltaBadge } from '@/shared/components/DeltaBadge';
import { LineChart } from '@/shared/components/LineChart';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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

export const CoinRow = ({ index, data }: { index: number; data: CoinProps }) => {
  const ratioMarketCap = data?.marketCap / data?.fullyDilutedValuation;
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const isIncreaseInWeek = data?.percentWeekChange > 0;

  const handleAddToFavorite = () => {
    setIsLiked(!isLiked);
  };

  return (
    <tr className='hover:bg-[var(--background-secondary)] bg-[var(--background)] text-sm text-[var(--text-primary)]'>
      <td className='left-0 px-1 py-2.5 bg-inheritw-10 text-center'>
        <button onClick={handleAddToFavorite} className='cursor-pointer'>
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
            <div className='font-semibold text-sm leading-5'>
              {data?.name}
              <div className='block 2lg:inline text-xs leading-4 text-gray-500 dark:text-moon-200 font-medium'>
                {data?.symbol}
              </div>
            </div>
          </div>
        </Link>
      </td>

      <td className='text-center px-1 py-2.5 bg-inherit'>${data?.price}</td>
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
      <td className='text-center px-1 py-2.5 bg-inherit'>${data?.volume}</td>
      <td className='text-center px-1 py-2.5 bg-inherit'>${data?.marketCap}</td>
      <td className='text-center ratio px-1 py-2.5 bg-inherit'>{ratioMarketCap.toFixed(2)}</td>
      <td className='text-center box-content h-[56px] px-1 py-2.5 bg-inherit'>
        <div className='w-[135px] max-h-[50px]'>
          <LineChart chartData={data?.sparkline} isIncrease={isIncreaseInWeek} />
        </div>
      </td>
    </tr>
  );
};
