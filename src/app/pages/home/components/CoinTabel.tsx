import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

import { PerPageSelector } from '@/shared/components/PerPageSelector';
import Pagination from '@/shared/components/Pagination';
import { TableBodySkeleton } from './TableSkeleton';
import { CoinRow } from './CoinRow';

import { useRealTimeCoinData } from '@/core/services/coin.service';

import { ROUTES } from '@/core/constants/routes';
import { COIN_TABLE_FIELDS } from '@/core/constants/fields';

export type SortKey = (typeof COIN_TABLE_FIELDS)[number]['ID'];

export type SortConfig = {
  key: SortKey;
  direction: 'asc' | 'desc';
};

const TOTAL_RECORD = 17241;

export const CoinTabel = () => {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(50);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'price',
    direction: 'desc',
  });

  const handleSort = (key: SortKey) => {
    setSortConfig((prev) =>
      prev.key === key ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' } : { key, direction: 'asc' },
    );
  };

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const handleChangePerPage = (limit: number) => {
    setPerPage(limit);
  };

  const { data, isLoading, error, refetch } = useRealTimeCoinData({
    page,
    perPage,
    sortBy: `${sortConfig.key}_${sortConfig.direction}`,
  });

  if (error) return <Navigate to={ROUTES.SERVER_ERROR} />;

  const getArrow = (key: SortKey) => {
    if (sortConfig.key !== key) return <CaretDownOutlined />;
    return sortConfig.direction === 'asc' ? <CaretUpOutlined /> : <CaretDownOutlined />;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, perPage]);

  useEffect(() => {
    const itervalId = setInterval(() => {
      refetch();
    }, 3000);
    return () => {
      clearInterval(itervalId);
    };
  }, []);

  return (
    <>
      <div className='sm:hidden my-2 justify-end flex'>
        <PerPageSelector perPage={perPage} onChange={handleChangePerPage} options={[50, 100, 300]} />
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-[var(--background-secondary)] text-[var(--text-primary)]'>
            <tr>
              <th></th>
              <th>#</th>
              {COIN_TABLE_FIELDS?.map((field, index) => (
                <th
                  key={index}
                  className='cursor-pointer px-6 py-3 text-left text-sm font-medium'
                  onClick={() => handleSort(field.ID)}
                >
                  {field.NAME} {field?.ID && getArrow(field?.ID)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {isLoading ? (
              <TableBodySkeleton />
            ) : (
              data?.map((item, index) => <CoinRow key={index} index={index + 1} data={item} />)
            )}
          </tbody>
        </table>
      </div>

      <div className='flex items-center sm:justify-between justify-center my-4'>
        <div></div>
        <Pagination
          currentPage={page}
          totalPages={Math.floor(TOTAL_RECORD / perPage)}
          onPageChange={handleChangePage}
        />
        <div className='sm:block hidden'>
          <PerPageSelector perPage={perPage} onChange={handleChangePerPage} options={[50, 100, 300]} />
        </div>
      </div>
    </>
  );
};
