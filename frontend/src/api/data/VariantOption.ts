import { isObjectOf } from '../../utils/typeGuards/isObjectOf';
import { isTypeOf } from '../../utils/typeGuards/isTypeOf';


export interface VariantOption {
    readonly id: number;
    readonly name: string;
}

export const isVariantOption = isObjectOf({
    id: isTypeOf('number'),
    name: isTypeOf('string'),
});
