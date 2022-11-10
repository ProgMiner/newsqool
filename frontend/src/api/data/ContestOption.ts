import { isVariantPolicy, VariantPolicy } from './VariantPolicy';
import { isVariantOption, VariantOption } from './VariantOption';
import { isObjectOf } from '../../utils/typeGuards/isObjectOf';
import { isTypeOf } from '../../utils/typeGuards/isTypeOf';
import { isArrayOf } from '../../utils/typeGuards/isArrayOf';
import { isOneOf } from '../../utils/typeGuards/isOneOf';
import { isNull } from '../../utils/typeGuards/isNull';


export interface ContestOption {
    readonly code: string;
    readonly name: string;
    readonly variantPolicy: VariantPolicy;
    readonly variants: VariantOption[];
    readonly chosenVariant: VariantOption | null;
}

export const isContestOption = isObjectOf({
    code: isTypeOf('string'),
    name: isTypeOf('string'),
    variantPolicy: isVariantPolicy,
    variants: isArrayOf(isVariantOption),
    chosenVariant: isOneOf(isVariantOption, isNull),
});
