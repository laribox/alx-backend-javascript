const sinon = require('sinon');
const sendPaymentRequestToApi = require('./5-payment');

describe('sendPaymentRequestToApi', () => {
    let consoleSpy;

    beforeEach(() => {
        consoleSpy = sinon.spy(console, 'log');
    });

    afterEach(() => {
        consoleSpy.restore();
    });

    it('should log the correct total for 100, 20', () => {
        sendPaymentRequestToApi(100, 20);
        sinon.assert.calledOnceWithExactly(consoleSpy, 'The total is: 120');
    });

    it('should log the correct total for 10, 10', () => {
        sendPaymentRequestToApi(10, 10);
        sinon.assert.calledOnceWithExactly(consoleSpy, 'The total is: 20');
    });
});

