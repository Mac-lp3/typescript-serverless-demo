import * as assert from 'assert';
import { buildListResponseBody, buildInstanceResponseBody } from '../src/shared/bodyBuilderMaria';

describe('BB maria', function() {

    const mockResultList = [{
        some_body: 'shrek',
        OnCe_Told_Me: 89,
        THE_WORLD: false
    }, {
        some_body: 'donkey',
        OnCe_Told_Me: 1337,
        THE_WORLD: true
    }, {
        some_body: 'princess',
        OnCe_Told_Me: 69,
        THE_WORLD: true
    }];

    const mockResultInstance = [{
        some_body: 'shrek',
        OnCe_Told_Me: 89,
        THE_WORLD: false
    }];

    it('buildListResponseBody should map a list of snake objects to camels', function() {

        const theBody = buildListResponseBody(mockResultList, 311)

        assert.strictEqual(theBody.payload[0].someBody, mockResultList[0].some_body);
        assert.strictEqual(theBody.payload[1].someBody, mockResultList[1].some_body);
        assert.strictEqual(theBody.payload[2].someBody, mockResultList[2].some_body);
        
        assert.strictEqual(theBody.payload[0].OnCeToldMe, mockResultList[0].OnCe_Told_Me);
        assert.strictEqual(theBody.payload[1].OnCeToldMe, mockResultList[1].OnCe_Told_Me);
        assert.strictEqual(theBody.payload[2].OnCeToldMe, mockResultList[2].OnCe_Told_Me);

        assert.strictEqual(theBody.payload[0].THEWORLD, mockResultList[0].THE_WORLD);
        assert.strictEqual(theBody.payload[1].THEWORLD, mockResultList[1].THE_WORLD);
        assert.strictEqual(theBody.payload[2].THEWORLD, mockResultList[2].THE_WORLD);

    })

    it('mockResultInstance should map a snake object to a camel one', function() {

        const theBody = buildInstanceResponseBody(mockResultInstance);

        assert.strictEqual(theBody.payload.someBody, mockResultInstance[0].some_body);
        assert.strictEqual(theBody.payload.OnCeToldMe, mockResultInstance[0].OnCe_Told_Me);
        assert.strictEqual(theBody.payload.THEWORLD, mockResultInstance[0].THE_WORLD);
    })

})