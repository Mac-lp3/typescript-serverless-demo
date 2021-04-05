import { getConnection } from '../../shared/mariaDao';
import { ErrorPayload, WarningPayload, ResourcePayload } from '../../shared/types'

export async function getDrugs(ndc?: string, rxcui?: string, name?: string): Promise<ErrorPayload | WarningPayload | ResourcePayload> {
    console.log(`The database host is: ${process.env['DB_HOST']}`);
    console.log(`The encrypted database username is: ${process.env['DB_USERNAME_ENC']}`);

    // TODO define resource types
    // TODO mock connection
    // TODO establish connection
    // TODO use connection to get things

    // const conn = await getConnection();
    // console.log(await conn.query('SHOW DATABASES'));

    let payload: ResourcePayload = {
        payloadType: 'ResourcePayload',
        ndc: '01-1234567',
        rxcui: '8888888',
        label: 'omg',
        metadata: {
            length: 1
        }
    }

    return payload;
}
