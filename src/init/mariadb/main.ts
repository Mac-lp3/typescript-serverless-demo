import { getValue } from '../../shared/environment';
import { createPool } from 'mariadb';

const DB_NAME = getValue('DB_NAME');
const DB_USERNAME = getValue('DB_USERNAME_ENC');
const DB_PASSWORD = getValue('DB_PASSWORD_ENC');

export async function handle(event: any, context: any) {
    console.log('hi from the init DB lambda');
    console.log(`Event: ${event}, ${context}`);

    createPool({});
}
