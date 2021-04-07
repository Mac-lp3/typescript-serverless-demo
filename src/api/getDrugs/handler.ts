import { getDrugs } from './main';
import { buildResponseObject } from '../../shared/responseBuilder';
import { APIGatewayEvent, Context, Callback } from 'aws-lambda';

export async function handle(event: APIGatewayEvent, context: Context, callback: Callback) {
    // TODO extract query params if any
    console.log('hi from the getDrugs lambda handler');

    // TODO try/catch
    const payload = await getDrugs();
    const response = buildResponseObject(payload);

    console.log(callback(null, response));
}
