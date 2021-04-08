import * as assert from 'assert';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { handle } from '../../src/api/getDrugs/handler';
import { ResourceResponseBody } from '../../src/shared/types';
import { poolsClosed, createDrug, readDrug } from '../../src/shared/mariaDao';

describe('e2e getDrugs lambda', function() {

    let insertedDrugId: number;
    const insertedDrug = {
        ndc: '987-43123123',
        rxcui: '877292000',
        nameBrand: 'oof',
        nameLabel: 'wow',
        dosageAmount: 1,
        dosageUnits: 'LB',
        deliveryMethod: 'pills',
    }

    const normGetEvent: APIGatewayProxyEvent = {
        body: '',
        httpMethod: 'GET',
        isBase64Encoded: false,
        path: '',
        pathParameters: {
            id: 1 // TODO this needs to be set
        },
        queryStringParameters: {}
    } as any

    const normGetContext: Context = {
        callbackWaitsForEmptyEventLoop: false,
        functionName: 'getDrugs'
    } as any

    before(async function() {
        // see test:int script in package.json 
        process.env.DB_NAME = 'slapi';
        process.env.DB_PORT = '3306';
        process.env.DB_USERNAME_ENC = 'root';
        process.env.DB_PASSWORD_ENC = 'admin';

        // insert a test drug
        const res = await createDrug(
            insertedDrug.ndc,
            insertedDrug.rxcui,
            insertedDrug.nameBrand,
            insertedDrug.nameLabel,
            insertedDrug.dosageAmount,
            insertedDrug.dosageUnits,
            insertedDrug.deliveryMethod
        )

        insertedDrugId = res.insertId;
    })

    after(async function() {
        delete process.env.DB_NAME;
        delete process.env.DB_PORT;
        delete process.env.DB_USERNAME_ENC;
        delete process.env.DB_PASSWORD_ENC;

        poolsClosed();
    })

    it('should get a drug given a good ID', async function() {
        const response = await handle(normGetEvent, normGetContext);
        const bod = JSON.parse(response.body);

        assert.strictEqual(response.statusCode, 201);
        assert.strictEqual(bod.metadata.payloadType, 'Resource');
        assert.strictEqual(bod.metadata.totalLength, 1);
        
        // TODO this is not guarenteed
        assert.strictEqual(bod.payload.id, 1);
    })

    it('should load drugs by id', async function() {
       // TODO tests for proper query/path params
    })

    it('should NOT find a missing drug id', async function() {

    })

})
