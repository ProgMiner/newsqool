import VariantDTO from './VariantDTO';


export default class ContestDTO {
    code?: string;
    name?: string;
    variantPolicy?: string;
    variants?: Array<VariantDTO>;
    chosenVariant?: VariantDTO;
}