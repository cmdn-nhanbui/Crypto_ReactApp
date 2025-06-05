import { SearchItem } from './SearchItem';

import { useTheme } from '@/shared/hooks/useTheme';
import type { SearchItemProps } from '@/core/constants/types';
import { THEME } from '@/core/constants/theme';

export const SearchPopper = ({
  searchData,
  isNotFound = false,
  onClose = () => {},
}: {
  searchData: SearchItemProps[];
  isNotFound: boolean;
  onClose?: () => void;
}) => {
  const { theme } = useTheme();
  const background = theme === THEME.DARK ? 'bg-[var(--background-secondary)]' : 'bg-[var(--background)]';

  const handleClickItem = () => {
    if (onClose) onClose();
  };

  return (
    <div
      className={`${background} w-full max-h-[90vh] right-0 top-0 rounded-md shadow-lg border border-[var(--border-primary)] p-2 z-20`}
    >
      <div className='flex gap-x-2 items-center text-gray-500 text-xs my-2 w-full'>
        <span className='shrink-0 basis-auto'>Search Result 🔥</span>
        <div className='w-full border-t border-[var(--border-primary)]'></div>
      </div>
      {isNotFound && <div>Notfound any coins </div>}
      <ul className='search-result-list max-h-[80vh] overflow-y-auto'>
        {searchData?.map((item, index) => (
          <SearchItem {...item} onClick={handleClickItem} key={index} />
        ))}
      </ul>
    </div>
  );
};
