export const THEME = {
  BUTTON: {
    BASE: 'py-1.5 px-2.5 text-xs font-semibold  border-t-2 border-2 rounded-lg',
    VARIANT: {
      CONTAINED: '',
      TEXT: 'border-none',
      OUTLINED: 'bg-transparent',
    },
    COLOR: {
      PRIMARY: 'bg-[var(--green-primary)]  border-[var(--green-primary)] text-white hover:bg-[#35af00]',
      SECONDARY: 'bg-white hover:bg-[#f1f5f9] bg-white  border-[var(--background-secondary)]',
      YELLOW: 'text-[var(--yellow-primary)] border-[var(--yellow-primary)]',
      WARNING: 'text-white bg-[var(--red-primary)]',
      TRANSPARENT: 'bg-transparent text-[var(--text-primary)]',
    },
    ROUNDED: 'rounded-lg',
  },
  DARK: 'dark',
  LIGHT: 'light',
} as const;
