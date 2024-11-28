const request = require('request');
const { expect } = require('chai');

describe('Integration Testing', () => {
  // Test for root endpoint
  describe('GET /', () => {
    it('Returns StatusCode: 200 | Body: Welcome to the payment system', (done) => {
      const options = {
        url: 'http://localhost:7865',
        method: 'GET',
      };

      request(options, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal('Welcome to the payment system');
        done();
      });
    });
  });

  // Tests for /cart/:id endpoint
  const validCartTests = [
    { id: 12, expectedBody: 'Payment methods for cart 12' },
    { id: 1, expectedBody: 'Payment methods for cart 1' },
    { id: 123, expectedBody: 'Payment methods for cart 123' },
  ];

  validCartTests.forEach((test) => {
    describe(`GET /cart/${test.id}`, () => {
      it(`Responds with 200 and id ${test.id} in the message`, (done) => {
        const options = {
          url: `http://localhost:7865/cart/${test.id}`,
          method: 'GET',
        };

        request(options, (error, response, body) => {
          expect(response.statusCode).to.equal(200);
          expect(body).to.equal(test.expectedBody);
          done();
        });
      });
    });
  });

  // Tests for invalid cart IDs
  const invalidCartTests = ['a12', 'a12b', '12b', 'hello', ''];

  invalidCartTests.forEach((id) => {
    describe(`GET /cart/${id}`, () => {
      it('Responds with 404', (done) => {
        const options = {
          url: `http://localhost:7865/cart/${id}`,
          method: 'GET',
        };

        request(options, (error, response, body) => {
          expect(response.statusCode).to.equal(404);
          done();
        });
      });
    });
  });
});

