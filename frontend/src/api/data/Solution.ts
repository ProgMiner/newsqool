import { Task } from './Task';
import { ContestOption } from './ContestOption';


export interface Solution {
    readonly 'task-id': number;
    readonly 'task-name': string;
    readonly solution: string;
    readonly 'contest-id': string | number;
    readonly 'variant-id': string | number;
    readonly 'variant-name': string;
}

export const solutionBuilder = (contest: ContestOption, task: Task, solution: string): Solution => {
    return {
        'task-id': task.id,
        'task-name': task.name,
        solution: solution,
        'contest-id': contest.code,
        'variant-id': contest.chosenVariant?.id || '',
        'variant-name': contest.chosenVariant?.name || '',
    };
};
