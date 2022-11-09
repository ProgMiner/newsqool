
export const isOptional = <R>(typeGuard: (value: unknown) => value is R) => (value: unknown): value is R | undefined =>
    value === undefined || typeGuard(value);
