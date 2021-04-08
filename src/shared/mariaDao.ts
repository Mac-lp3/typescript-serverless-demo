import { SlapiDao } from './types';
import { getValue } from './environment';
import { createPool, Pool, PoolConnection } from 'mariadb';

class MariaDao implements SlapiDao {

    private sharedPool: Pool;

    constructor(pool: Pool) {
        this.sharedPool = pool;
    }

    private async getConnection(): Promise<PoolConnection> {
        const conn = await this.sharedPool.getConnection();
        return conn;
    }

    public closePool() {
        this.sharedPool.end();
    }

    public async listTables() {
        const conn = await getConnection();
        const raw = await conn.query('SHOW TABLES');

        conn.release();
        return raw;
    }
    
    public async queryDrugs(queryTerm: string) {
        // TODO
        const retVal: any[] = [];
        return retVal;
    }
    
    public async readDrug(id: number) {
        const conn = await this.getConnection();
        const raw = await conn.query(
            'SELECT * FROM drugs WHERE id = ?',
            [id]
        );

        conn.release();
        return raw;
    }
    
    public async createDrug(
        ndc: string,
        rxcui: string,
        nameBrand: string,
        nameLabel: string,
        dosageAmount: number,
        dosageUnits: string,
        deliveryMethod: string
    ) {
        const conn = await this.getConnection();
        const raw = await conn.query(
            'INSERT INTO drugs (ndc, rxcui, name_brand, name_label, dosage_amount, dosage_units, delivery_method) ' +
            'VALUES (?, ?, ?, ?, ?, ?, ?)',
            [ndc, rxcui, nameBrand, nameLabel, dosageAmount, dosageUnits, deliveryMethod]
        );

        conn.release();
        return raw;
    }

}

export async function build(): Promise<MariaDao> {

    console.log('Building a fresh MariaDao');
    const thePool = await buildConnectionPool();
    const daoInstance = new MariaDao(thePool);
    return daoInstance;

}

let sharedPool: Pool = undefined;

export async function buildConnectionPool(): Promise<Pool> {

    const DB_NAME = getValue('DB_NAME');
    const DB_HOST = getValue('DB_HOST');
    const DB_PORT = getValue('DB_PORT');
    const DB_USERNAME = getValue('DB_USERNAME_ENC');
    const DB_PASSWORD = getValue('DB_PASSWORD_ENC');

    return Promise.all([
        DB_HOST,
        DB_NAME,
        DB_PORT,
        DB_USERNAME,
        DB_PASSWORD
    ]).then(vals => {
        return createPool({
            host: vals[0],
            database: vals[1],
            port: Number(vals[2]),
            user: vals[3], 
            password: vals[4],
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
    const raw = await conn.query('SHOW TABLES');
    conn.release();

    return raw;
}

export async function queryDrugs(term: string) {

}

export async function readDrug(id: number) {
    const conn = await getConnection();
    const raw = await conn.query(
        'SELECT * FROM drugs WHERE id = ?',
        [id]
    );
    conn.release();
    return raw;
}

export async function createDrug(
    ndc: string,
    rxcui: string,
    nameBrand: string,
    nameLabel: string,
    dosageAmount: number,
    dosageUnits: string,
    deliveryMethod: string
) {
    const conn = await getConnection();
    const raw = await conn.query(
        'INSERT INTO drugs (ndc, rxcui, name_brand, name_label, dosage_amount, dosage_units, delivery_method) ' +
        'VALUES (?, ?, ?, ?, ?, ?, ?)',
        [ndc, rxcui, nameBrand, nameLabel, dosageAmount, dosageUnits, deliveryMethod]
    );
    conn.release();
    return raw;
}

export function poolsClosed() {
    sharedPool.end();
}

