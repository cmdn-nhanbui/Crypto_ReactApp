import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { format } from 'date-fns';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const BitcoinChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7')
      .then((res) => res.json())
      .then((data) => {
        const prices = data.prices;

        const step = Math.floor(prices.length / 6); // chia 6 khoảng => 7 mốc
        const sampled = prices.filter((_, index) => index % step === 0).slice(0, 7);

        const labels = sampled.map(([timestamp]) => timestamp);
        const values = sampled.map(([_, price]) => price);

        setChartData({
          labels,
          datasets: [
            {
              label: 'BTC Price (USD)',
              data: values,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.3,
              fill: true,
              pointRadius: 4,
              pointHoverRadius: 6,
            },
          ],
        });
      });
  }, []);

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'day',
          tooltipFormat: 'dd/MM/yyyy HH:mm',
        },
        ticks: {
          callback: (value: any, index: number, ticks: any) => {
            const timestamp = chartData?.labels?.[index];
            return format(new Date(timestamp), 'dd/MM');
          },
        },
      },
      y: {
        ticks: {
          callback: function (value: any) {
            return `$${value.toLocaleString()}`;
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems: any[]) => {
            return `Timestamp: ${tooltipItems[0].parsed.x}`;
          },
          label: (tooltipItem: any) => {
            const date = format(new Date(tooltipItem.parsed.x), 'dd/MM/yyyy HH:mm');
            const price = `$${tooltipItem.parsed.y.toLocaleString()}`;
            return [`Date: ${date}`, `Price: ${price}`];
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Bitcoin Price - Last 7 Days</h2>
      {chartData ? <Line data={chartData} options={options} /> : 'Loading...'}
    </div>
  );
};

export default BitcoinChart;
