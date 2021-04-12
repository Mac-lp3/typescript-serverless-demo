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
    await getValue('DATA_FILE_DIR');
    
}
