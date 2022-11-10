import { useQuery } from 'react-query';
import { AxiosError } from 'axios';

import { ContestOption } from '../../api/data/ContestOption';
import { QueryKey } from '../../queryClient';
import { getAvailable } from '../../api/contest';
import { apiErrorToast, useToast } from '../../toast';


export interface UseAvailableContestsResult {
    availableContests?: ContestOption[];
    isLoading: boolean;
}

export const useAvailableContests = (): UseAvailableContestsResult => {
    const toast = useToast();

    const { data: availableContests, isLoading } = useQuery(QueryKey.AVAILABLE_CONTESTS, getAvailable, {
        onError: err => {
            if (err instanceof AxiosError) {
                apiErrorToast(toast, err);
                console.log(err);
            }
        },
    });

    return { availableContests, isLoading };
};
