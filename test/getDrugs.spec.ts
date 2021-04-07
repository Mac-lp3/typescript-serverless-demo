import * as assert from 'assert';
import { ImportMock } from 'ts-mock-imports';
import * as dao from '../src/shared/mariaDao';
import { getDrugs } from '../src/api/getDrugs/main';
import { ResourcePayload } from '../src/shared/types';

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
        assert.ok(res.hasOwnProperty('payloadType'));
        assert.ok(res.hasOwnProperty('metadata'));

        // check snake to camel
        assert.ok(res.hasOwnProperty('snakeOne'));
        assert.ok(res.hasOwnProperty('snakeTwo'));
        assert.ok(res.hasOwnProperty('SnAkET'));

        // ensure values are expected
        assert.strictEqual(res.payloadType, 'ResourcePayload');
        assert.strictEqual((res as ResourcePayload).metadata.totalResults, 1);
        assert.strictEqual((res as ResourcePayload).snakeOne, 1);
        assert.strictEqual((res as ResourcePayload).snakeTwo, 'two');
        assert.strictEqual((res as ResourcePayload).SnAkET, false);

    })

    it('should return an empty set if given a no-hit id', async function() {
        // stub the dao method
        const stub = ImportMock.mockFunction(dao, 'readDrug', mockEmptyDbResult);

        // call it
        const res = await getDrugs('1');

        // ensure additional props were added
        assert.ok(res.hasOwnProperty('payloadType'));
        assert.ok(res.hasOwnProperty('metadata'));

        // ensure no other props were added
        assert.strictEqual(Object.keys(res).length, 2);

        // ensure values are expected
        assert.strictEqual(res.payloadType, 'WarningPayload');
        assert.strictEqual((res as ResourcePayload).metadata.totalResults, 0);

    })

})
