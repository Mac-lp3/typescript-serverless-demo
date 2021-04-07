import * as assert from 'assert';
import { buildListResponseBody } from '../src/shared/bodyBuilderMaria';

describe('BB maria', function() {

    const mockResultSet = [{
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

    it('should map the snakes to camels', function() {

        const theBody = buildListResponseBody(mockResultSet, 311)
        // TODO add asserts

    })
})