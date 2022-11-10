import { isOneOf } from './isOneOf';
import { isTypeOf } from './isTypeOf';


export const isOptional = <R>(typeGuard: (value: unknown) => value is R) =>
    isOneOf(typeGuard, isTypeOf('undefined'));
