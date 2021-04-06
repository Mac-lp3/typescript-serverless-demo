import * as assert from 'assert';
import { listTables, poolsClosed } from '../../src/shared/mariaDao';

/*
 Run the following commands before executing:
 docker run --rm -p 3306:3306 --name local-maria -e MYSQL_DATABASE=slapi -e MYSQL_ROOT_PASSWORD=admin -d mariadb
 docker exec -i local-maria sh -c 'exec mysql -uroot -padmin slapi' < sql/init/tables.sql 
 */

describe('Dao -> database connectivity', function() {

    before(function(done) {
        // see test:int script in package.json 
        process.env.DB_NAME = 'slapi';
        process.env.DB_PORT = '3306';
        process.env.DB_USERNAME_ENC = 'root';
        process.env.DB_PASSWORD_ENC = 'admin';
        done();
    })

    after(function(done) {
        delete process.env.DB_NAME;
        delete process.env.DB_PORT;
        delete process.env.DB_USERNAME_ENC;
        delete process.env.DB_PASSWORD_ENC;
        done();
    })

    it('should create a connection pool', async function() {
        const resp = await listTables();
        console.log(resp);
        poolsClosed();
        assert.ok(true);
        return null;
    })

})