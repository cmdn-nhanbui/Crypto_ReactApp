import { http, HttpResponse } from 'msw';

import { getPaginationData } from '@/core/helpers/pagination.helper';
import { listCoin } from '@/pages/coin/data/listcoin.sample';

let SAMPLE_DATA = [...listCoin];

export const handlers = [
  http.get('https://api.coingecko.com/api/v3/coins/markets', async ({ request }) => {
    const url = new URL(request.url);
    const perPage = parseInt(url.searchParams.get('per_page') || '0', 10);
    const page = parseInt(url.searchParams.get('page') || '0', 10);

    for (let i = 0; i < 5; i++) {
      const random = Math.random() - 0.5;
      const element = SAMPLE_DATA[i];
      const priceChange = element.current_price + random;
      element.current_price = priceChange < 0 ? 0 : priceChange;
    }

    const responseData = getPaginationData(page, perPage, SAMPLE_DATA);
    return HttpResponse.json(responseData);
  }),
];
