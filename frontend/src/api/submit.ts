import { axios } from '../axios';
import { Task } from './data/Task';
import { ContestOption } from './data/ContestOption';
import { solutionBuilder } from './data/Solution';


export const submitSolution = async (contest: ContestOption, task: Task, solution: string): Promise<number> => {
    const { status } = await axios.post('/submit.do', solutionBuilder(contest, task, solution), {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return status;
};
