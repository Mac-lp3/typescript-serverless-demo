import { createPool, Pool, PoolConnection } from 'mariadb';
import { getValue } from './environment';

class MariaDao {

}

let sharedPool: Pool = undefined;

async function buildConnectionPool(): Promise<Pool> {

    const DB_NAME = getValue('DB_NAME');
    const DB_HOST = getValue('DB_HOST');
    const DB_PORT = getValue('DB_PORT');
    const DB_USERNAME = getValue('DB_USERNAME_ENC');
    const DB_PASSWORD = getValue('DB_PASSWORD_ENC');

    return Promise.all([
        DB_HOST,
        DB_PORT,
        DB_USERNAME,
        DB_PASSWORD
    ]).then(vals => {
        return createPool({
            host: vals[0],
            port: Number(vals[1]),
            user: vals[2], 
            password: vals[3],
            connectionLimit: 3
        });
    });

}

async function getConnection() {

    if (sharedPool === undefined) {
        sharedPool = await buildConnectionPool();
    }

    const conn = await sharedPool.getConnection();
    return conn;
}

export async function listTables() {
    const conn = await getConnection();
    const raw = await conn.query('SELECT NOW()');
    conn.release;

    return raw;
}

export function poolsClosed() {
    sharedPool.end();
}

