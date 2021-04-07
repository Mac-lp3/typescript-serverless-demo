import { ResourceResponseBody } from './types';

/**
 * Returns a response body based on the result of a MariaDB query.
 * 
 * This method is to be used for both single object queries as well as INSERT, etc responses.
 * 
 * Written based on MariaDB NodeJS api. See: [
 *   https://mariadb.com/kb/en/connector-nodejs-promise-api/#json-result-sets,
 *   https://mariadb.com/kb/en/connector-nodejs-promise-api/#array-result-sets
 * ]
 * @param rawDbData a MariaDB JSON result set. See the linked documentation above.
 * @param fyiMessage Optional. Not used ATM.
 */
export function buildInstanceResponseBody(rawDbData: Object | Object[], fyiMessage?: string) {

    // TODO: pattern for an FYI message that conforms with error/warning payloads
    // length can be == 0 while totalResuts > 0 (eg: over page). Should it be a WarningPayload?

    // TODO: can this work for post/put/deletes?
    // atm, forcing the end user to know what has to get passed in.

    let responseBody: ResourceResponseBody = {
        metadata: {
            payloadType: 'Resource',
            totalLength: 1
        },
        payload: {}
    }

    if (Array.isArray(rawDbData)) {

        responseBody.payload = convertPayloadToCamel(rawDbData)[0];

    } else {
        // TODO JSON object containing status of the query
    }

    return responseBody;

}

/**
 * Returns a response body based on the result of a MariaDB query.
 * 
 * Written based on MariaDB NodeJS api. See: [
 *   https://mariadb.com/kb/en/connector-nodejs-promise-api/#array-result-sets
 * ]
 * @param rawDbData A MariaDB ARRAY result set. See the linked documentation above.
 * @param totalResults Number of objects in the DB that meet the query terms.
 * @param fyiMessage Optional. Not used ATM.
 */
export function buildListResponseBody(rawDbData: Object[], totalResults: number, fyiMessage?: string) {

    // TODO: pattern for an FYI message that conforms with error/warning payloads
    // length can be == 0 while totalResuts > 0 (eg: over page). Should it be a WarningPayload?

    let responseBody: ResourceResponseBody = {
        metadata: {
            payloadType: 'ResourceList',
            totalLength: totalResults
        },
        payload: convertPayloadToCamel(rawDbData)
    }

    return responseBody;
}

function convertPayloadToCamel(payload: Object[]) {

    const snakeToCamelKeyMap: any = {};
    Object.keys(payload[0]).forEach( k => {
        snakeToCamelKeyMap[k] = k.replace(/([_]\w)/g, g => g[1].toUpperCase());
    });

    const camelPayload: any[] = [];
    payload.forEach(snakeKeyObject => {

        camelPayload.push(
            convertToCamelCase(snakeKeyObject, snakeToCamelKeyMap)
        );

    })

    return camelPayload

}

function convertToCamelCase(snakeKeyObject: Object, snakeToCamelKeyMap: any) {

    const camelKeyObject: any = {};
    for( const [key, val] of Object.entries(snakeKeyObject) ) {
        camelKeyObject[snakeToCamelKeyMap[key]] = val;
    }
    return camelKeyObject;

}