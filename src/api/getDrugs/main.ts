import { readDrug } from '../../shared/mariaDao';
import { ErrorPayload, WarningPayload, ResourcePayload } from '../../shared/types';
import { buildSingleResponseBody, buildListResponseBody } from '../../shared/bodyBuilderMaria';

/**
 * 1. ??? Delegates to the approprate DB call. (how is that different than the handler?)
 * X. ??? any input validation?
 * 2. Delegates to the DB specific body builder
 * 3. Handles any low-level exceptions
 * 
 * @param id 
 * @param ndc 
 * @param rxcui 
 * @param searchTerm 
 * @returns 
 */
export async function getDrugs(id?: string, ndc?: string, rxcui?: string, searchTerm?: string): Promise<ErrorPayload | WarningPayload | ResourcePayload> {

    let payload: ErrorPayload | WarningPayload | ResourcePayload;
    if (id) {

        // TODO try/catch/exception
        const numericID: number = Number(id);
        const rawDbData = await readDrug(numericID);

        if (rawDbData.length === 1) {
            payload = {
                payloadType: 'ResourcePayload',
                metadata: {
                    totalResults: 1
                }
            }
            for (const [key, value] of Object.entries(rawDbData[0])) {
                // convert snake_case column names to camelCase
                payload[key.replace(/([_]\w)/g, g => g[1].toUpperCase())] = value;
            }
        } else {
            // TODO ok to always assume 0?
            payload = {
                payloadType: 'WarningPayload',
                metadata: {
                    totalResults: 0
                }
            }
        }
        
    } else {
        // TODO should always use query?
        // TODO no params - page method
    }

    return payload;
}
