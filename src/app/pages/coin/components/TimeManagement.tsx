import { useState } from 'react';

type Props = {
  value: (typeof TIME_MODES)[number]['id'];
  onChange?: (id: string) => void;
};

const TIME_MODES = [
  {
    name: '1h',
    id: '1h',
  },
  {
    name: '24h',
    id: '24h',
  },
  {
    name: '7d',
    id: '7d',
  },
];

export const TimeManagement = ({ onChange, value }: Props) => {
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
