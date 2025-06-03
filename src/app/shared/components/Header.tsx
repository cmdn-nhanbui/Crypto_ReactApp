import { Link } from 'react-router-dom';
import { MoonOutlined, StarFilled, SunOutlined } from '@ant-design/icons';

import { DeltaBadge } from './DeltaBadge';
import { Button } from './Button';

import { ROUTES } from '@/core/constants/routes';
import { Search } from '@/shared/components/Search/Search';
import { useTheme } from '../hooks/useTheme';

import logo from '@assets/images/coingecko-1.svg';
import logoDark from '@assets/images/coingecko-dark.svg';

export const Header = ({}) => {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = (): void => {
    setTheme((prev) => {
      return prev === 'dark' ? 'light' : 'dark';
    });
  };

  return (
    <header className='header'>
      <div className='container'>
        <div className='py-2.5 header-top flex justify-between border-b border-[var(--border-primary)]'>
          <ul className='py-2 text-xs md:flex gap-4 hidden'>
            <li className='text-[var(--text-secondary)]'>
              Coins:
              <a
                href='/'
                data-view-component='true'
                className='text-[var(--text-gray)] font-semibold hover:text-[var(--green-primary)] ml-1'
              >
                17,241
              </a>
            </li>
            <li className='text-[var(--text-secondary)]'>
              Exchanges:
              <a
                href='/'
                data-view-component='true'
                className='text-[var(--text-gray)] font-semibold hover:text-[var(--green-primary)] ml-1'
              >
                1,277
              </a>
            </li>
            <li className='text-[var(--text-secondary)] flex items-center'>
              Market Cap:
              <a
                href='/'
                data-view-component='true'
                className='text-[var(--text-gray)] font-semibold hover:text-[var(--green-primary)] ml-1'
              >
                $3.545T
              </a>
              <DeltaBadge value={0.5} />
            </li>
            <li className='text-[var(--text-secondary)] flex items-center'>
              24h Vol:
              <a
                href='/'
                data-view-component='true'
                className='text-[var(--text-gray)] font-semibold hover:text-[var(--green-primary)] ml-1'
              >
                $122.052B
              </a>
            </li>
            <li className='text-[var(--text-secondary)] flex items-center'>
              Dominance:
              <a
                href='/'
                data-view-component='true'
                className='text-[var(--text-gray)] font-semibold hover:text-[var(--green-primary)] ml-1'
              >
                BTC 60.4%
              </a>
              <a
                href='/'
                data-view-component='true'
                className='text-[var(--text-gray)] font-semibold hover:text-[var(--green-primary)] ml-1'
              >
                ETH 9.24%
              </a>
            </li>
          </ul>
          <Link className='lg:hidden block md:hidden' to={ROUTES.ROOT}>
            <h1 className='h-8 cursor-pointer'>
              <div className='logo h-full w-auto object-cover' />
            </h1>
          </Link>
          <div className='flex gap-2'>
            <Link className='flex' to={ROUTES.FAVORITE}>
              <Button>
                <StarFilled className='!text-amber-300' />
              </Button>
            </Link>
            <Button onClick={handleChangeTheme} color='SECONDARY'>
              {theme === 'light' ? <MoonOutlined /> : <SunOutlined />}
            </Button>
            <Button color='SECONDARY'>Login</Button>
            <Button color='PRIMARY'>Sign up</Button>
          </div>
        </div>
        <div className='py-2.5 header-bottom flex border-b border-[var(--border-primary)]'>
          <Link to={ROUTES.ROOT}>
            <h1 className='h-10 cursor-pointer hidden lg:block'>
              <img src={theme === 'light' ? logo : logoDark} className='h-full' alt='logo' />
            </h1>
          </Link>
          <div className='flex justify-between flex-1 w-full'>
            <nav className='items-center ml-8 gap-8 hidden lg:flex'>
              <Link to='/' className='text-[var(--text-primary)] hover:text-[var(--green-primary)]'>
                Cryptocurrencies
              </Link>
              <Link to='/' className='text-[var(--text-primary)] hover:text-[var(--green-primary)]'>
                Exchanges
              </Link>
              <Link to='/' className='text-[var(--text-primary)] hover:text-[var(--green-primary)]'>
                NFT
              </Link>
              <Link to='/' className='text-[var(--text-primary)] hover:text-[var(--green-primary)]'>
                Learn
              </Link>
              <Link to='/' className='text-[var(--text-primary)] hover:text-[var(--green-primary)]'>
                Products
              </Link>
              <Link to='/' className='text-[var(--text-primary)] hover:text-[var(--green-primary)]'>
                API
              </Link>
            </nav>

            <div className='flex items-center gap-2 text-[var(--text-primary)] sm:flex-row flex-row-reverse flex-1 sm:flex-none lg:w-fit w-full'>
              <Search />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
