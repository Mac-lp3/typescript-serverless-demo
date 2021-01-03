import { APIGatewayEvent, Context } from 'aws-lambda';
import { createPool } from 'mariadb';

// let runTimeDao: Dao<any>;

export async function handle(event: APIGatewayEvent, context: Context) {
    console.log('hi from the getDrugs lambda');
    createPool({});
    // runTimeDao.getDrugs({});
}
