import { createContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { getLS, LS_KEYS, setLS } from '@/core/helpers/storage.helper';
import { THEME } from '@/core/constants/theme';

type THEME_MODE = (typeof THEME)['DARK' | 'LIGHT'];

type themeValueProps = {
  theme: THEME_MODE;
  setTheme: Dispatch<SetStateAction<THEME_MODE>>;
};

const defaultValue: themeValueProps = {
  theme: 'light',
  setTheme: () => {},
};

export const Theme = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<THEME_MODE>(THEME.LIGHT);

  const value: themeValueProps = {
    theme,
    setTheme,
  };

  useEffect(() => {
    const theme = getLS(LS_KEYS.THEME);

    if (theme === THEME.DARK || theme === THEME.LIGHT) return setTheme(theme);

    setTheme('light');
  }, []);

  useEffect(() => {
    setLS(LS_KEYS.THEME, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <div className={`app ${value.theme} bg-[var(--background)] ease-all`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const ThemeContext = createContext(defaultValue);
