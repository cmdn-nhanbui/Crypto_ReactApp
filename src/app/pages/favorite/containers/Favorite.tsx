import { useEffect } from 'react';

const Favorite = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div className='container min-h-[calc(100vh-120px)]'>Favorite</div>;
};
export default Favorite;
