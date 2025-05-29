import { SearchOutlined } from '@ant-design/icons';

export const Search = () => {
  return (
    <div className='p-2.5 pl-8 bg-[var(--background-secondary)] rounded-lg relative flex-1 sm:flex-none'>
      <input placeholder='search' className='outline-none ' />
      <SearchOutlined className='absolute top-1/2 left-2 transform -translate-y-1/2' />
    </div>
  );
};
