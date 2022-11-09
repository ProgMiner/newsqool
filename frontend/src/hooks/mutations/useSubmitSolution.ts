import { useCallback } from 'react';

import { ContestOption } from '../../api/data/ContestOption';
import { Task } from '../../api/data/Task';
import { submitSolution } from '../../api/submit';


export const useSubmitSolution = () => {
    return useCallback((contest: ContestOption, task: Task, solution: string) => {
        return submitSolution(contest, task, solution);
        // TODO
    }, []);
};
