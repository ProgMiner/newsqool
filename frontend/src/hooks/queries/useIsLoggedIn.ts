import { useQuery } from 'react-query';

import { QueryKey } from '../../queryClient';
import { getAvailable } from '../../api/contest';


export interface UseIsLoggedInResult {
    isLoggedIn?: boolean;
    isLoading: boolean;
}

export const useIsLoggedIn = (): UseIsLoggedInResult => {
    const { isFetched, isLoading } = useQuery(QueryKey.AVAILABLE_CONTESTS, getAvailable, {
        retry: false,
    });

    return { isLoggedIn: isFetched, isLoading };
};
