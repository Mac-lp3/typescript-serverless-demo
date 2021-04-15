import * as assert from 'assert';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { handle } from '../../src/api/getDrugs/handler';
import { ResourceResponseBody } from '../../src/shared/types';

describe('e2e getDrugs lambda', function() {

    const abnormGetEvent: APIGatewayProxyEvent = {
        body: '',
        httpMethod: 'GET',
        isBase64Encoded: false,
        path: '',
        pathParameters: {
            id: 1337
        },
        queryStringParameters: {}
    } as any

    const normGetEvent: APIGatewayProxyEvent = {
        body: '',
        httpMethod: 'GET',
        isBase64Encoded: false,
        path: '',
        pathParameters: {
            id: 1
        },
        queryStringParameters: {}
    } as any

    const normGetContext: Context = {
        callbackWaitsForEmptyEventLoop: false,
        functionName: 'getDrugs'
    } as any

    it('should get a drug given a good ID', async function() {
        process.env.DB_NAME = 'slapi';
        process.env.DB_PORT = '3306';
        process.env.DB_USERNAME_ENC = 'root';
        process.env.DB_PASSWORD_ENC = 'admin';

        const response = await handle(normGetEvent, normGetContext);
        const bod = JSON.parse(response.body);

        assert.strictEqual(response.statusCode, 201);
        assert.strictEqual(bod.metadata.payloadType, 'Resource');
        assert.strictEqual(bod.metadata.totalLength, 1);
        assert.strictEqual(bod.payload.id, 1);
    })

    it('should NOT find a missing drug id', async function() {
        const response = await handle(abnormGetEvent, normGetContext);
        const bod = JSON.parse(response.body);

        assert.strictEqual(response.statusCode, 404);
        assert.strictEqual(bod.metadata.totalLength, 0);
        assert.strictEqual(Object.getOwnPropertyNames(bod.payload).length, 0);
    })

})
