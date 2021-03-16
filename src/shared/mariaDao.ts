import { getValue } from './environment';
import { createPool } from 'mariadb';

const DB_NAME = getValue('DB_NAME');
const DB_HOST = getValue('DB_HOST');
const DB_PORT = getValue('DB_PORT');
const DB_USERNAME = getValue('DB_USERNAME_ENC');
const DB_PASSWORD = getValue('DB_PASSWORD_ENC');

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

export async function getConnection() {
    const conn = { query: (str: string) => str } //await (await connPool).getConnection()
    console.log('congrats, you called getConnection()')
    return conn;
}