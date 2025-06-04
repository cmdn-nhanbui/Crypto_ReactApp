import { Link } from 'react-router-dom';
import { DeltaBadge } from './DeltaBadge';

export type CoinItemProps = {
  id: string;
  thumbnail: string;
  title: string;
  currentPrice: number;
  percent: number;
};

export const CoinItem = ({ id, thumbnail, title, currentPrice, percent }: CoinItemProps) => {
  return (
    <Link to={`/coin/${id}`}>
      <div className='flex justify-between px-2 py-2.5 hover:bg-[var(--background-secondary)] rounded-lg'>
        <div className='flex items-center gap-x-2 max-w-[50%]'>
          <img alt={title} className='rounded-full' src={thumbnail} width='24' height='24' />
          <div className='block truncate text-gray-500 dark:text-moon-200'>
            <span className='text-[var(--text-primary)]  font-semibold text-sm leading-5'>{title}</span>
          </div>
        </div>
        <div className='flex justify-end items-center flex-shrink-0 max-w-[50%] break-words text-right'>
          <div className='max-w-full'>
            <span className='text-[var(--text-primary)] font-medium text-sm leading-5 flex gap-1'>
              <span>${currentPrice}</span>
              <DeltaBadge value={percent} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
