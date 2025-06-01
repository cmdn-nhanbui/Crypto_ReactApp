import { generateFakeChartData } from '@/pages/home/containers/Home';
import { Sidebar } from '../components/Sidebar';
import { Line } from 'react-chartjs-2';
import { coinHistory } from '../data/data.sample';

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js';
import { formatTimeStamp, formatUSPrice } from '@/core/helpers/coinHelper';
import { TimeManagement } from '../components/TimeManagement';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler, // 💡 Quan trọng: để fill màu dưới line
  Tooltip,
  Legend,
);

const getSampleData = () => {
  const priceHistory = coinHistory.prices;
  const timeStamps: number[] = [];
  const prices: number[] = [];

  priceHistory?.forEach(([timestamp, price]) => {
    timeStamps.push(timestamp);
    prices.push(price);
  });

  return { timeStamps, prices };
};

const Coin = () => {
  const { timeStamps, prices } = getSampleData();

  const options: ChartOptions<'line'> = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (context) {
            const value = context.parsed.y;
            const formatted = value.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            return `Giá: ${formatted} US$`;
          },
          title: function (tooltipItems) {
            const index = tooltipItems[0].dataIndex;
            const rawTimestamp = timeStamps[index]; // lấy từ scope ngoài
            const date = new Date(rawTimestamp);
            const day = String(date.getUTCDate()).padStart(2, '0');
            const month = String(date.getUTCMonth() + 1).padStart(2, '0');
            const year = date.getUTCFullYear();
            const hour = String(date.getUTCHours()).padStart(2, '0');
            const minute = String(date.getUTCMinutes()).padStart(2, '0');
            return `${day}/${month}/${year} ${hour}:${minute} UTC`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true, // Hiện trục X
        title: {
          display: true,
          text: 'Thời gian',
        },
        ticks: {
          color: '#888',
          maxTicksLimit: 7,
        },
        grid: {
          display: true,
          drawOnChartArea: false,
        },
      },
      y: {
        display: true, // Hiện trục Y
        position: 'right', // Trục nằm bên phải
        title: {
          display: true,
          text: 'Giá',
        },
        ticks: {
          color: '#888',
          maxTicksLimit: 7,
          callback: function (value) {
            return '$' + formatUSPrice(Number(value));
          },
        },
        grid: {
          display: true,
          drawOnChartArea: true, // vẽ đường lưới ngang
        },
      },
    },
    elements: {
      line: { borderJoinStyle: 'round' },
    },
  };

  const data = {
    labels: timeStamps.map((item) => {
      const { day, month } = formatTimeStamp(item);
      return `${day}/${month}`;
    }), // string[] -> truc x
    datasets: [
      {
        label: 'Giá',
        data: prices, // number[] -> truc y
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: '#4bcc00',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        pointHoverRadius: 8,
      },
    ],
  };

  return (
    <div className='container'>
      <div className='my-5'>
        <div className='row'>
          <div className='col col-4 col-sm-12'>
            <Sidebar />
          </div>

          <div className='col col-8 col-sm-12 border-l border-[var(--border-primary)]'>
            <div className='flex flex-col'>
              <div className='mb-2 flex justify-end'>
                <TimeManagement value='24h' />
              </div>
              <div>
                <Line width={'100%'} height={400} data={data} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Coin;
