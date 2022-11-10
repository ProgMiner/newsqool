
type TypeGuardType<T = unknown> = (value: unknown) => value is T;
type TypeGuardsRecordType = Record<string, TypeGuardType>;

type CheckedType<T extends TypeGuardsRecordType> = {
    [K in keyof T]: T[K] extends TypeGuardType<infer R> ? R : never;
}

export const isObjectOf = <T extends TypeGuardsRecordType>(typeGuards: T) => (value: unknown): value is CheckedType<T> => {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    const v = value as Record<string, unknown>;
    for (const [f, tg] of Object.entries(typeGuards)) {
        if (!tg(v[f])) {
            return false;
        }
    }

    return true;
};
