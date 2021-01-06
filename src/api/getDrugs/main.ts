import { APIGatewayEvent, Context } from 'aws-lambda';
import { createPool } from 'mariadb';

// let runTimeDao: Dao<any>;

export async function handle(event: APIGatewayEvent, context: Context) {
    console.log('hi from the getDrugs lambda');
    createPool({});
    console.log(`The database name is: ${process.env['DB_NAME']}`)
    // runTimeDao.getDrugs({});
}
