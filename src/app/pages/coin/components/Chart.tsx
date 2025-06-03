import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Line } from 'react-chartjs-2';
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

import type { ChartProps, CoinHistory, TimeRangeType } from '@/core/constants/types';
import { TimeManagement } from '../components/TimeManagement';
import { DeltaBadge } from '@/shared/components/DeltaBadge';

// import { coinHistory, coinHistoryOneDay } from '../data/data.sample';
import { formatUSPrice } from '@/core/helpers/coin.helper';
import { formatDays, formatHours } from '@/core/helpers/time.helper';
import { getCoinHistory } from '@/core/services/coin.service';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler, // 💡 Quan trọng: để fill màu dưới line
  Tooltip,
  Legend,
);

// const getSampleData = (timeRange: TimeRangeType) => {
//   let priceHistory = timeRange == '7d' ? coinHistory.prices : coinHistoryOneDay.prices;
//   if (timeRange === '1h') priceHistory = priceHistory.slice(-12);

//   const timeStamps: number[] = [];
//   const prices: number[] = [];

//   priceHistory?.forEach(([timestamp, price]) => {
//     timeStamps.push(timestamp);
//     prices.push(price);
//   });

//   return { timeStamps, prices };
// };

const timeRanges = {
  '1h': {
    formatFunction: formatHours,
    day: 1,
  },
  '24h': {
    formatFunction: formatHours,
    day: 1,
  },
  '7d': {
    formatFunction: formatDays,
    day: 7,
  },
};

export const Chart = ({ coinData }: ChartProps) => {
  const { id } = useParams();

  const [timeRange, setTimeRange] = useState<TimeRangeType>('7d');
  const [{ timeStamps, prices }, setCoinHistory] = useState<CoinHistory>({ timeStamps: [], prices: [] });

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
            return `Price: ${formatted} USD`;
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
          text: 'Timestamp',
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
          text: 'Price',
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
      const formatFunction = timeRanges[timeRange]?.formatFunction;
      return formatFunction(item);
    }), // string[] -> truc x
    datasets: [
      {
        label: 'Price',
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

  const handleChangeTimeRange = (time: string) => {
    setTimeRange(time as TimeRangeType);
  };

  useEffect(() => {
    if (id) {
      // getSampleData(timeRange)
      getCoinHistory(id, timeRanges[timeRange].day)
        .then((res) => {
          let priceHistory: [number, number][] = res?.prices;
          if (timeRange === '1h') priceHistory = priceHistory.slice(-12);

          const timeStamps: number[] = [];
          const prices: number[] = [];

          priceHistory?.forEach(([timestamp, price]) => {
            timeStamps.push(timestamp);
            prices.push(price);
          });

          return setCoinHistory({ timeStamps, prices });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, timeRange]);

  return (
    <>
      <div className='mb-2 flex justify-end'>
        <TimeManagement onChange={handleChangeTimeRange} value='7d' />
      </div>
      <div>
        <Line width={'100%'} height={400} data={data} options={options} />
      </div>

      <div className='mt-3 overflow-x-auto'>
        <table className='min-w-full table-auto border border-[var(--border-primary)]'>
          <thead className='bg-[var(--background-secondary)] text-[var(--text-primary)]'>
            <tr>
              <th className='cursor-pointer px-6 py-3 text-left text-sm font-medium'>1h</th>
              <th className='cursor-pointer px-6 py-3 text-left text-sm font-medium'>24h</th>
              <th className='cursor-pointer px-6 py-3 text-left text-sm font-medium'>7d</th>
              <th className='cursor-pointer px-6 py-3 text-left text-sm font-medium'>14d</th>
              <th className='cursor-pointer px-6 py-3 text-left text-sm font-medium'>30d</th>
              <th className='cursor-pointer px-6 py-3 text-left text-sm font-medium'>1y</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            <tr className='bg-[var(--background)] text-sm text-[var(--text-primary)] border-t border-[var(--border-primary)]'>
              <td className='left-0 px-1 py-2.5 bg-inheritw-10 text-center'>
                <DeltaBadge value={Number(coinData?.changePercentage1h)} />
              </td>
              <td className='left-0 px-1 py-2.5 bg-inheritw-10 text-center'>
                <DeltaBadge value={Number(coinData?.changePercentage24h)} />
              </td>
              <td className='left-0 px-1 py-2.5 bg-inheritw-10 text-center'>
                <DeltaBadge value={Number(coinData?.changePercentage7d)} />
              </td>
              <td className='left-0 px-1 py-2.5 bg-inheritw-10 text-center'>
                <DeltaBadge value={Number(coinData?.changePercentage14d)} />
              </td>
              <td className='left-0 px-1 py-2.5 bg-inheritw-10 text-center'>
                <DeltaBadge value={Number(coinData?.changePercentage30d)} />
              </td>
              <td className='left-0 px-1 py-2.5 bg-inheritw-10 text-center'>
                <DeltaBadge value={Number(coinData?.changePercentage1y)} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
