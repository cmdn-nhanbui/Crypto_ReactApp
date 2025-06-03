import { Link } from 'react-router-dom';
import type { SearchItemProps } from '@/core/constants/types';

export const SearchItem = ({ id, name, thumbnail, symbol }: SearchItemProps) => {
  return (
    <li className='search-result-item'>
      <Link to={`/coin/${id}`} className='flex justify-between px-2 py-3 rounded-lg hover:bg-[var(--background-hover)]'>
        <div className='flex items-center'>
          <img src={thumbnail} alt={name} className='w-6 mr-2' loading='lazy' />
          <div className='text-[var(--text-primary)] sm:text-sm text-xs font-semibold hover:text-[var(--text-primary)] mr-1'>
            {name}
          </div>
          <div className='text-xs leading-4 text-[var(--text-secondary)]  font-regular flex-grow mt-0.5'>{symbol}</div>
        </div>
      </Link>
    </li>
  );
};
