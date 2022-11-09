import { isObjectOf } from '../../utils/isObjectOf';
import { isTypeOf } from '../../utils/isTypeOf';


export interface VariantOption {
    readonly id: number;
    readonly name: string;
}

export const isVariantOption = isObjectOf({
    id: isTypeOf('number'),
    name: isTypeOf('string'),
});
