import { readdir, open, stat } from 'fs/promises';
import { SlapiDao } from '../../shared/types';
import { getValue } from '../../shared/environment';

/**
 * Runs DB initialization logic, including table creation and loading initial data.
 * 
 * Relies on the INIT_SQL_DIR environment var to find these files.
 * 
 * Assumes the initialization files follow the folder pattern:
 * INIT_SQL_DIR/sql/init/TABLE_NAME/
 *  |-  create.sql
 *  |-  load.sql
 *  `-  data.csv
 * 
 * @param dao 
 */
export async function initMaria(dao: SlapiDao) {
    
    // get the list of tables already in the DB
    const tableNameList = await dao.listTables();

    // get list of folders in the init directory
    const initSQLDir = await getValue('INIT_SQL_DIR');
    const dirents = await readdir(initSQLDir, { withFileTypes: true });
    const dirNames = dirents.filter(dir => dir.isDirectory()).map(dir => dir.name);

    console.log(`Found the following init file folders: ${dirNames}`);

    let exists;
    let tmpSQL;
    let filehandle;
    for (let i = 0; i < dirNames.length; ++i) {

        // does the table already exist?
        exists = tableNameList.indexOf(dirNames[i]) > -1;

        // create it if not
        if(!exists) {

            console.log(`Creating table: ${dirNames[i]}`);

            // exec create SQL
            filehandle = await open(`${initSQLDir}/${dirNames[i]}/create.sql`, 'r');
            tmpSQL = await filehandle.readFile('utf-8');
            await filehandle.close();
            await dao.exec(tmpSQL);

            // check if there is data to load as well
            try {

                console.log(`Loading csv data for table: ${dirNames[i]}`);

                // load it if so
                filehandle = await open(`${initSQLDir}/${dirNames[i]}/load.sql`, 'r');
                tmpSQL = await filehandle.readFile('utf-8');
                await filehandle.close();
                tmpSQL = tmpSQL.replace('@DATA_FILE', '?');

                await dao.exec(tmpSQL, [`${initSQLDir}/${dirNames[i]}/data.csv`]);

            } catch (ex) {
                // assume load.sql did not exist
                console.log(`Did not find a load.sql for table: ${dirNames[i]}`);
            }
        }
    }

    console.log('DB initialization complete');
}
