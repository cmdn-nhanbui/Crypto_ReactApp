import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { type CoinDetailData } from '@/core/constants/types';
import { Sidebar } from '../components/Sidebar';
import { Chart } from '../components/Chart';

import { mapCoinDetailData } from '@/core/mappers/coin.mapper';
import { getCoinById } from '@/core/services/coin.service';
import { ROUTES } from '@/core/constants/routes';

const Coin = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState<CoinDetailData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  // Scroll to top in first time
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getCoinById(id)
        .then((res) => {
          setCoinData(mapCoinDetailData(res));
        })
        .catch((err) => {
          console.log(err);
          const status = err?.response?.status;
          if (status === 404) return navigate(ROUTES.NOT_FOUND);
          return navigate(ROUTES.SERVER_ERROR);
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  return (
    <div className='container'>
      <div className='my-5'>
        <div className='row'>
          <div className='col col-4 col-sm-12'>
            <Sidebar isLoading={isLoading} data={coinData} />
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
