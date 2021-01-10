import { APIGatewayEvent, Context } from 'aws-lambda';
import { getConnection } from '../../shared/mariaDao';
// import { getValue } from '../../shared/environment';
// import { createPool, Pool } from 'mariadb';

// const DB_NAME = getValue('DB_NAME');
// const DB_HOST = getValue('DB_HOST');
// const DB_PORT = getValue('DB_PORT');
// const DB_USERNAME = getValue('DB_USERNAME_ENC');
// const DB_PASSWORD = getValue('DB_PASSWORD_ENC');

// const connPool = Promise.all([
//     DB_HOST,
//     DB_PORT,
//     DB_USERNAME,
//     DB_PASSWORD
// ]).then(vals => {
//     return createPool({
//         host: vals[0],
//         port: Number(vals[1]),
//         user: vals[2], 
//         password: vals[3],
//         connectionLimit: 3
//     });
// });

export async function handle(event: APIGatewayEvent, context: Context) {
    console.log('hi from the getDrugs lambda');
    console.log(`The database host is: ${process.env['DB_HOST']}`);
    console.log(`The encrypted database username is: ${process.env['DB_USERNAME_ENC']}`);

    const conn = await getConnection();
    console.log(await conn.query('SHOW DATABASES'));
}
