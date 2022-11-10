import { isObjectOf } from '../../utils/typeGuards/isObjectOf';
import { isTypeOf } from '../../utils/typeGuards/isTypeOf';
import { isOneOf } from '../../utils/typeGuards/isOneOf';
import { isNull } from '../../utils/typeGuards/isNull';


export interface Task {
    readonly id: number;
    readonly name: string;
    readonly signatureJson: string | null;
    readonly description: string | null;
    readonly score: number;
    readonly authorName: string;
    readonly difficulty: number;
    readonly schemaId: number;
}

export const isTask = isObjectOf({
    id: isTypeOf('number'),
    name: isTypeOf('string'),
    signatureJson: isOneOf(isTypeOf('string'), isNull),
    description: isOneOf(isTypeOf('string'), isNull),
    score: isTypeOf('number'),
    authorName: isTypeOf('string'),
    difficulty: isTypeOf('number'),
    schemaId: isTypeOf('number')
});
