import { THEME } from '@/core/constants/theme';
import { useTheme } from '@/shared/hooks/useTheme';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const MenuWrapper = ({ children }: Props) => {
  const { theme } = useTheme();
  const background = theme === THEME.DARK ? '--background-secondary' : '--background';
  return (
    <ul
      className={`bg-[var(${background})] mt-2 origin-top-left rounded-md shadow-lg w-56 p-2 z-[2000] border border-[var(--border-primary)]`}
    >
      {children}
    </ul>
  );
};
