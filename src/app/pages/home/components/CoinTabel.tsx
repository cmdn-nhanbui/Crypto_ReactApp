import { useState, useEffect } from 'react';

import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { mapApiCoinToComponent } from '@/core/mappers/coin.mapper';

import Pagination from '@/shared/components/Pagination';

import { type CoinProps, CoinRow } from './CoinRow';
import { getCoinsData } from '@/core/services/coin.service';
import { TableBodySkeleton } from './TableSkeleton';
import { PerPageSelector } from '@/shared/components/PerPageSelector';

export type SortKey = (typeof tabelFields)[number]['id'];

export const tabelFields = [
  {
    name: 'Coin',
    id: 'coin_name',
  },
  {
    name: 'Price',
    id: 'volume',
  },
  {
    name: '1h',
    id: '1h_volume_change',
  },
  {
    name: '24h',
    id: '24h_change',
  },
  {
    name: '7d',
    id: '7d_volume_change',
  },
  {
    name: '30d',
  },
  {
    name: '24h Volume',
    id: '24h_volume',
  },
  {
    name: 'Market Cap',
    id: 'market_cap',
  },
  {
    name: 'Market Cap/FDV',
  },
  {
    name: 'Last 7 Days',
  },
];

export type SortConfig = {
  key: SortKey;
  direction: 'asc' | 'desc';
};

const TOTAL_RECORD = 17241;

export const CoinTabel = () => {
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(50);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [coins, setCoins] = useState<CoinProps[]>([]);

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

  const fetchData = () => {
    setIsLoading(true);
    getCoinsData({ page, perPage, sortBy: `${sortConfig.key}_${sortConfig.direction}` })
      .then((res) => {
        const data = res?.map(mapApiCoinToComponent);
        setCoins(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
    // const data = mapApiCoinToComponent(exampleData);
    // setCoins([data]);
  }, [page, perPage, sortConfig]);

  const getArrow = (key: SortKey) => {
    if (sortConfig.key !== key) return <CaretDownOutlined />;
    return sortConfig.direction === 'asc' ? <CaretUpOutlined /> : <CaretDownOutlined />;
  };

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
              {tabelFields?.map((field, index) => (
                <th
                  key={index}
                  className='cursor-pointer px-6 py-3 text-left text-sm font-medium'
                  onClick={() => handleSort(field.id)}
                >
                  {field.name} {field?.id && getArrow(field?.id)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {isLoading ? (
              <TableBodySkeleton />
            ) : (
              coins?.map((item, index) => <CoinRow key={index} index={index + 1} data={item} />)
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
