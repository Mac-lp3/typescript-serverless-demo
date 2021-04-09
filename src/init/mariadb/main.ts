import { SlapiDao } from '../../shared/types';
import { getValue } from '../../shared/environment';

export async function initMaria(dao: SlapiDao) {

    // where are the sql statements?
        // env var?
            // that could work. small enough statements...
            // try to cat into a var in the before

    // run create table
    // run load table
    await getValue('DATA_FILE_DIR');
    
}
