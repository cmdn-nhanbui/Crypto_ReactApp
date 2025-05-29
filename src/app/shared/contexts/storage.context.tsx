import { createContext, type ReactNode } from 'react';

type storageValueProps = {};

const defaultValue: storageValueProps = {};

export const Storage = ({ children }: { children: ReactNode }) => {
  const value: storageValueProps = {};
  return <StorageContext.Provider value={value}>{children}</StorageContext.Provider>;
};

export const StorageContext = createContext(defaultValue);
