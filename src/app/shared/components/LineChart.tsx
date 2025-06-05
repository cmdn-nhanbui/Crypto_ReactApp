import type { ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { LineChartProps } from '@/core/constants/types';

export const LineChart = ({ chartData, isIncrease }: LineChartProps) => {
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

  const data = {
    labels: chartData.map((_, i) => i),
    datasets: [
      {
        data: chartData,
        borderColor: isIncrease ? '#4bcc00' : '#ff3a33', // red-500
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };
  return <Line width={'100%'} data={data} options={options} />;
};
