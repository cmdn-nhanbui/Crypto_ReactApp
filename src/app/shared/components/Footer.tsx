import { Link } from 'react-router-dom';

import { Button } from './Button';
import { ROUTES } from '@/core/constants/routes';
import { useTheme } from '../hooks/useTheme';

import { FOOTER_MENUS } from '@/core/constants/fields';
import logo from '@assets/images/coingecko-1.svg';
import logoDrark from '@assets/images/coingecko-dark.svg';

export const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className='footer container border-t border-[var(--border-primary)]'>
      <div className='py-6'>
        <div className='row col-sm'>
          <section className='col col-5 col-sm-12 flex flex-col'>
            <Link to={ROUTES.ROOT} className='h-10'>
              <img className='h-full' src={theme === 'light' ? logo : logoDrark} alt='logo' />
            </Link>
            <div className='mt-5 text-sm text-[var(--text-secondary)]'>
              CoinGecko provides a fundamental analysis of the crypto market. In addition to tracking price, volume and
              market capitalisation, CoinGecko tracks community growth, open-source code development, major events and
              on-chain metrics.
            </div>
          </section>
          <div className='col col-7 col-sm-12 flex mt-4 sm:mt-0 sm:flex-row flex-col sm:gap-0 gap-4'>
            {FOOTER_MENUS?.map((item, index) => (
              <nav className='flex-1' key={index} aria-label='Resources'>
                <h2 className='text-[var(--text-gray)] text-md font-semibold'>{item.title}</h2>
                <ul className='mt-3 flex flex-col gap-2'>
                  {item?.children?.map((childItem, index) => (
                    <li className='text-[var(--text-secondary)] font-normal text-sm' key={index}>
                      <a href='#'>{childItem}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      <section className='py-6 border-t border-[var(--border-primary)] row'>
        <div className='col col-9 col-sm-12 text-sm'>
          <span className='text-[var(--text-primary)] font-semibold'>
            Interested to stay up-to-date with cryptocurrencies?
          </span>
          <p className='text-[var(--text-gray)] font-normal'>
            Get the latest crypto news, updates, and reports by subscribing to our free newsletter.
          </p>
        </div>
        <div className='col col-3 col-sm-12'>
          <form className='flex'>
            <div className='mr-2 flex-1'>
              <input
                className='w-full rounded-lg p-2 outline-none text-[var(--text-primary)] text-sm focus:border-[var(--green-primary)] border-2 border-[var(--border-primary)]'
                placeholder='Enter your email address'
              />
            </div>
            <Button disable color='PRIMARY'>
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      <div className='row coppy-right border-t border-[var(--border-primary)] py-4'>
        <div className='text-center text-base text-[var(--text-secondary)] w-full'>
          © 2025 CoinGecko. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
