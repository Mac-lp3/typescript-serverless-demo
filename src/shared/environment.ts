import { KMS } from 'aws-sdk';

const kmsClient = new KMS();

/**
 * Note: built in support for running in AWS, vs local int testing with docker, vs simple unit tests.
 * @param propName 
 * @returns 
 */
export async function getValue(propName: string): Promise<string> {
    const payload = process.env[propName];

    let value = undefined;
    if (payload) {

        // check if the payload is encrypted (based off prop name)
        const isEncrypted = propName.includes('_ENC');
        const isHostedOnAWS = !!(process.env.LAMBDA_TASK_ROOT || process.env.AWS_EXECUTION_ENV);

        if (isEncrypted && isHostedOnAWS) {
            value = awsDecryptString(payload);
        } else {
            value = payload;
        }
    } else {
        console.log(`Env variable not found: ${propName}`);
    }
    return value;
}

async function awsDecryptString(payload: string): Promise<string> {
    const paramsDecrypt: KMS.DecryptRequest = {
        CiphertextBlob: Buffer.from(payload, 'base64')
    };
    
    const decryptResult = await kmsClient.decrypt(paramsDecrypt).promise();
    
    if (Buffer.isBuffer(decryptResult.Plaintext)) {
        return Buffer.from(decryptResult.Plaintext).toString();
    } else {
        throw new Error('We have a problem');
    }
}
