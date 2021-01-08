import { get } from '../../shared/environment';
import { createPool } from 'mariadb';

const DB_NAME = get('DB_NAME');
const DB_USERNAME = get('DB_USERNAME_ENC');
const DB_PASSWORD = get('DB_PASSWORD_ENC');

export async function handle(event: any, context: any) {
    console.log('hi from the init DB lambda');
    createPool({});
    console.log(`Event: ${event}, ${context}`);
    // console.log(`The database username is: ${process.env['DB_USERNAME_ENC']}, or ${await DB_USERNAME}`);
    // runTimeDao.getDrugs({});
}
