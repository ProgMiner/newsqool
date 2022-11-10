import { useQuery } from 'react-query';

import { QueryKey } from '../../queryClient';
import { getAttempts } from '../../api/contest';
import { TaskAttempt } from '../../api/data/TaskAttempt';


export interface UseAttemptsContestsResult {
    attemptsContest?: TaskAttempt[];
    isLoading: boolean;
}

export const useAttemptsContest = (contestCode?: string): UseAttemptsContestsResult => {
    const { data: attemptsContest, isLoading } = useQuery(
        [QueryKey.ATTEMPTS_CONTEST, contestCode],
        () => getAttempts(contestCode),
    );

    return { attemptsContest, isLoading };
};
