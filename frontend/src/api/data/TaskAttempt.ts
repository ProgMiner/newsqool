import { isTask, Task } from './Task';
import { isObjectOf } from '../../utils/typeGuards/isObjectOf';
import { isTypeOf } from '../../utils/typeGuards/isTypeOf';
import { isOneOf } from '../../utils/typeGuards/isOneOf';
import { isNull } from '../../utils/typeGuards/isNull';


export interface TaskAttempt {
    readonly attemptId: string | null;
    readonly taskEntity: Task;
    readonly count: number;
    readonly status: string | null;
    readonly errorMsg: string | null;
    readonly resultSet: string | null;
}

export const isTaskAttempt = isObjectOf({
    attemptId: isOneOf(isTypeOf('string'), isNull),
    taskEntity: isTask,
    count: isTypeOf('number'),
    status: isOneOf(isTypeOf('string'), isNull),
    errorMsg: isOneOf(isTypeOf('string'), isNull),
    resultSet: isOneOf(isTypeOf('string'), isNull),
});
