import * as assert from 'assert';
import { buildResponseObject } from '../src/shared/responseBuilder';
import { ErrorPayload, ResourceResponseBody, WarningPayload } from '../src/shared/types';

describe('buildResponseObject function', function() {

    it('should return a 2XX when all good', function() {

        let tmp: ResourceResponseBody;
        tmp = {
            payload: {
                id: 123,
                name: 'lol'
            },
            metadata: {
                payloadType: 'Resource',
                totalLength: 1
            }
        }

        const res = buildResponseObject(tmp);
        assert.strictEqual(res.statusCode, 201);

    });

    it('should return a 5XX when not good', function() {

        let tmp: ErrorPayload;
        tmp = {
            payloadType: 'ErrorPayload',
            summary: 'done goofed',
            details: 'big time',
            resources: ['www.google.com']
        }

        const res = buildResponseObject(tmp);
        assert.strictEqual(res.statusCode, 501);

    });

});
