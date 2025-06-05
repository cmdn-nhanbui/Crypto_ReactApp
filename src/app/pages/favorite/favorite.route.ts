import type { JSX, LazyExoticComponent } from 'react';
import { lazy } from 'react';

import type { PageRoute } from '@/core/modules/custom-router-dom/router.interface';
import { ROUTES } from '@/core/constants/routes';

const Favorite: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./containers/Favorite'));

const favoriteRoutes: PageRoute[] = [
  {
    path: ROUTES.FAVORITE,
    element: Favorite,
  },
];

export default favoriteRoutes;
