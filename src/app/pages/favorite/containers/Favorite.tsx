import { type FavoriteCoin } from '@/core/constants/types';
import { formatUSPrice } from '@/core/helpers/coin.helper';
import { sortFavoriteCoins } from '@/core/helpers/favoriteCoin.helper';
import { getPaginationData } from '@/core/helpers/pagination.helper';
import { type SortConfig, type SortKey } from '@/pages/home/components/CoinTabel';
import { DeltaBadge } from '@/shared/components/DeltaBadge';
import Pagination from '@/shared/components/Pagination';
import { PerPageSelector } from '@/shared/components/PerPageSelector';
import { useStorage } from '@/shared/hooks/useStorage';
import { CaretDownOutlined, CaretUpOutlined, StarFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const favoriteTabelFields = [
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
];

const Favorite = () => {
  const { favoriteCoins, setFavoriteCoins } = useStorage();
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

  //TODO Remove favorite coin
  const handleRemoveFavoriteCoin = (id: string) => {
    setFavoriteCoins((prev) => [...prev]?.filter((item) => item?.id !== id));
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
              {favoriteTabelFields?.map((field, index) => (
                <th
                  key={index}
                  className='cursor-pointer px-1 py-3 text-center text-sm font-medium'
                  onClick={() => handleSort(field.id)}
                >
                  {field.name} {field?.id && getArrow(field?.id)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {paginationCoins?.map((item, index) => (
              <tr
                key={index}
                className='hover:bg-[var(--background-secondary)] bg-[var(--background)] text-sm text-[var(--text-primary)]'
              >
                <td className='left-0 px-1 py-2.5 bg-inheritw-10 text-center'>
                  <button onClick={() => handleRemoveFavoriteCoin(item?.id)} className='cursor-pointer'>
                    <StarFilled style={{ color: '#eab308', fontSize: 18 }} />
                  </button>
                </td>
                <td className='min-w-10 text-center  px-1 py-2.5 bg-inherit '>{index}</td>
                <td className='px-1 py-2.5 bg-inherit'>
                  <Link className='flex items-center w-full' to={`/coin/${item?.id}`}>
                    <img className='mr-2 !h-6 w-6 object-fill' src={item?.thumbnail} alt={item?.name} />
                    <div className='flex flex-col items-start'>
                      <div className='font-semibold text-sm leading-5'>{item?.name}</div>
                    </div>
                  </Link>
                </td>

                <td className='text-center px-1 py-2.5 bg-inherit'>${formatUSPrice(item?.price)}</td>
                <td className='text-center px-1 py-2.5 bg-inherit'>
                  <DeltaBadge className='justify-center' value={item?.changePercentage1h} />
                </td>
                <td className='text-center px-1 py-2.5 bg-inherit'>
                  <DeltaBadge className='justify-center' value={item?.changePercentage24h} />
                </td>
                <td className='text-center px-1 py-2.5 bg-inherit'>
                  <DeltaBadge className='justify-center' value={item?.changePercentage7d} />
                </td>
                <td className='text-center d30 px-1 py-2.5 bg-inherit'>
                  <DeltaBadge className='justify-center' value={item?.changePercentage30d} />
                </td>
                <td className='text-center px-1 py-2.5 bg-inherit'>${formatUSPrice(item?.volume)}</td>
                <td className='text-center px-1 py-2.5 bg-inherit'>${formatUSPrice(item?.marketCap)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex sm:justify-between justify-center my-3'>
        <div></div>
        <Pagination totalPages={totalPage} currentPage={page} onPageChange={handleChangePage} />
        <div className='sm:block hidden'>
          <PerPageSelector perPage={perPage} onChange={handleChangePerPage} options={[20, 40, 60]} />
        </div>
      </div>
    </div>
  );
};

export default Favorite;
