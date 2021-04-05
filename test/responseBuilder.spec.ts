import * as assert from 'assert';
import { buildResponseObject } from '../src/shared/responseBuilder';
import { ErrorPayload, ResourcePayload, WarningPayload } from '../src/shared/types';

describe('buildResponseObject function', function() {

    it('should return a 2XX when all good', function() {

        let tmp: ResourcePayload;
        tmp = {
            payloadType: 'ResourcePayload',
            id: 123,
            name: 'lol',
            metadata: {
                length: 1
            }
        }

        const res = buildResponseObject(tmp);
        assert.strictEqual(res.statusCode, 201);

    });

    it('should return a 4XX when not good', function() {

        let tmp: ErrorPayload;
        tmp = {
            payloadType: 'ErrorPayload',
            summary: 'done goofed',
            details: 'big time',
            resources: ['www.google.com']
        }

        const res = buildResponseObject(tmp);
        assert.strictEqual(res.statusCode, 404);

    });

});
