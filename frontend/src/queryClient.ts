import { QueryClient } from 'react-query';
import { AxiosError } from 'axios';


export enum QueryKey {
    CONTEST_ATTEMPTS = 'CONTEST_ATTEMPTS',
    AVAILABLE_CONTESTS = 'AVAILABLE_CONTESTS',
    SCHEMA = 'SCHEMA',
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (fails, error) => error instanceof AxiosError && !!error.response
                && (error.response.status === 502 || error.response.status === 504),
            staleTime: Infinity,
            refetchInterval: false,
            refetchOnWindowFocus: false,
        }
    }
});
