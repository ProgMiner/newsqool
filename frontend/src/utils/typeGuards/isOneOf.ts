

type TypeGuardType<T = unknown> = (value: unknown) => value is T;

type CheckedType<T extends TypeGuardType[]>
    = T extends [] ? false
    : T extends [TypeGuardType<infer R>] ? R
    : T extends [TypeGuardType<infer R>, ...infer X] ? X extends TypeGuardType[] ? R | CheckedType<X> : never
    : never;

export const isOneOf = <T extends TypeGuardType[]>(...typeGuards: T) => (value: unknown): value is CheckedType<T> =>
    typeGuards.some(tg => tg(value));
