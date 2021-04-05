import { ErrorPayload, ResourcePayload, WarningPayload } from './types'

export function isAnError(obj: any): obj is ErrorPayload {
    return (obj as ErrorPayload).payloadType === 'ErrorPayload';
};

export function isAWarning(obj: any): obj is WarningPayload {
    return (obj as WarningPayload).payloadType === 'WarningPayload';
};

export function isAResource(obj: any): obj is ResourcePayload {
    return (obj as ResourcePayload).payloadType === 'ResourcePayload';
};