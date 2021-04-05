import { getConnection } from '../../src/shared/mariaDao';

describe('Dao -> database connectivity', function() {

    beforeEach(function() {
        // see test:int script in package.json 
        process.env.DB_NAME = 'local-maria';
        process.env.DB_PORT = '3306';
        process.env.DB_USERNAME_ENC = 'root';
        process.env.DB_PASSWORD_ENC = 'admin';
    })

    afterEach(function() {
        delete process.env.DB_NAME;
        delete process.env.DB_PORT;
        delete process.env.DB_USERNAME_ENC;
        delete process.env.DB_PASSWORD_ENC;
    })

    it('should create a connection pool', async function() {
        console.log(process.env.DB_USERNAME_ENC);
        const conn = await getConnection();
    })

})