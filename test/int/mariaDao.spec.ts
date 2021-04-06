import * as assert from 'assert';
import { listTables, poolsClosed, createDrug } from '../../src/shared/mariaDao';

describe('Dao -> database connectivity', function() {

    before(function() {
        // see test:int script in package.json 
        process.env.DB_NAME = 'slapi';
        process.env.DB_PORT = '3306';
        process.env.DB_USERNAME_ENC = 'root';
        process.env.DB_PASSWORD_ENC = 'admin';
    })

    after(async function() {
        delete process.env.DB_NAME;
        delete process.env.DB_PORT;
        delete process.env.DB_USERNAME_ENC;
        delete process.env.DB_PASSWORD_ENC;
        await poolsClosed();
    })

    it('should create a connection pool', async function() {
        const resp = await listTables();
    })

    it('should insert a drug', async function() {
        const res = await createDrug(
            "01-123123123",
            "222333444",
            "bruh",
            "o shi-",
            75,
            "MG",
            "tabs"
        )
        assert.strictEqual(res.affectedRows, 1);
        assert.strictEqual(res.warningStatus, 0);
    })

    it('should load drugs by ndc', async function() {
        // TODO
    })

})