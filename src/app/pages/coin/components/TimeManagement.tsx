import { useState } from 'react';
import { TIME_MODES, type TimeManagementProps } from '@/core/constants/types';

export const TimeManagement = ({ onChange, value }: TimeManagementProps) => {
  const [mode, setMode] = useState<string>(value || '24h');
  const handleChangeMode = (id: string) => {
    setMode(id);
    if (onChange) return onChange(id);
  };
  return (
    <div className='bg-[var(--background-secondary)] p-1 rounded-lg w-fit'>
      {TIME_MODES?.map((item, index) => (
        <button
          onClick={() => handleChangeMode(item?.id)}
          key={index}
          className={`min-w-10 py-1 px-2.5 rounded-lg cursor-pointer ${mode === item?.id && 'bg-white'}`}
        >
          <span
            className={`${
              mode === item?.id ? 'text-gray-700' : 'text-[var(--text-primary)]'
            } font-semibold text-sm leading-5`}
          >
            {item?.name}
          </span>
        </button>
      ))}
    </div>
  );
};
