const assert = require('assert');
const calculateNumber = require('./0-calcul');

describe('calculateNumber', () => {
    it('should return the sum of rounded inputs', () => {
        assert.strictEqual(calculateNumber(1, 3), 4);
        assert.strictEqual(calculateNumber(1.4, 4.5), 6);
        assert.strictEqual(calculateNumber(1.5, 3.7), 6);
    });
});

