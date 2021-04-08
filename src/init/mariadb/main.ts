import { SlapiDao } from '../../shared/types';
import { getValue } from '../../shared/environment';

export async function initMaria(dao: SlapiDao) {

    // where are the sql statements?
        // env var?
            // that could work. small enough statements...

    // run create table
    // run load table
    await getValue('DATA_FILE_DIR');
    
}
