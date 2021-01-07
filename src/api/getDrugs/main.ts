import { APIGatewayEvent, Context } from 'aws-lambda';
import { createPool } from 'mariadb';
import { KMS } from 'aws-sdk';

const kmsClient = new KMS();

async function decryptString(payload: string) {
    const paramsDecrypt: KMS.DecryptRequest = {
        CiphertextBlob: Buffer.from(payload, 'base64')
    };
    
    console.log()
    const decryptResult = await kmsClient.decrypt(paramsDecrypt).promise();
    
    if (Buffer.isBuffer(decryptResult.Plaintext)) {
        return Buffer.from(decryptResult.Plaintext).toString();
    } else {
        throw new Error('We have a problem');
    }
}

let DB_USERNAME = decryptString(process.env['DB_USERNAME_ENC']);
let DB_PASSWORD: string;
let DB_NAME: string;

// async function setDatabaseVariables() {
//     // decrypt DB variables
//     DB_USERNAME = await decryptString(process.env['DB_USERNAME_ENC']);
//     DB_PASSWORD = await decryptString(process.env['DB_PASSWORD_ENC']);
//     DB_NAME = process.env['DB_NAME'];
// }

// setDatabaseVariables();

export async function handle(event: APIGatewayEvent, context: Context) {
    console.log('hi from the getDrugs lambda');
    createPool({});
    console.log(`The database name is: ${process.env['DB_NAME']}`);
    console.log(`The database username is: ${process.env['DB_USERNAME_ENC']}, or ${await DB_USERNAME}`);
    // runTimeDao.getDrugs({});
}
