import { useEffect } from 'react';

import { CoinTabel } from '../components/CoinTabel';
import { HighLightSection } from '../components/HighLightSection';

const Home = () => {
  useEffect(() => {
    document.title = 'Coingecko';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='container min-h-[calc(100vh-120px)] pt-5'>
      <HighLightSection />
      <CoinTabel />
    </div>
  );
};

export default Home;
