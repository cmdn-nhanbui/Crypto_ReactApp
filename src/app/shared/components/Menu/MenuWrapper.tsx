import { THEME } from '@/core/constants/theme';
import { useTheme } from '@/shared/hooks/useTheme';
import type { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
};

export const MenuWrapper = ({ children }: Props) => {
  const { theme } = useTheme();

  const classes = clsx(
    'mt-2 origin-top-left rounded-md shadow-lg w-56 p-2 z-[2000] border border-[var(--border-primary)]',
    {
      dark: theme === THEME.DARK,
      'bg-[var(--background-secondary)]': theme === THEME.DARK,
      'bg-[var(--background)]': theme === THEME.LIGHT,
    },
  );
  return <ul className={classes}>{children}</ul>;
};
