import { readdir, open, stat } from 'fs/promises';
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

    let exists;
    let tmpSQL;
    let filehandle;
    for (let i = 0; i < dirNames.length; ++i) {

        // does the table already exist?
        exists = tableNameList.indexOf(dirNames[i]) > -1;

        // create it if not
        if(!exists) {
            // exec create SQL
            filehandle = await open(`${initSQLDir}/${dirNames[i]}/create.sql`, 'r');
            tmpSQL = await filehandle.readFile('utf-8');
            await dao.exec(tmpSQL);

            // check if there is data to load
            try {
                await stat(`${initSQLDir}/${dirNames[i]}/load.sql`);

                // load it if so
                filehandle = await open(`${initSQLDir}/${dirNames[i]}/load.sql`, 'r');
                tmpSQL = await filehandle.readFile('utf-8');
                tmpSQL = tmpSQL.replace('@DATA_DIR', '?');

                await dao.exec(tmpSQL, [`${initSQLDir}/${dirNames[i]}/data.csv`]);

            } catch {

            }
            
        }

    }
    
}
