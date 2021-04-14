import * as assert from 'assert';
import { join } from 'path';
import { open, stat } from 'fs/promises';
import { SlapiDao } from '../../src/shared/types';
import { build } from '../../src/shared/mariaDao';
import { initMaria } from '../../src/init/mariadb/main';

describe('The maria dao and its builder', function() {

    let dao: SlapiDao;

    before(async function() {
        // see test:int script in package.json
        process.env.DB_NAME = 'slapi';
        process.env.DB_PORT = '3306';
        process.env.DB_USERNAME_ENC = 'root';
        process.env.DB_PASSWORD_ENC = 'admin';
        process.env.DATA_FILE_DIR = 'sql/data/drugs.csv';

        // read the SQL files into env vars (normally done via teraform)
        const tablesFilehandle = await open('tmp/sql/init/tables.sql', 'r');
        const loadFilehandle = await open('sql/init/loadDrugs.sql', 'r');
        process.env.INIT_TABLES_SQL = await tablesFilehandle.readFile('utf-8');
        process.env.LOAD_TABLES_SQL = await loadFilehandle.readFile('utf-8');

        // replacement should be done as part of the build. required here for testing.
        const dataPath = join(__dirname, '../../sql/data');
        process.env.LOAD_TABLES_SQL = process.env.LOAD_TABLES_SQL.replace('@DATA_DIR', dataPath);

        process.env.INIT_SQL_DIR = 'sql/init'; // in prod, this is set in terraform

        dao = await build();
    })

    after(function() {
        delete process.env.DB_NAME;
        delete process.env.DB_PORT;
        delete process.env.DB_USERNAME_ENC;
        delete process.env.DB_PASSWORD_ENC;
        delete process.env.DATA_FILE_DIR;
        delete process.env.INIT_TABLES_SQL;
        //dao.close();
    })

    it('should format sql statements correctly', async function() {
        // TODO get table list before

        await initMaria(dao);
        
        // TODO get table list after
        // TODO ensure table list includes plans
        // TODO ensure there is an entry in plans
    })

})
