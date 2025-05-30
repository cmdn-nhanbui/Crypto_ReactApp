import React from 'react';

import type { PageRoute } from '../core/modules/custom-router-dom/router.interface';
import homeRoutes from './home/home.routes';
import errorRoutes from './error/error.routes';
import coinRoutes from './coin/coin.routes';

const Page = React.lazy(() => import('./Page'));

const pageRoutes: PageRoute[] = [
  {
    path: '/',
    element: Page,
    children: [...homeRoutes, ...coinRoutes, ...errorRoutes],
  },
];

export default pageRoutes;
