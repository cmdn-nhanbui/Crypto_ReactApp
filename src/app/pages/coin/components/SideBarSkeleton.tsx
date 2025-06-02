import { Skeleton } from '@/shared/components/Skeleton';

export const SideBarSkeleton = () => {
  return (
    <div className='flex flex-col gap-3'>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton className='h-[200px]' />
    </div>
  );
};
