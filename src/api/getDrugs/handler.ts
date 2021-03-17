import { getDrugs } from './main';
import { APIGatewayEvent, Context, Callback } from 'aws-lambda';

export async function handle(event: APIGatewayEvent, context: Context, callback: Callback) {
    console.log('hi from the getDrugs lambda');
    console.log(`The database host is: ${process.env['DB_HOST']}`);
    console.log(`The encrypted database username is: ${process.env['DB_USERNAME_ENC']}`);

    const payload = await getDrugs();
    console.log(callback(null, payload));
}
