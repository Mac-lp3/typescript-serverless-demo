import { readdir } from 'fs/promises';
import { SlapiDao } from '../../shared/types';
import { getValue } from '../../shared/environment';

export async function initMaria(dao: SlapiDao) {

    /*
    [pwd | /opt/nodejs]/sql/init/drugs/
        |-  create.sql
        |-  load.sql
        `-  data.csv

    - get list of tables in db
    - get list of folders in sql/init/. For each:
        + folderName NOT in DB list:
            + run folderName/create.sql
            + has a load file?
                + sed folderName/load.sql with data.csv path
                + run folderName/load.sql'
    */
    
    // get the list of tables already in the DB
    const tableNameList = await dao.listTables();

    // get list of folders in the init directory
    const initSQLDir = await getValue('INIT_SQL_DIR');
    const dirents = await readdir(initSQLDir, { withFileTypes: true });
    const dirNames = dirents.filter(dir => dir.isDirectory()).map(dir => dir.name);

    dirNames.forEach(dirName => {

        // does the table already exist?
        const exists = tableNameList.indexOf(dirName) > -1;

        // create it if not
        if(!exists) {
            // exec that SQL
            console.log(`${initSQLDir}/${dirName}/create.sql`);
        }

        console.log(`${initSQLDir}/${dirName}/create.sql`);
    });
    
}
