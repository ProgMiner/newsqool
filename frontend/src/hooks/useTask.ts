import { useContestAttempts } from './queries/useContestAttempts';
import { Task } from '../api/data/Task';


export const useTask = (contestCode?: string, taskId?: number): Task | undefined => {
    const { contestAttempts } = useContestAttempts(contestCode);

    return contestAttempts?.find(a => a.taskEntity.id === taskId)?.taskEntity;
};
