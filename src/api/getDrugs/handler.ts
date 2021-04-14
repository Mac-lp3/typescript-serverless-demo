import { getDrugs } from './main';
import { MariaDao } from '../../shared/mariaDao';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { buildResponseObject } from '../../shared/responseBuilder';

const mdao = MariaDao.build();

export async function handle(event: APIGatewayEvent, context: Context) {
    console.log('hi from the getDrugs lambda handler');
    
    let payload;

    // TODO extract params
    const drugId = event.pathParameters?.id;

    if (drugId) {

        // TODO try/catch
        payload = await getDrugs(await mdao, drugId);

    } else {
        // TODO treat as a query?
    }

    const response = buildResponseObject(payload);

    return response;
}
