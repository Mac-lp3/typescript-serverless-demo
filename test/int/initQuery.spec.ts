import * as assert from 'assert';
import { join } from 'path';
import { open, stat } from 'fs/promises';
import { SlapiDao } from '../../src/shared/types';
import { MariaDao } from '../../src/shared/mariaDao';
import { initMaria } from '../../src/init/mariadb/main';

describe('The maria dao and its builder', function() {

    let dao: SlapiDao;

    before(async function() {
        // see test:int script in package.json
        process.env.DB_NAME = 'slapi';
        process.env.DB_PORT = '3306';
        process.env.DB_USERNAME_ENC = 'root';
        process.env.DB_PASSWORD_ENC = 'admin';
        process.env.INIT_SQL_DIR = 'sql/init'; // in prod, this is set in terraform

        dao = await MariaDao.build();
    })

    after(async function() {
        delete process.env.DB_NAME;
        delete process.env.DB_PORT;
        delete process.env.DB_USERNAME_ENC;
        delete process.env.DB_PASSWORD_ENC;
        delete process.env.DATA_FILE_DIR;
        delete process.env.INIT_TABLES_SQL;
        await dao.close();
    })

    it('should format sql statements correctly', async function() {
        
        // ensure the plans table is not there
        let tables = await dao.listTables();
        assert.strictEqual(tables.indexOf('plans'), -1);
        assert.strictEqual(tables.indexOf('drugs'), -1);

        await initMaria(dao);
        
        // ensure the plans & drugs tables is there now
        tables = await dao.listTables();
        assert.ok(tables.indexOf('plans') > -1);
        assert.ok(tables.indexOf('drugs') > -1);

    })

})
