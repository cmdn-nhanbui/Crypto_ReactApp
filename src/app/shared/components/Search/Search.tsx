import { SearchOutlined } from '@ant-design/icons';
import { SearchPopper } from './SearchPopper';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { searchCoin } from '@/core/services/coin.service';
import { type SearchItemProps } from '@/core/constants/types';
import { mapSearchResultData } from '@/core/mappers/coin.mapper';

export const Search = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce(searchValue, 500);
  const [searchResult, setSearchResult] = useState<SearchItemProps[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [showPopper, setShowPopper] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setShowPopper(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowPopper(false);
        setSearchValue('');
        setSearchResult([]);
        setNotFound(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedValue.trim()) {
        setNotFound(false);
        try {
          const res = await searchCoin(debouncedValue);
          if (res?.coins?.length === 0) {
            setNotFound(true);
          }
          const coinResults = res?.coins?.map(mapSearchResultData);
          setSearchResult(coinResults);
        } catch (error) {
          console.log(error);
        }
      } else {
        setSearchResult([]);
      }
    };

    fetchSearchResults();
  }, [debouncedValue]);

  return (
    <div className='relative w-full' ref={wrapperRef}>
      <div className='p-2.5 pl-8 bg-[var(--background-secondary)] rounded-lg relative flex-1 sm:flex-none ease-all'>
        <input
          onChange={handleChangeValue}
          value={searchValue}
          placeholder='search'
          className='outline-none text-[var(--text-secondary)] w-full box-border pr-8'
        />
        <SearchOutlined className='absolute top-1/2 left-2 transform -translate-y-1/2' />
      </div>

      {showPopper && (
        <div className='absolute top-full mt-2 right-0 sm:w-[460px] w-full'>
          <SearchPopper isNotFound={notFound} searchData={searchResult} />
        </div>
      )}
    </div>
  );
};
