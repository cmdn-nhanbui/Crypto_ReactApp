import { createContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import type { FavoriteCoin } from '@/core/constants/types';
import { getLS, LS_KEYS, setLS } from '@/core/helpers/storage.helper';

type storageValueProps = {
  favoriteCoins: FavoriteCoin[];
  setFavoriteCoins: Dispatch<SetStateAction<FavoriteCoin[]>>;
};

const defaultValue: storageValueProps = {
  favoriteCoins: [],
  setFavoriteCoins: () => {},
};

export const Storage = ({ children }: { children: ReactNode }) => {
  const [favoriteCoins, setFavoriteCoins] = useState<FavoriteCoin[]>([]);

  const value: storageValueProps = {
    favoriteCoins,
    setFavoriteCoins: setFavoriteCoins,
  };

  const saveCartToLocalStorage = (): void => {
    const cartJSON = JSON.stringify(favoriteCoins);
    setLS(LS_KEYS.FAV_COINS, cartJSON);
  };

  const loadCartFromLocalStorage = (): void => {
    const cartValue = getLS(LS_KEYS.FAV_COINS);

    if (cartValue) {
      try {
        const localCartData: FavoriteCoin[] = JSON.parse(cartValue);
        if (Array.isArray(localCartData)) {
          setFavoriteCoins(localCartData);
        }
      } catch (error) {
        console.log(error);
        setFavoriteCoins([]);
      }
    }
  };

  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);

  useEffect(() => {
    saveCartToLocalStorage();
  }, [favoriteCoins]);

  return <StorageContext.Provider value={value}>{children}</StorageContext.Provider>;
};

export const StorageContext = createContext(defaultValue);
