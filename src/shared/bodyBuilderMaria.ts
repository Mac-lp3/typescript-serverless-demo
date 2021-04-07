import { ErrorPayload, ResourcePayload, WarningPayload } from './types';

/**
 * Returns a response body based on the result of a MariaDB query.
 * 
 * Written based on MariaDB NodeJS api. See: [
 *   https://mariadb.com/kb/en/connector-nodejs-promise-api/#json-result-sets
 * ]
 * @param rawDbData a MariaDB JSON result set. See the linked documentation above.
 */
export function buildSingleResponseBody(rawDbData: Object) {

    /*

     */
    let responseBody: ErrorPayload | WarningPayload | ResourcePayload;

}

/**
 * Returns a response body based on the result of a MariaDB query.
 * 
 * Written based on MariaDB NodeJS api. See: [
 *   https://mariadb.com/kb/en/connector-nodejs-promise-api/#array-result-sets
 * ]
 * @param rawDbData a MariaDB ARRAY result set. See the linked documentation above.
 * @param totalResults number of objects in the DB that meet the query terms.
 */
export function buildListResponseBody(rawDbData: Object[], totalResults: number) {

    let responseBody: any;//: ErrorPayload | WarningPayload | ResourcePayload;
    if (rawDbData.length > 0) {

        responseBody = {
            metadata: {
                payloadType: 'ResourceList',
                totalResults: totalResults
            },
            payload: []
        }

        const snakeToCamelKeyMap: any = {};
        Object.keys(rawDbData[0]).forEach( k => {
            snakeToCamelKeyMap[k] = k.replace(/([_]\w)/g, g => g[1].toUpperCase());
        });

        let camelKeyObject: any = {};
        rawDbData.forEach(snakeKeyObject => {
            
            for( const [key, val] of Object.entries(snakeKeyObject) ) {
                camelKeyObject[snakeToCamelKeyMap[key]] = val;
            }
            responseBody.payload.push(camelKeyObject);
            camelKeyObject = {};

        })

    }

    return responseBody;
}
