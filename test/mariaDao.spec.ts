import { open } from 'fs/promises';
import * as maria from 'mariadb';
import * as assert from 'assert';
import { ImportMock } from 'ts-mock-imports';
import { SlapiDao } from '../src/shared/types';
import * as daoMod from '../src/shared/mariaDao';

describe('The maria dao and its builder', function() {

    before(async function() {
        // see test:int script in package.json
        process.env.DB_NAME = 'slapi';
        process.env.DB_PORT = '3306';
        process.env.DB_USERNAME_ENC = 'root';
        process.env.DB_PASSWORD_ENC = 'admin';
        process.env.DATA_FILE_DIR = 'sql/data/drugs.csv';
    })

    after(function() {
        delete process.env.DB_NAME;
        delete process.env.DB_PORT;
        delete process.env.DB_USERNAME_ENC;
        delete process.env.DB_PASSWORD_ENC;
        delete process.env.DATA_FILE_DIR;
        delete process.env.INIT_TABLES_SQL;
    })

    it('should return a SlapiDao impl', async function() {

        // stub the buildConnectionPool
        const mockPool: maria.Pool = { end: () => console.log('mocking end') } as maria.Pool;
        const stub = ImportMock.mockFunction(maria, 'createPool', mockPool);
        const impl = await daoMod.build();

        assert.strictEqual(stub.callCount, 1);

        ImportMock.restore();
    })

    it('should format sql statements correctly', async function() {
        console.log(`${process.env.LOAD_TABLES_SQL}`)
    })

})