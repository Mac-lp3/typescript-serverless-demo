import * as assert from 'assert';
import { listTables, poolsClosed } from '../../src/shared/mariaDao';

describe('Dao -> database connectivity', function() {

    before(function() {
        // see test:int script in package.json 
        process.env.DB_NAME = 'local-maria';
        process.env.DB_PORT = '3306';
        process.env.DB_USERNAME_ENC = 'root';
        process.env.DB_PASSWORD_ENC = 'admin';
    })

    after(function() {
        delete process.env.DB_NAME;
        delete process.env.DB_PORT;
        delete process.env.DB_USERNAME_ENC;
        delete process.env.DB_PASSWORD_ENC;
    })

    it('should create a connection pool', async function() {
        const resp = await listTables();
        console.log(resp);
        poolsClosed();
        assert.ok(true);
        return null;
    })

})