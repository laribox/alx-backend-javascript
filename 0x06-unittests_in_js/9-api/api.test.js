describe('Cart page', () => {
  const baseUrl = 'http://localhost:7865';

  it('should return the correct status code and message for valid id', (done) => {
    request.get(`${baseUrl}/cart/12`, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      expect(body).to.equal('Payment methods for cart 12');
      done();
    });
  });

  it('should return 404 for invalid id', (done) => {
    request.get(`${baseUrl}/cart/hello`, (err, res, body) => {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
});

