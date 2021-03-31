/**
 * These types tell the response builder what values go where.
 * All main.ts functions should return an implementation of these.
 */

const ERROR_TYPE_VAL = 'ErrorPayload';

export interface BasePayload {};
export interface ErrorPayload extends BasePayload {
    type: 'ErrorPayload';
};
export interface WarningPayload extends BasePayload {
    type: 'WarningPayload';
};
export interface ResourcePayload extends BasePayload {
    type: 'ResourcePayload';
};

/**
 * type util functions.
 */
export function isAnError(obj: BasePayload): obj is ErrorPayload {
    return (obj as ErrorPayload).type === 'ErrorPayload';
};

export function isAWarning(obj: BasePayload): obj is WarningPayload {
    return (obj as WarningPayload).type === 'WarningPayload';
};

export function isAResource(obj: BasePayload): obj is ResourcePayload {
    return (obj as ResourcePayload).type === 'ResourcePayload';
};
