import * as assert from 'assert';
import { getDrugs } from '../src/api/getDrugs/main';
import { APIGatewayEvent, Context } from 'aws-lambda';

const context: Context = {
  functionName: 'getDrugs',
  invokedFunctionArn: '12345',
  memoryLimitInMB: '9000',
  callbackWaitsForEmptyEventLoop: false,
  functionVersion: '1',
  awsRequestId: '123',
  logGroupName: 'Slapi',
  getRemainingTimeInMillis: () => 9000,
  logStreamName: 'slapi',
  done: (a?: any, b?: any) => console.log('ok'),
  fail:  (a?: any, b?: any) => console.log('ok'),
  succeed:  (a?: any, b?: any) => console.log('ok')
};

describe('getDrugs Lambda', function() {
  
  describe('Empty request ', function() {

    const emptyEvent: APIGatewayEvent = {
      body: null,
      headers: { key: 'value' },
      multiValueHeaders: { key: ['values'] },
      httpMethod: 'GET',
      isBase64Encoded: false,
      path: 'api/getDrugs',
      pathParameters: null,
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      requestContext: null,
      resource: 'drugs'
    }
    
    it('Should create a connection', async function(done) {
      const env = process.env;
      process.env['DB_PASSWORD_ENC'] = 'ok';
      process.env['DB_USERNAME_ENC'] = 'ok';
      getDrugs('emptyEvent');
      process.env = env;

      done();
      //assert.equal([1, 2, 3].indexOf(4), -1);
    });

  });

});