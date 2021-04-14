import { SlapiDao } from './types';
import { getValue } from './environment';
import { createPool, Pool, PoolConnection } from 'mariadb';

export class MariaDao implements SlapiDao {

    private sharedPool: Pool;

    constructor(pool: Pool) {
        this.sharedPool = pool;
    }

    private async getConnection(): Promise<PoolConnection> {
        const conn = await this.sharedPool.getConnection();
        return conn;
    }

    public async close() {
        this.sharedPool.end();
    }

    /**
     * 
     * @param sqlStatement assumed to be a string with optional '?'s to substitute
     * @param options assumed to be an array of values (see node maria api)
     * @returns 
     */
    public async exec(sqlStatement: string, options?: any) {

        const conn = await this.getConnection();

        let raw;
        if (options) {
            raw = await conn.query(sqlStatement, options);
        } else {
            raw = await conn.query(sqlStatement);
        }

        conn.release();
        return raw;
    }

    public async listTables(returnRaw?: boolean) {
        const conn = await this.getConnection();
        let returnList = await conn.query('SHOW TABLES');

        conn.release();

        if (!returnRaw) {
            returnList = this.convertRawTableListToStrings(returnList);
        }

        return returnList;
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

    /**
     * 
     * @param raw object returned by the maria db api
     */
    protected convertRawTableListToStrings(raw: any[]): string[] {

        const tblNames: string[] = [];
        raw.forEach(tbl => {
            // key is a string of format: 'Table_in_<DB NAME>'
            // val is the name of that table
            for (const [key, val] of Object.entries(tbl)) {
                tblNames.push(val as string);
            }
        });

        return tblNames;
    }

    public static async build(): Promise<MariaDao> {
        console.log('Building a fresh MariaDao');
  
        const thePool = Promise.all([
            getValue('DB_HOST'),
            getValue('DB_NAME'),
            getValue('DB_PORT'),
            getValue('DB_USERNAME_ENC'),
            getValue('DB_PASSWORD_ENC')
        ]).then(vals => {
            return createPool({
                host: vals[0],
                database: vals[1],
                port: Number(vals[2]),
                user: vals[3], 
                password: vals[4],
                connectionLimit: 3,
                permitLocalInfile: true
            });
        });

        const daoInstance = new MariaDao(await thePool);
        return daoInstance;
    }

}
