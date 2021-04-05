import * as assert from 'assert';
import * as env from '../src/shared/environment';

describe('The environment functions', function() {

    const testDBName = 'mocha'
    const testEncUserName = 'tbd mocha'

    beforeEach(function() {
        process.env.DB_NAME = testDBName;
        process.env.DB_USERNAME_ENC = testEncUserName;
    })

    afterEach(function() {
        delete process.env.DB_NAME;
        delete process.env.DB_USERNAME_ENC;
    })

    it('should retrieve the value of a provided key', async function() {
        const dbName = await env.getValue('DB_NAME');
        assert.strictEqual(dbName, testDBName);
    })

    it('should not try to decrypt if not on AWS', async function() {
        const dbUser = await env.getValue('DB_USERNAME_ENC');
        assert.strictEqual(dbUser, testEncUserName);
    })

    it('should be able to use the KMS key to decrypt values', async function() {
        // TODO call KMS to encrypt
        // TODO pass enc string into env
        // TODO update local vs AWS check in logic
        // TODO call decrypt
    })
})
