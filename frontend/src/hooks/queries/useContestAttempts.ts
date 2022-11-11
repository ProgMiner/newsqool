import { useQuery } from 'react-query';
import { AxiosError } from 'axios';

import { QueryKey } from '../../queryClient';
import { getAttempts } from '../../api/contest';
import { TaskAttempt } from '../../api/data/TaskAttempt';
import { apiErrorToast, useToast } from '../../toast';


export interface UseAttemptsContestsResult {
    contestAttempts?: TaskAttempt[];
    isLoading: boolean;
}

export const testingPollingInterval = 3000;

const refetchInterval = (contestAttempts?: TaskAttempt[]): number | false => {
    if (!contestAttempts) {
        return false;
    }

    return contestAttempts.some(a => a.status === 'testing') ? testingPollingInterval : false;
};

export const useContestAttempts = (contestCode?: string): UseAttemptsContestsResult => {
    const toast = useToast();

    const { data: contestAttempts, isLoading } = useQuery(
        [QueryKey.CONTEST_ATTEMPTS, contestCode],
        () => getAttempts(contestCode),
        {
            refetchInterval,
            onError: err => {
                if (err instanceof AxiosError) {
                    apiErrorToast(toast, err);
                    console.log(err);
                }
            },
        },
    );

    return { contestAttempts, isLoading };
};
