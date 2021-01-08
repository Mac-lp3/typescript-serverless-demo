import { APIGatewayEvent, Context } from 'aws-lambda';
import { get } from '../../shared/environment';
import { createPool } from 'mariadb';

const DB_NAME = get('DB_NAME');
const DB_USERNAME = get('DB_USERNAME_ENC');
const DB_PASSWORD = get('DB_PASSWORD_ENC');

export async function handle(event: APIGatewayEvent, context: Context) {
    console.log('hi from the getDrugs lambda');
    createPool({});
    console.log(`The database name is: ${process.env['DB_NAME']}`);
    console.log(`The database username is: ${process.env['DB_USERNAME_ENC']}, or ${await DB_USERNAME}`);
    // runTimeDao.getDrugs({});
}
