import { getDrugs } from './main';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { buildResponseObject } from '../../shared/responseBuilder';

export async function handle(event: APIGatewayEvent, context: Context) {
    console.log('hi from the getDrugs lambda handler');
    
    let payload;

    const drugId = event.pathParameters?.id;

    if (drugId) {

        // TODO try/catch
        payload = await getDrugs(drugId);

    } else {
        // TODO treat as a query?
    }

    const response = buildResponseObject(payload);

    return response;
}
