import { useParams } from 'react-router-dom';

const Coin = () => {
  const { id } = useParams();

  return <div className='min-h-[calc(100vh-120px)] container'>Coin: {id}</div>;
};
export default Coin;
