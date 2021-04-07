import * as assert from 'assert';
import { ImportMock } from 'ts-mock-imports';
import * as dao from '../src/shared/mariaDao';
import { getDrugs } from '../src/api/getDrugs/main';
import { ResourceResponseBody } from '../src/shared/types';

describe('The getDrugs API method', function() {

    const mockDbResult = [{
        snake_one: 1,
        snake_Two: 'two',
        SnAkE_t: false,
    }];

    const mockEmptyDbResult: any[] = [];

    afterEach(function() {
        // reset mocks
        ImportMock.restore();
    })

    it('should return a drug with proper inputs', async function() {
        // stub the dao method
        const stub = ImportMock.mockFunction(dao, 'readDrug', mockDbResult);

        // call it
        const res = await getDrugs('1');

        // ensure additional props were added
        assert.ok(res.hasOwnProperty('metadata'));
        assert.ok((res as ResourceResponseBody).metadata.hasOwnProperty('payloadType'));
        assert.ok((res as ResourceResponseBody).metadata.hasOwnProperty('totalLength'));

        // check snake to camel
        assert.ok((res as ResourceResponseBody).payload.hasOwnProperty('snakeOne'));
        assert.ok((res as ResourceResponseBody).payload.hasOwnProperty('snakeTwo'));
        assert.ok((res as ResourceResponseBody).payload.hasOwnProperty('SnAkET'));

        // ensure values are expected
        assert.strictEqual((res as ResourceResponseBody).metadata.payloadType, 'Resource');
        assert.strictEqual((res as ResourceResponseBody).metadata.totalLength, 1);
        assert.strictEqual((res as ResourceResponseBody).payload.snakeOne, 1);
        assert.strictEqual((res as ResourceResponseBody).payload.snakeTwo, 'two');
        assert.strictEqual((res as ResourceResponseBody).payload.SnAkET, false);

    })

    it('should return an empty set if given a no-hit id', async function() {
        // stub the dao method
        const stub = ImportMock.mockFunction(dao, 'readDrug', mockEmptyDbResult);

        // call it
        const res = await getDrugs('1');

        // ensure additional props were added
        assert.ok((res as ResourceResponseBody).metadata.hasOwnProperty('payloadType'));
        assert.ok((res as ResourceResponseBody).metadata.hasOwnProperty('totalLength'));

        // ensure no other props were added
        assert.strictEqual(Object.keys(res).length, 2);
        assert.strictEqual(Object.keys((res as ResourceResponseBody).payload).length, 0);

        // ensure values are expected
        assert.strictEqual((res as ResourceResponseBody).metadata.payloadType, 'Resource');
        assert.strictEqual((res as ResourceResponseBody).metadata.totalLength, 0);

    })

})
