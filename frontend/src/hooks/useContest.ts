import { useCallback, useMemo } from 'react';

import { useAvailableContests } from './queries/useAvailableContests';
import { ContestOption } from '../api/data/ContestOption';


export const useContest = (contestCode?: string): ContestOption | undefined => {
    const { availableContests } = useAvailableContests();

    const flt = useCallback((c: ContestOption) => c.code === contestCode, [contestCode]);

    return useMemo(() => availableContests?.find(flt), [availableContests, flt]);
};
