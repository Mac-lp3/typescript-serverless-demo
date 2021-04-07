import { getDrugs } from './main';
import { buildResponseObject } from '../../shared/responseBuilder';
import { APIGatewayEvent, Context, Callback } from 'aws-lambda';

export async function handle(event: APIGatewayEvent, context: Context) {
    // TODO extract query params if any
    console.log('hi from the getDrugs lambda handler');

    // TODO try/catch
    const payload = await getDrugs('1');
    const response = buildResponseObject(payload);

    return response;
}
