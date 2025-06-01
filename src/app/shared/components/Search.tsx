import { SearchOutlined } from '@ant-design/icons';

export const Search = () => {
  return (
    <div className='p-2.5 pl-8 bg-[var(--background-secondary)] rounded-lg relative flex-1 sm:flex-none ease-all'>
      <input placeholder='search' className='outline-none text-[var(--text-secondary)] w-full box-border pr-8' />
      <SearchOutlined className='absolute top-1/2 left-2 transform -translate-y-1/2' />
    </div>
  );
};
