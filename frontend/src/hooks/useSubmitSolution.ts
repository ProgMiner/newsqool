import { useCallback, useEffect, useRef } from 'react';
import { useQueryClient } from 'react-query';

import { QueryKey } from '../queryClient';
import { useSubmitSolution as orig } from './mutations/useSubmitSolution';
import { testingPollingInterval } from './queries/useContestAttempts';
import { useContest } from './useContest';
import { useTask } from './useTask';


export const useSubmitSolution = (contestCode?: string, taskId?: number, solution?: string) => {
    const queryClient = useQueryClient();

    const task = useTask(contestCode, taskId);
    const contest = useContest(contestCode);
    const submitSolution = orig();

    const submitSolutionRef = useRef<() => void>();

    useEffect(() => {
        submitSolutionRef.current = async () => {
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
        };
    }, [contest, task, solution, submitSolution, queryClient]);

    return useCallback(async () => {
        if (submitSolutionRef.current) {
            await submitSolutionRef.current();
        }
    }, [submitSolutionRef]);
};
