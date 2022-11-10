import { useCallback, useEffect, useRef } from 'react';
import { useQueryClient } from 'react-query';

import { QueryKey } from '../queryClient';
import { useSubmitSolution as orig } from './mutations/useSubmitSolution';
import { testingPollingInterval } from './queries/useContestAttempts';
import { TaskAttempt } from '../api/data/TaskAttempt';
import { Task } from '../api/data/Task';
import { useContest } from './useContest';
import { useTask } from './useTask';


const makeTaskTesting = (task: Task) => (data?: TaskAttempt[]): TaskAttempt[] => data
    ? data.map(ta => ta.taskEntity.id === task.id ? { ...ta, status: 'testing', errorMsg: null, resultSet: null } : ta)
    : [{ attemptId: null, taskEntity: task, count: 1, status: 'testing', errorMsg: null, resultSet: null }];

export const useSubmitSolution = (contestCode?: string, taskId?: number, solution?: string) => {
    const queryClient = useQueryClient();

    const task = useTask(contestCode, taskId);
    const contest = useContest(contestCode);
    const submitSolution = orig();

    const submitSolutionRef = useRef<() => void>();
    const promiseMapRef = useRef<Map<string, () => void>>(new Map());

    useEffect(() => {
        const toRemove: string[] = [];

        promiseMapRef.current.forEach((resolvePromise, key) => {
            const [contestCode, taskId] = JSON.parse(key);

            const tas = queryClient.getQueryData<TaskAttempt[]>([QueryKey.CONTEST_ATTEMPTS, contestCode]);

            tas?.forEach(ta => {
                if (ta.taskEntity.id === taskId && ta.status !== 'testing') {
                    resolvePromise();
                    toRemove.push(key);
                }
            });
        });

        toRemove.forEach(key => promiseMapRef.current.delete(key));
    });

    useEffect(() => {
        submitSolutionRef.current = async () => {
            if (!contestCode || !taskId || !contest || !task || solution === undefined) {
                return;
            }

            try {
                await submitSolution(contest, task, solution);

                setTimeout(() => queryClient.setQueryData([QueryKey.CONTEST_ATTEMPTS, contestCode], makeTaskTesting(task)), 1);
                setTimeout(() => queryClient.refetchQueries(QueryKey.CONTEST_ATTEMPTS), testingPollingInterval);

                return new Promise(resolve => {
                    promiseMapRef.current.set(JSON.stringify([contestCode, taskId]), resolve);
                });
            } catch (e) {
                throw e;
            }
        };
    }, [contest, task, solution, submitSolution, queryClient, contestCode, taskId]);

    return useCallback(async () => {
        if (submitSolutionRef.current) {
            await submitSolutionRef.current();
        }
    }, [submitSolutionRef]);
};
