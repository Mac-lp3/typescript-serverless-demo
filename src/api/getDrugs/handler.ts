import { getDrugs } from './main';
import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import { buildResponseObject } from '../../shared/responseBuilder';

export async function handle(event: APIGatewayEvent, context: Context, callback: Callback) {
    console.log('hi from the getDrugs lambda handler');

    // TODO extrat query params if any
    const payload = await getDrugs();
    const response = buildResponseObject(payload);

    console.log(callback(null, response));
}
