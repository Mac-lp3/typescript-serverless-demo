/**
 * These types tell the response builder what values go where.
 * All main.ts functions should return an implementation of these.
 */

const ERROR_TYPE_VAL = 'ErrorPayload';

interface BasePayload {
    readonly payloadType: string;
};

export interface ErrorPayload extends BasePayload {
    readonly payloadType: 'ErrorPayload';
    summary: string;
    details: string;
    resources: string[];
};

export interface WarningPayload extends BasePayload {
    readonly payloadType: 'WarningPayload';
    metadata: any;
    [propName: string]: any;
};

export interface ResourcePayload extends BasePayload {
    readonly payloadType: 'ResourcePayload';
    metadata: any;
    [propName: string]: any;
};

interface SingleResource {
    metadata: {
        payloadType: 'Resource',
        totalLength: 1
    },
    payload: any
}

interface ListResource {
    metadata: {
        payloadType: 'ResourceList',
        totalLength: number
    },
    payload: any[]
}