import { useQuery } from 'react-query';

import { ContestOption } from '../../api/data/ContestOption';
import { QueryKey } from '../../queryClient';
import { getAvailable } from '../../api/contest';


export interface UseAvailableContestsResult {
    availableContests?: ContestOption[];
    isLoading: boolean;
}

export const useAvailableContests = (): UseAvailableContestsResult => {
    const { data: availableContests, isLoading } = useQuery(QueryKey.AVAILABLE_CONTESTS, getAvailable);

    return { availableContests, isLoading };
};
