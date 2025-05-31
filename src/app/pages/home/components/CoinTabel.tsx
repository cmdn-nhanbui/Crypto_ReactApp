import { useState, useEffect } from 'react';

import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

import { mapApiCoinToComponent } from '@/core/mappers/coin.mapper';
import { MenuItem } from '@/shared/components/Menu/MenuItem';
import { MenuWrapper } from '@/shared/components/Menu/MenuWrapper';
import Pagination from '@/shared/components/Pagination';

// import { exampleData } from '../data/coin.data';
import { type CoinProps, CoinRow } from './CoinRow';
import { useTheme } from '@/shared/hooks/useTheme';
import { getCoinsData } from '@/core/services/coin.service';

type SortKey =
  | 'title'
  | 'price'
  | 'change1h'
  | 'change24h'
  | 'change7d'
  | 'change30d'
  | 'volume24h'
  | 'marketCap'
  | 'marketCapFdvRatio';

type SortConfig = {
  key: SortKey;
  direction: 'asc' | 'desc';
};

export const CoinTabel = () => {
  const { theme } = useTheme();
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(50);

  const [coins, setCoins] = useState<CoinProps[]>([]);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'marketCap',
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
    getCoinsData({ page, perPage })
      .then((res) => {
        const data = res?.map(mapApiCoinToComponent);
        setCoins(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
    // const data = mapApiCoinToComponent(exampleData);
    // setCoins([data]);
  }, [page, perPage]);

  const getArrow = (key: SortKey) => {
    if (sortConfig.key !== key) return <CaretDownOutlined />;
    return sortConfig.direction === 'asc' ? <CaretUpOutlined /> : <CaretDownOutlined />;
  };

  return (
    <div>
      <table className='min-w-full table-auto'>
        <thead className='bg-[var(--background-secondary)] text-[var(--text-primary)]'>
          <tr>
            <th></th>
            <th>#</th>
            <th className='cursor-pointer px-6 py-3 text-left text-sm font-medium' onClick={() => handleSort('title')}>
              Coin {getArrow('title')}
            </th>
            <th className='cursor-pointer px-6 py-3 text-left text-sm font-medium' onClick={() => handleSort('price')}>
              Price {getArrow('price')}
            </th>
            <th
              className='cursor-pointer px-6 py-3 text-left text-sm font-medium'
              onClick={() => handleSort('change1h')}
            >
              1h {getArrow('change1h')}
            </th>
            <th
              className='cursor-pointer px-6 py-3 text-left text-sm font-medium'
              onClick={() => handleSort('change24h')}
            >
              24h {getArrow('change24h')}
            </th>
            <th
              className='cursor-pointer px-6 py-3 text-left text-sm font-medium'
              onClick={() => handleSort('change7d')}
            >
              7d {getArrow('change7d')}
            </th>
            <th
              className='cursor-pointer px-6 py-3 text-left text-sm font-medium'
              onClick={() => handleSort('change30d')}
            >
              30d {getArrow('change30d')}
            </th>
            <th
              className='cursor-pointer px-6 py-3 text-left text-sm font-medium'
              onClick={() => handleSort('volume24h')}
            >
              24h Volume {getArrow('volume24h')}
            </th>
            <th
              className='cursor-pointer px-6 py-3 text-left text-sm font-medium'
              onClick={() => handleSort('marketCap')}
            >
              Market Cap {getArrow('marketCap')}
            </th>
            <th
              className='cursor-pointer px-6 py-3 text-left text-sm font-medium'
              onClick={() => handleSort('marketCapFdvRatio')}
            >
              Market Cap / FDV {getArrow('marketCapFdvRatio')}
            </th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {coins?.map((item, index) => (
            <CoinRow key={index} index={index + 1} data={item} />
          ))}
        </tbody>
      </table>

      <div className='flex items-center sm:justify-between justify-center my-4'>
        <div></div>
        <Pagination currentPage={page} totalPages={20} onPageChange={handleChangePage} />

        <Popover className='sm:block hidden'>
          <span className='text-xs text-[var(--text-secondary)] mr-2'>Row</span>
          <PopoverButton
            style={{
              outline: 'none',
            }}
          >
            <div className='flex items-center'>
              <div className='min-w-20 text-[var(--text-primary)] py-1.5 px-2.5 rounded-lg font-semibold bg-[var(--background-secondary)] cursor-pointer'>
                <span className='mr-2'>{perPage}</span>
                <CaretDownOutlined />
              </div>
            </div>
          </PopoverButton>
          <PopoverPanel transition anchor='bottom end'>
            <div className={theme}>
              <MenuWrapper>
                {[50, 100, 300].map((item) => (
                  <MenuItem onClick={() => handleChangePerPage(item)} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </MenuWrapper>
            </div>
          </PopoverPanel>
        </Popover>
      </div>
    </div>
  );
};
