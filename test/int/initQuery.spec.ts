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
