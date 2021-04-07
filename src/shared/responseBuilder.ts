import { ProxyResult } from 'aws-lambda';
import { isAResource, isAWarning, isAnError } from '../shared/typeUtils';
import { ErrorPayload, WarningPayload, ResourceResponseBody } from '../shared/types';

/**
 * 
 * @param payload 
 * @returns
 */
export function buildResponseObject(payload: ErrorPayload | WarningPayload | ResourceResponseBody): ProxyResult {

    let body: string;
    let statusCode: number;

    if (isAnError(payload)) {
        statusCode = 404;
        body = JSON.stringify(payload);
    } else if (isAResource(payload)) {
        statusCode = 201;
        body = JSON.stringify(payload);
    } else {
        statusCode = 500;
        body = 'omg';
    }

    const response: ProxyResult = {
        statusCode: statusCode,
        body: body
    };

    return response;
};
