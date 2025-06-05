import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaretDownOutlined, CaretUpOutlined, StarFilled } from '@ant-design/icons';

import { type SortConfig, type SortKey } from '@/pages/home/components/CoinTabel';
import { PerPageSelector } from '@/shared/components/PerPageSelector';
import Pagination from '@/shared/components/Pagination';
import { FavoriteItem } from '../components/FavoriteItem';

import { SORT_DIRECTION, sortFavoriteCoins } from '@/core/helpers/favoriteCoin.helper';
import { useStorage } from '@/shared/hooks/useStorage';
import { type FavoriteCoin } from '@/core/constants/types';
import { getPaginationData } from '@/core/helpers/pagination.helper';
import { FAVORITE_TABEL_FIELDS } from '@/core/constants/fields';

const Favorite = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const { favoriteCoins } = useStorage();
  const page = Number(queryParams.get('page')) || 1;
  const [perPage, setPerPage] = useState<number>(10);
  const totalPage = Math.ceil(favoriteCoins?.length / perPage);

  const getArrow = (key: SortKey) => {
    if (sortConfig.key !== key) return <CaretDownOutlined />;
    return sortConfig.direction === SORT_DIRECTION.ASC ? <CaretUpOutlined /> : <CaretDownOutlined />;
  };

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'price',
    direction: SORT_DIRECTION.DESC,
  });

  //TODO Change sort mode
  const handleSort = (key: SortKey) => {
    setSortConfig((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === SORT_DIRECTION.ASC ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC }
        : { key, direction: SORT_DIRECTION.ASC },
    );
  };

  const handleChangePage = (pageNumber: number) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set('page', String(pageNumber)); // chỉ thay đổi param page
    navigate(`?${newParams.toString()}`);
  };

  const handleChangePerPage = (perPage: number) => {
    setPerPage(perPage);
    const start = (page - 1) * perPage;

    if (start >= favoriteCoins.length || page < 1) {
      handleChangePage(1);
    }
  };

  //TODO Pagination for coins
  let paginationCoins = sortFavoriteCoins(String(sortConfig.key), sortConfig.direction, favoriteCoins);
  // Sorting coins
  paginationCoins = getPaginationData<FavoriteCoin>(page, perPage, paginationCoins);

  const offset = (page - 1) * perPage;

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
              <FavoriteItem key={index} data={item} index={index + offset + 1} />
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
