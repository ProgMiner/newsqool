import { QueryClient } from 'react-query';


export enum QueryKey {
    CONTEST_ATTEMPTS = 'CONTEST_ATTEMPTS',
    AVAILABLE_CONTESTS = 'AVAILABLE_CONTESTS',
    SCHEMA = 'SCHEMA',
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            staleTime: Infinity,
            refetchInterval: false,
            refetchOnWindowFocus: false,
        }
    }
});
