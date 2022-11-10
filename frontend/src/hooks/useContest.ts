import { useAvailableContests } from './queries/useAvailableContests';
import { ContestOption } from '../api/data/ContestOption';


export const useContest = (contestCode?: string): ContestOption | undefined => {
    const { availableContests } = useAvailableContests();

    return availableContests?.find(c => c.code === contestCode);
};
