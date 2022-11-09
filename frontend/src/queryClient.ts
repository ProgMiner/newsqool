import { QueryClient } from 'react-query';


export enum QueryKey {
    ATTEMPTS_CONTEST = 'ATTEMPTS_CONTEST',
    AVAILABLE_CONTESTS = 'AVAILABLE_CONTESTS',
    LOGGED_IN = 'LOGGED_IN',
}

export const queryClient = new QueryClient();
