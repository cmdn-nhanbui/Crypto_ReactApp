import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { RightOutlined } from '@ant-design/icons';
import { Skeleton } from './Skeleton';

type Props = {
  children: ReactNode;
  title: string;
  viewMore: string;
  isLoading: boolean;
};

export const Card = ({ children, title, viewMore, isLoading }: Props) => {
  return (
    <div className='py-1.5 px-2 shadow-xs rounded-xl bg-[var(--background)] border border-[var(--border-primary)]'>
      <div className='flex justify-between pt-2.5 mb-2.5 px-2 truncate'>
        <div className='text-[var(--text-primary)] font-semibold text-base leading-6'>{title}</div>
        <div className='flex items-center space-x-1 cursor-pointer'>
          <Link
            to={viewMore}
            className='flex items-center space-x-1 cursor-pointer font-semibold no-underline text-[var(--text-primary)] text-xs hover:text-[var(--green-primary)]'
          >
            <span>View more</span>
            <RightOutlined />
          </Link>
        </div>
      </div>
      {isLoading ? (
        <div className='flex flex-col gap-3'>
          <Skeleton height='h-7' />
          <Skeleton height='h-7' />
          <Skeleton height='h-7' />
        </div>
      ) : (
        children
      )}
    </div>
  );
};
