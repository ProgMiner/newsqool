
type Typeof<T extends string>
    = T extends 'undefined' ? undefined
    : T extends 'boolean' ? boolean
    : T extends 'number' ? number
    : T extends 'string' ? string
    : T extends 'symbol' ? symbol
    : never;

export const isTypeOf = <T extends string>(type: T) => (value: unknown): value is Typeof<T> => {
    return typeof value === type;
};
