import { useQuery } from 'react-query';
import { AxiosError } from 'axios';

import { QueryKey } from '../../queryClient';
import { getAvailable } from '../../api/contest';
import { apiErrorToast, useToast } from '../../toast';


export interface UseIsLoggedInResult {
    isLoggedIn?: boolean;
    isLoading: boolean;
}

export const useIsLoggedIn = (): UseIsLoggedInResult => {
    const toast = useToast();

    const { isSuccess, isLoading } = useQuery(QueryKey.AVAILABLE_CONTESTS, getAvailable, {
        onError: err => {
            if (err instanceof AxiosError) {
                apiErrorToast(toast, err);
                console.log(err);
            }
        },
    });

    return { isLoggedIn: isSuccess, isLoading };
};
