import type { JSX, LazyExoticComponent } from 'react';
import { lazy } from 'react';

import type { PageRoute } from '@/core/modules/custom-router-dom/router.interface';
import { ROUTES } from '@/core/constants/routes';

const CoinDetail: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Coin'));

const coinRoutes: PageRoute[] = [
  {
    path: ROUTES.COIN_DETAIL,
    element: CoinDetail,
  },
];

export default coinRoutes;
