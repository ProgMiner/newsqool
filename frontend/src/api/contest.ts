import { ContestOption, isContestOption } from './data/ContestOption';
import { isArrayOf } from '../utils/isArrayOf';
import { axios } from '../axios';


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
