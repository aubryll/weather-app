
import {QueryClient} from '@tanstack/react-query';



export const STALE_TIME = 5 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      staleTime: STALE_TIME,
      enabled: false,
      networkMode: 'offlineFirst',
      maxPages: 1,
    },
  },
});




