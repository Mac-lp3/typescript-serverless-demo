import { initMaria } from './main';
import { build } from '../../shared/mariaDao';
import { SNSEvent, Context } from 'aws-lambda';

const dao = build();

export async function handle(event: SNSEvent, context: Context) {

    console.log('hi from the init DB lambda');
    console.log(`Event: ${event}, ${context}`);

    initMaria(await dao);

}
