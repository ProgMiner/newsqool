import { useCallback } from 'react';
import { AxiosError } from 'axios';

import { ContestOption } from '../../api/data/ContestOption';
import { Task } from '../../api/data/Task';
import { submitSolution } from '../../api/submit';
import { apiErrorToast, useToast } from '../../toast';


export const useSubmitSolution = () => {
    const toast = useToast();

    return useCallback(async (contest: ContestOption, task: Task, solution: string) => {
        try {
            return await submitSolution(contest, task, solution);
        } catch (e) {
            if (e instanceof AxiosError) {
                apiErrorToast(toast, e);
                console.log(e);
            }
        }
    }, [toast]);
};
