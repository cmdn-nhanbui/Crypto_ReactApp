import { Sidebar } from '../components/Sidebar';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCoinById } from '@/core/services/coin.service';
import { type CoinDetailData } from '@/core/constants/types';
import { mapCoinDetailData } from '@/core/mappers/coin.mapper';
import { Chart } from '../components/Chart';

const Coin = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState<CoinDetailData>();

  // Scroll to top in first time
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (id) {
      getCoinById(id)
        .then((res) => {
          setCoinData(mapCoinDetailData(res));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  return (
    <div className='container'>
      <div className='my-5'>
        <div className='row'>
          <div className='col col-4 col-sm-12'>
            <Sidebar data={coinData} />
          </div>

          <div className='col col-8 col-sm-12 border-l border-[var(--border-primary)]'>
            <div className='flex flex-col'>
              <Chart coinData={coinData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Coin;
