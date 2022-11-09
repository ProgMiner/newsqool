
export const isArrayOf = <R>(typeGuard: (value: unknown) => value is R) => (value: unknown): value is R[] =>
    Array.isArray(value) && value.every(typeGuard);
