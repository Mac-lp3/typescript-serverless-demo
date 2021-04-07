import * as assert from 'assert';
import { getDrugs } from '../../src/api/getDrugs/main';
import { ResourceResponseBody } from '../../src/shared/types';
import { poolsClosed, createDrug, readDrug } from '../../src/shared/mariaDao';

describe('Database connectivity', function() {

    let insertedDrugId: number;
    const insertedDrug = {
        ndc: '01-123123123',
        rxcui: '222333444',
        nameBrand: 'bruh',
        nameLabel: 'o shi-',
        dosageAmount: 75,
        dosageUnits: 'MG',
        deliveryMethod: 'tabs',
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
        //poolsClosed();
    })

    describe('Dao methods', function() {
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

    describe('getDrugs method', function() {
        it('should return a drug given a proper id', async function() {
            // call it
            const res = await getDrugs(`${insertedDrugId}`);

            // ensure additional props were added
            assert.ok((res as ResourceResponseBody).metadata.hasOwnProperty('payloadType'));
            assert.ok((res as ResourceResponseBody).metadata.hasOwnProperty('totalLength'));

            // check snake to camel
            assert.ok((res as ResourceResponseBody).payload.hasOwnProperty('nameBrand'));
            assert.ok((res as ResourceResponseBody).payload.hasOwnProperty('nameLabel'));
            assert.ok((res as ResourceResponseBody).payload.hasOwnProperty('dosageAmount'));
            assert.ok((res as ResourceResponseBody).payload.hasOwnProperty('dosageUnits'));
            assert.ok((res as ResourceResponseBody).payload.hasOwnProperty('deliveryMethod'));

            // ensure values are expected
            assert.strictEqual((res as ResourceResponseBody).metadata.payloadType, 'Resource');
            assert.strictEqual((res as ResourceResponseBody).metadata.totalLength, 1);
            assert.strictEqual((res as ResourceResponseBody).payload.id, insertedDrugId);
            assert.strictEqual((res as ResourceResponseBody).payload.rxcui, insertedDrug.rxcui);
            assert.strictEqual((res as ResourceResponseBody).payload.ndc, insertedDrug.ndc);
            assert.strictEqual((res as ResourceResponseBody).payload.dosageAmount, insertedDrug.dosageAmount);
            assert.strictEqual((res as ResourceResponseBody).payload.deliveryMethod, insertedDrug.deliveryMethod);
        })
    })

})