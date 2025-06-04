import { COIN_TABLE_FIELDS } from '@/core/constants/fields';
import { Skeleton } from '@/shared/components/Skeleton';

const ROWS_SKELETON = 5;

export const TableBodySkeleton = () => {
  return (
    <>
      {Array.from({ length: ROWS_SKELETON }).map((_, idx) => (
        <tr key={idx} className='animate-pulse'>
          <td className='px-6 py-4'>
            <Skeleton width='w-6' height='h-6' rounded />
          </td>
          <td className='px-6 py-4'>
            <Skeleton width='w-4' height='h-4' rounded />
          </td>
          {COIN_TABLE_FIELDS?.map((_, index) => (
            <td key={index} className='px-6 py-4'>
              <Skeleton width='w-full' height='h-4' rounded />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};
