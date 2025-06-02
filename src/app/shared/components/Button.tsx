import clsx from 'clsx';
import type { ButtonProps } from '@/core/constants/types';

const colorData = {
  primary: 'bg-[var(--green-primary)]  border-[var(--green-primary)] text-white hover:bg-[#35af00]',
  secondary: 'bg-white hover:bg-[#f1f5f9] bg-white  border-[var(--background-secondary)]',
  warning: 'text-white bg-[var(--red-primary)]',
  yellow: 'text-[var(--yellow-primary)] border-[var(--yellow-primary)]',
};

export const Button = ({ children, onClick, className, color = 'secondary', disable = false }: ButtonProps) => {
  const colorClass = color ? colorData[color] : '';

  const buttonClasses = clsx(
    'py-1.5 px-2.5 text-xs font-semibold  border-t-2 border-2 rounded-lg',
    colorClass,
    {
      'cursor-default': disable,
      'cursor-pointer': !disable,
    },
    className,
  );

  return (
    <button disabled={disable} className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};
