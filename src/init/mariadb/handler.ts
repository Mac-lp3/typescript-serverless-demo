import { initMaria } from './main';
import { MariaDao } from '../../shared/mariaDao';
import { SNSEvent, Context } from 'aws-lambda';

const dao = MariaDao.build();

export async function handle(event: SNSEvent, context: Context) {

    console.log('hi from the init DB lambda');
    console.log(`Event: ${event}, ${context}`);

    await initMaria(await dao);

}
