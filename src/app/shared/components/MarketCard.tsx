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
import type { MarketCardProps } from '@/core/constants/types';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const MarketCard: React.FC<MarketCardProps> = ({ value, percentageChange, chartData, title }) => {
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
    <div className='p-3 border rounded-xl shadow-xs bg-[var(--background)] flex flex-col sm:flex-row border-[var(--border-primary)] w-full'>
      <div className='col col-7 flex flex-col justify-center'>
        <div className='text-lg font-semibold text-[var(--text-primary)] leading-[18px]'>${formattedValue}</div>
        <div className='text-sm text-[var(--text-secondary)] font-semibold flex items-center gap-2 mt-1'>
          {title}
          <DeltaBadge value={percentageChange} />
        </div>
      </div>
      <div className='col col-5 h-[60px] col-sm-12'>
        <Line width={'100%'} data={data} options={options} />
      </div>
    </div>
  );
};

export default MarketCard;
