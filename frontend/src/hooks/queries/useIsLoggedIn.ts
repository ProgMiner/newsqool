import { useQuery } from 'react-query';

import { QueryKey } from '../../queryClient';
import { getAvailable } from '../../api/contest';


export interface UseIsLoggedInResult {
    isLoggedIn?: boolean;
    isLoading: boolean;
}

const isLoggedIn = async (): Promise<boolean> => {
    try {
        await getAvailable();
        console.log(true);
        return true;
    } catch (e) {
        console.log(false);
        return false;
    }
};

export const useIsLoggedIn = (): UseIsLoggedInResult => {
    const { data, isLoading } = useQuery(QueryKey.LOGGED_IN, isLoggedIn);

    return { isLoggedIn: data, isLoading };
};
