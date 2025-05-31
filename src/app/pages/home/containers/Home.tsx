import { Card } from '@/shared/components/Card';
import { CoinItem } from '@/shared/components/CoinItem';
import MarketCard from '@/shared/components/MarketCard';
import { CoinTabel } from '../components/CoinTabel';

function generateFakeChartData(length: number = 500, startPrice: number = 100): number[] {
  const data: number[] = [startPrice];

  for (let i = 1; i < length; i++) {
    const last = data[i - 1];
    // Tăng/giảm ngẫu nhiên trong khoảng -1 đến +1.5 (dao động nhẹ, có thể thiên hướng lên)
    const change = (Math.random() - 0.5) * 2; // khoảng [-1, +1]
    const next = parseFloat((last + change).toFixed(2));
    data.push(next);
  }

  return data;
}

const Home = () => {
  const fakeData1 = generateFakeChartData(200, 100);
  const fakeData2 = generateFakeChartData(200, 100);
  return (
    <div className='container min-h-[calc(100vh-120px)] pt-8 '>
      <div className='row'>
        <div className='col col-4 flex flex-col gap-4 col-sm-12 h-full'>
          <MarketCard value={3508168481385} percentageChange={-3.1} chartData={fakeData1} />
          <MarketCard value={3508168481385} percentageChange={3.1} chartData={fakeData2} />
        </div>
        <div className='col col-4 col-sm-12'>
          <Card title='🔥 Trending' viewMore='/'>
            <CoinItem
              thumbnail='https://assets.coingecko.com/coins/images/22506/standard/POKT.jpg?1703257310'
              title='Pocket Network'
              currentPrice={0.04744}
              percent={20.5}
            />
            <CoinItem
              thumbnail='https://assets.coingecko.com/coins/images/50390/standard/wc-token1.png?1727569464'
              title='WalletConnect Token'
              currentPrice={1.16}
              percent={-8.2}
            />
            <CoinItem
              thumbnail='https://assets.coingecko.com/coins/images/7137/standard/badge-logo-circuit-green.png?1719357686'
              title='Livepeer'
              currentPrice={7.96}
              percent={45.5}
            />
          </Card>
        </div>
        <div className='col col-4 col-sm-12'>
          <Card title='🚀 Top Gainers' viewMore='/'>
            <CoinItem
              thumbnail='https://assets.coingecko.com/coins/images/22506/standard/POKT.jpg?1703257310'
              title='Pocket Network'
              currentPrice={0.04744}
              percent={20.5}
            />
            <CoinItem
              thumbnail='https://assets.coingecko.com/coins/images/50390/standard/wc-token1.png?1727569464'
              title='WalletConnect Token'
              currentPrice={1.16}
              percent={-8.2}
            />
            <CoinItem
              thumbnail='https://assets.coingecko.com/coins/images/7137/standard/badge-logo-circuit-green.png?1719357686'
              title='Livepeer'
              currentPrice={7.96}
              percent={45.5}
            />
          </Card>
        </div>
      </div>

      <div className='mt-6'>
        <CoinTabel />
      </div>
    </div>
  );
};

export default Home;
