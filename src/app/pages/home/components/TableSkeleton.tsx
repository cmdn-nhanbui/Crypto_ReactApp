import { Skeleton } from '@/shared/components/Skeleton';
import { tabelFields } from './CoinTabel';

const ROWS_SKELETON = 5; // số hàng skeleton muốn hiển thị khi loading

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
          {tabelFields?.map((_, index) => (
            <td key={index} className='px-6 py-4'>
              <Skeleton width='w-full' height='h-4' rounded />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};
