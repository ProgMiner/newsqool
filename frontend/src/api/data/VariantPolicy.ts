

export enum VariantPolicy {

    ANY = 'ANY',
    RANDOM = 'RANDOM',
    ALL = 'ALL',
}

export const isVariantPolicy = (value: unknown): value is VariantPolicy =>
    Object.keys(VariantPolicy).some(v => v === value);
