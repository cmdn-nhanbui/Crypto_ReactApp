import { Link } from 'react-router-dom';

import type { FavoriteCoin } from '@/core/constants/types';
import { formatUSPrice } from '@/core/helpers/coin.helper';
import { DeltaBadge } from '@/shared/components/DeltaBadge';
import { useStorage } from '@/shared/hooks/useStorage';
import { StarFilled } from '@ant-design/icons';

type Props = {
  data: FavoriteCoin;
  index: number;
};

export const FavoriteItem = ({ data, index }: Props) => {
  const { setFavoriteCoins } = useStorage();

  //TODO Remove favorite coin
  const handleRemoveFavoriteCoin = (id: string) => {
    const confirmDelete = window.confirm('Do you want to delete this coin ?');
    if (confirmDelete) {
      setFavoriteCoins((prev) => [...prev]?.filter((item) => item?.id !== id));
    }
  };

  return (
    <tr className='hover:bg-[var(--background-secondary)] bg-[var(--background)] text-sm text-[var(--text-primary)]'>
      <td className='left-0 px-1 py-2.5 bg-inheritw-10 text-center'>
        <button onClick={() => handleRemoveFavoriteCoin(data?.id)} className='cursor-pointer'>
          <StarFilled style={{ color: '#eab308', fontSize: 18 }} />
        </button>
      </td>
      <td className='min-w-10 text-center  px-1 py-2.5 bg-inherit '>{index}</td>
      <td className='px-1 py-2.5 bg-inherit'>
        <Link className='flex items-center w-full' to={`/coin/${data?.id}`}>
          <img className='mr-2 !h-6 w-6 object-fill' src={data?.thumbnail} alt={data?.name} />
          <div className='font-semibold text-sm leading-5 max-w-[100px] truncate'>{data?.name}</div>
        </Link>
      </td>

      <td className='text-center px-1 py-2.5 bg-inherit'>${formatUSPrice(data?.price)}</td>
      <td className='text-center px-1 py-2.5 bg-inherit'>
        <DeltaBadge className='justify-center' value={data?.changePercentage1h} />
      </td>
      <td className='text-center px-1 py-2.5 bg-inherit'>
        <DeltaBadge className='justify-center' value={data?.changePercentage24h} />
      </td>
      <td className='text-center px-1 py-2.5 bg-inherit'>
        <DeltaBadge className='justify-center' value={data?.changePercentage7d} />
      </td>
      <td className='text-center d30 px-1 py-2.5 bg-inherit'>
        <DeltaBadge className='justify-center' value={data?.changePercentage30d} />
      </td>
      <td className='text-center px-1 py-2.5 bg-inherit'>${formatUSPrice(data?.volume)}</td>
      <td className='text-center px-1 py-2.5 bg-inherit'>${formatUSPrice(data?.marketCap)}</td>
    </tr>
  );
};
