// src/components/MarketCard.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  type ChartOptions,
} from 'chart.js';
import { DeltaBadge } from './DeltaBadge';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

type MarketCardProps = {
  value: number;
  percentageChange: number;
  chartData: number[];
};

const MarketCard: React.FC<MarketCardProps> = ({ value, percentageChange, chartData }) => {
  const formattedValue = value.toLocaleString('de-DE');

  const data = {
    labels: chartData.map((_, i) => i),
    datasets: [
      {
        data: chartData,
        borderColor: percentageChange >= 0 ? '#4bcc00' : '#ff3a33', // red-500
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
    elements: {
      line: { borderJoinStyle: 'round' },
    },
  };

  return (
    <div className='p-4 border rounded-xl shadow-xs w-fit bg-[var(--background)] flex gap-8 border-[var(--border-primary)]'>
      <div className='flex flex-col justify-center'>
        <div className='text-xl font-semibold text-[var(--text-primary)]'>${formattedValue}</div>
        <div className='text-sm text-[var(--text-secondary)] font-semibold flex items-center gap-2'>
          Market Cap
          <DeltaBadge value={percentageChange} />
        </div>
      </div>
      <div className='mt-2 w-full h-[60px]'>
        <Line
          style={{
            width: '100%',
          }}
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default MarketCard;
