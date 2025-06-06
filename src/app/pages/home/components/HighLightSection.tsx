import { CoinItem } from '@/shared/components/CoinItem';
import MarketCard from '@/shared/components/MarketCard';
import { Card } from '@/shared/components/Card';

import { generateFakeChartData } from '@/core/helpers/coin.helper';
import { useCoinsData } from '@/shared/hooks/useCoins';

export const HighLightSection = () => {
  const { data, isLoading } = useCoinsData({ page: 1, perPage: 10 });

  const fakeData1 = generateFakeChartData(200, 100);
  const fakeData2 = generateFakeChartData(200, 100);

  return (
    <section>
      <div className='row'>
        <div className='col col-4 flex flex-col gap-4 col-sm-12 h-full sm:mt-0 mt-3'>
          <MarketCard title='Market Cap' value={3508168481385} percentageChange={-3.1} chartData={fakeData1} />
          <MarketCard title='24h Trading Volume' value={4203165481385} percentageChange={4.2} chartData={fakeData2} />
        </div>
        <div className='col col-4 col-sm-12 sm:mt-0 mt-2'>
          <Card isLoading={isLoading} title='🔥 Trending' viewMore='/'>
            <ul className='highlight-coins'>
              {data?.coins?.slice(0, 3)?.map((item, index) => {
                return (
                  <li className='highlight-coin-item' key={index}>
                    <CoinItem
                      id={item?.id}
                      thumbnail={item?.thumbnail}
                      title={item?.name}
                      currentPrice={item?.price}
                      percent={item?.percentDayChange}
                    />
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
        <div className='col col-4 col-sm-12 sm:mt-0 mt-2'>
          <Card isLoading={isLoading} title='🚀 Top Gainers' viewMore='/'>
            <ul className='highlight-coins'>
              {data?.coins?.slice(3, 6)?.map((item, index) => {
                return (
                  <li className='highlight-coin-item' key={index}>
                    <CoinItem
                      id={item?.id}
                      thumbnail={item?.thumbnail}
                      title={item?.name}
                      currentPrice={item?.price}
                      percent={item?.percentDayChange}
                    />
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
};
