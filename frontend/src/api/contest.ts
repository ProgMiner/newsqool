import { ContestOption, isContestOption } from './data/ContestOption';
import { isArrayOf } from '../utils/isArrayOf';
import { axios } from '../axios';
import { isTaskAttempt, TaskAttempt } from './data/TaskAttempt';


export const getAvailable = async (): Promise<ContestOption[]> => {
    try {
        const { data } = await axios.get('/contest/available/all');

        if (isArrayOf(isContestOption)(data)) {
            return data;
        }
    } catch (e) {
        throw e;
        // TODO
    }

    // TODO bad type
    throw new Error();
};

export const getAttempts = async (contestCode: string): Promise<TaskAttempt[]> => {
    try {
        if (!contestCode) {
            return [];
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
