import clsx from 'clsx';
import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  color?: 'primary' | 'warning' | 'secondary';
  disable?: boolean;
};

const colorData = {
  primary:
    'bg-[var(--green-primary)] shadow-[0_4px_0_0_#35af00]  border-[var(--green-primary)] text-white hover:bg-[#35af00]',
  secondary: 'bg-white hover:bg-[#f1f5f9] bg-white shadow-[0_4px_0_0_#cbd5e1] border-[var(--background-secondary)]',
  warning: 'text-white bg-[var(--red-primary)]',
};

export const Button = ({ children, onClick, className, color = 'secondary', disable = false }: ButtonProps) => {
  const colorClass = color ? colorData[color] : '';

  const buttonClasses = clsx(
    'py-1.5 px-2.5 text-xs font-semibold  border-t-2 border-l-2 border-r-2 rounded-lg mb-1',
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
