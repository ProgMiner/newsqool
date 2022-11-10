import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import { useSubmitSolution as orig } from './mutations/useSubmitSolution';
import { useContest } from './useContest';
import { useTask } from './useTask';
import { QueryKey } from '../queryClient';
import { testingPollingInterval } from './queries/useContestAttempts';


export const useSubmitSolution = (contestCode?: string, taskId?: number, solution?: string) => {
    const queryClient = useQueryClient();

    const task = useTask(contestCode, taskId);
    const contest = useContest(contestCode);
    const submitSolution = orig();

    return useCallback(async () => {
        if (!contest || !task || solution === undefined) {
            return;
        }

        try {
            await submitSolution(contest, task, solution);
            setTimeout(() => queryClient.refetchQueries(QueryKey.CONTEST_ATTEMPTS), testingPollingInterval);

            // TODO resolve promise only when answer come
        } catch (e) {
            throw e;
        }
    }, [contest, task, solution, submitSolution, queryClient]);
};
