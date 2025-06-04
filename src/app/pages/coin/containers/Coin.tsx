import { useEffect } from 'react';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';

import { Sidebar } from '../components/Sidebar';
import { Chart } from '../components/Chart';

import { useCoinId } from '@/shared/hooks/useCoins';
import { ROUTES } from '@/core/constants/routes';

const Coin = () => {
  const { id } = useParams();
  const { data, isLoading, error, isError } = useCoinId(id); // ✅ luôn được gọi

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (data) {
    document.title = data?.name;
  }
  if (isError) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 404) return <Navigate to={ROUTES.NOT_FOUND} />;
      else {
        return <Navigate to={ROUTES.SERVER_ERROR} />;
      }
    } else {
      return <Navigate to={ROUTES.SERVER_ERROR} />;
    }
  }

  return (
    <div className='container'>
      <div className='my-5'>
        <div className='row'>
          <div className='col col-4 col-sm-12'>
            <Sidebar isLoading={isLoading} data={data} />
          </div>

          <div className='col col-8 col-sm-12 border-l border-[var(--border-primary)]'>
            <div className='flex flex-col'>
              <Chart coinData={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Coin;
