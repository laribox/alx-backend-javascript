describe('Available payments endpoint', () => {
  it('should return correct payment methods', (done) => {
    request.get(`${baseUrl}/available_payments`, (err, res, body) => {
      const expectedResponse = {
        payment_methods: {
          credit_cards: true,
          paypal: false
        }
      };
      expect(res.statusCode).to.equal(200);
      expect(JSON.parse(body)).to.deep.equal(expectedResponse);
      done();
    });
  });
});

describe('Login endpoint', () => {
  it('should return welcome message with username', (done) => {
    request.post(
      `${baseUrl}/login`,
      {
        json: true,
        body: { userName: 'Betty' }
      },
      (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        expect(body).to.equal('Welcome Betty');
        done();
      }
    );
  });
});

