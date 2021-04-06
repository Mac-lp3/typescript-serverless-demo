import * as assert from 'assert';
import { listTables, poolsClosed, createDrug, readDrug } from '../../src/shared/mariaDao';

describe('Dao -> database connectivity', function() {

    let insertedDrugId: number;
    const insertedDrug = {
        ndc: "01-123123123",
        rxcui: "222333444",
        nameBrand: "bruh",
        nameLabel: "o shi-",
        dosageAmount: 75,
        dosageUnits: "MG",
        deliveryMethod: "tabs",
    }

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
        poolsClosed();
    })

    it('should create a connection pool', async function() {
        const resp = await listTables();
    })

    it('should insert a drug', async function() {
        const res = await createDrug(
            insertedDrug.ndc,
            insertedDrug.rxcui,
            insertedDrug.nameBrand,
            insertedDrug.nameLabel,
            insertedDrug.dosageAmount,
            insertedDrug.dosageUnits,
            insertedDrug.deliveryMethod
        )
        assert.strictEqual(res.affectedRows, 1);
        assert.strictEqual(res.warningStatus, 0);

        insertedDrugId = res.insertId;
    })

    it('should load drugs by id', async function() {
        // MUST RUN AFTER THE INSERT TEST
        const res = await readDrug(insertedDrugId);
        assert.ok(Array.isArray(res));
        assert.strictEqual(res.length, 1);
        assert.strictEqual(res[0].id, insertedDrugId);
        assert.strictEqual(res[0].ndc, insertedDrug.ndc);
        assert.strictEqual(res[0].rxcui, insertedDrug.rxcui);
        assert.strictEqual(res[0].name_brand, insertedDrug.nameBrand);
    })

    it('should NOT find a missing drug id', async function() {
        // MUST RUN AFTER THE INSERT TEST
        const res = await readDrug(insertedDrugId + 1);
        assert.ok(Array.isArray(res));
        assert.strictEqual(res.length, 0);
    })

})