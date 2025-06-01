import { Button } from '@/shared/components/Button';
import { DeltaBadge } from '@/shared/components/DeltaBadge';
import { StarOutlined } from '@ant-design/icons';

export const Sidebar = () => {
  return (
    <aside className='flex flex-col sm:pr-5 p-0'>
      <div className='flex-1'>
        <div className='mb-2 flex items-center gap-x-2'>
          <img
            className='rounded-full h-6 w-6'
            alt='WLD logo'
            src='https://assets.coingecko.com/coins/images/31069/standard/worldcoin.jpeg?1696529903'
          />

          <h1 className='flex items-center gap-x-1 flex-wrap'>
            <div className='font-bold text-[var(--text-primary)] text-lg leading-7'>Worldcoin</div>
            <span className='mt-0.5 font-normal text-[var(--text-secondary)] text-sm leading-5'>WLD Price</span>
          </h1>

          <span className='mt-0.5 mr-3 2lg:mr-0 inline-flex items-center px-1.5 py-0.5 bg-gray-100 dark:bg-moon-400/20 rounded-md'>
            <div className='text-xs leading-4 text-gray-700 dark:text-moon-200 font-medium'>#65</div>
          </span>
        </div>

        <div className='mb-2 flex items-center gap-2'>
          <div className='font-bold text-[var(--text-primary)] text-3xl md:text-4xl leading-10'>
            <span>$1.15</span>
          </div>
          <div className='font-bold text-[var(--text-primary)] text-lg md:text-xl leading-7'>
            <DeltaBadge value={6.4} />
          </div>
          <div
            data-controller='tooltip'
            data-tooltip-tooltip-placement-value='bottom'
            data-action='mouseleave-&gt;tooltip#hide'
          >
            <div>
              <div className='max-w-sm font-normal gecko-tooltip gecko-tooltip-long gecko-tooltip-extra-padding !hidden'>
                <div className='flex flex-col gap-y-3 gecko-override-links'>
                  <p className='text-gray-700 dark:text-moon-100 font-semibold text-sm leading-5'>
                    How is the price of Worldcoin (WLD) calculated?
                  </p>
                  <p className='font-normal text-[var(--text-secondary)] dark:text-moon-200 text-sm leading-5'>
                    The price of Worldcoin (WLD) is calculated in real-time by aggregating the latest data across 104
                    exchanges and 157 markets, using a global volume-weighted average formula. Learn more about{' '}
                    <a href='https://www.coingecko.com/en/methodology'>how crypto prices are calculated</a> on
                    CoinGecko.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mb-3 text-xs leading-4 text-[var(--text-secondary)] dark:text-moon-200 font-regular'>
          <div className='flex gap-2'>
            <span>0.00001109 BTC</span>
            <DeltaBadge value={4.9} />
          </div>
          <div className='flex gap-2'>
            <span>0.0004553 ETH</span>
            <DeltaBadge value={2.9} />
          </div>
        </div>
        <div className='mt-3'>
          <div data-controller='feature-flag'>
            <div className='hidden' data-feature-flag-target='new' data-release-percentage='0.2'>
              <div>
                <canvas
                  className='h-8 absolute right-0 top-[-10px] -translate-y-1/2 z-[-1]'
                  data-controller='rive'
                  data-rive-path-value='/rive/post-coin-app-web.riv'
                  width='0'
                  height='0'
                ></canvas>
              </div>
            </div>
            <div data-feature-flag-target='old'></div>
          </div>
        </div>
      </div>

      <Button>
        <div className='flex text-sm'>
          <StarOutlined className='mr-2' />
          Add to Favorite list
        </div>
      </Button>

      <ul className='flex flex-col'>
        <li className='flex justify-between py-3'>
          <div className='text-left text-[var(--text-secondary)] font-medium text-sm leading-5'>Market Cap</div>
          <div className='pl-2 text-right text-[var(--text-primary)] font-semibold text-sm leading-5'>
            $1,785,203,283{' '}
          </div>
        </li>
        <li className='flex justify-between py-3'>
          <div className='text-left text-[var(--text-secondary)] font-medium text-sm leading-5'>
            Fully Diluted Valuation
          </div>
          <div className='pl-2 text-right text-[var(--text-primary)] font-semibold text-sm leading-5'>
            $11,505,999,429
          </div>
        </li>

        <li className='flex justify-between py-3'>
          <div className='text-left text-[var(--text-secondary)] font-medium text-sm leading-5'>Circulating Supply</div>
          <div className='pl-2 text-right text-[var(--text-primary)] font-semibold text-sm leading-5'>
            1,551,541,257
          </div>
        </li>
        <li className='flex justify-between py-3'>
          <div className='text-left text-[var(--text-secondary)] font-medium text-sm leading-5'>Total Supply</div>
          <div className='pl-2 text-right text-[var(--text-primary)] font-semibold text-sm leading-5'>
            10,000,000,000
          </div>
        </li>
        <li className='flex justify-between py-3'>
          <div className='text-left text-[var(--text-secondary)] font-medium text-sm leading-5'>Max Supply</div>
          <div className='pl-2 text-right text-[var(--text-primary)] font-semibold text-sm leading-5'>
            10,000,000,000
          </div>
        </li>
      </ul>
    </aside>
  );
};
