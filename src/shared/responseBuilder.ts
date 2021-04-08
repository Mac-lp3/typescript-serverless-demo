import { ProxyResult } from 'aws-lambda';
import { isAResource, isAWarning, isAnError } from '../shared/typeUtils';
import { ErrorPayload, WarningPayload, ResourceResponseBody } from '../shared/types';

/**
 * 
 * @param payload 
 * @returns
 */
export function buildResponseObject(respBody: ErrorPayload | WarningPayload | ResourceResponseBody): ProxyResult {

    let body: string;
    let statusCode: number;

    if (isAnError(respBody)) {

        statusCode = 501;
        body = JSON.stringify(respBody);

    } else if (isAResource(respBody)) {

        statusCode = respBody.metadata.totalLength > 0 ? 201 : 404;
        body = JSON.stringify(respBody);

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
