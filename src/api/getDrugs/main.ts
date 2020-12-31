// import { Dao } from '../shared/dao/dao';
import { APIGatewayEvent, Context } from 'aws-lambda';

// let runTimeDao: Dao<any>;

export async function handle(event: APIGatewayEvent, context: Context) {
    console.log('hi from the getDrugs lambda');
    // runTimeDao.getDrugs({});
}
