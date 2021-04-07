import { ErrorPayload, ResourceResponseBody, WarningPayload } from './types'

export function isAnError(obj: any): obj is ErrorPayload {
    return (obj as ErrorPayload).payloadType === 'ErrorPayload';
};

export function isAWarning(obj: any): obj is WarningPayload {
    return (obj as WarningPayload).payloadType === 'WarningPayload';
};

export function isAResource(obj: any): obj is ResourceResponseBody {
    return (obj as ResourceResponseBody).metadata.payloadType === 'Resource' || (obj as ResourceResponseBody).metadata.payloadType === 'ResourceList';
};