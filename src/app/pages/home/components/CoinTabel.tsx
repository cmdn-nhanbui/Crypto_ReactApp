import { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

import { PerPageSelector } from '@/shared/components/PerPageSelector';
import Pagination from '@/shared/components/Pagination';
import { TableBodySkeleton } from './TableSkeleton';
import { CoinRow } from './CoinRow';

import { useRealTimeCoinData } from '@/shared/hooks/useCoins';

import { ROUTES } from '@/core/constants/routes';
import { COIN_TABLE_FIELDS } from '@/core/constants/fields';
import { SORT_DIRECTION, type SortDirection } from '@/core/helpers/favoriteCoin.helper';

export type SortKey = (typeof COIN_TABLE_FIELDS)[number]['ID'];

export type SortConfig = {
  key: SortKey;
  direction: SortDirection;
};

export const CoinTabel = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const topRef = useRef<HTMLDivElement | null>(null);

  const [perPage, setPerPage] = useState<number>(50);
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const page = Number(queryParams.get('page')) || 1;

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'price',
    direction: SORT_DIRECTION.ASC,
  });

  const handleSort = (key: SortKey) => {
    setSortConfig((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === SORT_DIRECTION.ASC ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC }
        : { key, direction: SORT_DIRECTION.ASC },
    );
  };

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChangePage = (pageNumber: number) => {
    scrollToTop();
    const newParams = new URLSearchParams(location.search);
    newParams.set('page', String(pageNumber)); // chỉ thay đổi param page
    navigate(`?${newParams.toString()}`);
  };

  const handleChangePerPage = (limit: number) => {
    setPerPage(limit);
    scrollToTop();
  };

  const { data, isLoading, error } = useRealTimeCoinData({
    page,
    perPage,
    sortBy: `${sortConfig.key}_${sortConfig.direction}`,
  });

  const getArrow = (key: SortKey) => {
    if (sortConfig.key !== key) return <CaretDownOutlined />;
    return sortConfig.direction === SORT_DIRECTION.ASC ? <CaretUpOutlined /> : <CaretDownOutlined />;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (data?.totalDocs) {
      setTotalRecord(data.totalDocs);
    }
  }, [data?.totalDocs]);

  if (error) return <Navigate to={ROUTES.SERVER_ERROR} />;

  return (
    <>
      <div className='sm:hidden my-2 justify-end flex'>
        <PerPageSelector perPage={perPage} onChange={handleChangePerPage} options={[50, 100, 300]} />
      </div>
      <div ref={topRef} className='overflow-x-auto'>
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
              data?.coins?.map((item, index) => <CoinRow key={index} index={index + 1} data={item} />)
            )}
          </tbody>
        </table>
      </div>

      <div className='flex items-center sm:justify-between justify-center my-4'>
        <div></div>
        <Pagination currentPage={page} totalPages={Math.ceil(totalRecord / perPage)} onPageChange={handleChangePage} />
        <div className='sm:block hidden'>
          <PerPageSelector perPage={perPage} onChange={handleChangePerPage} options={[50, 100, 300]} />
        </div>
      </div>
    </>
  );
};
