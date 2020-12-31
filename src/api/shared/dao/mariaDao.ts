import { Dao } from './dao';

export class MariaDao implements Dao<any> { // TODO create drugs class
    private DB_USER: string;
    private DB_HOST: string;
    private DB_PASSWORD: string;

    constructor() {

    }

    public async getDrugsCount(queryParams: any) {
        return 0;
    }

    public async getDrug(queryParams: any) {

    }

    public async getDrugs(queryParams: any) {
        console.log('hi from mariaDao.getDrugs');
        return [];
    }
}