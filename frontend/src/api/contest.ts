import { ContestOption, isContestOption } from './data/ContestOption';
import { isArrayOf } from '../utils/typeGuards/isArrayOf';
import { axios } from '../axios';
import { isTaskAttempt, TaskAttempt } from './data/TaskAttempt';


export const getAvailable = async (): Promise<ContestOption[]> => {
    const { data } = await axios.get('/contest/available/all');

    if (isArrayOf(isContestOption)(data)) {
        return data;
    }

    throw new Error('type check failed');
};

export const getAttempts = async (contestCode?: string): Promise<TaskAttempt[] | undefined> => {
    try {
        if (!contestCode) {
            return;
        }

        const { data } = await axios.get('/contest/attempts', {
            params: { contest_code: contestCode }
        });

        if (isArrayOf(isTaskAttempt)(data)) {
            return data;
        }
    } catch (e) {
        throw e;
    }
    throw new Error();
};
