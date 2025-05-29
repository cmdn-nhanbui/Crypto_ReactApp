import MarketCard from '@/shared/components/MarketCard';
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
        <div className='col col-4 flex flex-col gap-4 col-sm-12'>
          <MarketCard value={3508168481385} percentageChange={-3.1} chartData={fakeData1} />
          <MarketCard value={3508168481385} percentageChange={3.1} chartData={fakeData2} />
        </div>
      </div>
    </div>
  );
};

export default Home;
