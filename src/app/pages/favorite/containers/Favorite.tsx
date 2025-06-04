import { useEffect, useState } from 'react';
import { CaretDownOutlined, CaretUpOutlined, StarFilled } from '@ant-design/icons';

import { type SortConfig, type SortKey } from '@/pages/home/components/CoinTabel';
import { PerPageSelector } from '@/shared/components/PerPageSelector';
import Pagination from '@/shared/components/Pagination';
import { FavoriteItem } from '../components/FavoriteItem';

import { useStorage } from '@/shared/hooks/useStorage';
import { type FavoriteCoin } from '@/core/constants/types';
import { sortFavoriteCoins } from '@/core/helpers/favoriteCoin.helper';
import { getPaginationData } from '@/core/helpers/pagination.helper';
import { FAVORITE_TABEL_FIELDS } from '@/core/constants/fields';

const Favorite = () => {
  const { favoriteCoins } = useStorage();
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const totalPage = Math.ceil(favoriteCoins?.length / perPage);

  const getArrow = (key: SortKey) => {
    if (sortConfig.key !== key) return <CaretDownOutlined />;
    return sortConfig.direction === 'asc' ? <CaretUpOutlined /> : <CaretDownOutlined />;
  };

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'price',
    direction: 'desc',
  });

  //TODO Change sort mode
  const handleSort = (key: SortKey) => {
    setSortConfig((prev) =>
      prev.key === key ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' } : { key, direction: 'asc' },
    );
  };

  const handleChangePage = (pageChange: number) => setPage(pageChange);
  const handleChangePerPage = (perPage: number) => {
    setPerPage(perPage);
    const start = (page - 1) * perPage;

    if (start >= favoriteCoins.length || page < 1) {
      setPage(1);
    }
  };

  //TODO Pagination for coins
  let paginationCoins = sortFavoriteCoins(String(sortConfig.key), sortConfig.direction, favoriteCoins);
  // Sorting coins
  paginationCoins = getPaginationData<FavoriteCoin>(page, perPage, paginationCoins);

  //TODO Scroll to top in first time
  useEffect(() => {
    document.title = 'Favorite';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='container min-h-[calc(100vh-120px)]'>
      <div className='my-4 flex text-[var(--yellow-primay)] items-center'>
        <StarFilled
          style={{
            fontSize: 20,
            color: '#eab308',
          }}
        />
        <h3 className='sm:text-2xl text:base font-semibold text-[var(--text-primary)] ml-2'>My Favorite Coins</h3>
        <span className='ml-2 bg-[var(--background-secondary)] text-xs rounded-lg flex py-1 px-2 h-fit text-[var(--text-secondary)]'>
          Default
        </span>
      </div>

      <div className='sm:hidden flex justify-end my-2'>
        <PerPageSelector perPage={perPage} onChange={handleChangePerPage} options={[20, 40, 60]} />
      </div>

      <div className='mt overflow-x-auto'>
        <table className='min-w-full table-auto'>
          <thead className='bg-[var(--background-secondary)] text-[var(--text-primary)]'>
            <tr>
              <th></th>
              <th className='px-1 py-3 text-sm font-medium text-center'>#</th>
              {FAVORITE_TABEL_FIELDS?.map((field, index) => (
                <th
                  key={index}
                  className='cursor-pointer px-1 py-3 text-center text-sm font-medium'
                  onClick={() => handleSort(field.ID)}
                >
                  {field.NAME} {field?.ID && getArrow(field?.ID)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {paginationCoins?.map((item, index) => (
              <FavoriteItem key={index} data={item} index={index + 1} />
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex sm:justify-between justify-center my-3'>
        <div></div>
        <Pagination totalPages={totalPage} currentPage={page} onPageChange={handleChangePage} />
        <div className='sm:block hidden'>
          <PerPageSelector perPage={perPage} onChange={handleChangePerPage} options={[10, 20, 40]} />
        </div>
      </div>
    </div>
  );
};

export default Favorite;
