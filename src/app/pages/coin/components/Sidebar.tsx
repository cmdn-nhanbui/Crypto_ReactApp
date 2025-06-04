import { StarFilled, StarOutlined } from '@ant-design/icons';

import { SideBarSkeleton } from './SideBarSkeleton';
import { DeltaBadge } from '@/shared/components/DeltaBadge';
import { Button } from '@/shared/components/Button';

import type { CoinDetailData, FavoriteCoin } from '@/core/constants/types';
import { formatUSPrice } from '@/core/helpers/coin.helper';
import { useStorage } from '@/shared/hooks/useStorage';

export const Sidebar = ({ data, isLoading = true }: { data?: CoinDetailData; isLoading: boolean }) => {
  const { favoriteCoins, setFavoriteCoins } = useStorage();

  const isFavorited = favoriteCoins?.some((item) => item?.id === data?.id);

  const handleFavoriteCoin = () => {
    setFavoriteCoins((prev) => {
      let newState = [...prev];
      const isExistedCoin = newState?.some((item) => item?.id === data?.id);

      if (!isExistedCoin) {
        const newFavoriteCoin: FavoriteCoin = {
          id: data?.id || '',
          name: data?.name || '',
          thumbnail: data?.thumbnail || '',
          changePercentage1h: data?.changePercentage1h || 0,
          changePercentage7d: data?.changePercentage7d || 0,
          changePercentage24h: data?.changePercentage24h || 0,
          changePercentage30d: data?.changePercentage30d || 0,
          price: data?.currentPrice || 0,
          volume: data?.volume || 0,
          marketCap: data?.marketCap || 0,
        };
        newState.push(newFavoriteCoin);
      } else {
        newState = newState?.filter((item) => item?.id !== data?.id);
      }

      return newState;
    });
  };

  return (
    <aside className='flex flex-col sm:pr-5 p-0'>
      {isLoading ? (
        <SideBarSkeleton />
      ) : (
        <>
          <div className='flex-1'>
            <div className='mb-2 flex items-center gap-x-2'>
              <img className='rounded-full h-6 w-6' alt={data?.name} src={data?.thumbnail} />

              <h1 className='flex items-center gap-x-1 flex-wrap'>
                <div className='font-bold text-[var(--text-primary)] text-lg leading-7'>{data?.name}</div>
                <span className='mt-0.5 font-normal text-[var(--text-secondary)] text-sm leading-5'>
                  {data?.symbol}
                </span>
              </h1>

              <span className='mt-0.5 mr-3 2lg:mr-0 inline-flex items-center px-1.5 py-0.5 bg-gray-100 rounded-md'>
                <div className='text-xs leading-4 text-gray-700 font-medium'>#65</div>
              </span>
            </div>

            <div className='mb-2 flex items-center gap-2'>
              <div className='font-bold text-[var(--text-primary)] text-3xl md:text-4xl leading-10'>
                <span>${formatUSPrice(Number(data?.currentPrice))}</span>
              </div>
              <div className='font-bold text-[var(--text-primary)] text-lg md:text-xl leading-7'>
                <DeltaBadge value={Number(data?.change24hUSD)} />
              </div>
            </div>

            <div className='mb-3 text-xs leading-4 text-[var(--text-secondary)] font-regular'>
              <div className='flex gap-2'>
                <span>{data?.currentPriceBTC} BTC</span>
                <DeltaBadge value={Number(data?.change24hBTC)} />
              </div>
              <div className='flex gap-2'>
                <span>{data?.currentPriceETH} ETH</span>
                <DeltaBadge value={Number(data?.change24hETH)} />
              </div>
            </div>
          </div>
          <Button onClick={handleFavoriteCoin} color={isFavorited ? 'YELLOW' : 'TRANSPARENT'}>
            <div className={`flex text-sm`}>
              {isFavorited ? <StarFilled className='mr-2' /> : <StarOutlined className='mr-2' />}
              {isFavorited ? 'Remove from Favorite list' : 'Add to Favorite list'}
            </div>
          </Button>
          <ul className='flex flex-col'>
            {data?.marketCap && (
              <li className='flex justify-between py-3'>
                <div className='text-left text-[var(--text-secondary)] font-medium text-sm leading-5'>Market Cap</div>
                <div className='pl-2 text-right text-[var(--text-primary)] font-semibold text-sm leading-5'>
                  ${formatUSPrice(Number(data?.marketCap))}
                </div>
              </li>
            )}
            {data?.fullyDilutedValuation && (
              <li className='flex justify-between py-3'>
                <div className='text-left text-[var(--text-secondary)] font-medium text-sm leading-5'>
                  Fully Diluted Valuation
                </div>
                <div className='pl-2 text-right text-[var(--text-primary)] font-semibold text-sm leading-5'>
                  ${formatUSPrice(Number(data?.fullyDilutedValuation))}
                </div>
              </li>
            )}
            {data?.circulatingSupply && (
              <li className='flex justify-between py-3'>
                <div className='text-left text-[var(--text-secondary)] font-medium text-sm leading-5'>
                  Circulating Supply
                </div>
                <div className='pl-2 text-right text-[var(--text-primary)] font-semibold text-sm leading-5'>
                  {data?.circulatingSupply?.toLocaleString()}
                </div>
              </li>
            )}
            {data?.totalSupply && (
              <li className='flex justify-between py-3'>
                <div className='text-left text-[var(--text-secondary)] font-medium text-sm leading-5'>Total Supply</div>
                <div className='pl-2 text-right text-[var(--text-primary)] font-semibold text-sm leading-5'>
                  {data?.totalSupply?.toLocaleString()}
                </div>
              </li>
            )}
            {data?.maxSupply && (
              <li className='flex justify-between py-3'>
                <div className='text-left text-[var(--text-secondary)] font-medium text-sm leading-5'>Max Supply</div>
                <div className='pl-2 text-right text-[var(--text-primary)] font-semibold text-sm leading-5'>
                  {data?.maxSupply?.toLocaleString()}
                </div>
              </li>
            )}
          </ul>{' '}
        </>
      )}
    </aside>
  );
};
