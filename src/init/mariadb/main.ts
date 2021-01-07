import { createPool } from 'mariadb';

export async function handle(event: any, context: any) {
    console.log('hi from the init DB lambda');
    createPool({});
    console.log(`Event: ${event}, ${context}`);
    // console.log(`The database username is: ${process.env['DB_USERNAME_ENC']}, or ${await DB_USERNAME}`);
    // runTimeDao.getDrugs({});
}
