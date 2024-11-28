const { expect } = require('chai');
const calculateNumber = require('./2-calcul_chai');

describe('calculateNumber', () => {
    it('should return the sum of rounded inputs', () => {
        expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6);
    });

    it('should return the subtraction of rounded inputs', () => {
        expect(calculateNumber('SUBTRACT', 1.4, 4.5)).to.equal(-4);
    });

    it('should return the division of rounded inputs', () => {
        expect(calculateNumber('DIVIDE', 1.4, 4.5)).to.equal(0.2);
    });

    it('should return "Error" for division by zero', () => {
        expect(calculateNumber('DIVIDE', 1.4, 0)).to.equal('Error');
    });
});

