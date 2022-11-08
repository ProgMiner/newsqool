import { isVariantPolicy, VariantPolicy } from './VariantPolicy';
import { isVariantOption, VariantOption } from './VariantOption';
import { isObjectOf } from '../../utils/isObjectOf';
import { isTypeOf } from '../../utils/isTypeOf';
import { isArrayOf } from '../../utils/isArrayOf';
import { isOptional } from '../../utils/isOptional';


export interface ContestOption {
    readonly code: string;
    readonly name: string;
    readonly variantPolicy: VariantPolicy;
    readonly variants: VariantOption[];
    readonly chosenVariant?: VariantOption;
}

export const isContestOption = isObjectOf({
    code: isTypeOf('string'),
    name: isTypeOf('string'),
    variantPolicy: isVariantPolicy,
    variants: isArrayOf(isVariantOption),
    chosenVariant: isOptional(isVariantOption),
});
