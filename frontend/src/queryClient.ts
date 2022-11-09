import { QueryClient } from 'react-query';


export enum QueryKey {
    ATTEMPTS_CONTEST = 'ATTEMPTS_CONTEST',
    AVAILABLE_CONTESTS = 'AVAILABLE_CONTESTS',
    SCHEMA = 'SCHEMA',
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchInterval: false,
            refetchOnWindowFocus: false,
        }
    }
});
