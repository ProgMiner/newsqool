import { useCallback, useMemo } from 'react';

import { useContestAttempts } from './queries/useContestAttempts';
import { TaskAttempt } from '../api/data/TaskAttempt';
import { Task } from '../api/data/Task';


export const useTask = (contestCode?: string, taskId?: number): Task | undefined => {
    const { contestAttempts } = useContestAttempts(contestCode);

    const flt = useCallback((a: TaskAttempt) => a.taskEntity.id === taskId, [taskId]);
    const attempt = useMemo(() => contestAttempts?.find(flt), [contestAttempts, flt]);

    return useMemo(() => attempt?.taskEntity, [attempt]);
};
