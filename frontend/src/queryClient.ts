import { QueryClient } from 'react-query';


export enum QueryKey {

    AVAILABLE_CONTESTS = 'AVAILABLE_CONTESTS',
    LOGGED_IN = 'LOGGED_IN',
}

export const queryClient = new QueryClient();
