import { useAvailableContests } from './useAvailableContests';


export const useContestName = (contestCode?: string) => {
    const { availableContests } = useAvailableContests();

    return contestCode && availableContests?.find(c => c.code === contestCode)?.name;
};
