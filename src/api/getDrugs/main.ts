import { SlapiDao } from '../../shared/types';
import { ErrorPayload, WarningPayload, ResourceResponseBody } from '../../shared/types';
import { buildInstanceResponseBody, buildListResponseBody } from '../../shared/bodyBuilderMaria';

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
export async function getDrugs(dao: SlapiDao, id?: string, ndc?: string, rxcui?: string, searchTerm?: string): Promise<ErrorPayload | WarningPayload | ResourceResponseBody> {

    let responseBody: ErrorPayload | WarningPayload | ResourceResponseBody;
    if (id) {

        // TODO try/catch/exception
        const numericID: number = Number(id);
        const rawDbData = await dao.readDrug(numericID);

        // TODO this call depends on the DAO method
        responseBody = buildInstanceResponseBody(rawDbData);
        
    } else {
        // TODO should always use query?
        // TODO no params - page method
    }

    return responseBody;
}
